var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("li", null, this.props.todo.title), 
				React.createElement("span", {className: "destroy"}, "删除")
			)
			);
	}
});

})()
