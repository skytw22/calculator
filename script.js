const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');
const numButtons = Array.from(document.querySelectorAll('.num'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

let firstOperand = '';
let secondOperand = '';
let operator = null;
let shouldResetScreen = false;

numButtons.forEach((button) => button.addEventListener('click', ()=>{
    appendNumber(button.textContent);
}));

operatorButtons.forEach((button) => button.addEventListener('click', ()=>{
    setOperation(button.textContent);
}));

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
window.addEventListener('keydown', (e)=>{
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key ==='/') {
        setOperation(convertOperator(e.key));
    } else if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    } else if (e.key === 'Backspace') {
        deleteNumber();
    } else if (e.key === 'Escape') {
        clear();
    }
});

function appendNumber(number){
    if(currentOperationScreen.textContent === "0" || shouldResetScreen){
        resetScreen();
        currentOperationScreen.textContent += number;
    } else {
        currentOperationScreen.textContent += number;
    }   
}

function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear(){
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operator = null;
}

function deleteNumber(){
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperation(operation){
    if (operator !== null) {
        evaluate();
    }
    firstOperand = currentOperationScreen.textContent;
    operator = operation;
    lastOperationScreen.textContent = `${firstOperand} ${operator}`;
    shouldResetScreen = true;
}

function evaluate(){
    if (operator === null || shouldResetScreen) {
        return;
    } else if (operator === '÷' && currentOperationScreen.textContent === '0'){
        alert('You can\'t divide 0!');
        return;
    } else {
        secondOperand = currentOperationScreen.textContent;
        currentOperationScreen.textContent = roundResult(operate(operator, firstOperand, secondOperand));
        lastOperationScreen.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
        operator = null;
    }
}

function roundResult(number){
    return Math.round((number * 1000) / 1000);
}       

function convertOperator(keyboardOperator) {
    if(keyboardOperator === '/') {
        return '÷';
    } else if (keyboardOperator === '*') {
        return '×';
    } else if (keyboardOperator === '+') {
        return '+';
    } else if (keyboardOperator === '-') {
        return '−';
    }
}

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b; 
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
        return add(a, b);
        case '−':
        return substract(a, b);
        case '×':
        return multiply(a, b);
        case '÷':
        if (b === 0) return null
        else return divide(a, b);
        default:
        return null;
    }
}