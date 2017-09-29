'use strict';

const data = require('../../data.js');
const infographics = require('../../infographics.js');
const context_common = require('../../context.common.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // after go to next intent
    parameterscontextout["fire_event"]="next";

    

    return parameterscontextout; 
  } 
}


