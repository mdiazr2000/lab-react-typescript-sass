import {Todo} from "../models/Todo";
import React, {createContext, useContext} from "react";


export interface TodosListsContextInterface {
    state: Todo[],
    dispatch: React.Dispatch<any>
}

export const TodoListContext = createContext<TodosListsContextInterface>({
    state: [],
    dispatch: () => null
});

export const useTodoListContext = () => useContext(TodoListContext)