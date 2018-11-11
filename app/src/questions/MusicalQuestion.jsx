import React, { PureComponent } from "react";

export class MusicalQuestion extends PureComponent {
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
        const { question, fileName } = this.props.challenge;

        return (
            <div>
                <label>
                    {question}
                    <input
                        name="submittedAnswer"
                        type="text"
                        value={this.state.submittedAnswer}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPressed}
                    />
                    <audio src={`./playlist/${fileName}`} />
                    <button onClick={this.submitAnswer}>Sumbit answer</button>
                </label>
            </div>
        );
    }
}
