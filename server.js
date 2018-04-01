const express = require('express');
const app = express();
const {PORT} = require('./config');

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

    	let carData = {
		  "catalog": {
		    "car": [
		      {
		        "id": "1",
		        "model": "Skoda Fabia",
		        "year": "2011",
		        "producer": "Volkswagen",
		        "price": "6000",
		        "owner": "Peter Wrobel",
		        "tel": "+5810456455456",
		        "mileage": "67000",
		        "registered": "Poland",
		        "image": "Fabia1.JPG"
		      },
		      {
		        "id": "2",
		        "model": "Hyundai Getz",
		        "year": "2008",
		        "producer": "Hyundai",
		        "price": "8900",
		        "owner": "Mike Smith",
		        "tel": "+5810456445456",
		        "mileage": "12000",
		        "registered": "USA",
		        "image": "hyundai_getz2.jpg"
		      },
		      {
		        "id": "3",
		        "model": "Hyundai i108",
		        "year": "2014",
		        "producer": "Hyundai",
		        "price": "15000",
		        "owner": "Camil Bertrand",
		        "tel": "+5815556445456",
		        "mileage": "3000",
		        "registered": "Canada",
		        "image": "hyundaii108.jpg"
		      },
		      {
		        "id": "4",
		        "model": "Aveo",
		        "year": "2000",
		        "producer": "Chevrolette",
		        "price": "3500",
		        "owner": "Jose Hernandez",
		        "tel": "+5815556445477",
		        "mileage": "130000",
		        "registered": "Mexico",
		        "image": "aveo.jpg"
		      }
		    ]
		  }
		};

app.get("/getcars",
    (req, res) => {
           res.json(carData);
    }
);


app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

module.exports = {app};