var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	getInitialState: function () {
		return {
			editText: this.props.todo.title
		}
	},

	handleEdit: function () {
		//this.props.onEdit();
		this.setState({editText: this.props.todo.title});
	},

	handleChange: function (event) {
		this.setState({editText : event.target.value});
	},

	submitEdit: function () {

	},

	handleKeyDown: function () {

	},

	render: function () {
		var cheackClass = this.props.todo.completed ? 'completedLabel':'UnCompletedLabel';
		return (
				React.createElement("li", null, 
					
					React.createElement("input", {ref: "editField", 
						   className: "edit", 
						   value: this.state.editText, 
						   onChange: this.handleChange, 
						   onBlur: this.submitEdit, 
						   onKeyDown: this.handleKeyDown}
				     )
				)
			);
	}
});

})()
