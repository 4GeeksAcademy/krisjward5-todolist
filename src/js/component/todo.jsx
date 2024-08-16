import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";


export function ToDo({ todo, handleDelete, handleEdit }) {

    const [editMode, setEditMode] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(todo.label);

    return (
        <div className="todo-item" key={todo.id}>
          {!editMode && (
            <span>{todo.label}</span>
          )}
          {editMode && (
            <input
              type="text"
              value={updatedTask}  // Bind input to updatedTask state
              onChange={(e) => setUpdatedTask(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {  
                  handleEdit(todo.id, updatedTask);  
                  setEditMode(false);  
                }
              }}
            />
          )}
          {!editMode ? (
            <>
              <FaPencil className="daicon" onClick={() => setEditMode(true)} />
              <FaXmark className="daicon" onClick={() => handleDelete(todo.id)} />
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleEdit(todo.id, updatedTask);  
                  setEditMode(false); 
                }}
              >
                Save
              </button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          )}
        </div>
      );
    }