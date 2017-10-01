'use strict';
const jsonQuery = require('json-query')
const data = require('./data.js');
const context_common = require('./context.common.js');

module.exports = {
  infographic_1(parameterscontextout,requestBody){

  let country_data=context_common.get_original_country_data(requestBody);

    parameterscontextout["Infographics"]={
        number:1,
        data_infographic:{
            country_data:country_data
        }
    };
  },

  infographic_2(parameterscontextout,requestBody){
    parameterscontextout["Infographics"]={
        number:2
    };
  },

  infographic_3(parameterscontextout,requestBody){
    let area_data=context_common.get_area_data(requestBody);

    parameterscontextout["Infographics"]={
        number:3,
        data_infographic:area_data
    };
  },

  infographic_4(parameterscontextout,requestBody){

    let rent=context_common.get_rent_cost(requestBody);

    let data_infographic={
        rent:rent,
        destination_city:parameterscontextout["distination_city"],
        name:parameterscontextout["user_name"]
    };

    parameterscontextout["Infographics"]={
        number:4,
        data_infographic:data_infographic
    };
  },

  infographic_5(parameterscontextout,requestBody){
    let area_data=context_common.get_area_data(requestBody);

    parameterscontextout["Infographics"]={
        number:5,
        data_infographic:area_data
    };
  },
  
  infographic_6(parameterscontextout,requestBody){
    let grocerries_cost=data.grocerries_cost;
    parameterscontextout["Infographics"]={
        number:6,
        data_infographic:grocerries_cost
    };
  },
  
  infographic_7(parameterscontextout,requestBody){

    let cost={
        rent_cost:context_common.get_rent_cost(requestBody),
        transportation_cost:context_common.get_transportation_cost(requestBody),
        groceries_cost:context_common.get_groceries_cost(requestBody)
    }; 

    parameterscontextout["Infographics"]={
        number:7,
        data_infographic:cost
    };
  },

  infographic_8(parameterscontextout,requestBody){
    let user_cost={
        rent_cost:context_common.get_rent_cost(requestBody),
        transportation_cost:context_common.get_transportation_cost(requestBody),
        groceries_cost:context_common.get_groceries_cost(requestBody)
    }; 
    
    parameterscontextout["Infographics"]={
        number:8,
        data_infographic:{
            user_name:parameterscontextout["user_name"],
            distination_city:parameterscontextout["distination_city"],
            area_to_stay:context_common.get_parameters(requestBody).area_to_stay,
            user_cost:user_cost,
            others_cost:user_cost
        }
    };
  }
};


