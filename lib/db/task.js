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
			/**@TODO: get date from week+day*/
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
				return task;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJ3ZWVrIiwidG9kb1dlZWsiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwiaSIsImZpbmlzaGVkIiwibWFwIiwiZG9uZXMiLCJ0YXNrIiwiZm9yRWFjaCIsImRheSIsImRhdGUiLCJrbm93bGVkZ2UiLCJfaWQiLCJiYWJ5IiwidXBzZXJ0IiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsS0FBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixZQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsUUFBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7OztrQ0FLR0MsSyxFQUFPQyxLLEVBQU07QUFBQSxPQUNuQkMsSUFEbUIsR0FDYkYsS0FEYSxDQUM1QkcsUUFENEI7O0FBRW5DLE9BQU1DLE9BQUssSUFBSVIsSUFBSixHQUFXUyxXQUFYLEVBQVg7QUFDQTtBQUNBLE9BQU1DLFVBQVEsU0FBUkEsT0FBUSxDQUFDSixJQUFELEVBQU1LLENBQU4sRUFBVSxDQUFFLENBQTFCO0FBQ0EsT0FBSUMsV0FBU1AsTUFBTVEsR0FBTixDQUFVLGdCQUFNO0FBQUEsUUFDckJDLEtBRHFCLEdBQ2RDLElBRGMsQ0FDckJELEtBRHFCOztBQUU1QkEsVUFBTUUsT0FBTixDQUFjLGFBQUc7QUFDaEJELFVBQUtULElBQUwsR0FBVUEsSUFBVjtBQUNBUyxVQUFLRSxHQUFMLEdBQVNOLENBQVQ7QUFDQUksVUFBS0csSUFBTCxHQUFVUixRQUFRSixJQUFSLEVBQWFLLENBQWIsQ0FBVjtBQUNBLEtBSkQ7O0FBTUFJLFNBQUtJLFNBQUwsR0FBZUosS0FBS0ssR0FBcEI7QUFDQSxXQUFPTCxLQUFLSyxHQUFaOztBQUVBTCxTQUFLTSxJQUFMLEdBQVVqQixNQUFNZ0IsR0FBaEI7QUFDQSxXQUFPTCxJQUFQO0FBQ0EsSUFiWSxDQUFiOztBQWVBLFVBQU8sbUJBQVNPLE1BQVQsQ0FBZ0JWLFFBQWhCLENBQVA7QUFDQTs7O3VCQUVjTyxTLEVBQVdJLEssRUFBTTtBQUFBLE9BQ3BCSCxHQURvQixHQUMwQkQsU0FEMUIsQ0FDcEJDLEdBRG9CO0FBQUEsT0FDaEJJLEtBRGdCLEdBQzBCTCxTQUQxQixDQUNoQkssS0FEZ0I7QUFBQSxPQUNWQyxRQURVLEdBQzBCTixTQUQxQixDQUNWTSxRQURVO0FBQUEsT0FDREMsUUFEQyxHQUMwQlAsU0FEMUIsQ0FDRE8sUUFEQztBQUFBLE9BQ1FDLEtBRFIsR0FDMEJSLFNBRDFCLENBQ1FRLEtBRFI7QUFBQSwyQkFDMEJSLFNBRDFCLENBQ2VTLE1BRGY7QUFBQSxPQUNlQSxNQURmLHFDQUNzQixFQUR0Qjs7O0FBR3pCLFVBQU8sS0FBS04sTUFBTCxDQUFZO0FBQ3hCSCxlQUFVLEVBQUNDLFFBQUQsRUFBS0ksWUFBTCxFQUFXQyxrQkFBWCxFQUFvQkMsa0JBQXBCLEVBQThCQyxZQUE5QixFQURjO0FBRWZFLGVBQVdELE9BQU8sQ0FBUCxDQUZJO0FBR2ZFLGFBQVEsQ0FITztBQUl4QjFCLFdBQU0saUJBQU8yQixlQUFQLENBQXVCWCxHQUpMLEVBQVosQ0FBUDtBQUtIOzs7eUJBRWFMLEksRUFBSztBQUNmQSxRQUFLaUIsVUFBTCxHQUFnQixJQUFJaEMsSUFBSixFQUFoQjtBQUNBZSxRQUFLa0IsY0FBTCxHQUFvQixjQUFLQyxlQUF6QjtBQUNBbkIsUUFBS2UsT0FBTCxHQUFhLElBQWI7QUFDQSxVQUFPLEtBQUtSLE1BQUwsQ0FBWVAsSUFBWixDQUFQO0FBQ0g7OztzQkExQ2lCO0FBQ2QsVUFBTyxNQUFQO0FBQ0g7Ozs7O2tCQUhnQlosSSIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXG5pbXBvcnQgRmluaXNoZWQgZnJvbSBcIi4vZmluaXNoZWRcIlxuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuXHRzdGF0aWMgZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCB0YXNrcyl7XG5cdFx0Y29uc3Qge3RvZG9XZWVrOndlZWt9PWNoaWxkXG5cdFx0Y29uc3QgeWVhcj1uZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcblx0XHQvKipAVE9ETzogZ2V0IGRhdGUgZnJvbSB3ZWVrK2RheSovXG5cdFx0Y29uc3QgZ2V0RGF0ZT0od2VlayxpKT0+e31cblx0XHRsZXQgZmluaXNoZWQ9dGFza3MubWFwKHRhc2s9Pntcblx0XHRcdGNvbnN0IHtkb25lc309dGFza1xuXHRcdFx0ZG9uZXMuZm9yRWFjaChpPT57XG5cdFx0XHRcdHRhc2sud2Vlaz13ZWVrXG5cdFx0XHRcdHRhc2suZGF5PWlcblx0XHRcdFx0dGFzay5kYXRlPWdldERhdGUod2VlayxpKVxuXHRcdFx0fSlcblxuXHRcdFx0dGFzay5rbm93bGVkZ2U9dGFzay5faWRcblx0XHRcdGRlbGV0ZSB0YXNrLl9pZFxuXG5cdFx0XHR0YXNrLmJhYnk9Y2hpbGQuX2lkXG5cdFx0XHRyZXR1cm4gdGFza1xuXHRcdH0pXG5cblx0XHRyZXR1cm4gRmluaXNoZWQudXBzZXJ0KGZpbmlzaGVkKVxuXHR9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6MCxcblx0XHRcdGNoaWxkOkZhbWlseS5nZXRDdXJyZW50Q2hpbGQuX2lkfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmZpbmlzaGVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cbn1cbiJdfQ==