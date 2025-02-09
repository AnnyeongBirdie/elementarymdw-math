import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

console.log("App.jsx loaded");

function App() {
  console.log("App component rendered");
  const [problem, setProblem] = useState(generateProblem());
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(parseInt(localStorage.getItem("correct")) || 0);
  const [wrong, setWrong] = useState(parseInt(localStorage.getItem("wrong")) || 0);

  function generateProblem() {
    console.log("generateProblem called");
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10) + 1; // 1 과 10 사이 숫자
    let num2 = Math.floor(Math.random() * 10) + 1;

    // 나눗셈 문제는 꼭 떨어지게
    if (operator === "/") {
      num1 = num1 * num2;
    }

    //뺄셈 문제는 큰수에서 작은 수를 빼어 음수가 안나오게 하기
    if (operator === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    return {
      num1,
      num2,
      operator,
      solution: eval(`${num1} ${operator} ${num2}`),
    };
  }

  const handleSubmit = () => {
    if (parseFloat(input) === problem.solution) {
      setCorrect(prev => {
        const newCorrect = prev + 1;
        localStorage.setItem("correct", newCorrect);
        return newCorrect;
      });
      setFeedback("잘했어요! 🎉");
      setProblem(generateProblem());
    } else {
      setWrong(prev => {
        const newWrong = prev + 1;
        localStorage.setItem("wrong", newWrong);
        return newWrong;
      });
      setFeedback("아쉽지만 틀렸어요. 다시해봐요!🥴");
    }
    setInput("");
  };

  const resetScore = () => {
    setCorrect(0);
    setWrong(0);
    localStorage.setItem("correct", 0);
    localStorage.setItem("wrong", 0);
  };

  const total = correct + wrong;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div>
      <Header />
      <br></br>
      <br></br>
      <h1>다음 문제를 풀어보세요 </h1>
      <br></br>
      <h2>
        {problem.num1} {problem.operator} {problem.num2} {"= ?"}
      </h2>
      <div className="answer">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) handleSubmit();
          }}
          placeholder="답을 입력하세요"
          style={{ fontSize: "18px", padding: "5px" }}
        />
        <button
          onClick={handleSubmit}
          style={{ fontSize: "18px", marginLeft: "10px" }}
        >
          제출
        </button>
      </div >
      <br></br>
      <h3>{feedback}</h3>
      <h3>점수: {score}% ({correct}/{total})</h3>
      <button onClick={resetScore} className="reset-button">점수 초기화</button>
      <Footer />
    </div>
  );
}

export default App;
