"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = extract;

var _qiliApp = require("qili-app");

var _knowledge = require("../db/knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reg = /[-,\s+]/;
function splitKey(data) {
    if (typeof data == 'string') data = [data];

    return data.reduce(function (keys, piece) {
        piece.split(reg).forEach(function (a) {
            return keys.push(a);
        });
        return keys;
    }, []).filter(function (a) {
        return !!a;
    });
}

function extract(file) {
    return (0, _parser2.default)(file).then(function (doc) {
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
                var nodes = window.document.querySelectorAll("#" + elId + " img[src~=\"blob:\"]");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbImV4dHJhY3QiLCJyZWciLCJzcGxpdEtleSIsImRhdGEiLCJyZWR1Y2UiLCJrZXlzIiwicGllY2UiLCJzcGxpdCIsImZvckVhY2giLCJwdXNoIiwiYSIsImZpbHRlciIsImZpbGUiLCJ0aGVuIiwiY29udGVudCIsImRvYyIsImh0bWwiLCJwcm9wZXJ0aWVzIiwiZWxJZCIsImlkIiwiaW1hZ2VzIiwic3RlcHMiLCJuYW1lIiwidGl0bGUiLCJrZXl3b3JkcyIsImNhdGVnb3J5Iiwic3ViamVjdCIsImFic3RyYWN0IiwiZGVzY3JpcHRpb24iLCJvdGhlcnMiLCJrbm93bGVkZ2UiLCJzdW1tYXJ5IiwicHJvcHMiLCJyZXZva2UiLCJub2RlcyIsIndpbmRvdyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsIlVSTCIsInJldm9rZU9iamVjdFVSTCIsInNyYyIsImdldFBob3RvcyIsIm1hcCIsInVwbG9hZCIsImVudGl0eSIsImtpbmQiLCJfbmFtZSIsIm1vcmUiLCJfaWQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsInBhcmFtcyIsImZpZWxkcyIsImZldGNoIiwiZmlsZXMiLCJwSW1hZ2VzIiwiaW1hZ2UiLCJjcmMzMiIsInVuZGVmaW5lZCIsImtleSIsInVybCIsInBSYXdEb2N4IiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWV3QkEsTzs7QUFmeEI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsTUFBSSxTQUFWO0FBQ0EsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPQSxJQUFQLElBQWMsUUFBakIsRUFDQ0EsT0FBSyxDQUFDQSxJQUFELENBQUw7O0FBRUQsV0FBT0EsS0FBS0MsTUFBTCxDQUFZLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFj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QUFTO0FBQzVCLGdDQUFJekQsT0FBS3lELE1BQU16RCxJQUFmO0FBQUEsZ0NBQ0kwRCxRQUFNMUQsS0FBSzBELEtBRGY7QUFFQSxnQ0FBR0gsTUFBTUosSUFBTixDQUFXLFVBQUM1QyxDQUFEO0FBQUEsdUNBQUtBLEVBQUVtRCxLQUFGLElBQVNBLEtBQWQ7QUFBQSw2QkFBWCxDQUFILEVBQ0ksT0FBT0MsU0FBUDs7QUFFSixtQ0FBTyxjQUFLaEIsTUFBTCxDQUFZM0MsSUFBWixFQUFrQixPQUFsQixFQUEyQixzQkFBYyxFQUFDMEQsWUFBRCxFQUFPRSxLQUFJLE9BQVgsRUFBZCxFQUFrQ2IsSUFBbEMsQ0FBM0IsRUFDRnJDLElBREUsQ0FDRyxVQUFDbUQsR0FBRDtBQUFBLHVDQUFPSixNQUFNekQsSUFBTixHQUFXNkQsR0FBbEI7QUFBQSw2QkFESCxDQUFQO0FBRUgseUJBUlcsRUFRVHJELE1BUlMsQ0FRRixVQUFDRCxDQUFEO0FBQUEsbUNBQUtBLENBQUw7QUFBQSx5QkFSRSxDQUFaOztBQVVBLDRCQUFJdUQsV0FBUyxjQUFLbkIsTUFBTCxDQUFZbEMsSUFBWixFQUFpQixNQUFqQixFQUF5QixzQkFBYyxFQUFDbUQsS0FBSSxRQUFMLEVBQWQsRUFBNkJiLElBQTdCLENBQXpCLENBQWI7O0FBRUEsMENBQVFnQixHQUFSLEVBQWFELFFBQWIsMENBQTBCTixPQUExQixJQUNLOUMsSUFETCxDQUNVLFlBQUk7QUFDRnVDLG9DQUFRLE1BQUt0QixTQUFMLENBQWVoQixPQUFmLEdBQXVCQyxJQUFJQyxJQUFuQztBQUNILHlCQUhULEVBR1dxQyxNQUhYO0FBSUgscUJBakJELENBRGU7QUFBQSxpQkFBWixDQWtCRDtBQWxCQyxpQkFBUCxDQUhVLENBc0JUO0FBQ0o7QUF2Q0UsU0FBUDtBQXlDSCxLQW5ETSxDQUFQO0FBb0RIIiwiZmlsZSI6ImV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5pbXBvcnQgcGFyc2UgZnJvbSBcIi4vcGFyc2VyXCJcclxuXHJcbmNvbnN0IHJlZz0vWy0sXFxzK10vXHJcbmZ1bmN0aW9uIHNwbGl0S2V5KGRhdGEpe1xyXG5cdGlmKHR5cGVvZihkYXRhKT09J3N0cmluZycpXHJcblx0XHRkYXRhPVtkYXRhXVxyXG5cclxuXHRyZXR1cm4gZGF0YS5yZWR1Y2UoKGtleXMscGllY2UpPT57XHJcblx0XHRwaWVjZS5zcGxpdChyZWcpLmZvckVhY2goYT0+a2V5cy5wdXNoKGEpKVxyXG5cdFx0cmV0dXJuIGtleXNcclxuXHR9LFtdKS5maWx0ZXIoYT0+ISFhKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIHBhcnNlKGZpbGUpLnRoZW4oZG9jPT57XHJcbiAgICAgICAgdmFyIHtodG1sOmNvbnRlbnQsIHByb3BlcnRpZXMsIGlkOmVsSWQsIGltYWdlcywgc3RlcHN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuXHRcdGlmKGtleXdvcmRzKVxyXG5cdFx0XHRrZXl3b3Jkcz1zcGxpdEtleShrZXl3b3JkcylcclxuXHJcblx0XHRpZihjYXRlZ29yeSlcclxuXHRcdFx0Y2F0ZWdvcnk9c3BsaXRLZXkoY2F0ZWdvcnkpXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtub3dsZWRnZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOnRpdGxlfHxuYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTphYnN0cmFjdHx8ZGVzY3JpcHRpb258fHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyxjYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHByb3BzOm90aGVycyxcclxuXHRcdFx0XHRzdGVwc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2UoKXtcclxuICAgICAgICAgICAgICAgIHZhciBub2Rlcz13aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nW3NyY349XCJibG9iOlwiXWApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLGE9PmEuc3JjKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGxvYWQoZW50aXR5KXtcclxuICAgICAgICAgICAgICAgIHZhciBraW5kPWRiS25vd2xlZGdlLl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmU9e2VudGl0eTp7a2luZCxfaWQ6ZW50aXR5Ll9pZH19XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGUuZmluZCh7cGFyYW1zOm1vcmUsZmllbGRzOlwiY3JjMzJcIn0pLmZldGNoKChmaWxlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBJbWFnZXM9aW1hZ2VzLm1hcCgoaW1hZ2UpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YT1pbWFnZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyYzMyPWRhdGEuY3JjMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmaWxlcy5maW5kKChhKT0+YS5jcmMzMj09Y3JjMzIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGUudXBsb2FkKGRhdGEsIFwiaW1hZ2VcIiwgT2JqZWN0LmFzc2lnbih7Y3JjMzIsa2V5OlwiYS5qcGdcIn0sbW9yZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHVybCk9PmltYWdlLmRhdGE9dXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoKGEpPT5hKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBSYXdEb2N4PUZpbGUudXBsb2FkKGZpbGUsXCJkb2N4XCIsIE9iamVjdC5hc3NpZ24oe2tleTpcImEuZG9jeFwifSxtb3JlKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtwUmF3RG9jeCwgLi4ucEltYWdlc10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMua25vd2xlZGdlLmNvbnRlbnQ9ZG9jLmh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLy9mZXRjaFxyXG4gICAgICAgICAgICAgICAgKS8vcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iXX0=