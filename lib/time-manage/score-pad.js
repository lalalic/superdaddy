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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9zY29yZS1wYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7SUFPTzs7O0FBRVAsSUFBSSxTQUFPLENBQVA7SUFBVSxRQUFNLElBQU47QUFDUCxJQUFNLDBCQUFPO0FBQ25CLGVBQWM7U0FBSSxvQkFBVTtBQUMzQixPQUFHLEtBQUgsRUFDQyxhQUFhLEtBQWIsRUFERDtBQUVBLFlBSDJCO0FBSTNCLFdBQU0sV0FBVyxTQUFTLE9BQU8sVUFBUCxFQUFULENBQVgsRUFBeUMsR0FBekMsQ0FBTixDQUoyQjtHQUFWO0VBQUo7QUFNYixhQUFZO1NBQUksVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUNyQyxPQUFNLFFBQU0sK0JBQWdCLFVBQWhCLENBQU4sQ0FEK0I7QUFFckMsU0FBTSxLQUFOLEdBQVksVUFBUSxNQUFNLEtBQU4sSUFBYSxDQUFiLENBQVIsQ0FGeUI7QUFHckMsZ0JBQWEsS0FBYixFQUhxQztBQUlyQyxZQUFPLENBQVAsQ0FKcUM7QUFLckMsb0JBQVMsTUFBVCxDQUFnQixLQUFoQixFQUNFLElBREYsQ0FDTztXQUFTLFNBQVMsdUJBQVMsMEJBQVUsT0FBVixFQUFrQixpQkFBUyxNQUFULENBQWxCLENBQW1DLFFBQW5DLENBQWxCO0lBQVQsQ0FEUCxDQUxxQztHQUFyQjtFQUFKO0FBUVosV0FBVSxrQkFBQyxJQUFELEVBQU8sSUFBUDtTQUFjLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDN0MsT0FBTSxRQUFNLCtCQUFnQixVQUFoQixDQUFOLENBRHVDO0FBRTdDLFNBQU0sS0FBTixHQUFZLEtBQUssR0FBTCxDQUFTLENBQUMsTUFBTSxLQUFOLElBQWEsQ0FBYixDQUFELElBQWtCLE1BQU0sSUFBTixJQUFZLENBQVosQ0FBbEIsRUFBaUMsQ0FB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Q3hCO0FBQ0MsU0FBTyw0Q0FBUDtBQUNBLGNBQVksU0FBUyxJQUFULG9CQUFaO0lBQ0ksT0FITDtDQURXOztBQVFaLElBQU0sU0FBTyxTQUFQLE1BQU8sUUFBd0I7S0FBdEI7S0FBVSwwQkFBWTs7QUFDcEMsS0FBSSxnQkFBSixDQURvQztBQUVwQyxLQUFNLE1BQUksU0FBSixHQUFJLFFBQU87QUFDaEIsVUFBTSxNQUFNLElBQU4sRUFBTixDQURnQjtBQUVoQixNQUFHLENBQUMsS0FBRCxFQUNGLE9BREQ7O3FCQUVvQixNQUFNLEtBQU4sQ0FBWSxHQUFaOztNQUFmO01BQVMsOEJBSkU7O0FBS2hCLE1BQUc7QUFDRixVQUFLLFNBQVMsSUFBVCxDQUFMLENBREU7R0FBSCxDQUVDLE9BQU0sQ0FBTixFQUFRO0FBQ1IsV0FBUSxTQUFSLFVBRFE7QUFFUixVQUZRO0dBQVI7QUFJRCxXQUFTLE9BQU8sUUFBUCxDQUFnQixJQUFoQixFQUFxQixLQUFLLElBQUwsQ0FBVSxHQUFWLENBQXJCLENBQVQsRUFYZ0I7RUFBUCxDQUYwQjtBQWVwQyxRQUNDLDhCQUFDLFVBQUQsSUFBWSxLQUFLO1VBQUcsVUFBUSxDQUFSO0dBQUg7QUFDaEIscUJBQWtCLElBQWxCO0FBQ0EsYUFBYSxhQUFXLEVBQVgsY0FBYjtBQUNBLFVBQVE7T0FBVSxjQUFSLE9BQVE7VUFBVSxJQUFJLEtBQUo7R0FBcEI7QUFDUixhQUFXO09BQVUsY0FBUixPQUFRO09BQU87VUFBVyxXQUFTLEVBQVQsSUFBZSxJQUFJLEtBQUosQ0FBZjtHQUE1QjtBQUNYLGFBQVcsSUFBWCxFQUxELENBREQsQ0Fmb0M7Q0FBeEI7O2tCQTBCRSx5QkFBUTtRQUFPLHNCQUFRLCtCQUFnQixLQUFoQixDQUFSLEVBQStCLE9BQS9CLEVBQXVDLE1BQXZDLEVBQThDLE1BQTlDO0NBQVAsQ0FBUixDQUFzRSxRQUF0RSIsImZpbGUiOiJzY29yZS1wYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuaW1wb3J0IHtFTlRJVElFUywgVUksIGNvbXBhY3R9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuLi9kYi9mYW1pbHlcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcclxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Ymx1ZTUwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbnZhciBzY29yZXM9MCwgdGltZXI9bnVsbFxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBRERJTkdfU0NPUkU6ICgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYodGltZXIpXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3JlcysrXHJcblx0XHR0aW1lcj1zZXRUaW1lb3V0KGRpc3BhdGNoKEFDVElPTi5BRERfU0NPUkVTKCkpLDYwMClcclxuXHR9XHJcblx0LEFERF9TQ09SRVM6ICgpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPXNjb3JlcysoY2hpbGQuc2NvcmV8fDApXHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXM9MFxyXG5cdFx0RmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG5cdCxBRERfVEFTSzogKGdvYWwsIHRvZG8pPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPU1hdGgubWF4KChjaGlsZC5zY29yZXx8MCktKGNoaWxkLmdvYWx8fDApLDApXHJcblx0XHRjaGlsZC5nb2FsPWdvYWxcclxuXHRcdGNoaWxkLnRvZG89dG9kb1xyXG5cdFx0cmV0dXJuIEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNjb3JlUGFkPVxyXG4oe2Rpc3BhdGNoLHRvZG8sIGdvYWw9MCx0b3RhbFBlclNjcmVlbj1nb2FsLCBzY29yZT0wLCB3aWR0aD13aW5kb3cuaW5uZXJXaWR0aD45NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodC02MH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfSBvbkNsaWNrPXtlPT5pPj1zY29yZSAmJiBkaXNwYXRjaChBQ1RJT04uQURESU5HX1NDT1JFKCkpfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0bGV0IHRpdGxlPXRvZG8sIGFjdGlvbj1udWxsXHJcblx0aWYoZ29hbD09MCl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+esrOS4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IgZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxyXG5cdH1lbHNlIGlmKGdvYWw8PXNjb3JlKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL5LiL5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBsYXN0U2NvcmU9e3Njb3JlfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0fWVsc2VcclxuXHRcdHRpdGxlPXRvZG87XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHQ8QXBwQmFyIHRpdGxlPXt0aXRsZX0vPlxyXG5cdFx0XHR7YWN0aW9ufVxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHtzbWlsZXN9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5jb25zdCBTbWlsZT0oe3Njb3JlZCwgLi4ub3RoZXJzfSk9PihcclxuXHQ8SWNvblNtaWxlXHJcblx0XHRjb2xvcj17c2NvcmVkID8gQ09MT1JfRE9ORSA6IENPTE9SX0RJU0FCTEVEfVxyXG5cdFx0aG92ZXJDb2xvcj17c2NvcmVkID8gbnVsbCA6IENPTE9SX0hPVkVSfVxyXG5cdFx0ey4uLm90aGVyc31cclxuXHRcdC8+XHJcbilcclxuXHJcbmNvbnN0IEVkaXRvcj0oe2xhc3RTY29yZSxkaXNwYXRjaH0pPT57XHJcblx0bGV0IHJlZkdvYWxcclxuXHRjb25zdCBhZGQ9dmFsdWU9PntcclxuXHRcdHZhbHVlPXZhbHVlLnRyaW0oKVxyXG5cdFx0aWYoIXZhbHVlKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdGxldCBbZ29hbCwgLi4uZGVzY109dmFsdWUuc3BsaXQoXCI6XCIpXHJcblx0XHR0cnl7XHJcblx0XHRcdGdvYWw9cGFyc2VJbnQoZ29hbClcclxuXHRcdH1jYXRjaChlKXtcclxuXHRcdFx0cmVmR29hbC5lcnJvclRleHQ9YOagvOW8j+mUmeivr2BcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRkaXNwYXRjaChBQ1RJT04uQUREX1RBU0soZ29hbCxkZXNjLmpvaW4oXCI6XCIpKSlcclxuXHR9XHJcblx0cmV0dXJuIChcclxuXHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmR29hbD1hfVxyXG5cdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuebruagh1wiXHJcblx0XHRcdGhpbnRUZXh0PXtgJHtsYXN0U2NvcmV8fDIwfTrlsI/pqazlrp3ojonkuabkuIDmnKxgfVxyXG5cdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+YWRkKHZhbHVlKX1cclxuXHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgYWRkKHZhbHVlKX1cclxuXHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKFNjb3JlUGFkKVxyXG4iXX0=