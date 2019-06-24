const { app, say, ask, sayif, saylookup, ddb, YES, NO, HELP, FALLBACK, DEFAULT, SCHEMA, ACCEPTED, DECLINED, POPSTATE, NOSTATECHANGE, SETSTATE, CLEARSTATE, GOTO, log } = require('alexa-app-bootstrap');

// APP METADATA
// ============
let invocationName = "example skill";
let skillName = "Example Skill";

app.metadata = {
  "skill_id": "" // Leave empty unless over-writing an existing skill
  ,"lambda_endpoint": "" // Leave empty unless over-writing an existing lambda
  ,"category":"GAMES"
  ,"invocationName": invocationName
  ,"languages": {
    "en": {
      "locales": [ "US" ],
      "data": {
        "summary": "Insert Summary Here",
        "examplePhrases": [
          `Alexa open ${invocationName}`,
          `Alexa play ${invocationName}`,
          `Alexa ask ${invocationName} to do something`,
        ],
        "name": skillName,
        "description": `Insert description that will show up in the skill store.
        
          Since the skill store description box accepts multiple lines, you can add lines here.
          
          Newlines will be correctly supported.`,
        "keywords": [
          'keyword1','keyword2','keyword3'
        ],
        "smallIconUri": "", // 108x108
        "largeIconUri": "" // 512x512
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

// APP BEHAVIOR CONFIG
// ===================
app.config = {
  user_persistence_table: "users"
  ,user_persistence_key: "userid"
  ,logging_enabled: true
  ,log_request_response: true
};
// Word synonyms to randomly replace during output
app.outputSynonyms = {

};

// The function to call for scheduled event calls
app.scheduler = async function(event) {
  log("Scheduler Called");
};

// ===========
// SKILL LOGIC
// ===========
app.intent("testIntent", {"utterances":["hello"]}, function() {
  say `Hello bob`;
});
app.launch(()=>{
  say `Nice launch`;
});

// connect to lambda
exports.handler = app.lambda_handler;

// Export the app for build and deployment
module.exports = app;
