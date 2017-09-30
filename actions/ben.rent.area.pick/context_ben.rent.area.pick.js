'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const infographics = require('../../infographics.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // after go to next intent
    parameterscontextout["fire_event"]="next";
    infographics.infographic_3(parameterscontextout,requestBody);

    

    return parameterscontextout; 
  } 
}


