"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = parse;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(file) {
	return _docx4js2.default.load(file).then(function (docx) {
		var properties = {},
		    steps = [],
		    images = [];
		var doc = docx.render(function (type, props, children) {
			switch (type) {
				case "property":
					properties[props.name.toLowerCase()] = props.value;
					return null;
					break;
				case "step":
					break;
				case "inline.picture":
					images.push(props.url);
					break;
				case "block":
				case "inline":
					var tag = props.node.children.find(function (a) {
						return a.name == "w:sdtPr";
					}).children.find(function (a) {
						return a.name == "w:tag";
					});
					if (tag && tag.attribs["w:val"] == "hidden") props.hidden = true;
					break;
			}
			return createElement(type, props, children);
		});

		var html = _server2.default.renderToStaticMarkup(doc);
		html = tidy(html);

		return {
			html: html,
			properties: properties,
			steps: steps,
			images: images
		};
	});
}

function createElement(type, props, children) {
	console.log(type);
	var pr = props.pr,
	    node = props.node,
	    a = props.type,
	    others = (0, _objectWithoutProperties3.default)(props, ["pr", "node", "type"]);

	if (TYPE[type]) return _react2.default.createElement.apply(_react2.default, [TYPE[type], others].concat((0, _toConsumableArray3.default)(children)));else return null;
}

var wrapper = function wrapper(_ref) {
	var children = _ref.children;

	var content = _react2.default.Children.toArray(children);
	if (!content || content.length == 0) return null;else if (content.length == 1) return _react2.default.Children.only(content[0]);else return _react2.default.createElement(
		"span",
		null,
		content
	);
};

var TYPE = {
	ignore: function ignore(a) {
		return null;
	},
	document: "div",
	p: "p",
	r: "span",
	t: "span",
	"inline.picture": function inlinePicture(_ref2) {
		var url = _ref2.url;
		return _react2.default.createElement("img", { src: url });
	},
	hyperlink: function hyperlink(_ref3) {
		var url = _ref3.url,
		    children = _ref3.children;
		return _react2.default.createElement(
			"a",
			{ href: url },
			children
		);
	},
	tbl: function tbl(_ref4) {
		var children = _ref4.children;
		return _react2.default.createElement(
			"table",
			null,
			_react2.default.createElement(
				"tbody",
				null,
				children
			)
		);
	},
	tr: "tr",
	tc: "td",
	heading: function heading(_ref5) {
		var level = _ref5.level,
		    children = _ref5.children;

		return _react2.default.createElement("h" + level, {}, children);
	},
	list: function list(_ref6) {
		var numId = _ref6.numId,
		    level = _ref6.level,
		    children = _ref6.children;
		return _react2.default.createElement(
			"ul",
			null,
			_react2.default.createElement(
				"li",
				null,
				children
			)
		);
	},
	property: wrapper,
	drawing: wrapper,
	block: function block(_ref7) {
		var hidden = _ref7.hidden,
		    children = _ref7.children;
		return hidden ? null : _react2.default.createElement(
			"div",
			null,
			children
		);
	},
	inline: function inline(_ref8) {
		var hidden = _ref8.hidden,
		    children = _ref8.children;
		return hidden ? null : _react2.default.createElement(
			"span",
			null,
			children
		);
	}
};

function tidy(html) {
	var raw = _cheerio2.default.load(html);
	raw("span>span:first-child:last-child").each(function (i, el) {
		return raw(el.parent).replaceWith(el);
	});

	raw("span").each(function (i, el) {
		var $ = raw(el);
		if ($.has("img,a").length == 0) $.replaceWith($.text());
	});

	return raw.html();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2VyL2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlIiwiZmlsZSIsImxvYWQiLCJ0aGVuIiwicHJvcGVydGllcyIsInN0ZXBzIiwiaW1hZ2VzIiwiZG9jIiwiZG9jeCIsInJlbmRlciIsInR5cGUiLCJwcm9wcyIsImNoaWxkcmVuIiwibmFtZSIsInRvTG93ZXJDYXNlIiwidmFsdWUiLCJwdXNoIiwidXJsIiwidGFnIiwibm9kZSIsImZpbmQiLCJhIiwiYXR0cmlicyIsImhpZGRlbiIsImNyZWF0ZUVsZW1lbnQiLCJodG1sIiwicmVuZGVyVG9TdGF0aWNNYXJrdXAiLCJ0aWR5IiwiY29uc29sZSIsImxvZyIsInByIiwib3RoZXJzIiwiVFlQRSIsIndyYXBwZXIiLCJjb250ZW50IiwiQ2hpbGRyZW4iLCJ0b0FycmF5IiwibGVuZ3RoIiwib25seSIsImlnbm9yZSIsImRvY3VtZW50IiwicCIsInIiLCJ0IiwiaHlwZXJsaW5rIiwidGJsIiwidHIiLCJ0YyIsImhlYWRpbmciLCJsZXZlbCIsImxpc3QiLCJudW1JZCIsInByb3BlcnR5IiwiZHJhd2luZyIsImJsb2NrIiwiaW5saW5lIiwicmF3IiwiZWFjaCIsImkiLCJlbCIsInBhcmVudCIsInJlcGxhY2VXaXRoIiwiJCIsImhhcyIsInRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQUl3QkEsSzs7QUFKeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBZ0ZBOzs7Ozs7QUE5RWUsU0FBU0EsS0FBVCxDQUFlQyxJQUFmLEVBQW9CO0FBQ2xDLFFBQU8sa0JBQVFDLElBQVIsQ0FBYUQsSUFBYixFQUFtQkUsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDcEMsTUFBSUMsYUFBVyxFQUFmO0FBQUEsTUFBbUJDLFFBQU0sRUFBekI7QUFBQSxNQUE2QkMsU0FBTyxFQUFwQztBQUNBLE1BQUlDLE1BQUlDLEtBQUtDLE1BQUwsQ0FBWSxVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFB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QUdDLEVBQUg7QUFBQSxTQUFRSCxJQUFJRyxHQUFHQyxNQUFQLEVBQWVDLFdBQWYsQ0FBMkJGLEVBQTNCLENBQVI7QUFBQSxFQURQOztBQUdBSCxLQUFJLE1BQUosRUFBWUMsSUFBWixDQUFpQixVQUFDQyxDQUFELEVBQUdDLEVBQUgsRUFBUTtBQUN4QixNQUFJRyxJQUFFTixJQUFJRyxFQUFKLENBQU47QUFDQSxNQUFHRyxFQUFFQyxHQUFGLENBQU0sT0FBTixFQUFlMUIsTUFBZixJQUF1QixDQUExQixFQUNDeUIsRUFBRUQsV0FBRixDQUFjQyxFQUFFRSxJQUFGLEVBQWQ7QUFDRCxFQUpEOztBQU1BLFFBQU9SLElBQUkvQixJQUFKLEVBQVA7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShmaWxlKXtcclxuXHRyZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpLnRoZW4oZG9jeD0+e1xyXG5cdFx0bGV0IHByb3BlcnRpZXM9e30sIHN0ZXBzPVtdLCBpbWFnZXM9W11cclxuXHRcdGxldCBkb2M9ZG9jeC5yZW5kZXIoKHR5cGUscHJvcHMsY2hpbGRyZW4pPT57XHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSBcInByb3BlcnR5XCI6XHJcblx0XHRcdFx0cHJvcGVydGllc1twcm9wcy5uYW1lLnRvTG93ZXJDYXNlKCldPXByb3BzLnZhbHVlXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInN0ZXBcIjpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcImlubGluZS5waWN0dXJlXCI6XHJcblx0XHRcdFx0aW1hZ2VzLnB1c2gocHJvcHMudXJsKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiYmxvY2tcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZVwiOlxyXG5cdFx0XHRcdGxldCB0YWc9cHJvcHMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGFnXCIpXHJcblx0XHRcdFx0aWYodGFnICYmIHRhZy5hdHRyaWJzW1widzp2YWxcIl09PVwiaGlkZGVuXCIpXHJcblx0XHRcdFx0XHRwcm9wcy5oaWRkZW49dHJ1ZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUscHJvcHMsY2hpbGRyZW4pXHJcblx0XHR9KVxyXG5cclxuXHRcdGxldCBodG1sPVJlYWN0RE9NLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYylcclxuXHRcdGh0bWw9dGlkeShodG1sKVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGh0bWwsXHJcblx0XHRcdHByb3BlcnRpZXMsXHJcblx0XHRcdHN0ZXBzLFxyXG5cdFx0XHRpbWFnZXNcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbil7XHJcblx0Y29uc29sZS5sb2codHlwZSlcclxuXHRjb25zdCB7cHIsbm9kZSx0eXBlOmEsLi4ub3RoZXJzfT1wcm9wc1xyXG5cdGlmKFRZUEVbdHlwZV0pXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUWVBFW3R5cGVdLCBvdGhlcnMsLi4uY2hpbGRyZW4pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuY29uc3Qgd3JhcHBlcj0oe2NoaWxkcmVufSk9PntcclxuXHRsZXQgY29udGVudD1SZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG5cdGlmKCFjb250ZW50IHx8IGNvbnRlbnQubGVuZ3RoPT0wKVxyXG5cdFx0cmV0dXJuIG51bGxcclxuXHRlbHNlIGlmKGNvbnRlbnQubGVuZ3RoPT0xKVxyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoY29udGVudFswXSlcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBUWVBFPXtcclxuXHRpZ25vcmU6IGE9Pm51bGxcclxuXHQsZG9jdW1lbnQ6XCJkaXZcIlxyXG5cdCxwOlwicFwiXHJcblx0LHI6XCJzcGFuXCJcclxuXHQsdDpcInNwYW5cIlxyXG5cdCxcImlubGluZS5waWN0dXJlXCI6KHt1cmx9KT0+PGltZyBzcmM9e3VybH0vPlxyXG5cdCxoeXBlcmxpbms6KHt1cmwsY2hpbGRyZW59KT0+PGEgaHJlZj17dXJsfT57Y2hpbGRyZW59PC9hPlxyXG5cdCx0Ymw6KHtjaGlsZHJlbn0pPT48dGFibGU+PHRib2R5PntjaGlsZHJlbn08L3Rib2R5PjwvdGFibGU+XHJcblx0LHRyOlwidHJcIlxyXG5cdCx0YzpcInRkXCJcclxuXHQsaGVhZGluZzooe2xldmVsLGNoaWxkcmVufSk9PntcclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGBoJHtsZXZlbH1gLHt9LGNoaWxkcmVuKVxyXG5cdH1cclxuXHQsbGlzdDooe251bUlkLCBsZXZlbCwgY2hpbGRyZW59KT0+PHVsPjxsaT57Y2hpbGRyZW59PC9saT48L3VsPlxyXG5cdCxwcm9wZXJ0eTp3cmFwcGVyXHJcblx0LGRyYXdpbmc6d3JhcHBlclxyXG5cdCxibG9jazooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcblx0LGlubGluZTooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPHNwYW4+e2NoaWxkcmVufTwvc3Bhbj5cclxufVxyXG5cclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuXHJcbmZ1bmN0aW9uIHRpZHkoaHRtbCl7XHJcblx0bGV0IHJhdz1jaGVlci5sb2FkKGh0bWwpXHJcblx0cmF3KFwic3Bhbj5zcGFuOmZpcnN0LWNoaWxkOmxhc3QtY2hpbGRcIilcclxuXHRcdC5lYWNoKChpLGVsKT0+cmF3KGVsLnBhcmVudCkucmVwbGFjZVdpdGgoZWwpKVxyXG5cclxuXHRyYXcoXCJzcGFuXCIpLmVhY2goKGksZWwpPT57XHJcblx0XHRsZXQgJD1yYXcoZWwpXHJcblx0XHRpZigkLmhhcyhcImltZyxhXCIpLmxlbmd0aD09MClcclxuXHRcdFx0JC5yZXBsYWNlV2l0aCgkLnRleHQoKSlcclxuXHR9KVxyXG5cclxuXHRyZXR1cm4gcmF3Lmh0bWwoKVxyXG59XHJcbiJdfQ==