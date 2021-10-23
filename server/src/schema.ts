import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = String(process.env.MONGO_URL);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    throw err;
  });

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface RootDocument {
  _id: mongoose.Types.ObjectId;
}
export function createNew<T extends RootDocument>(
  model: mongoose.Model<T & mongoose.Document, {}>,
  doc: Omit<T, "_id">
) {
  return new model(doc);
}



export interface Review {
    [key: string]: any;
    by: {
        name: string;
        id: string;
        time: Date;
    };
    score: number;
    adjustedScore: number;
}

export interface ResponseData {
    [key: string]: string;
    question: string;
    answer: string;
}

// export interface Criteria {
//     name: string;
//     data: ResponseData[];
// }


export interface ICriteria{
    applicationID: string;
    track: string;
    name: string;
    data: ResponseData[];
    review: Review[];
    botReview: number | undefined;
    done: boolean;
    finalscore: number | undefined;
    updatedAt: Date | undefined;
}
export type ICriteriaMongoose = ICriteria & mongoose.Document;

export const Criteria = mongoose.model<ICriteriaMongoose>("Criteria", new mongoose.Schema({
    applicationID: String,
    track: String,
    name: String,
    data: [{
            question: String,
            answer: String
        }],
    review: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    botReview: {
      type: Number,
      required: false
    },
    done: Boolean,
    finalscore: {
      type: Number,
      required: false
    },
    updatedAt: {
      type: Date,
      required: false
    }
}));



export interface IUser extends RootDocument {
  uuid: string;
  email: string;
  name: string;
  token: string;
  admin: boolean;
  graded: number | undefined; 
  skipped: number | undefined;
  calibrationScores: {
    group: string;
    score: number;
  }[];
  group: string;
  groupsLeft: string[];
  calibrationMapping: {
    criteria: string;
    scoreMappings: {
      "1": number,
      "2": number,
      "3": number,
      "4"?: number | undefined
    }
  }[];
}
export const User = mongoose.model<IUser & mongoose.Document>(
  "User",
  new mongoose.Schema(
    {
      uuid: {
        type: String,
        required: true,
        index: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      token: String,
      admin: {
        type: Boolean,
        default: false,
      },
      graded: Number,
      skipped: Number,
      calibrationScores: [{
        group: String,
        score: Number
      }],
      group: {
        type: String,
        required: false
      },
      groupsLeft: [{
        type: String,
        required: false
      }],
      calibrationMapping: [{
        criteria: String,
        scoreMappings: {
          "1": {
            type: String
          },
          "2": {
            type: String
          },
          "3": {
            type: String
          },
          "4": {
            type: String,
            required: false
          },
        }
      }]
    },
    {
      usePushEach: true,
    }
  )
);