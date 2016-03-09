/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({displayName: "TodoFooter",
		render: function () {

			var nowShowing = this.props.nowShowing;
			return (
				React.createElement("footer", {className: "footer"}, 
					
					React.createElement("ul", {className: "filters"}, 
						React.createElement("li", null, 
							React.createElement("a", {href: "#/"}, 
									"All"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {href: "#/active"}, 
									"Active"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {href: "#/completed"}, 
									"Completed"
							)
						)
					)
				)
			);
		}
	});
})();
