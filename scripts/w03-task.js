/* Student: Claudia Esparza */

/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    return number1 + number2;
}

function addNumbers() {
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.querySelector("#sum").value = add(addNumber1, addNumber2);
}
document.querySelector('#addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
let subtract = function (number1, number2) {
    return number1 - number2;
}

let subtracNumbers = function () {
    let subNumber1 = Number(document.querySelector('#subtract1').value);
    let subNumber2 = Number(document.querySelector('#subtract2').value);

    document.querySelector('#difference').value = subtract(subNumber1, subNumber2);
}

document.querySelector('#subtractNumbers').addEventListener('click', subtracNumbers);

/* Arrow Function - Multiply Numbers */
let multiply = (number1, number2) => number1 * number2;

let multiplyNumbers = () => {
    let multiNumber1 = Number(document.querySelector('#factor1').value);
    let multiNumber2 = Number(document.querySelector('#factor2').value);

    document.querySelector('#product').value = multiply(multiNumber1, multiNumber2);
}

document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */
let divide = (number1, number2) => number1 / number2;

let divideNumbers = () => {
    let divNumber1 = Number(document.querySelector('#dividend').value);
    let divNumber2 = Number(document.querySelector('#divisor').value);

    document.querySelector('#quotient').value = divide(divNumber1, divNumber2);
}

document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);

/* Decision Structure */
let validateInput = (value) => {
    if (isNaN(value) || value < 0) {
        alert('Please enter a valid number amount between 0 and 9999!');
        return false;
    }
    return true;
}

let calculateTotal = () => {
    let subtotalInput = document.querySelector('#subtotal').value;
    if (!validateInput(subtotalInput)) {
        return;
    }

    let subtotalValue = parseFloat(subtotalInput);

    let isMember = document.querySelector('#member').checked;
    if (isMember) {
        subtotalValue *= 0.8;
    }
    let formattedTotal = `$ ${subtotalValue.toFixed(2)}`;

    document.querySelector('#total').textContent = formattedTotal;
}

document.querySelector('#getTotal').addEventListener('click', calculateTotal);

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector('#array').textContent = numbersArray.join(', ');

/* Output Odds Only Array */
document.querySelector('#odds').innerHTML = numbersArray.filter(number => number % 2 == 1).join(', ');

/* Output Evens Only Array */
document.querySelector('#evens').innerHTML = numbersArray.filter(number => number % 2 == 0).join(', ');

/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').innerHTML = numbersArray.reduce((accumulator, currentNumber) => accumulator + currentNumber);

/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').innerHTML = numbersArray.map(number => number * 2);

/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').innerHTML = numbersArray.map(number => number * 2).reduce((accumulator, currentNumber) => accumulator + currentNumber);