let apiResult;

//lookup table for paging & number of table rows
const selectorReference = {
	1:4,
	2:3
}

//send ajax to API
//& run table-generating function with API results
function getCarsFromAPI(){
	const APICallSettings = {
      url: '/getcars',  
      dataType: 'json'
    };

	$.ajax(APICallSettings)
	.then((data)=>{
		apiResult = data.catalog.car;
		generateTableHTML(apiResult);
	}).then( () => $('.tableRow:first').click())
	.catch((err)=>{
		console.log(err);
	});
}

//gets data-selected HTML attribute 
const getPageSelected = pageWrapper => pageWrapper.data('selected');

//gets number of rows to display from lookup table
const getNumberOfRows = pageSelected => selectorReference[pageSelected];

//appends html rows to html table body element
function displayTable(tBodyElem, htmlRowString ){tBodyElem.append(htmlRowString)};

//sets data-attribute of pageSelector wrapper
function setDataAttr(val){ document.querySelector('.pageSelector').setAttribute('data-selected', val) };

function getDataAttr(){
	return document.querySelector('.pageSelector').getAttribute('data-selected')
}

//generate HTML table from API result data
function generateTableHTML(data){

	let htmlRowString = '';

	let selectedAttr = getDataAttr();
	
	let numberOfHTMLrows = getNumberOfRows(selectedAttr);

	let whereToStartLoop = (numberOfHTMLrows == 4 ? 0 : 4);

	//for each API result, add a table row & corresponding cells
	for(let i = whereToStartLoop; i < numberOfHTMLrows + whereToStartLoop; i++){
		const currentCar = data[i];

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

	//build html table with, attach to car-table-body
	displayTable($('.car-table-body'), htmlRowString);


	htmlRowString = '';

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
		    }else null
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
		selectedAttr = getDataAttr();
		if(e.currentTarget.innerText == selectedAttr){
			return;
		}else{
			setDataAttr(e.currentTarget.innerText);
			$('tbody tr').remove();
			generateTableHTML(apiResult);
		}
	})

$(getCarsFromAPI);