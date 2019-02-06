import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const randomColors = () => {
    const colors = ['black', 'blue', 'red', 'green', 'yellow'];
    const meaning = colors[Math.floor(Math.random() * colors.length)];
    const inkWord = colors[Math.floor(Math.random() * colors.length)];
    const inkColor = Math.random() < 0.5 ? meaning : colors[Math.floor(Math.random() * colors.length)];
    const match = meaning === inkColor;
    return {
        meaning,
        inkWord,
        inkColor,
        match
    };
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'playing',
            score: 0,
            topWordBottomColor: Math.random() < 0.5 ? true : false
        };
    }

    colorValues = randomColors();

    handleClick(bool) {
        this.setState(prevState => {
            if (prevState.status !== 'playing') return null;
            const isCorrect = (this.colorValues.match ^ bool) === 0;
            const newScore = isCorrect ? prevState.score + 1 : prevState.score - 1;
            return {
                status: isCorrect ? 'correct' : 'wrong',
                score: newScore,
                topWordBottomColor: Math.random() < 0.5 ? true : false
            };
        }, this.resetGame);
    }

    resetGame() {
        setTimeout(() => {
            this.colorValues = randomColors();
            this.setState({
                status: 'playing'
            });
        }, 500);
    }

    render() {
        const { meaning, inkWord, inkColor } = this.colorValues;
        const { topWordBottomColor } = this.state;
        const topMatch = topWordBottomColor ? ['top', 'bottom'] : ['bottom', 'top'];
        const topColors = topWordBottomColor ? [null, inkColor] : [inkColor, null];
        const topMeaning = topWordBottomColor ? [meaning, inkWord] : [inkWord, meaning];
        return (
            <div className="game">
                <div className="help">
                    Does the meaning of the <b>{topMatch[0]} word</b> match the
                    <b> ink color of the {topMatch[1]} word</b>?
                </div>
                <div className="body">
                    <div className={`game-status status-${this.state.status}`} />
                    <div className="meaning" style={{ color: topColors[0] }}>
                        {topMeaning[0].toUpperCase()}
                    </div>
                    <div className="ink" style={{ color: topColors[1] }}>
                        {topMeaning[1].toUpperCase()}
                    </div>
                    <div className="buttons">
                        <button onClick={() => this.handleClick(true)}>YES</button>
                        <button onClick={() => this.handleClick(false)}>NO</button>
                    </div>
                    <h2>Score: {this.state.score}</h2>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));
