'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const infographics = require('../../infographics.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {

    // after go to next intent
    parameterscontextout["fire_event"]="rent_summary_question";
    infographics.infographic_4(parameterscontextout,requestBody);

    return parameterscontextout; 
  } 
}


