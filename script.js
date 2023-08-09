let displayText = document.querySelector('.input-space');
let exprDisplay = document.querySelector('.expr');
let buttons = document.querySelector('.buttons');

let operands = [];
let prevOperator = "";
let currOperator = "";
let display = [];
let expression = "";

// 5 unique cases: C, ←, =, NUMBERS, MATH SIGNS
buttons.addEventListener('click', (event) => {
    let clickedBtn = event.target.innerText;
    let result = 0;
    let temp = int(clickedBtn);

    if (clickedBtn === "C") {
        // clear display when C pressed
        display.length = 0;
        operands.length = 0;
        expression = "";
    }
    else if (clickedBtn === "←") {
        display.pop(); //remove last pushed ele
        expression = expression.substring(0, expression.length - 1); //remove last char
    }
    else if (temp >= 0 && temp <= 9) {
        // after pressing '=' next input should be a new expression
        if (expression[expression.length - 1] === "=") {
            expression = temp;
            display.length = 0;
            display.push(temp);
            operands.length = 0;
        }
        else {
            // if previous inpput wasn't '=', then just add to display
            expression += temp;
            display.push(temp);
        }
    }
    else if (clickedBtn === "=") {
        // when '=' pressed, calculate result and change display to the result 
        expression += clickedBtn;
        result = calculate(currOperator, operands[0], getOperand(display));
        display.length = 0;
        display.push(result);

        // clear everything after result gets displayed
        operands.length = 0;
        currOperator = '';
        prevOperator = '';
    }
    else {
        // if one of the above cases then, one of the sign was clicked
        // again if previous input was '=', display must be cleared
        if (expression[expression.length - 1] === '=') {
            expression = clickedBtn; // to give negative number functionality
            display.length = 0;
            display.push(clickedBtn);
            operands.length = 0;
        } else {
            // add sign to display and then clear display for next input
            expression += clickedBtn;
            prevOperator = currOperator;
            currOperator = clickedBtn;
            operands.push(int(display.join("")));
            display.length = 0;

            // if 2 operands obtained, calculate the result immediately and update expression
            if (operands.length === 2) {
                result = calculate(prevOperator, operands[0], operands[1]);
                operands.length = 0;
                operands.push(result);
                expression = result + currOperator;
                prevOperator = currOperator;
            }
        }
    }

    // re-rendering
    exprDisplay.textContent = expression;
    displayText.textContent = display.join("");
});

// utitlity function to convert string to integer
function int(num) {
    return Number.parseInt(num);
}

// function that takes 2 operands, 1 operator and returns result of operation
function calculate(operator, x, y) {
    switch (operator) {
        case '+': return x + y;
        case '-': return x - y;
        case '×': return x * y;
        case '÷': if (y !== 0) return x / y; // to avoid division by zero
        default: return 0;
    }
}

// function that concatenates the individual digits of a number in display and returs it as a single number
function getOperand(array) {
    let num = int(array.join(""));
    if (Number.isInteger(num)) return num;
    return 0;
}
