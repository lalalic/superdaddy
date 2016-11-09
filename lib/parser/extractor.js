"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = extract;

var _docxTemplate = require("docx-template");

var _docxTemplate2 = _interopRequireDefault(_docxTemplate);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _qiliApp = require("qili-app");

var _knowledge = require("../db/knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _ignore = require("./html/ignore");

var _ignore2 = _interopRequireDefault(_ignore);

var _document = require("./html/document");

var _document2 = _interopRequireDefault(_document);

var _property = require("./html/property");

var _property2 = _interopRequireDefault(_property);

var _p = require("./html/p");

var _p2 = _interopRequireDefault(_p);

var _table = require("./html/table");

var _table2 = _interopRequireDefault(_table);

var _tr = require("./html/tr");

var _tr2 = _interopRequireDefault(_tr);

var _td = require("./html/td");

var _td2 = _interopRequireDefault(_td);

var _text = require("./html/text");

var _text2 = _interopRequireDefault(_text);

var _image = require("./html/image");

var _image2 = _interopRequireDefault(_image);

var _hyperlink = require("./html/hyperlink");

var _hyperlink2 = _interopRequireDefault(_hyperlink);

var _step = require("./html/step");

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
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Document1).apply(this, arguments));
    }

    return Document1;
}(_docx4js3.default);

Document1.Factory = function (_docx4js$Factory) {
    (0, _inherits3.default)(_class, _docx4js$Factory);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: "create",
        value: function create(wXml, doc, parent, more) {
            var model = (0, _get3.default)((0, _getPrototypeOf2.default)(_class.prototype), "create", this).apply(this, arguments);
            if (_step2.default.is(model)) return new (Function.prototype.bind.apply(_step2.default.Model, [null].concat(Array.prototype.slice.call(arguments))))();

            return model;
        }
    }]);
    return _class;
}(_docx4js3.default.Factory);

function splitKey(data) {
    if (typeof data == 'string') data = [data];
    var keys = [];
    data.forEach(function (a) {
        return a.split(",").forEach(function (b) {
            return (b = b.trim()).length && keys.push(b);
        });
    });
    return keys;
}

function extract(file) {
    return _docxTemplate2.default.assemble(file, { channel: "interactive" }).then(function (docx) {
        return Document1.load(docx.data);
    }).then(function (docx) {
        return docx.parse(Document1.createVisitorFactory(MODELS));
    }).then(function (doc) {
        var content = doc.html;
        var properties = doc.properties;
        var elId = doc.id;
        var images = doc.images;
        var steps = doc.steps;
        var name = properties.name;
        var title = properties.title;
        var keywords = properties.keywords;
        var category = properties.category;
        var subject = properties.subject;
        var abstract = properties.abstract;
        var description = properties.description;
        var others = (0, _objectWithoutProperties3.default)(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);


        if (keywords) keywords = splitKey(keywords);

        if (category) category = splitKey(category);

        return {
            knowledge: {
                content: content,
                title: title || name,
                summary: abstract || description || subject,
                keywords: keywords, category: category,
                props: others,
                steps: steps
            },
            revoke: function revoke() {
                var nodes = window.document.querySelectorAll("#" + elId + " img.__revoking");
                Array.prototype.forEach.call(nodes, function (a) {
                    return URL.revokeObjectURL(a.src);
                });
            },
            getPhotos: function getPhotos() {
                return Array.prototype.map.call(window.document.querySelectorAll("#" + elId + " img"), function (a) {
                    return a.src;
                });
            },
            upload: function upload(entity) {
                var _this2 = this;

                var kind = _knowledge2.default._name,
                    more = { entity: { kind: kind, _id: entity._id } };
                return new _promise2.default(function (resolve, reject) {
                    return _qiliApp.File.find({ params: more, fields: "crc32" }).fetch(function (files) {
                        var pImages = images.map(function (image) {
                            var data = image.data,
                                crc32 = data.crc32;
                            if (files.find(function (a) {
                                return a.crc32 == crc32;
                            })) return undefined;

                            return _qiliApp.File.upload(data, "image", (0, _assign2.default)({ crc32: crc32, key: "a.jpg" }, more)).then(function (url) {
                                return image.data = url;
                            });
                        }).filter(function (a) {
                            return a;
                        });

                        var pRawDocx = _qiliApp.File.upload(file, "docx", (0, _assign2.default)({ key: "a.docx" }, more));

                        _promise2.default.all([pRawDocx].concat((0, _toConsumableArray3.default)(pImages))).then(function () {
                            resolve(_this2.knowledge.content = doc.html);
                        }, reject);
                    });
                } //fetch
                ); //promise
            }
        };
    });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBdUR3Qjs7QUF2RHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksU0FBTztBQUNWLGdDQURVO0FBRVYsd0NBRlU7QUFHViwwQkFIVTtBQUlWLDBCQUpVO0FBS1YscUJBTFU7QUFNVixzQkFOVTtBQU9WLHdCQVBVO0FBUVYsMEJBUlU7QUFTVixrQ0FUVTtBQVVWLHdCQVZVO0FBV1Ysd0JBWFU7QUFZViw0QkFaVTtBQWFWLDRCQWJVO0FBY1Ysb0NBZFU7Q0FBUDs7SUFpQkU7Ozs7Ozs7Ozs7O1VBQ0U7Ozs7Ozs7Ozs7K0JBQ0MsTUFBTSxLQUFLLFFBQVEsTUFBSztBQUM5QixnQkFBSSx3R0FBc0IsVUFBdEIsQ0FEMEI7QUFFOUIsZ0JBQUcsZUFBSyxFQUFMLENBQVEsS0FBUixDQUFILEVBQ0MsMENBQVcsZUFBSyxLQUFMLDJDQUFjLGVBQXpCLENBREQ7O0FBR0EsbUJBQU8sS0FBUCxDQUw4Qjs7OztFQURILGtCQUFRLE9BQVI7O0FBVzlCLFNBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF1QjtBQUN0QixRQUFHLE9BQU8sSUFBUCxJQUFjLFFBQWQsRUFDRixPQUFLLENBQUMsSUFBRCxDQUFMLENBREQ7QUFFQSxRQUFJLE9BQUssRUFBTCxDQUhrQjtBQUl0QixTQUFLLE9BQUwsQ0FBYTtlQUFHLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxPQUFiLENBQXFCO21CQUFJLENBQUMsSUFBRSxFQUFFLElBQUYsRUFBRixDQUFELENBQWEsTUFBYixJQUF1QixLQUFLLElBQUwsQ0FBVSxDQUFWLENBQXZCO1NB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NEI7eUJBQVQsQ0FBWCxDQVFULE1BUlMsQ0FRRixVQUFDLENBQUQ7bUNBQUs7eUJBQUwsQ0FSTixDQUQrQzs7QUFXbkQsNEJBQUksV0FBUyxjQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWlCLE1BQWpCLEVBQXlCLHNCQUFjLEVBQUMsS0FBSSxRQUFKLEVBQWYsRUFBNkIsSUFBN0IsQ0FBekIsQ0FBVCxDQVgrQzs7QUFhbkQsMENBQVEsR0FBUixFQUFhLGtEQUFhLFNBQTFCLEVBQ0ssSUFETCxDQUNVLFlBQUk7QUFDRixvQ0FBUSxPQUFLLFNBQUwsQ0FBZSxPQUFmLEdBQXVCLElBQUksSUFBSixDQUEvQixDQURFO3lCQUFKLEVBRUMsTUFIWCxFQWJtRDtxQkFBVDtpQkFEL0I7QUFBWixpQkFBUDtBQUhVLGFBaEJYO1NBQVAsQ0FWb0U7S0FBTCxDQUZuRSxDQURpQztDQUF0QiIsImZpbGUiOiJleHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeEh1YiBmcm9tIFwiZG9jeC10ZW1wbGF0ZVwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuXHJcbmltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5cclxuaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9odG1sL2lnbm9yZVwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9odG1sL2RvY3VtZW50XCJcclxuaW1wb3J0IGRvY3VtZW50UHJvcGVydHkgZnJvbSBcIi4vaHRtbC9wcm9wZXJ0eVwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vaHRtbC9wXCJcclxuaW1wb3J0IHRhYmxlIGZyb20gXCIuL2h0bWwvdGFibGVcIlxyXG5pbXBvcnQgcm93IGZyb20gXCIuL2h0bWwvdHJcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi9odG1sL3RkXCJcclxuaW1wb3J0IHRleHQgZnJvbSBcIi4vaHRtbC90ZXh0XCJcclxuaW1wb3J0IGltYWdlIGZyb20gXCIuL2h0bWwvaW1hZ2VcIlxyXG5pbXBvcnQgaHlwZXJsaW5rIGZyb20gXCIuL2h0bWwvaHlwZXJsaW5rXCJcclxuaW1wb3J0IHN0ZXAgZnJvbSAnLi9odG1sL3N0ZXAnXHJcblxyXG52YXIgTU9ERUxTPXtcclxuXHRkb2N1bWVudCxcclxuXHRkb2N1bWVudFByb3BlcnR5LFxyXG5cdHBhcmFncmFwaCxcclxuXHR0YWJsZSxcclxuXHRyb3csXHJcblx0Y2VsbCxcclxuXHR0ZXh0LFxyXG5cdGltYWdlLFxyXG5cdGh5cGVybGluayxcclxuXHRzdGVwLFxyXG5cdGhlYWRpbmc6IHBhcmFncmFwaCxcclxuXHRoZWFkZXI6IElnbm9yZSxcclxuXHRmb290ZXI6IElnbm9yZSxcclxuXHRkb2N1bWVudFN0eWxlczogSWdub3JlXHJcbn1cclxuXHJcbmNsYXNzIERvY3VtZW50MSBleHRlbmRzIGRvY3g0anN7XHJcblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3MgZXh0ZW5kcyBkb2N4NGpzLkZhY3Rvcnl7XHJcblx0XHRjcmVhdGUod1htbCwgZG9jLCBwYXJlbnQsIG1vcmUpe1xyXG5cdFx0XHRsZXQgbW9kZWw9c3VwZXIuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYoc3RlcC5pcyhtb2RlbCkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBzdGVwLk1vZGVsKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3BsaXRLZXkoZGF0YSl7XHJcblx0aWYodHlwZW9mKGRhdGEpPT0nc3RyaW5nJylcclxuXHRcdGRhdGE9W2RhdGFdXHJcblx0dmFyIGtleXM9W11cclxuXHRkYXRhLmZvckVhY2goYT0+YS5zcGxpdChcIixcIikuZm9yRWFjaChiPT4oKGI9Yi50cmltKCkpLmxlbmd0aCAmJiBrZXlzLnB1c2goYikpKSlcclxuXHRyZXR1cm4ga2V5c1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIGRvY3hIdWIuYXNzZW1ibGUoZmlsZSx7Y2hhbm5lbDpcImludGVyYWN0aXZlXCJ9KVxyXG5cdFx0LnRoZW4oZG9jeD0+RG9jdW1lbnQxLmxvYWQoZG9jeC5kYXRhKSlcclxuXHRcdC50aGVuKGRvY3g9PmRvY3gucGFyc2UoRG9jdW1lbnQxLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KE1PREVMUykpKS50aGVuKGRvYz0+e1xyXG4gICAgICAgIHZhciB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXMsIHN0ZXBzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcblx0XHRpZihrZXl3b3JkcylcclxuXHRcdFx0a2V5d29yZHM9c3BsaXRLZXkoa2V5d29yZHMpXHJcblxyXG5cdFx0aWYoY2F0ZWdvcnkpXHJcblx0XHRcdGNhdGVnb3J5PXNwbGl0S2V5KGNhdGVnb3J5KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnMsXHJcblx0XHRcdFx0c3RlcHNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZy5fX3Jldm9raW5nYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksKGEpPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIl19