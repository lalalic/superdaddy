"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScorePad = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _reactRedux = require("react-redux");

var _family = require("../../db/family");

var _family2 = _interopRequireDefault(_family);

var _selector = require("../../selector");

var _appBar = require("../../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _colors = require("material-ui/styles/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextFieldx = _qiliApp.UI.TextFieldx;


var scores = 0,
    timer = null;
var ACTION = exports.ACTION = {
	ADDING_SCORE: function ADDING_SCORE() {
		return function (dispatch) {
			if (timer) clearTimeout(timer);
			scores++;
			timer = setTimeout(dispatch(ACTION.ADD_SCORES()), 600);
		};
	},
	ADD_SCORES: function ADD_SCORES() {
		return function (dispatch, getState) {
			var child = (0, _selector.getCurrentChild)(getState());
			child.score = scores + (child.score || 0);
			clearTimeout(timer);
			scores = 0;
			_family2.default.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _family2.default.schema).entities));
			});
		};
	},
	ADD_TASK: function ADD_TASK(goal, todo) {
		return function (dispatch, getState) {
			var child = (0, _selector.getCurrentChild)(getState());
			child.score = Math.max((child.score || 0) - (child.goal || 0), 0);
			child.goal = goal;
			child.todo = todo;
			return _family2.default.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _family2.default.schema).entities));
			});
		};
	}
};

var ScorePad = exports.ScorePad = function ScorePad(_ref) {
	var dispatch = _ref.dispatch,
	    todo = _ref.todo,
	    _ref$goal = _ref.goal,
	    goal = _ref$goal === undefined ? 0 : _ref$goal,
	    _ref$totalPerScreen = _ref.totalPerScreen,
	    totalPerScreen = _ref$totalPerScreen === undefined ? goal : _ref$totalPerScreen,
	    _ref$score = _ref.score,
	    score = _ref$score === undefined ? 0 : _ref$score,
	    _ref$width = _ref.width,
	    width = _ref$width === undefined ? window.innerWidth > 960 ? 960 : window.innerWidth : _ref$width,
	    _ref$height = _ref.height,
	    height = _ref$height === undefined ? window.innerHeight - 60 : _ref$height;

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
		action = _react2.default.createElement(Editor, { dispatch: dispatch });
	} else if (goal <= score) {
		title = "开始下一个目标";
		action = _react2.default.createElement(Editor, { lastScore: score, dispatch: dispatch });
	} else title = todo;

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_appBar2.default, { title: title }),
		action,
		_react2.default.createElement(
			"div",
			null,
			smiles
		)
	);
};

var Smile = function Smile(_ref2) {
	var scored = _ref2.scored,
	    others = _objectWithoutProperties(_ref2, ["scored"]);

	return _react2.default.createElement(_mood2.default, _extends({
		color: scored ? _colors.yellow500 : _colors.grey300
	}, others));
};

var Editor = function Editor(_ref3) {
	var lastScore = _ref3.lastScore,
	    dispatch = _ref3.dispatch;

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
		dispatch(ACTION.ADD_TASK(goal, desc.join(":")));
	};
	return _react2.default.createElement(TextFieldx, { ref: function ref(a) {
			return refGoal = a;
		},
		floatingLabelText: "\u76EE\u6807",
		hintText: (lastScore || 20) + ":\u5C0F\u9A6C\u5B9D\u8389\u4E66\u4E00\u672C",
		onBlur: function onBlur(_ref4) {
			var value = _ref4.target.value;
			return add(value);
		},
		onKeyDown: function onKeyDown(_ref5) {
			var value = _ref5.target.value,
			    keyCode = _ref5.keyCode;
			return keyCode == 13 && add(value);
		},
		fullWidth: true });
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(ScorePad);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L3Njb3JlLXBhZC5qcyJdLCJuYW1lcyI6WyJUZXh0RmllbGR4Iiwic2NvcmVzIiwidGltZXIiLCJBQ1RJT04iLCJBRERJTkdfU0NPUkUiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZGlzcGF0Y2giLCJBRERfU0NPUkVTIiwiZ2V0U3RhdGUiLCJjaGlsZCIsInNjb3JlIiwidXBzZXJ0IiwidGhlbiIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkFERF9UQVNLIiwiZ29hbCIsInRvZG8iLCJNYXRoIiwibWF4IiwiU2NvcmVQYWQiLCJ0b3RhbFBlclNjcmVlbiIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImhlaWdodCIsImlubmVySGVpZ2h0IiwibGVzcyIsIm1pbiIsIm1vcmUiLCJ3aWR0aExlc3MiLCJmbG9vciIsInNxcnQiLCJ3aWR0aE1vcmUiLCJzdHlsZSIsInNtaWxlcyIsImkiLCJwdXNoIiwiZGlzcGxheSIsInRpdGxlIiwiYWN0aW9uIiwiU21pbGUiLCJzY29yZWQiLCJvdGhlcnMiLCJFZGl0b3IiLCJsYXN0U2NvcmUiLCJyZWZHb2FsIiwiYWRkIiwidmFsdWUiLCJ0cmltIiwic3BsaXQiLCJkZXNjIiwicGFyc2VJbnQiLCJlIiwiZXJyb3JUZXh0Iiwiam9pbiIsImEiLCJ0YXJnZXQiLCJrZXlDb2RlIiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7O0lBT09BLFUsZUFBQUEsVTs7O0FBRVAsSUFBSUMsU0FBTyxDQUFYO0FBQUEsSUFBY0MsUUFBTSxJQUFwQjtBQUNPLElBQU1DLDBCQUFPO0FBQ25CQyxlQUFjO0FBQUEsU0FBSSxvQkFBVTtBQUMzQixPQUFHRixLQUFILEVBQ0NHLGFBQWFILEtBQWI7QUFDREQ7QUFDQUMsV0FBTUksV0FB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LEVBQXNFdkMsUUFBdEUsQyIsImZpbGUiOiJzY29yZS1wYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuaW1wb3J0IHtFTlRJVElFUywgVUksIGNvbXBhY3R9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuLi8uLi9kYi9mYW1pbHlcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcclxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Ymx1ZTUwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbnZhciBzY29yZXM9MCwgdGltZXI9bnVsbFxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBRERJTkdfU0NPUkU6ICgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYodGltZXIpXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3JlcysrXHJcblx0XHR0aW1lcj1zZXRUaW1lb3V0KGRpc3BhdGNoKEFDVElPTi5BRERfU0NPUkVTKCkpLDYwMClcclxuXHR9XHJcblx0LEFERF9TQ09SRVM6ICgpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPXNjb3JlcysoY2hpbGQuc2NvcmV8fDApXHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXM9MFxyXG5cdFx0RmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG5cdCxBRERfVEFTSzogKGdvYWwsIHRvZG8pPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPU1hdGgubWF4KChjaGlsZC5zY29yZXx8MCktKGNoaWxkLmdvYWx8fDApLDApXHJcblx0XHRjaGlsZC5nb2FsPWdvYWxcclxuXHRcdGNoaWxkLnRvZG89dG9kb1xyXG5cdFx0cmV0dXJuIEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNjb3JlUGFkPVxyXG4oe2Rpc3BhdGNoLHRvZG8sIGdvYWw9MCx0b3RhbFBlclNjcmVlbj1nb2FsLCBzY29yZT0wLCB3aWR0aD13aW5kb3cuaW5uZXJXaWR0aD45NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodC02MH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0bGV0IHRpdGxlPXRvZG8sIGFjdGlvbj1udWxsXHJcblx0aWYoZ29hbD09MCl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+esrOS4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IgZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxyXG5cdH1lbHNlIGlmKGdvYWw8PXNjb3JlKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL5LiL5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0fWVsc2VcclxuXHRcdHRpdGxlPXRvZG87XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHQ8QXBwQmFyIHRpdGxlPXt0aXRsZX0vPlxyXG5cdFx0XHR7YWN0aW9ufVxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHtzbWlsZXN9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5jb25zdCBTbWlsZT0oe3Njb3JlZCwgLi4ub3RoZXJzfSk9PihcclxuXHQ8SWNvblNtaWxlXHJcblx0XHRjb2xvcj17c2NvcmVkID8gQ09MT1JfRE9ORSA6IENPTE9SX0RJU0FCTEVEfVxyXG5cdFx0ey4uLm90aGVyc31cclxuXHRcdC8+XHJcbilcclxuXHJcbmNvbnN0IEVkaXRvcj0oe2xhc3RTY29yZSxkaXNwYXRjaH0pPT57XHJcblx0bGV0IHJlZkdvYWxcclxuXHRjb25zdCBhZGQ9dmFsdWU9PntcclxuXHRcdHZhbHVlPXZhbHVlLnRyaW0oKVxyXG5cdFx0aWYoIXZhbHVlKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdGxldCBbZ29hbCwgLi4uZGVzY109dmFsdWUuc3BsaXQoXCI6XCIpXHJcblx0XHR0cnl7XHJcblx0XHRcdGdvYWw9cGFyc2VJbnQoZ29hbClcclxuXHRcdH1jYXRjaChlKXtcclxuXHRcdFx0cmVmR29hbC5lcnJvclRleHQ9YOagvOW8j+mUmeivr2BcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRkaXNwYXRjaChBQ1RJT04uQUREX1RBU0soZ29hbCxkZXNjLmpvaW4oXCI6XCIpKSlcclxuXHR9XHJcblx0cmV0dXJuIChcclxuXHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmR29hbD1hfVxyXG5cdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuebruagh1wiXHJcblx0XHRcdGhpbnRUZXh0PXtgJHtsYXN0U2NvcmV8fDIwfTrlsI/pqazlrp3ojonkuabkuIDmnKxgfVxyXG5cdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+YWRkKHZhbHVlKX1cclxuXHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgYWRkKHZhbHVlKX1cclxuXHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKFNjb3JlUGFkKVxyXG4iXX0=