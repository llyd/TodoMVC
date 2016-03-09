var app = app || {};
(function () {
	'use strict';
	var appModel = app.TodoModel;
	
	var ENTER_KEY = 13;
	var Todolists = React.createClass({

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
			var val = this.state.newName.trim();
			if(val) {
				this.props.model.addTodoName(val);
				this.setState({newName: ''});
			}

		},

		handleNameChange: function (event) {
			this.setState({newName: event.target.value});
		},

		render: function(){
			var Todoapp = app.Todoapp;
			var showTodoList = this.props.model.todoLists;
			var todoLists = showTodoList.map(function (todolist) {
				return (
					<Todoapp todolist={todolist}
								model={model}
					/>
					)
			})

			return (
				<div>
					<input  placeholder="Your todoapp name ..."
							className="new-todo"
							autoFocus={true}
							type="text"
							onKeyDown={this.addNewList}
							value={this.state.newName}
							onChange={this.handleNameChange}
					/>
					{todoLists}
				</div>
				);
		}
	});

	var model = new app.TodoModel("react-todo-new");

	function render() {
		ReactDOM.render(
			<Todolists model={model} />,
			document.getElementsByClassName('todoapp')[0]);
	}

    // model.subscribe(render);
	render();



})()

