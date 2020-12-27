(function()
{

	//fetching the hero id from query parameters
	function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    Common.showLoader();
    return urlParams.get(param);
  }

   	const id = getQueryParameter('id');
    searchHeroId(id);				


	function searchHeroId(id)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/"+id,true);
		xhrRequest.send();
		xhrRequest.onload=function()
		{
			Common.hideLoader()
			let data=JSON.parse(xhrRequest.responseText);
			
			heroId=data.id;//getting the heroId

			document.getElementById('hero-image').setAttribute("src",data.image.url);//setting the image
			document.getElementById('hero-name').textContent=data.name;

			//calling for powerstats and biography
			powerStats(heroId);
			biography(heroId);
		}
	}

	function powerStats(heroId)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/"+heroId+"/powerstats",true);
		xhrRequest.send();

		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);

			let powerStatsContainer=document.getElementById('powerstats');

			console.log(data);
			powerStatsContainer.innerHTML+=`<p>Intelligence: ${data.intelligence}</p>
											<p>Strength: ${data.strength}</p>
											<p>Speed: ${data.speed}</p>
											<p>Durability: ${data.power}</p>
											<p>Power: ${data.power}</p>
											<p>Combat: ${data.combat}</p>`
			
		}
	}

	function biography(heroId)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/"+heroId+"/biography",true);
		xhrRequest.send();

		xhrRequest.onload=function()
		{
			let data=JSON.parse(xhrRequest.responseText);

			let biographyContainer=document.getElementById('biography');

			biographyContainer.innerHTML+=`<p>Full Name: ${data['full-name']}</p>
										   <p>Place of Birth: ${data['place-of-birth']}</p>
										   <p>First Appearance: ${data['first-appearance']}</p>
										   <p>Alignment: ${data.alignment}</p>
										   <p>Alter Egos: ${data['alter-egos']}</p>
										   <p>Aliases: ${data.aliases}</p>`

			
		}
	}


})()