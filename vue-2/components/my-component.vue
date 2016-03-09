<style>
</style> 

<template>
<section class="my-component">
<section class="todoapp">
			<header class="header">
				<input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
			</header>
			<section class="main" v-show="todos.length" v-cloak>
				<input class="toggle-all" type="checkbox" v-model="allDone">
				<ul class="todo-list">
					<li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo == editedTodo}">
						<div class="view">
							<input class="toggle" type="checkbox" v-model="todo.completed">
							<label @dblclick="editTodo(todo)">{{todo.title}}</label>
							<button class="destroy" @click="removeTodo(todo)"></button>
						</div>
						<input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
					</li>
				</ul>
			</section>
			<footer class="footer" v-show="todos.length" v-cloak>
				<span class="todo-count">
					<strong v-text="remaining"></strong> {{remaining | pluralize 'item'}} left
				</span>
				<ul class="filters">
					<li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
					<li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
					<li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
				</ul>
				<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
					Clear completed
				</button>
			</footer>
</section>
</section>
</template>


<script>
   

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

	

    module.exports = {
	// app initial state
		data: function(){
			return {
				//alltodo: todoStorage.fetch();
			// todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		}
		},

		// props: ["alltodo"],

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: 
			{
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
				//return filters[this.visibility](this.alltodo.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
				//return filters.active(this.alltodo.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
					// this.alltodo.todos.forEach(function (todo) {
					// 	todo.completed = value;
					// });
				}
			}
		
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

			addTodo: function () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				//加标签
				var tags = value.split('#').slice(1);
				this.todos.push({ title: value, completed: false, tags:tags });
				// this.alltodo.todos.push({ title: value, completed: false, tags:tags });
				// var tag_sto = this.todos.tags;
				// var tags_unsim = tags.filter(function(element,pos){
				// 	if(element in tag_sto){
				// 		return false;
				// 	}
				// 	return true;
				// });
				// for(var i=0;i<tags_unsim.length;i++){
				// 	this.alltodo.tags.push(tags_unsim[i]);
				// }
				
				this.newTodo = '';
			},

			removeTodo: function (todo) {
				this.todos.$remove(todo);
				//this.alltodo.todos.$remove(todo);
			},

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
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

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.todos = filters.active(this.todos);
				//this.alltodo.todos = filters.active(this.alltodo.todos);
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
}
</script>