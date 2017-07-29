'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    let food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["distination_city"]+' ]', {
        data: data
    }).value.food_cost;

    parameterscontextout["cost_of_grocery"]=food_cost.monthly_average_cost;
    parameterscontextout["eatingout_cost_per_month"]=parameterscontextout["number_of_goingout_per_week"]*food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["lunchout_cost_per_month"]=parameterscontextout["number_of_lunchout_per_week"]*food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["total_food_cost"]=parameterscontextout["cost_of_grocery"]+parameterscontextout["eatingout_cost_per_month"]+parameterscontextout["lunchout_cost_per_month"]
    parameterscontextout["total_cost"]=parseInt(parameterscontextout["distination_cost_of_rent_general"])+parameterscontextout["transport_cost"]+parameterscontextout["total_food_cost"];
    

    return parameterscontextout; 
  } 
}