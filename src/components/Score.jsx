import React from "react";
import "../css/styles.css";

function Score({ score, correct, total, resetScore }) {
    return (
        <div className="scoring">
            <h3>점수: {score}% ({correct}/{total})</h3>
            <button onClick={resetScore} className="reset-button">
                점수 초기화
            </button>
        </div>
    );
}

export default Score;