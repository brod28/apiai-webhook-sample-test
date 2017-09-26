'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const context_common = require('../../context.common.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // examples of potential context
    //parameterscontextout["something"]="something";

    // examples of query context
    //let from_city_food_cost=jsonQuery('rent[**].cities[name='+parameterscontextout["from_city"]+' ]', {
    //    data: data
    //}).value.food_cost;

    context_common.commutinggroceries_amount_text(parameterscontextout,requestBody);


    return parameterscontextout; 
  } 
}


