let getCarsURL = '/getcars';

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

function generateTableHTML(data){
	let rowsHTML = '';
	let carData = data.catalog.car;

	for(let i=0; i<carData.length; i++){
		const currentCar = carData[i];

		// console.log('currentCar ->',currentCar);
		const rowHTML = (`<tr data-id=${currentCar.id}>
	            <td>${currentCar.model}</td>
	            <td>${currentCar.year}</td>
	            <td>${currentCar.producer}</td>
	            <td>${currentCar.price}</td>
	            <td>${currentCar.mileage}</td>
	            <td>.</td>
	          </tr>`);

		rowsHTML = rowsHTML + rowHTML;
	}

	displayTable($('.car-table-body'), rowsHTML, $('.trip-table-total-miles'));
}

function displayTable(tBodyElem, rowsHTML ){
	tBodyElem.append(rowsHTML);
}

$(getCarsFromAPI);