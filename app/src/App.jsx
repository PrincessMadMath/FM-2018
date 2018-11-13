import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactCountdownClock from "react-countdown-clock";
import "react-toastify/dist/ReactToastify.css";

import multiple from "./data/multipleChoice.json";
import classic from "./data/classicQuestion.json";
import musical from "./data/musical.json";
import { shuffle } from "./utils/shuffle.js";
import { MutipleChoice } from "./questions/MutipleChoice.jsx";
import { ClassicQuestion } from "./questions/ClassicQuestion.jsx";
import { MusicalQuestion } from "./questions/MusicalQuestion.jsx";

const numberOfQuestion = 20;
const successThreshold = 16;
const timeOut = 30;

class App extends Component {
    state = {
        currentQuestionIndex: -1,
        sucessCount: 0,
        questions: [],
    };

    componentDidMount() {
        const quiz = [];

        const multipleQuestions = multiple.map(x => ({
            type: "multiple",
            ...x,
        }));
        quiz.push(...multipleQuestions);

        const classicQuestions = classic.map(x => ({
            type: "classic",
            ...x,
        }));
        quiz.push(...classicQuestions);

        const musicalQuestions = musical.map(x => ({
            type: "musical",
            ...x,
        }));
        quiz.push(...musicalQuestions);

        this.setState({
            currentQuestionIndex: 0,
            questions: shuffle(quiz).slice(1, numberOfQuestion + 1),
        });
    }

    handleAnswer = hasSucceed => {
        if (hasSucceed) {
            toast.success("Bonne réponse!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        } else {
            toast.error("Wrong!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

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
        return (
            <h1 className="flex flex-column items-center">
                Fête de Maud 2018!!!
            </h1>
        );
    };

    onTimeOut = () => {
        toast.error("Time out!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });

        this.setState(prevState => {
            return {
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
            };
        });
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
                    <main>
                        Le cadeau se trouve dans le tas de papier de toilette.
                    </main>
                </div>
            );
        }

        const remainingQuestion = questions.length - currentQuestionIndex;
        const missingPoint = successThreshold - sucessCount;
        if (
            currentQuestionIndex === questions.length ||
            remainingQuestion < missingPoint
        ) {
            return (
                <div className="flex flex-column items-center ">
                    <main className="f3 fw8 mb3 dark-red">Wrong! 🎵</main>
                    <audio autoPlay src={`./playlist/wrong.mp3`} />
                    <button
                        className="f6 link dim ba ph3 pv2 mb2 dib light-green bg-dark-gray"
                        onClick={this.retry}
                    >
                        Ré-essayer
                    </button>
                </div>
            );
        }

        const currentQuestion = questions[currentQuestionIndex];

        return (
            <div>
                <div>
                    <span className="db f6 gray">
                        Questions: {currentQuestionIndex + 1}/{questions.length}
                    </span>
                    <span className="db f6 gray">
                        Réponses requises: {sucessCount}/{successThreshold}
                    </span>
                </div>
                <div className="flex flex-column items-center mt3">
                    <div key={currentQuestionIndex}>
                        <ReactCountdownClock
                            seconds={timeOut}
                            color="#7000a0"
                            alpha={0.9}
                            size={100}
                            onComplete={this.onTimeOut}
                        />
                    </div>
                    {this.renderQuestion(currentQuestion)}
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="flex flex-column items-center">
                <div className="flex flex-column bg-light-green br3 pa3 mt5">
                    <header>{this.renderHeader()}</header>
                    <main>{this.renderMain()}</main>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default App;
