let display = document.querySelector('.display');
let currentNumber = '';
let previosNumber = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay(value){
    display.textContent = value;
}

function handleNumber(num) {
    if (shouldResetDisplay) {
        currentNumber = '';
        shouldResetDisplay = false;
    }
    currentNumber += num;
    updateDisplay(currentNumber);
}

function handlOperator(op) {
    if (currentNumber === '') return;
    previosNumber = currentNumber;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (previosNumber === '' || currentNumber === '')return;

    let prev = parseFloat(previosNumber);
    let current = parseFloat(currentNumber);
    let result = 0;

    if (operator === '+') result = prev + current;
    else if (operator === '-') result = prev - current;
    else if (operator === '×') result = prev * current;
    else if (operator === '÷') result = prev / current;
    else if (operator === '%') result = prev % current;

    updateDisplay(result);
    currentNumber = result.toString();
    previosNumber = '';
    operator = '';
    shouldResetDisplay = true;
}

function handleClear() {
    currentNumber = '';
    previosNumber = '';
    operator = '';
    updateDisplay('0'); 
}

function handlePlusMinus() {
    if (currentNumber === '') return;
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateDisplay(currentNumber);
}

document.querySelectorAll('.btn').forEach(button =>{
    button.addEventListener('click', () => {
        const value = button.textContent;

        if(!isNaN(value) || value === '.') handleNumber(value);
        else if (value === 'C') handleClear();
        else if (value === '+/-') handlePlusMinus();
        else if (value === '=') calculate();
        else handlOperator(value);
    });
});