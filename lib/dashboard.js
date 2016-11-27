"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dashboard = exports.ACTION = undefined;

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _materialUi = require("material-ui");

var _family = require("./db/family");

var _family2 = _interopRequireDefault(_family);

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextFieldx = _qiliApp.UI.TextFieldx;


var DOMAIN = "score";
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
			child.goal = goal;
			child.todo = todo;
			child.score = 0;
			return _family2.default.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _family2.default.schema).entities));
			});
		};
	}
};

var Dashboard = exports.Dashboard = function Dashboard(_ref) {
	var dispatch = _ref.dispatch,
	    todo = _ref.todo,
	    goal = _ref.goal,
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

	var _loop = function _loop(i) {
		smiles.push(_react2.default.createElement(
			"span",
			{ key: i, style: { display: "inline-block" } },
			_react2.default.createElement(Smile, { style: style, scored: i < score, onClick: function onClick(e) {
					return i >= score && dispatch(ACTION.ADDING_SCORE());
				} })
		));
	};

	for (var i = 0; i < totalPerScreen; i++) {
		_loop(i);
	}return _react2.default.createElement(
		"div",
		null,
		totalPerScreen == score ? _react2.default.createElement(Editor, { lastScore: score, lastTodo: todo, dispatch: dispatch }) : null,
		_react2.default.createElement(
			"div",
			null,
			_react2.default.createElement(
				_materialUi.Subheader,
				null,
				_react2.default.createElement(
					"center",
					null,
					todo
				)
			),
			smiles
		)
	);
};

var Smile = function Smile(_ref2) {
	var scored = _ref2.scored,
	    others = (0, _objectWithoutProperties3.default)(_ref2, ["scored"]);
	return _react2.default.createElement(_mood2.default, (0, _extends3.default)({
		color: scored ? "yellow" : "lightgray",
		hoverColor: scored ? null : "lightyellow"
	}, others));
};

var Editor = function Editor(_ref3) {
	var lastScore = _ref3.lastScore,
	    _ref3$lastTodo = _ref3.lastTodo,
	    lastTodo = _ref3$lastTodo === undefined ? "目标" : _ref3$lastTodo,
	    dispatch = _ref3.dispatch;

	var refGoal = void 0;
	var add = function add(value) {
		value = value.trim();
		if (!value) return;

		var _value$split = value.split(":"),
		    _value$split2 = (0, _toArray3.default)(_value$split),
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
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"h1",
			{ style: { textAlign: "center" } },
			lastScore ? "\u606D\u559C " + lastTodo + " \u5B9E\u73B0\u4E86" : null
		),
		_react2.default.createElement(TextFieldx, { ref: function ref(a) {
				return refGoal = a;
			},
			floatingLabelText: "\u7B11\u8138\u76EE\u6807\u6570:" + (lastScore ? '下一个' : '第一个') + "\u76EE\u6807\u63CF\u8FF0",
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
			fullWidth: true })
	);
};

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsIkRPTUFJTiIsInNjb3JlcyIsInRpbWVyIiwiQUNUSU9OIiwiQURESU5HX1NDT1JFIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRpc3BhdGNoIiwiQUREX1NDT1JFUyIsImdldFN0YXRlIiwiY2hpbGQiLCJzY29yZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBRERfVEFTSyIsImdvYWwiLCJ0b2RvIiwiRGFzaGJvYXJkIiwidG90YWxQZXJTY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxlc3MiLCJNYXRoIiwibWluIiwibW9yZSIsIm1heCIsIndpZHRoTGVzcyIsImZsb29yIiwic3FydCIsIndpZHRoTW9yZSIsInN0eWxlIiwic21pbGVzIiwiaSIsInB1c2giLCJkaXNwbGF5IiwiU21pbGUiLCJzY29yZWQiLCJvdGhlcnMiLCJFZGl0b3IiLCJsYXN0U2NvcmUiLCJsYXN0VG9kbyIsInJlZkdvYWwiLCJhZGQiLCJ2YWx1ZSIsInRyaW0iLCJzcGxpdCIsImRlc2MiLCJwYXJzZUludCIsImUiLCJlcnJvclRleHQiLCJqb2luIiwidGV4dEFsaWduIiwiYSIsInRhcmdldCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztJQUVPQSxVLGVBQUFBLFU7OztBQUVQLElBQU1DLFNBQU8sT0FBYjtBQUNBLElBQUlDLFNBQU8sQ0FBWDtBQUFBLElBQWNDLFFBQU0sSUFBcEI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsZUFBYztBQUFBLFNBQUksb0JBQVU7QUFDM0IsT0FBR0YsS0FBSCxFQUNDRyxhQUFhSCxLQUFiO0FBQ0REO0FBQ0FDLFdBQU1JLFdBQVdD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LCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcbmltcG9ydCB7RU5USVRJRVMsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXHJcbmltcG9ydCB7U3ViaGVhZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuL2RiL2ZhbWlseVwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbmNvbnN0IERPTUFJTj1cInNjb3JlXCJcclxudmFyIHNjb3Jlcz0wLCB0aW1lcj1udWxsXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEFERElOR19TQ09SRTogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRpZih0aW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzKytcclxuXHRcdHRpbWVyPXNldFRpbWVvdXQoZGlzcGF0Y2goQUNUSU9OLkFERF9TQ09SRVMoKSksNjAwKVxyXG5cdH1cclxuXHQsQUREX1NDT1JFUzogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9c2NvcmVzKyhjaGlsZC5zY29yZXx8MClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3Jlcz0wXHJcblx0XHRGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LEFERF9UQVNLOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdGNoaWxkLnNjb3JlPTBcclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbCx0b3RhbFBlclNjcmVlbj1nb2FsLCBzY29yZT0wLCB3aWR0aD13aW5kb3cuaW5uZXJXaWR0aD45NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodC02MH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfSBvbkNsaWNrPXtlPT5pPj1zY29yZSAmJiBkaXNwYXRjaChBQ1RJT04uQURESU5HX1NDT1JFKCkpfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHt0b3RhbFBlclNjcmVlbj09c2NvcmUgPyAoPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfSBsYXN0VG9kbz17dG9kb30gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KSA6IG51bGx9XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PFN1YmhlYWRlcj48Y2VudGVyPnt0b2RvfTwvY2VudGVyPjwvU3ViaGVhZGVyPlxyXG5cdFx0XHRcdHtzbWlsZXN9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5jb25zdCBTbWlsZT0oe3Njb3JlZCwgLi4ub3RoZXJzfSk9PihcclxuXHQ8SWNvblNtaWxlXHJcblx0XHRjb2xvcj17c2NvcmVkID8gXCJ5ZWxsb3dcIiA6XCJsaWdodGdyYXlcIn1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBcImxpZ2h0eWVsbG93XCJ9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuY29uc3QgRWRpdG9yPSh7bGFzdFNjb3JlLGxhc3RUb2RvPVwi55uu5qCHXCIsIGRpc3BhdGNofSk9PntcclxuXHRsZXQgcmVmR29hbFxyXG5cdGNvbnN0IGFkZD12YWx1ZT0+e1xyXG5cdFx0dmFsdWU9dmFsdWUudHJpbSgpXHJcblx0XHRpZighdmFsdWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IFtnb2FsLCAuLi5kZXNjXT12YWx1ZS5zcGxpdChcIjpcIilcclxuXHRcdHRyeXtcclxuXHRcdFx0Z29hbD1wYXJzZUludChnb2FsKVxyXG5cdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRyZWZHb2FsLmVycm9yVGV4dD1g5qC85byP6ZSZ6K+vYFxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGRpc3BhdGNoKEFDVElPTi5BRERfVEFTSyhnb2FsLGRlc2Muam9pbihcIjpcIikpKVxyXG5cdH1cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PGgxIHN0eWxlPXt7dGV4dEFsaWduOlwiY2VudGVyXCJ9fT57bGFzdFNjb3JlID8gYOaBreWWnCAke2xhc3RUb2RvfSDlrp7njrDkuoZgIDogbnVsbH08L2gxPlxyXG5cdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD17YOeskeiEuOebruagh+aVsDoke2xhc3RTY29yZSA/ICfkuIvkuIDkuKonIDogJ+esrOS4gOS4qid955uu5qCH5o+P6L+wYH1cclxuXHRcdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0IFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgYWRkKHZhbHVlKX1cclxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG4iXX0=