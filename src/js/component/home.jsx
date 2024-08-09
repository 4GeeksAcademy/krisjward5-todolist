import React, { useEffect, useState } from "react";
import { ToDoContainer } from "./todocontainer";



//create your first component
const Home = () => {

	// const [toDos, setToDos] = useState([]);

	// useEffect(() => {
	// 	fetchUsers()
	// }, []);


	// const fetchUsers = () => {
	// 	fetch('https://playground.4geeks.com/todo/users/krisward')
	// 		.then((res) => res.json())
	// 		.then((user) => {

	// 			setToDos(user.todo)
	// 		})
	// }


	return (
		<ToDoContainer 
		// fetchUsers={fetchUsers}
		
		/>
	);
};

export default Home;
