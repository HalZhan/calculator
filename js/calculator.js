(function() {
    'use strict';
    var NUMBERS = [
        { title: '1', value: 1 },
        { title: '2', value: 2 },
        { title: '3', value: 3 },
        { title: '4', value: 4 },
        { title: '5', value: 5 },
        { title: '6', value: 6 },
        { title: '7', value: 7 },
        { title: '8', value: 8 },
        { title: '9', value: 9 },
        { title: '0', value: 0 }
    ];
    var OPERATORS = [
        { title: '+', value: '+' },
        { title: '-', value: '-' },
        { title: '×', value: '*' },
        { title: '÷', value: '/' },
        { title: '(', value: '(' },
        { title: ')', value: ')' },
        { title: '^', value: '^' },
        { title: '=', value: '=' }
    ];
    var tpls = {
        numBtn: '<span class="btn btn-lg number" data-btn-code="{{value}}">{{title}}</span>',
        operatorBtn: '<span class="btn btn-lg operator" data-btn-code="{{value}}">{{title}}</span>'
    };
    // 渲染数字按钮
    var renderNum = function() {
        var btnPanel = $('[data-elem="numBtns"]');
        btnPanel.empty();
        for (var i = 0; i < NUMBERS.length; i++) {
            var title = NUMBERS[i].title;
            var value = NUMBERS[i].value;
            var tpl = tpls.numBtn.replace(/{{title}}/g, title);
            tpl = tpl.replace(/{{value}}/g, value);
            btnPanel.append($(tpl));
        }
    };
    // 渲染操作符按钮
    var renderOperator = function() {
        var btnPanel = $('[data-elem="operatorBtns"]');
        btnPanel.empty();
        for (var i = 0; i < OPERATORS.length; i++) {
            var title = OPERATORS[i].title;
            var value = OPERATORS[i].value;
            var tpl = tpls.operatorBtn.replace(/{{title}}/g, title);
            tpl = tpl.replace(/{{value}}/g, value);
            btnPanel.append($(tpl));
        }
    };
    // 求解
    var _doCalc = function() {
        var inputArea = $('[data-elem="inputArea"]');
        var resultArea = $('[data-elem="resultArea"]');
        var curExp = inputArea.text() || '';
        if (curExp) {
            try {
                var result = math.eval(curExp);
                inputArea.text('');
                resultArea.text(result);
            } catch (exception) {
                console.log(exception);
            }
        }
    };
    // 普通输入
    var _doInput = function(content) {
    	if(content) {
    		var inputArea = $('[data-elem="inputArea"]');
    		var curCon = inputArea.text();
    		curCon += content;
    		inputArea.text(curCon);
    	}
    }
    // 退格
    var _doBack = function() {
    	var inputArea = $('[data-elem="inputArea"]');
		var curCon = inputArea.text();
		if(curCon) {
			curCon = curCon.slice(0, -1);
			inputArea.text(curCon);
		}
    };
    // 清空
    var _doClean = function() {
    	var inputArea = $('[data-elem="inputArea"]');
    	inputArea.text('');
    };
    // 委托按钮事件
    var bindEvents = function() {
        // 按钮
        $(document).delegate('[data-btn-code]', 'click', function(e) {
            e.preventDefault();
            var elem = $(this);
            var inputArea = $('[data-elem="inputArea"]');
            var resultArea = $('[data-elem="resultArea"]');
            var inputVal = elem.attr('data-btn-code') || '';
            if (inputVal) {
                switch (inputVal) {
                    case '=':
                        _doCalc();
                        break;
                    case 'backspace':
                    	_doBack();
                    	break;
                    case 'clean':
                    	_doClean();
                    	break;
                    default: _doInput(inputVal);
                }
            }
        });
    };
    var _init = function() {
        // renderNum();
        // renderOperator();
        bindEvents();
    }
    _init();
})()
