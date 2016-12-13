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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9zY29yZS1wYWQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsInNjb3JlcyIsInRpbWVyIiwiQUNUSU9OIiwiQURESU5HX1NDT1JFIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRpc3BhdGNoIiwiQUREX1NDT1JFUyIsImdldFN0YXRlIiwiY2hpbGQiLCJzY29yZSIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBRERfVEFTSyIsImdvYWwiLCJ0b2RvIiwiTWF0aCIsIm1heCIsIlNjb3JlUGFkIiwidG90YWxQZXJTY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImxlc3MiLCJtaW4iLCJtb3JlIiwid2lkdGhMZXNzIiwiZmxvb3IiLCJzcXJ0Iiwid2lkdGhNb3JlIiwic3R5bGUiLCJzbWlsZXMiLCJpIiwicHVzaCIsImRpc3BsYXkiLCJ0aXRsZSIsImFjdGlvbiIsIlNtaWxlIiwic2NvcmVkIiwib3RoZXJzIiwiRWRpdG9yIiwibGFzdFNjb3JlIiwicmVmR29hbCIsImFkZCIsInZhbHVlIiwidHJpbSIsInNwbGl0IiwiZGVzYyIsInBhcnNlSW50IiwiZSIsImVycm9yVGV4dCIsImpvaW4iLCJhIiwidGFyZ2V0Iiwia2V5Q29kZSIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztJQU9PQSxVLGVBQUFBLFU7OztBQUVQLElBQUlDLFNBQU8sQ0FBWDtBQUFBLElBQWNDLFFBQU0sSUFBcEI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsZUFBYztBQUFBLFNBQUksb0JBQVU7QUFDM0IsT0FBR0YsS0FBSCxFQUNDRyxhQUFhSCxLQUFiO0FBQ0REO0FBQ0FDLFdBQU1JLFdBQVdD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QUlDLEtBQUosQ0FBM0M7QUFBQSxHQUpaO0FBS0MsYUFBVyxJQUxaLEdBREQ7QUFRQSxDQXZCRDs7a0JBMEJlLHlCQUFRO0FBQUEsUUFBTyxzQkFBUSwrQkFBZ0JXLEtBQWhCLENBQVIsRUFBK0IsT0FBL0IsRUFBdUMsTUFBdkMsRUFBOEMsTUFBOUMsQ0FBUDtBQUFBLENBQVIsRUFBc0V2QyxRQUF0RSxDIiwiZmlsZSI6InNjb3JlLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTLCBVSSwgY29tcGFjdH0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgRmFtaWx5REIgZnJvbSBcIi4uL2RiL2ZhbWlseVwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxyXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi9jb21wb25lbnRzL2FwcC1iYXJcIlxyXG5cclxuaW1wb3J0IHtcclxuXHR5ZWxsb3c1MDAgYXMgQ09MT1JfRE9ORVxyXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcclxuXHQsbGlnaHRibHVlNTAwIGFzIENPTE9SX0VOQUJMRURcclxuXHQsZ3JleTMwMCBhcyBDT0xPUl9ESVNBQkxFRFxyXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcclxuXHJcbmNvbnN0IHtUZXh0RmllbGR4fT1VSVxyXG5cclxudmFyIHNjb3Jlcz0wLCB0aW1lcj1udWxsXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEFERElOR19TQ09SRTogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRpZih0aW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmVzKytcclxuXHRcdHRpbWVyPXNldFRpbWVvdXQoZGlzcGF0Y2goQUNUSU9OLkFERF9TQ09SRVMoKSksNjAwKVxyXG5cdH1cclxuXHQsQUREX1NDT1JFUzogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9c2NvcmVzKyhjaGlsZC5zY29yZXx8MClcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3Jlcz0wXHJcblx0XHRGYW1pbHlEQi51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseURCLnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHR9XHJcblx0LEFERF9UQVNLOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmU9TWF0aC5tYXgoKGNoaWxkLnNjb3JlfHwwKS0oY2hpbGQuZ29hbHx8MCksMClcclxuXHRcdGNoaWxkLmdvYWw9Z29hbFxyXG5cdFx0Y2hpbGQudG9kbz10b2RvXHJcblx0XHRyZXR1cm4gRmFtaWx5REIudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHlEQi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU2NvcmVQYWQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIHdpZHRoPXdpbmRvdy5pbm5lcldpZHRoPjk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0LTYwfSk9PntcclxuXHRpZih0b3RhbFBlclNjcmVlbj09c2NvcmUpe1xyXG5cdFx0d2lkdGg9d2lkdGgvMlxyXG5cdFx0aGVpZ2h0PWhlaWdodC8yXHJcblx0fWVsc2V7XHJcblx0XHR3aWR0aD13aWR0aCo3LzhcclxuXHRcdGhlaWdodD1oZWlnaHQqNy84XHJcblx0fVxyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IHdpZHRoTGVzcz1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKGxlc3MqbGVzcy90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCB3aWR0aE1vcmU9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihtb3JlKm1vcmUvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgc3R5bGU9e31cclxuXHRpZihsZXNzPT13aWR0aCl7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aExlc3NcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aE1vcmVcclxuXHR9ZWxzZXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTW9yZVxyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTGVzc1xyXG5cdH1cclxuXHJcblx0bGV0IHNtaWxlcz1bXVxyXG5cdGZvcihsZXQgaT0wO2k8dG90YWxQZXJTY3JlZW47aSsrKVxyXG5cdFx0c21pbGVzLnB1c2goXHJcblx0XHRcdDxzcGFuIGtleT17aX0gc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9fT5cclxuXHRcdFx0XHQ8U21pbGUgc3R5bGU9e3N0eWxlfSBzY29yZWQ9e2k8c2NvcmV9IG9uQ2xpY2s9e2U9Pmk+PXNjb3JlICYmIGRpc3BhdGNoKEFDVElPTi5BRERJTkdfU0NPUkUoKSl9Lz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KVxyXG5cclxuXHRsZXQgdGl0bGU9dG9kbywgYWN0aW9uPW51bGxcclxuXHRpZihnb2FsPT0wKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL56ys5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0fWVsc2UgaWYoZ29hbDw9c2NvcmUpe1xyXG5cdFx0dGl0bGU9XCLlvIDlp4vkuIvkuIDkuKrnm67moIdcIlxyXG5cdFx0YWN0aW9uPSg8RWRpdG9yIGxhc3RTY29yZT17c2NvcmV9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcclxuXHR9ZWxzZVxyXG5cdFx0dGl0bGU9dG9kbztcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdDxBcHBCYXIgdGl0bGU9e3RpdGxlfS8+XHJcblx0XHRcdHthY3Rpb259XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3NtaWxlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbmNvbnN0IFNtaWxlPSh7c2NvcmVkLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDxJY29uU21pbGVcclxuXHRcdGNvbG9yPXtzY29yZWQgPyBDT0xPUl9ET05FIDogQ09MT1JfRElTQUJMRUR9XHJcblx0XHRob3ZlckNvbG9yPXtzY29yZWQgPyBudWxsIDogQ09MT1JfSE9WRVJ9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuY29uc3QgRWRpdG9yPSh7bGFzdFNjb3JlLGRpc3BhdGNofSk9PntcclxuXHRsZXQgcmVmR29hbFxyXG5cdGNvbnN0IGFkZD12YWx1ZT0+e1xyXG5cdFx0dmFsdWU9dmFsdWUudHJpbSgpXHJcblx0XHRpZighdmFsdWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IFtnb2FsLCAuLi5kZXNjXT12YWx1ZS5zcGxpdChcIjpcIilcclxuXHRcdHRyeXtcclxuXHRcdFx0Z29hbD1wYXJzZUludChnb2FsKVxyXG5cdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRyZWZHb2FsLmVycm9yVGV4dD1g5qC85byP6ZSZ6K+vYFxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGRpc3BhdGNoKEFDVElPTi5BRERfVEFTSyhnb2FsLGRlc2Muam9pbihcIjpcIikpKVxyXG5cdH1cclxuXHRyZXR1cm4gKFxyXG5cdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZHb2FsPWF9XHJcblx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi55uu5qCHXCJcclxuXHRcdFx0aGludFRleHQ9e2Ake2xhc3RTY29yZXx8MjB9OuWwj+mprOWuneiOieS5puS4gOacrGB9XHJcblx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5hZGQodmFsdWUpfVxyXG5cdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBhZGQodmFsdWUpfVxyXG5cdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHQpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoU2NvcmVQYWQpXHJcbiJdfQ==