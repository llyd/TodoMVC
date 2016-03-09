/*jshint eqeqeq:false */
(function (window) {
	'use strict';

	/**
	 * Creates a new client side storage object and will create an empty
	 * collection if no collection already exists.
	 *
	 * @param {string} name The name of our DB we want to use
	 * @param {function} callback Our fake DB uses callbacks because in
	 * real life you probably would be making AJAX calls
	 */
	function Store(name, callback) {
		callback = callback || function () {};

		this._dbName = name;

		if (!localStorage[name]) {
			var data = {
				todos: [],
				name: name,
				tags: [],
				id: name	
			};

			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	}

	/**
	 * Finds items based on a query given as a JS object
	 *
	 * @param {object} query The query to match against (i.e. {foo: 'bar'})
	 * @param {function} callback	 The callback to fire when the query has
	 * completed running
	 *
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // data will return any items that have foo: bar and
	 *	 // hello: world in their properties
	 * });
	 */
	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(this, todos.filter(function (todo) {//todo指的是todos内的元素
			for (var q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
	};

    Store.prototype.findRoute = function (query, callback) {//query是tag的名称
		if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(this, todos.filter(function (todo) {//todo指的是todos内的元素
			var num = 0;
			for(var i= 0; i<todo.tags.length;i++){
				if(todo.tags[i] == query){//存在一个tag和要查询的tag相同，则返回这个todo
					num++;
				}
			}
			if(num > 0){
				return true;
			}	
			return false;	

		}));
	};


	Store.prototype.findTitle = function (query, callback) {
		if (!callback) {
			return;
		}
		var todo_name = JSON.parse(localStorage[this._dbName]).name;
		callback.call(this, todo_name);
	};

	/**
	 * Will retrieve all data from the collection
	 *
	 * @param {function} callback The callback to fire upon retrieving data
	 */
	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

	/**
	 * Will save the given data to the DB. If no item exists it will create a new
	 * item, otherwise it'll simply update an existing item's properties
	 *
	 * @param {object} updateData The data to save back into the DB
	 * @param {function} callback The callback to fire after saving
	 * @param {number} id An optional param to enter an ID of an item to update
	 */
	Store.prototype.save = function (updateData, callback, id) { //{title:title}
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];										                                                                                                      
					}
					break;
				}
			}

        // var tag_arr = updateData['title'].split('#').slice(1);   
		// for(var a=0;a<tag_arr.length;a++){
		//     data.tags.push(tag_arr[a]); //tag加入todo        
		// }

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
		} else {
			// Generate an ID
			updateData.id = new Date().getTime();
            var tag_arr = updateData['title'].split('#').slice(1); 
            updateData.tags = tag_arr;//true
            for(var a=0;a<tag_arr.length;a++){
            		var tag_num = 0;
						for(var num = 0; num<data.tags.length; num++){
							if(data.tags[num] == tag_arr[a]){
								tag_num++;
							}
						}
						if(tag_num <= 0){
						 data.tags.push(tag_arr[a]);//true
					}          	
            }
			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};

//id, {title: title}, function 
    Store.prototype.saveTitle = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[id]);
		data.name = updateData.title;
		callback = callback || function () {};
        localStorage[id] = JSON.stringify(data);
        callback.call(this, JSON.parse(localStorage[id]).name);
	};

	/**
	 * Will remove an item from the Store based on its ID
	 *
	 * @param {number} id The ID of the item you want to remove
	 * @param {function} callback The callback to fire after saving
	 */
	Store.prototype.remove = function (id, callback) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);
				break;
			}
		}

		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};
//从本地存储中删除
	Store.prototype.removeTodo = function (id, callback) {
		localStorage.removeItem(id);
	    var data = JSON.parse(localStorage["title_arr"]);

		for (var i = 0; i < data.length; i++) {
			if (data[i] == id) {
				data.splice(i, 1);
				break;
			}
		}

		localStorage["title_arr"] = JSON.stringify(data);
		callback.call(this, localStorage["title_arr"]);
	};

	/**
	 * Will drop all storage and start fresh
	 *
	 * @param {function} callback The callback to fire after dropping the data
	 */
	Store.prototype.drop = function (callback) {
		localStorage[this._dbName] = JSON.stringify({todos: []});
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
