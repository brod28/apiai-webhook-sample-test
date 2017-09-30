'use strict';
const jsonQuery = require('json-query')
const data = require('./data.js');
//sync request (even it is implemented with promises)
const  get_source_at = function(uri){
    var source;
      let request = require('request');
    request({ uri:uri}, function (error, response, body) {
        source = body;
        console.log(body);
    });
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
};
// return parameteres 
const get_parameters=function(requestBody){
    return jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters
}
module.exports = {
  infographic_1(parameterscontextout,requestBody){

      // examples of query context
      let original_city=get_parameters(requestBody).original_city;
     // use API (sync request) to get country for the original city

     let res=get_source_at('http://gd.geobytes.com/AutoCompleteCity?callback=?&q='+original_city)

    let countries=JSON.parse(res.substr(2).slice(0, -2));

    let country="";

    // check that country is not United State or Canada and country was not assign yet
    countries.forEach(function(element) {
        if(!element.includes("United States")){
            if(!element.includes("Canada")){
                if(country==""){
                    // extract just the country from the response
                    country=element.split(',')[element.split(',').length-1].substr(1);
                }
            }
        }
    })
        
    // get comperision data for this country
    let country_data=jsonQuery('body[Country='+country+']', {
        data: data.country_data
    }).value;

    parameterscontextout["Infographics"]={number:1,data:{country_data:country_data}};
  },
  infographic_2(parameterscontextout,requestBody){
      parameterscontextout["Infographics"]={number:2};
  },
  infographic_3(parameterscontextout,requestBody){
    let area_to_stay=get_parameters(requestBody).area_to_stay;

    let area_data=jsonQuery('body[Name_of_area='+area_to_stay+']', {
        data: data.area_data
    }).value;

    parameterscontextout["Infographics"]={number:3,area_to_stay:area_data};
  },
  infographic_4(parameterscontextout,requestBody){
    let area_to_stay=get_parameters(requestBody).area_to_stay;
    let flattype_to_stay=get_parameters(requestBody).flattype_to_stay;


    let area_data=jsonQuery('body[Name_of_area='+area_to_stay+']', {
        data: data.area_data
    }).value[0];
    
    let rent=area_data.Non-SI_1_bed_rent;
    
    if(area_data=="room"){
        rent=area_data.Non-SI_room_rent;
    }

    let data_infographic={
        rent:rent,
        destination_city:parameterscontextout["distination_city"],
        name:parameterscontextout["user_name"]
    };

    parameterscontextout["Infographics"]={number:4,data_infographic:data_infographic};
  },
   infographic_10(parameterscontextout,requestBody){
    
      // examples of query context
      let original_city=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.original_city
      let area_to_stay=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.area_to_stay[0]
      let flattype_to_stay=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.flattype_to_stay[0]
      let TransportationType=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.TransportationType[0]
      let TimesAWeek=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.TimesAWeek
      
      let country_data=jsonQuery('body[Country=Netherlands]', {
          data: data.country_data
      }).value;

      parameterscontextout["Infographics"]={number:1,data:{country_data:country_data}};
  }



};


