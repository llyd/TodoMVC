var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	getInitialState: function () {
		return {
			editText: this.props.todo.title,
			edit:'edit',
			view:'view'
		}
	},

	handleEdit: function () {
		//this.props.onEdit();//提交id
		this.setState({editText : this.props.todo.title,
						edit : 'edit editShow',
						view : 'hidden'});
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
					React.createElement("div", {className: this.state.view}, 
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
