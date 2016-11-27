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

var _finished = require('./finished');

var _finished2 = _interopRequireDefault(_finished);

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
			var getDate = function getDate(week, i) {};
			var finished = tasks.map(function (task) {
				var dones = task.dones;

				dones.forEach(function (i) {
					task.week = week;
					task.day = i;
					task.date = getDate(week, i);
				});

				task.knowledge = task._id;
				delete task._id;

				task.baby = child._id;
			});

			return _finished2.default.upsert(finished);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJ3ZWVrIiwidG9kb1dlZWsiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwiaSIsImZpbmlzaGVkIiwibWFwIiwiZG9uZXMiLCJ0YXNrIiwiZm9yRWFjaCIsImRheSIsImRhdGUiLCJrbm93bGVkZ2UiLCJfaWQiLCJiYWJ5IiwidXBzZXJ0IiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsS0FBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixZQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsUUFBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7OztrQ0FLR0MsSyxFQUFPQyxLLEVBQU07QUFBQSxPQUNuQkMsSUFEbUIsR0FDYkYsS0FEYSxDQUM1QkcsUUFENEI7O0FBRW5DLE9BQU1DLE9BQUssSUFBSVIsSUFBSixHQUFXUyxXQUFYLEVBQVg7QUFDQSxPQUFNQyxVQUFRLFNBQVJBLE9BQVEsQ0FBQ0osSUFBRCxFQUFNSyxDQUFOLEVBQVUsQ0FBRSxDQUExQjtBQUNBLE9BQUlDLFdBQVNQLE1BQU1RLEdBQU4sQ0FBVSxnQkFBTTtBQUFBLFFBQ3JCQyxLQURxQixHQUNkQyxJQURjLENBQ3JCRCxLQURxQjs7QUFFNUJBLFVBQU1FLE9BQU4sQ0FBYyxhQUFHO0FBQ2hCRCxVQUFLVCxJQUFMLEdBQVVBLElBQVY7QUFDQVMsVUFBS0UsR0FBTCxHQUFTTixDQUFUO0FBQ0FJLFVBQUtHLElBQUwsR0FBVVIsUUFBUUosSUFBUixFQUFhSyxDQUFiLENBQVY7QUFDQSxLQUpEOztBQU1BSSxTQUFLSSxTQUFMLEdBQWVKLEtBQUtLLEdBQXBCO0FBQ0EsV0FBT0wsS0FBS0ssR0FBWjs7QUFFQUwsU0FBS00sSUFBTCxHQUFVakIsTUFBTWdCLEdBQWhCO0FBQ0EsSUFaWSxDQUFiOztBQWNBLFVBQU8sbUJBQVNFLE1BQVQsQ0FBZ0JWLFFBQWhCLENBQVA7QUFDQTs7O3VCQUVjTyxTLEVBQVdJLEssRUFBTTtBQUFBLE9BQ3BCSCxHQURvQixHQUMwQkQsU0FEMUIsQ0FDcEJDLEdBRG9CO0FBQUEsT0FDaEJJLEtBRGdCLEdBQzBCTCxTQUQxQixDQUNoQkssS0FEZ0I7QUFBQSxPQUNWQyxRQURVLEdBQzBCTixTQUQxQixDQUNWTSxRQURVO0FBQUEsT0FDREMsUUFEQyxHQUMwQlAsU0FEMUIsQ0FDRE8sUUFEQztBQUFBLE9BQ1FDLEtBRFIsR0FDMEJSLFNBRDFCLENBQ1FRLEtBRFI7QUFBQSwyQkFDMEJSLFNBRDFCLENBQ2VTLE1BRGY7QUFBQSxPQUNlQSxNQURmLHFDQUNzQixFQUR0Qjs7O0FBR3pCLFVBQU8sS0FBS04sTUFBTCxDQUFZO0FBQ3hCSCxlQUFVLEVBQUNDLFFBQUQsRUFBS0ksWUFBTCxFQUFXQyxrQkFBWCxFQUFvQkMsa0JBQXBCLEVBQThCQyxZQUE5QixFQURjO0FBRWZFLGVBQVdELE9BQU8sQ0FBUCxDQUZJO0FBR2ZFLGFBQVEsQ0FITztBQUl4QjFCLFdBQU0saUJBQU8yQixlQUFQLENBQXVCWCxHQUpMLEVBQVosQ0FBUDtBQUtIOzs7eUJBRWFMLEksRUFBSztBQUNmQSxRQUFLaUIsVUFBTCxHQUFnQixJQUFJaEMsSUFBSixFQUFoQjtBQUNBZSxRQUFLa0IsY0FBTCxHQUFvQixjQUFLQyxlQUF6QjtBQUNBbkIsUUFBS2UsT0FBTCxHQUFhLElBQWI7QUFDQSxVQUFPLEtBQUtSLE1BQUwsQ0FBWVAsSUFBWixDQUFQO0FBQ0g7OztzQkF4Q2lCO0FBQ2QsVUFBTyxNQUFQO0FBQ0g7Ozs7O2tCQUhnQlosSSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXG5pbXBvcnQgRmluaXNoZWQgZnJvbSBcIi4vZmluaXNoZWRcIlxuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuXHRzdGF0aWMgZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCB0YXNrcyl7XG5cdFx0Y29uc3Qge3RvZG9XZWVrOndlZWt9PWNoaWxkXG5cdFx0Y29uc3QgeWVhcj1uZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcblx0XHRjb25zdCBnZXREYXRlPSh3ZWVrLGkpPT57fVxuXHRcdGxldCBmaW5pc2hlZD10YXNrcy5tYXAodGFzaz0+e1xuXHRcdFx0Y29uc3Qge2RvbmVzfT10YXNrXG5cdFx0XHRkb25lcy5mb3JFYWNoKGk9Pntcblx0XHRcdFx0dGFzay53ZWVrPXdlZWtcblx0XHRcdFx0dGFzay5kYXk9aVxuXHRcdFx0XHR0YXNrLmRhdGU9Z2V0RGF0ZSh3ZWVrLGkpXG5cdFx0XHR9KVxuXG5cdFx0XHR0YXNrLmtub3dsZWRnZT10YXNrLl9pZFxuXHRcdFx0ZGVsZXRlIHRhc2suX2lkXG5cblx0XHRcdHRhc2suYmFieT1jaGlsZC5faWRcblx0XHR9KVxuXG5cdFx0cmV0dXJuIEZpbmlzaGVkLnVwc2VydChmaW5pc2hlZClcblx0fVxuXG4gICAgc3RhdGljIHBsYW4oa25vd2xlZGdlLCBkYXRlcyl7XG4gICAgICAgIGxldCB7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN0ZXBzLCBpbWFnZXM9W119PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSwgc3RlcHN9LFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBpbWFnZXNbMF0sXG4gICAgICAgICAgICBjdXJyZW50OjAsXG5cdFx0XHRjaGlsZDpGYW1pbHkuZ2V0Q3VycmVudENoaWxkLl9pZH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG59XG4iXX0=