'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    parameterscontextout["Transport"]=requestBody.result.parameters["Transport"];
    parameterscontextout["Transport_cost"]="unknown";

    let city=jsonQuery('rent[**].cities[name='+parameterscontextout["distination_city"]+' ]', {
        data: data
    }).value;



    parameterscontextout["food_cost_monthly_average_cost"]=city.food_cost.monthly_average_cost;
    
    if(city.transport_cost[parameterscontextout["Transport"]]){
        parameterscontextout["Transport_cost"]=city.transport_cost[parameterscontextout["Transport"]];
    }
    return parameterscontextout; 
  } 
}