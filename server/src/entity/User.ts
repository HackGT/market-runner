import { mongoose, RootDocument } from './database'


export interface IUser extends RootDocument {
    uuid: string;
    name: string;
    scores: number[];
    highscore: number
    token: string;
    admin: boolean;
}

export const User = mongoose.model<IUser & mongoose.Document>("User", new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String
    },
    scores: {
        type: [Number],
        default: [],
        required: true
    },
    token: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    },
    highscore: {
        type: Number,
        default: 0
    } 
},
    {
        usePushEach: true
    }
));


