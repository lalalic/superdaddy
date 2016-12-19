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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNkN3Qjs7QUE3Q3hCOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFNBQU87QUFDWiw2QkFEWTtBQUVaLHFDQUZZO0FBR1osdUJBSFk7QUFJWix1QkFKWTtBQUtaLGtCQUxZO0FBTVosbUJBTlk7QUFPWixxQkFQWTtBQVFaLHVCQVJZO0FBU1osK0JBVFk7QUFVWixxQkFWWTtBQVdaLHFCQVhZO0FBWVoseUJBWlk7QUFhWix5QkFiWTtBQWNaLGlDQWRZO0NBQVA7O0lBaUJBOzs7Ozs7Ozs7OztVQUNFOzs7Ozs7Ozs7O3lCQUNDLE1BQU0sS0FBSyxRQUFRLE1BQUs7QUFDOUIsT0FBSSxzSUFBc0IsVUFBdEIsQ0FEMEI7QUFFOUIsT0FBRyxlQUFLLEVBQUwsQ0FBUSxLQUFSLENBQUgsRUFDQywwQ0FBVyxlQUFLLEtBQUwsMkNBQWMsZUFBekIsQ0FERDs7QUFHQSxVQUFPLEtBQVAsQ0FMOEI7Ozs7RUFESCxrQkFBUSxPQUFSOztBQVdmLFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBb0I7QUFDbEMsUUFBTyx1QkFBUSxRQUFSLENBQWlCLElBQWpCLEVBQXNCLEVBQUMsU0FBUSxhQUFSLEVBQXZCLEVBQ0wsSUFESyxDQUNBO1NBQU0sVUFBVSxJQUFWLENBQWUsS0FBSyxJQUFMO0VBQXJCLENBREEsQ0FFTCxJQUZLLENBRUE7U0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUFVLG9CQUFWLENBQStCLE1BQS9CLENBQVg7RUFBTixDQUZQLENBRGtDO0NBQXBCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3hIdWIgZnJvbSBcImRvY3gtdGVtcGxhdGVcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5cclxuaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9pZ25vcmVcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgZG9jdW1lbnRQcm9wZXJ0eSBmcm9tIFwiLi9wcm9wZXJ0eVwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vcFwiXHJcbmltcG9ydCB0YWJsZSBmcm9tIFwiLi90YWJsZVwiXHJcbmltcG9ydCByb3cgZnJvbSBcIi4vdHJcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi90ZFwiXHJcbmltcG9ydCB0ZXh0IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgaW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgaHlwZXJsaW5rIGZyb20gXCIuL2h5cGVybGlua1wiXHJcbmltcG9ydCBzdGVwIGZyb20gJy4vc3RlcCdcclxuXHJcbmNvbnN0IE1PREVMUz17XHJcblx0ZG9jdW1lbnQsXHJcblx0ZG9jdW1lbnRQcm9wZXJ0eSxcclxuXHRwYXJhZ3JhcGgsXHJcblx0dGFibGUsXHJcblx0cm93LFxyXG5cdGNlbGwsXHJcblx0dGV4dCxcclxuXHRpbWFnZSxcclxuXHRoeXBlcmxpbmssXHJcblx0c3RlcCxcclxuXHRoZWFkaW5nOiBwYXJhZ3JhcGgsXHJcblx0aGVhZGVyOiBJZ25vcmUsXHJcblx0Zm9vdGVyOiBJZ25vcmUsXHJcblx0ZG9jdW1lbnRTdHlsZXM6IElnbm9yZVxyXG59XHJcblxyXG5jbGFzcyBEb2N1bWVudDEgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdHN0YXRpYyBGYWN0b3J5PWNsYXNzIGV4dGVuZHMgZG9jeDRqcy5GYWN0b3J5e1xyXG5cdFx0Y3JlYXRlKHdYbWwsIGRvYywgcGFyZW50LCBtb3JlKXtcclxuXHRcdFx0bGV0IG1vZGVsPXN1cGVyLmNyZWF0ZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKHN0ZXAuaXMobW9kZWwpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgc3RlcC5Nb2RlbCguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKGZpbGUpe1xyXG5cdHJldHVybiBkb2N4SHViLmFzc2VtYmxlKGZpbGUse2NoYW5uZWw6XCJpbnRlcmFjdGl2ZVwifSlcclxuXHRcdC50aGVuKGRvY3g9PkRvY3VtZW50MS5sb2FkKGRvY3guZGF0YSkpXHJcblx0XHQudGhlbihkb2N4PT5kb2N4LnBhcnNlKERvY3VtZW50MS5jcmVhdGVWaXNpdG9yRmFjdG9yeShNT0RFTFMpKSlcclxufVxyXG4iXX0=