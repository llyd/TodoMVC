(function (window) {
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('newTodo', function (title) {
			self.addItem(title);
		});

		self.view.bind('itemEdit', function (item) {
			self.editItem(item.id);
		});

		self.view.bind('itemEditDone', function (item) {//////////
			self.editItemSave(item.id, item.title);
		});

		self.view.bind('itemEditCancel', function (item) {
			self.editItemCancel(item.id);
		});

        self.view.bind('titleEdit', function (item) {//修改 
			self.editTitle(item.id);//id为todo的id

		});

		self.view.bind('titleEditDone', function (item) {//修改 传入的变量名要修改？？可否不传，直接让view从app获取
			self.editTitleSave(item.id, item.title);//todo扥id和修改后的界面上获取标题的内容
		});

		self.view.bind('titleEditCancel', function (item) {//修改 传入的变量名要修改？？可否不传，直接让view从app获取
			self.editTitleCancel(item.id);//todo的id
		});

		self.view.bind('itemRemove', function (item) {
			self.removeItem(item.id);
		});

        self.view.bind('todoRemove', function (todo) {
			self.removeTodo(todo.id);                   //todo的id
		});
		self.view.bind('itemToggle', function (item) {
			self.toggleComplete(item.id, item.completed);
		});

		self.view.bind('removeCompleted', function () {
			self.removeCompletedItems();
		});

		self.view.bind('toggleAll', function (status) {
			self.toggleAll(status.completed);
		});
	}


Controller.prototype.setView = function (todo_id,route) {		
		this._updateFilterState(todo_id,route);
	};
	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	Controller.prototype.showAll = function () {
		var self = this;
		self.model.read(function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Renders all active tasks
	 */
	Controller.prototype.showActive = function () {
		var self = this;
		self.model.read({ completed: false }, function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Renders all completed tasks
	 */
	Controller.prototype.showCompleted = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			self.view.render('showEntries', data);
		});
	};

    Controller.prototype.showRoute = function (nowRoute) {
		var self = this;
		self.model.read(nowRoute, function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function () {
			self.view.render('clearNewTodo');
			self._filter(true);
		});
	};

	/*
	 * Triggers the title editing mode.
	 */
	Controller.prototype.editTitle = function (id) {
		var self = this;
		self.model.readTitle(id, function (data) {
			self.view.render('editTitle', {id: id, title: data});
		});
	};

	/*
	 * Finishes the title editing mode successfully.
	 */
	Controller.prototype.editTitleSave = function (id, title) {
		var self = this;
		title = title.trim();
		self.model.updateTitle(id, {title: title}, function () {
			self.view.render('editTitleDone', {id: id, title: title});
		});
	};

	/*
	 * Cancels the title editing mode.
	 */
	Controller.prototype.editTitleCancel = function (id) {
		var self = this;
		self.model.readTitle(id, function (data) {
			self.view.render('editTitleDone', {id: id, title: data});
		});
	};

	/*
	 * Triggers the item editing mode.
	 */
	Controller.prototype.editItem = function (id) {
		var self = this;
		self.model.read(id, function (data) {
			self.view.render('editItem', {id: id, title: data[0].title});
		});
	};

	/*
	 * Finishes the item editing mode successfully.
	 */
	Controller.prototype.editItemSave = function (id, title) {
		var self = this;
		title = title.trim();

		if (title.length !== 0) {
			self.model.update(id, {title: title}, function () {
				self.view.render('editItemDone', {id: id, title: title});
			});
		} else {
			self.removeItem(id);
		}
	};

	/*
	 * Cancels the item editing mode.
	 */
	Controller.prototype.editItemCancel = function (id) {
		var self = this;
		self.model.read(id, function (data) {
			self.view.render('editItemDone', {id: id, title: data[0].title});
		});
	};

	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and
	 * storage
	 */
	Controller.prototype.removeItem = function (id) {
		var self = this;
		self.model.remove(id, function () {
			self.view.render('removeItem', id);
		});

		self._filter();
	};

    Controller.prototype.removeTodo= function (id) {
		var self = this;
		self.model.removeTodo(id, function () {
			self.view.render('removeTodo', id);
		});

		self._filter();
	};
	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	Controller.prototype.removeCompletedItems = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			data.forEach(function (item) {
				self.removeItem(item.id);
			});
		});

		self._filter();
	};

	/**
	 * Give it an ID of a model and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} checkbox The checkbox to check the state of complete
	 *                          or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	Controller.prototype.toggleComplete = function (id, completed, silent) {
		var self = this;
		self.model.update(id, { completed: completed }, function () {
			self.view.render('elementComplete', {
				id: id,
				completed: completed
			});
		});

		if (!silent) {
			self._filter();
		}
	};

	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of models.
	 * Just pass in the event object.
	 */
	Controller.prototype.toggleAll = function (completed) {
		var self = this;
		self.model.read({ completed: !completed }, function (data) {
			data.forEach(function (item) {
				self.toggleComplete(item.id, completed, true);
			});
		});

		self._filter();
	};

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	Controller.prototype._updateCount = function () {
		var self = this;
		self.model.getCount(function (todos) {
			self.view.render('updateElementCount', todos.active);
			self.view.render('clearCompletedButton', {
				completed: todos.completed,
				visible: todos.completed > 0
			});

			self.view.render('toggleAll', {checked: todos.completed === todos.total});
			self.view.render('contentBlockVisibility', {visible: todos.total > 0});
		});
	};

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	Controller.prototype._filter = function () {
		var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);//;首字母大写

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed](); 
		// if (this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
		// 	this['show' + activeRoute]();
		// }
		if(activeRoute == "All" || activeRoute == "Active" || activeRoute == "Completed"){
			 this['show' + activeRoute]();
		}
		else{
			activeRoute = this._activeRoute;
			this.showRoute(activeRoute);
		}
       
		this._lastActiveRoute = activeRoute;
	};

	/**
	 * Simply updates the filter nav's selected states
	 */
	Controller.prototype._updateFilterState = function (todo_id,currentPage) {
		// Store a reference to the active route, allowing us to re-filter todo
		// items as they are marked complete or incomplete.
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this._filter();//参数可删除

		this.view.render('setFilter', currentPage);//todo_id?
	};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
