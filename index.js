'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.js');

const restService = express();
restService.use(bodyParser.json());

var func=function (req, res) {

    
    console.log('hook request');

    try {
        var speech = 'empty speech';
        

        if (req.body) {
            var requestBody = req.body;

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
                speech = '';
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
                            speech="no geo-city"
                        }
                    }
                    else{
                        speech="no parameters"
                    }
                }
               
                // logic for input.city.rent
                else if (requestBody.result.action=="input.city.rent") {
                    // default values 
                    parameterscontextout["original_cost_of_rent_range"]="Unknown";
                    parameterscontextout["distination_cost_of_rent_range"]="Unknown";
                    
                    // find the range of the rent cost
                    data.rent.forEach(function(element) {
                        element.cities.forEach(function(city) {
                            if(parameterscontextout["distination_city"]==city.name){
                                parameterscontextout["distination_cost_of_rent_range"]=city.cost_of_rent_range; 
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
                    +"GBP, but it depends what kind of flat do you want?";   
                }
                else{
                    speech="no action"
                }            
            }
            else{
                speech="no body to the request"
            }            
        }
        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample',
            contextOut: [{"name":"datakeeper", "lifespan":100, "parameters":parameterscontextout}]
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}


restService.get('/hook',function(req,res) {
var req = data.req;  
return func(req,{});

});

restService.post('/hook',function(req,res) {
    return func(req,res) 
});


restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
