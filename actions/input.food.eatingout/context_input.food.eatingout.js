'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    parameterscontextout["eatingout_per_week"]=requestBody.result.parameters["number_eatingout"];
    return parameterscontextout; 
  } 
}