'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const infographics = require('../../infographics.js');
const context_common = require('../../context.common.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    
    // after go to next intent
    parameterscontextout["fire_event"]="rent_summary_question";
    parameterscontextout["rent_cost"]=context_common.get_rent_cost(requestBody);
    
    infographics.infographic_4(parameterscontextout,requestBody);

    return parameterscontextout; 
  } 
}


