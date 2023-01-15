import React, {useReducer, useState} from 'react';
import './App.scss';
import InputField from "./components/Input/InputField";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList/TodoList";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import ReducerActions from "./state/TodoReducer";
import { TodoListContext, CompletedTodoListContext } from './state/ContextTodo';

const App: React.FC = () => {

  const [todosContext, dispatchTodos] = useReducer(ReducerActions, []);

  const [completedTodosContext, dispatchCompletedTodos] = useReducer(ReducerActions, []);

  /*const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);*/

    const handleAdd = (taskValue: string) => {
        if (taskValue) {
            dispatchTodos({type: "add", payload: taskValue})
        }
  }

  const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

        let add, active = todosContext, complete = completedTodosContext;

        if (source.droppableId === 'TodosList') {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

  }

  return (
      <CompletedTodoListContext.Provider value= {{ completedTodosContext, dispatchCompletedTodos }}>
      <TodoListContext.Provider value= {{ todosContext, dispatchTodos }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField handleAdd={handleAdd}/>
          <TodoList/>
        </div>
      </DragDropContext>
      </TodoListContext.Provider>
      </CompletedTodoListContext.Provider>

  );
}

export default App;
