"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _baby = require("./baby");

var _baby2 = _interopRequireDefault(_baby);

var _papa = require("./papa");

var _papa2 = _interopRequireDefault(_papa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { editingBaby: 0, editingPapa: 0 };
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "baby/edit":
			return _extends({}, state, { editingBaby: payload });
			break;
		case "papa/edit":
			return _extends({}, state, { editingPapa: payload });
			break;
	}
	return state;
};

var TimeManage = exports.TimeManage = function TimeManage(props) {
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_papa2.default, null)
	);
};

exports.default = Object.assign(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWR1Y2VyIiwic3RhdGUiLCJlZGl0aW5nQmFieSIsImVkaXRpbmdQYXBhIiwidHlwZSIsInBheWxvYWQiLCJUaW1lTWFuYWdlIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVEsR0FBc0Q7QUFBQSxLQUFyREMsS0FBcUQsdUVBQS9DLEVBQUNDLGFBQVksQ0FBYixFQUFlQyxhQUFZLENBQTNCLEVBQStDO0FBQUE7QUFBQSxLQUFoQkMsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUMxRSxTQUFPRCxJQUFQO0FBQ0E7QUFDQyx1QkFBV0gsS0FBWCxJQUFpQkMsYUFBWUcsT0FBN0I7QUFDRDtBQUNHO0FBQ0YsdUJBQVdKLEtBQVgsSUFBaUJFLGFBQVlFLE9BQTdCO0FBQ0Q7QUFOQTtBQVFBLFFBQU9KLEtBQVA7QUFDQSxDQVZNOztBQVlBLElBQU1LLGtDQUFXLFNBQVhBLFVBQVc7QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFFSTtBQUZKLEVBRG9CO0FBQUEsQ0FBakI7O2tCQU9RQyxPQUFPQyxNQUFQLENBQWNGLFVBQWQsRUFBeUIsRUFBQ04sZ0JBQUQsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgQmFieVRpbWVNYW5hZ2UgZnJvbSBcIi4vYmFieVwiXG5pbXBvcnQgUGFwYVRpbWVNYW5hZ2UgZnJvbSBcIi4vcGFwYVwiXG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZ0JhYnk6MCxlZGl0aW5nUGFwYTowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBiYWJ5L2VkaXRgOlxuXHRcdHJldHVybiB7Li4uc3RhdGUsZWRpdGluZ0JhYnk6cGF5bG9hZH1cblx0YnJlYWtcbiAgICBjYXNlIGBwYXBhL2VkaXRgOlxuXHRcdHJldHVybiB7Li4uc3RhdGUsZWRpdGluZ1BhcGE6cGF5bG9hZH1cblx0YnJlYWtcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9cHJvcHM9PihcbiAgICA8ZGl2PlxuICAgICAgICBcbiAgICAgICAgPFBhcGFUaW1lTWFuYWdlLz5cbiAgICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==