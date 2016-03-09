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
	}
})()

