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
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Task).apply(this, arguments));
    }

    (0, _createClass3.default)(Task, null, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixRQUFJLGFBQWEsSUFBSSxJQUFKLENBQVMsRUFBRSxPQUFGLEVBQVQsQ0FBYixDQURrQjtBQUV0QixlQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFGc0I7QUFHdEIsV0FBTyxVQUFQLENBSHNCO0NBQXhCOztJQU1xQjs7Ozs7Ozs7Ozs2QkFLTCxXQUFXLE9BQU07Z0JBQ3BCLE1BQThDLFVBQTlDLElBRG9CO2dCQUNoQixRQUEwQyxVQUExQyxNQURnQjtnQkFDVixXQUFvQyxVQUFwQyxTQURVO2dCQUNELFdBQTJCLFVBQTNCLFNBREM7Z0JBQ1EsUUFBa0IsVUFBbEIsTUFEUjtvQ0FDMEIsVUFBWCxPQURmO2dCQUNlLDJDQUFPLHVCQUR0Qjs7O0FBR3pCLG1CQUFPLEtBQUssTUFBTCxDQUFZO0FBQ3hCLDJCQUFVLEVBQUMsUUFBRCxFQUFLLFlBQUwsRUFBVyxrQkFBWCxFQUFvQixrQkFBcEIsRUFBOEIsWUFBOUIsRUFBVjtBQUNTLDJCQUFXLE9BQU8sQ0FBUCxDQUFYO0FBQ0EseUJBQVEsQ0FBUjtBQUNULHVCQUFNLGlCQUFPLGVBQVAsQ0FBdUIsR0FBdkIsRUFKTSxDQUFQLENBSHlCOzs7OytCQVVmLE1BQUs7QUFDZixpQkFBSyxVQUFMLEdBQWdCLElBQUksSUFBSixFQUFoQixDQURlO0FBRWYsaUJBQUssY0FBTCxHQUFvQixjQUFLLGVBQUwsQ0FGTDtBQUdmLGlCQUFLLE9BQUwsR0FBYSxJQUFiLENBSGU7QUFJZixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQVAsQ0FKZTs7Ozs0QkFkRDtBQUNkLG1CQUFPLE1BQVAsQ0FEYzs7O1dBREQiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSAncWlsaS1hcHAnO1xuaW1wb3J0IEZhbWlseSBmcm9tICcuL2ZhbWlseSc7XG5cbmZ1bmN0aW9uIGNsb25lQXNEYXRlKGQpIHtcbiAgbGV0IGNsb25lZERhdGUgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ3Rhc2snXG4gICAgfVxuXG4gICAgc3RhdGljIHBsYW4oa25vd2xlZGdlLCBkYXRlcyl7XG4gICAgICAgIGxldCB7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN0ZXBzLCBpbWFnZXM9W119PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSwgc3RlcHN9LFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBpbWFnZXNbMF0sXG4gICAgICAgICAgICBjdXJyZW50OjAsXG5cdFx0XHRjaGlsZDpGYW1pbHkuZ2V0Q3VycmVudENoaWxkLl9pZH0pXG4gICAgfVxuXHRcbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmZpbmlzaGVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cbn1cbiJdfQ==