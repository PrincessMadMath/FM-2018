import React from "react";
import { shuffle } from "../utils/shuffle";

export const MutipleChoice = ({ challenge, onAnswer }) => {
    const { question, answer, others } = challenge;

    const options = shuffle([answer, ...others]);

    function submitAnswer(choosenOption) {
        onAnswer(choosenOption === answer);
    }

    return (
        <div className="flex flex-column items-center">
            <h2>Catégorie: Choix de réponse</h2>
            <div className="flex flex-column items-center">
                <h3 className="mw7">{question}</h3>
                <div className="flex flex-column flex-wrap mw6 items-center">
                    {options.map(x => (
                        <button
                            key={x}
                            onClick={() => submitAnswer(x)}
                            className="f5 link dim ba ph3 pv2 mb2 dib light-green bg-dark-gray w5"
                        >
                            {x}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
