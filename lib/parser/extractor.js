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
        return docx.parse(_docx4js2.default.createVisitorFactory(MODELS));
    }).then(function (doc) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBaUJ3Qjs7QUFqQnhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFZSxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBc0I7QUFDcEMsUUFBSSxTQUFPO0FBQ1Ysb0NBRFU7QUFFViw0Q0FGVTtBQUdWLDhCQUhVO0FBSVYsOEJBSlU7QUFLVix5QkFMVTtBQU1WLDBCQU5VO0FBT1YsNEJBUFU7QUFRViw4QkFSVTtBQVNWLHNDQVRVO0FBVVYsNEJBVlU7QUFXVixnQ0FYVTtBQVlWLGdDQVpVO0FBYVYsd0NBYlU7S0FBUCxDQURnQzs7QUFpQmpDLFdBQU8sdUJBQVEsUUFBUixDQUFpQixJQUFqQixFQUFzQixFQUFDLFNBQVEsYUFBUixFQUF2QixFQUNSLElBRFEsQ0FDSDtlQUFNLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLE1BQTdCLENBQVg7S0FBTixDQURHLENBQ3FELElBRHJELENBQzBELGVBQUs7WUFDeEQsVUFBc0MsSUFBM0MsS0FENkQ7WUFDL0MsYUFBNkIsSUFBN0IsV0FEK0M7WUFDaEMsT0FBYyxJQUFqQixHQURtQztBQUM5RCxZQUFvQyxTQUFRLElBQVIsTUFBcEMsQ0FEOEQ7WUFFN0QsT0FBMEUsV0FBMUUsS0FGNkQ7WUFFeEQsUUFBcUUsV0FBckUsTUFGd0Q7WUFFakQsV0FBOEQsV0FBOUQsU0FGaUQ7WUFFdkMsV0FBb0QsV0FBcEQsU0FGdUM7WUFFN0IsVUFBMEMsV0FBMUMsUUFGNkI7WUFFcEIsV0FBaUMsV0FBakMsU0FGb0I7WUFFWCxjQUF3QixXQUF4QixZQUZXOztZQUVLLGtDQUFRLDZGQUZiOztBQUlsRSxlQUFPO0FBQ0gsdUJBQVc7QUFDUCxn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QUFSLENBQXZDLENBRGlDO0FBRWpDLGtCQUFJLFFBQVEsQ0FBUixDQUFKLENBRmlDO0FBR2pDLGtCQUFJLFFBQVEsQ0FBUixDQUFKLENBSGlDO0FBSWpDLHdCQUFVLElBQUksU0FBSixDQUp1QjtBQUtqQyxnQkFBRyxhQUFILEVBQ0ksS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixhQUFuQixFQURKO0FBRUEsZ0JBQUcsT0FBTyxHQUFQLEVBQ0MsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixFQUFDLFFBQUQsRUFBSyxRQUFMLEVBQW5CLEVBREo7U0FQSjs7QUFXQSxZQUFHLGFBQVcsTUFBSSxDQUFKLEVBQ1YsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQXlCLEdBQXpCLENBQW5CLEVBREo7S0FmSjs7aUJBRG1COztvQ0FvQkEsS0FBSSxLQUFJO0FBQ3ZCLHdDQUF5QixjQUFRLG1CQUFqQyxDQUR1Qjs7OztXQXBCUjtZQXdCZixlQUFhLHFEQXhCckIiLCJmaWxlIjoiZXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3hIdWIgZnJvbSBcImRvY3gtdGVtcGxhdGVcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5pbXBvcnQge0ZpbGV9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tIFwiLi4vZGIva25vd2xlZGdlXCJcclxuXHJcbmltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaHRtbC9pZ25vcmVcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vaHRtbC9kb2N1bWVudFwiXHJcbmltcG9ydCBkb2N1bWVudFByb3BlcnR5IGZyb20gXCIuL2h0bWwvcHJvcGVydHlcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL2h0bWwvcFwiXHJcbmltcG9ydCB0YWJsZSBmcm9tIFwiLi9odG1sL3RhYmxlXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi9odG1sL3RyXCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vaHRtbC90ZFwiXHJcbmltcG9ydCB0ZXh0IGZyb20gXCIuL2h0bWwvdGV4dFwiXHJcbmltcG9ydCBpbWFnZSBmcm9tIFwiLi9odG1sL2ltYWdlXCJcclxuaW1wb3J0IGh5cGVybGluayBmcm9tIFwiLi9odG1sL2h5cGVybGlua1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG5cdHZhciBNT0RFTFM9e1xyXG5cdFx0ZG9jdW1lbnQsXHJcblx0XHRkb2N1bWVudFByb3BlcnR5LFxyXG5cdFx0cGFyYWdyYXBoLFxyXG5cdFx0dGFibGUsXHJcblx0XHRyb3csXHJcblx0XHRjZWxsLFxyXG5cdFx0dGV4dCxcclxuXHRcdGltYWdlLFxyXG5cdFx0aHlwZXJsaW5rLFxyXG5cdFx0aGVhZGluZzogcGFyYWdyYXBoLFxyXG5cdFx0aGVhZGVyOiBJZ25vcmUsXHJcblx0XHRmb290ZXI6IElnbm9yZSxcclxuXHRcdGRvY3VtZW50U3R5bGVzOiBJZ25vcmVcclxuXHR9XHJcblxyXG4gICAgcmV0dXJuIGRvY3hIdWIuYXNzZW1ibGUoZmlsZSx7Y2hhbm5lbDpcImludGVyYWN0aXZlXCJ9KVxyXG5cdFx0LnRoZW4oZG9jeD0+ZG9jeC5wYXJzZShkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KE1PREVMUykpKS50aGVuKGRvYz0+e1xyXG4gICAgICAgIHZhciB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZy5fX3Jldm9raW5nYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksKGEpPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4dHJhY3QuVGVtcGxhdGU9Y2xhc3MgVGVtcGxhdGV7XHJcbiAgICBjb25zdHJ1Y3RvcihodG1sKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnRzPVtdXHJcbiAgICAgICAgdmFyIG1hdGNoZXIsIGxhc3RJbmRleD0wLCByZWc9dGhpcy5jb25zdHJ1Y3Rvci5FRElUQUJMRV9SRUcsIGxlbj1odG1sLmxlbmd0aFxyXG4gICAgICAgIHZhciBzdGF0aWNDb250ZW50LGtleSwgYWx0XHJcbiAgICAgICAgd2hpbGUoKG1hdGNoZXI9cmVnLmV4ZWMoaHRtbCkpIT1udWxsKXtcclxuICAgICAgICAgICAgc3RhdGljQ29udGVudD1odG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsbWF0Y2hlci5pbmRleClcclxuICAgICAgICAgICAga2V5PW1hdGNoZXJbMV1cclxuICAgICAgICAgICAgYWx0PW1hdGNoZXJbMl1cclxuICAgICAgICAgICAgbGFzdEluZGV4PXJlZy5sYXN0SW5kZXhcclxuICAgICAgICAgICAgaWYoc3RhdGljQ29udGVudClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudHMucHVzaChzdGF0aWNDb250ZW50KVxyXG4gICAgICAgICAgICBpZihrZXkgfHwgYWx0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKHtrZXksYWx0fSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGxhc3RJbmRleCE9bGVuLTEpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudHMucHVzaChodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsbGVuKSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxhY2Vob2xkZXIoa2V5LGFsdCl7XHJcbiAgICAgICAgcmV0dXJuIGA8ZWRpdGFibGUga2V5PVwiJHtrZXl9XCI+JHthbHR9PC9lZGl0YWJsZT5gXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBFRElUQUJMRV9SRUc9LzxlZGl0YWJsZVxccytrZXk9XCIoLio/KVwiPiguKj8pPFxcL2VkaXRhYmxlPi9nbVxyXG59XHJcbiJdfQ==