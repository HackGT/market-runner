

import { IUser, ICriteria } from "./schema";
import fs from "fs";
import path from "path";
import { group } from "console";
import { exec } from "child_process";
// export type Score = IUser.calibScores;

// will need to work out a better way to abstract this
// ISSUE: present type removes separation of concerns at many places
// EXAMPLE: Add a new key value "5", the code will err in bot.ts at
//      resolveScores() in the switch statement. you will also need
//      to update the mongoose schema type in this file

export type Score = {
    group: string;
    score: number;
}
type cm = {
    track: string;
    criteria: string;
    scoreMappings: {
      score: number;
      mappedScore: number;
    }[];
  }[]

export type ScoreEnums = 0 | 1 | 2 | 3 | 4;
type ScoreValues = {
    [key: number]: number;
}

let calibrationmapping = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./config/calibrationmapping.json"), "utf8")
  )
let groupmapping = JSON.parse(
fs.readFileSync(path.resolve(__dirname, "./config/groupmapping.json"), "utf8")
)

let criteriamapping = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./config/criteriamapping.json"), "utf8")
  );

  let rubricmapping = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./config/rubricmapping.json"), "utf8")
  );


// export type ScoreMapping = {

    
//     creativity: ScoreValues;
//     passion: ScoreValues;
//     experience: ScoreValues;
//     perseverance: ScoreValues;
//     vibe: ScoreValues
// }

function insertIntoMapAsArray(map: Map<number, number[]>, key: number, value: number): void {
    const list = map.get(key);
    if (list) {
        list.push(value);
    } else {
        map.set(key, [value]);
    }
}

function avgListValueInMap(avgMap: Map<number, number[]>): Map<number, number> {
    const newMap = new Map<number, number>();
    Array.from(avgMap.keys()).map(key => {
        const list = avgMap.get(key);
        if (list) {
            let avg = 0;
            for (const item of list) {
                avg += item;
            }
            avg /= list.length;
            newMap.set(key, avg);
        }
    });
    return newMap;
}

function lineOfBestFit(points: number[][]): (x: number) => number {
    let avgx = 0,
        avgy = 0,
        slopeNumerator = 0,
        slopeDenominator = 0,
        slope = 0,
        b = 0;

    points.forEach(([x, y]) => {
        avgx += x;
        avgy += y;
    });

    avgx /= points.length;
    avgy /= points.length;

    points.forEach(([x, y]) => {
        slopeNumerator += ((x - avgx) * (y - avgy));
        slopeDenominator += (x - avgx) * (x - avgx);
    });

    if (slopeDenominator == 0) {
        console.warn("Unexpected condition: slope denominator is zero... returning identity map");
        return (x: number): number => x;
    } else {
        slope = slopeNumerator / slopeDenominator;
    }

    b = avgy - slope * avgx;

    return (x: number): number => slope * x + b;
}

function interpolateMap(map: Map<number, number[]>, from: number, to: number): Map<number, number> {
    const points:[number, number][] = [];

    for (const pointSet of map.entries()) {
        for (const point of pointSet[1]) {
            points.push([pointSet[0], point]);
        }
    }
    const line = lineOfBestFit(points);
    let adjustedMap: Map<number, number> = new Map();

    for (let i = from; i <= to; i++) {
        let val = Number(line(i).toFixed(2));
        if (val > to) {
            val = to;
        } else if (val < from) {
            val = from;
        }
        val = Math.round(val * 2) / 2;
        adjustedMap.set(i, val);
    }
    return adjustedMap;
}

function getObjectFromMap<T>(mapping: Map<number, T>): {[key: number]: T} {
    const objectMap: {[key: number]: T} = {};

    for (const [key, value] of mapping) {
        objectMap[key] = value;
    }

    return objectMap;
}

function processValuePairs(valuePairs: [number, number][], minScore = 1, maxScore = 4): ScoreValues {
    const map = new Map<number, number[]>();

    for (const [x, y] of valuePairs) {
        insertIntoMapAsArray(map, x, y);
    }

    const refinedMap = interpolateMap(map, minScore, maxScore);

    return getObjectFromMap(refinedMap);
}
//////// ASSUMES THAT THE CRITERIAS ACROSS THE DIFFERENT TRACKS ALL HAVE DIFFERENT NAMES
/////// ASSUMES THAT THERE ARE TWO TRACKS THAT ARE IMP - EX VIRTUAL/INPERSON
function mapCalibrationScoresToExecScores(calibrationScores: Score[], execScores) {

    const criteriaValuePairs: [number, number][][] = [];
    let s = {}
    // if ((execScores.length != calibrationScores.length)) {
    //     console.error("The number of calibration apps reviewed is not equal to the total number of required calibration apps");
    //     return;
    // }

    // let criteriaDict = {};
    let criteriadic = {}
    // for (const group of Object.keys(groupmapping)) {
    // let group = "emergingGroup"
    for (let group of Object.keys(groupmapping)) {
        let regulargroupscores =  calibrationScores.filter((val) => {
            return val.group===group
            })
        let execgroupscores =  execScores.filter((val) => {
            return val.group===group
            })
        if (regulargroupscores.length===execgroupscores.length) {
            let track = groupmapping[group].tracks[0]
  
            let criterias = Object.keys(criteriamapping[track])
            for (let i = 0; i < criterias.length; i++) {
                criteriadic[criterias[i]] = []
            }

            
            for (let i = 0; i < execgroupscores.length; i++) {
                if ((!execgroupscores[i].score) || (!regulargroupscores[i].score )) {
                    throw Error('Config is not correct format. Group name is incorrect.')
                }

                criteriadic[execgroupscores[i].criteria].push([execgroupscores[i].score, regulargroupscores[i].score])
        
                // criteriaValuePairs.push([execgroupscores[i].score, regulargroupscores[i].score]])
            }
            for (let i = 0; i < criterias.length; i++) {
                if (regulargroupscores.length==execgroupscores.length) {
                    let min = 1
                    let max = 4
                    rubricmapping.forEach((element) => {
                        if (element.name===criterias[i]) {
                            let l = Object.keys(element.calibrationRubric).length
                            max = l
                            // console.log(criterias[i], max)
                        }
                    })
                    s[criterias[i]] = processValuePairs(criteriadic[criterias[i]], min, max);
                } 
            }

        }
        
    }
    
    


    // }
    // console.log(s)
    // console.log(s)
    
    return s;
        // c: processValuePairs(creativityValuePairs),
        // perseverance: processValuePairs(perseveranceValuePairs),
        // vibe: processValuePairs(vibeValuePairs, 0, 2),
        // passion: processValuePairs(passionValuePairs),
        // experience: processValuePairs(experienceValuePairs;
}





export async function getScoreMapping(user: IUser) {
    let calibrationScores = user.calibrationScores
    let execScores: any[] = []
    
    for (const [key, value] of Object.entries(calibrationmapping)) {
        if (Array.isArray(value) ){
            value.forEach(function (item, index) {
                let val = {group: key, score: item.score, criteria: item.name}
                execScores.push(val)
            }) 
        }
      }
    // console.log(calibrationScores.length, execScores.length)
    // console.log(execScores)
    let mp = mapCalibrationScoresToExecScores(calibrationScores, execScores);
    let mappings: {

        criteria: string;
        scoreMappings: {
            "1": number,
            "2": number,
            "3": number,
            "4"?: number | undefined
        }
        // scoreMappings: {
        //   score: number;
        //   mappedScore: number;
        // }[];
      }[] = []
    if (mp) {
        for (const key of Object.keys(mp)) {

            mappings.push({
                criteria: key,
                scoreMappings: mp[key]
            })
        }
    }
    // console.log(mappings)

    
    return mappings
}



