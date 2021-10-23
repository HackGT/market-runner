import fs from "fs";
import path from "path";
export function getGroup(email: string) {
    let groupmapping = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config/groupmapping.json"), "utf8")
    )
    let criteriamapping = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config/criteriamapping.json"), "utf8")
    )
    var criterias = Object.keys(criteriamapping)
    var groups = Object.keys(groupmapping)
  
    let initialGroup
    let groupSet = false
    let restGroup
    // code done below is assuming json object keys not necessarily be ordered. But not needed in ES2015 which node should be using. Either change code to use maps or just assume object is ordered!
    for (const grp of groups) {
      criterias = criterias.filter(function(x) {
          return groupmapping[grp].tracks.indexOf(x) < 0;
        });

      if (groupmapping[grp].emails!=="rest" &&  groupmapping[grp].emails.includes(email)) {
        initialGroup = grp
        groupSet = true
      }
      if (groupmapping[grp].emails=="rest") {
        restGroup = grp
      }
    }
    if (!groupSet) {
      initialGroup = restGroup
    }

    if (criterias.length!=0) {
      throw new Error('GradingMapping Json formatted incorrectly. The criterias potentially do not match.');
    }
    if (!initialGroup) {
      throw new Error('Group not set! Ask tech team to look at utils.ts code');
    }
    return "emergingGroup"
    //return initialGroup
  }



  export function getInitialGroupsLeft(group: string) {
    let groupmapping = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config/groupmapping.json"), "utf8")
    )
    var groups = Object.keys(groupmapping)
    groups = groups.filter(function(x) { 
        return x!==group;
      });
    console.log(groups)
    return []
    //return groups
  }

  
