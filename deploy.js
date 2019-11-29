const fs = require('fs');
const exec = require('child_process').exec;
var app = require("./src/index.js");
var metadata = app.metadata;
var schema = app.schemas.askcli();
var skill = require("./skill.json");
var ask_config = JSON.parse(fs.readFileSync("./.ask/config"));

var new_skill = !ask_config.deploy_settings['default'].skill_id;

var lang,locale,locales={},policies={};
for (lang in metadata.languages) {
  for (locale of metadata.languages[lang].locales) {
    var l = lang + "-" + locale;
    var data = metadata.languages[lang].data;
    locales[l] = JSON.parse(JSON.stringify(data));
    if (locales[l].description) {
      locales[l].description = locales[l].description.replace(/\n[ ]*/g,'\n');
    }
    policies[l] = JSON.parse(JSON.stringify(metadata.languages[lang].policies));
    fs.writeFileSync(`./models/${l}.json`,schema);
  }
}

// Replace variables
skill.manifest.publishingInformation.locales = locales;
skill.manifest.privacyAndCompliance.locales = policies;

// Update category
if (metadata.category) {
  skill.manifest.publishingInformation.category = metadata.category;
}

// Update testing instructions
if (metadata.testingInstructions) {
  skill.manifest.publishingInformation.testingInstructions = metadata.testingInstructions.replace(/\n[ ]*/g,'\n');
}

// Update the interfaces
if (metadata.interfaces && metadata.interfaces.length) {
  skill.manifest.apis.custom.interfaces=[];
  metadata.interfaces.forEach((i)=>{
    skill.manifest.apis.custom.interfaces.push({"type":i});
  });
}
if (!skill.manifest.apis.custom.interfaces || skill.manifest.apis.custom.interfaces.length===0) {
  delete skill.manifest.apis.custom.interfaces;
}

// Update the permissions
if (metadata.permissions && metadata.permissions.length) {
  skill.manifest.permissions=[];
  metadata.permissions.forEach((i)=>{
    skill.manifest.permissions.push({"name":i});
  });
}
if (!skill.manifest.permissions || skill.manifest.permissions.length===0) {
  delete skill.manifest.permissions;
}

// Update events
if (metadata.events && metadata.events.subscriptions) {
  if (!skill.manifest.events) {
    skill.manifest.events={};
  }
  skill.manifest.events.subscriptions=[];
  metadata.events.subscriptions.forEach((i)=>{
    skill.manifest.events.subscriptions.push({"name":i});
  });
}
if (!skill.manifest.events || skill.manifest.events.subscriptions || skill.manifest.events.subscriptions.length===0) {
  delete skill.manifest.events;
}

// Update Gadget support
if (metadata.gadgetSupport) {
  skill.manifest.publishingInformation.gadgetSupport = metadata.gadgetSupport;
}

// Update privacy and Compliance
var pc = metadata.privacyAndCompliance;
if (pc) {
  Object.keys(pc).forEach((p)=>{
    skill.manifest.privacyAndCompliance[p] = pc[p];
  });
}

// If lambda is specified in code, update config. This normally shouldn't happen.
var lambda_endpoint = metadata.lambda_endpoint || ("ask-" + metadata.invocationName.replace(/\s/g,'-'));
if (!skill.manifest.apis.custom.endpoint.uri) {
  skill.manifest.apis.custom.endpoint.uri = lambda_endpoint;
}

// Update ./.ask/config
if (metadata.skill_id) {
  ask_config.deploy_settings['default'].skill_id = metadata.skill_id;
}

// Write out config files
fs.writeFileSync('./skill.json', JSON.stringify(skill,null,2));
fs.writeFileSync('./.ask/config', JSON.stringify(ask_config,null,2));


//if (new_skill) {
//  console.log("Run 'ask deploy' manually for the first deployment so the skill can be created");
//}
//else {
  console.log("Using ask-cli to deploy the skill. Please wait for output...");
  // Call for ASK to deploy
  var p = exec('ask deploy --force --debug', (e, stdout, stderr)=> {
  //var p = exec('ask deploy', (e, stdout, stderr)=> {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
  });
  p.stdout.on('data', function(data) {
    data && process.stdout.write( data.toString() );
  });
  p.stdout.on('end', function(data) {
    data && process.stdout.write( data.toString() );
  });
  p.on('error',function(err) {
    console.log("ERROR: "+err);
  });
//}


/*
console.log("Granting Dynamo access to lambda function...");

var role = "ask-lambda-" + ()
exec('aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess --role-name ReadOnlyRole', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
});
*/
