'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    // after go to next intent
    parameterscontextout["fire_event"]="next";
    parameterscontextout["Infographics"]={number:1,data:{price:1,name:"vasia"}};

    

    return parameterscontextout; 
  } 
}


