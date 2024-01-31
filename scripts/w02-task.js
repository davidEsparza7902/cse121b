/* W02-Task - Profile Home Page */

/* Student: Claudia Esparza */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = 'Claudia Esparza';
let currentYear = 2024;
let profilePicture = 'images/profilePicture.png';

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector('img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</srong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt',`Profile image of ${fullName}`);

/* Step 5 - Array */
let favoriteFood = ["Ceviche", "Jalea de Mariscos", "Arroz con Mariscos"];
foodElement.innerHTML = favoriteFood;
let anotherFavoriteFood = "Aji de Gallina";
favoriteFood.push(anotherFavoriteFood);
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.shift();
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.pop();
foodElement.innerHTML += `<br>${favoriteFood}`;