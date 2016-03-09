var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	render: function () {
		return (
				React.createElement("li", null, 
					React.createElement("div", {className: "view"}, 
						React.createElement("input", {type: "checkbox", 
							   className: "toggle", 
							   check: this.props.todo.completed, 
							   onChange: this.props.onToggle}
					     ), 
						React.createElement("label", null, this.props.todo.title)
					)
				)
			);
	}
});

})()
