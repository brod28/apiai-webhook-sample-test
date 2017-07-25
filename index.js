'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const data=[
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

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action=="input.city") {
                    if (requestBody.result.parameters) {
                        if (requestBody.result.parameters.geo-city) {
                            let  cost_of_live="Unknown";
                            data.forEach(function(element) {
                                element.cities.forEach(function(city) {
                                    cost_of_live=city.cost_of_live; 
                                }); 
                            });

                            speech="cost of living in " +requestBody.result.parameters.geo-city+ " is "+cost_of_live+"GBP per month ";
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
            speech: 'Dima the king 1 1 1 - ' +speech,
            displayText: 'Dima the king 1 1 - ' + speech,
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
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
