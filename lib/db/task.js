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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixRQUFJLGFBQWEsSUFBSSxJQUFKLENBQVMsRUFBRSxPQUFGLEVBQVQsQ0FBYixDQURrQjtBQUV0QixlQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFGc0I7QUFHdEIsV0FBTyxVQUFQLENBSHNCO0NBQXhCOztJQU1xQjs7Ozs7Ozs7Ozs2QkFLTCxXQUFXLE9BQU07Z0JBQ3BCLE1BQThDLFVBQTlDO2dCQUFJLFFBQTBDLFVBQTFDO2dCQUFNLFdBQW9DLFVBQXBDO2dCQUFTLFdBQTJCLFVBQTNCO2dCQUFTLFFBQWtCLFVBQWxCO29DQUFrQixVQUFYOzJEQUFPLHVCQUR0Qjs7O0FBR3pCLG1CQUFPLEtBQUssTUFBTCxDQUFZO0FBQ3hCLDJCQUFVLEVBQUMsUUFBRCxFQUFLLFlBQUwsRUFBVyxrQkFBWCxFQUFvQixrQkFBcEIsRUFBOEIsWUFBOUIsRUFBVjtBQUNTLDJCQUFXLE9BQU8sQ0FBUCxDQUFYO0FBQ0EseUJBQVEsQ0FBUjtBQUNULHVCQUFNLGlCQUFPLGVBQVAsQ0FBdUIsR0FBdkIsRUFKTSxDQUFQLENBSHlCOzs7OytCQVVmLE1BQUs7QUFDZixpQkFBSyxVQUFMLEdBQWdCLElBQUksSUFBSixFQUFoQixDQURlO0FBRWYsaUJBQUssY0FBTCxHQUFvQixjQUFLLGVBQUwsQ0FGTDtBQUdmLGlCQUFLLE9BQUwsR0FBYSxJQUFiLENBSGU7QUFJZixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQVAsQ0FKZTs7Ozs0QkFkRDtBQUNkLG1CQUFPLE1BQVAsQ0FEYzs7Ozs7O2tCQUREIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJztcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknO1xuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFuKGtub3dsZWRnZSwgZGF0ZXMpe1xuICAgICAgICBsZXQge19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdGVwcywgaW1hZ2VzPVtdfT1rbm93bGVkZ2VcblxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQoe1xuXHRcdFx0a25vd2xlZGdlOntfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksIHN0ZXBzfSxcbiAgICAgICAgICAgIHRodW1ibmFpbDogaW1hZ2VzWzBdLFxuICAgICAgICAgICAgY3VycmVudDowLFxuXHRcdFx0Y2hpbGQ6RmFtaWx5LmdldEN1cnJlbnRDaGlsZC5faWR9KVxuICAgIH1cblx0XG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG59XG4iXX0=