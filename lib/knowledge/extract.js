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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rbm93bGVkZ2UvZXh0cmFjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWV3Qjs7QUFmeEI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxNQUFJLFNBQUo7QUFDTixTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBdUI7QUFDdEIsUUFBRyxPQUFPLElBQVAsSUFBYyxRQUFkLEVBQ0YsT0FBSyxDQUFDLElBQUQsQ0FBTCxDQUREOztBQUdBLFdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxJQUFELEVBQU0sS0FBTixFQUFjO0FBQ2hDLGNBQU0sS0FBTixDQUFZLEdBQVosRUFBaUIsT0FBakIsQ0FBeUI7bUJBQUcsS0FBSyxJQUFMLENBQVUsQ0FBVjtTQUFILENBQXpCLENBRGdDO0FBRWhDLGVBQU8sSUFBUCxDQUZnQztLQUFkLEVBR2pCLEVBSEssRUFHRCxNQUhDLENBR007ZUFBRyxDQUFDLENBQUMsQ0FBRDtLQUFKLENBSGIsQ0FKc0I7Q0FBdkI7O0FBVWUsU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXNCO0FBQ2pDLFdBQU8scUJBQU0sSUFBTixFQUFZLElBQVosQ0FBaUIsZUFBSztZQUNmLFVBQTZDLElBQWxEO1lBQWMsYUFBb0MsSUFBcEM7WUFBZSxPQUFxQixJQUF4QjtZQUFTLFNBQWUsSUFBZjtZQUFRLFFBQU8sSUFBUDtZQUMzQyxPQUEwRSxXQUExRTtZQUFLLFFBQXFFLFdBQXJFO1lBQU8sV0FBOEQsV0FBOUQ7WUFBVSxXQUFvRCxXQUFwRDtZQUFVLFVBQTBDLFdBQTFDO1lBQVMsV0FBaUMsV0FBakM7WUFBUyxjQUF3QixXQUF4QjtZQUFnQixnREFBUSw2RkFGdEQ7OztBQUkvQixZQUFHLFFBQUgsRUFDQyxXQUFTLFNBQVMsUUFBVCxDQUFULENBREQ7O0FBR0EsWUFBRyxRQUFILEVBQ0MsV0FBUyxTQUFTLFFBQVQsQ0FBVCxDQUREOztBQUdNLGVBQU87QUFDSCx1QkFBVztBQUNQLGdDQURPO0FBRVAsdUJBQU0sU0FBTyxJQUFQO0FBQ04seUJBQVEsWUFBVSxXQUFWLElBQXVCLE9BQXZCO0FBQ1Isa0NBSk8sRUFJRSxrQkFKRjtBQUtQLHVCQUFNLE1BQU47QUFDWiw0QkFObUI7YUFBWDtBQVFBLHNDQUFRO0FBQ0osb0JBQUksUUFBTSxPQUFPLFFBQVAsQ0FBZ0IsZ0JBQWhCLE9BQXFDLDZCQUFyQyxDQUFOLENBREE7QUFFSixzQkFBTSxTQUFOLENBQWdCLE9BQWhCLENBQXdCLElBQXhCLENBQTZCLEtBQTdCLEVBQW9DLFVBQUMsQ0FBRDsyQkFBSyxJQUFJLGVBQUosQ0FBb0IsRUFBRSxHQUFGO2lCQUF6QixDQUFwQyxDQUZJO2FBVEw7QUFhSCw0Q0FBVztBQUNQLHVCQUFPLE1BQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixJQUFwQixDQUF5QixPQUFPLFFBQVAsQ0FBZ0IsZ0JBQWhCLE9BQXFDLGFBQXJDLENBQXpCLEVBQTBFOzJCQUFHLEVBQUUsR0FBRjtpQkFBSCxDQUFqRixDQURPO2FBYlI7QUFnQkgsb0NBQU8sUUFBTzs7O0FBQ1Ysb0JBQUksT0FBSyxvQkFBWSxLQUFaO29CQUNMLE9BQUssRUFBQyxRQUFPLEVBQUMsVUFBRCxFQUFNLEtBQUksT0FBTyxHQUFQLEVBQWpCLEVBQU4sQ0FGTTtBQUdWLHVCQUFPLHNCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVY7MkJBQ2YsY0FBSyxJQUFMLENBQVUsRUFBQyxRQUFPLElBQVAsRUFBWSxRQUFPLE9BQVAsRUFBdkIsRUFBd0MsS0FBeEMsQ0FBOEMsaUJBQU87QUFDakQsNEJBQUksVUFBUSxPQUFPLEdBQVAsQ0FBVyxnQkFBZTtnQ0FBYjtnQ0FBSSxtQkFBUzs7QUFDbEMsZ0NBQUcsTUFBTSxJQUFOLENBQVcsVUFBQyxDQUFEO3VDQUFLLEVBQUUsS0FBRixJQUFTLEtBQVQ7NkJBQUwsQ0FBZCxFQUNJLE9BQU8sU0FBUCxDQURKOztBQUdBLG1DQUFPLGNBQUssTUFBTCxDQUFZLEdBQVosRUFBaUIsc0JBQWMsRUFBQyxZQUFELEVBQU8sS0FBSSxPQUFKLEVBQXJCLEVBQWtDLElBQWxDLENBQWpCLEVBQ0YsSUFERSxDQUNHLHFCQUFXO0FBQ3hDLHNDQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLE9BQXZCLENBQStCLEdBQS9CLEVBQW1DLE1BQU0sR0FBTixHQUFVLFNBQVYsQ0FBbkMsQ0FEd0M7QUFFeEMsdUNBQU8sUUFBUCxDQUFnQixhQUFoQixPQUFrQywyQkFBbEMsRUFBMEQsWUFBMUQsQ0FBdUUsS0FBdkUsRUFBNkUsU0FBN0UsRUFGd0M7NkJBQVgsQ0FEVixDQUprQzt5QkFBZixDQUFYLENBVVQsTUFWUyxDQVVGO21DQUFHLENBQUMsQ0FBQyxDQUFEO3lCQUFKLENBVk4sQ0FENkM7O0FBYWpELDRCQUFJLFdBQVMsY0FBSyxNQUFMLENBQVksSUFBWixFQUFrQixzQkFBYyxFQUFDLEtBQUksUUFBSixFQUFmLEVBQTZCLElBQTdCLENBQWxCLEVBQzdCLElBRDZCLENBQ3hCO21DQUFNLE1BQUssU0FBTCxDQUFlLFFBQWYsR0FBd0IsR0FBeEI7eUJBQU4sQ0FEZSxDQWI2Qzs7QUFnQmpELDBDQUFRLEdBQVIsRUFBYSxrREFBYSxTQUExQixFQUNLLElBREwsQ0FDVSxZQUFJO0FBQ0Ysb0NBQVEsTUFBSyxTQUFMLENBQVIsQ0FERTt5QkFBSixFQUVDLE1BSFgsRUFoQmlEO3FCQUFQO2lCQUQvQjtBQUFaLGlCQUFQO0FBSFUsYUFoQlg7U0FBUCxDQVZ5QjtLQUFMLENBQXhCLENBRGlDO0NBQXRCIiwiZmlsZSI6ImV4dHJhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbGV9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tIFwiLi4vZGIva25vd2xlZGdlXCJcclxuaW1wb3J0IHBhcnNlIGZyb20gXCIuL3BhcnNlXCJcclxuXHJcbmNvbnN0IHJlZz0vWy0sXFxzK10vXHJcbmZ1bmN0aW9uIHNwbGl0S2V5KGRhdGEpe1xyXG5cdGlmKHR5cGVvZihkYXRhKT09J3N0cmluZycpXHJcblx0XHRkYXRhPVtkYXRhXVxyXG5cclxuXHRyZXR1cm4gZGF0YS5yZWR1Y2UoKGtleXMscGllY2UpPT57XHJcblx0XHRwaWVjZS5zcGxpdChyZWcpLmZvckVhY2goYT0+a2V5cy5wdXNoKGEpKVxyXG5cdFx0cmV0dXJuIGtleXNcclxuXHR9LFtdKS5maWx0ZXIoYT0+ISFhKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0KGZpbGUpe1xyXG4gICAgcmV0dXJuIHBhcnNlKGZpbGUpLnRoZW4oZG9jPT57XHJcbiAgICAgICAgdmFyIHtodG1sOmNvbnRlbnQsIHByb3BlcnRpZXMsIGlkOmVsSWQsIGltYWdlcywgc3RlcHN9PWRvYyxcclxuICAgICAgICAgICAge25hbWUsdGl0bGUsIGtleXdvcmRzLCBjYXRlZ29yeSwgc3ViamVjdCwgYWJzdHJhY3QsZGVzY3JpcHRpb24sIC4uLm90aGVyc309cHJvcGVydGllc1xyXG5cclxuXHRcdGlmKGtleXdvcmRzKVxyXG5cdFx0XHRrZXl3b3Jkcz1zcGxpdEtleShrZXl3b3JkcylcclxuXHJcblx0XHRpZihjYXRlZ29yeSlcclxuXHRcdFx0Y2F0ZWdvcnk9c3BsaXRLZXkoY2F0ZWdvcnkpXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtub3dsZWRnZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOnRpdGxlfHxuYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTphYnN0cmFjdHx8ZGVzY3JpcHRpb258fHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyxjYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIHByb3BzOm90aGVycyxcclxuXHRcdFx0XHRzdGVwc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2UoKXtcclxuICAgICAgICAgICAgICAgIHZhciBub2Rlcz13aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7ZWxJZH0gaW1nW3NyY349XCJibG9iOlwiXWApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLGE9PmEuc3JjKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGxvYWQoZW50aXR5KXtcclxuICAgICAgICAgICAgICAgIHZhciBraW5kPWRiS25vd2xlZGdlLl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmU9e2VudGl0eTp7a2luZCxfaWQ6ZW50aXR5Ll9pZH19XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGUuZmluZCh7cGFyYW1zOm1vcmUsZmllbGRzOlwiY3JjMzJcIn0pLmZldGNoKGZpbGVzPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKHt1cmwsY3JjMzJ9KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZCh1cmwsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlbW90ZVVSTD0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmtub3dsZWRnZS5jb250ZW50LnJlcGxhY2UodXJsLGltYWdlLnVybD1yZW1vdGVVUkwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbElkfSBpbWdbc3Jjfj1cInVybFwiXWApLnNldEF0dHJpYnV0ZShcInNyY1wiLHJlbW90ZVVSTClcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKGE9PiEhYSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblx0XHRcdFx0XHRcdFx0LnRoZW4odXJsID0+dGhpcy5rbm93bGVkZ2UudGVtcGxhdGU9dXJsKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3BSYXdEb2N4LCAuLi5wSW1hZ2VzXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5rbm93bGVkZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLy9mZXRjaFxyXG4gICAgICAgICAgICAgICAgKS8vcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iXX0=