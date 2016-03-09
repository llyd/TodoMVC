var app = app || {};
(function () {

	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var todoItem = app.TodoItem;
	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	app.Todoapp = React.createClass({

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
				this.setState({newTodo:event.target.value});
			},

			destroyTodolist: function () {
				var todolistId = this.props.todolist.id;
				this.props.model.destroyTodolist(todolistId);
			},

			toggle: function (todoToToggle) {
				var todolist = this.props.todolist;
				this.props.model.toggle(todolist,todoToToggle);
			},

			showAll: function () {
				this.setState({nowShowing:app.ALL_TODOS});
			},

			showActive: function () {
				this.setState({nowShowing:app.ACTIVE_TODOS});
			},
			
			showCompleted: function () {
				this.setState({nowShowing:app.COMPLETED_TODOS});
			},

			edit: function (todo) {

			},
			
			render: function () {
				var todolist = this.props.todolist;
				var TodoItem = app.TodoItem;
				var main;
				var footer;
				var TodoFooter = app.TodoFooter;

				var showTodos = todolist.todos.filter(function(todo){
					switch (this.state.nowShowing) {
						case app.ACTIVE_TODOS:
							return !todo.completed;
						case app.COMPLETED_TODOS:
							return todo.completed;
						default:
							return true;
					}
				}, this);

				var todoItems = showTodos.map(function (todo) {
					return (
						<TodoItem 
							todo={todo}
							onToggle={this.toggle.bind(this, todo)}
							onEdit={this.edit.bind(this,todo)}
						/>
						);
				}, this);


				if(todolist.todos.length > 0){
					main = (
						<section className="main">
							<ul className="todo-list">
								{todoItems}
							</ul>
							
						</section>
						);
				}

                var activeTodoCount = todolist.todos.reduce(function(accum,todo){
                	return todo.completed ? accum : accum+1;
                },0);

                var completedTodoCount = todolist.todos.length - activeTodoCount;

                if(activeTodoCount || completedTodoCount) {
					footer = (
						<TodoFooter
							nowShowing={this.state.nowShowing}
							showAll={this.showAll}
							showActive={this.showActive}
							showCompleted={this.showCompleted}
							count={activeTodoCount}
					    	completedCount={completedTodoCount}
						/>
					);
				}

				return (
					<section className="add_margin">
						<header className="header">
							<label>{todolist.name}</label>
							<span   className="delete"
									onClick={this.destroyTodolist}>删除</span>
							<input  className="new-todo"
								    placeholder="add your new todo ..."
								    value={this.state.newTodo}
								    onChange={this.handleTodoChange}
								    onKeyDown={this.addTodo}
							 /> 
						 </header>
						 {main}
						 {footer}
					</section>
					);
			}


	});



	})()