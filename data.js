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
            "name":"Shordith",
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
 req:{"body":
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
};
