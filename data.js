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
 req:{"body":
    {
  "id": "757bf7c9-fddf-42a1-923b-50df294ae51f",
  "timestamp": "2017-07-26T20:29:43.761Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "yes",
    "action": "input.city.rent",
    "actionIncomplete": false,
    "parameters": {},
    "contexts": [
      {
        "name": "rent-yes-followup",
        "parameters": {},
        "lifespan": 2
      },
      {
        "name": "datakeeper",
        "parameters": {
          "original_cost_of_live": "320",
          "original_city": "Tel Aviv",
          "distination_cost_of_live": "800",
          "distination_city": "London"
        },
        "lifespan": 99
      },
      {
        "name": "city-followup",
        "parameters": {
          "geo-city": "Tel Aviv",
          "geo-city.original": "Tel Aviv"
        },
        "lifespan": 1
      }
    ],
    "metadata": {
      "intentId": "75fc8fc5-1b4a-43d4-98e6-493c3965a20f",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "true",
      "intentName": "Rent - yes"
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
};
