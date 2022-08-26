import { connect, ConnectedProps } from 'react-redux';
import { updateAnswer } from "../store/logic";
import { RootState } from '../store/store';
import BallLine from "./BallLine";
import './CodeInput.css';

const numbers = [0,1,2,3,4,5,6,7,8,9];

const connector = connect(
    (state: RootState) => ({ answer: state.game.currentAnswer }),
    { updateAnswer }
)

interface Props extends ConnectedProps<typeof connector> {
    newCode: (code: number[]) => void
}

function code_input({answer, updateAnswer, newCode}: Props) {

    const addKey = (n: number) => {
        if (answer.length < 6) {
            updateAnswer([...answer, n])
        }
    }
    const removeKey = () => 
        updateAnswer(answer.slice(0,-1));
    const postCode = () => {
        newCode(answer);
    }

    return (
        <div className="container">
            <div className={"sc " + (answer.length >= 6 ? " disabled" : "")}>
                <BallLine
                        items={numbers}
                        color={ (_ix, el) => ({bgColor: `rgb(50,100,${ 50 + parseInt(el+'') *20 })`, txColor: 'white'})}
                        disabled={answer.length >= 6}
                        onClick={addKey}
                />
            </div>
            <div className="sc">
                <BallLine
                        items={answer}
                        color={ (_ix, el) => ({bgColor: `rgb(${ 50 + parseInt(el+'') *40 },100,50)`, txColor: 'white'})}
                />
            <button onClick={removeKey} disabled={answer.length === 0} className="ltbutton">&lt;</button>
            <button onClick={postCode} disabled={answer.length !==6} className="gobutton">Go!</button>
           </div>
        </div>
    );
}

const CodeInput = connector(code_input)
export default CodeInput
