import {Todo} from "../models/Todo";
import {useReducer} from "react";

type Actions =
    | {type: "add", payload: string}
    | {type: "remove", payload: number}
    | {type: "done", payload: number}

const ReducerActions = (state: Todo[], action: Actions) => {
    switch (action.type) {
        case "add" : return [
            ...state, {id: Date.now(), todo: action.payload, isDone: false}
        ];
        case "remove" : return state.filter((todo:Todo) => todo.id !== action.payload);
        case "done" : return state.map((todo:Todo) => todo.id === action.payload ? {...todo, isDone: !todo.isDone} : todo);
        default:
            return state;
    }
}

const TodoReducer = () => {
    const [state, dispatch] = useReducer(ReducerActions, []);
}

export default ReducerActions;