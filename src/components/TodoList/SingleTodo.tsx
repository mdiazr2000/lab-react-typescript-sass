import React, {useEffect, useRef, useState} from 'react';
import {Todo} from "../../models/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./singleTodosStyles.scss"
import {Draggable} from "react-beautiful-dnd";

interface SingleTodoProps  {
    index: number;
    todo: Todo,
    todos: Todo[],
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo: React.FC<SingleTodoProps> = ({index, todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleEditSingle = (e: React.FormEvent) => {
      e.preventDefault();
      handleEdit(todo.id, editTodo);
      setEdit(false);
    }

    const markAsDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo
        ))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (id: number, editTodo: string) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo));
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        }
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`todos_single ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e:React.FormEvent) => handleEditSingle(e)}>
                        {edit ? (
                            <input
                                ref={inputRef}
                                value={editTodo} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value)}
                                className="todos_single_text"/>
                        ) : (
                            todo.isDone ? (
                                <s className="todos_single_text">{todo.todo}</s>
                            ) : (
                                <span className="todos_single_text">{todo.todo}</span>
                            )
                        )}
                        <div>
                <span className="icon">
                    <AiFillEdit onClick={() => {
                        if (!todo.isDone) {
                            handleEdit(todo.id, editTodo);
                            setEdit(!edit);
                        }
                    }}/>
                </span>
                            <span className="icon">
                    <AiFillDelete onClick={() => handleDelete(todo.id)}/>
                </span>
                            <span className="icon">
                    <MdDone onClick={() => markAsDone(todo.id)}/>
                </span>
                        </div>
                    </form>
                )
            }

        </Draggable>

    );
};

export default SingleTodo;