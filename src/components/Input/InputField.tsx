import React, {useRef, useState} from 'react';
import "./styles.scss";

interface InputFieldProps {
   /* todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>*/
    handleAdd: (taskValue: string) => void
}
// We could pass todo and setTodo as a properties to this Component and use in set the value and in the onChange of input
//const InputField: React.FC<InputFieldProps> = ({todo, setTodo, handleAdd }) => {
const InputField: React.FC<InputFieldProps> = ({ handleAdd }) => {

    const [taskValue, setTaskValue] = useState<string>("");

    const taskValueRef = useRef<HTMLInputElement>(null);

    const submitValue = (e: React.FormEvent, taskValue: string) => {
        e.preventDefault();
        handleAdd(taskValue);
        setTaskValue('');
        taskValueRef.current?.blur();
    }

    return (

            <form className='input' onSubmit={(e:React.FormEvent) => submitValue(e, taskValue)}>
                <input type='input'
                       ref={taskValueRef}
                       value={taskValue}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskValue(e.target.value)}
                       placeholder='Enter a task' className='input_box'/>
                <button type='submit' className='input_submit'>Go</button>
            </form>

    );
};

export default InputField;