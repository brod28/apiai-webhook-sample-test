'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    parameterscontextout["cost_of_rent_per_neighborhood"]="";
                    // find the rent cost per flat type
                    data.rent.forEach(function(element) {
                        element.cities.forEach(function(city) {
                            if(parameterscontextout["distination_city"]==city.name){
                                city.neighborhoods.forEach(function(neighborhood) {
                                    if(neighborhood.name==requestBody.result.parameters["Neighborhood"]){
                                        parameterscontextout["distination_neighborhood_commute_time"]=neighborhood.commute_time;
                                        neighborhood.cost_of_rent.forEach(function(cost_of_rent) {
                                            parameterscontextout["cost_of_rent_per_neighborhood"]+=" in "
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

    return parameterscontextout; 
  } 
}