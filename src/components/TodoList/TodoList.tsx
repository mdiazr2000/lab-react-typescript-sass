import React from 'react';
import {Todo} from "../../models/Todo";
import "./styles.scss";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";



interface TodoListProps {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, completedTodos, setCompletedTodos}) => {

    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}` }
                         ref={provided.innerRef}
                         { ...provided.droppableProps } >
                        <span className="todos_heading"> Active Task</span>
                        <div>
                            { todos.map((todo, index) => (
                                <SingleTodo key={todo.id} index={index} todo={todo} todos={todos} setTodos={setTodos}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                { (provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}` }
                         ref={provided.innerRef}
                         { ...provided.droppableProps }>
                        <span className="todos_heading"> Completed Task</span>
                        <div>
                            { completedTodos.map((todo, index) => (
                                <SingleTodo key={todo.id} index={index} todo={todo} todos={completedTodos} setTodos={setCompletedTodos}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>

        </div>

    );
};

export default TodoList;