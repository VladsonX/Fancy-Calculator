
let buttonNumbers =  document.querySelectorAll(".number");
let  buttonOperators = document.querySelectorAll(".operator");



var printed = [];


var allNumbers = document.querySelectorAll(".number").length;



for (var i = 0; i < allNumbers; i++) {

    document.querySelectorAll(".number")[i].addEventListener("click", function() {
    addToResultField((this));
    });
}

var allOperators = document.querySelectorAll(".operator").length;

for (var i = 0; i < allOperators-2; i++) {

    document.querySelectorAll(".operator")[i].addEventListener("click", function() {
    addToResultField((this));
    });
};

for (let i = 0; i < allNumbers; i++)
buttonNumbers[i].addEventListener("click", function() {
    new Audio("button.mp3").play();
});
for (let i = 0; i < allOperators; i++)
buttonOperators[i].addEventListener("click", function() {
    new Audio("button.mp3").play();
});



document.querySelector(".clear").addEventListener("click", () => {
    printed = [];
    document.querySelector(".expression").innerHTML = "";
    document.querySelector(".answer").innerHTML = "";
});




document.querySelector(".back").addEventListener("click", () => {
    document.querySelector(".expression").innerHTML = document.querySelector(".expression").innerHTML.slice(0, -1);
    printed.pop(printed[printed.length-1]);
});
document.querySelector(".equal").addEventListener("click", () => {
    var answerString = "";
    var sqrtIndex = "";
    for (i = 0; i < printed.length; i++) {

        if (sqrtIndex != "") {
            if (printed[i] == "+" || printed[i] == "-" || printed[i] == "*" || printed[i] == "/" || printed[i] == "%") {
                printed[i] = ")" + printed[i];
                answerString = answerString + printed[i];
                sqrtIndex = "";
            } else if (i == printed.length-1) {
                printed[i] = printed[i] + ")";
                answerString = answerString + printed[i];
                sqrtIndex = "";
            }
        }
        if (printed[i] == "√") {
            printed[i] = "*Math.sqrt(";
            var sqrtIndex = i;
            console.log(sqrtIndex);
            answerString = answerString + printed[i];
        }
        else {answerString = answerString + printed[i];}
    };
    document.querySelector(".answer").innerHTML = eval(answerString);
});




const operators = ["+", "-", "*", "/", ".", "√", "%"];

function addToResultField(element) {

    if (operators.includes(element.innerHTML)) {
        if (operators.includes(printed[printed.length-1])) {
            return;
        } else {
            printed.push(element.innerText);
            document.querySelector(".expression").innerHTML = document.querySelector(".expression").innerHTML + element.innerHTML;
        }      
    } else {
        if (printed[printed.length-1] == "*Math.sqrt(") {
            printed.push(element.innerText + ")");
            document.querySelector(".expression").innerHTML = document.querySelector(".expression").innerHTML + element.innerHTML;
            } else {
                printed.push(element.innerText);
                document.querySelector(".expression").innerHTML = document.querySelector(".expression").innerHTML + element.innerHTML;
            }
       
    }
    
   

}



