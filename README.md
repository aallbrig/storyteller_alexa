## Storyteller Alexa

This is a "choose your own adventure" game using Amazon Echo and AWS lambda.  As this project gets fleshed out I'll add more details to this readme.

Since this is a "game" meant for younger kids with lesser than ideal attention span, I shall persist the session data in order for a kid to lose interest for a while, but regain it in a short time.

When you interact with the application, it will draw session from storage.  If it detects session data, it will ask "I see there is a story in progress.  Say 'summary' to hear the story thus far.  Would you like to continue previous story or start a new one?"  Otherwise it will say "Would you like to hear a tale of x, y or z?"

### Set up
Go to AWS and set up a lambda, and select "Alexa" type.  After that, start a dynamoDB table and give it the name of "storyTeller" with a row of "id" "prime".  Assumption: there's ever only going to be one row data so this is okay (and lazy :] ).


### Wake Word

You can say `Alexa open story teller` to hear the introduction.
