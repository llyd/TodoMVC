/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	// function Todo(name) {
	// 	this.storage = new app.Store(name);
	// 	this.model = new app.Model(this.storage);
	// 	this.template = new app.Template();
	// 	this.NewListTemp = new app.NewListTemp();
	// 	this.view = new app.View(this.template);
	// 	this.controller = new app.Controller(this.model, this.view);
	// }
  
var newList
        ='<section data-id="{{id}}" class="todoapp">'
        +'<header class="header">'						
		+		'<input class="new-todo" placeholder="What needs to be done?" autofocus>'
		+	'</header>'
		+	'<section class="main">'
		+		'<input class="toggle-all" type="checkbox">'
		+		'<label for="toggle-all">Mark all as complete</label>'
		+	'<ul class="todo-list"></ul>'
		+	'</section>'
		+	'<footer class="footer">'
		+		'<span class="todo-count"></span>'
		+		'<ul class="filters">'
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
		+		'<buton class="clear-completed">Clear completed</button>'
		+	'</footer>'
		+'</section>';	
		
//     var title_arr1 = new Array();
// 	title_arr1[0] = "todo0";
// 	localStorage.setItem('title_arr',JSON.stringify(title_arr1));
//     var title_store= JSON.parse(localStorage.getItem('title_arr'));  
//     var todoView="";
//     for(var i=0;i<title_store.length;i++){    
//             var temp = newList;
//             temp = temp.replace('{{id}}', title_store[i]);
//             todoView=todoView+temp;
//       	    var title = title_store[i];             	
//             var todo = new Todo(title); 
//       }
//     var sec = document.createElement('section');
//     sec.innerHTML = todoView;
//     document.getElementById('main').insertBefore(sec,document.getElementById('add'));
//      document.getElementById('main').insertBefore(sec,document.getElementById('add'));
 // var todo = new Todo('test1'); 
	$on(qs('.circle'), 'click', function () {
		        var more_list = qs('.moreList').innerHTML;
		        var temp_add = newList;
				var title_arr2 = JSON.parse(localStorage.getItem("title_arr"));	
				var title2 = "todo"+title_arr2.length;
				title_arr2[title_arr2.length] = title2;	
		    	localStorage.setItem("title_arr",JSON.stringify(title_arr2));
		        temp_add = temp_add.replace('{{id}}',title2);
		    	more_list = more_list+temp_add;			
                // var todo = new Todo(title2);
			});
	// function setView() {
	// 	todo.controller.setView(document.location.hash);
	// }
	// window.addEventListener('load',setView);
	// window.addEventListener('hashchange',setView);
})();
