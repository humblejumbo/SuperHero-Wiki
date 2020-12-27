
(function()
{
	let searchBar=document.getElementById('search');
	document.addEventListener('click', handleDocumentClick);
	var txt="";
	var results;

	debounce();


	// Logic for instant search results whenever user stops writing
	function debounce()
	{
		let typingTimer;                //timer identifier
		let doneTypingInterval = 500;  //time in ms, 500ms for example

		//on keyup, start the countdown
		searchBar.addEventListener('keyup', function () {
		  	//clearTimeout(typingTimer);
		  	let searchResultsContainer=document.getElementById("search-results");
			searchResultsContainer.innerHTML="";
			txt=this.value;

			if(txt!='')	//if search bar is not empty then call for searchHero after 500ms
			{
				Common.showLoader();
				typingTimer = setTimeout(searchHero, doneTypingInterval, txt);
			}
		});

		//on keydown, clear the countdown 
		searchBar.addEventListener('keydown', function () {
		  Common.hideLoader();
		  clearTimeout(typingTimer);
		});
	}


	//searching hero by name
	function searchHero(name)
	{
		let xhrRequest = new XMLHttpRequest();
		xhrRequest.open('get',"https://www.superheroapi.com/api.php/4065231213548058/search/"+name,true);
		xhrRequest.send();
		xhrRequest.onload=function()
		{
			Common.hideLoader();
			let data=JSON.parse(xhrRequest.responseText);
			results=data.results;
			let searchResultsContainer=document.getElementById("search-results");
			searchResultsContainer.innerHTML="";


			if(data.response=="error")
			{
				searchResultsContainer.innerHTML+=`<h1 style="color:white;">Sorry No Superhero Found!</h1>`
			}
			else
			{
				let results=data.results;
				const favSuperHeroes = Common.getFavouriteSuperheroes();

    			for(let i=0;i<results.length;i++)
    			{
    				console.log(results[i].name);    				
				    const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
				        (hero) => hero.id === results[i].id
				    );
    				searchResultsContainer.innerHTML+=`<div class="thumbnail">
    													<img src="${results[i].image.url}" style="width:250px;height:250px;" alt="unable to load">
      												   <div class="caption">
        											   <h3>${results[i].name}</a></h3>
        											   <p>SuperHero Id: ${results[i].id}</p>
        											   <p>Gender: ${results[i].appearance.gender}</p>
        											   <p>Height: ${results[i].appearance.height[0]}</p>
        											   <p><a href="about.html?id=${results[i].id}" class="btn btn-primary about" role="button">Know More &#8594;</a>
        											   <a href="#" class="btn btn-danger addFavourites" data-id=${results[i].id} role="button" style="display: ${indexOfSuperHeroInFavourites === -1 ? 'inline' : 'none' }">Add to Favourites</a></p>
        											   <a href="#" class="btn btn-danger removeFavourites" data-id=${results[i].id} role="button" style="display: ${indexOfSuperHeroInFavourites === -1 ? 'none' : 'inline' }">Remove from Favourites</a></p>
      												   </div>
    												   </div>`

    			}

			}

		}
	}


		function handleDocumentClick(e) {
	    const target = e.target;

	    if (target.classList.contains('addFavourites')) {
	      // Find the hero data and store it in favourites and localstorage
	      const searchResultClickedId = target.dataset.id;
	      const hero = results.filter(
	        (hero) => hero.id === searchResultClickedId
	      );
	      Common.addHeroToFavourites(hero[0]);
	      searchHero(txt);

	    } else if (target.classList.contains('removeFavourites')) {
	      // Find the hero data and remove from local storage
	      const searchResultClickedId = target.dataset.id;

	      Common.removeHeroFromFavourites(searchResultClickedId);
	      searchHero(txt);
	    }
	 }


})();