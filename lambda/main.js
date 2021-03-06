var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB();

// TODO: Refactor this into a linked list.
var story = [
  {
    "action": "",
    "longText": "It's a stormy, foggy night and you... feel adventurous.  Walking home, you decide to go on a different path.  You've been taking a detour, but have traveled for what feels like a much longer time than you expected.  Through the fog you see what appears like a castle? Odd...  You approach the castle in the distance.  As you walk up to it, it looks like you can go through the front door.  There also appears to be a rope along the outer wall, with rocks jutting out to make a climb easy, maybe.  You look down the path you were heading on, and then back towards the castle.  What will you do now?  Do you enter the castle?  Do you climb the wall?  Do you continue on?",
    "actions": "Say 'I want to continue on the path'... 'I want to climb the wall' or 'I want to enter the castle'.",
    "summary": "You found a castle",
    "validActions": [1, 2, 3]
  },
/* Tier 1 - 1,2,3 */
  {
    "action": "enter the castle",
    "longText": "As you approach the front gates, they creak open as if they knew you were coming.  Inside, you find that the fog has thickened and its hard to see further than about 10 feet in front of you.  You can still see a hazy silhouette of a large building towards the center of what appears to be a square.  As you approach it, you see racks of armor and weaponry fade in, and out of the fog, flanking the road.  You enter the great hall and notice a table with food and drink haphazardly placed on it.  As you look around, you hear mysterious monstrous voices echoing from an interior room.  It sounds like they are getting closer and closer.  There isn't much time before they're inside... What will you do now?  Do you want to hide?  Do you jump on the table?  Or do you do nothing?",
    "summary": "You walk into the gates, enter a great hall then hear mysterious voices approach you.",
    "actions": "Say 'I want to hide' or 'I want to jump on the table' or 'I want to do nothing'.",
    "validActions": [4,5,6]
  },
  {
    "action": "climb the wall",
    "longText": "The climb was grueling but you eventually make it.  On top of the wall you see a small catapult and some fist sized rocks.  You explore the walls but a thick fog prevents you from seeing far.  You come up to some stairs.  Your curiosity drives you to then walk down and venture into the castle square.  You eventually find and enter into a great hall with food scraps and plates haphazardly thrown about a table.  Suddenly, you hear monstrous voices approaching the room you're in!  You don't have much time before they're inside.  Do you want to hide, do you want to jump on the table, or do you want to do nothing?",
    "summary": "You climb the wall and enter a great hall.  Mysterious voices approach you.",
    "actions": "Say 'I want to hide'... 'I want to jump on the table' or 'I want to do nothing'.",
    "validActions": [4,5,6]
  },
  {
    "action": "continue on the path",
    "longText": "The castle does not seem interesting to you, and you remember there is delicious left overs waiting for you in your kitchen.  You decide that the castle is not mysterious enough to warrant further investigation.  As you walk down your path the fog clears and you can see your house was close by.  You walk inside, put down your coat then walk over to the refrigerator.  You feel a rush of cold air on your face as you find the tupperware filled with last night's dinner.  You place it carefully in the microwave and set the timer.  As you watch your food get reheated, you think to yourself 'what an adventure!'  The microwave beeps and you eat your meal.  Thus concludes your story..!  Say 'restart' to begin anew.",
    "summary": "But... You walk home, take out your left overs, heat them up and eat",
    "actions": "Say 'restart' to start a new story.",
    "validActions": []
  },
/* Tier 2 - 4,5,6 */
  {
    "action": "hide",
    "longText": "Quickly, you look for something to hide under.  There appears to be a large cardboard box mere steps away!  You decide to pick it up and hide yourself underneath.  You have a limited view of the room through a slit in the box.  Great doors open revealing four, seven foot orcish figures.  They walk in, chatting to themselves in a language you do not understand.  They sit at the table you spotted before.  They begin to eat.  Fear wells inside you.  Your mind considers options of what to do now... You are tempted to throw the box from yourself and run.  But maybe there is value to listening to the conversation?  It might reveal more details?",
    "summary": "You hide under a cardboard box.",
    "actions": "Say 'I want to run' or 'I want to listen'",
    "validActions": [8, 9]
  },
  {
    "action": "jump on the table",
    "longText": "You knock bottles and plates off the table before leaping onto it, as the voices get closer and louder. Adrenaline pumps through you veins as a heavy door swings open.  The first thing you notice is an aqua blue light shine behind four seven foot figures.  They look like some sort of humanoid pig creature, with spikes and leather jutting from their bodies.  As the first gnarled figure enters it sees you almost immediately!  It points at you and loudly speaks in a language you cannot understand, but sounds threatening!  You spot the exit and you might be able to make a break for it.  But you may also want to take a stand.  Do you want to run?  Do you want to keep standing?",
    "summary": "You jump on the table and are spotted by orcish creatures.",
    "actions": "Say 'I want to run outside' or 'I want to keep standing'",
    "validActions": [7, 8]
  },
  {
    "action": "do nothing",
    "longText": "You do nothing.  The heavy door across the room opens as four orcish figures enter the hall.  You decide it would be a good time to look nonchalant, so you prop yourself up on the table and start whistling.  You look around whistling, while... what looks like large, humanoid pig creatures angrily rush over to you, yelling in a language you do not understand.  They grab your arms and put a sack over your head.  They forcefully drag you for what seems like ages...  Suddenly, the sack is lifted from your head and you are then thrown into a dark, dank cell.  You find yourself in a prison cell.  There appears to be a rusty series of bars towards the corner.  There is also a straw bed in the middle of the room.  What will you do now?  You can sit on the bed or you can hit the rusty bars.",
    "summary": "You do nothing and, despite your... best... efforts, you are spotted and captured.  You are thrown into a prison cell.",
    "actions": "Say 'I want to sit on the bed' or 'I want to hit the rusty bars'",
    "validActions": [10, 11]
  },
/* Tier 3A - 7,8,9 */
  {
    "action": "keep standing",
    "longText": "You defiantly keep standing on the table, against your better judgement.  Orcish figures enter the hall and lock eyes with you immediately.  You let loose a loud, boomy war cry as they rapidly approach your table.  As you step forward to meet their advance, you slip on a large plate on the table, sending it flying towards the first figure.  It shatters on his face as it recoils, letting the second figure rush you.  You are flat on your back and cannot defend yourself.  They grab your arms and put a sack over your head.  They forcefully drag you for what seems like ages...  Suddenly, the sack is lifted from your head and you are then thrown into a dark, dank cell.  You find yourself in a prison cell.  There appears to be a rusty series of bars towards the corner.  There is also a straw bed in the middle of the room.  What will you do now?  You can sit on the bed or you can hit the rusty bars.",
    "summary": "You keep standing on the table and four creatures run towards you.  Through clumsiness you manage to hit a creature in the face but they ultimately capture you.  You find yourself in a prison cell.  There appears to be a rusty series of bars towards the corner.",
    "actions": "Say 'I want to sit on the bed' or 'I want to hit the rusty bars'",
    "validActions": [10, 11]
  },
  {
    "action": "run outside",
    "longText": "You quickly run towards the exit, running as fast as you've ever run before.  Your shoulder slams into door.  The orcish figures seem to be pursuing you!  You run out the doors and it appears the fog has lifted.  To your left you see stairs that lead up to a wall.  In front of you, you can make out the front gates.  However, to your right you see a aqua blue light radiating from behind a tower.  Where will you run?",
    "summary": "You run outside.  There are three paths to go.",
    "actions": "Say 'I want to run to the gates'... 'I want to run to the wall' or 'I want to approach the blue light'",
    "validActions": [13, 14, 18]
  },
  {
    "action": "listen",
    "longText": "You listen.  The only thing you can make out in their discussion is 'blue light.'  All the other words are indecipherable...  You notice the room is heavy with dust as something wells up inside you.  A sneeze?  You... can't sneeze now.  You try and hold it back but you cannot.  You sneeze inside the cardboard box, twice.  You hold your face but it's not enough.  The orcish figures point towards the box you're under, smacking it up.  They grab your arms and put a sack over your head.  They forcefully drag you for what seems like ages...  Suddenly, the sack is lifted from your head and you are then thrown into a dark, dank cell.  You find yourself in a prison cell.  There appears to be a rusty series of bars towards the corner.  There is also a straw bed in the middle of the room.  What will you do now?",
    "summary": "You listen and are able to understand something about a blue light.  You unfortunately sneeze and are captured.  There appears to be a rusty series of bars towards the corner.",
    "actions": "Say 'I want to sit on the bed' or 'I want to hit the rusty bars'",
    "validActions": [10, 11]
  },
/* Tier 3B - 10,11,12 */
  {
    "action": "sit on the bed",
    "longText": "You decide the stone slab with straw looks like a good place to rest, for now. You sit on the bed and time passes as you think about your adventure thus far.  So.  Restful.  You get bored and look over at the rusty bars in the corner.  Maybe you want to hit the rusty bars?",
    "summary": "You sit on the bed and time passes as you think about your adventure thus far.",
    "actions": "say 'I want to hit the rusty bars'",
    "validActions": [11]
  },
  {
    "action": "hit the rusty bars",
    "longText": "With great force, you throw your body at the rusty bars.  Fortunately, they give easily, but unfortunately, the metal clangs on the stone ground, alerting the orcish figures from before.  You can hear them approach down the hall.  However, as fast as you can, you return to the great hall and out the doors.  You look behind you, and you can see the four following you.  You run out the doors and it appears the fog has lifted.  To your left you see stairs that lead up to a wall.  In front of you, you can make out the front gates.  However, to your right you see a aqua blue light radiating from behind a tower.  Where will you run?",
    "summary": "You hit the rusty bars.  The way is open and you escape the great hall but the orcs pursue you.",
    "actions": "Say 'I want to run to the gates'... 'I want to run to the wall' or 'I want to approach the blue light'",
    "validActions": [13, 14, 18]
  },
  {
    "action": "",
    "longText": "",
    "summary": "",
    "actions": "",
    "validActions": []
  },
/* Tier 4A - 13,14,15 */
  {
    "action": "run to the gates",
    "longText": "You run to the gates but it seems your pursuers are quickly gaining on you.  You see a sword along the path so you decide to fight them off.  You start swinging at the air and you yell out.  'Come at me, I dare you!'  They start to charge.  Then. Suddenly.  Is that a melody in the distance?  It is, and it seems the orcish figures are entirely focused on it.  Now is your chance.  Will you exit through the gates?  Will you approach the blue light?",
    "summary": "You run to the gates.  On your path you pick up a sword and are about to battle the monsters.  A melody, however,",
    "actions": "Say 'I want to exit through the gates' or 'I want to approach the blue light'",
    "validActions": [16, 18]
  },
  {
    "action": "run to the wall",
    "longText": "You leap over objects in a very athletic manner.  Your pursers do not seem as agile, as they trip over themselves and objects.  You make your way to a staircase leading up a wall.  You run along it, with the orcish figures in hot pursuit.  You spot a small catapult and quickly load up a rock.  The object is heavy but you are able to turn it towards the wall in time.  You pull a rope, hoping the rock will find its mark.  It releases and... It lands in the center of the lead figure's chest!  The rest of them seem spooked off, as they collect their friend and run back to the great hall.  You hear an eerie melody begin as a blue light starts to radiate from a tower in the distance.  Curiosity wells inside you once again.  Will you approach the blue light?  Or will you exit down the wall?",
    "summary": "You run to the wall, spin a catapult towards the advancing orcs and manage to hit one, scaring off the others.  You find yourself on the wall as a blue light seems to begin enveloping the entirety of the castle",
    "actions": "Say 'I want to exit down the wall' or 'I want to approach the blue light'",
    "validActions": [17, 18]
  },
  {
    "action": "",
    "longText": "",
    "summary": "",
    "actions": "",
    "validActions": []
  },
/* Tier 4B - 16,17,18 */
  {
    "action": "exit through the gates",
    "longText": "You throw the sword on the ground and run out the main gates.  You return to the path before, exhausted.  You look behind you, and you witness a spectacular blue light expand to envelop the entire castle.  Just as the light is 20 feet from you, a blinding flash explodes out.  You look back at where a castle had just been moments before and see a wooded forest.  Your friends most certainly won't believe this adventure when you tell them!  Thus concludes your story.  Say 'restart' to begin anew.",
    "summary": "You exit through the gates",
    "actions": "Say 'restart' to start a new story.",
    "validActions": []
  },
  {
    "action": "exit down the wall",
    "longText": "You repell down a rope hanging from the top of the wall.  You return to the path before, exhausted.  You look behind you, and you witness a spectacular blue light expand to envelop the entire castle.  Just as the light is 20 feet from you, a blinding flash explodes out.  You look back at where a castle had just been moments before and see a wooded forest.  Your friends most certainly won't believe this adventure when you tell them!  Thus concludes your story.  Say 'restart' to begin anew.",
    "summary": "You exit down the wall",
    "actions": "Say 'restart' to start a new story.",
    "validActions": []
  },
  {
    "action": "approach the blue light",
    "longText": "You approach the blue light as it expands violently.  You are blinded and knocked unconscious.  When you come to, you find yourself in your bed.  Was it all just a dream?  No way, the bruises suggest otherwise.  You run outside to see if you can't spot the castle from before, but you cannot.  At any rate, your friends most certainly won't believe this adventure when you tell them!  Thus concludes your story.  Say 'restart' to begin anew.",
    "summary": "You approach the blue light",
    "actions": "Say 'restart' to start a new story.",
    "validActions": []
  }
];

function getAppData(callback) {
  docClient.getItem({
    "TableName": "storyTeller",
    "Key": {
      "id": "prime"
    }
  }, function(err, data) {
    callback(err, data);
  });
}

function saveAppData(appData, callback) {
  docClient.putItem({
    "TableName": "storyTeller",
    "Item": {
      "id": "prime",
      "choices": appData.choices
    }
  }, function(err, data) {
    if (err) {
      console.log('error saving');
      console.log(err);
    } else if (data) {
      console.log('data saving');
      console.log(data);
    }
    callback(err, data);
  });
}


exports.handler = function (event, context) {
  try {
    console.log("event.session.application.applicationId=" + event.session.application.applicationId);
    console.log('event');
    console.log(event);
    console.log('context');
    console.log(context);

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
  var sessionAttributes;
  var cardTitle = "Choose Your Adventure";
  var shouldEndSession = false;
  var speechOutput;
  var repromptText;
  getAppData(function (error, data) {
    if (data) {
      console.log('data retrieval success');
      console.log(data.Item);
      sessionAttributes = data.Item;
    } else if (error) {
      console.log('error');
      console.log(error);
      sessionAttributes = {
        id: 'prime',
        choices: []
      };
    }
    if (sessionAttributes.choices.length > 0) {
      speechOutput = "I see you already have a story in progress.  Say 'summary' to hear your story thus far, say 'yes' to continue or say 'restart' to begin anew.";
    } else {
      speechOutput = "I have a story to tell!  Would you like to hear it?";
    }
    callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  });
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
  } else if ("Summary" === intentName) {
    getSummaryResponse(intent, session, callback);
  } else if ("ChooseAction" === intentName) {
    getChooseActionResponse(intent, session, callback);
  } else if ("RestartStory" === intentName) {
    getRestartStoryResponse(intent, session, callback);
  } else {
    throw "Invalid intent";
  }
}

// --------------- Functions that control the skill's behavior -----------------------
function getYesResponse(intent, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var speechOutput = "Good. ";
  var repromptText = "";
  var shouldEndSession = false;
  if (sessionAttributes.choices.length == 0) {
    sessionAttributes.choices.push(0);
    speechOutput += story[0].longText;
    repromptText += story[0].actions;
  } else {
    var lastChoiceIndex = sessionAttributes.choices.slice(-1)[0];
    speechOutput += story[lastChoiceIndex].longText;
    repromptText += story[lastChoiceIndex].actions;
  }
  saveAppData(sessionAttributes, function() {
    callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  });
}

function getNoResponse(intent, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var speechOutput = "No";
  var repromptText = "No";
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getHelpResponse(callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var speechOutput = "Say 'Summary' to hear the story thus far!";
  var repromptText = "";
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getSummaryResponse(intent, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var lastChoiceIndex = sessionAttributes.choices.slice(-1)[0];
  var lastChoice = story[lastChoiceIndex];
  var speechOutput = "";
  sessionAttributes.choices.forEach(function (choiceIndex) {
    speechOutput += " " + story[choiceIndex].summary + ". ";
  });
  console.log(lastChoice);
  speechOutput += "What will you do now? ... ";
  speechOutput += lastChoice.actions;
  var repromptText = lastChoice.actions;
  var shouldEndSession = false;
  callback(sessionAttributes,
       buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getRestartStoryResponse(intent, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  sessionAttributes.choices = [];
  var cardTitle = intent.name;
  var speechOutput = "I have restarted the story.  Would you like to begin?";
  var repromptText = "";
  var shouldEndSession = false;
  saveAppData(sessionAttributes, function() {
    callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  });
}

function getChooseActionResponse(intent, session, callback) {
  var sessionAttributes = session.attributes ? session.attributes : {};
  var cardTitle = intent.name;
  var action = intent.slots.action;
  var lastChoiceIndex = sessionAttributes.choices.slice(-1)[0];
  var lastChoice = story[lastChoiceIndex];
  console.log(lastChoiceIndex);
  var speechOutput;
  var repromptText;
  if (action && action.value) {
    var choiceIndex;
    var choice = story.filter(function (storyPiece, index) {
      if (storyPiece.action == action.value) {
        choiceIndex = index;
        return true;
      }
    })[0];
    if (choice && choiceIndex) {
      if ((lastChoice.validActions.indexOf(parseInt(choiceIndex, 10)) > -1)) {
        console.log('valid action');
        sessionAttributes.choices.push(choiceIndex);
        speechOutput = "You chose to " + choice.action + ". ";
        speechOutput += choice.longText;
        repromptText = choice.actions;
      } else {
        console.log('invalid action');
        console.log('choice');
        console.log(choice);
        console.log('choice index');
        console.log(choiceIndex);
        console.log('last choice');
        console.log(lastChoice);
        console.log('last choice index');
        console.log(lastChoiceIndex);
        console.log('is it in array?');
        console.log(lastChoice.validActions.indexOf(parseInt(choiceIndex, 10)));
        console.log(lastChoice.validActions.indexOf(parseInt(choiceIndex, 10)) > -1);

        speechOutput = "Invalid action. ";
        speechOutput += lastChoice.actions;
        repromptText = lastChoice.actions;
      }
    } else {
      speechOutput = "I could not understand your action. ";
      speechOutput += lastChoice.summary + ". ";
      speechOutput += "What will you do now? ... ";
      speechOutput += lastChoice.actions;
      repromptText = lastChoice.actions;
    }
  } else {
    speechOutput = "I could not determine what action you took";
  }
  var shouldEndSession = false;
  saveAppData(sessionAttributes, function() {
    callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  });
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
