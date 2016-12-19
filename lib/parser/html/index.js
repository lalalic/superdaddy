"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = parse;

var _docxTemplate = require("docx-template");

var _docxTemplate2 = _interopRequireDefault(_docxTemplate);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _ignore = require("./ignore");

var _ignore2 = _interopRequireDefault(_ignore);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _property = require("./property");

var _property2 = _interopRequireDefault(_property);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _tr = require("./tr");

var _tr2 = _interopRequireDefault(_tr);

var _td = require("./td");

var _td2 = _interopRequireDefault(_td);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _hyperlink = require("./hyperlink");

var _hyperlink2 = _interopRequireDefault(_hyperlink);

var _step = require("./step");

var _step2 = _interopRequireDefault(_step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODELS = {
	document: _document2.default,
	documentProperty: _property2.default,
	paragraph: _p2.default,
	table: _table2.default,
	row: _tr2.default,
	cell: _td2.default,
	text: _text2.default,
	image: _image2.default,
	hyperlink: _hyperlink2.default,
	step: _step2.default,
	heading: _p2.default,
	header: _ignore2.default,
	footer: _ignore2.default,
	documentStyles: _ignore2.default
};

var Document1 = function (_docx4js) {
	(0, _inherits3.default)(Document1, _docx4js);

	function Document1() {
		(0, _classCallCheck3.default)(this, Document1);
		return (0, _possibleConstructorReturn3.default)(this, (Document1.__proto__ || (0, _getPrototypeOf2.default)(Document1)).apply(this, arguments));
	}

	return Document1;
}(_docx4js3.default);

Document1.Factory = function (_docx4js$Factory) {
	(0, _inherits3.default)(_class, _docx4js$Factory);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "create",
		value: function create(wXml, doc, parent, more) {
			var model = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "create", this).apply(this, arguments);
			if (_step2.default.is(model)) return new (Function.prototype.bind.apply(_step2.default.Model, [null].concat(Array.prototype.slice.call(arguments))))();

			return model;
		}
	}]);
	return _class;
}(_docx4js3.default.Factory);

function parse(file) {
	return _docxTemplate2.default.assemble(file, { channel: "interactive" }).then(function (docx) {
		return Document1.load(docx.data);
	}).then(function (docx) {
		return docx.parse(Document1.createVisitorFactory(MODELS));
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJwYXJzZSIsIk1PREVMUyIsImRvY3VtZW50IiwiZG9jdW1lbnRQcm9wZXJ0eSIsInBhcmFncmFwaCIsInRhYmxlIiwicm93IiwiY2VsbCIsInRleHQiLCJpbWFnZSIsImh5cGVybGluayIsInN0ZXAiLCJoZWFkaW5nIiwiaGVhZGVyIiwiZm9vdGVyIiwiZG9jdW1lbnRTdHlsZXMiLCJEb2N1bWVudDEiLCJGYWN0b3J5Iiwid1htbCIsImRvYyIsInBhcmVudCIsIm1vcmUiLCJtb2RlbCIsImFyZ3VtZW50cyIsImlzIiwiTW9kZWwiLCJmaWxlIiwiYXNzZW1ibGUiLCJjaGFubmVsIiwidGhlbiIsImxvYWQiLCJkb2N4IiwiZGF0YSIsImNyZWF0ZVZpc2l0b3JGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNkN3QkEsSzs7QUE3Q3hCOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLDZCQURZO0FBRVpDLHFDQUZZO0FBR1pDLHVCQUhZO0FBSVpDLHVCQUpZO0FBS1pDLGtCQUxZO0FBTVpDLG1CQU5ZO0FBT1pDLHFCQVBZO0FBUVpDLHVCQVJZO0FBU1pDLCtCQVRZO0FBVVpDLHFCQVZZO0FBV1pDLHFCQVhZO0FBWVpDLHlCQVpZO0FBYVpDLHlCQWJZO0FBY1pDO0FBZFksQ0FBYjs7SUFpQk1DLFM7Ozs7Ozs7Ozs7O0FBQUFBLFMsQ0FDRUMsTzs7Ozs7Ozs7Ozt5QkFDQ0MsSSxFQUFNQyxHLEVBQUtDLE0sRUFBUUMsSSxFQUFLO0FBQzlCLE9BQUlDLHNJQUFzQkMsU0FBdEIsQ0FBSjtBQUNBLE9BQUcsZUFBS0MsRUFBTCxDQUFRRixLQUFSLENBQUgsRUFDQywwQ0FBVyxlQUFLRyxLQUFoQiwyQ0FBeUJGLFNBQXpCOztBQUVELFVBQU9ELEtBQVA7QUFDQTs7O0VBUDJCLGtCQUFRTCxPOztBQVd2QixTQUFTakIsS0FBVCxDQUFlMEIsSUFBZixFQUFvQjtBQUNsQyxRQUFPLHVCQUFRQyxRQUFSLENBQWlCRCxJQUFqQixFQUFzQixFQUFDRSxTQUFRLGFBQVQsRUFBdEIsRUFDTEMsSUFESyxDQUNBO0FBQUEsU0FBTWIsVUFBVWMsSUFBVixDQUFlQyxLQUFLQyxJQUFwQixDQUFOO0FBQUEsRUFEQSxFQUVMSCxJQUZLLENBRUE7QUFBQSxTQUFNRSxLQUFLL0IsS0FBTCxDQUFXZ0IsVUFBVWlCLG9CQUFWLENBQStCaEMsTUFBL0IsQ0FBWCxDQUFOO0FBQUEsRUFGQSxDQUFQO0FBR0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeEh1YiBmcm9tIFwiZG9jeC10ZW1wbGF0ZVwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuXHJcblxyXG5pbXBvcnQgSWdub3JlIGZyb20gXCIuL2lnbm9yZVwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBkb2N1bWVudFByb3BlcnR5IGZyb20gXCIuL3Byb3BlcnR5XCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuaW1wb3J0IHRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi90clwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL3RkXCJcclxuaW1wb3J0IHRleHQgZnJvbSBcIi4vdGV4dFwiXHJcbmltcG9ydCBpbWFnZSBmcm9tIFwiLi9pbWFnZVwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHlwZXJsaW5rXCJcclxuaW1wb3J0IHN0ZXAgZnJvbSAnLi9zdGVwJ1xyXG5cclxuY29uc3QgTU9ERUxTPXtcclxuXHRkb2N1bWVudCxcclxuXHRkb2N1bWVudFByb3BlcnR5LFxyXG5cdHBhcmFncmFwaCxcclxuXHR0YWJsZSxcclxuXHRyb3csXHJcblx0Y2VsbCxcclxuXHR0ZXh0LFxyXG5cdGltYWdlLFxyXG5cdGh5cGVybGluayxcclxuXHRzdGVwLFxyXG5cdGhlYWRpbmc6IHBhcmFncmFwaCxcclxuXHRoZWFkZXI6IElnbm9yZSxcclxuXHRmb290ZXI6IElnbm9yZSxcclxuXHRkb2N1bWVudFN0eWxlczogSWdub3JlXHJcbn1cclxuXHJcbmNsYXNzIERvY3VtZW50MSBleHRlbmRzIGRvY3g0anN7XHJcblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3MgZXh0ZW5kcyBkb2N4NGpzLkZhY3Rvcnl7XHJcblx0XHRjcmVhdGUod1htbCwgZG9jLCBwYXJlbnQsIG1vcmUpe1xyXG5cdFx0XHRsZXQgbW9kZWw9c3VwZXIuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYoc3RlcC5pcyhtb2RlbCkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBzdGVwLk1vZGVsKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoZmlsZSl7XHJcblx0cmV0dXJuIGRvY3hIdWIuYXNzZW1ibGUoZmlsZSx7Y2hhbm5lbDpcImludGVyYWN0aXZlXCJ9KVxyXG5cdFx0LnRoZW4oZG9jeD0+RG9jdW1lbnQxLmxvYWQoZG9jeC5kYXRhKSlcclxuXHRcdC50aGVuKGRvY3g9PmRvY3gucGFyc2UoRG9jdW1lbnQxLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KE1PREVMUykpKVxyXG59XHJcbiJdfQ==