'use strict';
const data = require('./data.js');
var format = require("string-template")

module.exports = {

response:function (requestBody) {


    
        
        var retVal={};
     

            // always take with me the stored parameters
            var parameterscontextout={};
            if (requestBody.result.contexts) {
                requestBody.result.contexts.forEach(function(context) {
                    if(context.name=="datakeeper"){
                        parameterscontextout=context.parameters;
                    }
                });
            }

            if (requestBody.result) {
                retVal=logic_proccessor(requestBody,parameterscontextout);
  
            }
            else{
                console.log("no body to the request");
            }            
       
        return retVal;

        
}


};

var logic_proccessor=function(requestBody,parameterscontextout){
              var speech = '';
              parameterscontextout["action"]=requestBody.result.action;
                // logic for input.city action
                if (requestBody.result.action=="input.city") {
                    if (requestBody.result.parameters) {
                        if (requestBody.result.parameters["geo-city"]) {
                            // set the distination city and the original city
                            parameterscontextout["distination_city"]="London";
                            data.rent.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    if(parameterscontextout["distination_city"]==city.name){
                                        SetNeighborhoodEntityValues(requestBody.sessionId,city.neighborhoods);
                                    }
                                }); 
                            });
                            parameterscontextout["original_city"]=requestBody.result.parameters["geo-city"];
                            // default values for original cost of live
                            parameterscontextout["original_cost_of_live"]="Unknown";
                            parameterscontextout["original_cost_of_live"]="Unknown";
                            
                            data.rent.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    if(parameterscontextout["original_city"]==city.name){
                                        parameterscontextout["original_cost_of_live"]=city.cost_of_live; 
                                    }
                                    if(parameterscontextout["distination_city"]==city.name){
                                        parameterscontextout["distination_cost_of_live"]=city.cost_of_live; 
                                        
                                    }
                                }); 
                            });

                            // build the speech to the user
                            speech="cost of living in " 
                            +parameterscontextout["original_city"]
                            +" is "
                            +parameterscontextout["original_cost_of_live"]
                            +"GBP per month in compare to cost of live of "
                            +parameterscontextout["distination_cost_of_live"]
                            +"GBP in a place you will move to, "
                            +parameterscontextout["distination_city"]
                            
                            +", are you ready continue to rent budget?";   
                        }
                        else{
                             console.log("no geo-city");
                        }
                    }
                    else{
                             console.log("no parameters");
                    }
                }
               
                // logic for input.city.rent
                else if (requestBody.result.action=="input.city.rent") {
                    let neighborhoods=[];
                    
                    // default values 
                    parameterscontextout["original_cost_of_rent_range"]="Unknown";
                    parameterscontextout["distination_cost_of_rent_range"]="Unknown";
                    
                    // find the range of the rent cost
                    data.rent.forEach(function(element) {
                        element.cities.forEach(function(city) {
                            if(parameterscontextout["distination_city"]==city.name){
                                parameterscontextout["distination_cost_of_rent_range"]=city.cost_of_rent_range; 
                                city.neighborhoods.forEach(function(neighborhood) {
                                    neighborhoods.push(neighborhood.name);
                                });
                            }
                            if(parameterscontextout["original_city"]==city.name){
                                parameterscontextout["original_cost_of_rent_range"]=city.cost_of_rent_range; 
                            }
                        }); 
                    });

                    // build the speech to the user
                    speech="average rent in " 
                    +parameterscontextout["distination_city"]
                    +" is "
                    +parameterscontextout["distination_cost_of_rent_range"]
                    +"GBP per month and your city now "
                    + parameterscontextout["original_city"]
                    + " it is about "
                    + parameterscontextout["original_cost_of_rent_range"]
                    +"GBP, here are some popular neighborhoods "
                    +neighborhoods.join(',')
                    +", which one you want learn more?";   
                }
                // pick neighborhood and cost education 
                else if (requestBody.result.action=="input.neighborhood") {
                    var cost_of_rent_per_neighborhood="";
                    var neighborhood_commute_time="";
                    // find the rent cost per flat type
                    data.rent.forEach(function(element) {
                        element.cities.forEach(function(city) {
                            if(parameterscontextout["distination_city"]==city.name){
                                city.neighborhoods.forEach(function(neighborhood) {
                                    if(neighborhood.name==requestBody.result.parameters["Neighborhood"]){
                                        parameterscontextout["distination_Neighborhood"]=requestBody.result.parameters["Neighborhood"]; 
                                        parameterscontextout["distination_neighborhood_commute_time"]=neighborhood.commute_time;
                                        neighborhood.cost_of_rent.forEach(function(cost_of_rent) {
                                            cost_of_rent_per_neighborhood+=" in "
                                            +cost_of_rent.type_of_flat
                                            +" average price "
                                            +cost_of_rent.cost_general
                                            +" employee average price "
                                            +cost_of_rent.cost_employee;
                                        });
                                    }
                                });
                            }
                        }); 
                    });

                    // build the speech to the user
                    speech="you choosed " 
                    +parameterscontextout["distination_Neighborhood"]
                    +"with commute time of "
                    +parameterscontextout["distination_neighborhood_commute_time"]+"minutes"
                    + " "
                    +cost_of_rent_per_neighborhood
                    +", pick another neighborhood or if you are happy with this one pick type of flat you want";   

                }
                // picked type of flat
                else if (requestBody.result.action=="input.typeofflat") {
                    try
                    {
                        parameterscontextout=getContext(requestBody.result.action,parameterscontextout,requestBody);
                    }
                    catch(err){
                        console.log(err);
                    }

                    let template=getTemplate(requestBody.result.action);
                    // build the speech to the user
                    speech = getSpeech(template, parameterscontextout);



                }
                else if (requestBody.result.action=="input.transport") {

                    try
                    {
                        parameterscontextout=getContext(requestBody.result.action,parameterscontextout,requestBody);
                    }
                    catch(err){
                        console.log(err);
                    }
                    
                    let template=getTemplate(requestBody.result.action);
                    // build the speech to the user
                    speech = getSpeech(template, parameterscontextout);
                    
                }
                else if (requestBody.result.action=="input.food.eatingout") {
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

                }
                else if (requestBody.result.action=="input.food.lunchout") {
                    try
                    {
                        parameterscontextout=getContext(requestBody.result.action,parameterscontextout,requestBody);
                    }
                    catch(err){
                        console.log(err);
                    }
                    
 
                    let template=getTemplate(requestBody.result.action);
                    // build the speech to the user
                    speech = getSpeech(template, parameterscontextout);

                }
                else{
                    // check what is the resonse to api ai we need to send to use its message
                    console.log("no action");
                }            

                return {
            speech: speech,
            displayText: speech,
            data:parameterscontextout,
            source: 'apiai-webhook-sample',
            contextOut: [{"name":"datakeeper", "lifespan":100, "parameters":parameterscontextout}]
        };

}


var getSpeech=function(template, parameterscontextout){
    let speech=format(template, parameterscontextout);
    return speech;
}

var getContext=function(action,parameterscontextout,requestBody){
    let context=require('./actions/'+action+'/context_'+action).processor(parameterscontextout,requestBody);
    return context;
}

var getTemplate=function(action){
    let template=require('fs').readFileSync('./actions/'+action+'/template_'+action+'.txt', 'utf8');
    return template;
}


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
