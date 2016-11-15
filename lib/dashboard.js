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
	    _ref$goal = _ref.goal,
	    totalPerScreen = _ref$goal === undefined ? 0 : _ref$goal,
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
			refGoal.errorText = "格式错误";
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
			lastScore ? "恭喜 " + lastTodo + " 实现了" : null
		),
		_react2.default.createElement(TextFieldx, { ref: function ref(a) {
				return refGoal = a;
			},
			floatingLabelText: "笑脸目标数:" + (lastScore ? '下一个' : '第一个') + "目标描述",
			hintText: (lastScore || 20) + ":小马宝莉书一本",
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
//# sourceMappingURL=data:application/json;base64,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SUFBVCxDQUFMLENBREU7R0FBSCxDQUVDLE9BQU0sQ0FBTixFQUFRO0FBQ1IsV0FBUSxTQUFSLFVBRFE7QUFFUixVQUZRO0dBQVI7QUFJRCxXQUFTLE9BQU8sUUFBUCxDQUFnQixJQUFoQixFQUFxQixLQUFLLElBQUwsQ0FBVSxHQUFWLENBQXJCLENBQVQsRUFYZ0I7RUFBUCxDQUZ5QztBQWVuRCxRQUNDOzs7RUFDQzs7S0FBSSxPQUFPLEVBQUMsV0FBVSxRQUFWLEVBQVIsRUFBSjtHQUFrQyxvQkFBa0IsaUJBQWxCLEdBQW1DLElBQW5DO0dBRG5DO0VBRUMsOEJBQUMsVUFBRCxJQUFZLEtBQUs7V0FBRyxVQUFRLENBQVI7SUFBSDtBQUNoQixrQ0FBNEIsWUFBWSxLQUFaLEdBQW9CLEtBQXBCLFVBQTVCO0FBQ0EsY0FBYSxhQUFXLEVBQVgsY0FBYjtBQUNDLFdBQVE7UUFBVSxjQUFSLE9BQVE7V0FBVSxJQUFJLEtBQUo7SUFBcEI7QUFDVCxjQUFXO1FBQVUsY0FBUixPQUFRO1FBQU87V0FBVyxXQUFTLEVBQVQsSUFBZSxJQUFJLEtBQUosQ0FBZjtJQUE1QjtBQUNYLGNBQVcsSUFBWCxFQUxELENBRkQ7RUFERCxDQWZtRDtDQUF2Qzs7a0JBNkJFIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuL2RiL2ZhbWlseVwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbmNvbnN0IERPTUFJTj1cInNjb3JlXCJcclxudmFyIHNjb3Jlcz0wLCB0aW1lcj1udWxsXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEFERElOR19TQ09SRTogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRpZih0aW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzKytcclxuXHRcdHRpbWVyPXNldFRpbWVvdXQoZGlzcGF0Y2goQUNUSU9OLkFERF9TQ09SRVMoKSksNjAwKVxyXG5cdH1cclxuXHQsQUREX1NDT1JFUzogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9c2NvcmVzKyhjaGlsZC5zY29yZXx8MClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3Jlcz0wXHJcblx0XHRGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LEFERF9UQVNLOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdGNoaWxkLnNjb3JlPTBcclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbDp0b3RhbFBlclNjcmVlbj0wLCBzY29yZT0wLCB3aWR0aD13aW5kb3cuaW5uZXJXaWR0aD45NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodC02MH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfSBvbkNsaWNrPXtlPT5pPj1zY29yZSAmJiBkaXNwYXRjaChBQ1RJT04uQURESU5HX1NDT1JFKCkpfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHt0b3RhbFBlclNjcmVlbj09c2NvcmUgPyAoPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfSBsYXN0VG9kbz17dG9kb30gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KSA6IG51bGx9XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3NtaWxlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbmNvbnN0IFNtaWxlPSh7c2NvcmVkLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDxJY29uU21pbGVcclxuXHRcdGNvbG9yPXtzY29yZWQgPyBcInllbGxvd1wiIDpcImxpZ2h0Z3JheVwifVxyXG5cdFx0aG92ZXJDb2xvcj17c2NvcmVkID8gbnVsbCA6IFwibGlnaHR5ZWxsb3dcIn1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmUsbGFzdFRvZG89XCLnm67moIdcIiwgZGlzcGF0Y2h9KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkFERF9UQVNLKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHQ8aDEgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19PntsYXN0U2NvcmUgPyBg5oGt5ZacICR7bGFzdFRvZG99IOWunueOsOS6hmAgOiBudWxsfTwvaDE+XHJcblx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmR29hbD1hfVxyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PXtg56yR6IS455uu5qCH5pWwOiR7bGFzdFNjb3JlID8gJ+S4i+S4gOS4qicgOiAn56ys5LiA5LiqJ33nm67moIfmj4/ov7BgfVxyXG5cdFx0XHRcdGhpbnRUZXh0PXtgJHtsYXN0U2NvcmV8fDIwfTrlsI/pqazlrp3ojonkuabkuIDmnKxgfVxyXG5cdFx0XHQgXHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+YWRkKHZhbHVlKX1cclxuXHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBhZGQodmFsdWUpfVxyXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkXHJcbiJdfQ==