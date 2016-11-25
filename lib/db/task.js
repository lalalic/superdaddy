'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
    key: 'finishWeekTasks',
    value: function finishWeekTasks(child, tasks) {
      var week = child.todoWeek;

      var year = new Date().getFullYear();
      tasks.map(function (task) {
        var dones = task.dones;

        dones.forEach(function (i) {
          task.week = week;
          task.day = i;
        });
      });
      return _promise2.default.resolve();
    }
  }, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0I7QUFDdEIsTUFBSSxhQUFhLElBQUksSUFBSixDQUFTLEVBQUUsT0FBRixFQUFULENBQWIsQ0FEa0I7QUFFdEIsYUFBVyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCLEVBRnNCO0FBR3RCLFNBQU8sVUFBUCxDQUhzQjtDQUF4Qjs7SUFNcUI7Ozs7Ozs7Ozs7b0NBS0csT0FBTyxPQUFNO1VBQ25CLE9BQU0sTUFBZixTQUQ0Qjs7QUFFbkMsVUFBTSxPQUFLLElBQUksSUFBSixHQUFXLFdBQVgsRUFBTCxDQUY2QjtBQUduQyxZQUFNLEdBQU4sQ0FBVSxnQkFBTTtZQUNSLFFBQU8sS0FBUCxNQURROztBQUVmLGNBQU0sT0FBTixDQUFjLGFBQUc7QUFDaEIsZUFBSyxJQUFMLEdBQVUsSUFBVixDQURnQjtBQUVoQixlQUFLLEdBQUwsR0FBUyxDQUFULENBRmdCO1NBQUgsQ0FBZCxDQUZlO09BQU4sQ0FBVixDQUhtQztBQVVuQyxhQUFPLGtCQUFRLE9BQVIsRUFBUCxDQVZtQzs7Ozt5QkFhckIsV0FBVyxPQUFNO1VBQ3BCLE1BQThDLFVBQTlDO1VBQUksUUFBMEMsVUFBMUM7VUFBTSxXQUFvQyxVQUFwQztVQUFTLFdBQTJCLFVBQTNCO1VBQVMsUUFBa0IsVUFBbEI7OEJBQWtCLFVBQVg7cURBQU8sdUJBRHRCOzs7QUFHekIsYUFBTyxLQUFLLE1BQUwsQ0FBWTtBQUN4QixtQkFBVSxFQUFDLFFBQUQsRUFBSyxZQUFMLEVBQVcsa0JBQVgsRUFBb0Isa0JBQXBCLEVBQThCLFlBQTlCLEVBQVY7QUFDUyxtQkFBVyxPQUFPLENBQVAsQ0FBWDtBQUNBLGlCQUFRLENBQVI7QUFDVCxlQUFNLGlCQUFPLGVBQVAsQ0FBdUIsR0FBdkIsRUFKTSxDQUFQLENBSHlCOzs7OzJCQVVmLE1BQUs7QUFDZixXQUFLLFVBQUwsR0FBZ0IsSUFBSSxJQUFKLEVBQWhCLENBRGU7QUFFZixXQUFLLGNBQUwsR0FBb0IsY0FBSyxlQUFMLENBRkw7QUFHZixXQUFLLE9BQUwsR0FBYSxJQUFiLENBSGU7QUFJZixhQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBUCxDQUplOzs7O3dCQTNCRDtBQUNkLGFBQU8sTUFBUCxDQURjOzs7Ozs7a0JBREQiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSAncWlsaS1hcHAnO1xuaW1wb3J0IEZhbWlseSBmcm9tICcuL2ZhbWlseSc7XG5cbmZ1bmN0aW9uIGNsb25lQXNEYXRlKGQpIHtcbiAgbGV0IGNsb25lZERhdGUgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ3Rhc2snXG4gICAgfVxuXHRcblx0c3RhdGljIGZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgdGFza3Mpe1xuXHRcdGNvbnN0IHt0b2RvV2Vlazp3ZWVrfT1jaGlsZFxuXHRcdGNvbnN0IHllYXI9bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXG5cdFx0dGFza3MubWFwKHRhc2s9Pntcblx0XHRcdGNvbnN0IHtkb25lc309dGFza1xuXHRcdFx0ZG9uZXMuZm9yRWFjaChpPT57XG5cdFx0XHRcdHRhc2sud2Vlaz13ZWVrXG5cdFx0XHRcdHRhc2suZGF5PWlcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0fVxuXG4gICAgc3RhdGljIHBsYW4oa25vd2xlZGdlLCBkYXRlcyl7XG4gICAgICAgIGxldCB7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN0ZXBzLCBpbWFnZXM9W119PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSwgc3RlcHN9LFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBpbWFnZXNbMF0sXG4gICAgICAgICAgICBjdXJyZW50OjAsXG5cdFx0XHRjaGlsZDpGYW1pbHkuZ2V0Q3VycmVudENoaWxkLl9pZH0pXG4gICAgfVxuXHRcbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmZpbmlzaGVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cbn1cbiJdfQ==