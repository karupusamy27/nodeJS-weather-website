const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const path = require("path");
const express = require("express");
const hbs = require("hbs");


const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const customViewsPath = path.join(__dirname, "../templates/cusViews");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and customizing views location
app.set("view engine", "hbs");
app.set("views", customViewsPath);

hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//app.get("", (req, res) => {
//  res.send("Home Page");
//});

app.get("", (req, res) => {
  res.render("index", {
    title: "Home PAGE",
    name: "Karupusamy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About PAGE",
    name: "Karupusamy",
  });
});

app.get('/weather',(req,res)=>{

  if(!req.query.address){
    return res.send({
      error: 'You must provide a address term'
    })
  }

  geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(longitude,latitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        location,
        forecast:forecastData,
        address:req.query.address        
      })
    })
  })

  /*
  res.send({
    forecast: "forecast",
    location: "location",
    address: req.query.address
  })
  */
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help PAGE",
    name: "Karupusamy",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Karupusamy",
    errorMessage: "Help article not found",
  });
});

app.get("/product", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send("Product");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Karupusamy",
    errorMessage: "Page Not Found",
  });
});


/*
app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "forecast",
    location: "location",
  });
});

*/

app.listen(port, () => {
  console.log("Server is up and running on port "+port);
});
