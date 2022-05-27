const btn = document.querySelectorAll("button");
const inputField = document.querySelector("#calculation");
const operators = ['+', '-', '/', 'x'];

//change color of button after being clicked 

for (let i = 0; i < btn.length; i++) {
    const orig = btn[i].style.backgroundColor;
    if (btn[i].style.backgroundColor == '#ACF434') {
        btn[i].style.backgroundColor = orig;
    };
    btn[i].addEventListener('click', () => {
        btn[i].style.backgroundColor = '#ACF434';
        setTimeout(() => {
            btn[i].style.backgroundColor = orig;
        }, 200);
    });
};



//add clicked button into intputfield

inputField.value = '0';
const calcArray = []

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        if (btn[i].innerHTML !== 'C' && btn[i].innerHTML !== '=') {
            if (inputField.value === '0') {
                inputField.value = '';
            };
            //check if it is a number of operator, if number allow to write more than one character
            if (btn[i].parentNode.className === 'operators') {
                inputField.value = '';
                inputField.value += btn[i].innerHTML;
            }
            else {
                if (operators.includes(inputField.value)) {
                    inputField.value = '';
                };
                inputField.value += btn[i].innerHTML;
            };
        };
        //check if user input is not C or = 
        if (btn[i].innerHTML !== 'C' && btn[i].innerHTML !== '=') {
            //initialize the array for calculation 
            const num = Number(calcArray[calcArray.length - 1])
            if (calcArray.length === 0 && operators.includes(btn[i].innerHTML) === false && btn[i].innerHTML !== '0') {
                calcArray.push(btn[i].innerHTML);
            }
            // Add number to object in array if it is already an number
            else if (Number.isInteger(num) && num !== 0 && operators.includes(btn[i].innerHTML) === false) {
                calcArray[calcArray.length - 1] += btn[i].innerHTML;
            
            }
            // Add new element if it is operator
            else if ((operators.includes(btn[i].innerHTML) && operators.includes(calcArray[calcArray.length - 1]) === false && calcArray.length !== 0 ) || (operators.includes(calcArray[calcArray.length - 1]) && operators.includes(btn[i].innerHTML) === false && btn[i].innerHTML !== '0')) {
                calcArray.push(btn[i].innerHTML)
            }
            else if (operators.includes(calcArray[calcArray.length - 1]) && operators.includes(btn[i].innerHTML) && calcArray.length !== 0) {
                calcArray[calcArray.length - 1] = btn[i].innerHTML;
            };
        };

        //add * to calcArrayif userinput is x

        //get the result of the userinput
        function evil(fn) {
            return new Function('return ' + fn)();
        };
        if (btn[i].innerHTML === '=' && calcArray.length !== 0) {
            //replace x with *
            calcArray.map((currElement, index) => {
                if (currElement === 'x') {
                    calcArray[index] = '*';
                }
            });
            //add = to calcArray for further calculation
            calcArray.push('=');
            //get rid of = at the end
            let stringEquationArray = calcArray.slice(0, calcArray.length - 2);
            console.log(stringEquationArray);
            //convert array to string and give out result
            let stringEquation = stringEquationArray.join(' ');
            //calculate equation
            let resultOutput = evil(stringEquation);
            console.log( evil(stringEquation) );
            inputField.value = resultOutput;
        };
        console.log(calcArray);
    });
};