"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScorePad = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _reactRedux = require("react-redux");

var _appBar = require("./app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _ = require(".");

var _colors = require("material-ui/styles/colors");

var _selector = require("../../selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextFieldx = _qiliApp.UI.TextFieldx;
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
	for (var i = 0; i < totalPerScreen; i++) {
		smiles.push(_react2.default.createElement(
			"span",
			{ key: i, style: { display: "inline-block" } },
			_react2.default.createElement(Smile, { style: style, scored: i < score })
		));
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
	    others = _objectWithoutProperties(_ref2, ["scored"]);

	return _react2.default.createElement(_mood2.default, _extends({
		color: scored ? _colors.yellow500 : _colors.grey300
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
		    _value$split2 = _toArray(_value$split),
		    goal = _value$split2[0],
		    desc = _value$split2.slice(1);

		try {
			goal = parseInt(goal);
		} catch (e) {
			refGoal.errorText = "\u683C\u5F0F\u9519\u8BEF";
			return;
		}
		dispatch(_.ACTION.SET_GOAL(goal, desc.join(":")));
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
	return (0, _qiliApp.compact)((0, _selector.getCurrentUser)(state), "score", "goal", "todo");
})(ScorePad);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9wYXBhL3Njb3JlLXBhZC5qcyJdLCJuYW1lcyI6WyJUZXh0RmllbGR4IiwiU2NvcmVQYWQiLCJkaXNwYXRjaCIsInRvZG8iLCJnb2FsIiwidG90YWxQZXJTY3JlZW4iLCJzY29yZSIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImhlaWdodCIsImlubmVySGVpZ2h0IiwibGVzcyIsIk1hdGgiLCJtaW4iLCJtb3JlIiwibWF4Iiwid2lkdGhMZXNzIiwiZmxvb3IiLCJzcXJ0Iiwid2lkdGhNb3JlIiwic3R5bGUiLCJzbWlsZXMiLCJpIiwicHVzaCIsImRpc3BsYXkiLCJ0aXRsZSIsImFjdGlvbiIsIlNtaWxlIiwic2NvcmVkIiwib3RoZXJzIiwiRWRpdG9yIiwibGFzdFNjb3JlIiwicmVmR29hbCIsImFkZCIsInZhbHVlIiwidHJpbSIsInNwbGl0IiwiZGVzYyIsInBhcnNlSW50IiwiZSIsImVycm9yVGV4dCIsIlNFVF9HT0FMIiwiam9pbiIsImEiLCJ0YXJnZXQiLCJrZXlDb2RlIiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOztBQUVBOztBQTRGQTs7Ozs7Ozs7SUFyRk9BLFUsZUFBQUEsVTtBQUVBLElBQU1DLDhCQUNiLFNBRGFBLFFBQ2IsT0FBNkk7QUFBQSxLQUEzSUMsUUFBMkksUUFBM0lBLFFBQTJJO0FBQUEsS0FBbElDLElBQWtJLFFBQWxJQSxJQUFrSTtBQUFBLHNCQUE1SEMsSUFBNEg7QUFBQSxLQUE1SEEsSUFBNEgsNkJBQXZILENBQXVIO0FBQUEsZ0NBQXJIQyxjQUFxSDtBQUFBLEtBQXJIQSxjQUFxSCx1Q0FBdEdELElBQXNHO0FBQUEsdUJBQWhHRSxLQUFnRztBQUFBLEtBQWhHQSxLQUFnRyw4QkFBMUYsQ0FBMEY7QUFBQSx1QkFBdkZDLEtBQXVGO0FBQUEsS0FBdkZBLEtBQXVGLDhCQUFqRkMs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QUEsTUFJRmtDLElBSkU7O0FBS2hCLE1BQUc7QUFDRmxDLFVBQUttQyxTQUFTbkMsSUFBVCxDQUFMO0FBQ0EsR0FGRCxDQUVDLE9BQU1vQyxDQUFOLEVBQVE7QUFDUlAsV0FBUVEsU0FBUjtBQUNBO0FBQ0E7QUFDRHZDLFdBQVMsU0FBT3dDLFFBQVAsQ0FBZ0J0QyxJQUFoQixFQUFxQmtDLEtBQUtLLElBQUwsQ0FBVSxHQUFWLENBQXJCLENBQVQ7QUFDQSxFQVpEO0FBYUEsUUFDQyw4QkFBQyxVQUFELElBQVksS0FBSztBQUFBLFVBQUdWLFVBQVFXLENBQVg7QUFBQSxHQUFqQjtBQUNDLHFCQUFrQixjQURuQjtBQUVDLGFBQWFaLGFBQVcsRUFBeEIsaURBRkQ7QUFHQyxVQUFRO0FBQUEsT0FBVUcsS0FBVixTQUFFVSxNQUFGLENBQVVWLEtBQVY7QUFBQSxVQUFvQkQsSUFBSUMsS0FBSixDQUFwQjtBQUFBLEdBSFQ7QUFJQyxhQUFXO0FBQUEsT0FBVUEsS0FBVixTQUFFVSxNQUFGLENBQVVWLEtBQVY7QUFBQSxPQUFpQlcsT0FBakIsU0FBaUJBLE9BQWpCO0FBQUEsVUFBNEJBLFdBQVMsRUFBVCxJQUFlWixJQUFJQyxLQUFKLENBQTNDO0FBQUEsR0FKWjtBQUtDLGFBQVcsSUFMWixHQUREO0FBUUEsQ0F2QkQ7O2tCQTJCZSx5QkFBUTtBQUFBLFFBQU8sc0JBQVEsOEJBQWdCWSxLQUFoQixDQUFSLEVBQStCLE9BQS9CLEVBQXVDLE1BQXZDLEVBQThDLE1BQTlDLENBQVA7QUFBQSxDQUFSLEVBQXNFOUMsUUFBdEUsQyIsImZpbGUiOiJzY29yZS1wYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuaW1wb3J0IHtFTlRJVElFUywgVUksIGNvbXBhY3R9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi9hcHAtYmFyXCJcclxuXHJcbmltcG9ydCB7QUNUSU9OfSBmcm9tIFwiLlwiXHJcblxyXG5pbXBvcnQge1xyXG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXHJcblx0LHllbGxvdzIwMCBhcyBDT0xPUl9IT1ZFUlxyXG5cdCxsaWdodGJsdWU1MDAgYXMgQ09MT1JfRU5BQkxFRFxyXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXHJcbn0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5cclxuY29uc3Qge1RleHRGaWVsZHh9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgU2NvcmVQYWQ9XHJcbih7ZGlzcGF0Y2gsdG9kbywgZ29hbD0wLHRvdGFsUGVyU2NyZWVuPWdvYWwsIHNjb3JlPTAsIHdpZHRoPXdpbmRvdy5pbm5lcldpZHRoPjk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0LTYwfSk9PntcclxuXHRpZih0b3RhbFBlclNjcmVlbj09c2NvcmUpe1xyXG5cdFx0d2lkdGg9d2lkdGgvMlxyXG5cdFx0aGVpZ2h0PWhlaWdodC8yXHJcblx0fWVsc2V7XHJcblx0XHR3aWR0aD13aWR0aCo3LzhcclxuXHRcdGhlaWdodD1oZWlnaHQqNy84XHJcblx0fVxyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IHdpZHRoTGVzcz1NYXRoLmZsb29yKE1hdGguc3FydChNYXRoLmZsb29yKGxlc3MqbGVzcy90b3RhbFBlclNjcmVlbikpKVxyXG5cdGxldCB3aWR0aE1vcmU9TWF0aC5mbG9vcihNYXRoLnNxcnQoTWF0aC5mbG9vcihtb3JlKm1vcmUvdG90YWxQZXJTY3JlZW4pKSlcclxuXHRsZXQgc3R5bGU9e31cclxuXHRpZihsZXNzPT13aWR0aCl7XHJcblx0XHRzdHlsZS53aWR0aD13aWR0aExlc3NcclxuXHRcdHN0eWxlLmhlaWdodD13aWR0aE1vcmVcclxuXHR9ZWxzZXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTW9yZVxyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTGVzc1xyXG5cdH1cclxuXHJcblx0bGV0IHNtaWxlcz1bXVxyXG5cdGZvcihsZXQgaT0wO2k8dG90YWxQZXJTY3JlZW47aSsrKVxyXG5cdFx0c21pbGVzLnB1c2goXHJcblx0XHRcdDxzcGFuIGtleT17aX0gc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9fT5cclxuXHRcdFx0XHQ8U21pbGUgc3R5bGU9e3N0eWxlfSBzY29yZWQ9e2k8c2NvcmV9Lz5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0KVxyXG5cclxuXHRsZXQgdGl0bGU9dG9kbywgYWN0aW9uPW51bGxcclxuXHRpZihnb2FsPT0wKXtcclxuXHRcdHRpdGxlPVwi5byA5aeL56ys5LiA5Liq55uu5qCHXCJcclxuXHRcdGFjdGlvbj0oPEVkaXRvciBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0fWVsc2UgaWYoZ29hbDw9c2NvcmUpe1xyXG5cdFx0dGl0bGU9XCLlvIDlp4vkuIvkuIDkuKrnm67moIdcIlxyXG5cdFx0YWN0aW9uPSg8RWRpdG9yIGxhc3RTY29yZT17c2NvcmV9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcclxuXHR9ZWxzZVxyXG5cdFx0dGl0bGU9dG9kbztcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdDxBcHBCYXIgdGl0bGU9e3RpdGxlfS8+XHJcblx0XHRcdHthY3Rpb259XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3NtaWxlc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbmNvbnN0IFNtaWxlPSh7c2NvcmVkLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDxJY29uU21pbGVcclxuXHRcdGNvbG9yPXtzY29yZWQgPyBDT0xPUl9ET05FIDogQ09MT1JfRElTQUJMRUR9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuY29uc3QgRWRpdG9yPSh7bGFzdFNjb3JlLGRpc3BhdGNofSk9PntcclxuXHRsZXQgcmVmR29hbFxyXG5cdGNvbnN0IGFkZD12YWx1ZT0+e1xyXG5cdFx0dmFsdWU9dmFsdWUudHJpbSgpXHJcblx0XHRpZighdmFsdWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IFtnb2FsLCAuLi5kZXNjXT12YWx1ZS5zcGxpdChcIjpcIilcclxuXHRcdHRyeXtcclxuXHRcdFx0Z29hbD1wYXJzZUludChnb2FsKVxyXG5cdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRyZWZHb2FsLmVycm9yVGV4dD1g5qC85byP6ZSZ6K+vYFxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGRpc3BhdGNoKEFDVElPTi5TRVRfR09BTChnb2FsLGRlc2Muam9pbihcIjpcIikpKVxyXG5cdH1cclxuXHRyZXR1cm4gKFxyXG5cdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZHb2FsPWF9XHJcblx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi55uu5qCHXCJcclxuXHRcdFx0aGludFRleHQ9e2Ake2xhc3RTY29yZXx8MjB9OuWwj+mprOWuneiOieS5puS4gOacrGB9XHJcblx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5hZGQodmFsdWUpfVxyXG5cdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiBhZGQodmFsdWUpfVxyXG5cdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHQpXHJcbn1cclxuXHJcblxyXG5pbXBvcnQge2dldEN1cnJlbnRVc2VyIGFzIGdldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKFNjb3JlUGFkKVxyXG4iXX0=