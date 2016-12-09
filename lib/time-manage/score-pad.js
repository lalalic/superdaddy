"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScorePad = exports.ACTION = undefined;

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

var _reactRedux = require("react-redux");

var _family = require("../db/family");

var _family2 = _interopRequireDefault(_family);

var _selector = require("../selector");

var _appBar = require("../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _colors = require("material-ui/styles/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(ScorePad);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9zY29yZS1wYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7SUFPTzs7O0FBRVAsSUFBSSxTQUFPLENBQVA7SUFBVSxRQUFNLElBQU47QUFDUCxJQUFNLDBCQUFPO0FBQ25CLGVBQWM7U0FBSSxvQkFBVTtBQUMzQixPQUFHLEtBQUgsRUFDQyxhQUFhLEtBQWIsRUFERDtBQUVBLFlBSDJCO0FBSTNCLFdBQU0sV0FBVyxTQUFTLE9BQU8sVUFBUCxFQUFULENBQVgsRUFBeUMsR0FBekMsQ0FBTixDQUoyQjtHQUFWO0VBQUo7QUFNYixhQUFZO1NBQUksVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUNyQyxPQUFNLFFBQU0sK0JBQWdCLFVBQWhCLENBQU4sQ0FEK0I7QUFFckMsU0FBTSxLQUFOLEdBQVksVUFBUSxNQUFNLEtBQU4sSUFBYSxDQUFiLENBQVIsQ0FGeUI7QUFHckMsZ0JBQWEsS0FBYixFQUhxQztBQUlyQyxZQUFPLENBQVAsQ0FKcUM7QUFLckMsb0JBQVMsTUFBVCxDQUFnQixLQUFoQixFQUNFLElBREYsQ0FDTztXQUFTLFNBQVMsdUJBQVMsMEJBQVUsT0FBVixFQUFrQixpQkFBUyxNQUFULENBQWxCLENBQW1DLFFBQW5DLENBQWxCO0lBQVQsQ0FEUCxDQUxxQztHQUFyQjtFQUFKO0FBUVosV0FBVSxrQkFBQyxJQUFELEVBQU8sSUFBUDtTQUFjLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDN0MsT0FBTSxRQUFNLCtCQUFnQixVQUFoQixDQUFOLENBRHVDO0FBRTdDLFNBQU0sS0FBTixHQUFZLEtBQUssR0FBTCxDQUFTLENBQUMsTUFBTSxLQUFOLElBQWEsQ0FBYixDQUFELElBQWtCLE1BQU0sSUFBTixJQUFZLENBQVosQ0FBbEIsRUFBaUMsQ0FB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QUFDQSxjQUFZLFNBQVMsSUFBVCxvQkFBWjtJQUNJLE9BSEw7Q0FEVzs7QUFRWixJQUFNLFNBQU8sU0FBUCxNQUFPLFFBQXdCO0tBQXRCO0tBQVUsMEJBQVk7O0FBQ3BDLEtBQUksZ0JBQUosQ0FEb0M7QUFFcEMsS0FBTSxNQUFJLFNBQUosR0FBSSxRQUFPO0FBQ2hCLFVBQU0sTUFBTSxJQUFOLEVBQU4sQ0FEZ0I7QUFFaEIsTUFBRyxDQUFDLEtBQUQsRUFDRixPQUREOztxQkFFb0IsTUFBTSxLQUFOLENBQVksR0FBWjs7TUFBZjtNQUFTLDhCQUpFOztBQUtoQixNQUFHO0FBQ0YsVUFBSyxTQUFTLElBQVQsQ0FBTCxDQURFO0dBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNSLFdBQVEsU0FBUixVQURRO0FBRVIsVUFGUTtHQUFSO0FBSUQsV0FBUyxPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsRUFBcUIsS0FBSyxJQUFMLENBQVUsR0FBVixDQUFyQixDQUFULEVBWGdCO0VBQVAsQ0FGMEI7QUFlcEMsUUFDQyw4QkFBQyxVQUFELElBQVksS0FBSztVQUFHLFVBQVEsQ0FBUjtHQUFIO0FBQ2hCLHFCQUFrQixJQUFsQjtBQUNBLGFBQWEsYUFBVyxFQUFYLGNBQWI7QUFDQSxVQUFRO09BQVUsY0FBUixPQUFRO1VBQVUsSUFBSSxLQUFKO0dBQXBCO0FBQ1IsYUFBVztPQUFVLGNBQVIsT0FBUTtPQUFPO1VBQVcsV0FBUyxFQUFULElBQWUsSUFBSSxLQUFKLENBQWY7R0FBNUI7QUFDWCxhQUFXLElBQVgsRUFMRCxDQURELENBZm9DO0NBQXhCOztrQkEwQkUseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QztDQUFQLENBQVIsQ0FBc0UsUUFBdEUiLCJmaWxlIjoic2NvcmUtcGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcbmltcG9ydCB7RU5USVRJRVMsIFVJLCBjb21wYWN0fSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBGYW1pbHlEQiBmcm9tIFwiLi4vZGIvZmFtaWx5XCJcclxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuLi9zZWxlY3RvclwiXHJcbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXHJcblxyXG5pbXBvcnQge1xyXG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXHJcblx0LHllbGxvdzIwMCBhcyBDT0xPUl9IT1ZFUlxyXG5cdCxsaWdodGJsdWU1MDAgYXMgQ09MT1JfRU5BQkxFRFxyXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXHJcbn0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5cclxuY29uc3Qge1RleHRGaWVsZHh9PVVJXHJcblxyXG52YXIgc2NvcmVzPTAsIHRpbWVyPW51bGxcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0QURESU5HX1NDT1JFOiAoKT0+ZGlzcGF0Y2g9PntcclxuXHRcdGlmKHRpbWVyKVxyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXMrK1xyXG5cdFx0dGltZXI9c2V0VGltZW91dChkaXNwYXRjaChBQ1RJT04uQUREX1NDT1JFUygpKSw2MDApXHJcblx0fVxyXG5cdCxBRERfU0NPUkVTOiAoKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXHJcblx0XHRjaGlsZC5zY29yZT1zY29yZXMrKGNoaWxkLnNjb3JlfHwwKVxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzPTBcclxuXHRcdEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxuXHQsQUREX1RBU0s6IChnb2FsLCB0b2RvKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXHJcblx0XHRjaGlsZC5zY29yZT1NYXRoLm1heCgoY2hpbGQuc2NvcmV8fDApLShjaGlsZC5nb2FsfHwwKSwwKVxyXG5cdFx0Y2hpbGQuZ29hbD1nb2FsXHJcblx0XHRjaGlsZC50b2RvPXRvZG9cclxuXHRcdHJldHVybiBGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBTY29yZVBhZD1cclxuKHtkaXNwYXRjaCx0b2RvLCBnb2FsPTAsdG90YWxQZXJTY3JlZW49Z29hbCwgc2NvcmU9MCwgd2lkdGg9d2luZG93LmlubmVyV2lkdGg+OTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQtNjB9KT0+e1xyXG5cdGlmKHRvdGFsUGVyU2NyZWVuPT1zY29yZSl7XHJcblx0XHR3aWR0aD13aWR0aC8yXHJcblx0XHRoZWlnaHQ9aGVpZ2h0LzJcclxuXHR9ZWxzZXtcclxuXHRcdHdpZHRoPXdpZHRoKjcvOFxyXG5cdFx0aGVpZ2h0PWhlaWdodCo3LzhcclxuXHR9XHJcblx0Y29uc3QgbGVzcz1NYXRoLm1pbih3aWR0aCxoZWlnaHQpLCBtb3JlPU1hdGgubWF4KHdpZHRoLGhlaWdodClcclxuXHRsZXQgd2lkdGhMZXNzPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobGVzcypsZXNzL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHdpZHRoTW9yZT1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKG1vcmUqbW9yZS90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCBzdHlsZT17fVxyXG5cdGlmKGxlc3M9PXdpZHRoKXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTGVzc1xyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTW9yZVxyXG5cdH1lbHNle1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhNb3JlXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhMZXNzXHJcblx0fVxyXG5cclxuXHRsZXQgc21pbGVzPVtdXHJcblx0Zm9yKGxldCBpPTA7aTx0b3RhbFBlclNjcmVlbjtpKyspXHJcblx0XHRzbWlsZXMucHVzaChcclxuXHRcdFx0PHNwYW4ga2V5PXtpfSBzdHlsZT17e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIn19PlxyXG5cdFx0XHRcdDxTbWlsZSBzdHlsZT17c3R5bGV9IHNjb3JlZD17aTxzY29yZX0gb25DbGljaz17ZT0+aT49c2NvcmUgJiYgZGlzcGF0Y2goQUNUSU9OLkFERElOR19TQ09SRSgpKX0vPlxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQpXHJcblxyXG5cdGxldCB0aXRsZT10b2RvLCBhY3Rpb249bnVsbFxyXG5cdGlmKGdvYWw9PTApe1xyXG5cdFx0dGl0bGU9XCLlvIDlp4vnrKzkuIDkuKrnm67moIdcIlxyXG5cdFx0YWN0aW9uPSg8RWRpdG9yLz4pXHJcblx0fWVsc2UgaWYoZ29hbDw9c2NvcmUpe1xyXG5cdFx0dGl0bGU9XCLlvIDlp4vkuIvkuIDkuKrnm67moIdcIlxyXG5cdFx0YWN0aW9uPSg8RWRpdG9yIGxhc3RTY29yZT17c2NvcmV9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcclxuXHR9ZWxzZVxyXG5cdFx0dGl0bGU9dG9kbztcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdDxBcHBCYXIgdGl0bGU9e3RpdGxlfS8+XHJcblx0XHRcdHthY3Rpb259XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3NtaWxlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbmNvbnN0IFNtaWxlPSh7c2NvcmVkLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDxJY29uU21pbGVcclxuXHRcdGNvbG9yPXtzY29yZWQgPyBDT0xPUl9ET05FIDogQ09MT1JfRElTQUJMRUR9XHJcblx0XHRob3ZlckNvbG9yPXtzY29yZWQgPyBudWxsIDogQ09MT1JfSE9WRVJ9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuY29uc3QgRWRpdG9yPSh7bGFzdFNjb3JlLGRpc3BhdGNofSk9PntcclxuXHRsZXQgcmVmR29hbFxyXG5cdGNvbnN0IGFkZD12YWx1ZT0+e1xyXG5cdFx0dmFsdWU9dmFsdWUudHJpbSgpXHJcblx0XHRpZighdmFsdWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IFtnb2FsLCAuLi5kZXNjXT12YWx1ZS5zcGxpdChcIjpcIilcclxuXHRcdHRyeXtcclxuXHRcdFx0Z29hbD1wYXJzZUludChnb2FsKVxyXG5cdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRyZWZHb2FsLmVycm9yVGV4dD1g5qC85byP6ZSZ6K+vYFxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGRpc3BhdGNoKEFDVElPTi5BRERfVEFTSyhnb2FsLGRlc2Muam9pbihcIjpcIikpKVxyXG5cdH1cclxuXHRyZXR1cm4gKFxyXG5cdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZHb2FsPWF9XHJcblx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi55uu5qCHXCJcclxuXHRcdFx0aGludFRleHQ9e2Ake2xhc3RTY29yZXx8MjB9OuWwj+mprOWuneiOieS5puS4gOacrGB9XHJcblx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5hZGQodmFsdWUpfVxyXG5cdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBhZGQodmFsdWUpfVxyXG5cdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHQpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoU2NvcmVQYWQpXHJcbiJdfQ==