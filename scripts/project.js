
const searchForm = document.getElementById('search-form');
const filterForm = document.getElementById('filter-form');
const searchInput = document.getElementById('search-input');
const booksSection = document.getElementById('books');
const apiKey = "AIzaSyCDLrUZZXELnrfBmfQwDIvdVOTWTNMQGRQ";
const genreFilter = document.getElementById('genre');
const ratingFilter = document.getElementById('rating');
const cleanFiltersButton = document.getElementById('clean-filters');
let books = [];
let filteredBooks = [];




filterForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  console.log('Filter form submitted');
  filterBooks();
});
cleanFiltersButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default button behavior
  genreFilter.value = '';
  ratingFilter.value = '';
  filterBooks();
});

function filterBooks() {
  filteredBooks = [...books]; // Hacer una copia de los libros para no modificar el array original
  console.log('Original', filteredBooks); // Imprimir los libros filtrados
  if (genreFilter.value) {
    filteredBooks = filteredBooks.filter(book => {
      const category = genreFilter.value;
      if (!book.volumeInfo.categories) {
        return false;
      }
      const categories = book.volumeInfo.categories[0] || '';

      return categories.includes(category);
    });
  }
  if (ratingFilter.value) {
    filteredBooks = filteredBooks.filter(book => {
      const rating = ratingFilter.value;
      if (!book.volumeInfo.averageRating) {
        return false;
      }
      return book.volumeInfo.averageRating >= ratingFilter.value;
    });
  }
  console.log('Filtered', filteredBooks);
  displaySearchResults(filteredBooks);
}


// Event listener for search form submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const searchTerm = searchInput.value.trim(); // Get the search term

  if (searchTerm !== '') {
    try {
      books = await searchBooks(searchTerm);
      // imprimir la cadena JSON en la consola
      filterBooks();
      displaySearchResults(filteredBooks);
    } catch (error) {
      console.error('Error fetching search results:', error);
      booksSection.innerHTML = `<p>Error fetching search results. Please try again later.</p>`;
    }
  } else {
    booksSection.innerHTML = `<p>Please enter a search term.</p>`;
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
    booksSection.innerHTML = `<p>No results found. Please try a different search term.</p>`;
    return;
  }
  console.log('Displaying search results')
  console.log(results);
  const resultsHTML = results.map(book => {
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'; // Use a placeholder image if thumbnail is not available
    return `
      <div class="book">
        <img src="${thumbnail}" alt="${book.volumeInfo.title}">
        <h3>${book.volumeInfo.title}</h3>
        <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
        <p>Rating: ${book.volumeInfo.averageRating || 'Not available'}</p>
        <p>Genre: ${book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Not available'}</p>
        <p>Description: ${book.volumeInfo.description || 'Not available'}</p>
      </div>
    `;
  }).join('');

  booksSection.innerHTML = resultsHTML;
}

// Function to display recommendations on the webpage
async function displayRecommendations() {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=recommended&maxResults=3&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    books = data.items || [];
    filterBooks();

    const recommendations = filteredBooks.map(item => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
        description: item.volumeInfo.description || 'Description not available',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        rating: item.volumeInfo.averageRating || 'Not available',
        genre: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Not available'
      };
    });

    const recommendationsHTML = recommendations.map(book => {
      return `
        <div class="book">
          <img src="${book.thumbnail}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>Author(s): ${book.author}</p>
          <p>Rating: ${book.rating}</p>
          <p>Genre: ${book.genre}</p>
          <p>Description: ${book.description}</p>
        </div>
      `;
    }).join('');

    booksSection.innerHTML = recommendationsHTML;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    booksSection.innerHTML = `<p>Error fetching recommendations. Please try again later.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', displayRecommendations);
// document.addEventListener('DOMContentLoaded', () => {
//   fetch('../mocks/libros.json').then(response => response.json()).then(data => {
//     books = data;
//     filteredBooks = [...books];
//     console.log('Libros', books);
//     displaySearchResults(books);
//   });
// });