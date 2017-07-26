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
  "id": "17e5586c-b9a9-4782-a627-7382b866de87",
  "timestamp": "2017-07-26T21:12:59.21Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "entire flat",
    "action": "input.typeofflat",
    "actionIncomplete": false,
    "parameters": {
      "FlatType": "Entire flat"
    },
    "contexts": [
      {
        "name": "datakeeper",
        "parameters": {
          "distination_cost_of_rent_range": "400-2500",
          "Neighborhood": "Shordith",
          "Neighborhood.original": "Shordith",
          "original_cost_of_live": "320",
          "original_city": "Tel Aviv",
          "distination_Neighborhood": "Shordith",
          "FlatType.original": "entire flat",
          "FlatType": "Entire flat",
          "original_cost_of_rent_range": "300-1500",
          "distination_cost_of_live": "800",
          "distination_neighborhood_commute_time": "40",
          "distination_city": "London"
        },
        "lifespan": 100
      }
    ],
    "metadata": {
      "intentId": "b1c2f0c0-3712-479b-9dd5-eae226c19d9d",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "true",
      "webhookResponseTime": 131,
      "intentName": "typeofflat"
    },
    "fulfillment": {
      "speech": "we will look for some option for you in London in neighborhoodShordith it should cost arround undefined flat type will be undefined that means commute time of 40 minutes , we will update you regarding the progress.",
      "source": "apiai-webhook-sample",
      "displayText": "we will look for some option for you in London in neighborhoodShordith it should cost arround undefined flat type will be undefined that means commute time of 40 minutes , we will update you regarding the progress.",
      "messages": [
        {
          "type": 0,
          "speech": "we will look for some option for you in London in neighborhoodShordith it should cost arround undefined flat type will be undefined that means commute time of 40 minutes , we will update you regarding the progress."
        }
      ]
    },
    "score": 0.7099999785423279
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "c85c5688-8c15-469d-8ab6-af54e8cc7327"
}   
}
};
