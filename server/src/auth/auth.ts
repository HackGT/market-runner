import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GroundTruthStrategy } from "passport-ground-truth";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { prisma } from "../common";
import { app } from "../app";

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
    }),
  })
);

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

passport.use(
  new GroundTruthStrategy(
    {
      clientID: process.env.GROUND_TRUTH_CLIENT_ID,
      clientSecret: process.env.GROUND_TRUTH_CLIENT_SECRET,
      baseURL: process.env.GROUND_TRUTH_URL,
      callbackURL: "/auth/login/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let user = await prisma.user.findUnique({
        where: {
          uuid: profile.uuid,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: profile.name,
            uuid: profile.uuid,
            email: profile.email,
            token: profile.token,
            score: 0
          },
        });
      } else {
        user = await prisma.user.update({
          where: {
            uuid: profile.uuid,
          },
          data: {
            token: accessToken,
          },
        });
      }
    }
  )
);