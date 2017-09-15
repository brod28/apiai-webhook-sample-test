'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // default values for original cost of live
    parameterscontextout["fire_event"]="original_city_question";
    

    return parameterscontextout; 
  } 
}


