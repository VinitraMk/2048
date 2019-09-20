import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    if(props.value===2){
        return(
            <div className="game2048-board__square color-two">{props.value}</div>
        )
    }
    else if(props.value===4) {
        return(
            <div className="game2048-board__square color-four">{props.value}</div>
        )
    }
    else {
        return(
            <div className="game2048-board__square"></div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            squares:Array(16).fill(null),
            direction:null
        };
        //this.handleKeyDown=this.handleKeyDown.bind(this);
    }


    moveLeftOrUp(line) {
        var values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        var count=0;

        if(this.state.direction=="left") {
            for(var i=0;i<4;i++) {
                values[i]=squares[(line*4)+i].props.value;
            }
        }
        else if(this.state.direction="up") {
            for(i=0;i<4;i++) {
                values[i]=squares[(i*4)+line].props.value;
            }
        }

        for(i=0;i<4;i++) {
            if(values[i]!==0) {
                values[count++]=values[i];
            }
        }
        for(i=count;i<4;i++) {
            values[i]=0;
        }
        return values;
    }

    moveRightOrDown(line) {
        var values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        var count=0;
        
        if(this.state.direction==="right") {
            for(var i=0;i<4;i++) {
                values[i]=squares[(line*4)+i].props.value;
            }
        }
        else if(this.state.direction==="down") {
            for(i=0;i<4;i++) {
                values[i]=squares[(i*4)+line].props.value;
            }
        }
        for(i=3;i>=0;i--) {
            if(values[i]!==0) {
                values[3-count]=values[i];
                count++;
            }
        }
        for(i=(3-count);i>=0;i--) {
            values[i]=0;
        }
        
        return values;
    }

    
    moveSquares() {
        var values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        console.log(this.state.direction);
        

        //Move All squares to the left
        if(this.state.direction==="left") {
            for(var row=0;row<4;row++) {
                values=this.moveLeftOrUp(row);
                for(var i=0;i<4;i++) {
                    squares[(row*4)+i]=<Square value={values[i]}/>;
                }
            }
        }

        //Move all squares to right
        if(this.state.direction==="right") {
            for(row=0;row<4;row++) {
                values=this.moveRightOrDown(row);
                for(i=0;i<4;i++) {
                    squares[(row*4)+i]=<Square value={values[i]}/>;
                }
            }
        }

        //Move all squares up
        if(this.state.direction==="up") {
            for(var col=0;col<4;col++) {
                values=this.moveLeftOrUp(col);
                for(i=0;i<4;i++) {
                    squares[(i*4)+col]=<Square value={values[i]}/>;
                }
            }
        }

        if(this.state.direction==="down") {
            for(col=0;col<4;col++) {
                values=this.moveRightOrDown(col);
                for(i=0;i<4;i++) {
                    squares[(i*4)+col]=<Square value={values[i]}/>;
                }
            }
        }

        //Assign new squares position
        this.setState({squares:squares});
    }

    handleKeyDown(event){
        
        var direction="";
        switch(event.keyCode) {
            case 37:
                direction="left";
                break;
            case 38:
                direction="up";
                break;
            case 39:
                direction="right";
                break;
            case 40:
                direction="down";
                break;
            default:
                break;
        }
        
        this.setState({direction:direction});
        this.moveSquares();
    }

    initBoard () {
        var indices=[];
        var init=[2,4];
        var squares=this.state.squares.slice();
        indices[0]=Math.floor(Math.random()*16);
        var ti=Math.floor(Math.random()*16);
        while(ti===indices[0]){
            ti=Math.floor(Math.random()*16);
        } 
        indices[1]=ti;
        for(var i=0;i<16;i++){
            if(indices[0]===i || indices[1]===i) {
                var num=Math.round(Math.random());
                squares[i]=<Square value={init[num]}/>
            }
            else {
                squares[i]=<Square value={0}/>
            }
        }
        this.setState({squares:squares});
    }

    componentDidMount() {
        console.log('mounted');
        this.initBoard();
        document.querySelector('body').addEventListener("keydown",this.handleKeyDown.bind(this));
        //window.addEventListener("keydown",this.handleKeyDown.bind(this));
    }

    render() {
        return (
            <div className="game2048-board">
                {this.state.squares}
            </div>
        )
    }

}

class Game2048 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            current_score:0,
            best_score:0,
        };
    }



    
    render() {
        return(
            <div className="game2048">
                <div className="game2048-header">
                    <h1 className="game2048-header__title">2048</h1>
                    <div className="game2048-header-score">
                        <div className="game2048-header-score__current">
                            <span className="score-title">Current Score</span>
                            <span className="score-value">{this.state.current_score}</span>
                        </div>
                        <div className="game2048-header-score__best">
                            <span className="score-title">Best Score</span>
                            <span className="score-value">{this.state.best_score}</span>
                        </div>
                    </div>
                    
                </div>
                <div className="game2048-action">
                    <button className="game2048-action__button" type="button">New Game</button>
                </div>
                <Board/>
            </div>
        )
    }
     
}

ReactDOM.render(
    <Game2048/>,
    document.getElementById('root')
)
