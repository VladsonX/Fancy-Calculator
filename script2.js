
let printed = [];

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");


let numbersLength = numbers.length;
let operatorsLength = operators.length;

let expression = document.querySelector(".expression");
let answer = document.querySelector(".answer");

//numbers
for (let i = 0; i < numbersLength; i++) // Adding "click" event listener to all numbers
    numbers[i].addEventListener("click", function () {
        new Audio("button.mp3").play();

        if (this.textContent == "c") { // clear button
            console.log("Clear button clicked!");
            printed = [];
            expression.textContent = "";
            answer.textContent = "";
        } else {
            if (expression.textContent.slice(-1) == "=") { // if last symbol in expression filed is "="
                console.log("New number after the '='");
                printed = []; // cleaning the printed field 
                expression.textContent = ""; // cleaning the expression field
                answer.textContent = ""; // cleaning the answer field 
            }
            else if (expression.textContent == "" && dot.includes(this.textContent)) { // if expression field is empty and one of the "bad" operators is printed
                return;
            }
            printed.push(this.textContent); // adding number to printed array
            expression.textContent += this.textContent; // adding number to expression field
            console.log("Printed: " + printed);
        }

    });

const mainOperators = ["+", "-", "*", "/", "√", "²"];
const noInRowOperators = ["+", "-", "*", "/"];
const noInRowOperators2 = ["+", "-", "*", "/", "√"];
const goodOperators = ["²"];
const noStartOperators = ["*", "/", ".", "²"];
const dot = ["."];

for (let i = 0; i < operatorsLength; i++) { // adding click event listener to all operators
    operators[i].addEventListener("click", function () {
        new Audio("button.mp3").play();

        if (mainOperators.includes(this.textContent)) { // if it is one of the main operators array
            if (expression.textContent.slice(-1) == "=") { //checks if last symbol was an "="
                console.log("New operator after '='");
                printed = [parseFloat(answer.textContent)]; // clearing the printed array and adding the number from answer field to it  
                expression.textContent = answer.textContent; // clearing the expression field and adding the number from answer field to it 
                answer.textContent = ""; // clearing the answer field
            }
            // if (printed[printed.length - 1] == "√" && this.textContent !== "" && this.textContent == "√")  {
            //     console.log("Two '√' in a row!");
            // }
            else if (mainOperators.includes(printed[printed.length - 1]) && this.textContent !== "" && this.textContent == "²") {
                console.log("Two '²' in a row!");
                printed[printed.length - 1] = this.textContent; // switching last operator to new one in printed array
                expression.textContent = expression.textContent.slice(0, -1) + this.textContent; // switching last operator to new one in expression filed
                console.log("Printed: " + printed);
            }
            else if (noInRowOperators2.includes(printed[printed.length - 1])  && this.textContent !== "" && noInRowOperators.includes(this.textContent)) { // checks if last printed symbol was an operator
                console.log("Two operators in a row!");
                printed[printed.length - 1] = this.textContent; // switching last operator to new one in printed array
                expression.textContent = expression.textContent.slice(0, -1) + this.textContent; // switching last operator to new one in expression filed
                console.log("Printed: " + printed);
            } else {
                // if (expression.textContent.slice(-1) == "=") { //checks if last symbol was an "="
                //     console.log("New operator after '='");
                //     printed = [parseFloat(answer.textContent)]; // clearing the printed array and adding the number from answer field to it  
                //     expression.textContent = answer.textContent; // clearing the expression field and adding the number from answer field to it 
                //     answer.textContent = ""; // clearing the answer field
                // } 
                if (expression.textContent == "" && noStartOperators.includes(this.textContent)) { // if expression field is empty and one of the "bad" operators is printed
                    return;
                }
                printed.push(this.textContent);
                expression.textContent += this.textContent;
                console.log("Printed: " + printed);
            }
        } else if (this.textContent == "<") {
            if (expression.textContent.slice(-1) == "=") {
                expression.textContent = expression.textContent.slice(0, -1); // delete last symbol from expression field
                console.log(expression.textContent);
                console.log("Printed: " + printed);
            } else {

                console.log(printed[printed.length - 1]);
                console.log(printed[printed.length - 1].length);
                expression.textContent = expression.textContent.slice(0, -printed[printed.length - 1].length); // delete last symbol from expression field
                printed.pop(); // delete last symbol from printed array
                console.log(expression.textContent);
                console.log("Printed: " + printed);
            }

        }
        else if (this.textContent == "=") {
            new Audio("equal.mp3").play();
            if (expression.textContent.slice(-1) == "=") { // if there's already an "=" printed to exclude two "=" in a row
                equals();
            } else {
                expression.textContent += this.textContent;
                equals();
            }


        }
    })
};

function addition(value1, value2) {
    return parseFloat(value1) + parseFloat(value2);
}
function subtraction(value1, value2) {
    return parseFloat(value1) - parseFloat(value2);
}
function multiplication(value1, value2) {
    return parseFloat(value1) * parseFloat(value2);
}
function division(value1, value2) {
    return parseFloat(value1) / parseFloat(value2);
}
function power(value1) {
    return Math.pow(value1, 2);
}
function squared(value1) {
    return Math.sqrt(value1);
}



// function operations(operator, operand1, operand2, newNum, result) {
//     switch (operator) {
//         case "+":
//             console.log("Operation '+'");
//             result = addition(operand1, operand2);
//             console.log(result);
//             newNum = [result];
//             return newNum;
//         case "-":
//             console.log("Operation '-'");
//             result = subtraction(operand1, operand2);
//             console.log(result);
//             newNum = [result];
//             return newNum;
//         case "*":
//             console.log("Operation '*'");
//             result = multiplication(operand1, operand2);
//             console.log(result);
//             newNum = [result];
//             return newNum;
//         case "/":
//             console.log("Operation '/'");
//             result = division(operand1, operand2);
//             console.log(result);
//             newNum = [result];
//             return newNum;
//         case "²":
//             console.log(operand1 + " and " + operand2);
//             if (isNaN(operand2)) {
//                 console.log("No operand 2");
//                 result = power(operand1);
//                 console.log(result);
//                 newNum = [result];
//                 return newNum;
//             } else {
//                 result = operand1 * operand2;
//                 console.log(result);
//                 newNum = [result];
//                 return newNum;
//             }
//         case "√":
//             console.log("Operation '√'");
//             console.log(operand1 + " and " + operand2);
//             if (isNaN(operand2)) {
//                 console.log("No operand 2");
//                 result = squared(operand1);
//                 console.log(result);
//                 newNum = [result];
//                 return newNum;
//             } else {
//                 result = operand1 * squared(operand2);
//                 console.log(result);
//                 newNum = [result];
//                 return newNum;
//             }
            

//         default:
//             console.log("Aboba");
//             return newNum;
//     }
// }

function equals() {
    let result = 0;
    let newNum = []; // created for concatination of 2+ numbers in one

    let multIndexes = [];
    let additionIndexes = [];
    let substractionIndexes = [];
    let divisionIndexes = [];
    let powerIndexes = [];
    let squaredIndexes = [];

    console.log(printed);
    for (let i = 1; i < printed.length; i++) {
        if (mainOperators.includes(printed[i]) === false && mainOperators.includes(printed[i-1]) === false) {
            printed[i] = printed[i-1].concat("", printed[i]);
            printed.splice(i-1, 1);
            console.log(printed);
            i--;
        }
        // else {
        //     switch (printed[i]) {
        //         case "+":
        //             additionIndexes.push(i);
        //             break;
        //         case "*":
        //             multIndexes.push(i);
        //             break;
        //         case "-":
        //             substractionIndexes.push(i);
        //             break;
        //         case "/":
        //             divisionIndexes.push(i);
        //             break;
        //         case "²":
        //             powerIndexes.push(i);
        //             break;
        //         case "√":
        //             squaredIndexes.push(i);
        //             break;
            
        //         default:
        //             break;
        //     }
        // }
    }

    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "²") {
            powerIndexes.push(i);
        }
    }
    for (let i = 0; i < powerIndexes.length; i++) {
        printed[powerIndexes[i]-1] = power(printed[powerIndexes[i]-1]);
        console.log(printed[powerIndexes[i]-1]);
        if (mainOperators.includes(printed[powerIndexes[i]+1]) === false && powerIndexes[i]+1 != printed.length) {
            console.log("Aboba");
            printed[powerIndexes[i]-1] = multiplication(printed[powerIndexes[i]-1], printed[powerIndexes[i]+1]);
            printed.splice(powerIndexes[i], 1);
            for (let z = i + 1; z < powerIndexes.length; z++) {
                powerIndexes[z] -= 1;
            }
        }
        printed.splice(powerIndexes[i], 1);
        console.log(printed);
        for (let y = i + 1; y < powerIndexes.length; y++) {
            powerIndexes[y] -= 1;
            console.log(powerIndexes[y]);
        }

    }
    console.log("Power operations done!");
    console.log(printed);

    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "√") {
            squaredIndexes.push(i);
        }
    }
    for (let i = 0; i < squaredIndexes.length; i++) {
        printed[squaredIndexes[i]+1] = squared(printed[squaredIndexes[i]+1]);
        console.log(printed[squaredIndexes[i]+1]);
        if (mainOperators.includes(printed[squaredIndexes[i]-1]) === false && squaredIndexes[i]-1 >= 0) {
            console.log("Aboba");
            printed[squaredIndexes[i]-1] = multiplication(printed[squaredIndexes[i]-1], printed[squaredIndexes[i]+1]);
            printed.splice(squaredIndexes[i], 1);
            for (let z = i + 1; z < squaredIndexes.length; z++) {
                squaredIndexes[z] -= 1;
            }
        }
        printed.splice(squaredIndexes[i], 1);
        console.log(printed);
        for (let y = i + 1; y < squaredIndexes.length; y++) {
            squaredIndexes[y] -= 1;
            console.log(squaredIndexes[y]);
        }

    }
    console.log("Squared operations done!");
    console.log(printed);

    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "*") {
            multIndexes.push(i);
        }
    }
    for (let i = 0; i < multIndexes.length; i++) {
        printed[multIndexes[i]-1] = multiplication(printed[multIndexes[i]-1], printed[multIndexes[i]+1]);
        console.log(printed[multIndexes[i]+1]);
        // if (mainOperators.includes(printed[multIndexes[i]-1]) === false && multIndexes[i]-1 >= 0) {
        //     console.log("Aboba");
        //     printed[multIndexes[i]-1] = multiplication(printed[multIndexes[i]-1], printed[multIndexes[i]+1]);
        //     printed.splice(multIndexes[i], 1);
        //     for (let z = i + 1; z < multIndexes.length; z++) {
        //         multIndexes[z] -= 1;
        //     }
        // }
        printed.splice(multIndexes[i], 2);
        console.log(printed);
        for (let y = i + 1; y < multIndexes.length; y++) {
            multIndexes[y] -= 2;
            console.log(multIndexes[y]);
        }

    }
    console.log("Multiplication operations done!");
    console.log(printed);

    
    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "/") {
            divisionIndexes.push(i);
        }
    }
    for (let i = 0; i < divisionIndexes.length; i++) {
        printed[divisionIndexes[i]-1] = division(printed[divisionIndexes[i]-1], printed[divisionIndexes[i]+1]);
        console.log(printed[divisionIndexes[i]+1]);
        // if (mainOperators.includes(printed[multIndexes[i]-1]) === false && multIndexes[i]-1 >= 0) {
        //     console.log("Aboba");
        //     printed[multIndexes[i]-1] = multiplication(printed[multIndexes[i]-1], printed[multIndexes[i]+1]);
        //     printed.splice(multIndexes[i], 1);
        //     for (let z = i + 1; z < multIndexes.length; z++) {
        //         multIndexes[z] -= 1;
        //     }
        // }
        printed.splice(divisionIndexes[i], 2);
        console.log(printed);
        for (let y = i + 1; y < divisionIndexes.length; y++) {
            divisionIndexes[y] -= 2;
            console.log(divisionIndexes[y]);
        }

    }
    console.log("Division operations done!");
    console.log(printed);

    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "+") {
            additionIndexes.push(i);
        }
    }
    for (let i = 0; i < additionIndexes.length; i++) {
        printed[additionIndexes[i]-1] = addition(printed[additionIndexes[i]-1], printed[additionIndexes[i]+1]);
        console.log(printed[additionIndexes[i]+1]);
        printed.splice(additionIndexes[i], 2);
        console.log(printed);
        for (let y = i + 1; y < additionIndexes.length; y++) {
            additionIndexes[y] -= 2;
            console.log(additionIndexes[y]);
        }

    }
    console.log("Addition operations done!");
    console.log(printed);

    for (let i = 0; i < printed.length; i++) {
        if (printed[i] === "-") {
            substractionIndexes.push(i);
        }
    }
    for (let i = 0; i < substractionIndexes.length; i++) {
        printed[substractionIndexes[i]-1] = subtraction(printed[substractionIndexes[i]-1], printed[substractionIndexes[i]+1]);
        console.log(printed[substractionIndexes[i]+1]);
        printed.splice(substractionIndexes[i], 2);
        console.log(printed);
        for (let y = i + 1; y < substractionIndexes.length; y++) {
            substractionIndexes[y] -= 2;
            console.log(substractionIndexes[y]);
        }

    }
    console.log("Substraction operations done!");
    console.log(printed);



    // console.log(printed);
    // console.log("additionIndexes: " + additionIndexes);
    // console.log("multIndexes: " + multIndexes);
    // console.log("substractionIndexes: " + substractionIndexes);
    // console.log("divisionIndexes: " + divisionIndexes);
    // console.log("powerIndexes: " + powerIndexes);
    // console.log("squaredIndexes: " + squaredIndexes);


    // for (let i = 0; i < squaredIndexes.length; i++) {
    //     printed[squaredIndexes[i]+1] = squared(printed[squaredIndexes[i]+1]);
    // }
    // console.log("Squared operations done!");
    // console.log(printed);

    // for (let i = 0; i < multIndexes.length; i++) {
    //     printed[multIndexes[i]-1] = multiplication(printed[multIndexes[i]-1], printed[multIndexes[i]+1]);
    // }
    // console.log("Multiplication operations done!");
    // console.log(printed);




    // for (let i = 0; i < printed.length; i++) {

    //     if (mainOperators.includes(printed[i]) === false) { // if it is a number
    //         console.log(printed[i] + " - Это число");
    //         newNum.push(printed[i]); // adding new number to newNum to save for concatination 
    //         console.log("NewNum: " + newNum);
    //         if (mainOperators.includes(printed[i - 1]) === false && i - 1 !== -1) { // if last symbol printed is a number, concatinating two numbers
    //             console.log("Прошлое значение - число: ");
    //             console.log("Соединяем две цифры в одно число:");
    //             newNum.splice(-2); // clearing each two numbers 
    //             newNum.push((printed[i - 1] + printed[i])); // concatinating two numbers in one and adding to newNum
    //             console.log("newNum: " + newNum);
    //             printed[i] = (newNum.slice(-1)); // changing actual printed[i] to new concatinated value to enable concationation for 3+ numbers
    //             console.log("printed[i] = " + printed[i]);
    //             printed.splice(i - 1, 1); //  clearing array from number that is concatinated in new one 
    //             i--; // adapting the iteration to changed printed array
    //             console.log("Printed: " + printed);

    //             if (mainOperators.includes(printed[i + 1]) === false && i + 1 !== printed.length) { // exit if next symbol is a number 
    //                 console.log("Следующий элемент - число");
    //             }
    //             else {
    //                 newNum = operations(printed[i - 1], parseFloat(newNum[0]), parseFloat(newNum[1]), newNum, result); // function calculates the result with two numbers from newNum array
    //                 result = newNum[0];
    //                 console.log("newNum: " + newNum);

    //             }


    //         }
    //         else if (mainOperators.includes(printed[i + 1]) === false && i + 1 !== printed.length) { // exits if next element is a number
    //             console.log("Следующий элемент - число");
    //         }
    //         else {
    //             newNum = operations(printed[i - 1], parseFloat(newNum[0]), parseFloat(newNum[1]), newNum, result);
    //             result = newNum[0];
    //             console.log("newNum: " + newNum);
    //         }
    //     }
    //     else if (goodOperators.includes(printed[i])) {
    //         newNum = operations(printed[i], parseFloat(newNum[0]), parseFloat(newNum[1]), newNum, result); // function calculates the result with two numbers from newNum array
    //         result = newNum[0];
    //         console.log("newNum: " + newNum);
    //     }
    //     else {
    //         console.log(printed[i] + " - Это оператор");
    //     }
    // }
    answer.textContent = printed[0];
}




