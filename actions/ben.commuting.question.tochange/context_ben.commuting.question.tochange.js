'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')
const apiai = require("apiai");
const context_common = require('../../context.common.js');


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {

    context_common.commutinggroceries_amount_text(parameterscontextout,requestBody);
    

    return parameterscontextout; 
  } 
}


