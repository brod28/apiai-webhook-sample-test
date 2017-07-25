'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const data=[
  {
    "country": "Israel",
    "cost_of_live": "500",
    "cities": [
      {
        "name": "Tel Aviv",
        "cost_of_live": "320",
        "cost_of_rent_range": "300-1500",
        "cost_of_rent":[
            {
                "type_of_flat":"entire flat",
                "cost_employee": "1500",
                "cost_general": "1600",
            },
            {
                "type_of_flat":"private room",
                "cost_employee": "500",
                "cost_general": "600",
            },
            {
                "type_of_flat":"shared room",
                "cost_employee": "300",
                "cost_general": "300",
            }

        ]
      }
    ]
  },
  {
    "country": "UK",
    "cost_of_live": "500",
    "cities": [
      {
        "name": "London",
        "cost_of_live": "800",
        "cost_of_rent_range": "400-2500",
        "cost_of_rent":[
            {
                "type_of_flat":"entire flat",
                "cost_employee": "2500",
                "cost_general": "2600",
            },
            {
                "type_of_flat":"private room",
                "cost_employee": "800",
                "cost_general": "800",
            },
            {
                "type_of_flat":"shared room",
                "cost_employee": "500",
                "cost_general": "400",
            }

        ]
      },
      {
        "name": "Liverpool",
        "cost_of_live": "400"
      },
      {
        "name": "Oxford",
        "cost_of_live": "500"
      }
    ]
  },
  {
    "country": "Germany",
    "cost_of_live": "300",
    "cities": [
      {
        "name": "Berlin",
        "cost_of_live": "500",
        "cost_of_rent_range": "50-600",
        "cost_of_rent":[
            {
                "type_of_flat":"entire flat",
                "cost_employee": "500",
                "cost_general": "600",
            },
            {
                "type_of_flat":"private room",
                "cost_employee": "200",
                "cost_general": "200",
            },
            {
                "type_of_flat":"shared room",
                "cost_employee": "50",
                "cost_general": "70",
            }

        ]
      },
      {
        "name": "Munich",
        "cost_of_live": "200"
      }
    ]
  }
];

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
                            
                            data.forEach(function(element) {
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
                    data.forEach(function(element) {
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
                    +", but it depends what kind of flat do you want?";   


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
    var req={"body":
                    {
  "id": "1948e6fc-4e60-40af-b45b-5c7f3eaa5479",
  "timestamp": "2017-07-25T21:07:35.841Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "I live in Berlin",
    "action": "input.city",
    "actionIncomplete": false,
    "parameters": {
      "geo-city": "Berlin"
    },
    "contexts": [
      {
        "name": "datakeeper",
        "parameters": {
          "distination_city": "London",
          "original_city": "Berlin",
          "original_cost_of_live": "500",
          "distination_cost_of_live": "800"
        },
        "lifespan": 99
      },
      {
        "name": "city-followup",
        "parameters": {
          "geo-city": "Berlin",
          "geo-city.original": "Berlin"
        },
        "lifespan": 2
      }
    ],
    "metadata": {
      "intentId": "f9d1898b-53eb-4603-bd26-eb54ee2f1e6d",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "true",
      "webhookResponseTime": 595,
      "intentName": "City"
    },
    "fulfillment": {
      "speech": "no parameters",
      "source": "apiai-webhook-sample",
      "displayText": "no parameters",
      "messages": [
        {
          "type": 0,
          "speech": "no parameters"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "c85c5688-8c15-469d-8ab6-af54e8cc7327"
}
}
return func(req,{});

});

restService.post('/hook',function(req,res) {
    return func(req,res) 
});


restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
