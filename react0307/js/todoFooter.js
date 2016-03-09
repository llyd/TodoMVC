/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {

			var nowShowing = this.props.nowShowing;
			var count = this.props.count;
			var completedCount = this.props.completedCount;
			var activeTodoWord = count === 1 ? 'item' : 'items';
			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a href="#/"
							   onClick={this.props.showAll}>
									All
							</a>
						</li>
						{' '}
						<li>
							<a href="#/active"
							   onClick={this.props.showActive}>
									Active
							</a>
						</li>
						{' '}
						<li>
							<a href="#/completed"
							   onClick={this.props.showCompleted}>							
									Completed
							</a>
						</li>
					</ul>
				</footer>
			);
		}
	});
})();
