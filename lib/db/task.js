'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cloneAsDate(d) {
    var clonedDate = new Date(d.getTime());
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
}

var Task = function (_Model) {
    _inherits(Task, _Model);

    function Task() {
        _classCallCheck(this, Task);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Task).apply(this, arguments));
    }

    _createClass(Task, null, [{
        key: 'plan',
        value: function plan(knowledge, dates) {
            var _id = knowledge._id;
            var title = knowledge.title;
            var keywords = knowledge.keywords;
            var category = knowledge.category;
            var steps = knowledge.steps;
            var _knowledge$images = knowledge.images;
            var images = _knowledge$images === undefined ? [] : _knowledge$images;


            return this.upsert({
                knowledge: { _id: _id, title: title, keywords: keywords, category: category, steps: steps },
                thumbnail: images[0],
                current: 0,
                child: _family2.default.currentChild._id });
        }
    }, {
        key: 'finish',
        value: function finish(task) {
            task.finishedAt = new Date();
            task.finishedAuthor = _qiliApp.User.currentAsAuthor;
            task.current = 1000;
            return this.upsert(task);
        }
    }, {
        key: '_name',
        get: function get() {
            return 'task';
        }
    }]);

    return Task;
}(_qiliApp.Model);

exports.default = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixRQUFJLGFBQWEsSUFBSSxJQUFKLENBQVMsRUFBRSxPQUFGLEVBQVQsQ0FBYixDQURrQjtBQUV0QixlQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFGc0I7QUFHdEIsV0FBTyxVQUFQLENBSHNCO0NBQXhCOztJQU1xQjs7Ozs7Ozs7Ozs7NkJBS0wsV0FBVyxPQUFNO2dCQUNwQixNQUE4QyxVQUE5QyxJQURvQjtnQkFDaEIsUUFBMEMsVUFBMUMsTUFEZ0I7Z0JBQ1YsV0FBb0MsVUFBcEMsU0FEVTtnQkFDRCxXQUEyQixVQUEzQixTQURDO2dCQUNRLFFBQWtCLFVBQWxCLE1BRFI7b0NBQzBCLFVBQVgsT0FEZjtnQkFDZSwyQ0FBTyx1QkFEdEI7OztBQUd6QixtQkFBTyxLQUFLLE1BQUwsQ0FBWTtBQUN4QiwyQkFBVSxFQUFDLFFBQUQsRUFBSyxZQUFMLEVBQVcsa0JBQVgsRUFBb0Isa0JBQXBCLEVBQThCLFlBQTlCLEVBQVY7QUFDUywyQkFBVyxPQUFPLENBQVAsQ0FBWDtBQUNBLHlCQUFRLENBQVI7QUFDVCx1QkFBTSxpQkFBTyxZQUFQLENBQW9CLEdBQXBCLEVBSk0sQ0FBUCxDQUh5Qjs7OzsrQkFVZixNQUFLO0FBQ2YsaUJBQUssVUFBTCxHQUFnQixJQUFJLElBQUosRUFBaEIsQ0FEZTtBQUVmLGlCQUFLLGNBQUwsR0FBb0IsY0FBSyxlQUFMLENBRkw7QUFHZixpQkFBSyxPQUFMLEdBQWEsSUFBYixDQUhlO0FBSWYsbUJBQU8sS0FBSyxNQUFMLENBQVksSUFBWixDQUFQLENBSmU7Ozs7NEJBZEQ7QUFDZCxtQkFBTyxNQUFQLENBRGM7Ozs7V0FERCIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCc7XG5pbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5JztcblxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xuICBsZXQgY2xvbmVkRGF0ZSA9IG5ldyBEYXRlKGQuZ2V0VGltZSgpKTtcbiAgY2xvbmVkRGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgcmV0dXJuIGNsb25lZERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAndGFzaydcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6MCxcblx0XHRcdGNoaWxkOkZhbWlseS5jdXJyZW50Q2hpbGQuX2lkfSlcbiAgICB9XG5cdFxuICAgIHN0YXRpYyBmaW5pc2godGFzayl7XG4gICAgICAgIHRhc2suZmluaXNoZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suZmluaXNoZWRBdXRob3I9VXNlci5jdXJyZW50QXNBdXRob3JcbiAgICAgICAgdGFzay5jdXJyZW50PTEwMDBcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxufVxuIl19