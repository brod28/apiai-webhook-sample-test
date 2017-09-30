'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const infographics = require('../../infographics.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
 
    
    infographics.infographic_8(parameterscontextout,requestBody);

   

    

    return parameterscontextout; 
  } 
}


