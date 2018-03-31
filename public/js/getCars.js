let getCarsURL = '/getcars';

function getCarsFromAPI(){
	const APICallSettings = {
      url: getCarsURL,  
      dataType: 'json'
    };

	$.ajax(APICallSettings)
	.then((res) => console.log('done!', res))
	.catch((err)=>{
		console.log(err);
		window.location.href="/login";
	});
}

$(getCarsFromAPI);