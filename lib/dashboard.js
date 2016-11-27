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
			_react2.default.createElement(_materialUi.AppBar, { title: todo, iconElementLeft: _react2.default.createElement("span", null) }),
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
		_react2.default.createElement(_materialUi.AppBar, {
			iconElementLeft: _react2.default.createElement("span", null),
			title: lastScore ? "\u606D\u559C " + lastTodo + " \u5B9E\u73B0\u4E86" : "\u5B9A\u4E0B\u7B2C\u4E00\u4E2A\u76EE\u6807\u63CF\u8FF0\u5427" }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsIkRPTUFJTiIsInNjb3JlcyIsInRpbWVyIiwiQUNUSU9OIiwiQURESU5HX1NDT1JFIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRpc3BhdGNoIiwiQUREX1NDT1JFUyIsImdldFN0YXRlIiwiY2hpbGQiLCJzY29yZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBRERfVEFTSyIsImdvYWwiLCJ0b2RvIiwiRGFzaGJvYXJkIiwidG90YWxQZXJTY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxlc3MiLCJNYXRoIiwibWluIiwibW9yZSIsIm1heCIsIndpZHRoTGVzcyIsImZsb29yIiwic3FydCIsIndpZHRoTW9yZSIsInN0eWxlIiwic21pbGVzIiwiaSIsInB1c2giLCJkaXNwbGF5IiwiU21pbGUiLCJzY29yZWQiLCJvdGhlcnMiLCJFZGl0b3IiLCJsYXN0U2NvcmUiLCJsYXN0VG9kbyIsInJlZkdvYWwiLCJhZGQiLCJ2YWx1ZSIsInRyaW0iLCJzcGxpdCIsImRlc2MiLCJwYXJzZUludCIsImUiLCJlcnJvclRleHQiLCJqb2luIiwiYSIsInRhcmdldCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztJQUVPQSxVLGVBQUFBLFU7OztBQUVQLElBQU1DLFNBQU8sT0FBYjtBQUNBLElBQUlDLFNBQU8sQ0FBWDtBQUFBLElBQWNDLFFBQU0sSUFBcEI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsZUFBYztBQUFBLFNBQUksb0JBQVU7QUFDM0IsT0FBR0YsS0FBSCxFQUNDRyxhQUFhSCxLQUFiO0FBQ0REO0FBQ0FDLFdBQU1JLFdBQVdDLFNBQVNKLE9BQU9L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ImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5pbXBvcnQge0FwcEJhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBGYW1pbHlEQiBmcm9tIFwiLi9kYi9mYW1pbHlcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuY29uc3Qge1RleHRGaWVsZHh9PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJzY29yZVwiXHJcbnZhciBzY29yZXM9MCwgdGltZXI9bnVsbFxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBRERJTkdfU0NPUkU6ICgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYodGltZXIpXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3JlcysrXHJcblx0XHR0aW1lcj1zZXRUaW1lb3V0KGRpc3BhdGNoKEFDVElPTi5BRERfU0NPUkVTKCkpLDYwMClcclxuXHR9XHJcblx0LEFERF9TQ09SRVM6ICgpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPXNjb3JlcysoY2hpbGQuc2NvcmV8fDApXHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXM9MFxyXG5cdFx0RmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG5cdCxBRERfVEFTSzogKGdvYWwsIHRvZG8pPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLmdvYWw9Z29hbFxyXG5cdFx0Y2hpbGQudG9kbz10b2RvXHJcblx0XHRjaGlsZC5zY29yZT0wXHJcblx0XHRyZXR1cm4gRmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkPVxyXG4oe2Rpc3BhdGNoLHRvZG8sIGdvYWwsdG90YWxQZXJTY3JlZW49Z29hbCwgc2NvcmU9MCwgd2lkdGg9d2luZG93LmlubmVyV2lkdGg+OTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQtNjB9KT0+e1xyXG5cdGlmKHRvdGFsUGVyU2NyZWVuPT1zY29yZSl7XHJcblx0XHR3aWR0aD13aWR0aC8yXHJcblx0XHRoZWlnaHQ9aGVpZ2h0LzJcclxuXHR9ZWxzZXtcclxuXHRcdHdpZHRoPXdpZHRoKjcvOFxyXG5cdFx0aGVpZ2h0PWhlaWdodCo3LzhcclxuXHR9XHJcblx0Y29uc3QgbGVzcz1NYXRoLm1pbih3aWR0aCxoZWlnaHQpLCBtb3JlPU1hdGgubWF4KHdpZHRoLGhlaWdodClcclxuXHRsZXQgd2lkdGhMZXNzPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobGVzcypsZXNzL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHdpZHRoTW9yZT1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKG1vcmUqbW9yZS90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCBzdHlsZT17fVxyXG5cdGlmKGxlc3M9PXdpZHRoKXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTGVzc1xyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTW9yZVxyXG5cdH1lbHNle1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhNb3JlXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhMZXNzXHJcblx0fVxyXG5cclxuXHRsZXQgc21pbGVzPVtdXHJcblx0Zm9yKGxldCBpPTA7aTx0b3RhbFBlclNjcmVlbjtpKyspXHJcblx0XHRzbWlsZXMucHVzaChcclxuXHRcdFx0PHNwYW4ga2V5PXtpfSBzdHlsZT17e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIn19PlxyXG5cdFx0XHRcdDxTbWlsZSBzdHlsZT17c3R5bGV9IHNjb3JlZD17aTxzY29yZX0gb25DbGljaz17ZT0+aT49c2NvcmUgJiYgZGlzcGF0Y2goQUNUSU9OLkFERElOR19TQ09SRSgpKX0vPlxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpXHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHR7dG90YWxQZXJTY3JlZW49PXNjb3JlID8gKDxFZGl0b3IgbGFzdFNjb3JlPXtzY29yZX0gbGFzdFRvZG89e3RvZG99IGRpc3BhdGNoPXtkaXNwYXRjaH0vPikgOiBudWxsfVxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e3RvZG99IGljb25FbGVtZW50TGVmdD17PHNwYW4vPn0vPlxyXG5cdFx0XHRcdHtzbWlsZXN9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5jb25zdCBTbWlsZT0oe3Njb3JlZCwgLi4ub3RoZXJzfSk9PihcclxuXHQ8SWNvblNtaWxlXHJcblx0XHRjb2xvcj17c2NvcmVkID8gXCJ5ZWxsb3dcIiA6XCJsaWdodGdyYXlcIn1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBcImxpZ2h0eWVsbG93XCJ9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuY29uc3QgRWRpdG9yPSh7bGFzdFNjb3JlLGxhc3RUb2RvPVwi55uu5qCHXCIsIGRpc3BhdGNofSk9PntcclxuXHRsZXQgcmVmR29hbFxyXG5cdGNvbnN0IGFkZD12YWx1ZT0+e1xyXG5cdFx0dmFsdWU9dmFsdWUudHJpbSgpXHJcblx0XHRpZighdmFsdWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IFtnb2FsLCAuLi5kZXNjXT12YWx1ZS5zcGxpdChcIjpcIilcclxuXHRcdHRyeXtcclxuXHRcdFx0Z29hbD1wYXJzZUludChnb2FsKVxyXG5cdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRyZWZHb2FsLmVycm9yVGV4dD1g5qC85byP6ZSZ6K+vYFxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGRpc3BhdGNoKEFDVElPTi5BRERfVEFTSyhnb2FsLGRlc2Muam9pbihcIjpcIikpKVxyXG5cdH1cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PEFwcEJhclxyXG5cdFx0XHRcdGljb25FbGVtZW50TGVmdD17PHNwYW4vPn1cclxuXHRcdFx0XHR0aXRsZT17bGFzdFNjb3JlID8gYOaBreWWnCAke2xhc3RUb2RvfSDlrp7njrDkuoZgIDogYOWumuS4i+esrOS4gOS4quebruagh+aPj+i/sOWQp2B9Lz5cclxuXHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZHb2FsPWF9XHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9e2DnrJHohLjnm67moIfmlbA6JHtsYXN0U2NvcmUgPyAn5LiL5LiA5LiqJyA6ICfnrKzkuIDkuKonfeebruagh+aPj+i/sGB9XHJcblx0XHRcdFx0aGludFRleHQ9e2Ake2xhc3RTY29yZXx8MjB9OuWwj+mprOWuneiOieS5puS4gOacrGB9XHJcblx0XHRcdCBcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5hZGQodmFsdWUpfVxyXG5cdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmRcclxuIl19