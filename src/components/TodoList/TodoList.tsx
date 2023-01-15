import React, {useContext} from 'react';
import {Todo} from "../../models/Todo";
import "./styles.scss";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";
import {CompletedTodoListContext, TodoListContext} from "../../state/ContextTodo";

const TodoList: React.FC<any> = () => {

    const { todosContext } = useContext(TodoListContext);
    const { completedTodosContext } = useContext(CompletedTodoListContext);

    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}` }
                         ref={provided.innerRef}
                         { ...provided.droppableProps } >
                        <span className="todos_heading"> Active Task</span>
                        <div>
                            { todosContext.map((todo, index) => (
                                <SingleTodo key={todo.id} index={index} todo={todo}/>
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
                            { completedTodosContext.map((todo, index) => (
                                <SingleTodo key={todo.id} index={index} todo={todo}/>
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