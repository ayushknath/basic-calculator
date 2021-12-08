const primaryDisplay = document.querySelector(".primary-display");
const secondaryDisplay = document.querySelector(".secondary-display");
const allClearBtn = document.querySelector(".all-clear");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");
const dotBtn = document.querySelector(".dot");
const digitsArr = Array.from(document.querySelectorAll(".number"));
const operatorsArr = Array.from(document.querySelectorAll(".operator"));

class Calculator {
  constructor() {
    this.primary = "";
    this.secondary = "";
    this.operator = undefined;
    this.isEqualInvoked = false;
    this.allClear();
  }

  allClear() {
    this.primary = "";
    this.secondary = "";
  }

  delete() {
    if (this.primary === "") this.allClear();
    else this.primary = this.primary.toString().slice(0, -1);
  }

  appendDigit(digit) {
    if (!isNaN(parseFloat(digit)))
      this.primary = this.primary.toString() + digit.toString();
  }

  appendDot(dot) {
    if (this.primary === "") this.primary = `0${dot}`;
    else if (this.primary.split(".").length === 2) return;
    else this.primary = this.primary.toString() + dot.toString();
  }

  operation(op) {
    if (this.primary === "") return;
    else if (this.secondary === "") this.secondary = parseFloat(this.primary).toString() + " " + op.toString();
    else this.secondary = `${this.compute()} ${op}`;
    this.primary = "";
    this.operator = op;
  }

  compute() {
    let x = parseFloat(this.secondary), y = parseFloat(this.primary), z = 0;
    switch (this.operator) {
      case "+":
        z = x + y;
        break;
      case "-":
        z = x - y;
        break;
      case "×":
        z = x * y;
        break;
      case "÷":
        z = x / y;
        break;
      default:
        return;
    }
    if (this.isEqualInvoked) {
      this.secondary = "";
      this.primary = z;
      this.isEqualInvoked = false;
    } else return z;
  }

  updateDisplay() {
    primaryDisplay.innerHTML = this.primary;
    secondaryDisplay.innerHTML = this.secondary;
  }
}

const calculator = new Calculator();

for (let i = 0; i < digitsArr.length; i++) {
  digitsArr[i].addEventListener("click", (e) => {
    calculator.appendDigit(e.target.innerHTML);
    calculator.updateDisplay();
  });
}

for (let i = 0; i < operatorsArr.length; i++) {
  operatorsArr[i].addEventListener("click", (e) => {
    calculator.operation(e.target.innerHTML);
    calculator.updateDisplay();
  });
}

dotBtn.addEventListener("click", (e) => {
  calculator.appendDot(e.target.innerHTML);
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  calculator.isEqualInvoked = true;
  calculator.compute();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});