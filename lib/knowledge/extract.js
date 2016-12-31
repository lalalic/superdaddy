"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = extract;

var _qiliApp = require("qili-app");

var _knowledge = require("../db/knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _parse = require("./parse");

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
            others = _objectWithoutProperties(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);

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
                return new Promise(function (resolve, reject) {
                    return _qiliApp.File.find({ params: more, fields: "crc32" }).fetch(function (files) {
                        var pImages = images.map(function (_ref) {
                            var url = _ref.url,
                                crc32 = _ref.crc32;

                            if (files.find(function (a) {
                                return a.crc32 == crc32;
                            })) return undefined;

                            return _qiliApp.File.upload(url, Object.assign({ crc32: crc32, key: "a.jpg" }, more)).then(function (remoteURL) {
                                _this.knowledge.content.replace(url, image.url = remoteURL);
                                window.document.querySelector("#" + elId + " img[src~=\"url\"]").setAttribute("src", remoteURL);
                            });
                        }).filter(function (a) {
                            return !!a;
                        });

                        var pRawDocx = _qiliApp.File.upload(file, Object.assign({ key: "a.docx" }, more)).then(function (url) {
                            return _this.knowledge.template = url;
                        });

                        Promise.all([pRawDocx].concat(_toConsumableArray(pImages))).then(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvZXh0cmFjdC5qcyJdLCJuYW1lcyI6WyJleHRyYWN0IiwicmVnIiwic3BsaXRLZXkiLCJkYXRhIiwicmVkdWNlIiwia2V5cyIsInBpZWNlIiwic3BsaXQiLCJmb3JFYWNoIiwicHVzaCIsImEiLCJmaWx0ZXIiLCJmaWxlIiwidGhlbiIsImNvbnRlbnQiLCJkb2MiLCJodG1sIiwicHJvcGVydGllcyIsImVsSWQiLCJpZCIsImltYWdlcyIsInN0ZXBzIiwibmFtZSIsInRpdGxlIiwia2V5d29yZHMiLCJjYXRlZ29yeSIsInN1YmplY3QiLCJhYnN0cmFjdCIsImRlc2NyaXB0aW9uIiwib3RoZXJzIiwia25vd2xlZGdlIiwic3VtbWFyeSIsInByb3BzIiwicmV2b2tlIiwibm9kZXMiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJVUkwiLCJyZXZva2VPYmplY3RVUkwiLCJzcmMiLCJnZXRQaG90b3MiLCJtYXAiLCJ1cGxvYWQiLCJlbnRpdHkiLCJraW5kIiwiX25hbWUiLCJtb3JlIiwiX2lkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmaW5kIiwicGFyYW1zIiwiZmllbGRzIiwiZmV0Y2giLCJwSW1hZ2VzIiwidXJsIiwiY3JjMzIiLCJmaWxlcyIsInVuZGVmaW5lZCIsIk9iamVjdCIsImFzc2lnbiIsImtleSIsInJlcGxhY2UiLCJpbWFnZSIsInJlbW90ZVVSTCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJwUmF3RG9jeCIsInRlbXBsYXRlIiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFld0JBLE87O0FBZnhCOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQyxNQUFJLFNBQVY7QUFDQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF1QjtBQUN0QixRQUFHLE9BQU9BLElBQVAsSUFBYyxRQUFqQixFQUND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QUFRLE1BQUt2QixTQUFiO0FBQ0gseUJBSFQsRUFHV3dCLE1BSFg7QUFJSCxxQkFwQkQsQ0FEZTtBQUFBLGlCQUFaLENBcUJEO0FBckJDLGlCQUFQLENBSFUsQ0F5QlQ7QUFDSjtBQTFDRSxTQUFQO0FBNENILEtBdERNLENBQVA7QUF1REgiLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5pbXBvcnQgcGFyc2UgZnJvbSBcIi4vcGFyc2VcIlxyXG5cclxuY29uc3QgcmVnPS9bLSxcXHMrXS9cclxuZnVuY3Rpb24gc3BsaXRLZXkoZGF0YSl7XHJcblx0aWYodHlwZW9mKGRhdGEpPT0nc3RyaW5nJylcclxuXHRcdGRhdGE9W2RhdGFdXHJcblxyXG5cdHJldHVybiBkYXRhLnJlZHVjZSgoa2V5cyxwaWVjZSk9PntcclxuXHRcdHBpZWNlLnNwbGl0KHJlZykuZm9yRWFjaChhPT5rZXlzLnB1c2goYSkpXHJcblx0XHRyZXR1cm4ga2V5c1xyXG5cdH0sW10pLmZpbHRlcihhPT4hIWEpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcbiAgICByZXR1cm4gcGFyc2UoZmlsZSkudGhlbihkb2M9PntcclxuICAgICAgICB2YXIge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzLCBzdGVwc309ZG9jLFxyXG4gICAgICAgICAgICB7bmFtZSx0aXRsZSwga2V5d29yZHMsIGNhdGVnb3J5LCBzdWJqZWN0LCBhYnN0cmFjdCxkZXNjcmlwdGlvbiwgLi4ub3RoZXJzfT1wcm9wZXJ0aWVzXHJcblxyXG5cdFx0aWYoa2V5d29yZHMpXHJcblx0XHRcdGtleXdvcmRzPXNwbGl0S2V5KGtleXdvcmRzKVxyXG5cclxuXHRcdGlmKGNhdGVnb3J5KVxyXG5cdFx0XHRjYXRlZ29yeT1zcGxpdEtleShjYXRlZ29yeSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzLFxyXG5cdFx0XHRcdHN0ZXBzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWdbc3Jjfj1cImJsb2I6XCJdYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksYT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmQ9ZGJLbm93bGVkZ2UuX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZT17ZW50aXR5OntraW5kLF9pZDplbnRpdHkuX2lkfX1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZS5maW5kKHtwYXJhbXM6bW9yZSxmaWVsZHM6XCJjcmMzMlwifSkuZmV0Y2goZmlsZXM9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBJbWFnZXM9aW1hZ2VzLm1hcCgoe3VybCxjcmMzMn0pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmaWxlcy5maW5kKChhKT0+YS5jcmMzMj09Y3JjMzIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGUudXBsb2FkKHVybCwgT2JqZWN0LmFzc2lnbih7Y3JjMzIsa2V5OlwiYS5qcGdcIn0sbW9yZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVtb3RlVVJMPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMua25vd2xlZGdlLmNvbnRlbnQucmVwbGFjZSh1cmwsaW1hZ2UudXJsPXJlbW90ZVVSTClcclxuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsSWR9IGltZ1tzcmN+PVwidXJsXCJdYCkuc2V0QXR0cmlidXRlKFwic3JjXCIscmVtb3RlVVJMKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5maWx0ZXIoYT0+ISFhKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBSYXdEb2N4PUZpbGUudXBsb2FkKGZpbGUsIE9iamVjdC5hc3NpZ24oe2tleTpcImEuZG9jeFwifSxtb3JlKSlcclxuXHRcdFx0XHRcdFx0XHQudGhlbih1cmwgPT50aGlzLmtub3dsZWRnZS50ZW1wbGF0ZT11cmwpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkvL2ZldGNoXHJcbiAgICAgICAgICAgICAgICApLy9wcm9taXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==