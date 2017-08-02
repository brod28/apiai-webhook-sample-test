'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    let distination_city_food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["distination_city"]+' ]', {
        data: data
    }).value.food_cost;

    let city_from_food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["city_from"]+' ]', {
        data: data
    }).value.food_cost;

    parameterscontextout["distination_city_cost_of_eating_once_out_a_week_out_per_month"]=food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["distination_city_cost_of_not_bringing_food_from_home"]=food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["distination_city_cost_of_grocery"]=food_cost.monthly_average_cost;
    parameterscontextout["total_food_cost"]=parameterscontextout["distination_city_cost_of_grocery"]+parameterscontextout["distination_city_cost_of_eating_once_out_a_week_out_per_month"]*parameterscontextout["number_of_goingout_per_week"];
    parameterscontextout["city_from_cost_of_eating_once_out_a_week_out_per_month"]=city_from_food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["city_from_cost_of_not_bringing_food_from_home"]=city_from_food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["city_from_cost_of_grocery"]=city_from_food_cost.monthly_average_cost;
    parameterscontextout["cooking_at_home"]=7-parameterscontextout["number_of_goingout_per_week"];
    parameterscontextout["total_cost"]=parameterscontextout["distination_cost_of_rent_general"] + parameterscontextout["cooking_at_home"] + parameterscontextout["transport_cost"];


    return parameterscontextout; 
  } 
}