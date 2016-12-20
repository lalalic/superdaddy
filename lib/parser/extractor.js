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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZXh0cmFjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBZXdCOztBQWZ4Qjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLE1BQUksU0FBSjtBQUNOLFNBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF1QjtBQUN0QixRQUFHLE9BQU8sSUFBUCxJQUFjLFFBQWQsRUFDRixPQUFLLENBQUMsSUFBRCxDQUFMLENBREQ7O0FBR0EsV0FBTyxLQUFLLE1BQUwsQ0FBWSxVQUFDLElBQUQsRUFBTSxLQUFOLEVBQWM7QUFDaEMsY0FBTSxLQUFOLENBQVksR0FBWixFQUFpQixPQUFqQixDQUF5QjttQkFBRyxLQUFLLElBQUwsQ0FBVSxDQUFWO1NBQUgsQ0FBekIsQ0FEZ0M7QUFFaEMsZUFBTyxJQUFQLENBRmdDO0tBQWQsRUFHakIsRUFISyxFQUdELE1BSEMsQ0FHTTtlQUFHLENBQUMsQ0FBQyxDQUFEO0tBQUosQ0FIYixDQUpzQjtDQUF2Qjs7QUFVZSxTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBc0I7QUFDakMsV0FBTyxzQkFBTSxJQUFOLEVBQVksSUFBWixDQUFpQixlQUFLO1lBQ2YsVUFBNkMsSUFBbEQ7WUFBYyxhQUFvQyxJQUFwQztZQUFlLE9BQXFCLElBQXhCO1lBQVMsU0FBZSxJQUFmO1lBQVEsUUFBTyxJQUFQO1lBQzNDLE9BQTBFLFdBQTFFO1lBQUssUUFBcUUsV0FBckU7WUFBTyxXQUE4RCxXQUE5RDtZQUFVLFdBQW9ELFdBQXBEO1lBQVUsVUFBMEMsV0FBMUM7WUFBUyxXQUFpQyxXQUFqQztZQUFTLGNBQXdCLFdBQXhCO1lBQWdCLGdEQUFRLDZGQUZ0RDs7O0FBSS9CLFlBQUcsUUFBSCxFQUNDLFdBQVMsU0FBUyxRQUFULENBQVQsQ0FERDs7QUFHQSxZQUFHLFFBQUgsRUFDQyxXQUFTLFNBQVMsUUFBVCxDQUFULENBREQ7O0FBR00sZUFBTztBQUNILHVCQUFXO0FBQ1AsZ0NBRE87QUFFUCx1QkFBTSxTQUFPLElBQVA7QUFDTix5QkFBUSxZQUFVLFdBQVYsSUFBdUIsT0FBdkI7QUFDUixrQ0FKTyxFQUlFLGtCQUpGO0FBS1AsdUJBQU0sTUFBTjtBQUNaLDRCQU5tQjthQUFYO0FBUUEsc0NBQVE7QUFDSixvQkFBSSxRQUFNLE9BQU8sUUFBUCxDQUFnQixnQkFBaEIsT0FBcUMsd0JBQXJDLENBQU4sQ0FEQTtBQUVKLHNCQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEIsQ0FBNkIsS0FBN0IsRUFBb0MsVUFBQyxDQUFEOzJCQUFLLElBQUksZUFBSixDQUFvQixFQUFFLEdBQUY7aUJBQXpCLENBQXBDLENBRkk7YUFUTDtBQWFILDRDQUFXO0FBQ1AsdUJBQU8sTUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLElBQXBCLENBQXlCLE9BQU8sUUFBUCxDQUFnQixnQkFBaEIsT0FBcUMsYUFBckMsQ0FBekIsRUFBMEUsVUFBQyxDQUFEOzJCQUFLLEVBQUUsR0FBRjtpQkFBTCxDQUFqRixDQURPO2FBYlI7QUFnQkgsb0NBQU8sUUFBTzs7O0FBQ1Ysb0JBQUksT0FBSyxvQkFBWSxLQUFaO29CQUNMLE9BQUssRUFBQyxRQUFPLEVBQUMsVUFBRCxFQUFNLEtBQUksT0FBTyxHQUFQLEVBQWpCLEVBQU4sQ0FGTTtBQUdWLHVCQUFPLHNCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVY7MkJBQ2YsY0FBSyxJQUFMLENBQVUsRUFBQyxRQUFPLElBQVAsRUFBWSxRQUFPLE9BQVAsRUFBdkIsRUFBd0MsS0FBeEMsQ0FBOEMsVUFBQyxLQUFELEVBQVM7QUFDbkQsNEJBQUksVUFBUSxPQUFPLEdBQVAsQ0FBVyxVQUFDLEtBQUQsRUFBUztBQUM1QixnQ0FBSSxPQUFLLE1BQU0sSUFBTjtnQ0FDTCxRQUFNLEtBQUssS0FBTCxDQUZrQjtBQUc1QixnQ0FBRyxNQUFNLElBQU4sQ0FBVyxVQUFDLENBQUQ7dUNBQUssRUFBRSxLQUFGLElBQVMsS0FBVDs2QkFBTCxDQUFkLEVBQ0ksT0FBTyxTQUFQLENBREo7O0FBR0EsbUNBQU8sY0FBSyxNQUFMLENBQVksSUFBWixFQUFrQixPQUFsQixFQUEyQixzQkFBYyxFQUFDLFlBQUQsRUFBTyxLQUFJLE9BQUosRUFBckIsRUFBa0MsSUFBbEMsQ0FBM0IsRUFDRixJQURFLENBQ0csVUFBQyxHQUFEO3VDQUFPLE1BQU0sSUFBTixHQUFXLEdBQVg7NkJBQVAsQ0FEVixDQU40Qjt5QkFBVCxDQUFYLENBUVQsTUFSUyxDQVFGLFVBQUMsQ0FBRDttQ0FBSzt5QkFBTCxDQVJOLENBRCtDOztBQVduRCw0QkFBSSxXQUFTLGNBQUssTUFBTCxDQUFZLElBQVosRUFBaUIsTUFBakIsRUFBeUIsc0JBQWMsRUFBQyxLQUFJLFFBQUosRUFBZixFQUE2QixJQUE3QixDQUF6QixDQUFULENBWCtDOztBQWFuRCwwQ0FBUSxHQUFSLEVBQWEsa0RBQWEsU0FBMUIsRUFDSyxJQURMLENBQ1UsWUFBSTtBQUNGLG9DQUFRLE1BQUssU0FBTCxDQUFlLE9BQWYsR0FBdUIsSUFBSSxJQUFKLENBQS9CLENBREU7eUJBQUosRUFFQyxNQUhYLEVBYm1EO3FCQUFUO2lCQUQvQjtBQUFaLGlCQUFQO0FBSFUsYUFoQlg7U0FBUCxDQVZ5QjtLQUFMLENBQXhCLENBRGlDO0NBQXRCIiwiZmlsZSI6ImV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gXCIuLi9kYi9rbm93bGVkZ2VcIlxyXG5pbXBvcnQgcGFyc2UgZnJvbSBcIi4uL2tub3dsZWRnZS9wYXJzZXJcIlxyXG5cclxuY29uc3QgcmVnPS9bLSxcXHMrXS9cclxuZnVuY3Rpb24gc3BsaXRLZXkoZGF0YSl7XHJcblx0aWYodHlwZW9mKGRhdGEpPT0nc3RyaW5nJylcclxuXHRcdGRhdGE9W2RhdGFdXHJcblx0XHJcblx0cmV0dXJuIGRhdGEucmVkdWNlKChrZXlzLHBpZWNlKT0+e1xyXG5cdFx0cGllY2Uuc3BsaXQocmVnKS5mb3JFYWNoKGE9PmtleXMucHVzaChhKSlcclxuXHRcdHJldHVybiBrZXlzXHJcblx0fSxbXSkuZmlsdGVyKGE9PiEhYSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdChmaWxlKXtcclxuICAgIHJldHVybiBwYXJzZShmaWxlKS50aGVuKGRvYz0+e1xyXG4gICAgICAgIHZhciB7aHRtbDpjb250ZW50LCBwcm9wZXJ0aWVzLCBpZDplbElkLCBpbWFnZXMsIHN0ZXBzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcblx0XHRpZihrZXl3b3JkcylcclxuXHRcdFx0a2V5d29yZHM9c3BsaXRLZXkoa2V5d29yZHMpXHJcblxyXG5cdFx0aWYoY2F0ZWdvcnkpXHJcblx0XHRcdGNhdGVnb3J5PXNwbGl0S2V5KGNhdGVnb3J5KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrbm93bGVkZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZXx8bmFtZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6YWJzdHJhY3R8fGRlc2NyaXB0aW9ufHxzdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAga2V5d29yZHMsY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBwcm9wczpvdGhlcnMsXHJcblx0XHRcdFx0c3RlcHNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmV2b2tlKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXM9d2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZy5fX3Jldm9raW5nYClcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIChhKT0+VVJMLnJldm9rZU9iamVjdFVSTChhLnNyYykpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFBob3Rvcygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nYCksKGEpPT5hLnNyYylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkKGVudGl0eSl7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZD1kYktub3dsZWRnZS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIl19