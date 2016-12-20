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
	var raw = (0, _cheerio2.default)(html);
	raw("span").each(function (i, el) {
		var $ = raw(el);
		$.replaceWith($.text());
	});
	return raw.html();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9rbm93bGVkZ2UvcGFyc2VyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQUl3Qjs7QUFKeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBZ0ZBOzs7Ozs7QUE5RWUsU0FBUyxLQUFULENBQWUsSUFBZixFQUFvQjtBQUNsQyxRQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLE1BQUksYUFBVyxFQUFYO01BQWUsUUFBTSxFQUFOO01BQVUsU0FBTyxFQUFQLENBRE87QUFFcEMsTUFBSSxNQUFJLEtBQUssTUFBTCxDQUFZLFVBQUMsSUFBRCxFQUFNLEtBQU4sRUFBWSxRQUFaLEVBQXVCO0FBQzFDLFdBQU8sSUFBUDtBQUNBLFNBQUssVUFBTDtBQUNDLGdCQUFXLE1BQU0sSUFBTixDQUFXLFdBQVgsRUFBWCxJQUFxQyxNQUFNLEtBQU4sQ0FEdEM7QUFFQyxZQUFPLElBQVAsQ0FGRDtBQUdBLFdBSEE7QUFEQSxTQUtLLE1BQUw7QUFDQSxXQURBO0FBTEEsU0FPSyxnQkFBTDtBQUNDLFlBQU8sSUFBUCxDQUFZLE1BQU0sR0FBTixDQUFaLENBREQ7QUFFQSxXQUZBO0FBUEEsU0FVSyxPQUFMLENBVkE7QUFXQSxTQUFLLFFBQUw7QUFDQyxTQUFJLE1BQUksTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUF5QjthQUFHLEVBQUUsSUFBRixJQUFRLFNBQVI7TUFBSCxDQUF6QixDQUErQyxRQUEvQyxDQUF3RCxJQUF4RCxDQUE2RDthQUFHLEVBQUUsSUFBRixJQUFRLE9BQVI7TUFBSCxDQUFqRSxDQURMO0FBRUMsU0FBRyxPQUFPLElBQUksT0FBSixDQUFZLE9BQVosS0FBc0IsUUFBdEIsRUFDVCxNQUFNLE1BQU4sR0FBYSxJQUFiLENBREQ7QUFFRCxXQUpBO0FBWEEsSUFEMEM7QUFrQjFDLFVBQU8sY0FBYyxJQUFkLEVBQW1CLEtBQW5CLEVBQXlCLFFBQXpCLENBQVAsQ0FsQjBDO0dBQXZCLENBQWhCLENBRmdDOztBQXVCcEMsTUFBSSxPQUFLLGlCQUFTLG9CQUFULENBQThCLEdBQTlCLENBQUwsQ0F2QmdDO0FBd0JwQyxTQUFLLEtBQUssSUFBTCxDQUFMLENBeEJvQzs7QUEwQnBDLFNBQU87QUFDTixhQURNO0FBRU4seUJBRk07QUFHTixlQUhNO0FBSU4saUJBSk07R0FBUCxDQTFCb0M7RUFBTixDQUEvQixDQURrQztDQUFwQjs7QUFzQ2YsU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQTRCLEtBQTVCLEVBQWtDLFFBQWxDLEVBQTJDO0FBQzFDLFNBQVEsR0FBUixDQUFZLElBQVosRUFEMEM7S0FFbkMsS0FBMEIsTUFBMUI7S0FBRyxPQUF1QixNQUF2QjtLQUFVLElBQWEsTUFBbEI7S0FBVSxnREFBUSwrQkFGUzs7QUFHMUMsS0FBRyxLQUFLLElBQUwsQ0FBSCxFQUNDLE9BQU8sZ0JBQU0sYUFBTix5QkFBb0IsS0FBSyxJQUFMLEdBQVksZ0RBQVUsVUFBMUMsQ0FBUCxDQURELEtBR0MsT0FBTyxJQUFQLENBSEQ7Q0FIRDs7QUFTQSxJQUFNLFVBQVEsU0FBUixPQUFRLE9BQWM7S0FBWix5QkFBWTs7QUFDM0IsS0FBSSxVQUFRLGdCQUFNLFFBQU4sQ0FBZSxPQUFmLENBQXVCLFFBQXZCLENBQVIsQ0FEdUI7QUFFM0IsS0FBRyxDQUFDLE9BQUQsSUFBWSxRQUFRLE1BQVIsSUFBZ0IsQ0FBaEIsRUFDZCxPQUFPLElBQVAsQ0FERCxLQUVLLElBQUcsUUFBUSxNQUFSLElBQWdCLENBQWhCLEVBQ1AsT0FBTyxnQkFBTSxRQUFOLENBQWUsSUFBZixDQUFvQixRQUFRLENBQVIsQ0FBcEIsQ0FBUCxDQURJLEtBR0osT0FBTzs7O0VBQU8sT0FBUDtFQUFQLENBSEk7Q0FKUTs7QUFVZCxJQUFNLE9BQUs7QUFDVixTQUFRO1NBQUc7RUFBSDtBQUNQLFdBQVMsS0FBVDtBQUNBLElBQUUsR0FBRjtBQUNBLElBQUUsTUFBRjtBQUNBLElBQUUsTUFBRjtBQUNBLG1CQUFpQjtNQUFFO1NBQU8sdUNBQUssS0FBSyxHQUFMLEVBQUw7RUFBVDtBQUNqQixZQUFVO01BQUU7TUFBSTtTQUFZOztLQUFHLE1BQU0sR0FBTixFQUFIO0dBQWUsUUFBZjs7RUFBbEI7QUFDVixNQUFJO01BQUU7U0FBWTs7O0dBQU87OztJQUFRLFFBQVI7SUFBUDs7RUFBZDtBQUNKLEtBQUcsSUFBSDtBQUNBLEtBQUcsSUFBSDtBQUNBLFVBQVEsd0JBQW9CO01BQWxCO01BQU0sMEJBQVk7O0FBQzVCLFNBQU8sZ0JBQU0sYUFBTixPQUF3QixLQUF4QixFQUFnQyxFQUFoQyxFQUFtQyxRQUFuQyxDQUFQLENBRDRCO0VBQXBCO0FBR1IsT0FBSztNQUFFO01BQU87TUFBTztTQUFZOzs7R0FBSTs7O0lBQUssUUFBTDtJQUFKOztFQUE1QjtBQUNMLFdBQVMsT0FBVDtBQUNBLFVBQVEsT0FBUjtBQUNBLFFBQU07TUFBRTtNQUFPO1NBQVksU0FBUyxJQUFULEdBQWdCOzs7R0FBTSxRQUFOO0dBQWhCO0VBQXJCO0FBQ04sU0FBTztNQUFFO01BQU87U0FBWSxTQUFTLElBQVQsR0FBZ0I7OztHQUFPLFFBQVA7R0FBaEI7RUFBckI7Q0FsQkg7O0FBdUJOLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBbUI7QUFDbEIsS0FBSSxNQUFJLHVCQUFNLElBQU4sQ0FBSixDQURjO0FBRWxCLEtBQUksTUFBSixFQUFZLElBQVosQ0FBaUIsVUFBQyxDQUFELEVBQUcsRUFBSCxFQUFRO0FBQ3hCLE1BQUksSUFBRSxJQUFJLEVBQUosQ0FBRixDQURvQjtBQUV4QixJQUFFLFdBQUYsQ0FBYyxFQUFFLElBQUYsRUFBZCxFQUZ3QjtFQUFSLENBQWpCLENBRmtCO0FBTWxCLFFBQU8sSUFBSSxJQUFKLEVBQVAsQ0FOa0I7Q0FBbkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoZmlsZSl7XHJcblx0cmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKGRvY3g9PntcclxuXHRcdGxldCBwcm9wZXJ0aWVzPXt9LCBzdGVwcz1bXSwgaW1hZ2VzPVtdXHJcblx0XHRsZXQgZG9jPWRvY3gucmVuZGVyKCh0eXBlLHByb3BzLGNoaWxkcmVuKT0+e1xyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgXCJwcm9wZXJ0eVwiOlxyXG5cdFx0XHRcdHByb3BlcnRpZXNbcHJvcHMubmFtZS50b0xvd2VyQ2FzZSgpXT1wcm9wcy52YWx1ZVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJzdGVwXCI6XHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJpbmxpbmUucGljdHVyZVwiOlxyXG5cdFx0XHRcdGltYWdlcy5wdXNoKHByb3BzLnVybClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcImJsb2NrXCI6XHJcblx0XHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0XHRsZXQgdGFnPXByb3BzLm5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzpzZHRQclwiKS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRhZ1wiKVxyXG5cdFx0XHRcdGlmKHRhZyAmJiB0YWcuYXR0cmlic1tcInc6dmFsXCJdPT1cImhpZGRlblwiKVxyXG5cdFx0XHRcdFx0cHJvcHMuaGlkZGVuPXRydWVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLHByb3BzLGNoaWxkcmVuKVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0bGV0IGh0bWw9UmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoZG9jKVxyXG5cdFx0aHRtbD10aWR5KGh0bWwpXHJcblx0XHRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGh0bWwsXHJcblx0XHRcdHByb3BlcnRpZXMsXHJcblx0XHRcdHN0ZXBzLFxyXG5cdFx0XHRpbWFnZXNcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSxwcm9wcyxjaGlsZHJlbil7XHJcblx0Y29uc29sZS5sb2codHlwZSlcclxuXHRjb25zdCB7cHIsbm9kZSx0eXBlOmEsLi4ub3RoZXJzfT1wcm9wc1xyXG5cdGlmKFRZUEVbdHlwZV0pXHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUWVBFW3R5cGVdLCBvdGhlcnMsLi4uY2hpbGRyZW4pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuY29uc3Qgd3JhcHBlcj0oe2NoaWxkcmVufSk9PntcclxuXHRsZXQgY29udGVudD1SZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG5cdGlmKCFjb250ZW50IHx8IGNvbnRlbnQubGVuZ3RoPT0wKVxyXG5cdFx0cmV0dXJuIG51bGxcclxuXHRlbHNlIGlmKGNvbnRlbnQubGVuZ3RoPT0xKVxyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkoY29udGVudFswXSlcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBUWVBFPXtcclxuXHRpZ25vcmU6IGE9Pm51bGxcclxuXHQsZG9jdW1lbnQ6XCJkaXZcIlxyXG5cdCxwOlwicFwiXHJcblx0LHI6XCJzcGFuXCJcclxuXHQsdDpcInNwYW5cIlxyXG5cdCxcImlubGluZS5waWN0dXJlXCI6KHt1cmx9KT0+PGltZyBzcmM9e3VybH0vPlxyXG5cdCxoeXBlcmxpbms6KHt1cmwsY2hpbGRyZW59KT0+PGEgaHJlZj17dXJsfT57Y2hpbGRyZW59PC9hPlxyXG5cdCx0Ymw6KHtjaGlsZHJlbn0pPT48dGFibGU+PHRib2R5PntjaGlsZHJlbn08L3Rib2R5PjwvdGFibGU+XHJcblx0LHRyOlwidHJcIlxyXG5cdCx0YzpcInRkXCJcclxuXHQsaGVhZGluZzooe2xldmVsLGNoaWxkcmVufSk9PntcclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGBoJHtsZXZlbH1gLHt9LGNoaWxkcmVuKVxyXG5cdH1cclxuXHQsbGlzdDooe251bUlkLCBsZXZlbCwgY2hpbGRyZW59KT0+PHVsPjxsaT57Y2hpbGRyZW59PC9saT48L3VsPlxyXG5cdCxwcm9wZXJ0eTp3cmFwcGVyXHJcblx0LGRyYXdpbmc6d3JhcHBlclxyXG5cdCxibG9jazooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPGRpdj57Y2hpbGRyZW59PC9kaXY+XHJcblx0LGlubGluZTooe2hpZGRlbixjaGlsZHJlbn0pPT5oaWRkZW4gPyBudWxsIDogPHNwYW4+e2NoaWxkcmVufTwvc3Bhbj5cclxufVxyXG5cclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuXHJcbmZ1bmN0aW9uIHRpZHkoaHRtbCl7XHJcblx0bGV0IHJhdz1jaGVlcihodG1sKVxyXG5cdHJhdyhcInNwYW5cIikuZWFjaCgoaSxlbCk9PntcclxuXHRcdGxldCAkPXJhdyhlbClcclxuXHRcdCQucmVwbGFjZVdpdGgoJC50ZXh0KCkpXHJcblx0fSlcclxuXHRyZXR1cm4gcmF3Lmh0bWwoKVxyXG59Il19