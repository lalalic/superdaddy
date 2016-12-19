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

var _parser = require("../knowledge/parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbImV4dHJhY3QiLCJzcGxpdEtleSIsImRhdGEiLCJrZXlzIiwiZm9yRWFjaCIsImEiLCJzcGxpdCIsImIiLCJ0cmltIiwibGVuZ3RoIiwicHVzaCIsImZpbGUiLCJ0aGVuIiwiY29udGVudCIsImRvYyIsImh0bWwiLCJwcm9wZXJ0aWVzIiwiZWxJZCIsImlkIiwiaW1hZ2VzIiwic3RlcHMiLCJuYW1lIiwidGl0bGUiLCJrZXl3b3JkcyIsImNhdGVnb3J5Iiwic3ViamVjdCIsImFic3RyYWN0IiwiZGVzY3JpcHRpb24iLCJvdGhlcnMiLCJrbm93bGVkZ2UiLCJzdW1tYXJ5IiwicHJvcHMiLCJyZXZva2UiLCJub2RlcyIsIndpbmRvdyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsIlVSTCIsInJldm9rZU9iamVjdFVSTCIsInNyYyIsImdldFBob3RvcyIsIm1hcCIsInVwbG9hZCIsImVudGl0eSIsImtpbmQiLCJfbmFtZSIsIm1vcmUiLCJfaWQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsInBhcmFtcyIsImZpZWxkcyIsImZldGNoIiwiZmlsZXMiLCJwSW1hZ2VzIiwiaW1hZ2UiLCJjcmMzMiIsInVuZGVmaW5lZCIsImtleSIsInVybCIsImZpbHRlciIsInBSYXdEb2N4IiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVl3QkEsTzs7QUFaeEI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPQSxJQUFQLElBQWMsUUFBakIsRUFDQ0EsT0FBSyxDQUFDQSxJQUFELENBQUw7QUFDRCxRQUFJQyxPQUFLLEVBQVQ7QUFDQUQsU0FBS0UsT0FBTCxDQUFhO0FBQUEsZUFBR0MsRUFBRUMsS0FBRixDQUFRLEdBQVIsRUFBYUYs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Q0FDSTBELFFBQU0xRCxLQUFLMEQsS0FEZjtBQUVBLGdDQUFHSCxNQUFNSixJQUFOLENBQVcsVUFBQ2hELENBQUQ7QUFBQSx1Q0FBS0EsRUFBRXVELEtBQUYsSUFBU0EsS0FBZDtBQUFBLDZCQUFYLENBQUgsRUFDSSxPQUFPQyxTQUFQOztBQUVKLG1DQUFPLGNBQUtoQixNQUFMLENBQVkzQyxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCLHNCQUFjLEVBQUMwRCxZQUFELEVBQU9FLEtBQUksT0FBWCxFQUFkLEVBQWtDYixJQUFsQyxDQUEzQixFQUNGckMsSUFERSxDQUNHLFVBQUNtRCxHQUFEO0FBQUEsdUNBQU9KLE1BQU16RCxJQUFOLEdBQVc2RCxHQUFsQjtBQUFBLDZCQURILENBQVA7QUFFSCx5QkFSVyxFQVFUQyxNQVJTLENBUUYsVUFBQzNELENBQUQ7QUFBQSxtQ0FBS0EsQ0FBTDtBQUFBLHlCQVJFLENBQVo7O0FBVUEsNEJBQUk0RCxXQUFTLGNBQUtwQixNQUFMLENBQVlsQyxJQUFaLEVBQWlCLE1BQWpCLEVBQXlCLHNCQUFjLEVBQUNtRCxLQUFJLFFBQUwsRUFBZCxFQUE2QmIsSUFBN0IsQ0FBekIsQ0FBYjs7QUFFQSwwQ0FBUWlCLEdBQVIsRUFBYUQsUUFBYiwwQ0FBMEJQLE9BQTFCLElBQ0s5QyxJQURMLENBQ1UsWUFBSTtBQUNGdUMsb0NBQVEsTUFBS3RCLFNBQUwsQ0FBZWhCLE9BQWYsR0FBdUJDLElBQUlDLElBQW5DO0FBQ0gseUJBSFQsRUFHV3FDLE1BSFg7QUFJSCxxQkFqQkQsQ0FEZTtBQUFBLGlCQUFaLENBa0JEO0FBbEJDLGlCQUFQLENBSFUsQ0FzQlQ7QUFDSjtBQXZDRSxTQUFQO0FBeUNILEtBbkRNLENBQVA7QUFvREgiLCJmaWxlIjoiZXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcbmltcG9ydCBwYXJzZSBmcm9tIFwiLi4va25vd2xlZGdlL3BhcnNlclwiXHJcblxyXG5mdW5jdGlvbiBzcGxpdEtleShkYXRhKXtcclxuXHRpZih0eXBlb2YoZGF0YSk9PSdzdHJpbmcnKVxyXG5cdFx0ZGF0YT1bZGF0YV1cclxuXHR2YXIga2V5cz1bXVxyXG5cdGRhdGEuZm9yRWFjaChhPT5hLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGI9PigoYj1iLnRyaW0oKSkubGVuZ3RoICYmIGtleXMucHVzaChiKSkpKVxyXG5cdHJldHVybiBrZXlzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcbiAgICByZXR1cm4gcGFyc2UoZmlsZSkudGhlbihkb2M9PntcclxuICAgICAgICB2YXIge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzLCBzdGVwc309ZG9jLFxyXG4gICAgICAgICAgICB7bmFtZSx0aXRsZSwga2V5d29yZHMsIGNhdGVnb3J5LCBzdWJqZWN0LCBhYnN0cmFjdCxkZXNjcmlwdGlvbiwgLi4ub3RoZXJzfT1wcm9wZXJ0aWVzXHJcblxyXG5cdFx0aWYoa2V5d29yZHMpXHJcblx0XHRcdGtleXdvcmRzPXNwbGl0S2V5KGtleXdvcmRzKVxyXG5cclxuXHRcdGlmKGNhdGVnb3J5KVxyXG5cdFx0XHRjYXRlZ29yeT1zcGxpdEtleShjYXRlZ29yeSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzLFxyXG5cdFx0XHRcdHN0ZXBzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goKGZpbGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEltYWdlcz1pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPWltYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JjMzI9ZGF0YS5jcmMzMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVzLmZpbmQoKGEpPT5hLmNyYzMyPT1jcmMzMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsZS51cGxvYWQoZGF0YSwgXCJpbWFnZVwiLCBPYmplY3QuYXNzaWduKHtjcmMzMixrZXk6XCJhLmpwZ1wifSxtb3JlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXJsKT0+aW1hZ2UuZGF0YT11cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcigoYSk9PmEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFJhd0RvY3g9RmlsZS51cGxvYWQoZmlsZSxcImRvY3hcIiwgT2JqZWN0LmFzc2lnbih7a2V5OlwiYS5kb2N4XCJ9LG1vcmUpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UuY29udGVudD1kb2MuaHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==