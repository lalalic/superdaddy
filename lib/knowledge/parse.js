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
		if ($.has("img,a").length == 0) $.replaceWith($.text());
	});

	return raw.html();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2UuanMiXSwibmFtZXMiOlsicGFyc2UiLCJ1dWlkIiwiZmlsZSIsImxvYWQiLCJ0aGVuIiwicHJvcGVydGllcyIsInN0ZXBzIiwiaW1hZ2VzIiwiaWQiLCJkb2MiLCJkb2N4IiwicmVuZGVyIiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJ2YWx1ZSIsInB1c2giLCJ1cmwiLCJ0YWciLCJub2RlIiwiZmluZCIsImEiLCJhdHRyaWJzIiwiaGlkZGVuIiwiY3JlYXRlRWxlbWVudCIsImh0bWwiLCJyZW5kZXJUb1N0YXRpY01hcmt1cCIsInRpZHkiLCJjb25zb2xlIiwibG9nIiwicHIiLCJvdGhlcnMiLCJUWVBFIiwid3JhcHBlciIsImNvbnRlbnQiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJsZW5ndGgiLCJvbmx5IiwiaWdub3JlIiwiZG9jdW1lbnQiLCJwIiwiciIsInQiLCJoeXBlcmxpbmsiLCJ0YmwiLCJ0ciIsInRjIiwiaGVhZGluZyIsImxldmVsIiwibGlzdCIsIm51bUlkIiwicHJvcGVydHkiLCJkcmF3aW5nIiwiYmxvY2siLCJpbmxpbmUiLCJyYXciLCJlYWNoIiwiaSIsImVsIiwicGFyZW50IiwicmVwbGFjZVdpdGgiLCIkIiwiaGFzIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7a0JBS3dCQSxLOztBQUx4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFvRkE7Ozs7OztBQWxGQSxJQUFJQyxPQUFLLENBQVQ7QUFDZSxTQUFTRCxLQUFULENBQWVFLElBQWYsRUFBb0I7QUFDbEMsUUFBTyxrQkFBUUMsSUFBUixDQUFhRCxJQUFiLEVBQW1CRSxJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxNQUFJQyxhQUFXLEVBQWY7QUFBQSxNQUFtQkMsUUFBTSxFQUF6QjtBQUFBLE1BQTZCQyxTQUFPLEVBQXBDO0FBQUEsTUFBdUNDLGlCQUFhUCxNQUFwRDtBQUNBLE1BQUlR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QWQsRUFBbUI7QUFDbEIsS0FBSStCLE1BQUksa0JBQU12RCxJQUFOLENBQVd3QixJQUFYLENBQVI7QUFDQStCLEtBQUksa0NBQUosRUFDRUMsSUFERixDQUNPLFVBQUNDLENBQUQsRUFBR0MsRUFBSDtBQUFBLFNBQVFILElBQUlHLEdBQUdDLE1BQVAsRUFBZUMsV0FBZixDQUEyQkYsRUFBM0IsQ0FBUjtBQUFBLEVBRFA7O0FBR0FILEtBQUksTUFBSixFQUFZQyxJQUFaLENBQWlCLFVBQUNDLENBQUQsRUFBR0MsRUFBSCxFQUFRO0FBQ3hCLE1BQUlHLElBQUVOLElBQUlHLEVBQUosQ0FBTjtBQUNBLE1BQUdHLEVBQUVDLEdBQUYsQ0FBTSxPQUFOLEVBQWUxQixNQUFmLElBQXVCLENBQTFCLEVBQ0N5QixFQUFFRCxXQUFGLENBQWNDLEVBQUVFLElBQUYsRUFBZDtBQUNELEVBSkQ7O0FBTUEsUUFBT1IsSUFBSS9CLElBQUosRUFBUDtBQUNBIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCJcclxuXHJcbmxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoZmlsZSl7XHJcblx0cmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdGxldCBwcm9wZXJ0aWVzPXt9LCBzdGVwcz1bXSwgaW1hZ2VzPVtdLGlkPWBfcGFyc2VyJHt1dWlkKyt9YFxyXG5cdFx0bGV0IGRvYz1kb2N4LnJlbmRlcigodHlwZSxwcm9wcyxjaGlsZHJlbik9PntcclxuXHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiZG9jdW1lbnRcIjpcclxuXHRcdFx0XHRwcm9wcy5pZD1pZFxyXG5cdFx0XHRjYXNlIFwicHJvcGVydHlcIjpcclxuXHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BzLm5hbWUudG9Mb3dlckNhc2UoKV09cHJvcHMudmFsdWVcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwic3RlcFwiOlxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiaW5saW5lLnBpY3R1cmVcIjpcclxuXHRcdFx0XHRpbWFnZXMucHVzaChwcm9wcy51cmwpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJibG9ja1wiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lXCI6XHJcblx0XHRcdFx0bGV0IHRhZz1wcm9wcy5ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIikuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHRcdFx0XHRpZih0YWcgJiYgdGFnLmF0dHJpYnNbXCJ3OnZhbFwiXT09XCJoaWRkZW5cIilcclxuXHRcdFx0XHRcdHByb3BzLmhpZGRlbj10cnVlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbilcclxuXHRcdH0pXHJcblxyXG5cdFx0bGV0IGh0bWw9UmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoZG9jKVxyXG5cdFx0aHRtbD10aWR5KGh0bWwpXHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aHRtbCxcclxuXHRcdFx0cHJvcGVydGllcyxcclxuXHRcdFx0c3RlcHMsXHJcblx0XHRcdGltYWdlcyxcclxuXHRcdFx0aWRcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbil7XHJcblx0Y29uc29sZS5sb2codHlwZSlcclxuXHRjb25zdCB7cHIsbm9kZSx0eXBlOmEsLi4ub3RoZXJzfT1wcm9wc1xyXG5cdGlmKFRZUEVbdHlwZV0pXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUWVBFW3R5cGVdLCBvdGhlcnMsLi4uY2hpbGRyZW4pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuY29uc3Qgd3JhcHBlcj0oe2NoaWxkcmVufSk9PntcclxuXHRsZXQgY29udGVudD1SZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG5cdGlmKCFjb250ZW50IHx8IGNvbnRlbnQubGVuZ3RoPT0wKVxyXG5cdFx0cmV0dXJuIG51bGxcclxuXHRlbHNlIGlmKGNvbnRlbnQubGVuZ3RoPT0xKVxyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoY29udGVudFswXSlcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBUWVBFPXtcclxuXHRpZ25vcmU6IGE9Pm51bGxcclxuXHQsZG9jdW1lbnQ6XCJkaXZcIlxyXG5cdCxwOlwicFwiXHJcblx0LHI6XCJzcGFuXCJcclxuXHQsdDpcInNwYW5cIlxyXG5cdCxcImlubGluZS5waWN0dXJlXCI6KHt1cmx9KT0+PGltZyBzcmM9e3VybH0vPlxyXG5cdCxoeXBlcmxpbms6KHt1cmwsY2hpbGRyZW59KT0+PGEgaHJlZj17dXJsfT57Y2hpbGRyZW59PC9hPlxyXG5cdCx0Ymw6KHtjaGlsZHJlbn0pPT48dGFibGU+PHRib2R5PntjaGlsZHJlbn08L3Rib2R5PjwvdGFibGU+XHJcblx0LHRyOlwidHJcIlxyXG5cdCx0YzpcInRkXCJcclxuXHQsaGVhZGluZzooe2xldmVsLGNoaWxkcmVufSk9PntcclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGBoJHtsZXZlbH1gLHt9LGNoaWxkcmVuKVxyXG5cdH1cclxuXHQsbGlzdDooe251bUlkLCBsZXZlbCwgY2hpbGRyZW59KT0+PHVsPjxsaT57Y2hpbGRyZW59PC9saT48L3VsPlxyXG5cdCxwcm9wZXJ0eTp3cmFwcGVyXHJcblx0LGRyYXdpbmc6d3JhcHBlclxyXG5cdCxibG9jazooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcblx0LGlubGluZTooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPHNwYW4+e2NoaWxkcmVufTwvc3Bhbj5cclxufVxyXG5cclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuXHJcbmZ1bmN0aW9uIHRpZHkoaHRtbCl7XHJcblx0bGV0IHJhdz1jaGVlci5sb2FkKGh0bWwpXHJcblx0cmF3KFwic3Bhbj5zcGFuOmZpcnN0LWNoaWxkOmxhc3QtY2hpbGRcIilcclxuXHRcdC5lYWNoKChpLGVsKT0+cmF3KGVsLnBhcmVudCkucmVwbGFjZVdpdGgoZWwpKVxyXG5cclxuXHRyYXcoXCJzcGFuXCIpLmVhY2goKGksZWwpPT57XHJcblx0XHRsZXQgJD1yYXcoZWwpXHJcblx0XHRpZigkLmhhcyhcImltZyxhXCIpLmxlbmd0aD09MClcclxuXHRcdFx0JC5yZXBsYWNlV2l0aCgkLnRleHQoKSlcclxuXHR9KVxyXG5cclxuXHRyZXR1cm4gcmF3Lmh0bWwoKVxyXG59XHJcbiJdfQ==