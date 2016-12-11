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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9zY29yZS1wYWQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsInNjb3JlcyIsInRpbWVyIiwiQUNUSU9OIiwiQURESU5HX1NDT1JFIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRpc3BhdGNoIiwiQUREX1NDT1JFUyIsImdldFN0YXRlIiwiY2hpbGQiLCJzY29yZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBRERfVEFTSyIsImdvYWwiLCJ0b2RvIiwiTWF0aCIsIm1heCIsIlNjb3JlUGFkIiwidG90YWxQZXJTY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxlc3MiLCJtaW4iLCJtb3JlIiwid2lkdGhMZXNzIiwiZmxvb3IiLCJzcXJ0Iiwid2lkdGhNb3JlIiwic3R5bGUiLCJzbWlsZXMiLCJpIiwicHVzaCIsImRpc3BsYXkiLCJ0aXRsZSIsImFjdGlvbiIsIlNtaWxlIiwic2NvcmVkIiwib3RoZXJzIiwiRWRpdG9yIiwibGFzdFNjb3JlIiwicmVmR29hbCIsImFkZCIsInZhbHVlIiwidHJpbSIsInNwbGl0IiwiZGVzYyIsInBhcnNlSW50IiwiZSIsImVycm9yVGV4dCIsImpvaW4iLCJhIiwidGFyZ2V0Iiwia2V5Q29kZSIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztJQU9PQSxVLGVBQUFBLFU7OztBQUVQLElBQUlDLFNBQU8sQ0FBWDtBQUFBLElBQWNDLFFBQU0sSUFBcEI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsZUFBYztBQUFBLFNBQUksb0JBQVU7QUFDM0IsT0FBR0YsS0FBSCxFQUNDRyxhQUFhSCxLQUFiO0FBQ0REO0FBQ0FDLFdBQU1JLFdBQVdD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QUEsR0FKWjtBQUtDLGFBQVcsSUFMWixHQUREO0FBUUEsQ0F2QkQ7O2tCQTBCZSx5QkFBUTtBQUFBLFFBQU8sc0JBQVEsK0JBQWdCVyxLQUFoQixDQUFSLEVBQStCLE9BQS9CLEVBQXVDLE1BQXZDLEVBQThDLE1BQTlDLENBQVA7QUFBQSxDQUFSLEVBQXNFdkMsUUFBdEUsQyIsImZpbGUiOiJzY29yZS1wYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuaW1wb3J0IHtFTlRJVElFUywgVUksIGNvbXBhY3R9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuLi9kYi9mYW1pbHlcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcclxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Ymx1ZTUwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5jb25zdCB7VGV4dEZpZWxkeH09VUlcclxuXHJcbnZhciBzY29yZXM9MCwgdGltZXI9bnVsbFxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBRERJTkdfU0NPUkU6ICgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYodGltZXIpXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3JlcysrXHJcblx0XHR0aW1lcj1zZXRUaW1lb3V0KGRpc3BhdGNoKEFDVElPTi5BRERfU0NPUkVTKCkpLDYwMClcclxuXHR9XHJcblx0LEFERF9TQ09SRVM6ICgpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPXNjb3JlcysoY2hpbGQuc2NvcmV8fDApXHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIpXHJcblx0XHRzY29yZXM9MFxyXG5cdFx0RmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG5cdCxBRERfVEFTSzogKGdvYWwsIHRvZG8pPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcclxuXHRcdGNoaWxkLnNjb3JlPU1hdGgubWF4KChjaGlsZC5zY29yZXx8MCktKGNoaWxkLmdvYWx8fDApLDApXHJcblx0XHRjaGlsZC5nb2FsPWdvYWxcclxuXHRcdGNoaWxkLnRvZG89dG9kb1xyXG5cdFx0cmV0dXJuIEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNjb3JlUGFkPVxyXG4oe2Rpc3BhdGNoLHRvZG8sIGdvYWw9MCx0b3RhbFBlclNjcmVlbj1nb2FsLCBzY29yZT0wLCB3aWR0aD13aW5kb3cuaW5uZXJXaWR0aD45NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodC02MH0pPT57XHJcblx0aWYodG90YWxQZXJTY3JlZW49PXNjb3JlKXtcclxuXHRcdHdpZHRoPXdpZHRoLzJcclxuXHRcdGhlaWdodD1oZWlnaHQvMlxyXG5cdH1lbHNle1xyXG5cdFx0d2lkdGg9d2lkdGgqNy84XHJcblx0XHRoZWlnaHQ9aGVpZ2h0KjcvOFxyXG5cdH1cclxuXHRjb25zdCBsZXNzPU1hdGgubWluKHdpZHRoLGhlaWdodCksIG1vcmU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KVxyXG5cdGxldCB3aWR0aExlc3M9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihsZXNzKmxlc3MvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgd2lkdGhNb3JlPU1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGguZmxvb3IobW9yZSptb3JlL3RvdGFsUGVyU2NyZWVuKSkpXHJcblx0bGV0IHN0eWxlPXt9XHJcblx0aWYobGVzcz09d2lkdGgpe1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhMZXNzXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhNb3JlXHJcblx0fWVsc2V7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aE1vcmVcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aExlc3NcclxuXHR9XHJcblxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfSBvbkNsaWNrPXtlPT5pPj1zY29yZSAmJiBkaXNwYXRjaChBQ1RJT04uQURESU5HX1NDT1JFKCkpfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHJcblx0bGV0IHRpdGxlPXRvZG8sIGFjdGlvbj1udWxsXHJcblx0aWYoZ29hbD09MCl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+esrOS4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IvPilcclxuXHR9ZWxzZSBpZihnb2FsPD1zY29yZSl7XHJcblx0XHR0aXRsZT1cIuW8gOWni+S4i+S4gOS4quebruagh1wiXHJcblx0XHRhY3Rpb249KDxFZGl0b3IgbGFzdFNjb3JlPXtzY29yZX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxyXG5cdH1lbHNlXHJcblx0XHR0aXRsZT10b2RvO1xyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PEFwcEJhciB0aXRsZT17dGl0bGV9Lz5cclxuXHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7c21pbGVzfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZVxyXG5cdFx0Y29sb3I9e3Njb3JlZCA/IENPTE9SX0RPTkUgOiBDT0xPUl9ESVNBQkxFRH1cclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBDT0xPUl9IT1ZFUn1cclxuXHRcdHsuLi5vdGhlcnN9XHJcblx0XHQvPlxyXG4pXHJcblxyXG5jb25zdCBFZGl0b3I9KHtsYXN0U2NvcmUsZGlzcGF0Y2h9KT0+e1xyXG5cdGxldCByZWZHb2FsXHJcblx0Y29uc3QgYWRkPXZhbHVlPT57XHJcblx0XHR2YWx1ZT12YWx1ZS50cmltKClcclxuXHRcdGlmKCF2YWx1ZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgW2dvYWwsIC4uLmRlc2NdPXZhbHVlLnNwbGl0KFwiOlwiKVxyXG5cdFx0dHJ5e1xyXG5cdFx0XHRnb2FsPXBhcnNlSW50KGdvYWwpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJlZkdvYWwuZXJyb3JUZXh0PWDmoLzlvI/plJnor69gXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkFERF9UQVNLKGdvYWwsZGVzYy5qb2luKFwiOlwiKSkpXHJcblx0fVxyXG5cdHJldHVybiAoXHJcblx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZkdvYWw9YX1cclxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLnm67moIdcIlxyXG5cdFx0XHRoaW50VGV4dD17YCR7bGFzdFNjb3JlfHwyMH065bCP6ams5a6d6I6J5Lmm5LiA5pysYH1cclxuXHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmFkZCh2YWx1ZSl9XHJcblx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGFkZCh2YWx1ZSl9XHJcblx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKShTY29yZVBhZClcclxuIl19