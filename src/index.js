import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {

    switch(props.value) {
        case 0: 
            return(<div className="game2048-board__square color-zero"></div>);
            break;
        case 2:
            return(<div className="game2048-board__square color-two"><p>{props.value}</p></div>);
            break;
        case 4:
            return(<div className="game2048-board__square color-four"><p>{props.value}</p></div>);
            break;
        case 8:
            return(<div className="game2048-board__square color-eight"><p>{props.value}</p></div>);
            break;
        case 16:
            return(<div className="game2048-board__square color-sixteen"><p>{props.value}</p></div>);
            break;
        case 32:
            return(<div className="game2048-board__square color-thirtytwo"><p>{props.value}</p></div>);
            break;
        case 64:
            return(<div className="game2048-board__square color-sixtyfour"><p>{props.value}</p></div>);
            break;
        case 128:
            return(<div className="game2048-board__square color-onetwoeight"><p>{props.value}</p></div>);
            break;
        case 256:
            return(<div className="game2048-board__square color-twofivesix"><p>{props.value}</p></div>);
            break;
        case 512:
            return(<div className="game2048-board__square color-fiveonetwo"><p>{props.value}</p></div>);
            break;
        case 1024:
            return(<div className="game2048-board__square color-onezerotwofour"><p>{props.value}</p></div>);
            break;
        case 2048:
            return(<div className="game2048-board__square color-twozerofoureight"><p>{props.value}</p></div>);
            break;
        default:
            break;
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
        var prev_values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        var count=0;
        var prev=-1;
        var score=0;
        var change=true;

        //Copy all values
        if(this.state.direction==="left") {
            for(var i=0;i<4;i++) {
                prev_values[i]=values[i]=squares[(line*4)+i].props.value;
            }
        }
        else if(this.state.direction==="up") {
            for(i=0;i<4;i++) {
                prev_values[i]=values[i]=squares[(i*4)+line].props.value;
            }
        }

        //Move or Merge 
        for(i=0;i<4;i++) {
            if(values[i]!==0) {
                if(prev!==-1) {
                    if(values[i]===prev) {
                        values[count-1]*=2;
                        //this.props.updateScore(prev*2);
                        score+=(prev*2);
                        prev=-1;
                    }
                    else {
                        prev=values[i];
                        values[count++]=values[i];
                    }

                }
                else {
                    prev=values[i];
                    values[count++]=values[i];
                }
            }
        }
        for(i=count;i<4;i++) {
            values[i]=0;
        }
        //this.props.updateScore(score);
        if(JSON.stringify(prev_values)===JSON.stringify(values)) {
            change=false;
        }
        return [values,score,change];
    }

    moveRightOrDown(line) {
        var values=Array(4).fill(0);
        var prev_values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        var count=0;
        var prev=-1;
        var score=0;
        var change=true;
        
        //Copy all squares
        if(this.state.direction==="right") {
            for(var i=0;i<4;i++) {
                prev_values[i]=values[i]=squares[(line*4)+i].props.value;
            }
        }
        else if(this.state.direction==="down") {
            for(i=0;i<4;i++) {
                prev_values[i]=values[i]=squares[(i*4)+line].props.value;
            }
        }

        //Move or Merge
        for(i=3;i>=0;i--) {
            if(values[i]!==0) {
                if(prev!==-1) {
                    if(prev===values[i]) {
                        values[3-(count-1)]*=2;
                        //this.props.updateScore(prev*2);
                        score+=(prev*2);
                        prev=-1;
                    }
                    else {
                        prev=values[i];
                        values[3-count]=values[i];
                        count++;
                    }
                }
                else {
                    prev=values[i];
                    values[3-count]=values[i];
                    count++;
                }
            }
        }
        for(i=(3-count);i>=0;i--) {
            values[i]=0;
        }

        if(JSON.stringify(prev_values)===JSON.stringify(values)) {
            change=false;
        }
        
        return [values,score,change];
    }

    
    moveSquares() {
        var values=Array(4).fill(0);
        var squares=this.state.squares.slice();
        var score=0;
        var change=false;
        

        //Move All squares to the left
        if(this.state.direction==="left") {
            for(var row=0;row<4;row++) {
                var arr=this.moveLeftOrUp(row);
                values=arr[0];
                score+=arr[1];
                change|=arr[2];
                for(var i=0;i<4;i++) {
                    squares[(row*4)+i]=<Square value={values[i]}/>;
                }
            }
        }

        //Move all squares to right
        if(this.state.direction==="right") {
            for(row=0;row<4;row++) {
                arr=this.moveRightOrDown(row);
                values=arr[0];
                score+=arr[1];
                change|=arr[2];
                for(i=0;i<4;i++) {
                    squares[(row*4)+i]=<Square value={values[i]}/>;
                }
            }
        }

        //Move all squares up
        if(this.state.direction==="up") {
            for(var col=0;col<4;col++) {
                arr=this.moveLeftOrUp(col);
                values=arr[0];
                score+=arr[1];
                change|=arr[2];
                for(i=0;i<4;i++) {
                    squares[(i*4)+col]=<Square value={values[i]}/>;
                }
            }
        }

        //Move all squares down
        if(this.state.direction==="down") {
            for(col=0;col<4;col++) {
                arr=this.moveRightOrDown(col);
                values=arr[0];
                score+=arr[1];
                change|=arr[2];
                for(i=0;i<4;i++) {
                    squares[(i*4)+col]=<Square value={values[i]}/>;
                }
            }
        }

        //Assign new squares position
        this.setState({squares:squares},()=>{
            this.props.updateScore(score);
            if(change) {
                this.bringNewSquare();
            }
        });
    }

    bringNewSquare() {
        var squares=this.state.squares.slice();
        var empty=[];
        var init=[2,4];
        for(var i=0;i<squares.length;i++) {
            if(squares[i].props.value===0) {
                empty.push(i);
            }
        }
        var ind=Math.floor(Math.random()*empty.length);
        var in1=Math.round(Math.random());
        squares[empty[ind]]=<Square value={init[in1]}/>;
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
        
        this.setState({direction:direction},this.moveSquares);
        
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
                squares[i]=<Square value={init[num]}/>;
            }
            else {
                squares[i]=<Square value={0}/>;
            }
        }
        this.setState({squares:squares});
        document.getElementById('main-board').classList.toggle('is-in');
    }

    componentDidMount() {
        console.log('mounted');
        this.initBoard();
        document.querySelector('body').addEventListener("keydown",this.handleKeyDown.bind(this));
        //window.addEventListener("keydown",this.handleKeyDown.bind(this));
    }

    render() {
        return (
            <div className="game2048-board" id="main-board">
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

    updateScore=(value) => {
        var tv=parseInt(value);
        var current_score=this.state.current_score;
        current_score+=tv;
        this.setState({current_score:current_score});
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
                <Board updateScore={this.updateScore}/>
            </div>
        )
    }
     
}

ReactDOM.render(
    <Game2048/>,
    document.getElementById('root')
)
