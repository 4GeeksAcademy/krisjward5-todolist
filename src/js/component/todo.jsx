import React, { useState } from "react";

export function ToDo({ todo }) {
    return (
        <div>
            <span>{todo.task}</span>
        </div>
    );
}