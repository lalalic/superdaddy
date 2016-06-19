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


            return this.upsert({
                knowledge: { _id: _id, title: title, keywords: keywords, category: category, steps: steps },
                steps: steps.length,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixRQUFJLGFBQWEsSUFBSSxJQUFKLENBQVMsRUFBRSxPQUFGLEVBQVQsQ0FBYixDQURrQjtBQUV0QixlQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFGc0I7QUFHdEIsV0FBTyxVQUFQLENBSHNCO0NBQXhCOztJQU1xQjs7Ozs7Ozs7Ozs7NkJBS0wsV0FBVyxPQUFNO2dCQUNwQixNQUFtQyxVQUFuQyxJQURvQjtnQkFDaEIsUUFBK0IsVUFBL0IsTUFEZ0I7Z0JBQ1YsV0FBeUIsVUFBekIsU0FEVTtnQkFDRCxXQUFnQixVQUFoQixTQURDO2dCQUNRLFFBQU8sVUFBUCxNQURSOzs7QUFHekIsbUJBQU8sS0FBSyxNQUFMLENBQVk7QUFDeEIsMkJBQVUsRUFBQyxRQUFELEVBQUssWUFBTCxFQUFXLGtCQUFYLEVBQW9CLGtCQUFwQixFQUE4QixZQUE5QixFQUFWO0FBQ1MsdUJBQU0sTUFBTSxNQUFOO0FBQ04seUJBQVEsQ0FBUjtBQUNULHVCQUFNLGlCQUFPLFlBQVAsQ0FBb0IsR0FBcEIsRUFKTSxDQUFQLENBSHlCOzs7OytCQVVmLE1BQUs7QUFDZixpQkFBSyxVQUFMLEdBQWdCLElBQUksSUFBSixFQUFoQixDQURlO0FBRWYsaUJBQUssY0FBTCxHQUFvQixjQUFLLGVBQUwsQ0FGTDtBQUdmLGlCQUFLLE9BQUwsR0FBYSxJQUFiLENBSGU7QUFJZixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQVAsQ0FKZTs7Ozs0QkFkRDtBQUNkLG1CQUFPLE1BQVAsQ0FEYzs7OztXQUREIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJztcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknO1xuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFuKGtub3dsZWRnZSwgZGF0ZXMpe1xuICAgICAgICBsZXQge19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdGVwc309a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICBzdGVwczpzdGVwcy5sZW5ndGgsXG4gICAgICAgICAgICBjdXJyZW50OjAsXG5cdFx0XHRjaGlsZDpGYW1pbHkuY3VycmVudENoaWxkLl9pZH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG59XG4iXX0=