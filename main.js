$(document).ready(initializeApp);

function initializeApp() {}

var num1;
var num2;
var operator;
var result;
var numbers = '';
var equation = [];
var evaluateCounter = 1;
var tempSuccessiveOperatorElement = '';
var tempSuccessiveNumberElement='';

$('#equalButton').click(function(){
    currentButtonPressed('=','operator');
});

$('#button7').click(function() {
	currentButtonPressed('7', 'number');
});

$('#button8').click(function() {
	currentButtonPressed('8', 'number');
});

$('#button9').click(function() {
	currentButtonPressed('9', 'number');
});

$('#button6').click(function(){
    currentButtonPressed('6','number');
});

$('#button5').click(function() {
	currentButtonPressed('5', 'number');
});

$('#button4').click(function() {
	currentButtonPressed('4', 'number');
});

$('#button3').click(function() {
	currentButtonPressed('3', 'number');
});

$('#button2').click(function() {
	currentButtonPressed('2', 'number');
});

$('#button1').click(function() {
	currentButtonPressed('1', 'number');
});

$('#button0').click(function() {
	currentButtonPressed('0', 'number');
});

$('#divideButton').click(function() {
	currentButtonPressed('/', 'operator');
});

$('#additionButton').click(function() {
	currentButtonPressed('+', 'operator');
});

$('#subtractButton').click(function() {
	currentButtonPressed('-', 'operator');
});


$('#decimalButton').click(function() {
	currentButtonPressed('.', 'number');
});

$('#multiplyButton').click(function() {
	currentButtonPressed('X', 'operator');
});

$('#Cbutton').click(function() {
	currentButtonPressed('C', 'operator');
});

$('#CEbutton').click(function() {
	currentButtonPressed('CE', 'operator');
});


function displayCalculator(){ 
    var convertToString =  '';
    if(equation.length > 0){
        for(var i = 0; i < equation.length; i++){
            var currentArray = equation[i];
           convertToString = convertToString + currentArray + ' ';
        }
    }


    $('#displaypanel').text(convertToString + ' ' + numbers);
}







function currentButtonPressed(currentNum, currentType) {
	if (currentType === 'number') {
        numbers = numbers + currentNum;
        console.log(numbers);
    }
    else if(currentNum ==='C'){
            equation=[];
            numbers='';
            displayCalculator();
    }
    else if(currentNum ==='CE'){
        if(numbers.length > 0){
            numbers = numbers.substr(0, numbers.length -1);
        }
        else if(equation.length > 0){
            equation = equation.slice(0, equation.length -1);
        }
        displayCalculator();
        return;
    }
    else if (currentNum !== '=') {
        if(numbers){  
            equation.push(numbers);
        }    
        equation.push(currentNum);
        operator = '';
        numbers='';   
        }
        else {
            equation.push(numbers);
            evaluateEquation();
        }
        displayCalculator();
    }
    


function evaluateEquation(){
    sanitizeArray();
    equation = multipleOperations(equation);
    for (var i = 0; i < equation.length; i++){
    var currentNum = equation[i];
    if(evaluateCounter === 1){
        evaluateCounter++;
        num1 = currentNum;
        console.log(evaluateCounter);
    } 
    else if(evaluateCounter ===2){
        evaluateCounter++;
        operator = currentNum;
        console.log(evaluateCounter);
    } 
    else{
        evaluateCounter = 2;
        num2 = currentNum;
        if(isDivideByZero(num2,operator)){
            equation=[];
            equation.push('Error');
            numbers="";
            return;
        }
        num1 = doMath(num1,num2,operator);
        num2 = "";
        operator = "";
        console.log(evaluateCounter);
        }
    }  
    equation=[];
    equation.push(num1);
    numbers=""; 
}
function doMath(num1, num2, operator) {
     num1 = parseFloat(num1);
     num2 =parseFloat(num2);
	if (operator === '+') {
		result = num1 + num2;
	} else if (operator === '-') {
		result = num1 - num2;
	} else if (operator === '/') {
		result = num1 / num2;
	} else if (operator === 'X') {
		result = num1 * num2;
    }
	return result;
}

function eraseClearDisplay(){
         equation.pop();
        displayCalculator();
}

function isDivideByZero(number, operator){
    return number == '0'&& operator == '/';
}

function sanitizeArray(){
    for(var i = 0; i < equation.length; i++){
       equation[i] = fixInput(equation[i]);
       isOperator();

    }
}

function fixInput(input){
    var fixedInput = input[0];
    for(var i = 1; i < input.length; i++){
        currentValue = input[i];
        previousValue = input[i-1];
        if( currentValue !='.'|| previousValue !='.'){
            fixedInput = fixedInput + input[i];
        }   
    }
    return fixedInput;
}


function isOperator(input){
    if(input === '+' || input ==='/' || input ==='X' || input === '-'){
        return true;
    } else{
        return false;
    }
}

function multipleOperations(input){
    var fixedInputArray = [input[0]];
    var currentNumber = '';
    var currentOperatorTempInput = '';
    for(var i =1; i <input.length; i++){
       var currentValue = input[i];
        if( !isOperator(currentValue)){
            currentNumber = currentValue;
           fixedInputArray.push(currentOperatorTempInput);
           fixedInputArray.push(currentNumber);
        }
        else{
            currentOperatorTempInput = currentValue;
        }
    }
     return fixedInputArray;
}

