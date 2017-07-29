'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // define the values of neighborhood entity in api ai for specific use based on distination
    data.rent.forEach(function(element) {
        element.cities.forEach(function(city) {
            if(parameterscontextout["distination_city"]==city.name){
                SetNeighborhoodEntityValues(requestBody.sessionId,city.neighborhoods);
            }
        }); 
    });
    
    // default values for original cost of live
    parameterscontextout["from_city_cost_of_live"]="Unknown";
    parameterscontextout["from_city_cost_of_live"]="Unknown";
    
    // query cost of live in the city user coming from and going to (usefull for comparacense)
    data.rent.forEach(function(element) {
        element.cities.forEach(function(city) {
            if(parameterscontextout["from_city"]==city.name){
                parameterscontextout["from_city_cost_of_live"]=city.cost_of_live; 
            }
            if(parameterscontextout["distination_city"]==city.name){
                parameterscontextout["distination_cost_of_live"]=city.cost_of_live; 
                
            }
        }); 
    });

    return parameterscontextout; 
  } 
}


// set variable values for user session in api ai
var SetNeighborhoodEntityValues=function(sessionId,neighborhoods){

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
