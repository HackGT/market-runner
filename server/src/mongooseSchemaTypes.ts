/* eslint-disable */ // ironic, isn't it
import * as mongoose from "mongoose";
// import { ScoreMapping } from "../mapScores";

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

interface Review {
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
    name: string;
    value: string;
}
export interface IApplication {
    [key: string]: any;
    applicationID: string;
    emerging: boolean;
    data: {
        passionAnswer: ResponseData[];
        creativityAnswer: ResponseData[];
        perseveranceAnswer: ResponseData[];
        experienceAnswer: ResponseData[];
        vibeAnswer: ResponseData[];
    };
    passionReviews: Review[];
    creativityReviews: Review[] | undefined;
    perseveranceReviews: Review[];
    experienceReviews: Review[] | undefined;
    vibeReviews: Review[] | undefined;
    botReview: {
        [key: string]: number | undefined;
        passion: number | undefined;
        experience: number | undefined;
        creativity: number | undefined;
        perseverance: number | undefined;
        vibe: number | undefined;
    };
    doneCreativity: boolean;
    donePassion: boolean;
    doneExperience: boolean;
    donePerseverance: boolean;
    doneVibe: boolean;
    passionFinal: number | undefined;
    experienceFinal: number | undefined;
    creativityFinal: number | undefined;
    perseveranceFinal: number | undefined;
    vibeFinal: number | undefined
    updatedAt: Date | undefined;
}

export type IApplicationMongoose = IApplication & mongoose.Document;
export const Application = mongoose.model<IApplicationMongoose>("Application", new mongoose.Schema({
    applicationID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    emerging: Boolean,
    data: {
        passionAnswer: [{
            name: String,
            value: String
        }],
        experienceAnswer: [{
            name: String,
            value: String
        }],
        creativityAnswer: [{
            name: String,
            value: String
        }],
        perseveranceAnswer: [{
            name: String,
            value: String
        }],
        vibeAnswer: [{
            name: String,
            value: String
        }]
    },
    passionReviews: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    creativityReviews: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    experienceReviews: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    perseveranceReviews: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    vibeReviews: [{
        by: {
            name: String,
            id: String,
            time: Date
        },
        score: Number,
        adjustedScore: Number
    }],
    botReview: {
        effort: Number,
        passion: Number,
        experience: Number,
        perseverance: Number,
        creativity: Number
    },
    donePerseverance: Boolean,
    doneCreativity: Boolean,
    donePassion: Boolean,
    doneExperience: Boolean,
    doneVibe: Boolean,
    passionFinal: Number,
    creativityFinal: Number,
    experienceFinal: Number,
    perseveranceFinal: Number,
    vibeFinal: Number,
    updatedAt: Date
}));

export interface IUser {
    [key: string]: any;
    slackID: string;
    passionReviewed: string[];
    experienceReviewed: string[];
    creativityReviewed: string[];
    perseveranceReviewed: string[];
    vibeReviewed: string[];
    passionSkipped: string[];
    experienceSkipped: string[];
    creativitySkipped: string[];
    perseveranceSkipped: string[];
    vibeSkipped: string[];
    calibrated: boolean;
	calibrationScores: {
        applicationID: string;
        emerging: boolean;
		scores: {
			passion: number | undefined;
            experience: number | undefined;
            perseverance: number | undefined;
            creativity: number | undefined;
            vibe: number | undefined;
		};
    }[];
    // scoreMapping: ScoreMapping | undefined;
}

export type IUserMongoose = IUser & mongoose.Document;
export const User = mongoose.model<IUserMongoose>("User", new mongoose.Schema({
    slackID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    passionSkipped: [String],
    experienceSkipped: [String],
    creativitySkipped: [String],
    perseveranceSkipped: [String],
    vibeSkipped: [String],
    passionReviewed: [String],
    experienceReviewed: [String],
    creativityReviewed: [String],
    perseveranceReviewed: [String],
    vibeReviewed: [String],
    calibrated: Boolean,
	calibrationScores: [{
        applicationID: String,
        emerging: Boolean,
		scores: {
			passion: Number,
            experience: Number,
            perseverance: Number,
            creativity: Number,
            vibe: Number
		}
    }],
    // scoreMapping: {
    //     creativity: {
    //         "1": Number,
    //         "2": Number,
    //         "3": Number,
    //         "4": Number,
    //     },
    //     passion: {
    //         "1": Number,
    //         "2": Number,
    //         "3": Number,
    //         "4": Number,
    //     },
    //     experience: {
    //         "1": Number,
    //         "2": Number,
    //         "3": Number,
    //         "4": Number,
    //     },
    //     perseverance: {
    //         "1": Number,
    //         "2": Number,
    //         "3": Number,
    //         "4": Number,
    //     },
    //     vibe: {
    //         "0": Number,
    //         "1": Number,
    //         "2": Number
    //     }
    // }
}));

export interface ICalibrationReview {
    applicationID: string;
    emerging: boolean;
	scores: {
		creativity: number | undefined;
		passion: number | undefined;
        experience: number | undefined;
        perseverance: number | undefined;
        vibe: number | undefined;
	};
}
export type ICalibrationReviewMongoose = ICalibrationReview & mongoose.Document;
export const CalibrationReview = mongoose.model<ICalibrationReviewMongoose>("CalibrationReview", new mongoose.Schema({
	applicationID: {
		type: String,
		required: true,
    },
    emerging: Boolean,
	scores: {
		creativity: Number,
		passion: Number,
        experience: Number,
        perseverance: Number,
        vibe: Number
	}
}));



