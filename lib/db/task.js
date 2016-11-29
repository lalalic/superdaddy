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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCO0FBQ3RCLEtBQUksYUFBYSxJQUFJLElBQUosQ0FBUyxFQUFFLE9BQUYsRUFBVCxDQUFiLENBRGtCO0FBRXRCLFlBQVcsUUFBWCxDQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QixFQUEwQixDQUExQixFQUZzQjtBQUd0QixRQUFPLFVBQVAsQ0FIc0I7Q0FBeEI7O0lBTXFCOzs7Ozs7Ozs7O2tDQUtHLE9BQU8sT0FBTTtPQUNuQixPQUFNLE1BQWYsU0FENEI7O0FBRW5DLE9BQU0sT0FBSyxJQUFJLElBQUosR0FBVyxXQUFYLEVBQUw7O0FBRjZCLE9BSTdCLFVBQVEsU0FBUixPQUFRLENBQUMsSUFBRCxFQUFNLENBQU4sRUFBVSxFQUFWLENBSnFCO0FBS25DLE9BQUksV0FBUyxNQUFNLEdBQU4sQ0FBVSxnQkFBTTtRQUNyQixRQUFPLEtBQVAsTUFEcUI7O0FBRTVCLFVBQU0sT0FBTixDQUFjLGFBQUc7QUFDaEIsVUFBSyxJQUFMLEdBQVUsSUFBVixDQURnQjtBQUVoQixVQUFLLEdBQUwsR0FBUyxDQUFULENBRmdCO0FBR2hCLFVBQUssSUFBTCxHQUFVLFFBQVEsSUFBUixFQUFhLENBQWIsQ0FBVixDQUhnQjtLQUFILENBQWQsQ0FGNEI7O0FBUTVCLFNBQUssU0FBTCxHQUFlLEtBQUssR0FBTCxDQVJhO0FBUzVCLFdBQU8sS0FBSyxHQUFMLENBVHFCOztBQVc1QixTQUFLLElBQUwsR0FBVSxNQUFNLEdBQU4sQ0FYa0I7QUFZNUIsV0FBTyxJQUFQLENBWjRCO0lBQU4sQ0FBbkIsQ0FMK0I7O0FBb0JuQyxVQUFPLG1CQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsQ0FBUCxDQXBCbUM7Ozs7dUJBdUJyQixXQUFXLE9BQU07T0FDcEIsTUFBOEMsVUFBOUM7T0FBSSxRQUEwQyxVQUExQztPQUFNLFdBQW9DLFVBQXBDO09BQVMsV0FBMkIsVUFBM0I7T0FBUyxRQUFrQixVQUFsQjsyQkFBa0IsVUFBWDtrREFBTyx1QkFEdEI7OztBQUd6QixVQUFPLEtBQUssTUFBTCxDQUFZO0FBQ3hCLGVBQVUsRUFBQyxRQUFELEVBQUssWUFBTCxFQUFXLGtCQUFYLEVBQW9CLGtCQUFwQixFQUE4QixZQUE5QixFQUFWO0FBQ1MsZUFBVyxPQUFPLENBQVAsQ0FBWDtBQUNBLGFBQVEsQ0FBUjtBQUNULFdBQU0saUJBQU8sZUFBUCxDQUF1QixHQUF2QixFQUpNLENBQVAsQ0FIeUI7Ozs7eUJBVWYsTUFBSztBQUNmLFFBQUssVUFBTCxHQUFnQixJQUFJLElBQUosRUFBaEIsQ0FEZTtBQUVmLFFBQUssY0FBTCxHQUFvQixjQUFLLGVBQUwsQ0FGTDtBQUdmLFFBQUssT0FBTCxHQUFhLElBQWIsQ0FIZTtBQUlmLFVBQU8sS0FBSyxNQUFMLENBQVksSUFBWixDQUFQLENBSmU7Ozs7c0JBckNEO0FBQ2QsVUFBTyxNQUFQLENBRGM7Ozs7OztrQkFERCIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXG5pbXBvcnQgRmluaXNoZWQgZnJvbSBcIi4vZmluaXNoZWRcIlxuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuXHRzdGF0aWMgZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCB0YXNrcyl7XG5cdFx0Y29uc3Qge3RvZG9XZWVrOndlZWt9PWNoaWxkXG5cdFx0Y29uc3QgeWVhcj1uZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcblx0XHQvKipAVE9ETzogZ2V0IGRhdGUgZnJvbSB3ZWVrK2RheSovXG5cdFx0Y29uc3QgZ2V0RGF0ZT0od2VlayxpKT0+e31cblx0XHRsZXQgZmluaXNoZWQ9dGFza3MubWFwKHRhc2s9Pntcblx0XHRcdGNvbnN0IHtkb25lc309dGFza1xuXHRcdFx0ZG9uZXMuZm9yRWFjaChpPT57XG5cdFx0XHRcdHRhc2sud2Vlaz13ZWVrXG5cdFx0XHRcdHRhc2suZGF5PWlcblx0XHRcdFx0dGFzay5kYXRlPWdldERhdGUod2VlayxpKVxuXHRcdFx0fSlcblxuXHRcdFx0dGFzay5rbm93bGVkZ2U9dGFzay5faWRcblx0XHRcdGRlbGV0ZSB0YXNrLl9pZFxuXG5cdFx0XHR0YXNrLmJhYnk9Y2hpbGQuX2lkXG5cdFx0XHRyZXR1cm4gdGFza1xuXHRcdH0pXG5cblx0XHRyZXR1cm4gRmluaXNoZWQudXBzZXJ0KGZpbmlzaGVkKVxuXHR9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6MCxcblx0XHRcdGNoaWxkOkZhbWlseS5nZXRDdXJyZW50Q2hpbGQuX2lkfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmZpbmlzaGVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cbn1cbiJdfQ==