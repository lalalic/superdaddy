"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

exports.default = extract;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function extract(file) {
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
        heading: _p2.default,
        header: _ignore2.default,
        footer: _ignore2.default,
        documentStyles: _ignore2.default
    };

    return _docx4js2.default.load(file).then(function (docx) {
        debugger;
        var doc = docx.parse(_docx4js2.default.createVisitorFactory(MODELS));
        var content = doc.html;
        var properties = doc.properties;
        var elId = doc.id;
        var images = doc.images;
        var name = properties.name;
        var title = properties.title;
        var keywords = properties.keywords;
        var category = properties.category;
        var subject = properties.subject;
        var abstract = properties.abstract;
        var description = properties.description;

        var others = _objectWithoutProperties(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);

        return {
            knowledge: {
                content: content,
                title: title || name,
                summary: abstract || description || subject,
                keywords: keywords, category: category,
                props: others
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
                var _this = this;

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
                            resolve(_this.knowledge.content = doc.html);
                        }, reject);
                    });
                } //fetch
                ); //promise
            }
        };
    });
}

extract.Template = (_temp = _class = function () {
    function Template(html) {
        _classCallCheck(this, Template);

        this.contents = [];
        var matcher,
            lastIndex = 0,
            reg = this.constructor.EDITABLE_REG,
            len = html.length;
        var staticContent, key, alt;
        while ((matcher = reg.exec(html)) != null) {
            staticContent = html.substring(lastIndex, matcher.index);
            key = matcher[1];
            alt = matcher[2];
            lastIndex = reg.lastIndex;
            if (staticContent) this.contents.push(staticContent);
            if (key || alt) this.contents.push({ key: key, alt: alt });
        }

        if (lastIndex != len - 1) this.contents.push(html.substring(lastIndex, len));
    }

    _createClass(Template, null, [{
        key: "placeholder",
        value: function placeholder(key, alt) {
            return "<editable key=\"" + key + "\">" + alt + "</editable>";
        }
    }]);

    return Template;
}(), _class.EDITABLE_REG = /<editable\s+key="(.*?)">(.*?)<\/editable>/gm, _temp);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBZ0J3Qjs7QUFoQnhCOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRWUsU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXNCO0FBQ3BDLFFBQUksU0FBTztBQUNWLG9DQURVO0FBRVYsNENBRlU7QUFHViw4QkFIVTtBQUlWLDhCQUpVO0FBS1YseUJBTFU7QUFNViwwQkFOVTtBQU9WLDRCQVBVO0FBUVYsOEJBUlU7QUFTVixzQ0FUVTtBQVVWLDRCQVZVO0FBV1YsZ0NBWFU7QUFZVixnQ0FaVTtBQWFWLHdDQWJVO0tBQVAsQ0FEZ0M7O0FBaUJqQyxXQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLFVBQUMsSUFBRCxFQUFRO0FBQ3pDLGlCQUR5QztBQUUvQixrQkFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBUSxvQkFBUixDQUE2QixNQUE3QixDQUFYLENBQUosQ0FGK0I7WUFHekIsVUFBc0MsSUFBM0MsS0FIOEI7WUFHaEIsYUFBNkIsSUFBN0IsV0FIZ0I7WUFHRCxPQUFjLElBQWpCLEdBSEk7QUFHL0IsWUFBb0MsU0FBUSxJQUFSLE1BQXBDLENBSCtCO1lBSTlCLE9BQTBFLFdBQTFFLEtBSjhCO1lBSXpCLFFBQXFFLFdBQXJFLE1BSnlCO1lBSWxCLFdBQThELFdBQTlELFNBSmtCO1lBSVIsV0FBb0QsV0FBcEQsU0FKUTtZQUlFLFVBQTBDLFdBQTFDLFFBSkY7WUFJVyxXQUFpQyxXQUFqQyxTQUpYO1lBSW9CLGNBQXdCLFdBQXhCLFlBSnBCOztZQUlvQyxrQ0FBUSw2RkFKNUM7O0FBTW5DLGVBQU87QUFDSCx1QkFBVztBQUNQLGdDQURPO0FBRVAsdUJBQU0sU0FBTyxJQUFQ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QUksUUFBUSxDQUFSLENBQUosQ0FGaUM7QUFHakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FIaUM7QUFJakMsd0JBQVUsSUFBSSxTQUFKLENBSnVCO0FBS2pDLGdCQUFHLGFBQUgsRUFDSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLGFBQW5CLEVBREo7QUFFQSxnQkFBRyxPQUFPLEdBQVAsRUFDQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQUMsUUFBRCxFQUFLLFFBQUwsRUFBbkIsRUFESjtTQVBKOztBQVdBLFlBQUcsYUFBVyxNQUFJLENBQUosRUFDVixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBeUIsR0FBekIsQ0FBbkIsRUFESjtLQWZKOztpQkFEbUI7O29DQW9CQSxLQUFJLEtBQUk7QUFDdkIsd0NBQXlCLGNBQVEsbUJBQWpDLENBRHVCOzs7O1dBcEJSO1lBd0JmLGVBQWEscURBeEJyQiIsImZpbGUiOiJleHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQge0ZpbGV9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tIFwiLi4vZGIva25vd2xlZGdlXCJcclxuXHJcbmltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaHRtbC9pZ25vcmVcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vaHRtbC9kb2N1bWVudFwiXHJcbmltcG9ydCBkb2N1bWVudFByb3BlcnR5IGZyb20gXCIuL2h0bWwvcHJvcGVydHlcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL2h0bWwvcFwiXHJcbmltcG9ydCB0YWJsZSBmcm9tIFwiLi9odG1sL3RhYmxlXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi9odG1sL3RyXCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vaHRtbC90ZFwiXHJcbmltcG9ydCB0ZXh0IGZyb20gXCIuL2h0bWwvdGV4dFwiXHJcbmltcG9ydCBpbWFnZSBmcm9tIFwiLi9odG1sL2ltYWdlXCJcclxuaW1wb3J0IGh5cGVybGluayBmcm9tIFwiLi9odG1sL2h5cGVybGlua1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG5cdHZhciBNT0RFTFM9e1xyXG5cdFx0ZG9jdW1lbnQsXHJcblx0XHRkb2N1bWVudFByb3BlcnR5LFxyXG5cdFx0cGFyYWdyYXBoLFxyXG5cdFx0dGFibGUsXHJcblx0XHRyb3csXHJcblx0XHRjZWxsLFxyXG5cdFx0dGV4dCxcclxuXHRcdGltYWdlLFxyXG5cdFx0aHlwZXJsaW5rLFxyXG5cdFx0aGVhZGluZzogcGFyYWdyYXBoLFxyXG5cdFx0aGVhZGVyOiBJZ25vcmUsXHJcblx0XHRmb290ZXI6IElnbm9yZSxcclxuXHRcdGRvY3VtZW50U3R5bGVzOiBJZ25vcmVcclxuXHR9XHJcblxyXG4gICAgcmV0dXJuIGRvY3g0anMubG9hZChmaWxlKS50aGVuKChkb2N4KT0+e1xyXG5cdFx0ZGVidWdnZXJcclxuICAgICAgICB2YXIgZG9jPWRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShNT0RFTFMpKSxcclxuICAgICAgICAgICAge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goKGZpbGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEltYWdlcz1pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPWltYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JjMzI9ZGF0YS5jcmMzMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVzLmZpbmQoKGEpPT5hLmNyYzMyPT1jcmMzMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsZS51cGxvYWQoZGF0YSwgXCJpbWFnZVwiLCBPYmplY3QuYXNzaWduKHtjcmMzMixrZXk6XCJhLmpwZ1wifSxtb3JlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXJsKT0+aW1hZ2UuZGF0YT11cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcigoYSk9PmEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFJhd0RvY3g9RmlsZS51cGxvYWQoZmlsZSxcImRvY3hcIiwgT2JqZWN0LmFzc2lnbih7a2V5OlwiYS5kb2N4XCJ9LG1vcmUpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UuY29udGVudD1kb2MuaHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHRyYWN0LlRlbXBsYXRlPWNsYXNzIFRlbXBsYXRle1xyXG4gICAgY29uc3RydWN0b3IoaHRtbCl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50cz1bXVxyXG4gICAgICAgIHZhciBtYXRjaGVyLCBsYXN0SW5kZXg9MCwgcmVnPXRoaXMuY29uc3RydWN0b3IuRURJVEFCTEVfUkVHLCBsZW49aHRtbC5sZW5ndGhcclxuICAgICAgICB2YXIgc3RhdGljQ29udGVudCxrZXksIGFsdFxyXG4gICAgICAgIHdoaWxlKChtYXRjaGVyPXJlZy5leGVjKGh0bWwpKSE9bnVsbCl7XHJcbiAgICAgICAgICAgIHN0YXRpY0NvbnRlbnQ9aHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LG1hdGNoZXIuaW5kZXgpXHJcbiAgICAgICAgICAgIGtleT1tYXRjaGVyWzFdXHJcbiAgICAgICAgICAgIGFsdD1tYXRjaGVyWzJdXHJcbiAgICAgICAgICAgIGxhc3RJbmRleD1yZWcubGFzdEluZGV4XHJcbiAgICAgICAgICAgIGlmKHN0YXRpY0NvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRzLnB1c2goc3RhdGljQ29udGVudClcclxuICAgICAgICAgICAgaWYoa2V5IHx8IGFsdClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudHMucHVzaCh7a2V5LGFsdH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihsYXN0SW5kZXghPWxlbi0xKVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRzLnB1c2goaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LGxlbikpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBsYWNlaG9sZGVyKGtleSxhbHQpe1xyXG4gICAgICAgIHJldHVybiBgPGVkaXRhYmxlIGtleT1cIiR7a2V5fVwiPiR7YWx0fTwvZWRpdGFibGU+YFxyXG4gICAgfVxyXG5cdFxyXG5cdHN0YXRpYyBFRElUQUJMRV9SRUc9LzxlZGl0YWJsZVxccytrZXk9XCIoLio/KVwiPiguKj8pPFxcL2VkaXRhYmxlPi9nbVxyXG59XHJcbiJdfQ==