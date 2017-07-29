'use strict';
const data = require('./data.js');
var format = require("string-template")

module.exports = {

response:function (requestBody) {
    // return value
    var retVal={};
    
    // build the context based on contextout
    var parameterscontextout={};
    if (requestBody.result.contexts) {
        requestBody.result.contexts.forEach(function(context) {
            if(context.name=="datakeeper"){
                parameterscontextout=context.parameters;
            }
        });
    }
    // process the webhook request
    retVal=logic_proccessor(requestBody,parameterscontextout);
    
    return retVal;    
}


};

var logic_proccessor=function(requestBody,parameterscontextout){
    
    // default value for speach
    var speech = '';
    
    //store the action in context
    parameterscontextout["action"]=requestBody.result.action;

    // set the distination city and the original city
    parameterscontextout["distination_city"]="London";


    // if neccesary excute business rules and store results in context 
    try
    {
        parameterscontextout=getContext(requestBody.result.action,parameterscontextout,requestBody);
    }
    catch(err){
        console.log(err);
    }
    
    // get the template
    let template=getTemplate(requestBody.result.action);
    // build the speech to the user
    speech = getSpeech(template, parameterscontextout);

    // return object that works for api ai
    return {
        speech: speech,
        displayText: speech,
        data:parameterscontextout,
        source: 'apiai-webhook-sample',
        contextOut: [{"name":"datakeeper", "lifespan":100, "parameters":parameterscontextout}]
    };

}

// formating speech based template and content
var getSpeech=function(template, parameterscontextout){
    let speech=format(template, parameterscontextout);
    return speech;
}

// excute business rules for action
var getContext=function(action,parameterscontextout,requestBody){
    let context=require('./actions/'+action+'/context_'+action).processor(parameterscontextout,requestBody);
    return context;
}

// get the template
var getTemplate=function(action){
    let template=require('fs').readFileSync('./actions/'+action+'/template_'+action+'.txt', 'utf8');
    return template;
}

// set variable values for user session in api ai
var SetNeighborhoodEntityValues=function(sessionId,neighborhoods){
    var apiai = require("apiai");

    var app = apiai("b266cf849ba2485a96dcdcee069f60d2");

    var sessionId = sessionId;

    var user_entities = [{
        name: 'Neighborhood',
        extend: false,
        entries: [
        ]
    }];

    neighborhoods.forEach(function(neighborhood){
        user_entities[0].entries.push({value:neighborhood.name,synonyms:[neighborhood.name]});
    })
    var user_entities_body = {
        sessionId: sessionId,
        entities: user_entities
    };

    var user_entities_request = app.userEntitiesRequest(user_entities_body);

    user_entities_request.on('response', function(response) {
        console.log('User entities response: ');
        console.log(JSON.stringify(response, null, 4));
    });

    user_entities_request.on('error', function(error) {
        console.log(error);
    });

    user_entities_request.end();
}
