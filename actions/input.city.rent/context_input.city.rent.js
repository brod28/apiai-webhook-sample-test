'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
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

    parameterscontextout["distination_list_of_neighborhoods"]=neighborhoods.join(',');
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
