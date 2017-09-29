'use strict';
const jsonQuery = require('json-query')
const data = require('./data.js');

module.exports = {
  infographic_1(parameterscontextout,requestBody){

    parameterscontextout["debug"]=1;
      // examples of query context
      let original_city=jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters.original_city
     parameterscontextout["debug"]=2;
     // use API (sync request) to get country for the original city
      let request = require('sync-request');
     parameterscontextout["debug"]=3;
      let res = request('GET', 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q='+original_city);
           parameterscontextout["debug"]=4;

      let countries=JSON.parse(res.getBody('utf8').substr(2).slice(0, -2));
           parameterscontextout["debug1"]=countries;

      let country="";

      // check that country is not United State or Canada
      countries.forEach(function(element) {
          if(!element.includes("United States")){
            if(!element.includes("Canada")){
                // extract just the country from the response
                country=element.split(',')[element.split(',').length-1].substr(1);
               parameterscontextout["debug2"]=country;
            }
          }
      })
      
      // get comperision data for this country
      let country_data=jsonQuery('body[Country='+country+']', {
          data: data.country_data
      }).value;
               parameterscontextout["debug3"]=country_data;
      parameterscontextout["Infographics"]={number:1,data:{country_data:country_data}};
  },
    infographic_2(parameterscontextout,requestBody){
    
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


