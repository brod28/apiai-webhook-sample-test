'use strict';
const data = require('./data.js');
var format = require("string-template")

module.exports = {

response:function (requestBody) {
    // return value
    var retVal={};
    
    // build the context based on contextout
    var parameterscontextout={};
    for(var key in requestBody.result.parameters) {
        parameterscontextout[key] = requestBody.result.parameters[key];
    }

    if (requestBody.result.contexts) {
        requestBody.result.contexts.forEach(function(context) {
            if(context.name=="datakeeper"){
                for(var key in context.parameters) {
                    parameterscontextout[key] = context.parameters[key];
                }
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
    parameterscontextout["your_company"]="Goppa";
    parameterscontextout["user_name"]="John";
    


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

