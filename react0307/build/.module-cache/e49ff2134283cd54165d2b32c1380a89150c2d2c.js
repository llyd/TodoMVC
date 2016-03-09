var app = app || {};
(function () {

	'use strict';

	var appModel = app.TodoModel;
	var todoapp = app.TodoApp;
	var ENTER_KEY = 13;
	var Todolists = React.createClass({displayName: "Todolists",

		getInitialState: function(){
			return {
				newName : ''
			};
		},

		addNewList: function(event){
			if(event.keyCode != ENTER_KEY) {
				return;
			}
			event.preventDefault();
			var val = this.refs.name.value.trim();
			if(val) {
				this.props.model.addTodoName(val);
				this.refs.name.value='';
			}

		},
		render: function(){
			var Todoapp = todoapp.Todoapp;
			var showTodoList = this.props.model.todoLists;
			var todoLists = showTodoList.map(function (todolist) {
				return (
					React.createElement(Todoapp, {todolist: todolist}
					)
					)
			})

			return (
				React.createElement("div", null, 
					React.createElement("input", {placeholder: "Your todoapp name ...", 
							className: "new-todo", 
							autoFocus: true, 
							type: "text", 
							onKeyDown: this.addNewList, 
							value: this.state.newName, 
							ref: "name"}
					), 
					todoLists
				)
				);
		}
	});

	var model = new appModel.TodoModel("react-todo-new");

	function render() {
		ReactDOM.render(
			// <Todolists model={model} />,
			React.createElement("p", null, "asdfg "),
			document.getElementsByClassName('todoapp')[0]);
	}

    model.subscribe(render);
	// render();

	ReactDOM.render(
		// <Todolists model={model} />,
		React.createElement("p", null, "asdfg "),
		document.getElementById('asd')
	);
	console.log('todolist,,,')
})()

