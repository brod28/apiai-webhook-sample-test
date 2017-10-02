    //basechat

    let chatbase = require('@google/chatbase');
    
    let msg = chatbase.newMessage('2f56a676-4165-469e-a60f-8e48de8f129c')
    .setAsTypeUser() // sets the message as type user
//    .setAsTypeAgent() // sets the message as type agent
    // WARNING: setTimestamp() should only be called with a Unix Epoch with MS precision
    .setTimestamp(Date.now().toString()) // Only unix epochs with Millisecond precision
    .setPlatform('PLATFORM-Z') // sets the platform to the given value
    .setMessage('MY MESSAGE') // the message sent by either user or agent
    .setIntent('book-flight') // the intent of the sent message (does not have to be set for agent messages)
    .setAsHandled() // set the message as handled -- this means the bot understood the message sent by the user
//    .setAsNotHandled() // set the message as not handled -- this means the opposite of the preceding
    .setVersion('1.0') // the version that the deployed bot is
    .setUserId('user-1234') // a unique string identifying the user which the bot is interacting with
//    .setAsFeedback() // sets the message as feedback from the user
    .setAsNotFeedback() // sets the message as a regular message -- this is the default
    .setMessageId('123'); // the id of the message, this is optional