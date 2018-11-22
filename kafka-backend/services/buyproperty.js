var Bookings = require("../../Backend/models/booking");
const request = require('request');

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/BUYPROPERTY.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services buyproperty.js handle request:" + JSON.stringify(msg)
  );

  //Post request to Hyperledger to save new transaction
  bodyData ={
        "buyer":msg.buyer,
        "seller":msg.seller,
        "trans_date":msg.date,
        "trans_amt":msg.price,
        "property":msg.propID
  }

  console.log("bodyData=" + bodyData)

  url="http://localhost:4000/api/org.digitalproperty.TransactionDetails"

  request.post({
        headers: {'content-type' : 'application/json'},
        url: url,
        body: bodyData,
        json: true
         }, function(error, response, body){
            if(error){ 
              console.log(
                "There was a problem in getting the transaction history from hyperledger."
              );
              console.log(error); 
              callback(null, []);
            }
            console.log(body);
            callback(null, JSON.stringify(body, undefined, 2));
    });

  
  //Save entry on MongoDB as well??
  // var booking_new = new Bookings({
  //   owner_email: msg.owner_email,
  //   traveler_email: msg.email,
  //   startdate: msg.startdate,
  //   enddate: msg.enddate,
  //   guests: msg.guests,
  //   total: msg.total,
  //   city: msg.city,
  //   state: msg.state,
  //   country: msg.country,
  //   headline: msg.headline,
  //   traveler_fname: msg.fname,
  //   traveler_lname: msg.lname
  // });

  // booking_new.save().then(
  //   booking_new => {
  //     console.log("User created : ", booking_new);
  //     callback(null, booking_new);
  //   },
  //   err => {
  //     console.log("Error Creating Booking");
  //     callback(null, []);
  //   }
  //);
}

exports.handle_request = handle_request;
