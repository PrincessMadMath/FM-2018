import React, { Component } from "react";

export class ClassicQuestion extends Component {
    state = {
        submittedAnswer: "",
    };

    handleInputChange = event => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleKeyPressed = event => {
        if (event.key === "Enter") {
            this.submitAnswer();
        }
    };

    submitAnswer = () => {
        const { submittedAnswer } = this.state;
        const { challenge, onAnswer } = this.props;

        if (submittedAnswer === "") {
            return;
        }

        const isValid =
            challenge.answer.toLowerCase() === submittedAnswer.toLowerCase();

        onAnswer(isValid);
        this.setState({ submittedAnswer: "" });
    };

    render() {
        const { question } = this.props.challenge;

        return (
            <div className="flex flex-column items-center">
                <h2>Catégorie: Question Classique</h2>
                <div className="flex flex-column items-center">
                    <h3 className="mw7">{question}</h3>
                    <label className="mb3">
                        <span className="mr2">Réponse:</span>
                        <input
                            autoFocus
                            name="submittedAnswer"
                            type="text"
                            value={this.state.submittedAnswer}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeyPressed}
                        />
                    </label>
                    <button
                        className="f6 link dim ba ph3 pv2 mb2 dib light-green bg-dark-gray"
                        onClick={this.submitAnswer}
                    >
                        Soumettre la réponse
                    </button>
                </div>
            </div>
        );
    }
}
