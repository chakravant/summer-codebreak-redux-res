import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateAnswer } from "../store/logic";
import BallLine from "./BallLine";
import './CodeInput.css';

const numbers = [0,1,2,3,4,5,6,7,8,9];

export default function CodeInput({newCode} : {newCode: (code: number[]) => void}) {
    const answer = useAppSelector(s => s.game.currentAnswer)
    const dispatch = useAppDispatch();

    const addKey = (n: number) => {
        if (answer.length < 6) {
            dispatch(updateAnswer([...answer, n]))
        }
    }
    const removeKey = () => 
        dispatch(updateAnswer(answer.slice(0,-1)));
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