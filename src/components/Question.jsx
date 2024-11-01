import React from "react";
import "./Question.css";
const Question = ({ question, media }) => {
    const imagePath = media ? `src/assets/pictures/${media}` : null;

    return (
        <div className="question-container">
            <h2 style={{ margin: "auto", maxWidth: "95%" }}>{question}</h2>
            {imagePath && <img src={imagePath} alt="media" className="question-img" style={{ maxWidth: "100%", height: "350px", backgroundSize: "cover", borderRadius: "10px" }} />}
        </div>
    );
};

export default Question;
