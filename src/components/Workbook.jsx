import React from "react";
import "../css/styles.css";

const Workbook = ({ problem, input, setInput, handleSubmit }) => {
    return (
        <div className="notebook workbook-content">
            <h1>다음 문제를 풀어보세요</h1>
            <br />
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
                    placeholder="?"
                    style={{ fontSize: "18px", padding: "5px" }}
                />
                <button onClick={handleSubmit} className="answer-button">
                    제출
                </button>
            </div>
        </div>
    );
};

export default Workbook;

