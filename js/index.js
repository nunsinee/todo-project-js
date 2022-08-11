// Selector
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

const todoDiv = document.createElement("div");

//AddEvenlistener
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addNewItem);
todoList.addEventListener("click", removeNewItem);
filterOptions.addEventListener("click", filterTodo);

function addNewItem(event) {
	event.preventDefault();

	const todoDiv = document.createElement("div");

	todoDiv.classList.add("todo");

	//create list element
	const newItem = document.createElement("li");
	newItem.classList.add("list");
	newItem.innerText = todoInput.value;

	todoDiv.appendChild(newItem);

	//check mark ButtonToRemove
	const completeButton = document.createElement("button");
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("complete-btn");
	todoDiv.appendChild(completeButton);

	//check trash ButtonToRemove
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	todoList.appendChild(todoDiv);

	//add todo to localStorage
	saveLocalTodos(todoInput.value);

	todoInput.value = "";
}

function removeNewItem(event) {
	const item = event.target;

	//Delete todo item

	if (item.classList[0] === "trash-btn") {
		const todo = item.parentNode;

		//animation when click delete
		todo.classList.add("fall");

		// Can use todo.remove(); but we use animation remove
		removeLocalStorageTodo(todo);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	//checkmark

	if (item.classList[0] === "complete-btn") {
		const todo = item.parentNode;
		todo.classList.toggle("completed");
	}
}

function filterTodo(event) {
	const todos = [...todoList.children];

	todos.forEach(function (todo) {
		switch (event.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;

			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	//check if some thing already there

	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		//made it to array
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach(function (todo) {
		const todoDiv = document.createElement("div");

		//create list element
		todoDiv.classList.add("todo");
		const newItem = document.createElement("li");
		newItem.innerText = todo;
		newItem.classList.add("list");

		todoDiv.appendChild(newItem);

		//check mark ButtonToRemove
		const completeButton = document.createElement("button");
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add("complete-btn");
		todoDiv.appendChild(completeButton);

		//check trash ButtonToRemove
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		todoList.appendChild(todoDiv);
	});
}

function removeLocalStorageTodo(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	// Delete from localStorage need to find index of item that need to remove
	//console.log(todo.children[0].innerText);
	// console.log(todos.indexOf("mim"));
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
removeLocalStorageTodo(todo);
