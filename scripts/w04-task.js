/* Student: Claudia Esparza */

/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: 'Claudia Esparza',
    photo: 'images/profilePicture.png',
    favoriteFoods: [
        'Ceviche',
        'Jalea de Mariscos',
        'Arroz con Mariscos',
        'Aji de Gallina'
    ],
    hobbies: [
        'reading',
        'singing',
        'running',
        'cycling'
    ],
    placesLived: []
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
    place: 'Lima, Peru',
    length: '5 years'
}, {
    place: 'CDMX, Mexico',
    length: '6 months'
}, {
    place: 'Santiago, Chile',
    length: '5 months'
}, {
    place: 'Trujillo, Peru',
    length: '20 years'
});

/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
let imagenElement = document.querySelector('#photo');
imagenElement.src = myProfile.photo;
imagenElement.alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach((placesLived) => {
    let dtHtml = document.createElement('dt');
    let ddHtml = document.createElement('dd');

    dtHtml.textContent = placesLived.place;
    ddHtml.textContent = placesLived.length;

    let dlContainer = document.querySelector('#places-lived');
    dlContainer.appendChild(dtHtml);
    dlContainer.appendChild(ddHtml);
});