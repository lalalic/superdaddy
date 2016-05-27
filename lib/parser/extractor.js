"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

exports.default = extract;

var _docxTemplate = require("docx-template");

var _docxTemplate2 = _interopRequireDefault(_docxTemplate);

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

    return _docxTemplate2.default.assemble(file, { channel: "interactive" }).then(function (docx) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBaUJ3Qjs7QUFqQnhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFZSxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBc0I7QUFDcEMsUUFBSSxTQUFPO0FBQ1Ysb0NBRFU7QUFFViw0Q0FGVTtBQUdWLDhCQUhVO0FBSVYsOEJBSlU7QUFLVix5QkFMVTtBQU1WLDBCQU5VO0FBT1YsNEJBUFU7QUFRViw4QkFSVTtBQVNWLHNDQVRVO0FBVVYsNEJBVlU7QUFXVixnQ0FYVTtBQVlWLGdDQVpVO0FBYVYsd0NBYlU7S0FBUCxDQURnQzs7QUFpQmpDLFdBQU8sdUJBQVEsUUFBUixDQUFpQixJQUFqQixFQUFzQixFQUFDLFNBQVEsYUFBUixFQUF2QixFQUErQyxJQUEvQyxDQUFvRCxVQUFDLElBQUQsRUFBUTtBQUNyRSxpQkFEcUU7QUFFM0Qsa0JBQUksS0FBSyxLQUFMLENBQVcsa0JBQVEsb0JBQVIsQ0FBNkIsTUFBN0IsQ0FBWCxDQUFKLENBRjJEO1lBR3JELFVBQXNDLElBQTNDLEtBSDBEO1lBRzVDLGFBQTZCLElBQTdCLFdBSDRDO1lBRzdCLE9BQWMsSUFBakIsR0FIZ0M7QUFHM0QsWUFBb0MsU0FBUSxJQUFSLE1BQXBDLENBSDJEO1lBSTFELE9BQTBFLFdBQTFFLEtBSjBEO1lBSXJELFFBQXFFLFdBQXJFLE1BSnFEO1lBSTlDLFdBQThELFdBQTlELFNBSjhDO1lBSXBDLFdBQW9ELFdBQXBELFNBSm9DO1lBSTFCLFVBQTBDLFdBQTFDLFFBSjBCO1lBSWpCLFdBQWlDLFdBQWpDLFNBSmlCO1lBSVIsY0FBd0IsV0FBeEIsWUFKUTs7WUFJUSxrQ0FBUSw2RkFKaEI7O0FBTS9ELGVBQU87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U0FBZixFQUF5QixRQUFRLEtBQVIsQ0FBdkMsQ0FEaUM7QUFFakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FGaUM7QUFHakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FIaUM7QUFJakMsd0JBQVUsSUFBSSxTQUFKLENBSnVCO0FBS2pDLGdCQUFHLGFBQUgsRUFDSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLGFBQW5CLEVBREo7QUFFQSxnQkFBRyxPQUFPLEdBQVAsRUFDQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQUMsUUFBRCxFQUFLLFFBQUwsRUFBbkIsRUFESjtTQVBKOztBQVdBLFlBQUcsYUFBVyxNQUFJLENBQUosRUFDVixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBeUIsR0FBekIsQ0FBbkIsRUFESjtLQWZKOztpQkFEbUI7O29DQW9CQSxLQUFJLEtBQUk7QUFDdkIsd0NBQXlCLGNBQVEsbUJBQWpDLENBRHVCOzs7O1dBcEJSO1lBd0JmLGVBQWEscURBeEJyQiIsImZpbGUiOiJleHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeEh1YiBmcm9tIFwiZG9jeC10ZW1wbGF0ZVwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuXHJcbmltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5cclxuaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9odG1sL2lnbm9yZVwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9odG1sL2RvY3VtZW50XCJcclxuaW1wb3J0IGRvY3VtZW50UHJvcGVydHkgZnJvbSBcIi4vaHRtbC9wcm9wZXJ0eVwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vaHRtbC9wXCJcclxuaW1wb3J0IHRhYmxlIGZyb20gXCIuL2h0bWwvdGFibGVcIlxyXG5pbXBvcnQgcm93IGZyb20gXCIuL2h0bWwvdHJcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi9odG1sL3RkXCJcclxuaW1wb3J0IHRleHQgZnJvbSBcIi4vaHRtbC90ZXh0XCJcclxuaW1wb3J0IGltYWdlIGZyb20gXCIuL2h0bWwvaW1hZ2VcIlxyXG5pbXBvcnQgaHlwZXJsaW5rIGZyb20gXCIuL2h0bWwvaHlwZXJsaW5rXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcblx0dmFyIE1PREVMUz17XHJcblx0XHRkb2N1bWVudCxcclxuXHRcdGRvY3VtZW50UHJvcGVydHksXHJcblx0XHRwYXJhZ3JhcGgsXHJcblx0XHR0YWJsZSxcclxuXHRcdHJvdyxcclxuXHRcdGNlbGwsXHJcblx0XHR0ZXh0LFxyXG5cdFx0aW1hZ2UsXHJcblx0XHRoeXBlcmxpbmssXHJcblx0XHRoZWFkaW5nOiBwYXJhZ3JhcGgsXHJcblx0XHRoZWFkZXI6IElnbm9yZSxcclxuXHRcdGZvb3RlcjogSWdub3JlLFxyXG5cdFx0ZG9jdW1lbnRTdHlsZXM6IElnbm9yZVxyXG5cdH1cclxuXHJcbiAgICByZXR1cm4gZG9jeEh1Yi5hc3NlbWJsZShmaWxlLHtjaGFubmVsOlwiaW50ZXJhY3RpdmVcIn0pLnRoZW4oKGRvY3gpPT57XHJcblx0XHRkZWJ1Z2dlclxyXG4gICAgICAgIHZhciBkb2M9ZG9jeC5wYXJzZShkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KE1PREVMUykpLFxyXG4gICAgICAgICAgICB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZy5fX3Jldm9raW5nYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksKGEpPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4dHJhY3QuVGVtcGxhdGU9Y2xhc3MgVGVtcGxhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihodG1sKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnRzPVtdXHJcbiAgICAgICAgdmFyIG1hdGNoZXIsIGxhc3RJbmRleD0wLCByZWc9dGhpcy5jb25zdHJ1Y3Rvci5FRElUQUJMRV9SRUcsIGxlbj1odG1sLmxlbmd0aFxyXG4gICAgICAgIHZhciBzdGF0aWNDb250ZW50LGtleSwgYWx0XHJcbiAgICAgICAgd2hpbGUoKG1hdGNoZXI9cmVnLmV4ZWMoaHRtbCkpIT1udWxsKXtcclxuICAgICAgICAgICAgc3RhdGljQ29udGVudD1odG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsbWF0Y2hlci5pbmRleClcclxuICAgICAgICAgICAga2V5PW1hdGNoZXJbMV1cclxuICAgICAgICAgICAgYWx0PW1hdGNoZXJbMl1cclxuICAgICAgICAgICAgbGFzdEluZGV4PXJlZy5sYXN0SW5kZXhcclxuICAgICAgICAgICAgaWYoc3RhdGljQ29udGVudClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudHMucHVzaChzdGF0aWNDb250ZW50KVxyXG4gICAgICAgICAgICBpZihrZXkgfHwgYWx0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKHtrZXksYWx0fSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGxhc3RJbmRleCE9bGVuLTEpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudHMucHVzaChodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsbGVuKSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxhY2Vob2xkZXIoa2V5LGFsdCl7XHJcbiAgICAgICAgcmV0dXJuIGA8ZWRpdGFibGUga2V5PVwiJHtrZXl9XCI+JHthbHR9PC9lZGl0YWJsZT5gXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIEVESVRBQkxFX1JFRz0vPGVkaXRhYmxlXFxzK2tleT1cIiguKj8pXCI+KC4qPyk8XFwvZWRpdGFibGU+L2dtXHJcbn1cclxuIl19