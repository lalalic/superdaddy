'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _qiliApp = require('qili-app');

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneAsDate(d) {
    var clonedDate = new Date(d.getTime());
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
}

var Task = function (_Model) {
    (0, _inherits3.default)(Task, _Model);

    function Task() {
        (0, _classCallCheck3.default)(this, Task);
        return (0, _possibleConstructorReturn3.default)(this, (Task.__proto__ || (0, _getPrototypeOf2.default)(Task)).apply(this, arguments));
    }

    (0, _createClass3.default)(Task, null, [{
        key: 'plan',
        value: function plan(knowledge, dates) {
            var _id = knowledge._id,
                title = knowledge.title,
                keywords = knowledge.keywords,
                category = knowledge.category,
                steps = knowledge.steps,
                _knowledge$images = knowledge.images,
                images = _knowledge$images === undefined ? [] : _knowledge$images;


            return this.upsert({
                knowledge: { _id: _id, title: title, keywords: keywords, category: category, steps: steps },
                thumbnail: images[0],
                current: 0,
                child: _family2.default.getCurrentChild._id });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImtub3dsZWRnZSIsImRhdGVzIiwiX2lkIiwidGl0bGUiLCJrZXl3b3JkcyIsImNhdGVnb3J5Iiwic3RlcHMiLCJpbWFnZXMiLCJ1cHNlcnQiLCJ0aHVtYm5haWwiLCJjdXJyZW50IiwiY2hpbGQiLCJnZXRDdXJyZW50Q2hpbGQiLCJ0YXNrIiwiZmluaXNoZWRBdCIsImZpbmlzaGVkQXV0aG9yIiwiY3VycmVudEFzQXV0aG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxXQUFULENBQXFCQyxDQUFyQixFQUF3QjtBQUN0QixRQUFJQyxhQUFhLElBQUlDLElBQUosQ0FBU0YsRUFBRUcsT0FBRixFQUFULENBQWpCO0FBQ0FGLGVBQVdHLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUI7QUFDQSxXQUFPSCxVQUFQO0FBQ0Q7O0lBRW9CSSxJOzs7Ozs7Ozs7OzZCQUtMQyxTLEVBQVdDLEssRUFBTTtBQUFBLGdCQUNwQkMsR0FEb0IsR0FDMEJGLFNBRDFCLENBQ3BCRSxHQURvQjtBQUFBLGdCQUNoQkMsS0FEZ0IsR0FDMEJILFNBRDFCLENBQ2hCRyxLQURnQjtBQUFBLGdCQUNWQyxRQURVLEdBQzBCSixTQUQxQixDQUNWSSxRQURVO0FBQUEsZ0JBQ0RDLFFBREMsR0FDMEJMLFNBRDFCLENBQ0RLLFFBREM7QUFBQSxnQkFDUUMsS0FEUixHQUMwQk4sU0FEMUIsQ0FDUU0sS0FEUjtBQUFBLG9DQUMwQk4sU0FEMUIsQ0FDZU8sTUFEZjtBQUFBLGdCQUNlQSxNQURmLHFDQUNzQixFQUR0Qjs7O0FBR3pCLG1CQUFPLEtBQUtDLE1BQUwsQ0FBWTtBQUN4QlIsMkJBQVUsRUFBQ0UsUUFBRCxFQUFLQyxZQUFMLEVBQVdDLGtCQUFYLEVBQW9CQyxrQkFBcEIsRUFBOEJDLFlBQTlCLEVBRGM7QUFFZkcsMkJBQVdGLE9BQU8sQ0FBUCxDQUZJO0FBR2ZHLHlCQUFRLENBSE87QUFJeEJDLHVCQUFNLGlCQUFPQyxlQUFQLENBQXVCVixHQUpMLEVBQVosQ0FBUDtBQUtIOzs7K0JBRWFXLEksRUFBSztBQUNmQSxpQkFBS0MsVUFBTCxHQUFnQixJQUFJbEIsSUFBSixFQUFoQjtBQUNBaUIsaUJBQUtFLGNBQUwsR0FBb0IsY0FBS0MsZUFBekI7QUFDQUgsaUJBQUtILE9BQUwsR0FBYSxJQUFiO0FBQ0EsbUJBQU8sS0FBS0YsTUFBTCxDQUFZSyxJQUFaLENBQVA7QUFDSDs7OzRCQW5CaUI7QUFDZCxtQkFBTyxNQUFQO0FBQ0g7Ozs7O2tCQUhnQmQsSSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCc7XG5pbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5JztcblxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xuICBsZXQgY2xvbmVkRGF0ZSA9IG5ldyBEYXRlKGQuZ2V0VGltZSgpKTtcbiAgY2xvbmVkRGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgcmV0dXJuIGNsb25lZERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAndGFzaydcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6MCxcblx0XHRcdGNoaWxkOkZhbWlseS5nZXRDdXJyZW50Q2hpbGQuX2lkfSlcbiAgICB9XG5cdFxuICAgIHN0YXRpYyBmaW5pc2godGFzayl7XG4gICAgICAgIHRhc2suZmluaXNoZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suZmluaXNoZWRBdXRob3I9VXNlci5jdXJyZW50QXNBdXRob3JcbiAgICAgICAgdGFzay5jdXJyZW50PTEwMDBcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxufVxuIl19