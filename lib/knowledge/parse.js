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

var uuid = 0;
function parse(file) {
	return _docx4js2.default.load(file).then(function (docx) {
		var properties = {},
		    steps = [],
		    images = [],
		    id = "_parser" + uuid++;
		var doc = docx.render(function (type, props, children) {
			switch (type) {
				case "document":
					props.id = id;
					break;
				case "property":
					properties[props.name.toLowerCase()] = props.value;
					return null;
					break;
				case "step":
					break;
				case "inline.picture":
					images.push({ url: props.url, crc32: props.crc32 });
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
			images: images,
			id: id
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
		if ($.find("img,a").length == 0) $.replaceWith($.text());
	});
	return raw.html();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7a0JBS3dCOztBQUx4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFxRkE7Ozs7OztBQW5GQSxJQUFJLE9BQUssQ0FBTDtBQUNXLFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBb0I7QUFDbEMsUUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxNQUFJLGFBQVcsRUFBWDtNQUFlLFFBQU0sRUFBTjtNQUFVLFNBQU8sRUFBUDtNQUFVLGlCQUFhLE1BQWIsQ0FESDtBQUVwQyxNQUFJLE1BQUksS0FBSyxNQUFMLENBQVksVUFBQyxJQUFELEVBQU0sS0FBTixFQUFZLFFBQVosRUFBdUI7QUFDMUMsV0FBTyxJQUFQO0FBQ0EsU0FBSyxVQUFMO0FBQ0MsV0FBTSxFQUFOLEdBQVMsRUFBVCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssVUFBTDtBQUNDLGdCQUFXLE1BQU0sSUFBTixDQUFXLFdBQVgsRUFBWCxJQUFxQyxNQUFNLEtBQU4sQ0FEdEM7QUFFQyxZQUFPLElBQVAsQ0FGRDtBQUdBLFdBSEE7QUFKQSxTQVFLLE1BQUw7QUFDQSxXQURBO0FBUkEsU0FVSyxnQkFBTDtBQUNDLFlBQU8sSUFBUCxDQUFZLEVBQUMsS0FBSSxNQUFNLEdBQU4sRUFBVSxPQUFNLE1BQU0sS0FBTixFQUFqQyxFQUREO0FBRUEsV0FGQTtBQVZBLFNBYUssT0FBTCxDQWJBO0FBY0EsU0FBSyxRQUFMO0FBQ0MsU0FBSSxNQUFJLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBeUI7YUFBRyxFQUFFLElBQUYsSUFBUSxTQUFSO01BQUgsQ0FBekIsQ0FBK0MsUUFBL0MsQ0FBd0QsSUFBeEQsQ0FBNkQ7YUFBRyxFQUFFLElBQUYsSUFBUSxPQUFSO01BQUgsQ0FBakUsQ0FETDtBQUVDLFNBQUcsT0FBTyxJQUFJLE9BQUos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TUFBSSxJQUFFLElBQUksRUFBSixDQUFGLENBRG9CO0FBRXhCLE1BQUcsRUFBRSxJQUFGLENBQU8sT0FBUCxFQUFnQixNQUFoQixJQUF3QixDQUF4QixFQUNGLEVBQUUsV0FBRixDQUFjLEVBQUUsSUFBRixFQUFkLEVBREQ7RUFGZ0IsQ0FBakIsQ0FMa0I7QUFVbEIsUUFBTyxJQUFJLElBQUosRUFBUCxDQVZrQjtDQUFuQiIsImZpbGUiOiJwYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiXHJcblxyXG5sZXQgdXVpZD0wXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKGZpbGUpe1xyXG5cdHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSkudGhlbihkb2N4PT57XHJcblx0XHRsZXQgcHJvcGVydGllcz17fSwgc3RlcHM9W10sIGltYWdlcz1bXSxpZD1gX3BhcnNlciR7dXVpZCsrfWBcclxuXHRcdGxldCBkb2M9ZG9jeC5yZW5kZXIoKHR5cGUscHJvcHMsY2hpbGRyZW4pPT57XHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSBcImRvY3VtZW50XCI6XHJcblx0XHRcdFx0cHJvcHMuaWQ9aWRcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInByb3BlcnR5XCI6XHJcblx0XHRcdFx0cHJvcGVydGllc1twcm9wcy5uYW1lLnRvTG93ZXJDYXNlKCldPXByb3BzLnZhbHVlXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInN0ZXBcIjpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcImlubGluZS5waWN0dXJlXCI6XHJcblx0XHRcdFx0aW1hZ2VzLnB1c2goe3VybDpwcm9wcy51cmwsY3JjMzI6cHJvcHMuY3JjMzJ9KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiYmxvY2tcIjpcclxuXHRcdFx0Y2FzZSBcImlubGluZVwiOlxyXG5cdFx0XHRcdGxldCB0YWc9cHJvcHMubm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnNkdFByXCIpLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGFnXCIpXHJcblx0XHRcdFx0aWYodGFnICYmIHRhZy5hdHRyaWJzW1widzp2YWxcIl09PVwiaGlkZGVuXCIpXHJcblx0XHRcdFx0XHRwcm9wcy5oaWRkZW49dHJ1ZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUscHJvcHMsY2hpbGRyZW4pXHJcblx0XHR9KVxyXG5cclxuXHRcdGxldCBodG1sPVJlYWN0RE9NLnJlbmRlclRvU3RhdGljTWFya3VwKGRvYylcclxuXHRcdGh0bWw9dGlkeShodG1sKVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGh0bWwsXHJcblx0XHRcdHByb3BlcnRpZXMsXHJcblx0XHRcdHN0ZXBzLFxyXG5cdFx0XHRpbWFnZXMsXHJcblx0XHRcdGlkXHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUscHJvcHMsY2hpbGRyZW4pe1xyXG5cdGNvbnNvbGUubG9nKHR5cGUpXHJcblx0Y29uc3Qge3ByLG5vZGUsdHlwZTphLC4uLm90aGVyc309cHJvcHNcclxuXHRpZihUWVBFW3R5cGVdKVxyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVFlQRVt0eXBlXSwgb3RoZXJzLC4uLmNoaWxkcmVuKVxyXG5cdGVsc2VcclxuXHRcdHJldHVybiBudWxsXHJcbn1cclxuXHJcbmNvbnN0IHdyYXBwZXI9KHtjaGlsZHJlbn0pPT57XHJcblx0bGV0IGNvbnRlbnQ9UmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuXHRpZighY29udGVudCB8fCBjb250ZW50Lmxlbmd0aD09MClcclxuXHRcdHJldHVybiBudWxsXHJcblx0ZWxzZSBpZihjb250ZW50Lmxlbmd0aD09MSlcclxuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KGNvbnRlbnRbMF0pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIDxzcGFuPntjb250ZW50fTwvc3Bhbj5cclxufVxyXG5cclxuY29uc3QgVFlQRT17XHJcblx0aWdub3JlOiBhPT5udWxsXHJcblx0LGRvY3VtZW50OlwiZGl2XCJcclxuXHQscDpcInBcIlxyXG5cdCxyOlwic3BhblwiXHJcblx0LHQ6XCJzcGFuXCJcclxuXHQsXCJpbmxpbmUucGljdHVyZVwiOih7dXJsfSk9PjxpbWcgc3JjPXt1cmx9Lz5cclxuXHQsaHlwZXJsaW5rOih7dXJsLGNoaWxkcmVufSk9PjxhIGhyZWY9e3VybH0+e2NoaWxkcmVufTwvYT5cclxuXHQsdGJsOih7Y2hpbGRyZW59KT0+PHRhYmxlPjx0Ym9keT57Y2hpbGRyZW59PC90Ym9keT48L3RhYmxlPlxyXG5cdCx0cjpcInRyXCJcclxuXHQsdGM6XCJ0ZFwiXHJcblx0LGhlYWRpbmc6KHtsZXZlbCxjaGlsZHJlbn0pPT57XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChgaCR7bGV2ZWx9YCx7fSxjaGlsZHJlbilcclxuXHR9XHJcblx0LGxpc3Q6KHtudW1JZCwgbGV2ZWwsIGNoaWxkcmVufSk9Pjx1bD48bGk+e2NoaWxkcmVufTwvbGk+PC91bD5cclxuXHQscHJvcGVydHk6d3JhcHBlclxyXG5cdCxkcmF3aW5nOndyYXBwZXJcclxuXHQsYmxvY2s6KHtoaWRkZW4sY2hpbGRyZW59KT0+aGlkZGVuID8gbnVsbCA6IDxkaXY+e2NoaWxkcmVufTwvZGl2PlxyXG5cdCxpbmxpbmU6KHtoaWRkZW4sY2hpbGRyZW59KT0+aGlkZGVuID8gbnVsbCA6IDxzcGFuPntjaGlsZHJlbn08L3NwYW4+XHJcbn1cclxuXHJcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXHJcblxyXG5mdW5jdGlvbiB0aWR5KGh0bWwpe1xyXG5cdGxldCByYXc9Y2hlZXIubG9hZChodG1sKVxyXG5cdHJhdyhcInNwYW4+c3BhbjpmaXJzdC1jaGlsZDpsYXN0LWNoaWxkXCIpXHJcblx0XHQuZWFjaCgoaSxlbCk9PnJhdyhlbC5wYXJlbnQpLnJlcGxhY2VXaXRoKGVsKSlcclxuXHJcblx0cmF3KFwic3BhblwiKS5lYWNoKChpLGVsKT0+e1xyXG5cdFx0bGV0ICQ9cmF3KGVsKVxyXG5cdFx0aWYoJC5maW5kKFwiaW1nLGFcIikubGVuZ3RoPT0wKVxyXG5cdFx0XHQkLnJlcGxhY2VXaXRoKCQudGV4dCgpKVxyXG5cdH0pXHJcblx0cmV0dXJuIHJhdy5odG1sKClcclxufVxyXG4iXX0=