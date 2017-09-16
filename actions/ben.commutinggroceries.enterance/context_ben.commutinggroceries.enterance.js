'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    
    // after go to next intent
    parameterscontextout["fire_event"]="commutinggroceries_question";


    

    return parameterscontextout; 
  } 
}


