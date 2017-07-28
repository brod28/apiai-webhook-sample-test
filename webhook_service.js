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
                    speech="first part of budget building is done, we will build it based on assumtion you will live in "
                    +parameterscontextout["distination_city"]
                    +" in neighborhood" 
                    +parameterscontextout["distination_Neighborhood"]
                    +" flat type will be "
                    +parameterscontextout["distination_type_of_flat"]
                    +" and the cost is "
                    +parameterscontextout["distination_cost_of_rent_general"]
                    +" now we will continue to collect information about your trasportation and food habits to finish "
                    +" your budget building, please let me know which transport you are going to use? ";



                }
                else if (requestBody.result.action=="input.transport") {
                    let food_cost_monthly_average_cost=0;
                    if (requestBody.result.parameters) {
                        if (requestBody.result.parameters["Transport"]) {

                            parameterscontextout["Transport"]=requestBody.result.parameters["Transport"];
                            parameterscontextout["Transport_cost"]="unknown";
                            data.rent.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    if(parameterscontextout["distination_city"]==city.name){
                                        food_cost_monthly_average_cost=city.food_cost.monthly_average_cost;
                                        if(city.transport_cost[parameterscontextout["Transport"]]){
                                            parameterscontextout["Transport_cost"]=city.transport_cost[parameterscontextout["Transport"]];
                                        }
                                    }
                                }); 
                            });

                            // build the speech to the user
                            speech="cost of " 
                            +parameterscontextout["Transport"]
                            +" is "
                            +parameterscontextout["Transport_cost"]
                            +"GBP per month in "
                            +parameterscontextout["distination_city"]
                            +"GBP, last thing is food cost, if you are not going out and bring food from home " 
                            +"for your lunch and not going out, it will be "
                            +food_cost_monthly_average_cost 
                            +"but you do go out, how many times are you going out in average a week?";   
                        }
                        else{
                             console.log("no geo-city");
                        }
                    }
                    else{
                             console.log("no parameters");
                    }
                }
                else if (requestBody.result.action=="input.food.eatingout") {
                    parameterscontextout["eatingout_per_week"]=requestBody.result.parameters["number_eatingout"];
                    // build the speech to the user
                    speech=" and how many times a week you will not bring food from home?"
                }
                else if (requestBody.result.action=="input.food.lunchout") {
                    parameterscontextout["lunchouts_per_week"]=requestBody.result.parameters["number_lunchout"];
                    let food_cost;
                     data.rent.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    if(parameterscontextout["distination_city"]==city.name){
                                        food_cost=city.food_cost;
                                        parameterscontextout["cost_of_food_for_the_home"]=food_cost.monthly_average_cost;
                                        parameterscontextout["eatingout_cost_per_month"]=parameterscontextout["eatingout_per_week"]*food_cost.cost_of_eating_once_out_a_week_out_per_month;
                                        parameterscontextout["lunchouts_cost_per_month"]=parameterscontextout["lunchouts_per_week"]*food_cost.cost_of_not_bringing_food_from_home;
                                        parameterscontextout["total_food_cost"]=parameterscontextout["cost_of_food_for_the_home"]+parameterscontextout["eatingout_cost_per_month"]+parameterscontextout["lunchouts_cost_per_month"]
                                    }
                                }); 
                            });
                    parameterscontextout["total_cost"]=parameterscontextout["total_food_cost"]+parameterscontextout["Transport_cost"]+parameterscontextout["total_food_cost"];
                    // build the speech to the user
                    speech=" ok, i had few calculation and you food cost per month will be "
                    +parameterscontextout["total_food_cost"]
                    +" GBP it includes your grocery of "
                    +parameterscontextout["cost_of_food_for_the_home"]
                    +" GBP, "
                    +parameterscontextout["eatingout_per_week"]
                    +" times a week to eat out "
                    +parameterscontextout["eatingout_cost_per_month"]
                    +" GBP and also "
                    +parameterscontextout["lunchouts_per_week"]
                    +" times a week to have lunch out of the office  "
                    +parameterscontextout["lunchouts_cost_per_month"]
                    +" GBP. let's summurise all your budget rent is going to be "
                    +parameterscontextout["distination_cost_of_rent_general"]
                    +" GBP and transportation "
                    +parameterscontextout["Transport_cost"]
                    +" GBP because you decided to use "
                    +parameterscontextout["Transport"]
                    + "GBP and food cost of "
                    +parameterscontextout["total_food_cost"]
                    + "GBP and total cost of "
                    +parameterscontextout["total_cost"]
                    +" GBP, I hope you are happy with the result, ok i have to run to pick my children so if something is not clear"
                    +" please sent me an email to noreplay@benivo.com";

                }
                else{
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
