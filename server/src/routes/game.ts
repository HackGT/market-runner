import express from "express";
import {User} from "../entity/User"
export let gameRoutes = express.Router();


gameRoutes.route("/leaderboard")
  .get(async (req, res) => {
      let usersSorted = await User.find(
        {
            points: {
                $gt: 0
            }
        }, 
        {},
        {
            sort: {
                highscore: -1
            }
        }
    )
    console.log(usersSorted);
    return res.status(200).send(usersSorted);
  })
//TODO: this can be abused 
gameRoutes.route("/updateUser/:points")
  .post(async (req, res) => {
      
    const pointsToAdd = Number(req.params.points);
    
    if (!req.user?.['uuid']) {
      return res.status(400).send({success: false, data: "no uuid"})
    }

    let user = await User.findOneAndUpdate(
      {uuid: req.user.uuid}, 
      {$push: {scores: pointsToAdd}});

    
    if (!user) {
      return res.status(400).send({success: false, data: 'uuid not valid'})
    }

    //if (user.highscore < pointsToAdd) {
    //    user.highscore = pointsToAdd;
    //    await user.save()
    //}
    
    return res.status(200).send({success: true, data: "points updated"})
    
  })