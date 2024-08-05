import React, { useState } from "react";

export function TaskInput({ task, placeholder, setTask, onPressKeyEnter, onBlur }) {

    return (
        <input
            placeholder={placeholder || ""}
            type="text"
            value={task}
            onChange={(event) => {
                setTask(event.target.value);
            }}
            onKeyDown={(event) => {
                const key = event.key;
                if (key === 'Enter') {
                    onPressKeyEnter?.(task)
                }
            }}
            onBlur={onBlur}
        />
    )
}