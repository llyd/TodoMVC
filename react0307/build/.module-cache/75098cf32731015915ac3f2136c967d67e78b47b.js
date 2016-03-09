var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("li", null, this.props.todo.title), 
				React.createElement("span", null, "删除")
			)
			);
	}
});

})()
