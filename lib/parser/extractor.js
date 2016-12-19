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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBWXdCOztBQVp4Qjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPLElBQVAsSUFBYyxRQUFkLEVBQ0YsT0FBSyxDQUFDLElBQUQsQ0FBTCxDQUREO0FBRUEsUUFBSSxPQUFLLEVBQUwsQ0FIa0I7QUFJdEIsU0FBSyxPQUFMLENBQWE7ZUFBRyxFQUFFLEtBQUYsQ0FBUSxHQUFSLEVBQWEsT0FBYixDQUFxQjttQkFBSSxDQUFDLElBQUUsRUFBRSxJQUFGLEVBQUYsQ0FBRCxDQUFhLE1BQWIsSUFBdUIsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUF2QjtTQUFKO0tBQXhCLENBQWIsQ0FKc0I7QUFLdEIsV0FBTyxJQUFQLENBTHNCO0NBQXZCOztBQVFlLFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUFzQjtBQUNqQyxXQUFPLHNCQUFNLElBQU4sRUFBWSxJQUFaLENBQWlCLGVBQUs7WUFDZixVQUE2QyxJQUFsRDtZQUFjLGFBQW9DLElBQXBDO1lBQWUsT0FBcUIsSUFBeEI7WUFBUyxTQUFlLElBQWY7WUFBUSxRQUFPLElBQVA7WUFDM0MsT0FBMEUsV0FBMUU7WUFBSyxRQUFxRSxXQUFyRTtZQUFPLFdBQThELFdBQTlEO1lBQVUsV0FBb0QsV0FBcEQ7WUFBVSxVQUEwQyxXQUExQztZQUFTLFdBQWlDLFdBQWpDO1lBQVMsY0FBd0IsV0FBeEI7WUFBZ0IsZ0RBQVEsNkZBRnREOzs7QUFJL0IsWUFBRyxRQUFILEVBQ0MsV0FBUyxTQUFTLFFBQVQsQ0FBVCxDQUREOztBQUdBLFlBQUcsUUFBSCxFQUNDLFdBQVMsU0FBUyxRQUFULENBQVQsQ0FERDs7QUFHTSxlQUFPO0FBQ0gsdUJBQVc7QUFDUCxnQ0FETztBQUVQLHVCQUFNLFNBQU8sSUFBUDtBQUNOLHlCQUFRLFlBQVUsV0FBVixJQUF1QixPQUF2QjtBQUNSLGtDQUpPLEVBSUUsa0JBSkY7QUFLUCx1QkFBTSxNQUFOO0FBQ1osNEJBTm1CO2FBQVg7QUFRQSxzQ0FBUTtBQUNKLG9CQUFJLFFBQU0sT0FBTyxRQUFQLENBQWdCLGdCQUFoQixPQUFxQyx3QkFBckMsQ0FBTixDQURBO0FBRUosc0JBQU0sU0FBTixDQUFnQixPQUFoQixDQUF3QixJQUF4QixDQUE2QixLQUE3QixFQUFvQyxVQUFDLENBQUQ7MkJBQUssSUFBSSxlQUFKLENBQW9CLEVBQUUsR0FBRjtpQkFBekIsQ0FBcEMsQ0FGSTthQVRMO0FBYUgsNENBQVc7QUFDUCx1QkFBTyxNQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsSUFBcEIsQ0FBeUIsT0FBTyxRQUFQLENBQWdCLGdCQUFoQixPQUFxQyxhQUFyQyxDQUF6QixFQUEwRSxVQUFDLENBQUQ7MkJBQUssRUFBRSxHQUFGO2lCQUFMLENBQWpGLENBRE87YUFiUjtBQWdCSCxvQ0FBTyxRQUFPOzs7QUFDVixvQkFBSSxPQUFLLG9CQUFZLEtBQVo7b0JBQ0wsT0FBSyxFQUFDLFFBQU8sRUFBQyxVQUFELEVBQU0sS0FBSSxPQUFPLEdBQVAsRUFBakIsRUFBTixDQUZNO0FBR1YsdUJBQU8sc0JBQVksVUFBQyxPQUFELEVBQVUsTUFBVjsyQkFDZixjQUFLLElBQUwsQ0FBVSxFQUFDLFFBQU8sSUFBUCxFQUFZLFFBQU8sT0FBUCxFQUF2QixFQUF3QyxLQUF4QyxDQUE4QyxVQUFDLEtBQUQsRUFBUztBQUNuRCw0QkFBSSxVQUFRLE9BQU8sR0FBUCxDQUFXLFVBQUMsS0FBRCxFQUFTO0FBQzVCLGdDQUFJLE9BQUssTUFBTSxJQUFOO2dDQUNMLFFBQU0sS0FBSyxLQUFMLENBRmtCO0FBRzVCLGdDQUFHLE1BQU0sSUFBTixDQUFXLFVBQUMsQ0FBRDt1Q0FBSyxFQUFFLEtBQUYsSUFBUyxLQUFUOzZCQUFMLENBQWQsRUFDSSxPQUFPLFNBQVAsQ0FESjs7QUFHQSxtQ0FBTyxjQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCLHNCQUFjLEVBQUMsWUFBRCxFQUFPLEtBQUksT0FBSixFQUFyQixFQUFrQyxJQUFsQyxDQUEzQixFQUNGLElBREUsQ0FDRyxVQUFDLEdBQUQ7dUNBQU8sTUFBTSxJQUFOLEdBQVcsR0FBWDs2QkFBUCxDQURWLENBTjRCO3lCQUFULENBQVgsQ0FRVCxNQVJTLENBUUYsVUFBQyxDQUFEO21DQUFLO3lCQUFMLENBUk4sQ0FEK0M7O0FBV25ELDRCQUFJLFdBQVMsY0FBSyxNQUFMLENBQVksSUFBWixFQUFpQixNQUFqQixFQUF5QixzQkFBYyxFQUFDLEtBQUksUUFBSixFQUFmLEVBQTZCLElBQTdCLENBQXpCLENBQVQsQ0FYK0M7O0FBYW5ELDBDQUFRLEdBQVIsRUFBYSxrREFBYSxTQUExQixFQUNLLElBREwsQ0FDVSxZQUFJO0FBQ0Ysb0NBQVEsTUFBSyxTQUFMLENBQWUsT0FBZixHQUF1QixJQUFJLElBQUosQ0FBL0IsQ0FERTt5QkFBSixFQUVDLE1BSFgsRUFibUQ7cUJBQVQ7aUJBRC9CO0FBQVosaUJBQVA7QUFIVSxhQWhCWDtTQUFQLENBVnlCO0tBQUwsQ0FBeEIsQ0FEaUM7Q0FBdEIiLCJmaWxlIjoiZXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcbmltcG9ydCBwYXJzZSBmcm9tIFwiLi4va25vd2xlZGdlL3BhcnNlclwiXHJcblxyXG5mdW5jdGlvbiBzcGxpdEtleShkYXRhKXtcclxuXHRpZih0eXBlb2YoZGF0YSk9PSdzdHJpbmcnKVxyXG5cdFx0ZGF0YT1bZGF0YV1cclxuXHR2YXIga2V5cz1bXVxyXG5cdGRhdGEuZm9yRWFjaChhPT5hLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGI9PigoYj1iLnRyaW0oKSkubGVuZ3RoICYmIGtleXMucHVzaChiKSkpKVxyXG5cdHJldHVybiBrZXlzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcbiAgICByZXR1cm4gcGFyc2UoZmlsZSkudGhlbihkb2M9PntcclxuICAgICAgICB2YXIge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzLCBzdGVwc309ZG9jLFxyXG4gICAgICAgICAgICB7bmFtZSx0aXRsZSwga2V5d29yZHMsIGNhdGVnb3J5LCBzdWJqZWN0LCBhYnN0cmFjdCxkZXNjcmlwdGlvbiwgLi4ub3RoZXJzfT1wcm9wZXJ0aWVzXHJcblxyXG5cdFx0aWYoa2V5d29yZHMpXHJcblx0XHRcdGtleXdvcmRzPXNwbGl0S2V5KGtleXdvcmRzKVxyXG5cclxuXHRcdGlmKGNhdGVnb3J5KVxyXG5cdFx0XHRjYXRlZ29yeT1zcGxpdEtleShjYXRlZ29yeSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzLFxyXG5cdFx0XHRcdHN0ZXBzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goKGZpbGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEltYWdlcz1pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhPWltYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JjMzI9ZGF0YS5jcmMzMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVzLmZpbmQoKGEpPT5hLmNyYzMyPT1jcmMzMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsZS51cGxvYWQoZGF0YSwgXCJpbWFnZVwiLCBPYmplY3QuYXNzaWduKHtjcmMzMixrZXk6XCJhLmpwZ1wifSxtb3JlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXJsKT0+aW1hZ2UuZGF0YT11cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZpbHRlcigoYSk9PmEpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFJhd0RvY3g9RmlsZS51cGxvYWQoZmlsZSxcImRvY3hcIiwgT2JqZWN0LmFzc2lnbih7a2V5OlwiYS5kb2N4XCJ9LG1vcmUpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UuY29udGVudD1kb2MuaHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==