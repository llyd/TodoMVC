var app = app || {};
(function () {

	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var todoItem = app.TodoItem;
	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	app.Todoapp = React.createClass({displayName: "Todoapp",

			getInitialState: function () {
				return {
					newTodo:'',
					nowShowing:app.ALL_TODOS
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

			destroyTodolist: function () {
				var todolistId = this.props.todolist.id;
				this.props.model.destroyTodolist(todolistId);
			},

			toggle: function (todoToToggle) {
				var todolist = this.props.todolist;
				console.log('toggle');
				this.props.model.toggle(todolist,todoToToggle)
			},

			render: function () {
				var todolist = this.props.todolist;
				var TodoItem = app.TodoItem;
				var main;
				var footer;
				var TodoFooter = app.TodoFooter;

				var showTodos = todolist.filter(function(todo){
					switch (this.state.nowShowing) {
						case app.ACTIVE_TODOS:
							return !todo.completed;
						case app.COMPLETED_TODOS:
							return todo.completed;
						default:
							return true;
					}
				}, this);
				var todoItems = todolist.todos.map(function (todo) {
					return (
						React.createElement(TodoItem, {
							todo: todo, 
							onToggle: this.toggle.bind(this, todo)}
						)
						);
				}, this);


				if(todolist.todos.length > 0){
					main = (
						React.createElement("section", {className: "main"}, 
							React.createElement("ul", {className: "todo-list"}, 
								todoItems
							)
							
						)
						);
				}

					footer = (
						React.createElement(TodoFooter, {
									nowShowing: this.state.nowShowing}
								)
					);

				return (
					React.createElement("section", {className: "add_margin"}, 
						React.createElement("header", {className: "header"}, 
							React.createElement("label", null, todolist.name), 
							React.createElement("span", {className: "delete", 
									onClick: this.destroyTodolist}, "删除"), 
							React.createElement("input", {className: "new-todo", 
								    placeholder: "add your new todo ...", 
								    value: this.state.newTodo, 
								    onChange: this.handleTodoChange, 
								    onKeyDown: this.addTodo}
							 )
						 ), 
						 main, 
						 footer
					)
					);
			}


	});



	})()