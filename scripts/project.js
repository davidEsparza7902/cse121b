// Define global variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const recommendationSection = document.getElementById('recommendations');
const apiKey = "AIzaSyCM5oWAOySNw8YC-da2dqYedmcr4PFTVs8";


// Event listener for search form submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  
  const searchTerm = searchInput.value.trim(); // Get the search term
  
  if (searchTerm !== '') {
    try {
      const searchResultsData = await searchBooks(searchTerm); // Fetch search results
      displaySearchResults(searchResultsData); // Display search results
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Display error message to the user
      searchResults.innerHTML = `<p>Error fetching search results. Please try again later.</p>`;
    }
  } else {
    // Display message to the user to enter a search term
    searchResults.innerHTML = `<p>Please enter a search term.</p>`;
  }
});

// Function to fetch search results from Google Books API
async function searchBooks(searchTerm) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.items || []; // Return an array of book objects, or an empty array if no results found
}

// Function to display search results on the webpage
function displaySearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = `<p>No results found. Please try a different search term.</p>`;
    return;
  }

  const resultsHTML = results.map(book => {
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'; // Use a placeholder image if thumbnail is not available
    return `
      <div class="book">
        <img src="${thumbnail}" alt="${book.volumeInfo.title}">
        <h3>${book.volumeInfo.title}</h3>
        <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
        <p>Description: ${book.volumeInfo.description || 'Not available'}</p>
      </div>
    `;
  }).join('');

  searchResults.innerHTML = resultsHTML;
}

// Function to display recommendations on the webpage
async function displayRecommendations() {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=recommended&maxResults=3&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const recommendations = data.items.map(item => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
        description: item.volumeInfo.description || 'Description not available',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'
      };
    });

    const recommendationsHTML = recommendations.map(book => {
      return `
        <div class="book">
          <img src="${book.thumbnail}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>Author(s): ${book.author}</p>
          <p>Description: ${book.description}</p>
        </div>
      `;
    }).join('');

    recommendationSection.innerHTML = recommendationsHTML;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Display error message to the user
    recommendationSection.innerHTML = `<p>Error fetching recommendations. Please try again later.</p>`;
  }
}

// Call the function to display recommendations when the page loads
displayRecommendations();