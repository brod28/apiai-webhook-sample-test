'use strict';
const jsonQuery = require('json-query')
const data = require('./data.js');

module.exports = {
  commutinggroceries_amount_text(parameterscontextout,requestBody){
    
    let not_required_transportation=jsonQuery('result.contexts.[*].name', {
        data: requestBody
    }).value.indexOf("not_required_transportation");

    let not_required_grocery=jsonQuery('result.contexts.[*].name', {
        data: requestBody
    }).value.indexOf("not_required_groceries");
    
    
    if(not_required_grocery!=-1 && not_required_transportation!=-1){
      parameterscontextout["commutinggroceries_amount_text"]="As you can see that takes your total minimum expense to {AMOUNT}."
    }
    else{
      parameterscontextout["commutinggroceries_amount_text"]="I've added {AMOUNT} to your expenses"
    }
  
  },

  //sync request (even it is implemented with promises)
  get_source_at(uri){
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
  },
// return parameteres 
  get_parameters(requestBody){
    return jsonQuery('result.contexts[name=datakeeper]', {
          data: requestBody
      }).value.parameters
  },

//return the relevant area data
  get_area_data(requestBody){
    let area_to_stay=this.get_parameters(requestBody).area_to_stay;
    let area_data=jsonQuery('body[Name_of_area='+area_to_stay+']', {
        data: data.area_data
    }).value;
    return area_data;
  },
// calculate transportation cost
  get_transportation_cost(requestBody){
    
    let transportationType=this.get_parameters(requestBody).TransportationType;

    let area_data=this.get_area_data(requestBody);

    let transportation_cost=area_data.Cost_of_tube;
    if(transportationType=="bike"){
        let transportation_cost=area_data.Cost_of_bike;
    }
    if(transportationType=="walk"){
        let transportation_cost=area_data.Cost_of_walk;
    }

    return transportation_cost;
  },
// calculation of grocceries cost
  get_groceries_cost(requestBody){
    
    let grocerries_cost=data.grocerries_cost;
    let timesAWeek=this.get_parameters(requestBody).TimesAWeek;

    let grocerry_cost=data.grocerries_cost._7days;
    if(timesAWeek==0){
        grocerry_cost=data.grocerries_cost._0days;
    }
    if(timesAWeek==1){
        grocerry_cost=data.grocerries_cost._1days;
    }
    if(timesAWeek==3){
        grocerry_cost=data.grocerries_cost._3days;
    }
    if(timesAWeek==5){
        grocerry_cost=data.grocerries_cost._5days;
    }

    return grocerry_cost;
  },
// calculation of rent cost
  get_rent_cost(requestBody){
    let flattype_to_stay=this.get_parameters(requestBody).flattype_to_stay;
    
    let area_to_stay=this.get_parameters(requestBody).area_to_stay;
    let area_data=jsonQuery('body[Name_of_area='+area_to_stay+']', {
        data: data.area_data
    }).value;
    
    let rent=area_data.Non_SI_1_bed_rent;
    
    if(flattype_to_stay=="room"){
        rent=area_data.Non_SI_room_rent;
    }
    return rent;
  }

};


