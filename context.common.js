'use strict';
const jsonQuery = require('json-query')

module.exports = {
  commutinggroceries_amount_text(parameterscontextout,requestBody){
    
    
    let not_required_transportation=jsonQuery('result.contexts[name="not_required_transportation" ]', {
        data: requestBody
    }).value;
    
    let not_required_grocery=jsonQuery('result.contexts[name="not_required_grocery"]', {
        data: requestBody
    }).value;
    
    
    if(not_required_grocery!=undefined && not_required_transportation!=undefined){
      parameterscontextout["commutinggroceries_amount_text"]="As you can see that takes your total minimum expense to {AMOUNT}."
    }
    else{
      parameterscontextout["commutinggroceries_amount_text"]="I've added {AMOUNT} to your expenses"
    }
  
  }
};


