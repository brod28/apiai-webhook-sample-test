'use strict';
const jsonQuery = require('json-query')

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
  
  }
};


