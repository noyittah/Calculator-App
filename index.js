const calcResult = document.querySelector('.result');
const inputButtons = document.querySelectorAll('.button');
const resetBtn = document.querySelector('.button__reset');
const deleteBtn = document.querySelector('.button__del');

let firstValue = 0;
let operatorSign = '';
let ifNextValue = false;

inputButtons.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => displayNumberValue(inputBtn.value));
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => addOperator(inputBtn.value));
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => createFloatNum());
    }
    else {
        inputBtn.addEventListener('click', () => displayNumberValue(inputBtn.value));
    }
});

function displayNumberValue(number) {
    if (ifNextValue) {
        calcResult.textContent = number;
        ifNextValue = false;
    } else {
        const resultValue = calcResult.textContent;
        if (resultValue === '0') {
            calcResult.textContent = number;
        }
        else {
            calcResult.textContent = resultValue + number;
        }
    }
}
function createFloatNum() {
    if (ifNextValue) return;
    if (!calcResult.textContent.includes('.')) {
        calcResult.textContent = `${calcResult.textContent}.`;
    }
}

function addOperator(operator) {
    const currentValue = Number(calcResult.textContent);
    if (operatorSign && ifNextValue) {
        operatorSign = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const finalResult = computeResult(firstValue, operatorSign, currentValue);
        calcResult.textContent = finalResult;
        firstValue = finalResult;
    }
    operatorSign = operator;
    ifNextValue = true;
}
const computeResult = function (firstNum, operator, secondNum) {
    switch (operatorSign) {
        case '+':
            return (firstNum + secondNum);
            break;
        case '-':
            return (firstNum - secondNum);
            break;
        case 'X':
            return (firstNum * secondNum);
            break;
        case '/':
            return (firstNum / secondNum);
            break;
        case '=':
            return (secondNum);
            break;
    }
}

function resetCalc() {
    calcResult.textContent = '0';
    firstValue = 0;
    operatorSign = '';
    ifNextValue = false;
}
resetBtn.addEventListener('click', resetCalc);

 function deleteInput() {
   calcResult.textContent = calcResult.textContent.slice(0, -1);
}
deleteBtn.addEventListener('click', deleteInput);






