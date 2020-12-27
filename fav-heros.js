(function()
{
	const FAVOURITES = 'favourites';
	renderFavourites();


	//rendering the saved favourites on this page
	function renderFavourites()
	{
		const favouritesData = Common.getFavouriteSuperheroes();
		let searchResultsContainer=document.getElementById("search-results");

		searchResultsContainer.innerHTML="";

		if(favouritesData.length==0)
		{
			searchResultsContainer.innerHTML+=`<h1 style="color:white;">Sorry No Favourite Superhero Found!</h1>`
		}

		for(let i=0;i<favouritesData.length;i++)
		{
			//let obj=JSON.parse(localStorage.getItem(i));
			let obj=favouritesData[i];

			if(obj==null || obj==undefined ||obj==NaN)
				continue;

			console.log(obj);

			searchResultsContainer.innerHTML+=`<div class="thumbnail">
    													<img src="${obj.image.url}" style="width:250px;height:250px;" alt="unable to load">
      												   <div class="caption">
        											   <h3>${obj.name}</h3>
        											   <p>SuperHero Id: ${obj.id}</p>
        											   <p>Gender: ${obj.gender}</p>
        											   <p>Height: ${obj.height}</p>
        											   <p><a href="about.html?id=${obj.id}" class="btn btn-primary about" role="button">Know More &#8594;</a>
        											   <a href="#" class="btn btn-danger removeFavourites" data-id=${obj.id} role="button">Remove from Favourites</a></p>
      												   </div>
    												   </div>`


		}
			
	}

	function handleDocumentClick(e) {
    const target = e.target;

    if (target.classList.contains('removeFavourites')) {
      // Find the hero data and store it in favourites and localstorage
      const searchResultClickedId = target.dataset.id;
      Common.removeHeroFromFavourites(searchResultClickedId);
      renderFavourites();
    }
  }

  document.addEventListener('click', handleDocumentClick);


})()