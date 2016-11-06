"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _inherits(Document1, _docx4js);

    function Document1() {
        _classCallCheck(this, Document1);

        return _possibleConstructorReturn(this, (Document1.__proto__ || Object.getPrototypeOf(Document1)).apply(this, arguments));
    }

    return Document1;
}(_docx4js3.default);

Document1.Factory = function (_docx4js$Factory) {
    _inherits(_class, _docx4js$Factory);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "create",
        value: function create(wXml, doc, parent, more) {
            var model = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "create", this).apply(this, arguments);
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

        var others = _objectWithoutProperties(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);

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
                return new Promise(function (resolve, reject) {
                    return _qiliApp.File.find({ params: more, fields: "crc32" }).fetch(function (files) {
                        var pImages = images.map(function (image) {
                            var data = image.data,
                                crc32 = data.crc32;
                            if (files.find(function (a) {
                                return a.crc32 == crc32;
                            })) return undefined;

                            return _qiliApp.File.upload(data, "image", Object.assign({ crc32: crc32, key: "a.jpg" }, more)).then(function (url) {
                                return image.data = url;
                            });
                        }).filter(function (a) {
                            return a;
                        });

                        var pRawDocx = _qiliApp.File.upload(file, "docx", Object.assign({ key: "a.docx" }, more));

                        Promise.all([pRawDocx].concat(_toConsumableArray(pImages))).then(function () {
                            resolve(_this2.knowledge.content = doc.html);
                        }, reject);
                    });
                } //fetch
                ); //promise
            }
        };
    });
}
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbImV4dHJhY3QiLCJNT0RFTFMiLCJkb2N1bWVudCIsImRvY3VtZW50UHJvcGVydHkiLCJwYXJhZ3JhcGgiLCJ0YWJsZSIsInJvdyIsImNlbGwiLCJ0ZXh0IiwiaW1hZ2UiLCJoeXBlcmxpbmsiLCJzdGVwIiwiaGVhZGluZyIsImhlYWRlciIsImZvb3RlciIsImRvY3VtZW50U3R5bGVzIiwiRG9jdW1lbnQxIiwiRmFjdG9yeSIsIndYbWwiLCJkb2MiLCJwYXJlbnQiLCJtb3JlIiwibW9kZWwiLCJhcmd1bWVudHMiLCJpcyIsIk1vZGVsIiwic3BsaXRLZXkiLCJkYXRhIiwia2V5cyIsImZvckVhY2giLCJhIiwic3BsaXQiLCJiIiwidHJpbSIsImxlbmd0aCIsInB1c2giLCJmaWxlIiwiYXNzZW1ibGUiLCJjaGFubmVsIiwidGhlbiIsImxvYWQiLCJkb2N4IiwicGFyc2UiLCJjcmVhdGVWaXNpdG9yRmFjdG9yeSIsImNvbnRlbnQiLCJodG1sIiwicHJvcGVydGllcyIsImVsSWQiLCJpZCIsImltYWdlcyIsInN0ZXBzIiwibmFtZSIsInRpdGxlIiwia2V5d29yZHMiLCJjYXRlZ29yeSIsInN1YmplY3QiLCJhYnN0cmFjdCIsImRlc2NyaXB0aW9uIiwib3RoZXJzIiwia25vd2xlZGdlIiwic3VtbWFyeSIsInByb3BzIiwicmV2b2tlIiwibm9kZXMiLCJ3aW5kb3ciLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiVVJMIiwicmV2b2tlT2JqZWN0VVJMIiwic3JjIiwiZ2V0UGhvdG9zIiwibWFwIiwidXBsb2FkIiwiZW50aXR5Iiwia2luZCIsIl9uYW1lIiwiX2lkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmaW5kIiwicGFyYW1zIiwiZmllbGRzIiwiZmV0Y2giLCJmaWxlcyIsInBJbWFnZXMiLCJjcmMzMiIsInVuZGVmaW5lZCIsIk9iamVj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QUNKO0FBdkNFLFNBQVA7QUF5Q0gsS0FyRE0sQ0FBUDtBQXNESCIsImZpbGUiOiJleHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeEh1YiBmcm9tIFwiZG9jeC10ZW1wbGF0ZVwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuXHJcbmltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5cclxuaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9odG1sL2lnbm9yZVwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9odG1sL2RvY3VtZW50XCJcclxuaW1wb3J0IGRvY3VtZW50UHJvcGVydHkgZnJvbSBcIi4vaHRtbC9wcm9wZXJ0eVwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vaHRtbC9wXCJcclxuaW1wb3J0IHRhYmxlIGZyb20gXCIuL2h0bWwvdGFibGVcIlxyXG5pbXBvcnQgcm93IGZyb20gXCIuL2h0bWwvdHJcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi9odG1sL3RkXCJcclxuaW1wb3J0IHRleHQgZnJvbSBcIi4vaHRtbC90ZXh0XCJcclxuaW1wb3J0IGltYWdlIGZyb20gXCIuL2h0bWwvaW1hZ2VcIlxyXG5pbXBvcnQgaHlwZXJsaW5rIGZyb20gXCIuL2h0bWwvaHlwZXJsaW5rXCJcclxuaW1wb3J0IHN0ZXAgZnJvbSAnLi9odG1sL3N0ZXAnXHJcblxyXG52YXIgTU9ERUxTPXtcclxuXHRkb2N1bWVudCxcclxuXHRkb2N1bWVudFByb3BlcnR5LFxyXG5cdHBhcmFncmFwaCxcclxuXHR0YWJsZSxcclxuXHRyb3csXHJcblx0Y2VsbCxcclxuXHR0ZXh0LFxyXG5cdGltYWdlLFxyXG5cdGh5cGVybGluayxcclxuXHRzdGVwLFxyXG5cdGhlYWRpbmc6IHBhcmFncmFwaCxcclxuXHRoZWFkZXI6IElnbm9yZSxcclxuXHRmb290ZXI6IElnbm9yZSxcclxuXHRkb2N1bWVudFN0eWxlczogSWdub3JlXHJcbn1cclxuXHJcbmNsYXNzIERvY3VtZW50MSBleHRlbmRzIGRvY3g0anN7XHJcblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3MgZXh0ZW5kcyBkb2N4NGpzLkZhY3Rvcnl7XHJcblx0XHRjcmVhdGUod1htbCwgZG9jLCBwYXJlbnQsIG1vcmUpe1xyXG5cdFx0XHRsZXQgbW9kZWw9c3VwZXIuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYoc3RlcC5pcyhtb2RlbCkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBzdGVwLk1vZGVsKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3BsaXRLZXkoZGF0YSl7XHJcblx0aWYodHlwZW9mKGRhdGEpPT0nc3RyaW5nJylcclxuXHRcdGRhdGE9W2RhdGFdXHJcblx0dmFyIGtleXM9W11cclxuXHRkYXRhLmZvckVhY2goYT0+YS5zcGxpdChcIixcIikuZm9yRWFjaChiPT4oKGI9Yi50cmltKCkpLmxlbmd0aCAmJiBrZXlzLnB1c2goYikpKSlcclxuXHRyZXR1cm4ga2V5c1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIGRvY3hIdWIuYXNzZW1ibGUoZmlsZSx7Y2hhbm5lbDpcImludGVyYWN0aXZlXCJ9KVxyXG5cdFx0LnRoZW4oZG9jeD0+RG9jdW1lbnQxLmxvYWQoZG9jeC5kYXRhKSlcclxuXHRcdC50aGVuKGRvY3g9PmRvY3gucGFyc2UoRG9jdW1lbnQxLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KE1PREVMUykpKS50aGVuKGRvYz0+e1xyXG4gICAgICAgIHZhciB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXMsIHN0ZXBzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcblx0XHRpZihrZXl3b3JkcylcclxuXHRcdFx0a2V5d29yZHM9c3BsaXRLZXkoa2V5d29yZHMpXHJcblxyXG5cdFx0aWYoY2F0ZWdvcnkpXHJcblx0XHRcdGNhdGVnb3J5PXNwbGl0S2V5KGNhdGVnb3J5KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnMsXHJcblx0XHRcdFx0c3RlcHNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZy5fX3Jldm9raW5nYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksKGEpPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIl19