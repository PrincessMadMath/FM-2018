import React, { Component } from "react";
import multiple from "./data/multipleChoice.json";
import classic from "./data/classicQuestion.json";
import musical from "./data/musical.json";
import { shuffle } from "./utils/shuffle.js";
import { MutipleChoice } from "./questions/MutipleChoice.jsx";
import { ClassicQuestion } from "./questions/ClassicQuestion.jsx";
import { MusicalQuestion } from "./questions/MusicalQuestion.jsx";

const successThreshold = 2;

class App extends Component {
    state = {
        currentQuestionIndex: -1,
        sucessCount: 0,
        questions: [],
    };

    componentDidMount() {
        const quiz = [];

        // const multipleQuestions = multiple.map(x => ({
        //     type: "multiple",
        //     ...x,
        // }));
        // quiz.push(...multipleQuestions);

        // const classicQuestions = classic.map(x => ({
        //     type: "classic",
        //     ...x,
        // }));
        // quiz.push(...classicQuestions);

        const musicalQuestions = musical.map(x => ({
            type: "musical",
            ...x,
        }));
        quiz.push(...musicalQuestions);

        this.setState({
            currentQuestionIndex: 0,
            questions: shuffle(quiz),
        });
    }

    handleAnswer = hasSucceed => {
        this.setState(prevState => {
            return {
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                sucessCount: hasSucceed
                    ? prevState.sucessCount + 1
                    : prevState.sucessCount,
            };
        });
    };

    retry = () => {
        this.setState(prevState => {
            return {
                currentQuestionIndex: 0,
                sucessCount: 0,
            };
        });
    };

    renderQuestion = question => {
        switch (question.type) {
            case "multiple":
                return (
                    <MutipleChoice
                        challenge={question}
                        onAnswer={this.handleAnswer}
                    />
                );

            case "classic":
                return (
                    <ClassicQuestion
                        challenge={question}
                        onAnswer={this.handleAnswer}
                    />
                );

            case "musical":
                return (
                    <MusicalQuestion
                        challenge={question}
                        onAnswer={this.handleAnswer}
                    />
                );

            default:
                return <div>Uh uh not supported {question.type}</div>;
        }
    };

    renderHeader = () => {
        return <div>Fête de Maud 2018!!!</div>;
    };

    renderMain = () => {
        const { currentQuestionIndex, questions, sucessCount } = this.state;

        if (currentQuestionIndex < 0) {
            return (
                <div>
                    <main>Loading Data...</main>
                </div>
            );
        }

        if (sucessCount === successThreshold) {
            return (
                <div>
                    <main>Le cadeau se trouve (pas encore livré lol)</main>
                </div>
            );
        }

        if (currentQuestionIndex === questions.length) {
            return (
                <div>
                    <main>Failed...</main>
                    <button onClick={this.retry()}>Ré-essayer</button>
                </div>
            );
        }

        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div>
                <div>
                    <span className="db">
                        Question: {currentQuestionIndex + 1}/{questions.length}
                    </span>
                    <span className="db">
                        Success required: {sucessCount}/{successThreshold}
                    </span>
                </div>
                <div>{this.renderQuestion(currentQuestion)}</div>
            </div>
        );
    };

    render() {
        return (
            <div>
                <header>{this.renderHeader()}</header>
                <main>{this.renderMain()}</main>
            </div>
        );
    }
}

export default App;
