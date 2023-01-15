import {Todo} from "../models/Todo";
import React, {createContext, useContext} from "react";


export interface TodosListsContextInterface {
    todosContext: Todo[],
    dispatchTodos: React.Dispatch<any>
}

export const TodoListContext = createContext<TodosListsContextInterface>({
    todosContext: [],
    dispatchTodos: () => null
});

export const useTodoListContext = () => useContext(TodoListContext)

export interface CompletedTodosListsContextInterface {
    completedTodosContext: Todo[],
    dispatchCompletedTodos: React.Dispatch<any>
}

export const CompletedTodoListContext = createContext<CompletedTodosListsContextInterface>({
    completedTodosContext: [],
    dispatchCompletedTodos: () => null
});

export const useCompletedTodoListContext = () => useContext(CompletedTodoListContext)