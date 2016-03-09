var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	render: function () {
		var cheackClass = this.props.todo.completed ? 'completedLabel':'UnCompletedLabel';
		return (
				React.createElement("li", null, 
					React.createElement("div", {className: "view"}, 
						React.createElement("input", {type: "checkbox", 
							   className: "toggle", 
							   check: this.props.todo.completed, 
							   onChange: this.props.onToggle}
					     ), 
						React.createElement("label", {className: cheackClass}, this.props.todo.title)	
					)
				)
			);
	}
});

})()
