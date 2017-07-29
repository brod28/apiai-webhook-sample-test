'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    parameterscontextout["lunchouts_per_week"]=requestBody.result.parameters["number_lunchout"];
    
    
    let food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["distination_city"]+' ]', {
        data: data
    }).value.food_cost;

    parameterscontextout["cost_of_food_for_the_home"]=food_cost.monthly_average_cost;
    parameterscontextout["eatingout_cost_per_month"]=parameterscontextout["eatingout_per_week"]*food_cost.cost_of_eating_once_out_a_week_out_per_month;
    parameterscontextout["lunchouts_cost_per_month"]=parameterscontextout["lunchouts_per_week"]*food_cost.cost_of_not_bringing_food_from_home;
    parameterscontextout["total_food_cost"]=parameterscontextout["cost_of_food_for_the_home"]+parameterscontextout["eatingout_cost_per_month"]+parameterscontextout["lunchouts_cost_per_month"]
    parameterscontextout["total_cost"]=parseInt(parameterscontextout["distination_cost_of_rent_general"])+parameterscontextout["Transport_cost"]+parameterscontextout["total_food_cost"];
    

    return parameterscontextout; 
  } 
}