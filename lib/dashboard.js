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
			child.score = Math.max((child.score || 0) - (child.goal || 0), 0);
			child.goal = goal;
			child.todo = todo;
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
	} else if (goal <= score) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7SUFPTzs7O0FBRVAsSUFBTSxTQUFPLE9BQVA7QUFDTixJQUFJLFNBQU8sQ0FBUDtJQUFVLFFBQU0sSUFBTjtBQUNQLElBQU0sMEJBQU87QUFDbkIsZUFBYztTQUFJLG9CQUFVO0FBQzNCLE9BQUcsS0FBSCxFQUNDLGFBQWEsS0FBYixFQUREO0FBRUEsWUFIMkI7QUFJM0IsV0FBTSxXQUFXLFNBQVMsT0FBTyxVQUFQLEVBQVQsQ0FBWCxFQUF5QyxHQUF6QyxDQUFOLENBSjJCO0dBQVY7RUFBSjtBQU1iLGFBQVk7U0FBSSxVQUFDLFFBQUQsRUFBVSxRQUFWLEVBQXFCO0FBQ3JDLE9BQU0sUUFBTSwrQkFBZ0IsVUFBaEIsQ0FBTixDQUQrQjtBQUVyQyxTQUFNLEtBQU4sR0FBWSxVQUFRLE1BQU0sS0FBTixJQUFhLENBQWIsQ0FBUixDQUZ5QjtBQUdyQyxnQkFBYSxLQUFiLEVBSHFDO0FBSXJDLFlBQU8sQ0FBUCxDQUpxQztBQUtyQyxvQkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQ0UsSUFERixDQUNPO1dBQVMsU0FBUyx1QkFBUywwQkFBVSxPQUFWLEVBQWtCLGlCQUFTLE1BQVQsQ0FBbEIsQ0FBbUMsUUFBbkMsQ0FBbEI7SUFBVCxDQURQLENBTHFDO0dBQXJCO0VBQUo7QUFRWixXQUFVLGtCQUFDLElBQUQsRUFBTyxJQUFQO1NBQWMsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUM3QyxPQUFNLFFBQU0sK0JBQWdCLFVBQWhCLENBQU4sQ0FEdUM7QUFFN0MsU0FBTSxLQUFOLEdBQVksS0FBSyxHQUFMLENBQVMsQ0FBQyxNQUFNLEtBQU4sSUFBYSxDQUFiLENBQUQsSUFBa0IsTUFBTSxJQUFOLElBQVksQ0FBWixDQUFsQixFQUFpQyxDQUEx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VCxvQkFBWjtJQUNJLE9BSEw7Q0FEVzs7QUFRWixJQUFNLFNBQU8sU0FBUCxNQUFPLFFBQXdCO0tBQXRCO0tBQVUsMEJBQVk7O0FBQ3BDLEtBQUksZ0JBQUosQ0FEb0M7QUFFcEMsS0FBTSxNQUFJLFNBQUosR0FBSSxRQUFPO0FBQ2hCLFVBQU0sTUFBTSxJQUFOLEVBQU4sQ0FEZ0I7QUFFaEIsTUFBRyxDQUFDLEtBQUQsRUFDRixPQUREOztxQkFFb0IsTUFBTSxLQUFOLENBQVksR0FBWjs7TUFBZjtNQUFTLDhCQUpFOztBQUtoQixNQUFHO0FBQ0YsVUFBSyxTQUFTLElBQVQsQ0FBTCxDQURFO0dBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNSLFdBQVEsU0FBUixVQURRO0FBRVIsVUFGUTtHQUFSO0FBSUQsV0FBUyxPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsRUFBcUIsS0FBSyxJQUFMLENBQVUsR0FBVixDQUFyQixDQUFULEVBWGdCO0VBQVAsQ0FGMEI7QUFlcEMsUUFDQyw4QkFBQyxVQUFELElBQVksS0FBSztVQUFHLFVBQVEsQ0FBUjtHQUFIO0FBQ2hCLHFCQUFrQixJQUFsQjtBQUNBLGFBQWEsYUFBVyxFQUFYLGNBQWI7QUFDQSxVQUFRO09BQVUsY0FBUixPQUFRO1VBQVUsSUFBSSxLQUFKO0dBQXBCO0FBQ1IsYUFBVztPQUFVLGNBQVIsT0FBUTtPQUFPO1VBQVcsV0FBUyxFQUFULElBQWUsSUFBSSxLQUFKLENBQWY7R0FBNUI7QUFDWCxhQUFXLElBQVgsRUFMRCxDQURELENBZm9DO0NBQXhCOztrQkEwQkUiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcbmltcG9ydCB7RU5USVRJRVMsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXHJcblxyXG5pbXBvcnQgRmFtaWx5REIgZnJvbSBcIi4vZGIvZmFtaWx5XCJcclxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi9jb21wb25lbnRzL2FwcC1iYXJcIlxyXG5cclxuaW1wb3J0IHtcclxuXHR5ZWxsb3c1MDAgYXMgQ09MT1JfRE9ORVxyXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcclxuXHQsbGlnaHRibHVlNTAwIGFzIENPTE9SX0VOQUJMRURcclxuXHQsZ3JleTMwMCBhcyBDT0xPUl9ESVNBQkxFRFxyXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcclxuXHJcbmNvbnN0IHtUZXh0RmllbGR4fT1VSVxyXG5cclxuY29uc3QgRE9NQUlOPVwic2NvcmVcIlxyXG52YXIgc2NvcmVzPTAsIHRpbWVyPW51bGxcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0QURESU5HX1NDT1JFOiAoKT0+ZGlzcGF0Y2g9PntcclxuXHRcdGlmKHRpbWVyKVxyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXMrK1xyXG5cdFx0dGltZXI9c2V0VGltZW91dChkaXNwYXRjaChBQ1RJT04uQUREX1NDT1JFUygpKSw2MDApXHJcblx0fVxyXG5cdCxBRERfU0NPUkVTOiAoKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXHJcblx0XHRjaGlsZC5zY29yZT1zY29yZXMrKGNoaWxkLnNjb3JlfHwwKVxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzPTBcclxuXHRcdEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxuXHQsQUREX1RBU0s6IChnb2FsLCB0b2RvKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXHJcblx0XHRjaGlsZC5zY29yZT1NYXRoLm1heCgoY2hpbGQuc2NvcmV8fDApLShjaGlsZC5nb2FsfHwwKSwwKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIHdpZHRoPXdpbmRvdy5pbm5lcldpZHRoPjk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0LTYwfSk9PntcclxuXHRpZih0b3RhbFBlclNjcmVlbj09c2NvcmUpe1xyXG5cdFx0d2lkdGg9d2lkdGgvMlxyXG5cdFx0aGVpZ2h0PWhlaWdodC8yXHJcblx0fWVsc2V7XHJcblx0XHR3aWR0aD13aWR0aCo3LzhcclxuXHRcdGhlaWdodD1oZWlnaHQqNy84XHJcblx0fVxyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IHdpZHRoTGVzcz1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKGxlc3MqbGVzcy90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCB3aWR0aE1vcmU9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihtb3JlKm1vcmUvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgc3R5bGU9e31cclxuXHRpZihsZXNzPT13aWR0aCl7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aExlc3NcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aE1vcmVcclxuXHR9ZWxzZXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTW9yZVxyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTGVzc1xyXG5cdH1cclxuXHJcblx0bGV0IHNtaWxlcz1bXVxyXG5cdGZvcihsZXQgaT0wO2k8dG90YWxQZXJTY3JlZW47aSsrKVxyXG5cdFx0c21pbGVzLnB1c2goXHJcblx0XHRcdDxzcGFuIGtleT17aX0gc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9fT5cclxuXHRcdFx0XHQ8U21pbGUgc3R5bGU9e3N0eWxlfSBzY29yZWQ9e2k8c2NvcmV9IG9uQ2xpY2s9e2U9Pmk+PXNjb3JlICYmIGRpc3BhdGNoKEFDVElPTi5BRERJTkdfU0NPUkUoKSl9Lz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KVxyXG5cclxuXHRsZXQgdGl0bGU9dG9kbywgYWN0aW9uPW51bGxcclxuXHRpZihnb2FsPT0wKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL56ys5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvci8+KVxyXG5cdH1lbHNlIGlmKGdvYWw8PXNjb3JlKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL5LiL5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfS8+KVxyXG5cdH1lbHNlXHJcblx0XHR0aXRsZT10b2RvO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PEFwcEJhciB0aXRsZT17dGl0bGV9Lz5cclxuXHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7c21pbGVzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZVxyXG5cdFx0Y29sb3I9e3Njb3JlZCA/IENPTE9SX0RPTkUgOiBDT0xPUl9ESVNBQkxFRH1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBDT0xPUl9IT1ZFUn1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmUsZGlzcGF0Y2h9KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkFERF9UQVNLKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLnm67moIdcIlxyXG5cdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG4iXX0=