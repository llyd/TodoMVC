/*global Vue, todoStorage */

(function (exports) {

	'use strict';

	var filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	};



	exports.app = new Vue({

		// the root element that will be compiled
		el: '.todoapp',


		// app initial state
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},

		// watch todos change for localStorage persistence
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		},
		
		// components: {
		// 	'myComponent': MyComponent
		// },

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

            addTodoList: function(){

            },

			addTodo: function () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				//判断是否有tag
				var tag_arr = value.split('#').slice(1);
				this.todos.push({ title: value, completed: false, tags: tag_arr});
				this.newTodo = '';
			},

			removeTodo: function (todo) {
				this.todos.$remove(todo);
			},

			removeTodoList: function (todo) { //添加
				// this.todos.$removeTodo(todo);
			},

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			editTitle: function () {   //添加
				this.beforeEditTitleCache = this.todos.name;//??
				this.editedTitle = this.todos.name;
			},

			doneEdit: function (todo) {
				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

            doneTitleEdit: function () {  //添加
				if (!this.editedTitle) {
					return;
				}
				this.editedTitle = null;
				this.todos.name = this.todos.name.trim();
			},

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

            cancelTitleEdit: function () {  //添加
				this.editedTodo = null;
				this.todos.name = this.beforeEditTitleCache;
			},

			removeCompleted: function () {
				this.todos = filters.active(this.todos);
			}
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(function () {
					el.focus();
				});
			}
		}
	});

	console.log('asdf===')
 // var parent  = Vue.extend({
 // 	components:{
 // 		'my-component': {
 // 			template: todoapp
 // 		}
 // 	}
 // });



})(window);
