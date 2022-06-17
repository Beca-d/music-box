let searchHistory = [];

// Function to get search history from local storage.
const getSearchHistory = () => {
    if (localStorage.getItem("search-history")) {
        searchHistory = JSON.parse(localStorage.getItem("search-history"));
    }
};

// Function to save search history
const saveSearchHistory = () => {
    const searchValue = $(".search-bar").val().trim().toUpperCase()
    if (!searchHistory.includes(searchValue)) {
        searchHistory.push(searchValue);
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
    }
};

// Function to clear search history
const clearSearchHistory = () => {
    searchHistory = [];
    localStorage.removeItem("search-history");
};

// Function to render search history
const renderSearchHistory = () => {
    const searchHistoryEl = $("#search-history").children(".menu-list");
    searchHistoryEl.empty();
    
    searchHistory.forEach(item => {
        searchHistoryEl.append(`<li><a>${item}</a></li>`)
    })
};