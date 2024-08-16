import React, { useEffect, useState } from "react";
import { ToDo } from "./todo.jsx";
import { TaskInput } from "./TaskInput.jsx"

export function ToDoContainer() {
    const [toDos, setToDos] = useState([]);
    const [task, setCurrentTask] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://playground.4geeks.com/todo/users/krisward');
                if (!response.ok) {
                    throw new Error(`Error fetching Todos: ${response.statusText}`);
                }
                const data = await response.json();
                setToDos(data.todos);
            } catch (error) {
                console.error("error fetching todos:", error)
            }
        };
        fetchTodos();
    }, []);

    const createTodo = async (userName, todo) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: todo.label,
                    is_done: todo.done,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error creating todo: ${response.statusText}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("error creating todo:", error)
        }
    };


    const updateTodo = async (todoId, todo) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: todo.label,
                    is_done: todo.done,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error updating todo: ${response.statusText}`);
            }
            const responseData = await response.json();
            return responseData; // This should be the updated todo from the server
        } catch (error) {
            console.error("error updating todo:", error)
            throw error;
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error deleting todo: ${response.statusText}`);
            }
            console.log(`deleted todoId: ${todoId}`);
            return response.ok;
        } catch (error) {
            console.error("error deleting todo:", error)
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setToDos(toDos.filter(item => item.id !== id));
        } catch (error) {
            console.error("error deleting todo:", error)
        }
    };


    const handleEdit = async (id, updatedTask) => {
        try {
            const updatedToDo = {
                label: updatedTask,
                done: false
            };
            const updatedTodoFromServer = await updateTodo(id, updatedToDo);
            
            setToDos(prevToDos => prevToDos.map(todo => 
                todo.id === id ? { ...todo, label: updatedTodoFromServer.label } : todo
            ));
        } catch (error) {
            console.error("error updating todo:", error)
        }
    };

    const handleCreate = async (newToDo) => {
        try {
            const createdTodo = await createTodo("krisward", newToDo);
            setToDos([...toDos, createdTodo]);
        } catch (error) {
            console.error("error creating todo:", error)
        }
    };


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
                                        done: false,
                                    };
                                    handleCreate(newToDo);
                                    setCurrentTask("");
                                }}
                            />
                            {toDos.map((todo, index) => (
                                <ToDo
                                    key={index}
                                    todo={todo}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
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
