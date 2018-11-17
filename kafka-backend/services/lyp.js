var Properties = require("../../Backend/models/property");

require("../../Backend/db/mongoose");

console.log(
  "---------------------INSIDE /SERVICES/POSTPROFILE.js------------------"
);
function handle_request(msg, callback) {
  console.log(
    "In services postprofile.js handle request:" + JSON.stringify(msg)
  );

  //lyp post logic

  var property = new Properties({
    email: msg.email,
    streetaddr: msg.streetaddr,
    country: String(msg.country).toLowerCase(),
    unit: msg.unit,
    city: String(msg.city).toLowerCase(),
    state: String(msg.state).toLowerCase(),
    zip: msg.zip,
    headline: msg.headline,
    propdesc: msg.propdesc,
    proptype: msg.proptype,
    rooms: parseInt(msg.rooms, 10),
    accomodates: parseInt(msg.accomodates, 10),
    bathrooms: parseInt(msg.bathrooms, 10),
    startdate: new Date(msg.startdate),
    enddate: new Date(msg.enddate),
    nbr: msg.nbr,
    minstay: parseInt(msg.minstay, 10),
    cf: msg.cf,
    apa: msg.apa,
    isbooked: "N",
    photos: [],
    owner_fname: msg.fname,
    owner_lname: msg.lname
  });

  property.save().then(
    property => {
      console.log("Property created : ", property._id);
      callback(null, JSON.stringify({ _id: property._id }));
    },
    err => {
      console.log("Error Creating Property", err);
      callback(null, []);
    }
  );
}

exports.handle_request = handle_request;
