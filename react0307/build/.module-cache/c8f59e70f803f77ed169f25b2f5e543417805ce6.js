var app = app || {};
(function(){
'use strict';

app.TodoItem = React.createClass({displayName: "TodoItem",
	render: function () {
		return (
			React.createElement("li", null, todo.title)
			);
	}
});

})()
