//stores the API carData results
let apiResult;
// const pagerWrapper = document.querySelector('.pageSelector');

//lookup table for pager & number of table rows
const selectorReference = {
	"one":4
}

//send ajax to API
//then run table-generating function with API results
function getCarsFromAPI(){
	const APICallSettings = {
      url: '/getcars',  
      dataType: 'json'
    };

	$.ajax(APICallSettings)
	.then(generateTableHTML)
	.catch((err)=>{
		console.log(err);
	});
}

const getPageSelected = pageWrapper => pageWrapper.data('selected');

const getNumberOfRows = pageSelected => selectorReference[pageSelected];

//appends html rows to html table body element
function displayTable(tBodyElem, htmlRowString ){
	return tBodyElem.append(htmlRowString);
}

//Tells if there is a car currently in the car info div
function getCurrentlySelectedCarData(modelInput){
	return (myInput && myInput.value ? 'has value' : 'doesnt have value')
}

//sets data-attribute of pageSelector wrapper
function setDataAttr(val){ document.querySelector('.pageSelector').setAttribute('data-selected', val) };

//generate HTML table from API result data
function generateTableHTML(data){
	let htmlRowString = '';
	apiResult = data.catalog.car;


	let pageSelected = getPageSelected($('.pageSelector'));
	let numberOfHTMLrows = getNumberOfRows(pageSelected);
	console.log('numberOfHTMLrows ->',numberOfHTMLrows);

	//for each API result, add a table row & corresponding cells
	for(let i = numberOfHTMLrows = 5 ? 0 : 4; i < (numberOfHTMLrows = 5 ? 4 : 8); i++){
		const currentCar = apiResult[i];

		const rowHTML = (`<tr data-carID=${currentCar.id} data-image=${currentCar.image} class="tableRow">
	            <td>${currentCar.model}</td>
	            <td>${currentCar.year}</td>
	            <td>${currentCar.producer}</td>
	            <td>${currentCar.price}$</td>
	            <td class="hidden">${currentCar.owner}</td>
	            <td class="hidden">${currentCar.tel}</td>
	            <td >${currentCar.mileage} km</td>
	            <td class="hidden">${currentCar.registered}</td>
	            <td class="radio"><input type="radio" id=${currentCar.id} name="radio" class="radioInput"></td>
	          </tr>`);

		htmlRowString = htmlRowString + rowHTML;
	}

	//build html table with, attach to car-table-body, 
	$('.car-table-body').append('');
	displayTable($('.car-table-body'), htmlRowString);

	//select the first table row
	$('.tableRow:first').click();

	console.log('done building table');
}

//on table-row-click, update the car detail info
//using event delegation
$('.car-table-body')

	.on('click', 'tr.tableRow', (e) =>{

		//store the row, carID & imageString
		const selectedRow = e.currentTarget;
		const carID = selectedRow.getAttribute('data-carid');
		const imgStr = `./imgs/${selectedRow.getAttribute('data-image')}`

		//empty array, to store row cell texts
		let cellTexts = [];

		//clear the car-data form & car Image div if they have content

		//put row data into array
	    const rowCells = selectedRow.children;
	    const rowCellArray = Array.prototype.slice.call( rowCells );
	    rowCellArray.map(function(row) {
	    	cellTexts.push(row.innerText);
	    });

	    //use rowCellArray to fill-out car-data form
	    const carForm = document.getElementById("carInfo");
	    carForm.reset();
	    const elements = carForm.elements;
		for (let i = 0, element; element = elements[i++];) {
		    if (element.type == "text" && element.value === "" && element.type !== "fieldset"){
		    	element.value = cellTexts[i-2];
		    }else{
		    	console.log(element.type)
		    }
		}

		//clear any existing carImage, & send currently-selecte car image to image div
		const carImgDiv = document.getElementById('carImage');
		while (carImgDiv.lastChild) {
		    carImgDiv.removeChild(carImgDiv.lastChild);
		}
		const imgElement = document.createElement("img");
		imgElement.setAttribute('src', imgStr);
		imgElement.setAttribute('class','carImage');
		carImgDiv.append(imgElement);

		//show radio button
		let radioCell = $(rowCellArray[rowCellArray.length - 1].childNodes[0]);
		radioCell.prop("checked", true);

	})

//searchable-table function
function filterTable() {

  // Declare variables 
  let searchBox, filterText, table, tr, td, i;
  searchBox = document.getElementById("search");
  filterText = searchBox.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let tdText = td.innerHTML.toUpperCase();
      if (td.innerHTML.toUpperCase().indexOf(filterText) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

$('.pgSelectorNumber')
	.on('click', (e) => {
		console.log('clicked ->',e.currentTarget.innerText);
		setDataAttr(e.currentTarget.innerText);
	})

$(getCarsFromAPI);