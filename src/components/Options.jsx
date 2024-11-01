import React from "react";

const Options = ({ options, onSelectOption }) => {
    return (
        <div className="options">
            {options.map((option, index) => (
                <button key={index} className="option" onClick={() => onSelectOption(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
