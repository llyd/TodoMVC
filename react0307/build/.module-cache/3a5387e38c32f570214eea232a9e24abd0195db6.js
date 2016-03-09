var app = app || {};
(function () {

	'use strict';

	var todoItem = app.TodoItem;
	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	app.Todoapp = React.createClass({displayName: "Todoapp",

			getInitialState: function () {
				return {
					newTodo:''
				}
			},

			addTodo: function (event) {
				if(event.keyCode != ENTER_KEY) {
					return;
				}
				event.preventDefault();
				var newTodo = this.state.newTodo.trim();
				var todolist = this.props.todolist;
				if(newTodo) {
					this.props.model.addTodo(todolist,newTodo);
					this.setState({newTodo:''});
				}
			},

			handleTodoChange: function (event) {
				this.setState({newTodo:event.target.value})
			},

			render: function () {
				var todolist = this.props.todolist;
				var TodoItem = app.TodoItem;
				var main;

				var todoItems = todolist.todos.map(function (todo) {
					return (
						React.createElement(TodoItem, {
							todo: todo}
						)
						);
				});


				if(todolist.todos.length > 0){
					main = (
						React.createElement("section", {className: "main"}, 
							React.createElement("ul", {className: "todo-list"}, 
								todoItems
							)
						)
						);
				}
				return (
					React.createElement("section", {className: "add_margin"}, 
						React.createElement("header", {className: "header"}, 
							React.createElement("label", null, todolist.name), 
							React.createElement("span", {className: "delete"}, "删除"), 
							React.createElement("input", {className: "new-todo", 
								    placeholder: "add your new todo ...", 
								    value: this.state.newTodo, 
								    onChange: this.handleTodoChange, 
								    onKeyDown: this.addTodo}
							 )
						 ), 
						 main
					)
					);
			}


	});



	})()