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

var Document = function (_docx4js) {
    _inherits(Document, _docx4js);

    function Document() {
        _classCallCheck(this, Document);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
    }

    return Document;
}(_docx4js3.default);

Document.Factory = function (_docx4js$Factory) {
    _inherits(_class, _docx4js$Factory);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "create",
        value: function create(wXml, doc, parent, more) {
            var model = _get(Object.getPrototypeOf(_class.prototype), "create", this).apply(this, arguments);
            if (Step.is(wXml)) return new (Function.prototype.bind.apply(Step.Model, [null].concat(Array.prototype.slice.call(arguments))))();

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
        return docx.parse(Document.createVisitorFactory(MODELS));
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBdUR3Qjs7QUF2RHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU87QUFDVixnQ0FEVTtBQUVWLHdDQUZVO0FBR1YsMEJBSFU7QUFJViwwQkFKVTtBQUtWLHFCQUxVO0FBTVYsc0JBTlU7QUFPVix3QkFQVTtBQVFWLDBCQVJVO0FBU1Ysa0NBVFU7QUFVVix3QkFWVTtBQVdWLHdCQVhVO0FBWVYsNEJBWlU7QUFhViw0QkFiVTtBQWNWLG9DQWRVO0NBQVA7O0lBaUJFOzs7Ozs7Ozs7Ozs7U0FDRTs7Ozs7Ozs7Ozs7K0JBQ0MsTUFBTSxLQUFLLFFBQVEsTUFBSztBQUM5QixnQkFBSSxrRkFBc0IsVUFBdEIsQ0FEMEI7QUFFOUIsZ0JBQUcsS0FBSyxFQUFMLENBQVEsSUFBUixDQUFILEVBQ0MsMENBQVcsS0FBSyxLQUFMLDJDQUFjLGVBQXpCLENBREQ7O0FBR0EsbUJBQU8sS0FBUCxDQUw4Qjs7Ozs7RUFESCxrQkFBUSxPQUFSOztBQVc5QixTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPLElBQVAsSUFBYyxRQUFkLEVBQ0YsT0FBSyxDQUFDLElBQUQsQ0FBTCxDQUREO0FBRUEsUUFBSSxPQUFLLEVBQUwsQ0FIa0I7QUFJdEIsU0FBSyxPQUFMLENBQWE7ZUFBRyxFQUFFLEtBQUYsQ0FBUSxHQUFSLEVBQWEsT0FBYixDQUFxQjttQkFBSSxDQUFDLElBQUUsRUFBRSxJQUFGLEVBQUYsQ0FBRCxDQUFhLE1BQWIsSUFBdUIsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUF2QjtTQUFKO0tBQXhCLENBQWIsQ0FKc0I7QUFL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OztBQVduRCw0QkFBSSxXQUFTLGNBQUssTUFBTCxDQUFZLElBQVosRUFBaUIsTUFBakIsRUFBeUIsT0FBTyxNQUFQLENBQWMsRUFBQyxLQUFJLFFBQUosRUFBZixFQUE2QixJQUE3QixDQUF6QixDQUFULENBWCtDOztBQWFuRCxnQ0FBUSxHQUFSLEVBQWEsb0NBQWEsU0FBMUIsRUFDSyxJQURMLENBQ1UsWUFBSTtBQUNGLG9DQUFRLE9BQUssU0FBTCxDQUFlLE9BQWYsR0FBdUIsSUFBSSxJQUFKLENBQS9CLENBREU7eUJBQUosRUFFQyxNQUhYLEVBYm1EO3FCQUFUO2lCQUQvQjtBQUFaLGlCQUFQO0FBSFUsYUFoQlg7U0FBUCxDQVZtRTtLQUFMLENBRGxFLENBRGlDO0NBQXRCIiwiZmlsZSI6ImV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4SHViIGZyb20gXCJkb2N4LXRlbXBsYXRlXCJcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcblxyXG5pbXBvcnQgSWdub3JlIGZyb20gXCIuL2h0bWwvaWdub3JlXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2h0bWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgZG9jdW1lbnRQcm9wZXJ0eSBmcm9tIFwiLi9odG1sL3Byb3BlcnR5XCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9odG1sL3BcIlxyXG5pbXBvcnQgdGFibGUgZnJvbSBcIi4vaHRtbC90YWJsZVwiXHJcbmltcG9ydCByb3cgZnJvbSBcIi4vaHRtbC90clwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL2h0bWwvdGRcIlxyXG5pbXBvcnQgdGV4dCBmcm9tIFwiLi9odG1sL3RleHRcIlxyXG5pbXBvcnQgaW1hZ2UgZnJvbSBcIi4vaHRtbC9pbWFnZVwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHRtbC9oeXBlcmxpbmtcIlxyXG5pbXBvcnQgc3RlcCBmcm9tICcuL2h0bWwvc3RlcCdcclxuXHJcbnZhciBNT0RFTFM9e1xyXG5cdGRvY3VtZW50LFxyXG5cdGRvY3VtZW50UHJvcGVydHksXHJcblx0cGFyYWdyYXBoLFxyXG5cdHRhYmxlLFxyXG5cdHJvdyxcclxuXHRjZWxsLFxyXG5cdHRleHQsXHJcblx0aW1hZ2UsXHJcblx0aHlwZXJsaW5rLFxyXG5cdHN0ZXAsXHJcblx0aGVhZGluZzogcGFyYWdyYXBoLFxyXG5cdGhlYWRlcjogSWdub3JlLFxyXG5cdGZvb3RlcjogSWdub3JlLFxyXG5cdGRvY3VtZW50U3R5bGVzOiBJZ25vcmVcclxufVxyXG5cclxuY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdHN0YXRpYyBGYWN0b3J5PWNsYXNzIGV4dGVuZHMgZG9jeDRqcy5GYWN0b3J5e1xyXG5cdFx0Y3JlYXRlKHdYbWwsIGRvYywgcGFyZW50LCBtb3JlKXtcclxuXHRcdFx0bGV0IG1vZGVsPXN1cGVyLmNyZWF0ZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKFN0ZXAuaXMod1htbCkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBTdGVwLk1vZGVsKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3BsaXRLZXkoZGF0YSl7XHJcblx0aWYodHlwZW9mKGRhdGEpPT0nc3RyaW5nJylcclxuXHRcdGRhdGE9W2RhdGFdXHJcblx0dmFyIGtleXM9W11cclxuXHRkYXRhLmZvckVhY2goYT0+YS5zcGxpdChcIixcIikuZm9yRWFjaChiPT4oKGI9Yi50cmltKCkpLmxlbmd0aCAmJiBrZXlzLnB1c2goYikpKSlcclxuXHRyZXR1cm4ga2V5c1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIGRvY3hIdWIuYXNzZW1ibGUoZmlsZSx7Y2hhbm5lbDpcImludGVyYWN0aXZlXCJ9KVxyXG5cdFx0LnRoZW4oZG9jeD0+ZG9jeC5wYXJzZShEb2N1bWVudC5jcmVhdGVWaXNpdG9yRmFjdG9yeShNT0RFTFMpKSkudGhlbihkb2M9PntcclxuICAgICAgICB2YXIge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzLCBzdGVwc309ZG9jLFxyXG4gICAgICAgICAgICB7bmFtZSx0aXRsZSwga2V5d29yZHMsIGNhdGVnb3J5LCBzdWJqZWN0LCBhYnN0cmFjdCxkZXNjcmlwdGlvbiwgLi4ub3RoZXJzfT1wcm9wZXJ0aWVzXHJcblxyXG5cdFx0aWYoa2V5d29yZHMpXHJcblx0XHRcdGtleXdvcmRzPXNwbGl0S2V5KGtleXdvcmRzKVxyXG5cclxuXHRcdGlmKGNhdGVnb3J5KVxyXG5cdFx0XHRjYXRlZ29yeT1zcGxpdEtleShjYXRlZ29yeSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzLFxyXG5cdFx0XHRcdHN0ZXBzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goKGZpbGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEltYWdlcz1pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPWltYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JjMzI9ZGF0YS5jcmMzMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVzLmZpbmQoKGEpPT5hLmNyYzMyPT1jcmMzMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsZS51cGxvYWQoZGF0YSwgXCJpbWFnZVwiLCBPYmplY3QuYXNzaWduKHtjcmMzMixrZXk6XCJhLmpwZ1wifSxtb3JlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXJsKT0+aW1hZ2UuZGF0YT11cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcigoYSk9PmEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFJhd0RvY3g9RmlsZS51cGxvYWQoZmlsZSxcImRvY3hcIiwgT2JqZWN0LmFzc2lnbih7a2V5OlwiYS5kb2N4XCJ9LG1vcmUpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UuY29udGVudD1kb2MuaHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==