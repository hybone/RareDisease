Page({
  data: {
    result: "0",  // 显示计算结果
    expression: "", // 表达式字符串
    currentInput: "",  // 当前输入
    previousInput: "",  // 上一次输入
    operation: null,  // 记录当前操作符
    buttons: [
      { label: "AC", value: "AC", class: "light-gray" },
      { label: "+/-", value: "negate", class: "light-gray" },
      { label: "%", value: "percent", class: "light-gray" },
      { label: "÷", value: "/", class: "orange" },
      { label: "7", value: "7", class: "dark-gray" },
      { label: "8", value: "8", class: "dark-gray" },
      { label: "9", value: "9", class: "dark-gray" },
      { label: "×", value: "*", class: "orange" },
      { label: "4", value: "4", class: "dark-gray" },
      { label: "5", value: "5", class: "dark-gray" },
      { label: "6", value: "6", class: "dark-gray" },
      { label: "−", value: "-", class: "orange" },
      { label: "1", value: "1", class: "dark-gray" },
      { label: "2", value: "2", class: "dark-gray" },
      { label: "3", value: "3", class: "dark-gray" },
      { label: "+", value: "+", class: "orange" },
      { label: "0", value: "0", class: "dark-gray" },
      { label: ".", value: ".", class: "dark-gray" },
      { label: "=", value: "=", class: "orange" }
    ]
  },

  // 按钮点击事件
  onButtonTap(event) {
    const value = event.currentTarget.dataset.value;
    console.log(value)

    if (value >= "0" && value <= "9") {
      this.appendNumber(value);
    } else if (value === ".") {
      this.appendDecimal();
    } else if (["+", "-", "*", "/"].includes(value)) {
      this.setOperation(value);
    } else if (value === "=") {
      this.calculateResult();
    } else if (value === "AC") {
      this.clearAll();
    } else if (value === "negate") {
      this.negateNumber();
    } else if (value === "percent") {
      this.convertPercent();
    }
  },

  // 追加数字
  appendNumber(number) {
    let { currentInput, expression } = this.data;
    currentInput += number;
    expression += number;
    console.log(expression)
  
    this.setData({
      currentInput,
      expression,
      result: expression
    });
  },

  // 追加小数点
  appendDecimal() {
    let { currentInput, expression } = this.data;
    if (!currentInput.includes(".")) {
      currentInput += ".";
      expression += ".";
    }
    this.setData({ result: expression, currentInput, expression });
  },

  // 处理运算符
  setOperation(op) {
    let { currentInput, expression } = this.data;
    if (!currentInput) return;
  
    this.setData({
      previousInput: currentInput,
      currentInput: "",
      operation: op,
      expression: expression + op,
      result: expression + op
    });
  },

  // 计算结果
  calculateResult() {
    let { previousInput, currentInput, operation } = this.data;
  
    if (!operation || !previousInput || !currentInput) return;
  
    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let result = 0;
  
    switch (operation) {
      case "+": result = num1 + num2; break;
      case "-": result = num1 - num2; break;
      case "*": result = num1 * num2; break;
      case "/": result = num2 !== 0 ? num1 / num2 : "错误"; break;
    }
  
    this.setData({
      result: String(result),
      currentInput: String(result),
      previousInput: "",
      operation: null,
      expression: String(result)
    });
  },
  

  // 清空数据
  clearAll() {
    this.setData({
      result: "0",
      expression: "",
      currentInput: "",
      previousInput: "",
      operation: null
    });
  },

  // 取反
  negateNumber() {
    let { currentInput } = this.data;
    if (currentInput) {
      currentInput = String(-parseFloat(currentInput));
      this.setData({ 
        result: currentInput,
        expression: currentInput,
        currentInput
      });
    }
  },

  // 转换百分比
  convertPercent() {
    let { currentInput } = this.data;
    if (currentInput) {
      currentInput = String(parseFloat(currentInput) / 100);
      this.setData({ 
        result: currentInput,
        expression: currentInput,
        currentInput
      });
    }
  }
});
