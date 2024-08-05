import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { TaskInput } from "./TaskInput"


export function ToDo({ todo, handleDelete, handleEdit }) {

    const [editMode, setEditMode] = useState(false)

    return (
        <div className="todo-item" key={todo.id}>
            {!editMode && (
                <span>{todo.task}</span>
            )}
            {editMode && (
                <TaskInput
                    task={todo.task}
                    setTask={(updatedTaskValue) => handleEdit(todo.id, updatedTaskValue)}
                    onBlur={() => setEditMode(false)}
                />
            )}
            <FaXmark className="daicon" onClick={() => handleDelete(todo.id)} />
            <FaPencil className="daicon" onClick={() => setEditMode(true)} />
        </div>
    );
}