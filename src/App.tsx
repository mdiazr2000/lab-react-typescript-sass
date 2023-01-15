import React, {useState} from 'react';
import './App.scss';
import InputField from "./components/Input/InputField";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList/TodoList";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (taskValue: string) => {
    if (taskValue) {
      setTodos([...todos, {id: Date.now(), todo: taskValue, isDone: false}]);
    }
  }

  const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

        let add, active = todos, complete = completedTodos;

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

          setTodos(active);
          setCompletedTodos(complete);

  }

  return (

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField handleAdd={handleAdd}/>
          <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
        </div>
      </DragDropContext>


  );
}

export default App;
