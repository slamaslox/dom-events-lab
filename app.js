/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let firstValue = null;
let secondValue = null;
let operation = null;
let calculationDone = false;


/*------------------------ Cached Element References ------------------------*/

const buttons = document.querySelectorAll('.button');
let displayElement = document.querySelector('.display');


/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // console.log(event.target.innerText);
    const value = event.target.innerText;
    if (Number.isInteger(Number(value))) {
      handleNumber(value);
    } else if (value === "C") {
      clearCalculator();
    } else if (value === "=") {
      calculateResult();
    } else {
      handleOperator(value);
    }
  });
});

/*-------------------------------- Functions --------------------------------*/

function handleNumber(num) {
  num = Number(num); 

  if (calculationDone) {
    // Reset the calculator if a new number is entered after calculation
    firstValue = num;
    secondValue = null;
    operation = null;
    calculationDone = false;
  } else {
    if (operation === null) {
      if (firstValue !== null) {
        firstValue = firstValue * 10 + num;
      } else {
        firstValue = num;
      }
    } else {
      if (secondValue !== null) {
        secondValue = secondValue * 10 + num;
      } else {
        secondValue = num;
      }
    }
  }
  let displayText = `${firstValue}`;
  if (operation !== null) {
    displayText += ` ${operation}`;
  }
  if (secondValue !== null) {
    displayText += ` ${secondValue}`;
  }
  displayElement.innerText = displayText;
}

function handleOperator(op) {
  if (firstValue !== null && secondValue !== null) {
    calculateResult();
  }
  operation = op;
  displayElement.innerText = `${firstValue} ${operation}`;
  calculationDone = false;
}

function calculateResult() {
  if (firstValue !== null && secondValue !== null && operation !== null) {
    let result;

    switch (operation) {
      case "+":
        result = add(firstValue, secondValue);
        break;
      case "-":
        result = subtract(firstValue, secondValue);
        break;
      case "*":
        result = multiply(firstValue, secondValue);
        break;
      case "/":
        if (secondValue !== 0) {
          result = divide(firstValue, secondValue);
        }
        else {
          result = 'Error';
        }
        break;
    }

    displayElement.innerText = result;
    firstValue = result;
    secondValue = null;
    operation = null;
    calculationDone = true;
  }
}

function clearCalculator() {
  firstValue = null;
  secondValue = null;
  operation = null;
  calculationDone = false;
  displayElement.innerText = "0";
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;