/*jshint unused:false */

(function (exports) {

	'use strict';

	var todoapp = '<section class="todoapp1" id = "{{id}}">'

			+'<header class="header">'
		    // +	'<li class = "todo_name">'
      //       +     ' <div class="view">'
      //       +        '<label @dblclick="editTitle()">{{todos.name}}</label>'
      //       +         '<button class="destroy" @click="removeTodoList()"></button>'
      //       +   '</div>'
      //       +  '<input class="edit" type="text" v-model="todos.name" v-todo-focus="todo == editedTodo" @blur="doneTitleEdit()" @keyup.enter="doneTitleEdit()" @keyup.esc="cancelTitleEdit()">'
      //       +    '</li>	'
			+	'<input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">'
			+ '</header>'

            +	'<section class="main" v-show="todos.length" v-cloak>'
+				'<input class="toggle-all" type="checkbox" v-model="allDone">'
+				'<ul class="todo-list">'
+				'<li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo == editedTodo}">'
+						'<div class="view">'
+							'<input class="toggle" type="checkbox" v-model="todo.completed">'
+							'<label @dblclick="editTodo(todo)">{{todo.title}}</label>'
+							'<button class="destroy" @click="removeTodo(todo)"></button>'
// +							'<label v-for = "tag in todo.tags">{{tag}}</label>'
+						'</div>'
+						'<input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">'
+					'</li>'
+				'</ul>'
+			'</section>'
+			'<footer class="footer" v-show="todos.length" v-cloak>'
+				'<span class="todo-count"><strong v-text="remaining"></strong> {{remaining | pluralize "item"}} left </span>'
+				'<ul class="filters">'
+					'<li><a href="#/all" :class="{selected: visibility == "all"}">All</a></li>'
+					'<li><a href="#/active" :class="{selected: visibility == "active"}">Active</a></li>'
+					'<li><a href="#/completed" :class="{selected: visibility == "completed"}">Completed</a></li>'
+				'</ul>'
+				'<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">'
+					'Clear completed'
+				'</button>'
+			'</footer>'
+		'</section>';

    

 // 定义
    // var MyComponent = Vue.extend({
    // 	template: todoapp

    // });

    var MyComponent = Vue.extend({
	  template: '<div>A custom component!</div>'
	})

    // exports.MyComponent = MyComponent

    // 注册
    Vue.component('my-component', MyComponent);

  


    
})(window);
