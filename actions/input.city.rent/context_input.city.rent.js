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
                        neighborhoods.push({name:neighborhood.name,percent_of_people:neighborhood.percent_of_people_from_your_company});
                    });
                    parameterscontextout["distination_city_cost_of_1_bed_room"]=city.cost_of_1_bed_room; 
                    parameterscontextout["distination_city_cost_of_room"]=city.cost_of_room; 
                }
                if(parameterscontextout["from_city"]==city.name){
                    parameterscontextout["from_city_cost_of_1_bed_room"]=city.cost_of_1_bed_room; 
                    parameterscontextout["from_city_cost_of_room"]=city.cost_of_room; 
                    parameterscontextout["from_city_cost_of_rent_range"]=city.cost_of_rent_range; 
                }
            }); 
        });

        parameterscontextout["distination_list_of_neighborhoods"]="";
        neighborhoods.forEach(function(element) {
            parameterscontextout["distination_list_of_neighborhoods"]+=" "+element.name+" ("+element.percent_of_people+"% of employees lived there) ";
        });
        return parameterscontextout; 
    } 
}