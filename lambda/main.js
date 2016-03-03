var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

function getAppData(callback) {
  docClient.getItem({
    "TableName": "storyTeller",
    "Key": {
      "id": "prime"
    }
  }, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}


exports.handler = function (event, context) {
  try {
    console.log("event.session.application.applicationId=" + event.session.application.applicationId);

    if (event.session.new) {
      onSessionStarted({requestId: event.request.requestId}, event.session);
    } else {
      // Look for persisted data
    }

    if (event.request.type === "LaunchRequest") {
      onLaunch(event.request,
        event.session,
        function callback(sessionAttributes, speechletResponse) {
          context.succeed(buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === "IntentRequest") {
      onIntent(event.request,
        event.session,
        function callback(sessionAttributes, speechletResponse) {
          context.succeed(buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
  console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
      ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
  console.log("onLaunch requestId=" + launchRequest.requestId +
      ", sessionId=" + session.sessionId);

  var cardTitle = "Choose Your Adventure";
  var speechOutput = "You feeling lucky punk?";
  var repromptText = "Well, do you?";
  var shouldEndSession = false;

  callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
  console.log("onIntent requestId=" + intentRequest.requestId +
      ", sessionId=" + session.sessionId);
  var intent = intentRequest.intent;
  var intentName = intentRequest.intent.name;

  // Dispatch to your skill's intent handlers
  if ("AMAZON.YesIntent" === intentName) {
    getYesResponse(intent, session, callback);
  } else if ("AMAZON.NoIntent" === intentName) {
    getNoResponse(intent, session, callback);
  } else if ("AMAZON.HelpIntent" === intentName) {
    getHelpResponse(callback);
  } else if ("AMAZON.StopIntent" === intentName) {
    getStopResponse(callback);
  } else {
    throw "Invalid intent";
  }
}

// --------------- Functions that control the skill's behavior -----------------------
function getYesResponse(intentRequest, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var speechOutput = "Yes";
  var repromptText = "Yes";
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getNoResponse(intentRequest, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var speechOutput = "No";
  var repromptText = "No";
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getHelpResponse(callback) {
  var speechOutput = "Say 'Summary' to hear the story thus far!";
  var repromptText = "";
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getStopResponse(callback) {
  var speechOutput = "This story is over!";
  var repromptText = "";
  var shouldEndSession = true;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
  console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
      ", sessionId=" + session.sessionId);
  // Add cleanup logic here
}


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    card: {
      type: "Simple",
      title: "StoryTeller - " + title,
      content: "StoryTeller - " + output
    },
    reprompt: {
      outputSpeech: {
          type: "PlainText",
          text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
