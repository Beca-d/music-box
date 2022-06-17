let searchHistory = [];

// Function to get search history from local storage.
const getSearchHistory = () => {
    if (localStorage.getItem("search-history")) {
        searchHistory = JSON.parse(localStorage.getItem("search-history"));
    }
};

// Function to save search history
const saveSearchHistory = () => {
    searchHistory.push($(".search-bar").val());
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
};

// Function to clear search history
const clearSearchHistory = () => {
    searchHistory = [];
    localStorage.removeItem("search-history");
};