import React from 'react';
import "./styles.scss";

const InputField = () => {
    return (
        <div>
            <form className='input'>
                <input type='input' placeholder='Enter a task' className='input_box'/>
                <button type='submit' className='input_submit'>Go</button>
            </form>
        </div>
    );
};

export default InputField;