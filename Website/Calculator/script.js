let rTotal = 0;
let buffer = "0";
let prevOperation;

const screen = document.querySelector(".screen");

function buttonClicks(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerHTML = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            rTotal = 0;
            break;
        case "=":
            if (prevOperation == null) {
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperation = null;
            buffer = rTotal.toString();
            rTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0" && symbol !== "-") {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (rTotal === 0) {
        rTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    prevOperation = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (prevOperation === "+") {
        rTotal += intBuffer;
    } else if (prevOperation === "-") {
        rTotal -= intBuffer;
    } else if (prevOperation === "×") {
        rTotal *= intBuffer;
    } else if (prevOperation === "÷") {
        rTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            buttonClicks(event.target.innerText);
        });
}

init();
