/*global Vue, todoStorage */

(function (exports) {

	'use strict';


    var STORAGE_KEY = 'todos-vuejs';

	var todoStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (todos) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	};

	// var a = require('./routes.js')
   var myComponent = require('../components/my-component.vue');

	exports.app = new Vue({

		// the root element that will be compiled
		el: '.moreList',

        components:{
        	'my-component': myComponent
        },

        computed: {

        	todoList:function(){
        		return  todoStorage.fetch;   		
            }
			
		},

		methods:{
			addTodoList: function(){
				//将数据存到localStorage

			}
		},

       // watch todos change for localStorage persistence
		watch: function(){
			return {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		}
		}

       
		
	});

})(window);
