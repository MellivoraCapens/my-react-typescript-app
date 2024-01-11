import React, { useEffect, useState } from "react";

const Calculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [number, setNumber] = useState("");
  const [display, setDisplay] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setNumber(eval(input).toString());
        setInput(eval(input).toString());
      } catch (error) {
        setDisplay("Error");
      }
    }
    if (value === "C") {
      setDisplay("");
      setNumber("");
      setInput("");
    }
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      try {
        if (input === "") {
        } else if (
          input.includes("+") ||
          input.includes("-") ||
          input.includes("*") ||
          input.includes("/")
        ) {
          setNumber("");
          setDisplay(eval(input).toString());
          setInput(eval(input).toString() + value);
        } else {
          setInput((prevInput) => prevInput + value);
          setNumber("");
        }
      } catch (error) {}
    }
    if (value === ".") {
      if (input === "") {
      } else if (display.includes(".")) {
      } else {
        setNumber((prevInput) => prevInput + value);
        setInput((prevInput) => prevInput + value);
      }
    }
    if (value === "%") {
      if (input === "") {
      } else if (!(+input.slice(-1) >= 0 && +input.slice(-1) <= 9)) {
      } else {
        setInput(`${+input / 100}`);
        setNumber(`${+input / 100}`);
      }
    }
    if (value === "+/-") {
      if (!(+input.slice(-1) >= 0 && +input.slice(-1) <= 9) || input === "") {
      } else {
        setInput(`${input} * -1`);
        setNumber(`${+number * -1}`);
      }
    }

    if (+value >= 0 && +value <= 9) {
      setNumber((prevInput) => prevInput + value);
      setInput((prevInput) => prevInput + value);
    }
  };
  useEffect(() => {
    if (number !== "") {
      setDisplay(number);
    }
  }, [number]);
  return (
    <div className="calculator-main">
      <input type="text" value={display} readOnly />
      <button onClick={() => handleButtonClick("C")}>C</button>
      <button onClick={() => handleButtonClick("%")}>%</button>
      <button onClick={() => handleButtonClick("+/-")}>+/-</button>
      <button onClick={() => handleButtonClick("/")}>/</button>
      <button className="number" onClick={() => handleButtonClick("7")}>
        7
      </button>
      <button className="number" onClick={() => handleButtonClick("8")}>
        8
      </button>
      <button className="number" onClick={() => handleButtonClick("9")}>
        9
      </button>
      <button onClick={() => handleButtonClick("*")}>*</button>
      <button className="number" onClick={() => handleButtonClick("4")}>
        4
      </button>
      <button className="number" onClick={() => handleButtonClick("5")}>
        5
      </button>
      <button className="number" onClick={() => handleButtonClick("6")}>
        6
      </button>
      <button onClick={() => handleButtonClick("-")}>-</button>
      <button className="number" onClick={() => handleButtonClick("1")}>
        1
      </button>
      <button className="number" onClick={() => handleButtonClick("2")}>
        2
      </button>
      <button className="number" onClick={() => handleButtonClick("3")}>
        3
      </button>
      <button onClick={() => handleButtonClick("+")}>+</button>
      <button className="zero number" onClick={() => handleButtonClick("0")}>
        0
      </button>
      <button onClick={() => handleButtonClick(".")}>.</button>
      <button onClick={() => handleButtonClick("=")}>=</button>
    </div>
  );
};

export default Calculator;
