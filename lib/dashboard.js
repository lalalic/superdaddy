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

var _appBar = require("./components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _colors = require("material-ui/styles/colors");

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
	}var title = todo,
	    action = null;
	if (goal == 0) {
		title = "开始第一个目标";
		action = _react2.default.createElement(Editor, null);
	} else if (goal == score) {
		title = "开始下一个目标";
		action = _react2.default.createElement(Editor, { lastScore: score });
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
	    others = (0, _objectWithoutProperties3.default)(_ref2, ["scored"]);
	return _react2.default.createElement(_mood2.default, (0, _extends3.default)({
		color: scored ? _colors.yellow500 : _colors.grey300,
		hoverColor: scored ? null : _colors.yellow200
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
	return _react2.default.createElement(TextFieldx, { ref: function ref(a) {
			return refGoal = a;
		},
		floatingLabelText: "目标",
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
		fullWidth: true });
};

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,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LENBRG9DO0FBRXBDLEtBQU0sTUFBSSxTQUFKLEdBQUksUUFBTztBQUNoQixVQUFNLE1BQU0sSUFBTixFQUFOLENBRGdCO0FBRWhCLE1BQUcsQ0FBQyxLQUFELEVBQ0YsT0FERDs7cUJBRW9CLE1BQU0sS0FBTixDQUFZLEdBQVo7O01BQWY7TUFBUyw4QkFKRTs7QUFLaEIsTUFBRztBQUNGLFVBQUssU0FBUyxJQUFULENBQUwsQ0FERTtHQUFILENBRUMsT0FBTSxDQUFOLEVBQVE7QUFDUixXQUFRLFNBQVIsVUFEUTtBQUVSLFVBRlE7R0FBUjtBQUlELFdBQVMsT0FBTyxRQUFQLENBQWdCLElBQWhCLEVBQXFCLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBckIsQ0FBVCxFQVhnQjtFQUFQLENBRjBCO0FBZXBDLFFBQ0MsOEJBQUMsVUFBRCxJQUFZLEtBQUs7VUFBRyxVQUFRLENBQVI7R0FBSDtBQUNoQixxQkFBa0IsSUFBbEI7QUFDQSxhQUFhLGFBQVcsRUFBWCxjQUFiO0FBQ0EsVUFBUTtPQUFVLGNBQVIsT0FBUTtVQUFVLElBQUksS0FBSjtHQUFwQjtBQUNSLGFBQVc7T0FBVSxjQUFSLE9BQVE7T0FBTztVQUFXLFdBQVMsRUFBVCxJQUFlLElBQUksS0FBSixDQUFmO0dBQTVCO0FBQ1gsYUFBVyxJQUFYLEVBTEQsQ0FERCxDQWZvQztDQUF4Qjs7a0JBMEJFIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuL2RiL2ZhbWlseVwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Ymx1ZTUwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbmNvbnN0IERPTUFJTj1cInNjb3JlXCJcclxudmFyIHNjb3Jlcz0wLCB0aW1lcj1udWxsXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEFERElOR19TQ09SRTogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRpZih0aW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzKytcclxuXHRcdHRpbWVyPXNldFRpbWVvdXQoZGlzcGF0Y2goQUNUSU9OLkFERF9TQ09SRVMoKSksNjAwKVxyXG5cdH1cclxuXHQsQUREX1NDT1JFUzogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9c2NvcmVzKyhjaGlsZC5zY29yZXx8MClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3Jlcz0wXHJcblx0XHRGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LEFERF9UQVNLOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdGNoaWxkLnNjb3JlPTBcclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIHdpZHRoPXdpbmRvdy5pbm5lcldpZHRoPjk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0LTYwfSk9PntcclxuXHRpZih0b3RhbFBlclNjcmVlbj09c2NvcmUpe1xyXG5cdFx0d2lkdGg9d2lkdGgvMlxyXG5cdFx0aGVpZ2h0PWhlaWdodC8yXHJcblx0fWVsc2V7XHJcblx0XHR3aWR0aD13aWR0aCo3LzhcclxuXHRcdGhlaWdodD1oZWlnaHQqNy84XHJcblx0fVxyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IHdpZHRoTGVzcz1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKGxlc3MqbGVzcy90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCB3aWR0aE1vcmU9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihtb3JlKm1vcmUvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgc3R5bGU9e31cclxuXHRpZihsZXNzPT13aWR0aCl7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aExlc3NcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aE1vcmVcclxuXHR9ZWxzZXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTW9yZVxyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTGVzc1xyXG5cdH1cclxuXHJcblx0bGV0IHNtaWxlcz1bXVxyXG5cdGZvcihsZXQgaT0wO2k8dG90YWxQZXJTY3JlZW47aSsrKVxyXG5cdFx0c21pbGVzLnB1c2goXHJcblx0XHRcdDxzcGFuIGtleT17aX0gc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9fT5cclxuXHRcdFx0XHQ8U21pbGUgc3R5bGU9e3N0eWxlfSBzY29yZWQ9e2k8c2NvcmV9IG9uQ2xpY2s9e2U9Pmk+PXNjb3JlICYmIGRpc3BhdGNoKEFDVElPTi5BRERJTkdfU0NPUkUoKSl9Lz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KVxyXG5cclxuXHRsZXQgdGl0bGU9dG9kbywgYWN0aW9uPW51bGxcclxuXHRpZihnb2FsPT0wKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL56ys5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvci8+KVxyXG5cdH1lbHNlIGlmKGdvYWw9PXNjb3JlKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL5LiL5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfS8+KVxyXG5cdH1lbHNlXHJcblx0XHR0aXRsZT10b2RvO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PEFwcEJhciB0aXRsZT17dGl0bGV9Lz5cclxuXHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7c21pbGVzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZVxyXG5cdFx0Y29sb3I9e3Njb3JlZCA/IENPTE9SX0RPTkUgOiBDT0xPUl9ESVNBQkxFRH1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBDT0xPUl9IT1ZFUn1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmUsZGlzcGF0Y2h9KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkFERF9UQVNLKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLnm67moIdcIlxyXG5cdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG4iXX0=