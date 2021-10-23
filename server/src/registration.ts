import fetch from "node-fetch";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as path from "path";
import fs from "fs";
import tokenizer from "sbd";

// var tokenizer = require('sbd');

import { ICriteria, Criteria, ResponseData } from "./schema";
// import { emergingReviewers } from "./bot";
// import { preProcessFile } from "typescript";

dotenv.config();


// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/applicationbot", { useNewUrlParser: true, useUnifiedTopology: true  }).catch(err => {
//     throw err;
// });

const REGISTRATION_KEY = process.env.ADMIN_KEY_SECRET || "";
// console.log(REGISTRATION_KEY);
if (!REGISTRATION_KEY) {
    throw new Error("API key for registration interop not defined!");
}
const REGISTRATION_URL = process.env.REGISTRATION_GRAPHQL || "https://registration.hack.gt/graphql/";


// Controls resetting applications scores and overriding application information when applications are resubmitted
const OVERRIDE = true;

async function query<T>(query: string, variables?: { [name: string]: string }): Promise<T | undefined> {
    try {
        const response = await fetch(REGISTRATION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${REGISTRATION_KEY}`
            },
            body: JSON.stringify({
                query: query,
                variables: variables || {}
            })
        });
        const json = await response.json();
        // console.log(json);
        if (response.ok) {
            return json.data;
        }
        else {
            // console.log(response);
            throw new Error(JSON.stringify(json.errors));
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function wait(time: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(() => resolve(), time);
    });
}
// function createNewGeneralApplication(user: UserData, inputs: {pastProject: any, pastProjectLink: any, perseveranceGeneral: any}) {
//     if (!user.application) {
//         return null;
//     }
//     const pastProject = inputs.pastProject as ResponseData;
//     const pastProjectLink = inputs.pastProjectLink as ResponseData;
//     const perseveranceGeneral = inputs.perseveranceGeneral as ResponseData;

//     var optional_options = {}
//     const pastProjectLength = tokenizer.sentences(pastProject.value,optional_options).length
//     // const pastProjectLinkLength = tokenizer.sentences(pastProjectLink.value,optional_options).length
//     const perseveranceGeneralLength = tokenizer.sentences(perseveranceGeneral.value,optional_options).length

    
//     const newReview = {
//         by: {
//             name: "AutomaticFiltering",
//             id: "AutomaticFiltering",
//             time: new Date(),
//         },
//         score: 1.0,
//         adjustedScore: 1.0,
//     };
//     var passionReviewArray = []
//     var filterOutPassion = false
//     var filteredScorePassion = undefined
//     if (pastProjectLength <= 1) {
//         filterOutPassion = true;
//         filteredScorePassion = 1.0;
//         passionReviewArray.push(newReview)
//     }
//     var perseveranceReviewArray = []
//     var filterOutPerseverance = false
//     var filteredScorePerseverance = undefined
//     if (perseveranceGeneralLength <= 1) {
//         filterOutPerseverance = true;
//         filteredScorePerseverance = 1.0;
//         perseveranceReviewArray.push(newReview)
//     }
//     var experienceReviewArray = []
//     var filterOutExperience = false
//     var filteredScoreExperience = undefined
//     if (pastProjectLength <= 1) {
//         filterOutExperience = true;
//         filteredScoreExperience = 1.0;
//         experienceReviewArray.push(newReview)
//     }


    
//     const newApp = {
//         applicationID: user.id,
//         emerging: false,
//         data: {
//             passionAnswer: [pastProject, pastProjectLink],
//             perseveranceAnswer: [perseveranceGeneral],
//             experienceAnswer: [pastProject, pastProjectLink],
//             creativityAnswer: [],
//             vibeAnswer: []
//         },

//         passionReviews: passionReviewArray,
//         creativityReviews: undefined,
//         perseveranceReviews: perseveranceReviewArray,
//         experienceReviews: experienceReviewArray,
//         vibeReviews: undefined,
//         updatedAt: new Date(),
//         botReview: {
//             creativity: undefined,
//             passion: undefined,
//             experience: undefined,
//             perseverance: undefined,
//             vibe: undefined
//         },

//         doneCreativity: true,
//         donePassion: filterOutPassion,
//         doneExperience: filterOutPassion,
//         donePerseverance: filterOutPerseverance,
//         doneVibe: true,
//         creativityFinal: undefined,
//         passionFinal: filteredScorePassion,
//         experienceFinal: filteredScorePassion,
//         perseveranceFinal: filteredScorePerseverance,
//         vibeFinal: undefined,
//     };
//     return newApp;
// }

// function createNewEmergingApplication(user: UserData, inputs: { passion: any, perseverance: any, creativity: any }) {
//     if (!user.application) {
//         return null;
//     }
//     const passion = inputs.passion as ResponseData;
//     const perseverance = inputs.perseverance as ResponseData;
//     const creativity = inputs.creativity as ResponseData;



//     var optional_options = {}
//     const passionLength = tokenizer.sentences(passion.value,optional_options).length
//     const perseveranceLength = tokenizer.sentences(perseverance.value,optional_options).length
//     const creativityLength = tokenizer.sentences(creativity.value,optional_options).length

    
//     const newReview = {
//         by: {
//             name: "AutomaticFiltering",
//             id: "AutomaticFiltering",
//             time: new Date(),
//         },
//         score: 1.0,
//         adjustedScore: 1.0,
//     };
//     const passionReviewArray = []
//     var filterOutPassion = false
//     var filteredScorePassion = undefined
//     if (passionLength <= 1) {
//         filterOutPassion = true;
//         filteredScorePassion = 1.0;
//         passionReviewArray.push(newReview)
//     }
//     const perseveranceReviewArray = []
//     var filterOutPerseverance = false
//     var filteredScorePerseverance = undefined
//     if (perseveranceLength <= 1) {
//         filterOutPerseverance = true;
//         filteredScorePerseverance = 1.0;
//         perseveranceReviewArray.push(newReview)
//     }
//     const creativityReviewArray = []
//     var filterOutCreativity = false
//     var filteredScoreCreativity = undefined
//     if (creativityLength <= 1 || passionLength <= 1) {
//         filterOutCreativity = true;
//         filteredScoreCreativity = 1.0;
//         creativityReviewArray.push(newReview)
//     }
//     const vibeReviewArray = []
//     var filterOutVibe = false
//     var filteredScoreVibe = undefined
//     if (creativityLength <= 1) {
//         filterOutVibe = true;
//         filteredScoreVibe = 1.0;
//         vibeReviewArray.push(newReview)
//     }


//     const newApp = {
//         applicationID: user.id,
//         emerging: true,
//         data: {
//             passionAnswer: [passion],
//             perseveranceAnswer: [perseverance],
//             experienceAnswer: [],
//             creativityAnswer: [passion, creativity],
//             vibeAnswer: [creativity]
//         },
//         passionReviews: passionReviewArray,
//         creativityReviews: creativityReviewArray,
//         perseveranceReviews: perseveranceReviewArray,
//         experienceReviews: undefined,
//         vibeReviews: vibeReviewArray,
//         updatedAt: new Date(),
//         botReview: {
//             creativity: undefined,
//             passion: undefined,
//             experience: undefined,
//             perseverance: undefined,
//             vibe: undefined
//         },
//         doneCreativity: filterOutCreativity,
//         donePassion: filterOutPassion,
//         doneExperience: true,
//         donePerseverance: filterOutPerseverance,
//         doneVibe: filterOutVibe,
//         creativityFinal: filteredScoreCreativity,
//         passionFinal: filteredScorePassion,
//         experienceFinal: undefined,
//         perseveranceFinal: filteredScorePerseverance,
//         vibeFinal: filteredScoreVibe,
//     };
//     return newApp;
// }

function createNewCriteria(user: UserData, responsedata: ResponseData[], track:string, name:string) {
    if (!user.application) {
        return null;
    }
    
    var optional_options = {}
    let reject = false
    for (let response of responsedata) {
        if (tokenizer.sentences(response.answer,optional_options).length <=1) {
            reject = true
        }
    }
    const newReview = {
        by: {
            name: "AutomaticFiltering",
            id: "AutomaticFiltering",
            time: new Date(),
        },
        score: 1.0,
        adjustedScore: 1.0,
    };
    var reviewArray:any[] = []
    var filterOut = false
    var filteredScore:number | undefined = undefined
    if (reject) {
        filterOut = true;
        filteredScore = 1.0;
        reviewArray.push(newReview)
    }
    const newCriteria = {
        applicationID: user.id,
        track: track,
        name: name,
        data: responsedata,
        review: reviewArray,
        botReview: undefined,
        done:filterOut,
        finalscore:filteredScore,
        updatedAt: new Date()
    };
    return newCriteria
    
}




interface UserData {
    id: string;
    application: {
        type: string;
        data: {
            name: string;
            label: string | null;
            value: string;
        }[];
        submit_time: Date;
    } | null;
    pagination_token: string;
}

export async function getApplications() {
    console.log('getting applications')
    // let config: Partial<IConfig.Main> | null = null;

    let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./config", "criteriamapping.json"), "utf8"));
    
    // console.log(config)

    let users: UserData[] = [];
    let page = "";
    while (true) {
        const response = await query<{ users: UserData[] }>(`{
            users(n: 25, pagination_token: "${page}") {
                id
                application {
                    type
                    data {
                        name
                        label
                        value
                    }
                    submit_time
                }
                pagination_token
            }
        }`);
        if (!response) {
            return;
        }
        if (response.users.length === 0) {
            break;
        }
        users = users.concat(response.users);
        page = users[users.length - 1].pagination_token;
        await wait(1000);
    }
    let criteria: ICriteria[] = [];

    const existingIDs: string[] = [];
    let c = 0;
    for (const user of users) {
        if (!user.application || !user.application.type) {
            continue;
        };
        // console.log(user.application.type)
        if (!user.application.type.includes('Participant')) {
            continue;
        };
        let essaydata= {}
        let userapplication = user.application
        // if (config[user.application.type]) {
        //     config[user.application.type].essaysused.forEach(item => essaydata[item] = userapplication.data.find(item2 => item2.name === item));
        // }
        // else {
        //     continue;
        // }
        // console.log(userapplication.data.find())
        existingIDs.push(user.id);
        const previousCriterias = await Criteria.find({ applicationID: user.id });
        if (previousCriterias.length==0 || (OVERRIDE && (!previousCriterias[0].updatedAt || user.application.submit_time > previousCriterias[0].updatedAt))) {
            if (previousCriterias.length>0) {
                // await previousApp.remove();
                await Criteria.deleteMany({ applicationID: user.id })
            }
            
            let newCriteria: any[] = [];
            for (var key in config[user.application.type]) {
                for(var i = 0; i < config[user.application.type][key].length; i++) {
                    let val = userapplication.data.find(item2 => item2.name === config[userapplication.type][key][i].name)
                    if (val && val.value) {
                        newCriteria.push(createNewCriteria(user, [{"question":config[userapplication.type][key][i].question, "answer":val.value} as ResponseData] as ResponseData[], userapplication.type, key))
                    }

                }
                // config[user.application.type].criteria[key].forEach(item => newCriteria.push(createNewCriteria(user, [{"question":item.question, "answer": userapplication.data.find(item2 => item2.name === item.name).value]} as ResponseData] as ResponseData[], userapplication.type , key)))
            }
            for (var newCriterion of newCriteria) {
                if (newCriterion) {
                    criteria.push(newCriterion)
                }
            }
        }
    }
    // await Application.insertMany(applications);
    // console.log(criteria)
    await Criteria.insertMany(criteria)
    // Remove deleted applications
    const result = await Criteria.deleteMany({ applicationID: { $nin: existingIDs } });
    console.log(result);
    console.info(`[${new Date().toISOString()}] Added ${criteria.length} completed applications from registration instance`);
}
// getApplications();
// setInterval(getApplications, 1000 * 60 * 60); // Update list of applications every hour

// export async function getApplication(user: IUserMongoose, currentApplications: Map<string, {
//     application: IApplication;
//     creativity: number | undefined;
//     passion: number | undefined;
//     experience: number | undefined;
//     perseverance: number | undefined;
//     vibe: number | undefined;
//     criteria: string | undefined;
// }>): Promise<IApplication | null> {
//     if (!user.calibrated) {
//         const calibrationApplications = await CalibrationReview.find();
//         //Fix this for one criteria at a time
//         for (let calibrationApplication of calibrationApplications) {
//             if (
//                 (
//                     (calibrationApplication.emerging && user.creativityReviewed.every(review => review !== calibrationApplication.applicationID)) ||
//                     (!calibrationApplication.emerging && user.experienceReviewed.every(review => review !== calibrationApplication.applicationID)) ||
//                     (calibrationApplication.emerging && user.vibeReviewed.every(review => review !== calibrationApplication.applicationID)) ||
//                     user.passionReviewed.every(review => review !== calibrationApplication.applicationID) || 
//                     user.perseveranceReviewed.every(review => review !== calibrationApplication.applicationID)
//                 ) &&
//                 (!calibrationApplication.emerging || emergingReviewers.includes(user.slackID))
//             ) {
// 				const application = await Application.findOne({applicationID: calibrationApplication.applicationID});
// 				return application;
// 			}
// 		}
// 		await user.save();
//     }

//     // SERVING NON-REIMBURSEMENT APPLICATIONS
//     const applications = await Application.find({
//         $or:
//             [
//                 { "donePassion": { $eq: false } },
//                 { "doneExperience": { $eq: false } },
//                 { "donePerseverance": { $eq: false } },
//                 { "doneCreativity": { $eq: false } },
//                 { "doneVibe": { $eq: false } },
//             ],
//     });

//     const totalSkip = user.creativitySkipped.concat(user.experienceSkipped, user.vibeSkipped, user.passionSkipped, user.perseveranceSkipped);
//     for (let application of applications) {
 
//         if (
//             ((!application.donePassion && user.passionReviewed.every((review: string) => review !== application.applicationID))
//             || (!application.doneCreativity && application.emerging && user.creativityReviewed && user.creativityReviewed.every((review: string) => review !== application.applicationID))
//             || (!application.donePerseverance && user.perseveranceReviewed.every((review: string) => review !== application.applicationID))
//             || (!application.doneExperience && !application.emerging && user.experienceReviewed && user.experienceReviewed.every((review: string) => review !== application.applicationID))
//             || (!application.doneVibe && application.emerging && user.vibeReviewed && user.vibeReviewed.every((review: string) => review !== application.applicationID)))
//             && (!user || !totalSkip.includes(application.applicationID))
//             && (!application.emerging || emergingReviewers.includes(user.slackID))
//             //Prevents application from being reviewed by multiple people at the same time
//             && (
//                 Array.from(currentApplications.values()).every(
//                     app => app.application.applicationID !== application.applicationID
//                 )
//             )
//         ) {
//             // if (emergingReviewers.includes(user.slackID) && !application.emerging)
//             //     continue
//             // else {
//             return application;
//             // }
            
//         }
//     }
//     return null;
// }
