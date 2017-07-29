'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
 
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

    return parameterscontextout; 
  } 
}