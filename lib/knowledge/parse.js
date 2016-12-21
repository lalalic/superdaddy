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
		if ($.find("img,a").length == 0) $.replaceWith($.text());
	});
	return raw.html();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7a0JBS3dCOztBQUx4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFxRkE7Ozs7OztBQW5GQSxJQUFJLE9BQUssQ0FBTDtBQUNXLFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBb0I7QUFDbEMsUUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxNQUFJLGFBQVcsRUFBWDtNQUFlLFFBQU0sRUFBTjtNQUFVLFNBQU8sRUFBUDtNQUFVLGlCQUFhLE1BQWIsQ0FESDtBQUVwQyxNQUFJLE1BQUksS0FBSyxNQUFMLENBQVksVUFBQyxJQUFELEVBQU0sS0FBTixFQUFZLFFBQVosRUFBdUI7QUFDMUMsV0FBTyxJQUFQO0FBQ0EsU0FBSyxVQUFMO0FBQ0MsV0FBTSxFQUFOLEdBQVMsRUFBVCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssVUFBTDtBQUNDLGdCQUFXLE1BQU0sSUFBTixDQUFXLFdBQVgsRUFBWCxJQUFxQyxNQUFNLEtBQU4sQ0FEdEM7QUFFQyxZQUFPLElBQVAsQ0FGRDtBQUdBLFdBSEE7QUFKQSxTQVFLLE1BQUw7QUFDQSxXQURBO0FBUkEsU0FVSyxnQkFBTDtBQUNDLFlBQU8sSUFBUCxDQUFZLE1BQU0sR0FBTixDQUFaLENBREQ7QUFFQSxXQUZBO0FBVkEsU0FhSyxPQUFMLENBYkE7QUFjQSxTQUFLLFFBQUw7QUFDQyxTQUFJLE1BQUksTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUF5QjthQUFHLEVBQUUsSUFBRixJQUFRLFNBQVI7TUFBSCxDQUF6QixDQUErQyxRQUEvQyxDQUF3RCxJQUF4RCxDQUE2RDthQUFHLEVBQUUsSUFBRixJQUFRLE9BQVI7TUFBSCxDQUFqRSxDQURMO0FBRUMsU0FBRyxPQUFPLElBQUksT0FBSixDQUFZLE9BQVosS0FBc0IsUUFBdEIsRUFDVCxNQUFN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QUFFeEIsTUFBRyxFQUFFLElBQUYsQ0FBTyxPQUFQLEVBQWdCLE1BQWhCLElBQXdCLENBQXhCLEVBQ0YsRUFBRSxXQUFGLENBQWMsRUFBRSxJQUFGLEVBQWQsRUFERDtFQUZnQixDQUFqQixDQUxrQjtBQVVsQixRQUFPLElBQUksSUFBSixFQUFQLENBVmtCO0NBQW5CIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCJcclxuXHJcbmxldCB1dWlkPTBcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoZmlsZSl7XHJcblx0cmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdGxldCBwcm9wZXJ0aWVzPXt9LCBzdGVwcz1bXSwgaW1hZ2VzPVtdLGlkPWBfcGFyc2VyJHt1dWlkKyt9YFxyXG5cdFx0bGV0IGRvYz1kb2N4LnJlbmRlcigodHlwZSxwcm9wcyxjaGlsZHJlbik9PntcclxuXHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlIFwiZG9jdW1lbnRcIjpcclxuXHRcdFx0XHRwcm9wcy5pZD1pZFxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwicHJvcGVydHlcIjpcclxuXHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BzLm5hbWUudG9Mb3dlckNhc2UoKV09cHJvcHMudmFsdWVcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwic3RlcFwiOlxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiaW5saW5lLnBpY3R1cmVcIjpcclxuXHRcdFx0XHRpbWFnZXMucHVzaChwcm9wcy51cmwpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJibG9ja1wiOlxyXG5cdFx0XHRjYXNlIFwiaW5saW5lXCI6XHJcblx0XHRcdFx0bGV0IHRhZz1wcm9wcy5ub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6c2R0UHJcIikuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YWdcIilcclxuXHRcdFx0XHRpZih0YWcgJiYgdGFnLmF0dHJpYnNbXCJ3OnZhbFwiXT09XCJoaWRkZW5cIilcclxuXHRcdFx0XHRcdHByb3BzLmhpZGRlbj10cnVlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbilcclxuXHRcdH0pXHJcblxyXG5cdFx0bGV0IGh0bWw9UmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoZG9jKVxyXG5cdFx0aHRtbD10aWR5KGh0bWwpXHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aHRtbCxcclxuXHRcdFx0cHJvcGVydGllcyxcclxuXHRcdFx0c3RlcHMsXHJcblx0XHRcdGltYWdlcyxcclxuXHRcdFx0aWRcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbil7XHJcblx0Y29uc29sZS5sb2codHlwZSlcclxuXHRjb25zdCB7cHIsbm9kZSx0eXBlOmEsLi4ub3RoZXJzfT1wcm9wc1xyXG5cdGlmKFRZUEVbdHlwZV0pXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUWVBFW3R5cGVdLCBvdGhlcnMsLi4uY2hpbGRyZW4pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuY29uc3Qgd3JhcHBlcj0oe2NoaWxkcmVufSk9PntcclxuXHRsZXQgY29udGVudD1SZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG5cdGlmKCFjb250ZW50IHx8IGNvbnRlbnQubGVuZ3RoPT0wKVxyXG5cdFx0cmV0dXJuIG51bGxcclxuXHRlbHNlIGlmKGNvbnRlbnQubGVuZ3RoPT0xKVxyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoY29udGVudFswXSlcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBUWVBFPXtcclxuXHRpZ25vcmU6IGE9Pm51bGxcclxuXHQsZG9jdW1lbnQ6XCJkaXZcIlxyXG5cdCxwOlwicFwiXHJcblx0LHI6XCJzcGFuXCJcclxuXHQsdDpcInNwYW5cIlxyXG5cdCxcImlubGluZS5waWN0dXJlXCI6KHt1cmx9KT0+PGltZyBzcmM9e3VybH0vPlxyXG5cdCxoeXBlcmxpbms6KHt1cmwsY2hpbGRyZW59KT0+PGEgaHJlZj17dXJsfT57Y2hpbGRyZW59PC9hPlxyXG5cdCx0Ymw6KHtjaGlsZHJlbn0pPT48dGFibGU+PHRib2R5PntjaGlsZHJlbn08L3Rib2R5PjwvdGFibGU+XHJcblx0LHRyOlwidHJcIlxyXG5cdCx0YzpcInRkXCJcclxuXHQsaGVhZGluZzooe2xldmVsLGNoaWxkcmVufSk9PntcclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGBoJHtsZXZlbH1gLHt9LGNoaWxkcmVuKVxyXG5cdH1cclxuXHQsbGlzdDooe251bUlkLCBsZXZlbCwgY2hpbGRyZW59KT0+PHVsPjxsaT57Y2hpbGRyZW59PC9saT48L3VsPlxyXG5cdCxwcm9wZXJ0eTp3cmFwcGVyXHJcblx0LGRyYXdpbmc6d3JhcHBlclxyXG5cdCxibG9jazooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcblx0LGlubGluZTooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPHNwYW4+e2NoaWxkcmVufTwvc3Bhbj5cclxufVxyXG5cclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuXHJcbmZ1bmN0aW9uIHRpZHkoaHRtbCl7XHJcblx0bGV0IHJhdz1jaGVlci5sb2FkKGh0bWwpXHJcblx0cmF3KFwic3Bhbj5zcGFuOmZpcnN0LWNoaWxkOmxhc3QtY2hpbGRcIilcclxuXHRcdC5lYWNoKChpLGVsKT0+cmF3KGVsLnBhcmVudCkucmVwbGFjZVdpdGgoZWwpKVxyXG5cclxuXHRyYXcoXCJzcGFuXCIpLmVhY2goKGksZWwpPT57XHJcblx0XHRsZXQgJD1yYXcoZWwpXHJcblx0XHRpZigkLmZpbmQoXCJpbWcsYVwiKS5sZW5ndGg9PTApXHJcblx0XHRcdCQucmVwbGFjZVdpdGgoJC50ZXh0KCkpXHJcblx0fSlcclxuXHRyZXR1cm4gcmF3Lmh0bWwoKVxyXG59XHJcbiJdfQ==