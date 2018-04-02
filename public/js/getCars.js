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
	let htmlRowString = '';
	let carData = data.catalog.car;

//for each API result, add a table row & corresponding cells
	for(let i=0; i<carData.length; i++){
		const currentCar = carData[i];

		const rowHTML = (`<tr data-carID=${currentCar.id} data-image=${currentCar.image} class="tableRow">
	            <td>${currentCar.model}</td>
	            <td>${currentCar.year}</td>
	            <td>${currentCar.producer}</td>
	            <td>${currentCar.price}</td>
	            <td>${currentCar.mileage}</td>
	            <td>.</td>
	          </tr>`);

		htmlRowString = htmlRowString + rowHTML;
	}

	//build html table with, attach to car-table-body, 
	displayTable($('.car-table-body'), htmlRowString);
}

//appends html rows to html table body element
function displayTable(tBodyElem, htmlRowString ){
	return tBodyElem.append(htmlRowString);
}

//on table-row-click, update the car detail info
//using event delegation
$('.car-table-body')

	.on('click', 'tr.tableRow', (e) =>{

		//store the row, carID & imageString
		let selectedRow = e.currentTarget;
		let carID = selectedRow.getAttribute('data-carid');
		let imgStr = `./imgs/${selectedRow.getAttribute('data-image')}`

		//empty array, to store row cell texts
		let cellTexts = [];

		//clear the car-data form & car Image div if they have content

		//put row data into array, use array to fill-out car-data form
	    let rowCells = selectedRow.children;
	    let rowCellArray = Array.prototype.slice.call( rowCells );
	    rowCellArray.map(function(row) {
	    	cellTexts.push(row.innerText);
	        // return $(this).text();
	    });//.get();

	    console.log('cellTexts ->',cellTexts);

		//send car image to image div



	})

//Tells if there is a car currently in the car info div
function getCurrentlySelectedCarData(modelInput){
	return (myInput && myInput.value ? 'has value' : 'doesnt have value')
}

$(getCarsFromAPI);