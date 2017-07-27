'use strict';
 
module.exports = {
  rent: [
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
        "neighborhoods":[
          {
            "name":"Islington",
            "commute_time":"30",
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
            ],
          },
          {
            "name":"Mayfair",
            "commute_time":"20",
            "cost_of_rent":[
                {
                    "type_of_flat":"entire flat",
                    "cost_employee": "3500",
                    "cost_general": "3600",
                },
                {
                    "type_of_flat":"private room",
                    "cost_employee": "1800",
                    "cost_general": "1800",
                },
                {
                    "type_of_flat":"shared room",
                    "cost_employee": "1500",
                    "cost_general": "1800",
                }
            ],
          },
          {
            "name":"Shordith",
            "commute_time":"40",
            "cost_of_rent":[
                {
                    "type_of_flat":"entire flat",
                    "cost_employee": "1500",
                    "cost_general": "1600",
                },
                {
                    "type_of_flat":"private room",
                    "cost_employee": "600",
                    "cost_general": "500",
                },
                {
                    "type_of_flat":"shared room",
                    "cost_employee": "400",
                    "cost_general": "500",
                }
            ],
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
],
 req:
{
  body:{
  "id": "55a9a0af-2816-4395-a785-8f7ccdc63277",
  "timestamp": "2017-07-27T22:31:55.655Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "Berlin",
    "action": "input.city",
    "actionIncomplete": false,
    "parameters": {
      "geo-city": "Berlin"
    },
    "contexts": [
      {
        "name": "datakeeper",
        "parameters": {
          "action": "input.city",
          "distination_city": "London",
          "original_city": "Berlin",
          "original_cost_of_live": "500",
          "distination_cost_of_live": "800"
        },
        "lifespan": 100
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
      "webhookForSlotFillingUsed": "false",
      "webhookResponseTime": 139,
      "intentName": "City"
    },
    "fulfillment": {
      "speech": "cost of living in Berlin is 500GBP per month in compare to cost of live of 800GBP in a place you will move to, London, are you ready continue to rent budget?",
      "source": "apiai-webhook-sample",
      "displayText": "cost of living in Berlin is 500GBP per month in compare to cost of live of 800GBP in a place you will move to, London, are you ready continue to rent budget?",
      "messages": [
        {
          "type": 0,
          "speech": "cost of living in Berlin is 500GBP per month in compare to cost of live of 800GBP in a place you will move to, London, are you ready continue to rent budget?"
        }
      ],
      "data": {
        "action": "input.city",
        "distination_city": "London",
        "original_city": "Berlin",
        "original_cost_of_live": "500",
        "distination_cost_of_live": "800"
      }
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
};
