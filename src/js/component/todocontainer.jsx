import React, { useEffect, useState } from "react";
import { ToDo } from "./todo.jsx";
import {TaskInput} from "./TaskInput.jsx"

export function ToDoContainer(fetchUsers) {
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
    
    useEffect (()=>{
        fetch('https://playground.4geeks.com/todo/users/krisward') 
        .then((response)=>{
            if(!response){
                throw new Error("network response is not ok")
            } 
            return response.json();
        })
        .then((data) => setToDos(data.todos))
        .catch((error) =>
            console.error(
                "there has been a probelem with your fetch"
            ))
    }, []);



    return (
        <div className="mainCard">
            <h1 className="daTitle">To Do</h1>
            <div className="paperStack">
                <ul>
                    <li>
                        <div className="page dapchd">
                            <TaskInput
                            task={task}
                            placeholder="what needs to be done?"
                            setTask={setCurrentTask}
                            onPressKeyEnter={(label) => {
                                const newToDo = {
                                    label,
                                    id: toDos.length + 1,
                                }
                                setToDos([...toDos, newToDo]);
                                setCurrentTask("")
                            }}
                            />
                            {toDos.map((todo, index) => (
                                <ToDo
                                    todo={todo}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    key={index}
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
