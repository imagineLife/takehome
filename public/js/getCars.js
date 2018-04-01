//API url
let getCarsURL = '/getcars';

//send ajax to API
//then run table-generating function with API results
function getCarsFromAPI(){
	const APICallSettings = {
      url: getCarsURL,  
      dataType: 'json'
    };

	$.ajax(APICallSettings)
	.then(generateTableHTML)
	.catch((err)=>{
		console.log(err);
	});
}

//generate HTML table from API result data
function generateTableHTML(data){
	let rowsHTML = '';
	let carData = data.catalog.car;

//for each API result, add a table row & corresponding cells
	for(let i=0; i<carData.length; i++){
		const currentCar = carData[i];

		const rowHTML = (`<tr data-carID=${currentCar.id}>
	            <td>${currentCar.model}</td>
	            <td>${currentCar.year}</td>
	            <td>${currentCar.producer}</td>
	            <td>${currentCar.price}</td>
	            <td>${currentCar.mileage}</td>
	            <td>.</td>
	          </tr>`);

		rowsHTML = rowsHTML + rowHTML;
	}

	//build html table with, attach to car-table-body, 
	displayTable($('.car-table-body'), rowsHTML);
}

//appends html rows to html table body element
function displayTable(tBodyElem, rowsHTML ){
	tBodyElem.append(rowsHTML);
}

//on table-row-click, update the car detail info
//using event delegation
$('.car-table-body')

	.on('click', 'tr', (e) =>{
		let curTarget = e.currentTarget;
		console.log('carID ->',curTarget.getAttribute('data-carid'))
	})

//Tells if there is a car currently in the car info div
function getCurrentlySelectedCarData(modelInput){
	return (myInput && myInput.value ? 'has value' : 'doesnt have value')
}

$(getCarsFromAPI);