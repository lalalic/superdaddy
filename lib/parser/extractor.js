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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Document1).apply(this, arguments));
    }

    return Document1;
}(_docx4js3.default);

Document1.Factory = function (_docx4js$Factory) {
    _inherits(_class, _docx4js$Factory);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "create",
        value: function create(wXml, doc, parent, more) {
            var model = _get(Object.getPrototypeOf(_class.prototype), "create", this).apply(this, arguments);
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBdUR3Qjs7QUF2RHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU87QUFDVixnQ0FEVTtBQUVWLHdDQUZVO0FBR1YsMEJBSFU7QUFJViwwQkFKVTtBQUtWLHFCQUxVO0FBTVYsc0JBTlU7QUFPVix3QkFQVTtBQVFWLDBCQVJVO0FBU1Ysa0NBVFU7QUFVVix3QkFWVTtBQVdWLHdCQVhVO0FBWVYsNEJBWlU7QUFhViw0QkFiVTtBQWNWLG9DQWRVO0NBQVA7O0lBaUJFOzs7Ozs7Ozs7Ozs7VUFDRTs7Ozs7Ozs7Ozs7K0JBQ0MsTUFBTSxLQUFLLFFBQVEsTUFBSztBQUM5QixnQkFBSSxrRkFBc0IsVUFBdEIsQ0FEMEI7QUFFOUIsZ0JBQUcsZUFBSyxFQUFMLENBQVEsS0FBUixDQUFILEVBQ0MsMENBQVcsZUFBSyxLQUFMLDJDQUFjLGVBQXpCLENBREQ7O0FBR0EsbUJBQU8sS0FBUCxDQUw4Qjs7Ozs7RUFESCxrQkFBUSxPQUFSOztBQVc5QixTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPLElBQVAsSUFBYyxRQUFkLEVBQ0YsT0FBSyxDQUFDLElBQUQsQ0FBTCxDQUREO0FBRUEsUUFBSSxPQUFLLEVBQUwsQ0FIa0I7QUFJdEIsU0FBSyxPQUFMLENBQWE7ZUFBRyxFQUFFLEtBQUYsQ0FBUSxHQUFSLEVBQWEsT0FBYixDQUFxQjttQkFBSSxDQUFDLElBQUUsRUFBRSxJQUFGLEVBQUYsQ0FBRCxDQUFhLE1BQWIsSUFBdUIsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUF2QjtTQUFKO0tBQXhCLENBQWIsQ0FKc0I7QUFLdEIsV0FBTyxJQUFQLENBTHNCO0NBQXZCOztBQVFlLFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUFzQjtBQUNqQyxXQUFPLHVCQUFRLFFBQVIsQ0FBaUIsSUFBakIsRUFBc0IsRUFBQyxTQUFRLGFBQVIsRUFBdkIsRUFDUixJQURRLENBQ0g7ZUFBTSxVQUFVLElBQVYsQ0FBZSxLQUFLLElBQUw7S0FBckIsQ0FERyxDQUVSLElBRlEsQ0FFSDtlQUFNLEtBQUssS0FBTCxDQUFXLFVBQVUsb0JBQVYsQ0FBK0IsTUFBL0IsQ0FBWDtLQUFOLENBRkcsQ0FFdUQsSUFGdkQsQ0FFNEQsZUFBSztZQUMxRCxVQUE2QyxJQUFsRCxLQUQrRDtZQUNqRCxhQUFvQyxJQUFwQyxXQURpRDtZQUNsQyxPQUFxQixJQUF4QixHQURxQztZQUM1QixTQUFlLElBQWYsT0FENEI7QUFDaEUsWUFBNEMsUUFBTyxJQUFQLEtBQTVDLENBRGdFO1lBRS9ELE9BQTBFLFdBQTFFLEtBRitEO1lBRTFELFFBQXFFLFdBQXJFLE1BRjBEO1lBRW5ELFdBQThELFdBQTlELFNBRm1EO1lBRXpDLFdBQW9ELFdBQXBELFNBRnlDO1lBRS9CLFVBQTBDLFdBQTFDLFFBRitCO1lBRXRCLFdBQWlDLFdBQWpDLFNBRnNCO1lBRWIsY0FBd0IsV0FBeEIsWUFGYTs7WUFFRyxrQ0FBUSw2RkFGWDs7QUFJMUUsWUFBRyxRQUFILEVBQ0MsV0FBUyxTQUFTLFFBQVQsQ0FBVCxDQUREOztBQUdBLFlBQUcsUUFBSCxFQUNDLFdBQVMsU0FBUyxRQUFULENBQVQsQ0FERDs7QUFHTSxlQUFPO0FBQ0gsdUJBQVc7QUFDUCxnQ0FETztBQUVQLHVCQUFNLFNBQU8sSUFBUDtBQUNOLHlCQUFRLFlBQVUsV0FBVixJQUF1QixPQUF2QjtBQUNSLGtDQUpPLEVBSUUsa0JBSkY7QUFLUCx1QkFBTSxNQUFOO0FBQ1osNEJBTm1CO2FBQVg7QUFRQSxzQ0FBUTtBQUNKLG9CQUFJLFFBQU0sT0FBTyxRQUFQLENBQWdCLGdCQUFoQixPQUFxQyx3QkFBckMsQ0FBTixDQURBO0FBRUosc0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixJQUF4QixDQUE2QixLQUE3QixFQUFvQyxVQUFDLENBQUQ7MkJBQUssSUFBSSxlQUFKLENBQW9CLEVBQUUsR0FBRjtpQkFBekIsQ0FBcEMsQ0FGSTthQVRMO0FBYUgsNENBQVc7QUFDUCx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsSUFBcEIsQ0FBeUIsT0FBTyxRQUFQLENBQWdCLGdCQUFoQixPQUFxQyxhQUFyQyxDQUF6QixFQUEwRSxVQUFDLENBQUQ7MkJBQUssRUFBRSxHQUFGO2lCQUFMLENBQWpGLENBRE87YUFiUjtBQWdCSCxvQ0FBTyxRQUFPOzs7QUFDVixvQkFBSSxPQUFLLG9CQUFZLEtBQVo7b0JBQ0wsT0FBSyxFQUFDLFFBQU8sRUFBQyxVQUFELEVBQU0sS0FBSSxPQUFPLEdBQVAsRUFBakIsRUFBTixDQUZNO0FBR1YsdUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjsyQkFDZixjQUFLLElBQUwsQ0FBVSxFQUFDLFFBQU8sSUFBUCxFQUFZLFFBQU8sT0FBUCxFQUF2QixFQUF3QyxLQUF4QyxDQUE4QyxVQUFDLEtBQUQsRUFBUztBQUNuRCw0QkFBSSxVQUFRLE9BQU8sR0FBUCxDQUFXLFVBQUMsS0FBRCxFQUFTO0FBQzVCLGdDQUFJLE9BQUssTUFBTSxJQUFOO2dDQUNMLFFBQU0sS0FBSyxLQUFMLENBRmtCO0FBRzVCLGdDQUFHLE1BQU0sSUFBTixDQUFXLFVBQUMsQ0FBRDt1Q0FBSyxFQUFFLEtBQUYsSUFBUyxLQUFUOzZCQUFMLENBQWQsRUFDSSxPQUFPLFNBQVAsQ0FESjs7QUFHQSxtQ0FBTyxjQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCLE9BQU8sTUFBUCxDQUFjLEVBQUMsWUFBRCxFQUFPLEtBQUksT0FBSixFQUFyQixFQUFrQyxJQUFsQyxDQUEzQixFQUNGLElBREUsQ0FDRyxVQUFDLEdBQUQ7dUNBQU8sTUFBTSxJQUFOLEdBQVcsR0FBWDs2QkFBUCxDQURWLENBTjRCO3lCQUFULENBQVgsQ0FRVCxNQVJTLENBUUYsVUFBQyxDQUFEO21DQUFLO3lCQUFMLENBUk4sQ0FEK0M7O0FBV25ELDRCQUFJLFdBQVMsY0FBSyxNQUFMLENBQVksSUFBWixFQUFpQixNQUFqQixFQUF5QixPQUFPLE1BQVAsQ0FBYyxFQUFDLEtBQUksUUFBSixFQUFmLEVBQTZCLElBQTdCLENBQXpCLENBQVQsQ0FYK0M7O0FBYW5ELGdDQUFRLEdBQVIsRUFBYSxvQ0FBYSxTQUExQixFQUNLLElBREwsQ0FDVSxZQUFJO0FBQ0Ysb0NBQVEsT0FBSyxTQUFMLENBQWUsT0FBZixHQUF1QixJQUFJLElBQUosQ0FBL0IsQ0FERTt5QkFBSixFQUVDLE1BSFgsRUFibUQ7cUJBQVQ7aUJBRC9CO0FBQVosaUJBQVA7QUFIVSxhQWhCWDtTQUFQLENBVm9FO0tBQUwsQ0FGbkUsQ0FEaUM7Q0FBdEIiLCJmaWxlIjoiZXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3hIdWIgZnJvbSBcImRvY3gtdGVtcGxhdGVcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQge0ZpbGV9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tIFwiLi4vZGIva25vd2xlZGdlXCJcclxuXHJcbmltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaHRtbC9pZ25vcmVcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vaHRtbC9kb2N1bWVudFwiXHJcbmltcG9ydCBkb2N1bWVudFByb3BlcnR5IGZyb20gXCIuL2h0bWwvcHJvcGVydHlcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL2h0bWwvcFwiXHJcbmltcG9ydCB0YWJsZSBmcm9tIFwiLi9odG1sL3RhYmxlXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi9odG1sL3RyXCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vaHRtbC90ZFwiXHJcbmltcG9ydCB0ZXh0IGZyb20gXCIuL2h0bWwvdGV4dFwiXHJcbmltcG9ydCBpbWFnZSBmcm9tIFwiLi9odG1sL2ltYWdlXCJcclxuaW1wb3J0IGh5cGVybGluayBmcm9tIFwiLi9odG1sL2h5cGVybGlua1wiXHJcbmltcG9ydCBzdGVwIGZyb20gJy4vaHRtbC9zdGVwJ1xyXG5cclxudmFyIE1PREVMUz17XHJcblx0ZG9jdW1lbnQsXHJcblx0ZG9jdW1lbnRQcm9wZXJ0eSxcclxuXHRwYXJhZ3JhcGgsXHJcblx0dGFibGUsXHJcblx0cm93LFxyXG5cdGNlbGwsXHJcblx0dGV4dCxcclxuXHRpbWFnZSxcclxuXHRoeXBlcmxpbmssXHJcblx0c3RlcCxcclxuXHRoZWFkaW5nOiBwYXJhZ3JhcGgsXHJcblx0aGVhZGVyOiBJZ25vcmUsXHJcblx0Zm9vdGVyOiBJZ25vcmUsXHJcblx0ZG9jdW1lbnRTdHlsZXM6IElnbm9yZVxyXG59XHJcblxyXG5jbGFzcyBEb2N1bWVudDEgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdHN0YXRpYyBGYWN0b3J5PWNsYXNzIGV4dGVuZHMgZG9jeDRqcy5GYWN0b3J5e1xyXG5cdFx0Y3JlYXRlKHdYbWwsIGRvYywgcGFyZW50LCBtb3JlKXtcclxuXHRcdFx0bGV0IG1vZGVsPXN1cGVyLmNyZWF0ZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKHN0ZXAuaXMobW9kZWwpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgc3RlcC5Nb2RlbCguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNwbGl0S2V5KGRhdGEpe1xyXG5cdGlmKHR5cGVvZihkYXRhKT09J3N0cmluZycpXHJcblx0XHRkYXRhPVtkYXRhXVxyXG5cdHZhciBrZXlzPVtdXHJcblx0ZGF0YS5mb3JFYWNoKGE9PmEuc3BsaXQoXCIsXCIpLmZvckVhY2goYj0+KChiPWIudHJpbSgpKS5sZW5ndGggJiYga2V5cy5wdXNoKGIpKSkpXHJcblx0cmV0dXJuIGtleXNcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdChmaWxlKXtcclxuICAgIHJldHVybiBkb2N4SHViLmFzc2VtYmxlKGZpbGUse2NoYW5uZWw6XCJpbnRlcmFjdGl2ZVwifSlcclxuXHRcdC50aGVuKGRvY3g9PkRvY3VtZW50MS5sb2FkKGRvY3guZGF0YSkpXHJcblx0XHQudGhlbihkb2N4PT5kb2N4LnBhcnNlKERvY3VtZW50MS5jcmVhdGVWaXNpdG9yRmFjdG9yeShNT0RFTFMpKSkudGhlbihkb2M9PntcclxuICAgICAgICB2YXIge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzLCBzdGVwc309ZG9jLFxyXG4gICAgICAgICAgICB7bmFtZSx0aXRsZSwga2V5d29yZHMsIGNhdGVnb3J5LCBzdWJqZWN0LCBhYnN0cmFjdCxkZXNjcmlwdGlvbiwgLi4ub3RoZXJzfT1wcm9wZXJ0aWVzXHJcblxyXG5cdFx0aWYoa2V5d29yZHMpXHJcblx0XHRcdGtleXdvcmRzPXNwbGl0S2V5KGtleXdvcmRzKVxyXG5cclxuXHRcdGlmKGNhdGVnb3J5KVxyXG5cdFx0XHRjYXRlZ29yeT1zcGxpdEtleShjYXRlZ29yeSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzLFxyXG5cdFx0XHRcdHN0ZXBzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goKGZpbGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEltYWdlcz1pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPWltYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JjMzI9ZGF0YS5jcmMzMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVzLmZpbmQoKGEpPT5hLmNyYzMyPT1jcmMzMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsZS51cGxvYWQoZGF0YSwgXCJpbWFnZVwiLCBPYmplY3QuYXNzaWduKHtjcmMzMixrZXk6XCJhLmpwZ1wifSxtb3JlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXJsKT0+aW1hZ2UuZGF0YT11cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcigoYSk9PmEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFJhd0RvY3g9RmlsZS51cGxvYWQoZmlsZSxcImRvY3hcIiwgT2JqZWN0LmFzc2lnbih7a2V5OlwiYS5kb2N4XCJ9LG1vcmUpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UuY29udGVudD1kb2MuaHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==