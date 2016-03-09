var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	getInitialState: function () {
		return {
			editText: this.props.todo.title,
			edit:'edit'
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
					React.createElement("div", {className: "view"}, 
						React.createElement("input", {type: "checkbox", 
							   className: "toggle", 
							   checked: this.props.todo.completed, 
							   onChange: this.props.onToggle}
					     ), 
						React.createElement("label", {className: cheackClass, 
							   onDoubleClick: this.handleEdit}, 
							this.props.todo.title
						), 	
						React.createElement("button", {className: "destroy"})
					), 
					React.createElement("input", {ref: "editField", 
						   className: this.state.edit, 
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
