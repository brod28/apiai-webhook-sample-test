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
        "cost_of_live": "320"
      }
    ]
  },
  {
    "country": "UK",
    "cost_of_live": "500",
    "cities": [
      {
        "name": "London",
        "cost_of_live": "800"
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
        "cost_of_live": "500"
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

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action=="input.city") {
                    if (requestBody.result.parameters) {
                        if (requestBody.result.parameters["geo-city"]) {
                            let  cost_of_live="Unknown";
                            data.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    if(requestBody.result.parameters["geo-city"]==city.name){
                                        cost_of_live=city.cost_of_live; 
                                    }
                                }); 
                            });

                            speech="cost of living in " +requestBody.result.parameters["geo-city"]+ " is "+cost_of_live+"GBP per month ";
                        }
                        else{
                            speech="no geo-city"
                        }
                    }
                    else{
                        speech="no parameters"
                    }
                }
                else{
                    if (requestBody.result.resolvedQuery) {
                        speech += requestBody.result.resolvedQuery;
                        speech += ' ';
                    }

                    if (requestBody.result.action) {
                        speech += 'action: ' + requestBody.result.action;
                    }
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
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
                "id": "8f89439f-ea75-42a0-a095-cc33e3787673",
                "timestamp": "2017-07-25T18:37:38.374Z",
                "lang": "en",
                "result": {
                    "source": "agent",
                    "resolvedQuery": "I live in Tel Aviv",
                    "action": "input.city",
                    "actionIncomplete": false,
                    "parameters": {
                    "geo-city": "Tel Aviv"
                    },
                    "contexts": [],
                    "metadata": {
                    "intentId": "f9d1898b-53eb-4603-bd26-eb54ee2f1e6d",
                    "webhookUsed": "true",
                    "webhookForSlotFillingUsed": "true",
                    "intentName": "City"
                    },
                    "fulfillment": {
                    "speech": "",
                    "messages": [
                        {
                        "type": 0,
                        "speech": ""
                        }
                    ]
                    },
                    "score": 1
                },
                "status": {
                    "code": 206,
                    "errorType": "partial_content",
                    "errorDetails": "Webhook call failed. Error: 400 Bad Request"
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
