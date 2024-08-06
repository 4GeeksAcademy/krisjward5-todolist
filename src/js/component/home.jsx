import React, { useState } from "react";
import { ToDoContainer } from "./todocontainer";



//create your first component
const Home = () => {
	
const fetchUsers = () => {
	fetch('https://playground.4geeks.com/todo/users/kris_ward')
	.then((res)=>res.json())
	.then((user)=>{
		setToDos(user.todo)
	})
} 


	return (
		<ToDoContainer/>
	);
};

export default Home;
