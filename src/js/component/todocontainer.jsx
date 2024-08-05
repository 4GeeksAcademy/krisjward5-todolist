import React, { useState } from "react";
import { ToDo } from "./todo.jsx";
import {TaskInput} from "./TaskInput.jsx"

export function ToDoContainer() {
    const [toDos, setToDos] = useState([]);
    const [task, setCurrentTask] = useState("");
    const handleDelete = (id) => {
        setToDos(toDos.filter(item => item.id !== id));
    };
    const handleEdit = (id, updatedTask) => {
        const updatedToDos = toDos.map((todo) => {
            if (todo.id === id) {
                const updatedToDo = {
                    task: updatedTask, id 
                }
                return updatedToDo;
            } else {
                return todo;
            }
        })
        setToDos(updatedToDos);
    };


    return (
        <div className="mainCard">
            <h1 className="daTitle">To Do</h1>
            <div className="paperStack">
                <ul>
                    <li>
                        <div className="page">
                            <TaskInput
                            task={task}
                            placeholder="what needs to be done?"
                            setTask={setCurrentTask}
                            onPressKeyEnter={(task) => {
                                const newToDo = {
                                    task,
                                    id: toDos.length + 1,
                                }
                                setToDos([...toDos, newToDo]);
                                setCurrentTask("")
                            }}
                            />
                            {toDos.map((todo) => (
                                <ToDo
                                    todo={todo}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    key={todo.id}
                                />
                            ))}
                        </div>
                    </li>
                </ul>
                <span className="daFoot">
                    {toDos.length} {toDos.length === 1 ? 'item' : 'items'} left
                </span>
            </div>
        </div>
    )
}
