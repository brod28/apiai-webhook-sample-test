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
        "food_cost":{
          "monthly_average_cost":200,
          "cost_of_eating_once_out_a_week_out_per_month":20,
          "cost_of_not_bringing_food_from_home":10
        },
        "transport_cost":{
          "bus":10,
          "train":10,
          "tube":10,
          "bicycle":10,
          "bus":10,
        },
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
 req:{
  body:JSON.parse(require('fs').readFileSync('./mockdata.json', 'utf8'))
  }
};
