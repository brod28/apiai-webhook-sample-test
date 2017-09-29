'use strict';
 

module.exports = {
  rent: [
  {
    "country": "Israel",
    "cost_of_live": 500,
    "cities": [
      {
        "name": "Tel Aviv",
        "cost_of_live": 320,
        "cost_of_room": 230,
        "cost_of_1_bed_room": 470,
        "cost_of_rent_range": "300-1500",
        "food_cost":{
          "monthly_average_cost":100,
          "cost_of_eating_once_out_a_week_out_per_month":10,
          "cost_of_not_bringing_food_from_home":17
        },

        "cost_of_rent":[
            {
                "type_of_flat":"entire flat",
                "cost_employee": 1500,
                "cost_general": 1600,
            },
            {
                "type_of_flat":"private room",
                "cost_employee": 500,
                "cost_general": 600,
            },
            {
                "type_of_flat":"shared room",
                "cost_employee": 300,
                "cost_general": 300,
            }

        ]
      }
    ]
  },
  {
    "country": "UK",
    "cost_of_live": 500,
    "cities": [
      {
        "name": "London",
        "cost_of_live": 800,
        "cost_of_rent_range": "400-2500",
        "cost_of_room": 40,
        "cost_of_1_bed_room": 900,
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
            "commute_time":30,
            "percent_of_people_from_your_company":5,
            "why_to_love_it":"it's one of the most trendy areas in London. it has the nicer people in the town",
            "cost_of_rent":[
                {
                    "type_of_flat":"entire flat",
                    "cost_employee": 2500,
                    "cost_general": 2600,
                    "percent_of_people_from_your_company":50,
                },
                {
                    "type_of_flat":"private room",
                    "cost_employee": 800,
                    "cost_general": 800,
                    "percent_of_people_from_your_company":25,
                },
                {
                    "type_of_flat":"shared room",
                    "cost_employee": 500,
                    "cost_general": 400,
                    "percent_of_people_from_your_company":25,
                }
            ],
          },
          {
            "name":"Mayfair",
            "commute_time":20,
            "percent_of_people_from_your_company":15,
            "why_to_love_it":"it's one of the most trendy areas in London. it has the best restaurants in London",
            "cost_of_rent":[
                {
                    "type_of_flat":"entire flat",
                    "cost_employee": 3500,
                    "cost_general": 3600,
                    "percent_of_people_from_your_company":30,
                },
                {
                    "type_of_flat":"private room",
                    "cost_employee": 1800,
                    "cost_general": 1800,
                    "percent_of_people_from_your_company":20,
                },
                {
                    "type_of_flat":"shared room",
                    "cost_employee": 1500,
                    "cost_general": 1800,
                    "percent_of_people_from_your_company":50,
                }
            ],
          },
          {
            "name":"Shordith",
            "commute_time":40,
            "percent_of_people_from_your_company":80,
            "why_to_love_it":"it's one of the most trendy areas in London. it's home to the Shoreditch market and had some great street art",            
            "cost_of_rent":[
                {
                    "type_of_flat":"entire flat",
                    "cost_employee": 1500,
                    "cost_general": 1600,
                    "percent_of_people_from_your_company":50,

                },
                {
                    "type_of_flat":"private room",
                    "cost_employee": 600,
                    "cost_general": 500,
                    "percent_of_people_from_your_company":50,
                },
                {
                    "type_of_flat":"shared room",
                    "cost_employee": 400,
                    "cost_general": 500,
                    "percent_of_people_from_your_company":0,
                }
            ],
          }
        ]
      },
      {
        "name": "Liverpool",
        "cost_of_live": 400,
        "cost_of_room": 40,
        "cost_of_1_bed_room": 90,
      },
      {
        "name": "Oxford",
        "cost_of_live": 500,
        "cost_of_room": 40,
        "cost_of_1_bed_room": 90,
      }
    ]
  },
  {
    "country": "Germany",
    "cost_of_live": 300,
    "cities": [
      {
        "name": "Berlin",
        "cost_of_live": 500,
        "cost_of_room": 200,
        "cost_of_1_bed_room": 400,
        "cost_of_rent_range": "50-600",
        "food_cost":{
          "monthly_average_cost":150,
          "cost_of_eating_once_out_a_week_out_per_month":30,
          "cost_of_not_bringing_food_from_home":7
        },

        "cost_of_rent":[
            {
                "type_of_flat":"entire flat",
                "cost_employee": 500,
                "cost_general": 600,
            },
            {
                "type_of_flat":"private room",
                "cost_employee": 200,
                "cost_general": 200,
            },
            {
                "type_of_flat":"shared room",
                "cost_employee": 50,
                "cost_general": 70,
            }

        ]
      },
      {
        "name": "Munich",
        "cost_of_live": 200
      }
    ]
  }
],
 req:{
  body:JSON.parse(require('fs').readFileSync('./mockdata.json', 'utf8'))
  }
,
 country_data:{
  body:JSON.parse(require('fs').readFileSync('./data_country.json', 'utf8'))
  }
,
 area_data:{
  body:JSON.parse(require('fs').readFileSync('./data_area.json', 'utf8'))
  }
};
