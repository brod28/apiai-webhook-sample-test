'use strict';

const data = require('../../data.js');
const jsonQuery = require('json-query')


module.exports = {
  processor:function(parameterscontextout,requestBody)
  {
    var cost_of_rent_per_neighborhood="";

    let neighborhood=jsonQuery(
        'rent[**]'
        +'.cities[name='+parameterscontextout["distination_city"]+' ]'
        +'.neighborhoods[name='+parameterscontextout["distination_neighborhood"]+' ]'
        , {
        data: data
    }).value;

    let cost_of_rent=jsonQuery(
        'rent[**]'
        +'.cities[name='+parameterscontextout["distination_city"]+' ]'
        +'.neighborhoods[name='+parameterscontextout["distination_neighborhood"]+' ]'
        +'.cost_of_rent[type_of_flat='+parameterscontextout["flattype"]+' ]'
        , {
        data: data
    }).value;

    parameterscontextout["distination_peers_living_in_neighbourhood"]=neighborhood.percent_of_people_from_your_company;
    parameterscontextout["distination_peers_living_in_type_of_flat"]=cost_of_rent.percent_of_people_from_your_company;
    parameterscontextout["distination_type_of_flat"]=cost_of_rent.type_of_flat;
    parameterscontextout["distination_cost_of_rent_general"]=cost_of_rent.cost_general;
    parameterscontextout["distination_cost_of_rent_employee"]=cost_of_rent.cost_employee;
    return parameterscontextout; 
  } 
}