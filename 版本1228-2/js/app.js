/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template,name);
		this.controller = new app.Controller(this.model, this.view);
	}

			 var newList
        ='<section id="{{id}}" class="todoapp">'
        +   '<header class="header">'
        +	    '<li class = "todo_name"><div class="view"><label>{{todo_name}}</label></div></li>'			
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
		+				'<a href="{{#/}}" class="selected">All</a>'
		+			'</li>'
		+			'<li>'
		+				'<a href="{{#/active}}">Active</a>'
		+			'</li>'
		+			'<li>'
		+				'<a href="{{#/completed}}">Completed</a>'
		+			'</li>';
		
		var li_more = '<li>'
		+				'<a href="{{href}}">{{tag}}</a>'
		+			 '</li>';

		var end = 	'</ul>'
		+		'<buton class="clear-completed">Clear completed</button>'
		+	'</footer>'
		+'</section>';	
		//先把所有的列表显示出来
		var todo_arr = JSON.parse(localStorage.getItem("title_arr"));
		var more_list = qs('.moreList').innerHTML;
    	for(var i=0;i<todo_arr.length;i++){
    		
    		var newList_temp = newList;
        	var todo = JSON.parse(localStorage.getItem(todo_arr[i]));
    		newList_temp = newList_temp.replace('{{id}}',todo_arr[i]);
    		newList_temp = newList_temp.replace('{{todo_name}}',todo.name);   		
    		newList_temp = newList_temp.replace('{{#/}}','#' + todo_arr[i] + '/');
    		newList_temp = newList_temp.replace('{{#/active}}', '#' + todo_arr[i]+ '/' + 'active');
    		newList_temp = newList_temp.replace('{{#/completed}}', '#' + todo_arr[i]+ '/' + 'completed');
    	          
            var lis = '';
            for(var j=0;j<todo.tags.length;j++){
            	var li_new = li_more;
            	li_new = li_new.replace('{{href}}','#' + todo_arr[i] + '/' + todo.tags[j]);
            	li_new = li_new.replace('{{tag}}', todo.tags[j]);
            	lis = lis + li_new;
            }
             more_list = newList_temp + lis + end + more_list;
        }
        qs('.moreList').innerHTML = more_list;

	
	function setView() {
		var todo_arrs = JSON.parse(localStorage.getItem("title_arr"));
		for(var j=0;j<todo_arrs.length;j++){
			var aa = todo_arrs[j];
			var todo = new Todo(todo_arrs[j]);
            var locationHash = document.location.hash;
			var route = locationHash.split('/')[1];
		    var todoid = locationHash.split('/')[0].substr(1);		  
		    var todo_id = todoid || '';
		    if(todo_id == todo_arrs[j]){
		    	todo.controller.setView(todo_arrs[j],route);
		    }
		    else{
		    	var page = '';
		    	todo.controller.setView(todo_arrs[j],page);
		    }		   
		}		
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);

    //可移入控制器，进行事件绑定
	$on(qs('.circle'), 'click', function () {
		        var more_list = qs('.moreList').innerHTML;
		        var newList_add = newList;

				var title_arr2 = JSON.parse(localStorage.getItem("title_arr"));	
				var title2 = "todo"+title_arr2.length;
				title_arr2[title_arr2.length] = title2;	
		    	localStorage.setItem("title_arr",JSON.stringify(title_arr2));//讲todo_id存入本地

		        newList_add = newList_add.replace('{{id}}',title2);
		       	newList_add = newList_add.replace('{{todo_name}}',title2);   
		        newList_add = newList_add.replace('{{#/}}','#' + title2 + '/');
    		    newList_add = newList_add.replace('{{#/active}}', '#' + title2 + '/' + 'active');
    		    newList_add = newList_add.replace('{{#/completed}}', '#' + title2 + '/' + 'completed');

		    	qs('.moreList').innerHTML = newList_add + end + more_list;		

		    	var todo = new Todo(title2);
		    	todo.controller.setView(title2,"");
			});

})();
