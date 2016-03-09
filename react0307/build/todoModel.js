var app = app || {};

(function(){

	'use strict';

	var Utils = app.Utils;

	app.TodoModel = function (key) {
		this.key = key;
		this.todoLists = Utils.findTodoLists(key);
	};

	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key,this.todoLists);
	};

	app.TodoModel.prototype.addTodoName = function (val) {
		this.todoLists = this.todoLists.concat({
			id: Utils.uuid(),
			name: val,
			todos: []
		});
		this.inform();
	};

	app.TodoModel.prototype.addTodo = function (todolist,newTodo) {
		todolist.todos = todolist.todos.concat({
			id: Utils.uuid(),
			title: newTodo,
			completed:false
		});
		this.todoLists = this.todoLists.map(function(list){
			if(list.id === todolist.id){
				list = todolist;
			}
			return list;
		});
		this.inform();
	};

	app.TodoModel.prototype.destroyTodolist = function (todolistId) {
		this.todoLists = this.todoLists.filter(function(todoList){
			if(todoList.id == todolistId) {
				return false;
			}
			return true;
		});
		this.inform();
	};

	app.TodoModel.prototype.toggle = function (todolist,todoToToggle) {
		this.todoLists = this.todoLists.map(function(list){
			if(list.id === todolist.id) {
				list.todos = list.todos.map(function(todo){

					if(todo.id === todoToToggle.id){
						todo.completed = !todo.completed;
					}
					return todo;
					
				});
			}
			console.log("list",list);
			return list;
		});
		this.inform();
	}








})()

