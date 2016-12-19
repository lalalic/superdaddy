"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parse;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(file) {
	return _docx4js2.default.load(file).then(function (docx) {
		var doc = docx.render(createComponent);
		var html = _server2.default.renderToStaticMarkup(doc);
		var _doc$props = doc.props,
		    properties = _doc$props.properties,
		    steps = _doc$props.steps,
		    images = _doc$props.images;

		return {
			html: html,
			properties: properties,
			steps: steps,
			images: images
		};
	});
}

var TYPE = {
	"p": "p",
	"r": "span",
	"t": function t(_ref) {
		var children = _ref.children;
		return children;
	},
	"inline.picture": "img",
	"hyperlink": "a",
	"tbl": "table",
	"tr": "tr",
	"td": "td",
	"property": function property() {
		return null;
	}
};

function createComponent(type) {
	return TYPE[type] || "span";
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2VyL2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlIiwiZmlsZSIsImxvYWQiLCJ0aGVuIiwiZG9jIiwiZG9jeCIsInJlbmRlciIsImNyZWF0ZUNvbXBvbmVudCIsImh0bWwiLCJyZW5kZXJUb1N0YXRpY01hcmt1cCIsInByb3BzIiwicHJvcGVydGllcyIsInN0ZXBzIiwiaW1hZ2VzIiwiVFlQRSIsImNoaWxkcmVuIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCQSxLOztBQUp4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFvQjtBQUNsQyxRQUFPLGtCQUFRQyxJQUFSLENBQWFELElBQWIsRUFBbUJFLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLE1BQUlDLE1BQUlDLEtBQUtDLE1BQUwsQ0FBWUMsZUFBWixDQUFSO0FBQ0EsTUFBSUMsT0FBSyxpQkFBU0Msb0JBQVQsQ0FBOEJMLEdBQTlCLENBQVQ7QUFGb0MsbUJBR0pBLElBQUlNLEtBSEE7QUFBQSxNQUcvQkMsVUFIK0IsY0FHL0JBLFVBSCtCO0FBQUEsTUFHbkJDLEtBSG1CLGNBR25CQSxLQUhtQjtBQUFBLE1BR1pDLE1BSFksY0FHWkEsTUFIWTs7QUFJcEMsU0FBTztBQUNOTCxhQURNO0FBRU5HLHlCQUZNO0FBR05DLGVBSE07QUFJTkM7QUFKTSxHQUFQO0FBTUEsRUFWTSxDQUFQO0FBV0E7O0FBRUQsSUFBTUMsT0FBSztBQUNWLE1BQUksR0FETTtBQUVWLE1BQUksTUFGTTtBQUdWLE1BQUk7QUFBQSxNQUFFQyxRQUFGLFFBQUVBLFFBQUY7QUFBQSxTQUFjQSxRQUFkO0FBQUEsRUFITTtBQUlWLG1CQUFpQixLQUpQO0FBS1YsY0FBWSxHQUxGO0FBTVYsUUFBTSxPQU5JO0FBT1YsT0FBSyxJQVBLO0FBUVYsT0FBSyxJQVJLO0FBU1YsYUFBVztBQUFBLFNBQUksSUFBSjtBQUFBO0FBVEQsQ0FBWDs7QUFZQSxTQUFTUixlQUFULENBQXlCUyxJQUF6QixFQUE4QjtBQUM3QixRQUFPRixLQUFLRSxJQUFMLEtBQVksTUFBbkI7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCByZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShmaWxlKXtcclxuXHRyZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG5cdFx0bGV0IGRvYz1kb2N4LnJlbmRlcihjcmVhdGVDb21wb25lbnQpXHJcblx0XHRsZXQgaHRtbD1yZWFjdERPTS5yZW5kZXJUb1N0YXRpY01hcmt1cChkb2MpXHJcblx0XHRsZXQge3Byb3BlcnRpZXMsIHN0ZXBzLCBpbWFnZXN9PWRvYy5wcm9wc1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aHRtbCxcclxuXHRcdFx0cHJvcGVydGllcyxcclxuXHRcdFx0c3RlcHMsXHJcblx0XHRcdGltYWdlc1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmNvbnN0IFRZUEU9e1xyXG5cdFwicFwiOlwicFwiLFxyXG5cdFwiclwiOlwic3BhblwiLFxyXG5cdFwidFwiOih7Y2hpbGRyZW59KT0+Y2hpbGRyZW4sXHJcblx0XCJpbmxpbmUucGljdHVyZVwiOlwiaW1nXCIsXHJcblx0XCJoeXBlcmxpbmtcIjpcImFcIixcclxuXHRcInRibFwiOlwidGFibGVcIixcclxuXHRcInRyXCI6XCJ0clwiLFxyXG5cdFwidGRcIjpcInRkXCIsXHJcblx0XCJwcm9wZXJ0eVwiOigpPT5udWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCh0eXBlKXtcclxuXHRyZXR1cm4gVFlQRVt0eXBlXXx8XCJzcGFuXCJcclxufVxyXG4iXX0=