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
        var content = doc.html,
            properties = doc.properties,
            elId = doc.id,
            images = doc.images,
            steps = doc.steps,
            name = properties.name,
            title = properties.title,
            keywords = properties.keywords,
            category = properties.category,
            subject = properties.subject,
            abstract = properties.abstract,
            description = properties.description,
            others = (0, _objectWithoutProperties3.default)(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBdUR3Qjs7QUF2RHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksU0FBTztBQUNWLGdDQURVO0FBRVYsd0NBRlU7QUFHViwwQkFIVTtBQUlWLDBCQUpVO0FBS1YscUJBTFU7QUFNVixzQkFOVTtBQU9WLHdCQVBVO0FBUVYsMEJBUlU7QUFTVixrQ0FUVTtBQVVWLHdCQVZVO0FBV1Ysd0JBWFU7QUFZViw0QkFaVTtBQWFWLDRCQWJVO0FBY1Ysb0NBZFU7Q0FBUDs7SUFpQkU7Ozs7Ozs7Ozs7O1VBQ0U7Ozs7Ozs7Ozs7K0JBQ0MsTUFBTSxLQUFLLFFBQVEsTUFBSztBQUM5QixnQkFBSSxzSUFBc0IsVUFBdEIsQ0FEMEI7QUFFOUIsZ0JBQUcsZUFBSyxFQUFMLENBQVEsS0FBUixDQUFILEVBQ0MsMENBQVcsZUFBSyxLQUFMLDJDQUFjLGVBQXpCLENBREQ7O0FBR0EsbUJBQU8sS0FBUCxDQUw4Qjs7OztFQURILGtCQUFRLE9BQVI7O0FBVzlCLFNBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF1QjtBQUN0QixRQUFHLE9BQU8sSUFBUCxJQUFjLFFBQWQsRUFDRixPQUFLLENBQUMsSUFBRCxDQUFMLENBREQ7QUFFQSxRQUFJLE9BQUssRUFBTCxDQUhrQjtBQUl0QixTQUFLLE9BQUwsQ0FBYTtlQUFHLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxPQUFiLENBQXFCO21CQUFJLENBQUMsSUFBRSxFQUFFLElBQUYsRUFBRixDQUFELENBQWEsTUFBYixJQUF1QixLQUFLLElBQUwsQ0FBVSxDQUFWLENBQXZCO1NB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QUFZLElBQVosRUFBaUIsTUFBakIsRUFBeUIsc0JBQWMsRUFBQyxLQUFJLFFBQUosRUFBZixFQUE2QixJQUE3QixDQUF6QixDQUFULENBWCtDOztBQWFuRCwwQ0FBUSxHQUFSLEVBQWEsa0RBQWEsU0FBMUIsRUFDSyxJQURMLENBQ1UsWUFBSTtBQUNGLG9DQUFRLE9BQUssU0FBTCxDQUFlLE9BQWYsR0FBdUIsSUFBSSxJQUFKLENBQS9CLENBREU7eUJBQUosRUFFQyxNQUhYLEVBYm1EO3FCQUFUO2lCQUQvQjtBQUFaLGlCQUFQO0FBSFUsYUFoQlg7U0FBUCxDQVZvRTtLQUFMLENBRm5FLENBRGlDO0NBQXRCIiwiZmlsZSI6ImV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4SHViIGZyb20gXCJkb2N4LXRlbXBsYXRlXCJcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcblxyXG5pbXBvcnQgSWdub3JlIGZyb20gXCIuL2h0bWwvaWdub3JlXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2h0bWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgZG9jdW1lbnRQcm9wZXJ0eSBmcm9tIFwiLi9odG1sL3Byb3BlcnR5XCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9odG1sL3BcIlxyXG5pbXBvcnQgdGFibGUgZnJvbSBcIi4vaHRtbC90YWJsZVwiXHJcbmltcG9ydCByb3cgZnJvbSBcIi4vaHRtbC90clwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL2h0bWwvdGRcIlxyXG5pbXBvcnQgdGV4dCBmcm9tIFwiLi9odG1sL3RleHRcIlxyXG5pbXBvcnQgaW1hZ2UgZnJvbSBcIi4vaHRtbC9pbWFnZVwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHRtbC9oeXBlcmxpbmtcIlxyXG5pbXBvcnQgc3RlcCBmcm9tICcuL2h0bWwvc3RlcCdcclxuXHJcbnZhciBNT0RFTFM9e1xyXG5cdGRvY3VtZW50LFxyXG5cdGRvY3VtZW50UHJvcGVydHksXHJcblx0cGFyYWdyYXBoLFxyXG5cdHRhYmxlLFxyXG5cdHJvdyxcclxuXHRjZWxsLFxyXG5cdHRleHQsXHJcblx0aW1hZ2UsXHJcblx0aHlwZXJsaW5rLFxyXG5cdHN0ZXAsXHJcblx0aGVhZGluZzogcGFyYWdyYXBoLFxyXG5cdGhlYWRlcjogSWdub3JlLFxyXG5cdGZvb3RlcjogSWdub3JlLFxyXG5cdGRvY3VtZW50U3R5bGVzOiBJZ25vcmVcclxufVxyXG5cclxuY2xhc3MgRG9jdW1lbnQxIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyBleHRlbmRzIGRvY3g0anMuRmFjdG9yeXtcclxuXHRcdGNyZWF0ZSh3WG1sLCBkb2MsIHBhcmVudCwgbW9yZSl7XHJcblx0XHRcdGxldCBtb2RlbD1zdXBlci5jcmVhdGUoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihzdGVwLmlzKG1vZGVsKSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IHN0ZXAuTW9kZWwoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdEtleShkYXRhKXtcclxuXHRpZih0eXBlb2YoZGF0YSk9PSdzdHJpbmcnKVxyXG5cdFx0ZGF0YT1bZGF0YV1cclxuXHR2YXIga2V5cz1bXVxyXG5cdGRhdGEuZm9yRWFjaChhPT5hLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGI9PigoYj1iLnRyaW0oKSkubGVuZ3RoICYmIGtleXMucHVzaChiKSkpKVxyXG5cdHJldHVybiBrZXlzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcbiAgICByZXR1cm4gZG9jeEh1Yi5hc3NlbWJsZShmaWxlLHtjaGFubmVsOlwiaW50ZXJhY3RpdmVcIn0pXHJcblx0XHQudGhlbihkb2N4PT5Eb2N1bWVudDEubG9hZChkb2N4LmRhdGEpKVxyXG5cdFx0LnRoZW4oZG9jeD0+ZG9jeC5wYXJzZShEb2N1bWVudDEuY3JlYXRlVmlzaXRvckZhY3RvcnkoTU9ERUxTKSkpLnRoZW4oZG9jPT57XHJcbiAgICAgICAgdmFyIHtodG1sOmNvbnRlbnQsIHByb3BlcnRpZXMsIGlkOmVsSWQsIGltYWdlcywgc3RlcHN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuXHRcdGlmKGtleXdvcmRzKVxyXG5cdFx0XHRrZXl3b3Jkcz1zcGxpdEtleShrZXl3b3JkcylcclxuXHJcblx0XHRpZihjYXRlZ29yeSlcclxuXHRcdFx0Y2F0ZWdvcnk9c3BsaXRLZXkoY2F0ZWdvcnkpXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtub3dsZWRnZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOnRpdGxlfHxuYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTphYnN0cmFjdHx8ZGVzY3JpcHRpb258fHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyxjYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHByb3BzOm90aGVycyxcclxuXHRcdFx0XHRzdGVwc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2UoKXtcclxuICAgICAgICAgICAgICAgIHZhciBub2Rlcz13aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nLl9fcmV2b2tpbmdgKVxyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlcywgKGEpPT5VUkwucmV2b2tlT2JqZWN0VVJMKGEuc3JjKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGhvdG9zKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWdgKSwoYSk9PmEuc3JjKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGxvYWQoZW50aXR5KXtcclxuICAgICAgICAgICAgICAgIHZhciBraW5kPWRiS25vd2xlZGdlLl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmU9e2VudGl0eTp7a2luZCxfaWQ6ZW50aXR5Ll9pZH19XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGUuZmluZCh7cGFyYW1zOm1vcmUsZmllbGRzOlwiY3JjMzJcIn0pLmZldGNoKChmaWxlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBJbWFnZXM9aW1hZ2VzLm1hcCgoaW1hZ2UpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YT1pbWFnZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyYzMyPWRhdGEuY3JjMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmaWxlcy5maW5kKChhKT0+YS5jcmMzMj09Y3JjMzIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGUudXBsb2FkKGRhdGEsIFwiaW1hZ2VcIiwgT2JqZWN0LmFzc2lnbih7Y3JjMzIsa2V5OlwiYS5qcGdcIn0sbW9yZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHVybCk9PmltYWdlLmRhdGE9dXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoKGEpPT5hKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBSYXdEb2N4PUZpbGUudXBsb2FkKGZpbGUsXCJkb2N4XCIsIE9iamVjdC5hc3NpZ24oe2tleTpcImEuZG9jeFwifSxtb3JlKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtwUmF3RG9jeCwgLi4ucEltYWdlc10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMua25vd2xlZGdlLmNvbnRlbnQ9ZG9jLmh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLy9mZXRjaFxyXG4gICAgICAgICAgICAgICAgKS8vcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iXX0=