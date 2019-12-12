const { app, user, say, ask, sayif, saylookup, YES, NO, HELP, FALLBACK, DEFAULT, SCHEMA, ACCEPTED, DECLINED, POPSTATE, NOSTATECHANGE, SETSTATE, CLEARSTATE, GOTO, log } = require('alexa-app-bootstrap');

// Load the skill's metadata
app.metadata = require('./metadata.js');

// APP BEHAVIOR CONFIG
// ===================
// These settings control basic app behavior from the alexa-app-bootstrap module
app.config = {
  // If true, calls to log() will go to Cloudwatch Logs
  logging_enabled: true
  // If true, full request and response json structures will be logged automatically
  ,log_request_response: true
  
  // If your app needs user persistence between sessions, enable these options and setup a DynamoDB table.
  // Any data stored in the user object will be automatically persisted and loaded between sessions.
  //,user_persistence_table: "users"
  //,user_persistence_key: "userid"
};

// Word/Phrase synonyms to randomly replace strings during output.
// Use this to add some variety to your responses, without needing to code different outputs.
app.outputSynonyms = {
  "Okay, ": ["Okay, ","Alright, ",""]
};

// ===========
// SKILL LOGIC
// ===========
// This is the core of your skill logic. Define your intents and skill behavior here.

// The launch handler is triggered when a user says "open <skill name>" with no intent defined.
app.launch(()=>{
  say `Hello, welcome to the example skill.`;
});

// A simple intent is for static utterances and static responses
app.simpleintent("nameIntent", "What is your name", "My name is Matt");

// A general intent definition allows for more details to be defined.
// Utterances can use the {} syntax to extrapolate variations in a single string. You can see
//   how these are expanded by looking at your model json files after deployment.
app.intent("randomNumberIntent",
  {"utterances":["{tell me|give me} a {random |}number"]},
  ()=>{
    let num = Math.floor(Math.random()*10)+1;
    // The "Okay, " part of this response will be randomly substituted with alternatives using the
    // values in app.outputSynonyms above.
    say `Okay, Your number is ${num}.`;
  }
);

// Response output is post-processed for things like pluralization


// ================================
// Default/Required Intent Handlers
// ================================
var requiredIntentHandler = function(request,response) {};
app.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": ["what can i do","what can i say","what should i do","what should i say","what can i ask","i don't know what to do","i don't know what to say"]
  },
  async function() {
    //response.say("");
  }
);
app.intent("AMAZON.StopIntent", async function (request, response) {
  response.shouldEndSession(true);
  //response.say("See you again soon!");
});
app.intent("AMAZON.CancelIntent", async function (request, response) {
  response.shouldEndSession(true);
  //response.say("See you again soon!");
});
app.intent("AMAZON.PreviousIntent", requiredIntentHandler);
app.intent("AMAZON.NextIntent", requiredIntentHandler);
app.intent("AMAZON.MoreIntent", requiredIntentHandler);
app.intent("AMAZON.ScrollLeftIntent", requiredIntentHandler);
app.intent("AMAZON.ScrollRightIntent", requiredIntentHandler);
app.intent("AMAZON.ScrollUpIntent", requiredIntentHandler);
app.intent("AMAZON.ScrollDownIntent", requiredIntentHandler);
app.intent("AMAZON.PageDownIntent", requiredIntentHandler);
app.intent("AMAZON.PageUpIntent", requiredIntentHandler);
app.intent("AMAZON.NavigateSettingsIntent", requiredIntentHandler);
app.intent("AMAZON.NavigateHomeIntent", requiredIntentHandler);

// ================
// BACKGROUND TASKS
// ================
// Your skill can support background tasks by implementing this method and setting up a CloudWatch Event
// that triggers the skill's lambda function. Calls from CloudWatch Events will automatically be routed
// to this handler function.
app.scheduler = async function(event) {
  log("Scheduler Called");
};

// Housekeeping
// ============
// connect to lambda
exports.handler = app.lambda_handler;
// Export the app for build and deployment
module.exports = app;
