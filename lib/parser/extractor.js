"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

    return _docxTemplate2.default.assemble(file, { channel: "interactive" }).then(function (docx) {
        return docx.parse(_docx4js2.default.createVisitorFactory(MODELS));
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWlCd0I7O0FBakJ4Qjs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVlLFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUFzQjtBQUNwQyxRQUFJLFNBQU87QUFDVixvQ0FEVTtBQUVWLDRDQUZVO0FBR1YsOEJBSFU7QUFJViw4QkFKVTtBQUtWLHlCQUxVO0FBTVYsMEJBTlU7QUFPViw0QkFQVTtBQVFWLDhCQVJVO0FBU1Ysc0NBVFU7QUFVViw0QkFWVTtBQVdWLGdDQVhVO0FBWVYsZ0NBWlU7QUFhVix3Q0FiVTtLQUFQLENBRGdDOztBQWlCcEMsYUFBUyxRQUFULENBQWtCLElBQWxCLEVBQXVCO0FBQ3RCLFlBQUcsT0FBTyxJQUFQLElBQWMsUUFBZCxFQUNGLE9BQUssQ0FBQyxJQUFELENBQUwsQ0FERDtBQUVBLFlBQUksT0FBSyxFQUFMLENBSGtCO0FBSXRCLGFBQUssT0FBTCxDQUFhO21CQUFHLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxPQUFiLENBQXFCO3VCQUFJLENBQUMsSUFBRSxFQUFFLElBQUYsRUFBRixDQUFELENBQWEsTUFBYixJQUF1QixLQUFLLElBQUwsQ0FBVSxDQUFWLENBQXZCO2FBQUo7U0FBeEIsQ0FBYixDQUpzQjtBQUt0QixlQUFPLElBQVAsQ0FMc0I7S0FBdkI7O0FBUUcsV0FBTyx1QkFBUSxRQUFSLENBQWlCLElBQWpCLEVBQXNCLEVBQUMsU0FBUSxhQUFSLEVBQXZCLEVBQ1IsSUFEUSxDQUNIO2VBQU0sS0FBSyxLQUFMLENBQVcsa0JBQVEsb0JBQVIsQ0FBNkIsTUFBN0IsQ0FBWDtLQUFOLENBREcsQ0FDcUQsSUFEckQsQ0FDMEQsZUFBSztZQUN4RCxVQUE2QyxJ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Q0FERTt5QkFBSixFQUVDLE1BSFgsRUFibUQ7cUJBQVQ7aUJBRC9CO0FBQVosaUJBQVA7QUFIVSxhQWhCWDtTQUFQLENBVmtFO0tBQUwsQ0FEakUsQ0F6QmlDO0NBQXRCIiwiZmlsZSI6ImV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4SHViIGZyb20gXCJkb2N4LXRlbXBsYXRlXCJcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5cclxuaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcblxyXG5pbXBvcnQgSWdub3JlIGZyb20gXCIuL2h0bWwvaWdub3JlXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2h0bWwvZG9jdW1lbnRcIlxyXG5pbXBvcnQgZG9jdW1lbnRQcm9wZXJ0eSBmcm9tIFwiLi9odG1sL3Byb3BlcnR5XCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9odG1sL3BcIlxyXG5pbXBvcnQgdGFibGUgZnJvbSBcIi4vaHRtbC90YWJsZVwiXHJcbmltcG9ydCByb3cgZnJvbSBcIi4vaHRtbC90clwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL2h0bWwvdGRcIlxyXG5pbXBvcnQgdGV4dCBmcm9tIFwiLi9odG1sL3RleHRcIlxyXG5pbXBvcnQgaW1hZ2UgZnJvbSBcIi4vaHRtbC9pbWFnZVwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHRtbC9oeXBlcmxpbmtcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdChmaWxlKXtcclxuXHR2YXIgTU9ERUxTPXtcclxuXHRcdGRvY3VtZW50LFxyXG5cdFx0ZG9jdW1lbnRQcm9wZXJ0eSxcclxuXHRcdHBhcmFncmFwaCxcclxuXHRcdHRhYmxlLFxyXG5cdFx0cm93LFxyXG5cdFx0Y2VsbCxcclxuXHRcdHRleHQsXHJcblx0XHRpbWFnZSxcclxuXHRcdGh5cGVybGluayxcclxuXHRcdGhlYWRpbmc6IHBhcmFncmFwaCxcclxuXHRcdGhlYWRlcjogSWdub3JlLFxyXG5cdFx0Zm9vdGVyOiBJZ25vcmUsXHJcblx0XHRkb2N1bWVudFN0eWxlczogSWdub3JlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzcGxpdEtleShkYXRhKXtcclxuXHRcdGlmKHR5cGVvZihkYXRhKT09J3N0cmluZycpXHJcblx0XHRcdGRhdGE9W2RhdGFdXHJcblx0XHR2YXIga2V5cz1bXVxyXG5cdFx0ZGF0YS5mb3JFYWNoKGE9PmEuc3BsaXQoXCIsXCIpLmZvckVhY2goYj0+KChiPWIudHJpbSgpKS5sZW5ndGggJiYga2V5cy5wdXNoKGIpKSkpXHJcblx0XHRyZXR1cm4ga2V5c1xyXG5cdH1cclxuXHJcbiAgICByZXR1cm4gZG9jeEh1Yi5hc3NlbWJsZShmaWxlLHtjaGFubmVsOlwiaW50ZXJhY3RpdmVcIn0pXHJcblx0XHQudGhlbihkb2N4PT5kb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoTU9ERUxTKSkpLnRoZW4oZG9jPT57XHJcbiAgICAgICAgdmFyIHtodG1sOmNvbnRlbnQsIHByb3BlcnRpZXMsIGlkOmVsSWQsIGltYWdlcywgc3RlcHN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuXHRcdGlmKGtleXdvcmRzKVxyXG5cdFx0XHRrZXl3b3Jkcz1zcGxpdEtleShrZXl3b3JkcylcclxuXHJcblx0XHRpZihjYXRlZ29yeSlcclxuXHRcdFx0Y2F0ZWdvcnk9c3BsaXRLZXkoY2F0ZWdvcnkpXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtub3dsZWRnZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOnRpdGxlfHxuYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTphYnN0cmFjdHx8ZGVzY3JpcHRpb258fHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyxjYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHByb3BzOm90aGVycyxcclxuXHRcdFx0XHRzdGVwc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2UoKXtcclxuICAgICAgICAgICAgICAgIHZhciBub2Rlcz13aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nLl9fcmV2b2tpbmdgKVxyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlcywgKGEpPT5VUkwucmV2b2tlT2JqZWN0VVJMKGEuc3JjKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGhvdG9zKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWdgKSwoYSk9PmEuc3JjKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGxvYWQoZW50aXR5KXtcclxuICAgICAgICAgICAgICAgIHZhciBraW5kPWRiS25vd2xlZGdlLl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmU9e2VudGl0eTp7a2luZCxfaWQ6ZW50aXR5Ll9pZH19XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGUuZmluZCh7cGFyYW1zOm1vcmUsZmllbGRzOlwiY3JjMzJcIn0pLmZldGNoKChmaWxlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBJbWFnZXM9aW1hZ2VzLm1hcCgoaW1hZ2UpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YT1pbWFnZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyYzMyPWRhdGEuY3JjMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmaWxlcy5maW5kKChhKT0+YS5jcmMzMj09Y3JjMzIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGUudXBsb2FkKGRhdGEsIFwiaW1hZ2VcIiwgT2JqZWN0LmFzc2lnbih7Y3JjMzIsa2V5OlwiYS5qcGdcIn0sbW9yZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHVybCk9PmltYWdlLmRhdGE9dXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoKGEpPT5hKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBSYXdEb2N4PUZpbGUudXBsb2FkKGZpbGUsXCJkb2N4XCIsIE9iamVjdC5hc3NpZ24oe2tleTpcImEuZG9jeFwifSxtb3JlKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtwUmF3RG9jeCwgLi4ucEltYWdlc10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMua25vd2xlZGdlLmNvbnRlbnQ9ZG9jLmh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLy9mZXRjaFxyXG4gICAgICAgICAgICAgICAgKS8vcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iXX0=