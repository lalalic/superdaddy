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

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsIkRPTUFJTiIsInNjb3JlcyIsInRpbWVyIiwiQUNUSU9OIiwiQURESU5HX1NDT1JFIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRpc3BhdGNoIiwiQUREX1NDT1JFUyIsImdldFN0YXRlIiwiY2hpbGQiLCJzY29yZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBRERfVEFTSyIsImdvYWwiLCJ0b2RvIiwiRGFzaGJvYXJkIiwidG90YWxQZXJTY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxlc3MiLCJNYXRoIiwibWluIiwibW9yZSIsIm1heCIsIndpZHRoTGVzcyIsImZsb29yIiwic3FydCIsIndpZHRoTW9yZSIsInN0eWxlIiwic21pbGVzIiwiaSIsInB1c2giLCJkaXNwbGF5IiwidGl0bGUiLCJhY3Rpb24iLCJTbWlsZSIsInNjb3JlZCIsIm90aGVycyIsIkVkaXRvciIsImxhc3RTY29yZSIsInJlZkdvYWwiLCJhZGQiLCJ2YWx1ZSIsInRyaW0iLCJzcGxpdCIsImRlc2MiLCJwYXJzZUludCIsImUiLCJlcnJvclRleHQiLCJqb2luIiwiYSIsInRhcmdldCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0lBT09BLFUsZUFBQUEsVTs7O0FBRVAsSUFBTUMsU0FBTyxPQUFiO0FBQ0EsSUFBSUMsU0FBTyxDQUFYO0FBQUEsSUFBY0MsUUFBTSxJQUFwQjtBQUNPLElBQU1DLDBCQUFPO0FBQ25CQyxlQUFjO0FBQUEsU0FBSSxvQkFBVTtBQUMzQixPQUFHRixLQUFILEVBQ0NHLGFBQWFILEtBQWI7QUFDREQ7QUFDQUMsV0FBTUksV0FB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dCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuL2RiL2ZhbWlseVwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Ymx1ZTUwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbmNvbnN0IERPTUFJTj1cInNjb3JlXCJcclxudmFyIHNjb3Jlcz0wLCB0aW1lcj1udWxsXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEFERElOR19TQ09SRTogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRpZih0aW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzKytcclxuXHRcdHRpbWVyPXNldFRpbWVvdXQoZGlzcGF0Y2goQUNUSU9OLkFERF9TQ09SRVMoKSksNjAwKVxyXG5cdH1cclxuXHQsQUREX1NDT1JFUzogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9c2NvcmVzKyhjaGlsZC5zY29yZXx8MClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3Jlcz0wXHJcblx0XHRGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LEFERF9UQVNLOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdGNoaWxkLnNjb3JlPTBcclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIHdpZHRoPXdpbmRvdy5pbm5lcldpZHRoPjk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0LTYwfSk9PntcclxuXHRpZih0b3RhbFBlclNjcmVlbj09c2NvcmUpe1xyXG5cdFx0d2lkdGg9d2lkdGgvMlxyXG5cdFx0aGVpZ2h0PWhlaWdodC8yXHJcblx0fWVsc2V7XHJcblx0XHR3aWR0aD13aWR0aCo3LzhcclxuXHRcdGhlaWdodD1oZWlnaHQqNy84XHJcblx0fVxyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IHdpZHRoTGVzcz1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKGxlc3MqbGVzcy90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCB3aWR0aE1vcmU9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihtb3JlKm1vcmUvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgc3R5bGU9e31cclxuXHRpZihsZXNzPT13aWR0aCl7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aExlc3NcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aE1vcmVcclxuXHR9ZWxzZXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTW9yZVxyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTGVzc1xyXG5cdH1cclxuXHJcblx0bGV0IHNtaWxlcz1bXVxyXG5cdGZvcihsZXQgaT0wO2k8dG90YWxQZXJTY3JlZW47aSsrKVxyXG5cdFx0c21pbGVzLnB1c2goXHJcblx0XHRcdDxzcGFuIGtleT17aX0gc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9fT5cclxuXHRcdFx0XHQ8U21pbGUgc3R5bGU9e3N0eWxlfSBzY29yZWQ9e2k8c2NvcmV9IG9uQ2xpY2s9e2U9Pmk+PXNjb3JlICYmIGRpc3BhdGNoKEFDVElPTi5BRERJTkdfU0NPUkUoKSl9Lz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KVxyXG5cclxuXHRsZXQgdGl0bGU9dG9kbywgYWN0aW9uPW51bGxcclxuXHRpZihnb2FsPT0wKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL56ys5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvci8+KVxyXG5cdH1lbHNlIGlmKGdvYWw9PXNjb3JlKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL5LiL5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfS8+KVxyXG5cdH1lbHNlXHJcblx0XHR0aXRsZT10b2RvO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PEFwcEJhciB0aXRsZT17dGl0bGV9Lz5cclxuXHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7c21pbGVzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZVxyXG5cdFx0Y29sb3I9e3Njb3JlZCA/IENPTE9SX0RPTkUgOiBDT0xPUl9ESVNBQkxFRH1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBDT0xPUl9IT1ZFUn1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmUsZGlzcGF0Y2h9KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkFERF9UQVNLKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLnm67moIdcIlxyXG5cdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG4iXX0=