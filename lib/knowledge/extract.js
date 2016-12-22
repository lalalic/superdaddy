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

var _parse = require("./parse");

var _parse2 = _interopRequireDefault(_parse);

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
    return (0, _parse2.default)(file).then(function (doc) {
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
                        var pImages = images.map(function (_ref) {
                            var url = _ref.url,
                                crc32 = _ref.crc32;

                            if (files.find(function (a) {
                                return a.crc32 == crc32;
                            })) return undefined;

                            return _qiliApp.File.upload(url, (0, _assign2.default)({ crc32: crc32, key: "a.jpg" }, more)).then(function (remoteURL) {
                                _this.knowledge.content.replace(url, image.url = remoteURL);
                                window.document.querySelector("#" + elId + " img[src~=\"url\"]").setAttribute("src", remoteURL);
                            });
                        }).filter(function (a) {
                            return !!a;
                        });

                        var pRawDocx = _qiliApp.File.upload(file, (0, _assign2.default)({ key: "a.docx" }, more)).then(function (url) {
                            return _this.knowledge.template = url;
                        });

                        _promise2.default.all([pRawDocx].concat((0, _toConsumableArray3.default)(pImages))).then(function () {
                            resolve(_this.knowledge);
                        }, reject);
                    });
                } //fetch
                ); //promise
            }
        };
    });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvZXh0cmFjdC5qcyJdLCJuYW1lcyI6WyJleHRyYWN0IiwicmVnIiwic3BsaXRLZXkiLCJkYXRhIiwicmVkdWNlIiwia2V5cyIsInBpZWNlIiwic3BsaXQiLCJmb3JFYWNoIiwicHVzaCIsImEiLCJmaWx0ZXIiLCJmaWxlIiwidGhlbiIsImNvbnRlbnQiLCJkb2MiLCJodG1sIiwicHJvcGVydGllcyIsImVsSWQiLCJpZCIsImltYWdlcyIsInN0ZXBzIiwibmFtZSIsInRpdGxlIiwia2V5d29yZHMiLCJjYXRlZ29yeSIsInN1YmplY3QiLCJhYnN0cmFjdCIsImRlc2NyaXB0aW9uIiwib3RoZXJzIiwia25vd2xlZGdlIiwic3VtbWFyeSIsInByb3BzIiwicmV2b2tlIiwibm9kZXMiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJVUkwiLCJyZXZva2VPYmplY3RVUkwiLCJzcmMiLCJnZXRQaG90b3MiLCJtYXAiLCJ1cGxvYWQiLCJlbnRpdHkiLCJraW5kIiwiX25hbWUiLCJtb3JlIiwiX2lkIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJwYXJhbXMiLCJmaWVsZHMiLCJmZXRjaCIsInBJbWFnZXMiLCJ1cmwiLCJjcmMzMiIsImZpbGVzIiwidW5kZWZpbmVkIiwia2V5IiwicmVwbGFjZSIsImltYWdlIiwicmVtb3RlVVJMIiwicXVlcnlTZWxlY3RvciIsInNldEF0dHJpYnV0ZSIsInBSYXdEb2N4IiwidGVtcGxhdGUiLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBZXdCQSxPOztBQWZ4Qjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxNQUFJLFNBQVY7QUFDQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF1QjtBQUN0QixRQUFHLE9BQU9BLElBQVAsSUFBYyxRQUFqQixFQUNDQSxPQUFLLENBQUNBLElB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LENBRGU7QUFBQSxpQkFBWixDQXFCRDtBQXJCQyxpQkFBUCxDQUhVLENBeUJUO0FBQ0o7QUExQ0UsU0FBUDtBQTRDSCxLQXRETSxDQUFQO0FBdURIIiwiZmlsZSI6ImV4dHJhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbGV9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tIFwiLi4vZGIva25vd2xlZGdlXCJcclxuaW1wb3J0IHBhcnNlIGZyb20gXCIuL3BhcnNlXCJcclxuXHJcbmNvbnN0IHJlZz0vWy0sXFxzK10vXHJcbmZ1bmN0aW9uIHNwbGl0S2V5KGRhdGEpe1xyXG5cdGlmKHR5cGVvZihkYXRhKT09J3N0cmluZycpXHJcblx0XHRkYXRhPVtkYXRhXVxyXG5cclxuXHRyZXR1cm4gZGF0YS5yZWR1Y2UoKGtleXMscGllY2UpPT57XHJcblx0XHRwaWVjZS5zcGxpdChyZWcpLmZvckVhY2goYT0+a2V5cy5wdXNoKGEpKVxyXG5cdFx0cmV0dXJuIGtleXNcclxuXHR9LFtdKS5maWx0ZXIoYT0+ISFhKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIHBhcnNlKGZpbGUpLnRoZW4oZG9jPT57XHJcbiAgICAgICAgdmFyIHtodG1sOmNvbnRlbnQsIHByb3BlcnRpZXMsIGlkOmVsSWQsIGltYWdlcywgc3RlcHN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuXHRcdGlmKGtleXdvcmRzKVxyXG5cdFx0XHRrZXl3b3Jkcz1zcGxpdEtleShrZXl3b3JkcylcclxuXHJcblx0XHRpZihjYXRlZ29yeSlcclxuXHRcdFx0Y2F0ZWdvcnk9c3BsaXRLZXkoY2F0ZWdvcnkpXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtub3dsZWRnZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOnRpdGxlfHxuYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTphYnN0cmFjdHx8ZGVzY3JpcHRpb258fHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyxjYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHByb3BzOm90aGVycyxcclxuXHRcdFx0XHRzdGVwc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2UoKXtcclxuICAgICAgICAgICAgICAgIHZhciBub2Rlcz13aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nW3NyY349XCJibG9iOlwiXWApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLGE9PmEuc3JjKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGxvYWQoZW50aXR5KXtcclxuICAgICAgICAgICAgICAgIHZhciBraW5kPWRiS25vd2xlZGdlLl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmU9e2VudGl0eTp7a2luZCxfaWQ6ZW50aXR5Ll9pZH19XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGUuZmluZCh7cGFyYW1zOm1vcmUsZmllbGRzOlwiY3JjMzJcIn0pLmZldGNoKGZpbGVzPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKHt1cmwsY3JjMzJ9KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZCh1cmwsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlbW90ZVVSTD0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmtub3dsZWRnZS5jb250ZW50LnJlcGxhY2UodXJsLGltYWdlLnVybD1yZW1vdGVVUkwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbElkfSBpbWdbc3Jjfj1cInVybFwiXWApLnNldEF0dHJpYnV0ZShcInNyY1wiLHJlbW90ZVVSTClcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKGE9PiEhYSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblx0XHRcdFx0XHRcdFx0LnRoZW4odXJsID0+dGhpcy5rbm93bGVkZ2UudGVtcGxhdGU9dXJsKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLy9mZXRjaFxyXG4gICAgICAgICAgICAgICAgKS8vcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iXX0=