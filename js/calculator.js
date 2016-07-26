(function() {
	'use strict';
	var NUMBERS = [1,2,3,4,5,6,7,8,9,0];
	var OPERATORS = ['+', '-', '*', '/', '(', ')', '^', '='];
	var tpls = {
		numBtn: '<button class="btn btn-lg number" data-elem-number="{{number}}">{{number}}</button>',
		operatorBtn: '<button class="btn btn-lg operator" data-elem-number="{{operator}}">{{operator}}</button>'
	};
	// 渲染数字按钮
	var renderNum = function() {
		var btnPanel = $('[data-elem="numBtns"]');
		btnPanel.empty();
		for(var i=0;i<NUMBERS.length;i++) {
			var tpl = tpls.numBtn.replace(/{{number}}/g, String(NUMBERS[i]));
			btnPanel.append($(tpl));
		}
	};
	// 渲染操作符按钮
	var renderOperator = function() {
		var btnPanel = $('[data-elem="operatorBtns"]');
		btnPanel.empty();
		for(var i=0;i<OPERATORS.length;i++) {
			var tpl = tpls.operatorBtn.replace(/{{operator}}/g, String(OPERATORS[i]));
			btnPanel.append($(tpl));
		}
	};
	// 委托按钮事件
	var bindEvents = function() {
		// 按钮
		$(document).delegate('[data-elem-number]', 'click', function(e) {
			e.preventDefault();
			var elem = $(this);
			var inputArea = $('[data-elem="inputArea"]');
			var resultArea = $('[data-elem="resultArea"]');
			var number = elem.attr('data-elem-number') || '';
			var operator = elem.attr('data-elem-operator') || '';
			var inputVal = number || operator || '';
			if(inputVal && inputVal !== '=') {
				var content = inputArea.text();
				content += inputVal;
				inputArea.text(content);
			}
			var curExp = inputArea.text() || '';
			if(inputVal === '=' && curExp) {
				var result = 'ERROR';
				try {
					result = math.eval(curExp);
					resultArea.text(result);
					inputArea.text('');
				}
				catch(exception) {
					console.log(exception);
				}
			}
		});
	};
	var _init = function() {
		renderNum();
		renderOperator();
		bindEvents();
	}
	_init();
})()