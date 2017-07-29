'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    var cost_of_rent_per_neighborhood="";

    let cost_of_rent=jsonQuery(
        'rent[**]'
        +'.cities[name='+parameterscontextout["distination_city"]+' ]'
        +'.neighborhoods[name='+parameterscontextout["distination_Neighborhood"]+' ]'
        +'.cost_of_rent[type_of_flat='+parameterscontextout["FlatType"]+' ]'
        , {
        data: data
    }).value;

    parameterscontextout["distination_type_of_flat"]=cost_of_rent.type_of_flat;
    parameterscontextout["distination_cost_of_rent_general"]=cost_of_rent.cost_general;
    parameterscontextout["distination_cost_of_rent_employee"]=cost_of_rent.cost_employee;
    return parameterscontextout; 
  } 
}