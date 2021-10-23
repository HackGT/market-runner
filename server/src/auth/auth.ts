// You shouldn't need to edit any code in this file
// It handles Express authentication such as cookies, and admin middleware

import mongoose = require("mongoose");
import express = require("express");
import passport = require("passport");
import session = require("express-session");
const MongoStore = require("connect-mongo")(session);
import dotenv from "dotenv";
import { Strategy as GroundTruthStrategy } from "passport-ground-truth";

import { app } from "../app";
import { createNew, IUser, User } from "../schema";
import { getGroup, getInitialGroupsLeft } from "../utils/utils";

dotenv.config();

if (process.env.PRODUCTION === "true") {
  app.enable("trust proxy");
} else {
  console.warn("OAuth callback(s) running in development mode");
}

const session_secret = process.env.SECRET;
if (!session_secret) {
  throw new Error("Secret not specified");
}

app.use(
  session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

export function isAuthenticated(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): void {
  response.setHeader("Cache-Control", "private");
  if (!request.isAuthenticated() || !request.user) {
    if (request.session) {
      request.session.returnTo = request.originalUrl;
    }
    response.redirect("/auth/login");
  } else {
    next();
  }
}

export function isAdmin(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  response.setHeader("Cache-Control", "private");

  const auth = request.headers.authorization;
  const user = request.user as IUser | undefined;

  if (process.env.PRODUCTION !== "true" || user?.admin) {
    next();
  } else if (auth && typeof auth === "string" && auth.includes(" ")) {
    const key = auth.split(" ")[1].toString();

    if (key === process.env.ADMIN_SECRET) {
      next();
    } else {
      response.status(401).json({ error: "Incorrect auth token provided" });
    }
  } else {
    response.status(401).json({ error: "No auth token provided" });
  }
}

passport.use(
  new GroundTruthStrategy(
    {
      clientID: process.env.GROUND_TRUTH_ID,
      clientSecret: process.env.GROUND_TRUTH_SECRET,
      baseURL: process.env.GROUND_TRUTH_URL,
      callbackURL: "/auth/login/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ uuid: profile.uuid });
      let group = getGroup(profile.email);

      if (!user) {
        user = createNew<IUser>(User, {
          ...profile,
          admin: false,
          graded: 0,
          skipped: 0,
          calibrationScores: [],
          group: group,
          calibrationMapping: [],
          groupsLeft: getInitialGroupsLeft(group),
        });
      } else {
        user.token = accessToken;
        if (!user.group) {
          user.group = group;
        }
        if (!user.groupsLeft) {
          user.groupsLeft = getInitialGroupsLeft(group);
        }
        if (!user.calibrationMapping) {
          user.calibrationMapping = [];
        }
        if (!user.calibrationScores) {
          user.calibrationScores = [];
        }
      }

      let domain = user.email.split("@").pop();
      console.log(user.email);

      if (
        domain &&
        (domain.includes("hexlabs") || domain.includes("hack.gt"))
      ) {
        user.admin = true;
      }

      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser<IUser, string>((user, done) => {
  done(null, user.uuid);
});

passport.deserializeUser<IUser, string>((id, done) => {
  User.findOne({ uuid: id }, (err, user) => {
    done(err, user!);
  });
});

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
