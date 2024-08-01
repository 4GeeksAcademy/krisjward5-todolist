import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export function ToDoContainer() {
    const [toDo, setToDo] = useState([]);
    const [task, setCurrentTask] = useState("");

    const handleDelete = (id) => {
        setToDo(toDo.filter(item => item.id !== id));
    };

    return (
        <div className="mainCard">
            <h1 className="daTitle">To Do</h1>
            <ul>
                <li>
                    <div className="page">
                        <input
                            placeholder="what needs to be done?"
                            type="text"
                            value={task}
                            onChange={(event) => {
                                setCurrentTask(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                const key = event.key;
                                if (key === 'Enter') {
                                    const newToDo = {
                                        task,
                                        id: toDo.length + 1,
                                    }
                                    setToDo([...toDo, newToDo]);
                                    setCurrentTask("")
                                }
                            }}
                        />
                        {toDo.map((todo) => (
                            <div className="todo-item" key={todo.id}>
                                <span>{todo.task}</span>
                                <FaXmark onClick={() => handleDelete(todo.id)}/>
                            </div>
                        ))}
                    </div>
                </li>
            </ul>
            <div className="daFoot">
                {toDo.length} {toDo.length === 1 ? 'item' : 'items'} left
            </div>
        </div>
    )
}


// make it so you can edit items already on the list