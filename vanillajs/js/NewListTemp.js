/*jshint laxbreak:true */
(function (window) {
	'use strict';

	var htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	var escapeHtmlChar = function (chr) {
		return htmlEscapes[chr];
	};

	var reUnescapedHtml = /[&<>"'`]/g;
	var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	var escape = function (string) {
		return (string && reHasUnescapedHtml.test(string))
			? string.replace(reUnescapedHtml, escapeHtmlChar)
			: string;
	};

	/**
	 * Sets up defaults for all the Template methods such as a default template
	 *
	 * @constructor
	 */

	function NewListTemp() {
		this.newListDefaultTemplate
        ='<section class="todoapp" data-id="{{id}}">'
		+	'<header class="header">'						
		+		'<input class="new-todo" id="{{new-todo}}" placeholder="What needs to be done?" autofocus>'
		+	'</header>'
		+	'<section class="main" id="{{main}}">'
		+		'<input class="toggle-all" id="{{toggle-all}}" type="checkbox">'
		+		'<label for="toggle-all">Mark all as complete</label>'
		+	'<ul class="todo-list" id="{{todo-list}}"></ul>'
		+	'</section>'
		+	'<footer class="footer" id="{{footer}}">'
		+		'<span class="todo-count" id="{{todo-count}}"></span>'
		+		'<ul class="filters" id="{{filters}}">'
		+			'<li>'
		+				'<a href="#/" class="selected">All</a>'
		+			'</li>'
		+			'<li>'
		+				'<a href="#/active">Active</a>'
		+			'</li>'
		+			'<li>'
		+				'<a href="#/completed">Completed</a>'
		+			'</li>'
		+		'</ul>'
		+		'<button class="clear-completed" id="{{clear-completed}}">Clear completed</button>'
		+	'</footer>'
		+'</section>';
	}
	
	/**
	 * Creates an <li> HTML string and returns it for placement in your app.
	 *
	 * NOTE: In real life you should be using a templating engine such as Mustache
	 * or Handlebars, however, this is a vanilla JS example.
	 *
	 * @param {object} data The object containing keys you want to find in the
	 *                      template to replace.
	 * @returns {string} HTML String of an <li> element
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	NewListTemp.prototype.showAllList = function () {
		 var title_store= JSON.parse(localStorage.getItem('title_arr'));  
         var todoView="";
         for(var i=0;i<title_store.length;i++){    
            var temp = this.newListDefaultTemplate;
            temp = temp.replace('{{id}}', title_store[i]);
            temp = temp.replace('{{new-todo}}', "new-todo"+i);
            temp = temp.replace('{{main}}', "main"+i);
            temp = temp.replace('{{toggle-all}}', "toggle-all"+i);
            temp = temp.replace('{{todo-list}}', "todo-list"+i);
            temp = temp.replace('{footer}}', "footer"+i);
            temp = temp.replace('{{todo-count}}', "todo-count"+i);
            temp = temp.replace('{{clear-completed}}', "clear-completed"+i);
            temp = temp.replace('{{filters}}', "filters"+i);
            todoView=todoView+temp;
        }		
		return todoView;
	};
	

	// Export to window
	window.app = window.app || {};
	window.app.NewListTemp= NewListTemp;
})(window);
