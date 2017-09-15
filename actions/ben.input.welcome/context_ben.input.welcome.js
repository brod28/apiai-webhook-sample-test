'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // default values for original cost of live
    parameterscontextout["from_city_cost_of_live"]="Unknown";
    parameterscontextout["from_city_cost_of_live"]="Unknown";
    

    return parameterscontextout; 
  } 
}


