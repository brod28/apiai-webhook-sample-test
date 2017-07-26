'use strict';
const data = require('./data.js');

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
                // logic for input.city action
                if (requestBody.result.action=="input.city") {
                    if (requestBody.result.parameters) {
                        if (requestBody.result.parameters["geo-city"]) {
                            // set the distination city and the original city
                            parameterscontextout["distination_city"]="London";
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
                    var cost_of_rent_per_neighborhood="";
                    // find the rent cost per flat type
                    data.rent.forEach(function(element) {
                        element.cities.forEach(function(city) {
                            if(parameterscontextout["distination_city"]==city.name){
                                city.neighborhoods.forEach(function(neighborhood) {
                                    if(neighborhood.name==parameterscontextout["distination_Neighborhood"]){
                                        neighborhood.cost_of_rent.forEach(function(cost_of_rent) {
                                            if(cost_of_rent.type_of_flat==requestBody.result.parameters["FlatType"]){
                                                parameterscontextout["distination_type_of_flat"]=cost_of_rent.type_of_flat;
                                                parameterscontextout["distination_cost_of_rent_general"]=cost_of_rent.cost_general;
                                                parameterscontextout["distination_cost_of_rent_employee"]=cost_of_rent.cost_employee;
                                            }
                                        });
                                    }
                                });
                            }
                        }); 
                    });

                    // build the speech to the user
                    speech="we will look for some option for you in "
                    +parameterscontextout["distination_city"]
                    +" in neighborhood" 
                    +parameterscontextout["distination_Neighborhood"]
                    +" it should cost arround "
                    +parameterscontextout["distination_cost_of_rent_general"]
                    +" flat type will be "
                    +parameterscontextout["distination_type_of_flat"]
                    +" that means commute time of "
                    +parameterscontextout["distination_neighborhood_commute_time"]+" minutes "
                    +", we will update you regarding the progress."



                }
                else{
                    console.log("no action");
                }            

                return {
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample',
            contextOut: [{"name":"datakeeper", "lifespan":100, "parameters":parameterscontextout}]
        };

}