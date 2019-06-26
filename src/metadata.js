// This file contains the skill metadata that will be used to generate skill.json

// It is stored in a JS file instead of JSON so variables and template literals can be
// used for easier editing, so comments can be added, etc.

// APP METADATA
// ============
let invocationName = "example skill";
let skillName = "Example Skill";

module.exports = {
  "skill_id": "" // Leave empty unless over-writing an existing skill
  ,"lambda_endpoint": "" // Leave empty unless over-writing an existing lambda
  ,"category":"GAMES"
  ,"invocationName": invocationName
  ,"languages": {
    "en": {
      "locales": [ "US" ],
      "data": {
        "summary": `Insert Summary Here`,
        "examplePhrases": [
          `Alexa open ${invocationName}`,
          `Alexa play ${invocationName}`,
          `Alexa ask ${invocationName} to do something`,
        ],
        "name": skillName,
        "description": `Insert description that will show up in the skill store.
          Since the skill store description box accepts multiple lines, you can add lines here.
          Newlines will be correctly supported.`,
        "keywords": [ 'keyword1','keyword2','keyword3' ],
        "smallIconUri": "", // 108x108 PNG
        "largeIconUri": "" // 512x512 PNG
      },
      "policies": {
        "privacyPolicyUrl": "",
        "termsOfUseUrl": ""
      }
    }
  }
  ,"testingInstructions": `Insert certification testing instructions here.  
                           It can span multiple lines.`
  ,"interfaces": [
    "RENDER_TEMPLATE" 
    //,"GAME_ENGINE"
    //,"GADGET_CONTROLLER"
  ]
  ,"permissions": [
    //"alexa::profile:name:read"
  ]
  ,"events": {
    "endpoint": "lambda_arn",
    "subscriptions": [
      //"SKILL_PERMISSION_ACCEPTED"
      //,"SKILL_PERMISSION_CHANGED"
    ]
  }
  /*
  ,"gadgetSupport": {
    "requirement": "REQUIRED",
    "numPlayersMin": 1,
    "numPlayersMax": 1,
    "minGadgetButtons": 1,
    "maxGadgetButtons": 1
  }
  */
  ,"privacyAndCompliance": {
    "allowsPurchases": false,
    "usesPersonalInfo": false,
    "isChildDirected": false,
    "isExportCompliant": false,
    "containsAds": false
  }
};
