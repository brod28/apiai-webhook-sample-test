'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
    processor:function(parameterscontextout,requestBody)
    {
        let neighborhoods=[];
                        
        // default values 
        parameterscontextout["from_city_cost_of_rent_range"]="Unknown";
        parameterscontextout["distination_city_cost_of_rent_range"]="Unknown";
        
        // find the range of the rent cost
        data.rent.forEach(function(element) {
            element.cities.forEach(function(city) {
                if(parameterscontextout["distination_city"]==city.name){
                    parameterscontextout["distination_city_cost_of_rent_range"]=city.cost_of_rent_range; 
                    city.neighborhoods.forEach(function(neighborhood) {
                        neighborhoods.push(neighborhood.name);
                    });
                }
                if(parameterscontextout["from_city"]==city.name){
                    parameterscontextout["from_city_cost_of_rent_range"]=city.cost_of_rent_range; 
                }
            }); 
        });

        parameterscontextout["distination_list_of_neighborhoods"]=neighborhoods.join(',');
        return parameterscontextout; 
    } 
}