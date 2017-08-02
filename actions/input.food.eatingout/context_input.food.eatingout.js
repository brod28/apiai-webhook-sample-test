'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    let distination_city_food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["distination_city"]+' ]', {
        data: data
    }).value.food_cost;

    let from_city_food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["from_city"]+' ]', {
        data: data
    }).value.food_cost;

    parameterscontextout["distination_city_cost_of_eating_once_out_a_week_out_per_month"]=distination_city_food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["distination_city_cost_of_not_bringing_food_from_home"]=distination_city_food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["distination_city_cost_of_grocery"]=distination_city_food_cost.monthly_average_cost;
    parameterscontextout["total_food_cost"]=parameterscontextout["distination_city_cost_of_grocery"]+parameterscontextout["distination_city_cost_of_eating_once_out_a_week_out_per_month"]*parameterscontextout["number_of_goingout_per_week"];
    parameterscontextout["city_from_cost_of_eating_once_out_a_week_out_per_month"]=from_city_food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["city_from_cost_of_not_bringing_food_from_home"]=from_city_food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["city_from_cost_of_grocery"]=from_city_food_cost.monthly_average_cost;
    parameterscontextout["cooking_at_home"]=7-parameterscontextout["number_of_goingout_per_week"];
    parameterscontextout["total_cost"]=parameterscontextout["distination_cost_of_rent_general"] + parameterscontextout["total_food_cost"] + parameterscontextout["transport_cost"];


    return parameterscontextout; 
  } 
}