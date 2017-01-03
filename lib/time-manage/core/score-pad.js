"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScorePad = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _qiliApp = require("qili-app");

var _colors = require("material-ui/styles/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextFieldx = _qiliApp.UI.TextFieldx;
var ScorePad = exports.ScorePad = function ScorePad(_ref, _ref2) {
	var todo = _ref.todo,
	    _ref$goal = _ref.goal,
	    goal = _ref$goal === undefined ? 0 : _ref$goal,
	    _ref$totalPerScreen = _ref.totalPerScreen,
	    totalPerScreen = _ref$totalPerScreen === undefined ? goal : _ref$totalPerScreen,
	    _ref$score = _ref.score,
	    score = _ref$score === undefined ? 0 : _ref$score,
	    AppBar = _ref.AppBar;
	var muiTheme = _ref2.muiTheme,
	    _ref2$width = _ref2.width,
	    width = _ref2$width === undefined ? muiTheme.page.width : _ref2$width,
	    _ref2$height = _ref2.height,
	    height = _ref2$height === undefined ? muiTheme.page.height - muiTheme.appBar.height - muiTheme.footbar.height : _ref2$height;

	if (totalPerScreen == score) {
		width = width / 2;
		height = height / 2;
	} else {
		width = width * 7 / 8;
		height = height * 7 / 8;
	}
	var less = Math.min(width, height),
	    more = Math.max(width, height);
	var widthLess = Math.floor(Math.sqrt(Math.floor(less * less / totalPerScreen)));
	var widthMore = Math.floor(Math.sqrt(Math.floor(more * more / totalPerScreen)));
	var style = {};
	if (less == width) {
		style.width = widthLess;
		style.height = widthMore;
	} else {
		style.width = widthMore;
		style.height = widthLess;
	}

	var smiles = [];
	for (var i = 0; i < totalPerScreen; i++) {
		smiles.push(_react2.default.createElement(
			"span",
			{ key: i, style: { display: "inline-block" } },
			_react2.default.createElement(Smile, { style: style, scored: i < score })
		));
	}var title = todo,
	    action = null;
	if (goal == 0) {
		title = "开始第一个目标";
		action = _react2.default.createElement(Editor, null);
	} else if (goal <= score) {
		title = "开始下一个目标";
		action = _react2.default.createElement(Editor, { lastScore: score });
	} else title = todo;

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(AppBar, { title: title }),
		action,
		_react2.default.createElement(
			"div",
			null,
			smiles
		)
	);
};

ScorePad.contextTypes = {
	muiTheme: _react.PropTypes.object,
	AppBar: _react.PropTypes.element,
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};

var Smile = function Smile(_ref3) {
	var scored = _ref3.scored,
	    others = _objectWithoutProperties(_ref3, ["scored"]);

	return _react2.default.createElement(_mood2.default, _extends({
		color: scored ? _colors.yellow500 : _colors.grey300
	}, others));
};

var Editor = function Editor(_ref4, _ref5) {
	var lastScore = _ref4.lastScore;
	var dispatch = _ref5.dispatch,
	    ACTION = _ref5.ACTION;

	var refGoal = void 0;
	var add = function add(value) {
		value = value.trim();
		if (!value) return;

		var _value$split = value.split(":"),
		    _value$split2 = _toArray(_value$split),
		    goal = _value$split2[0],
		    desc = _value$split2.slice(1);

		try {
			goal = parseInt(goal);
		} catch (e) {
			refGoal.errorText = "\u683C\u5F0F\u9519\u8BEF";
			return;
		}
		dispatch(ACTION.SET_GOAL(goal, desc.join(":")));
	};
	return _react2.default.createElement(TextFieldx, { ref: function ref(a) {
			return refGoal = a;
		},
		floatingLabelText: "\u76EE\u6807",
		hintText: (lastScore || 20) + ":\u5C0F\u9A6C\u5B9D\u8389\u4E66\u4E00\u672C",
		onBlur: function onBlur(_ref6) {
			var value = _ref6.target.value;
			return add(value);
		},
		onKeyDown: function onKeyDown(_ref7) {
			var value = _ref7.target.value,
			    keyCode = _ref7.keyCode;
			return keyCode == 13 && add(value);
		},
		fullWidth: true });
};

Editor.contextTypes = {
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Njb3JlLXBhZC5qcyJdLCJuYW1lcyI6WyJUZXh0RmllbGR4IiwiU2NvcmVQYWQiLCJ0b2RvIiwiZ29hbCIsInRvdGFsUGVyU2NyZWVuIiwic2NvcmUiLCJBcHBCYXIiLCJtdWlUaGVtZSIsIndpZHRoIiwicGFnZSIsImhlaWdodCIsImFwcEJhciIsImZvb3RiYXIiLCJsZXNzIiwiTWF0aCIsIm1pbiIsIm1vcmUiLCJtYXgiLCJ3aWR0aExlc3MiLCJmbG9vciIsInNxcnQiLCJ3aWR0aE1vcmUiLCJzdHlsZSIsInNtaWxlcyIsImkiLCJwdXNoIiwiZGlzcGxheSIsInRpdGxlIiwiYWN0aW9uIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImVsZW1lbnQiLCJBQ1RJT04iLCJkaXNwYXRjaCIsImZ1bmMiLCJTbWlsZSIsInNjb3JlZCIsIm90aGVycyIsIkVkaXRvciIsImxhc3RTY29yZSIsInJlZkdvYWwiLCJhZGQiLCJ2YWx1ZSIsInRyaW0iLCJzcGxpdCIsImRlc2MiLCJwYXJzZUludCIsImUiLCJlcnJvclRleHQiLCJTRVRfR09BTCIsImpvaW4iLCJhIiwidGFyZ2V0Iiwia2V5Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7OztJQU9PQSxVLGVBQUFBLFU7QUFFQSxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTLGNBQytGO0FBQUEsS0FEN0ZDLElBQzZGLFFBRDdGQSxJQUM2RjtBQUFBLHNCQUR2RkMsSUFDdUY7QUFBQSxLQUR2RkEsSUFDdUYsNkJBRGxGLENBQ2tGO0FBQUEsZ0NBRGhGQyxjQUNnRjtBQUFBLEtBRGhGQSxjQUNnRix1Q0FEakVELElBQ2lFO0FBQUEsdUJBRDNERSxLQUMyRDtBQUFBLEtBRDNEQSxLQUMyRCw4QkFEckQsQ0FDcUQ7QUFBQSxLQURsREMsTUFDa0QsUUFEbERBLE1BQ2tEO0FBQUEsS0FBbkhD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IiwiZmlsZSI6InNjb3JlLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtcclxuXHR5ZWxsb3c1MDAgYXMgQ09MT1JfRE9ORVxyXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcclxuXHQsbGlnaHRibHVlNTAwIGFzIENPTE9SX0VOQUJMRURcclxuXHQsZ3JleTMwMCBhcyBDT0xPUl9ESVNBQkxFRFxyXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcclxuXHJcbmNvbnN0IHtUZXh0RmllbGR4fT1VSVxyXG5cclxuZXhwb3J0IGNvbnN0IFNjb3JlUGFkPSh7dG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIEFwcEJhcn0sXHJcblx0e211aVRoZW1lLCB3aWR0aD1tdWlUaGVtZS5wYWdlLndpZHRoLCBoZWlnaHQ9bXVpVGhlbWUucGFnZS5oZWlnaHQtbXVpVGhlbWUuYXBwQmFyLmhlaWdodC1tdWlUaGVtZS5mb290YmFyLmhlaWdodH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0bGV0IHRpdGxlPXRvZG8sIGFjdGlvbj1udWxsXHJcblx0aWYoZ29hbD09MCl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+esrOS4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IvPilcclxuXHR9ZWxzZSBpZihnb2FsPD1zY29yZSl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+S4i+S4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IgbGFzdFNjb3JlPXtzY29yZX0vPilcclxuXHR9ZWxzZVxyXG5cdFx0dGl0bGU9dG9kbztcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHtSZWFjdC5jcmVhdGVFbGVtZW50KEFwcEJhciwge3RpdGxlfSl9XHJcblx0XHRcdHthY3Rpb259XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3NtaWxlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcblNjb3JlUGFkLmNvbnRleHRUeXBlcz17XHJcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdCxcclxuXHRBcHBCYXI6IFByb3BUeXBlcy5lbGVtZW50LFxyXG5cdEFDVElPTjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZVxyXG5cdFx0Y29sb3I9e3Njb3JlZCA/IENPTE9SX0RPTkUgOiBDT0xPUl9ESVNBQkxFRH1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmV9LHtkaXNwYXRjaCxBQ1RJT059KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9HT0FMKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLnm67moIdcIlxyXG5cdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdClcclxufVxyXG5cclxuRWRpdG9yLmNvbnRleHRUeXBlcz17XHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG59Il19