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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvZXh0cmFjdC5qcyJdLCJuYW1lcyI6WyJleHRyYWN0IiwicmVnIiwic3BsaXRLZXkiLCJkYXRhIiwicmVkdWNlIiwia2V5cyIsInBpZWNlIiwic3BsaXQiLCJmb3JFYWNoIiwicHVzaCIsImEiLCJmaWx0ZXIiLCJmaWxlIiwidGhlbiIsImNvbnRlbnQiLCJkb2MiLCJodG1sIiwicHJvcGVydGllcyIsImVsSWQiLCJpZCIsImltYWdlcyIsInN0ZXBzIiwibmFtZSIsInRpdGxlIiwia2V5d29yZHMiLCJjYXRlZ29yeSIsInN1YmplY3QiLCJhYnN0cmFjdCIsImRlc2NyaXB0aW9uIiwib3RoZXJzIiwia25vd2xlZGdlIiwic3VtbWFyeSIsInByb3BzIiwicmV2b2tlIiwibm9kZXMiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJVUkwiLCJyZXZva2VPYmplY3RVUkwiLCJzcmMiLCJnZXRQaG90b3MiLCJtYXAiLCJ1cGxvYWQiLCJlbnRpdHkiLCJraW5kIiwiX25hbWUiLCJtb3JlIiwiX2lkIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJwYXJhbXMiLCJmaWVsZHMiLCJmZXRjaCIsImZpbGVzIiwicEltYWdlcyIsImltYWdlIiwiY3JjMzIiLCJ1bmRlZmluZWQiLCJrZXkiLCJ1cmwiLCJwUmF3RG9jeCIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFld0JBLE87O0FBZnhCOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLE1BQUksU0FBVjtBQUNBLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXVCO0FBQ3RCLFFBQUcsT0FBT0EsSUFBUCxJQUFjLFFBQWpCLEVBQ0NBLE9BQUssQ0FBQ0EsSUFBRCxDQUFMOztBQUVELFdBQU9BLEtBQUtDLE1BQUwsQ0FBWSxVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBYztBQUNoQ0EsY0FBTUMsS0FBTixDQUFZTixHQUFaLEVBQWlCTyxPQUFqQixDQUF5QjtBQUFBLG1CQUFHSCxLQUFLSSxJQUFMLENBQVVDLENBQVYsQ0FBSDtBQUFBLFNBQXpCO0FBQ0EsZUFBT0wsSUFBUDtBQUNBLEtBSE0sRUFHTCxFQUhLLEVBR0RNLE1BSEMsQ0FHTTtBQUFBLGVBQUcsQ0FBQyxDQUFDRCxDQUFMO0FBQUEsS0FITixDQUFQO0FBSUE7O0FBRWMsU0FBU1YsT0FBVCxDQUFpQlksSUFBakIsRUFBc0I7QUFDakMsV0FBTyxxQkFBTUEsSUFBTixFQUFZQyxJQUFaLENBQWlCLGVBQUs7QUFBQSxZQUNmQyxPQURlLEdBQzhCQyxHQUQ5QixDQUNwQkMsSUFEb0I7QUFBQSxZQUNOQyxVQURNLEdBQzhCRixHQUQ5QixDQUNORSxVQURNO0FBQUEsWUFDU0MsSUFEVCxHQUM4QkgsR0FEOUIsQ0FDTUksRUFETjtBQUFBLFlBQ2VDLE1BRGYsR0FDOEJMLEdBRDlCLENBQ2VLLE1BRGY7QUFBQSxZQUN1QkMsS0FEdkIsR0FDOEJOLEdBRDlCLENBQ3VCTSxLQUR2QjtBQUFBLFlBRXBCQyxJQUZvQixHQUVzREwsVUFGdEQsQ0FFcEJLLElBRm9CO0FBQUEsWUFFZkMsS0FGZSxHQUVzRE4sVUFGdEQsQ0FFZk0sS0FGZTtBQUFBLFlBRVJDLFFBRlEsR0FFc0RQLFVBRnRELENBRVJPLFFBRlE7QUFBQSxZQUVFQyxRQUZGLEdBRXNEUixVQUZ0RCxDQUVFUSxRQUZGO0FBQUEsWUFFWUMsT0FGWixHQUVzRFQsVUFGdEQsQ0FFWVMsT0FGWjtBQUFBLFlBRXFCQyxRQUZyQixHQUVzRFYsVUFGdEQsQ0FFcUJVLFFBRnJCO0FBQUEsWUFFOEJDLFdBRjlCLEdBRXNEWCxVQUZ0RCxDQUU4QlcsV0FGOUI7QUFBQSxZQUU4Q0MsTUFGOUMsMENBRXNEWixVQUZ0RDs7O0FBSS9CLFlBQUdPLFFBQUgsRUFDQ0EsV0FBU3RCLFNBQVNzQixRQUFULENBQVQ7O0FBRUQsWUFBR0MsUUFBSCxFQUNDQSxXQUFTdkIsU0FBU3VCLFFBQVQsQ0FBVDs7QUFFSyxlQUFPO0FBQ0hLLHVCQUFXO0FBQ1BoQixnQ0FETztBQUVQUyx1QkFBTUEsU0FBT0QsSUFGTjtBQUdQUyx5QkFBUUosWUFBVUMsV0FBVixJQUF1QkYsT0FIeEI7QUFJUEYsa0NBSk8sRUFJRUMsa0JBSkY7QUFLUE8sdUJBQU1ILE1BTEM7QUFNbkJSO0FBTm1CLGFBRFI7QUFTSFksa0JBVEcsb0JBU0s7QUFDSixvQkFBSUMsUUFBTUMsT0FBT0MsUUFBUCxDQUFnQkMsZ0JBQWhCLE9BQXFDbkIsSUFBckMsMEJBQVY7QUFDQW9CLHNCQUFNQyxTQUFOLENBQWdCL0IsT0FBaEIsQ0FBd0JnQyxJQUF4QixDQUE2Qk4sS0FBN0IsRUFBb0MsVUFBQ3hCLENBQUQ7QUFBQSwyQkFBSytCLElBQUlDLGVBQUosQ0FBb0JoQyxFQUFFaUMsR0FBdEIsQ0FBTDtBQUFBLGlCQUFwQztBQUNILGFBWkU7QUFhSEMscUJBYkcsdUJBYVE7QUFDUCx1QkFBT04sTUFBTUMsU0FBTixDQUFnQk0sR0FBaEIsQ0FBb0JMLElBQXBCLENBQXlCTCxPQUFPQyxRQUFQLENBQWdCQyxnQkFBaEIsT0FBcUNuQixJQUFyQyxVQUF6QixFQUEwRTtBQUFBLDJCQUFHUixFQUFFaUMsR0FBTDtBQUFBLGlCQUExRSxDQUFQO0FBQ0gsYUFmRTtBQWdCSEcsa0JBaEJHLGtCQWdCSUMsTUFoQkosRUFnQlc7QUFBQTs7QUFDVixvQkFBSUMsT0FBSyxvQkFBWUMsS0FBckI7QUFBQSxvQkFDSUMsT0FBSyxFQUFDSCxRQUFPLEVBQUNDLFVBQUQsRUFBTUcsS0FBSUosT0FBT0ksR0FBakIsRUFBUixFQURUO0FBRUEsdUJBQU8sc0JBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsMkJBQ2YsY0FBS0MsSUFBTCxDQUFVLEVBQUNDLFFBQU9MLElBQVIsRUFBYU0sUUFBTyxPQUFwQixFQUFWLEVBQXdDQyxLQUF4QyxDQUE4QyxVQUFDQyxLQUFELEVBQVM7QUFDbkQsNEJBQUlDLFVBQVF2QyxPQUFPeUIsR0FBUCxDQUFXLFVBQUNlLEtBQUQsRUFBUztBQUM1QixnQ0FBSXpELE9BQUt5RCxNQUFNekQsSUFBZjtBQUFBLGdDQUNJMEQsUUFBTTFELEtBQUswRCxLQURmO0FBRUEsZ0NBQUdILE1BQU1KLElBQU4sQ0FBVyxVQUFDNUMsQ0FBRDtBQUFBLHVDQUFLQSxFQUFFbUQsS0FBRixJQUFTQSxLQUFkO0FBQUEsNkJBQVgsQ0FBSCxFQUNJLE9BQU9DLFNBQVA7O0FBRUosbUNBQU8sY0FBS2hCLE1BQUwsQ0FBWTNDLElBQVosRUFBa0IsT0FBbEIsRUFBMkIsc0JBQWMsRUFBQzBELFlBQUQsRUFBT0UsS0FBSSxPQUFYLEVBQWQsRUFBa0NiLElBQWxDLENBQTNCLEVBQ0ZyQyxJQURFLENBQ0csVUFBQ21ELEdBQUQ7QUFBQSx1Q0FBT0osTUFBTXpELElBQU4sR0FBVzZELEdBQWxCO0FBQUEsNkJBREgsQ0FBUDtBQUVILHlCQVJXLEVBUVRyRCxNQVJTLENBUUYsVUFBQ0QsQ0FBRDtBQUFBLG1DQUFLQSxDQUFMO0FBQUEseUJBUkUsQ0FBWjs7QUFVQSw0QkFBSXVELFdBQVMsY0FBS25CLE1BQUwsQ0FBWWxDLElBQVosRUFBaUIsTUFBakIsRUFBeUIsc0JBQWMsRUFBQ21ELEtBQUksUUFBTCxFQUFkLEVBQTZCYixJQUE3QixDQUF6QixDQUFiOztBQUVBLDBDQUFRZ0IsR0FBUixFQUFhRCxRQUFiLDBDQUEwQk4sT0FBMUIsSUFDSzlDLElBREwsQ0FDVSxZQUFJO0FBQ0Z1QyxvQ0FBUSxNQUFLdEIsU0FBTCxDQUFlaEIsT0FBZixHQUF1QkMsSUFBSUMsSUFBbkM7QUFDSCx5QkFIVCxFQUdXcUMsTUFIWDtBQUlILHFCQWpCRCxDQURlO0FBQUEsaUJBQVosQ0FrQkQ7QUFsQkMsaUJBQVAsQ0FIVSxDQXNCVDtBQUNKO0FBdkNFLFNBQVA7QUF5Q0gsS0FuRE0sQ0FBUDtBQW9ESCIsImZpbGUiOiJleHRyYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSBcIi4uL2RiL2tub3dsZWRnZVwiXHJcbmltcG9ydCBwYXJzZSBmcm9tIFwiLi9wYXJzZVwiXHJcblxyXG5jb25zdCByZWc9L1stLFxccytdL1xyXG5mdW5jdGlvbiBzcGxpdEtleShkYXRhKXtcclxuXHRpZih0eXBlb2YoZGF0YSk9PSdzdHJpbmcnKVxyXG5cdFx0ZGF0YT1bZGF0YV1cclxuXHJcblx0cmV0dXJuIGRhdGEucmVkdWNlKChrZXlzLHBpZWNlKT0+e1xyXG5cdFx0cGllY2Uuc3BsaXQocmVnKS5mb3JFYWNoKGE9PmtleXMucHVzaChhKSlcclxuXHRcdHJldHVybiBrZXlzXHJcblx0fSxbXSkuZmlsdGVyKGE9PiEhYSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdChmaWxlKXtcclxuICAgIHJldHVybiBwYXJzZShmaWxlKS50aGVuKGRvYz0+e1xyXG4gICAgICAgIHZhciB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXMsIHN0ZXBzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcblx0XHRpZihrZXl3b3JkcylcclxuXHRcdFx0a2V5d29yZHM9c3BsaXRLZXkoa2V5d29yZHMpXHJcblxyXG5cdFx0aWYoY2F0ZWdvcnkpXHJcblx0XHRcdGNhdGVnb3J5PXNwbGl0S2V5KGNhdGVnb3J5KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnMsXHJcblx0XHRcdFx0c3RlcHNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ1tzcmN+PVwiYmxvYjpcIl1gKVxyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlcywgKGEpPT5VUkwucmV2b2tlT2JqZWN0VVJMKGEuc3JjKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0UGhvdG9zKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWdgKSxhPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIl19