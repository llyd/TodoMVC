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
							React.createElement("a", {
								href: "#/", 
								className: classNames({selected: nowShowing === app.ALL_TODOS})}, 
									"All"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/active", 
								className: classNames({selected: nowShowing === app.ACTIVE_TODOS})}, 
									"Active"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/completed", 
								className: classNames({selected: nowShowing === app.COMPLETED_TODOS})}, 
									"Completed"
							)
						)
					)
				)
			);
		}
	});
})();
