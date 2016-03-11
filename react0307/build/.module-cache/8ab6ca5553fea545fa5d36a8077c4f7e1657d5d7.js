var app = app || {};
(function(){
'use strict';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

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
						edit : 'editShow',
						view : 'hidden'});
	},

	handleChange: function (event) {
		this.setState({editText : event.target.value});
	},

	handleSubmit: function (event) {
		var val = this.state.editText.trim();
		if(val) {
			this.setState({editText: val,
						edit : 'edit',
						view : 'view'});
			this.props.onSave(val);
		} else {
			this.props.onDestroy();
		}
	},

	handleKeyDown: function (event) {
		if(event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.todo.title,
							edit : 'edit',
							view : 'view'});
		}
		else if(event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}

	},

	render: function () {
		var cx = React.addons.classSet;
			var cheackClass = cx({
			'completedLabel':this.props.todo.completed
			});

		//var cheackClass = this.props.todo.completed ? 'completedLabel':'UnCompletedLabel';
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
						   onBlur: this.handleSubmit, 
						   onKeyDown: this.handleKeyDown}
				     )
				)
			);
	}
});

})()
