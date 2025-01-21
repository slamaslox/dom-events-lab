/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let firstValue = 0;
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
  // Convert the input string to a number
  num = Number(num);

  if (calculationDone) {
    // Reset the calculator if a new number is entered after calculation
    firstValue = num;
    secondValue = null;
    operation = null;
    calculationDone = false;
  } else {
    // Handle first number input
    if (operation === null) {
      // Build numbers with more than 1 digit for first value
      if (firstValue === 0) {
        firstValue = num;
      } else {
        firstValue = firstValue * 10 + num;
      }
    } else { // Handle second number input
      if (secondValue !== null) {
        // Build numbers with more than 1 digit for second value
        secondValue = secondValue * 10 + num;
      } else {
        secondValue = num;
      }
    }
  }
  // Create the display text showing current calculation state
  let displayText = `${firstValue}`;
  if (operation !== null) {
    displayText += ` ${operation}`;
  }
  if (secondValue !== null) {
    displayText += ` ${secondValue}`;
  }
  // Update the calculator display
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

    // Update display with result
    displayElement.innerText = result;

    // Set up calculator for potential new calculation
    firstValue = result;
    secondValue = null;
    operation = null;
    calculationDone = true;
  }
}

function clearCalculator() {
  firstValue = 0;
  secondValue = null;
  operation = null;
  calculationDone = false;
  displayElement.innerText = "0";
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;