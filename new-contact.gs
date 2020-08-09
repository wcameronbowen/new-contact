
function onFormSubmit(e) {
  
// Use form response passed to function

//get email and name
   var email = e.response.getRespondentEmail().toLowerCase();
   var itemResponses = e.response.getGradableItemResponses();
   var fullName = itemResponses[0].getResponse();
   var firstName = fullName.split(' ').slice(0, -1).join(' ');
   var lastName = fullName.split(' ').slice(-1).join(' ');
   
   
  //get score
  
  // If there aren't submitted responses, exit.
  if(itemResponses.length == 0) return 'No responses';
  
  //Sum scores
  var sum = 0;
  
  for( var i = 1; i < itemResponses.length; i++){
    var score = itemResponses[i].getScore();
    sum = sum + parseInt( score, 10 ); //don't forget to add the base
  }
    
  Logger.log(email);
  Logger.log(firstName);
  Logger.log(lastName);
  Logger.log(sum);

  // Send contact info to Sendgrid
  var SENDGRID_KEY ='xxx';

  var headers = {
    "Authorization" : "Bearer "+SENDGRID_KEY, 
    "Content-Type": "application/json" 
  }

  var body =
  {
    "contacts": [
      {
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "custom_fields": {
          "e2_N": sum
        }
      }
    ]
  }

  var options = {

    'method':'put',
    'headers':headers,
    'payload':JSON.stringify(body)
    
   }


 var response = UrlFetchApp.fetch("https://api.sendgrid.com/v3/marketing/contacts",options);

 Logger.log(response); 

}
