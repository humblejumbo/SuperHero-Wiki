const Common= (function () {
  const toastContainer = document.getElementById('toast');
  const FAVOURITES = 'favourites';
  const loader = document.querySelector('.loader');

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  /* Notification handler */
  function showNotification(type, message) {
    if (type === 'error') {
      toastContainer.classList.remove('toast-success');
      toastContainer.classList.add('toast-error');
    } else if (type === 'success') {
      toastContainer.classList.remove('toast-error');
      toastContainer.classList.add('toast-success');
    }
    toastContainer.style.display = 'block';
    toastContainer.innerText = message;

    setTimeout(() => {
      toastContainer.style.display = 'none';
    }, 3000);
  }

  /* Add hero to localstorage */
  function addHeroToFavourites(hero) {
    if (!hero) return;

    const favouritesFromLocalStorage = getFavouriteSuperheroes();
    favouritesFromLocalStorage.push(hero);

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('success', 'Added to favourites');
  }

  /* Remove hero from localstorage */
  function removeHeroFromFavourites(heroId) {
    if (!heroId) return;

    let favouritesFromLocalStorage = getFavouriteSuperheroes();

    // Remove hero from localstorage
    favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
      (item) => item.id !== heroId
    );

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('success', 'Removed from favourites');
  }

  /* Get fav superheroes from the local storage */
  function getFavouriteSuperheroes() {
    return localStorage.getItem(FAVOURITES)
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : [];
  }

  return {

    showNotification,
    addHeroToFavourites,
    removeHeroFromFavourites,
    getFavouriteSuperheroes,
    showLoader,
    hideLoader,
  };
})();