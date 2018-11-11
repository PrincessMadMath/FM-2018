import React from "react";
import { shuffle } from "../utils/shuffle";

export const MutipleChoice = ({ challenge, onAnswer }) => {
    const { question, answer, others } = challenge;

    const options = shuffle([answer, ...others]);

    function submitAnswer(choosenOption) {
        onAnswer(choosenOption === answer);
    }

    return (
        <div>
            <span>{question}</span>
            <ul>
                {options.map(x => (
                    <li key={x}>
                        <button onClick={() => submitAnswer(x)}>{x}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
