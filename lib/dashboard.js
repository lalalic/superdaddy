"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dashboard = exports.REDUCER = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _qiliApp = require("qili-app");

var _family = require("./db/family");

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var currentChild = function currentChild(state) {
	try {
		return state.entities[Family._name][state[DOMAIN].child];
	} catch (e) {
		return {
			name: "_default"
		};
	}
};

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
	ADD_SCORE: function ADD_SCORE() {
		return function (dispatch, getState) {
			var child = currentChild(getState());
			child.score += scores;
			clearTimeout(timer);
			score = 0;
			return _family2.default.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)(normalize(updated, _family2.default.schema).entities));
			});
		};
	}
};

var REDUCER = exports.REDUCER = function REDUCER(state, _ref) {
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/added":

	}
	return state;
};

var Dashboard = exports.Dashboard = function Dashboard(_ref2) {
	var _ref2$totalPerScreen = _ref2.totalPerScreen;
	var totalPerScreen = _ref2$totalPerScreen === undefined ? 20 : _ref2$totalPerScreen;
	var _ref2$score = _ref2.score;
	var score = _ref2$score === undefined ? 0 : _ref2$score;
	var _ref2$width = _ref2.width;
	var width = _ref2$width === undefined ? window.innerWidth > 960 ? 960 : window.innerWidth : _ref2$width;
	var _ref2$height = _ref2.height;
	var height = _ref2$height === undefined ? window.innerHeight : _ref2$height;

	var less = Math.min(width, height),
	    more = Math.max(width, height);
	var countLess = Math.floor(less * totalPerScreen / (width + height));
	var countMore = totalPerScreen - countLess;
	var widthLess = Math.floor(less / countLess);
	var widthMore = Math.floor(more / countMore);
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
		smiles
	);
};

var Smile = function Smile(_ref3) {
	var scored = _ref3.scored;

	var others = _objectWithoutProperties(_ref3, ["scored"]);

	return _react2.default.createElement(_mood2.default, _extends({
		color: scored ? "yellow" : "lightgray",
		hoverColor: scored ? null : "lightyellow"
	}, others));
};

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,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OEJBQUMsS0FBRCxJQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsSUFBRSxLQUFGLEVBQVMsU0FBUztZQUFHLEtBQUcsS0FBSCxJQUFZLFNBQVMsT0FBTyxZQUFQLEVBQVQsQ0FBWjtLQUFILEVBQS9DLENBREQ7R0FERDtHQWpCdUk7O0FBZ0J4SSxNQUFJLElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxjQUFGLEVBQWlCLEdBQTdCO1FBQVE7RUFBUixPQVFDOzs7RUFDRSxNQURGO0VBREQsQ0F2QndJO0NBQWxIOztBQThCdkIsSUFBTSxRQUFNLFNBQU4sS0FBTTtLQUFFOztLQUFXOztRQUN4QjtBQUNDLFNBQU8sU0FBUyxRQUFULEdBQW1CLFdBQW5CO0FBQ1AsY0FBWSxTQUFTLElBQVQsR0FBZ0IsYUFBaEI7SUFDUixPQUhMO0NBRFc7O2tCQVFHIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5pbXBvcnQge0VOVElUSUVTfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IEZhbWlseURCIGZyb20gXCIuL2RiL2ZhbWlseVwiXHJcblxyXG5jb25zdCBjdXJyZW50Q2hpbGQ9c3RhdGU9PntcclxuXHR0cnl7XHJcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXNbRmFtaWx5Ll9uYW1lXVtzdGF0ZVtET01BSU5dLmNoaWxkXVxyXG5cdH1jYXRjaChlKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5hbWU6XCJfZGVmYXVsdFwiXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBET01BSU49XCJzY29yZVwiXHJcbnZhciBzY29yZXM9MCwgdGltZXI9bnVsbFxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBRERJTkdfU0NPUkU6ICgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYodGltZXIpXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lcilcclxuXHRcdHNjb3JlcysrXHJcblx0XHR0aW1lcj1zZXRUaW1lb3V0KGRpc3BhdGNoKEFDVElPTi5BRERfU0NPUkVTKCkpLDYwMClcclxuXHR9XHJcblx0LEFERF9TQ09SRTogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IGNoaWxkPWN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0Y2hpbGQuc2NvcmUrPXNjb3Jlc1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxyXG5cdFx0c2NvcmU9MFxyXG5cdFx0cmV0dXJuIEZhbWlseURCLnVwc2VydChjaGlsZClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5REIuc2NoZW1hKS5lbnRpdGllcykpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlLHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9hZGRlZGA6XHJcblx0XHRcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcblx0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9KHt0b3RhbFBlclNjcmVlbj0yMCwgc2NvcmU9MCwgd2lkdGg9d2luZG93LmlubmVyV2lkdGg+OTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHR9KT0+e1xyXG5cdGNvbnN0IGxlc3M9TWF0aC5taW4od2lkdGgsaGVpZ2h0KSwgbW9yZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpXHJcblx0bGV0IGNvdW50TGVzcz1NYXRoLmZsb29yKGxlc3MqdG90YWxQZXJTY3JlZW4vKHdpZHRoK2hlaWdodCkpXHJcblx0bGV0IGNvdW50TW9yZT10b3RhbFBlclNjcmVlbi1jb3VudExlc3NcclxuXHRsZXQgd2lkdGhMZXNzPU1hdGguZmxvb3IobGVzcy9jb3VudExlc3MpXHJcblx0bGV0IHdpZHRoTW9yZT1NYXRoLmZsb29yKG1vcmUvY291bnRNb3JlKVxyXG5cdGxldCBzdHlsZT17fVxyXG5cdGlmKGxlc3M9PXdpZHRoKXtcclxuXHRcdHN0eWxlLndpZHRoPXdpZHRoTGVzc1xyXG5cdFx0c3R5bGUuaGVpZ2h0PXdpZHRoTW9yZVxyXG5cdH1lbHNle1xyXG5cdFx0c3R5bGUud2lkdGg9d2lkdGhNb3JlXHJcblx0XHRzdHlsZS5oZWlnaHQ9d2lkdGhMZXNzXHJcblx0fVxyXG5cdFxyXG5cdGxldCBzbWlsZXM9W11cclxuXHRmb3IobGV0IGk9MDtpPHRvdGFsUGVyU2NyZWVuO2krKylcclxuXHRcdHNtaWxlcy5wdXNoKFxyXG5cdFx0XHQ8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifX0+XHJcblx0XHRcdFx0PFNtaWxlIHN0eWxlPXtzdHlsZX0gc2NvcmVkPXtpPHNjb3JlfSBvbkNsaWNrPXtlPT5pPj1zY29yZSAmJiBkaXNwYXRjaChBQ1RJT04uQURESU5HX1NDT1JFKCkpfS8+XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdClcclxuXHRcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0e3NtaWxlc31cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgU21pbGU9KHtzY29yZWQsIC4uLm90aGVyc30pPT4oXHJcblx0PEljb25TbWlsZSBcclxuXHRcdGNvbG9yPXtzY29yZWQgPyBcInllbGxvd1wiIDpcImxpZ2h0Z3JheVwifSBcclxuXHRcdGhvdmVyQ29sb3I9e3Njb3JlZCA/IG51bGwgOiBcImxpZ2h0eWVsbG93XCJ9XHJcblx0XHR7Li4ub3RoZXJzfVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkIl19