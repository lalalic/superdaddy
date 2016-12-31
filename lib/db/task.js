'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

var _finished = require('./finished');

var _finished2 = _interopRequireDefault(_finished);

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

		return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
	}

	_createClass(Task, null, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJ3ZWVrIiwidG9kb1dlZWsiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJnZXREYXRlIiwiaSIsImZpbmlzaGVkIiwibWFwIiwiZG9uZXMiLCJ0YXNrIiwiZm9yRWFjaCIsImRheSIsImRhdGUiLCJrbm93bGVkZ2UiLCJfaWQiLCJiYWJ5IiwidXBzZXJ0IiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsS0FBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixZQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsUUFBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7Ozs7a0NBS0dDLEssRUFBT0MsSyxFQUFNO0FBQUEsT0FDbkJDLElBRG1CLEdBQ2JGLEtBRGEsQ0FDNUJHLFFBRDRCOztBQUVuQyxPQUFNQyxPQUFLLElBQUlSLElBQUosR0FBV1MsV0FBWCxFQUFYO0FBQ0E7QUFDQSxPQUFNQyxVQUFRLFNBQVJBLE9BQVEsQ0FBQ0osSUFBRCxFQUFNSyxDQUFOLEVBQVUsQ0FBRSxDQUExQjtBQUNBLE9BQUlDLFdBQVNQLE1BQU1RLEdBQU4sQ0FBVSxnQkFBTTtBQUFBLFFBQ3JCQyxLQURxQixHQUNkQyxJQURjLENBQ3JCRCxLQURxQjs7QUFFNUJBLFVBQU1FLE9BQU4sQ0FBYyxhQUFHO0FBQ2hCRCxVQUFLVCxJQUFMLEdBQVVBLElBQVY7QUFDQVMsVUFBS0UsR0FBTCxHQUFTTixDQUFUO0FBQ0FJLFVBQUtHLElBQUwsR0FBVVIsUUFBUUosSUFBUixFQUFhSyxDQUFiLENBQVY7QUFDQSxLQUpEOztBQU1BSSxTQUFLSSxTQUFMLEdBQWVKLEtBQUtLLEdBQXBCO0FBQ0EsV0FBT0wsS0FBS0ssR0FBWjs7QUFFQUwsU0FBS00sSUFBTCxHQUFVakIsTUFBTWdCLEdBQWhCO0FBQ0EsV0FBT0wsSUFBUDtBQUNBLElBYlksQ0FBYjs7QUFlQSxVQUFPLG1CQUFTTyxNQUFULENBQWdCVixRQUFoQixDQUFQO0FBQ0E7Ozt1QkFFY08sUyxFQUFXSSxLLEVBQU07QUFBQSxPQUNwQkgsR0FEb0IsR0FDMEJELFNBRDFCLENBQ3BCQyxHQURvQjtBQUFBLE9BQ2hCSSxLQURnQixHQUMwQkwsU0FEMUIsQ0FDaEJLLEtBRGdCO0FBQUEsT0FDVkMsUUFEVSxHQUMwQk4sU0FEMUIsQ0FDVk0sUUFEVTtBQUFBLE9BQ0RDLFFBREMsR0FDMEJQLFNBRDFCLENBQ0RPLFFBREM7QUFBQSxPQUNRQyxLQURSLEdBQzBCUixTQUQxQixDQUNRUSxLQURSO0FBQUEsMkJBQzBCUixTQUQxQixDQUNlUyxNQURmO0FBQUEsT0FDZUEsTUFEZixxQ0FDc0IsRUFEdEI7OztBQUd6QixVQUFPLEtBQUtOLE1BQUwsQ0FBWTtBQUN4QkgsZUFBVSxFQUFDQyxRQUFELEVBQUtJLFlBQUwsRUFBV0Msa0JBQVgsRUFBb0JDLGtCQUFwQixFQUE4QkMsWUFBOUIsRUFEYztBQUVmRSxlQUFXRCxPQUFPLENBQVAsQ0FGSTtBQUdmRSxhQUFRLENBSE87QUFJeEIxQixXQUFNLGlCQUFPMkIsZUFBUCxDQUF1QlgsR0FKTCxFQUFaLENBQVA7QUFLSDs7O3lCQUVhTCxJLEVBQUs7QUFDZkEsUUFBS2lCLFVBQUwsR0FBZ0IsSUFBSWhDLElBQUosRUFBaEI7QUFDQWUsUUFBS2tCLGNBQUwsR0FBb0IsY0FBS0MsZUFBekI7QUFDQW5CLFFBQUtlLE9BQUwsR0FBYSxJQUFiO0FBQ0EsVUFBTyxLQUFLUixNQUFMLENBQVlQLElBQVosQ0FBUDtBQUNIOzs7c0JBMUNpQjtBQUNkLFVBQU8sTUFBUDtBQUNIOzs7Ozs7a0JBSGdCWixJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEZhbWlseSBmcm9tICcuL2ZhbWlseSdcbmltcG9ydCBGaW5pc2hlZCBmcm9tIFwiLi9maW5pc2hlZFwiXG5cbmZ1bmN0aW9uIGNsb25lQXNEYXRlKGQpIHtcbiAgbGV0IGNsb25lZERhdGUgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ3Rhc2snXG4gICAgfVxuXG5cdHN0YXRpYyBmaW5pc2hXZWVrVGFza3MoY2hpbGQsIHRhc2tzKXtcblx0XHRjb25zdCB7dG9kb1dlZWs6d2Vla309Y2hpbGRcblx0XHRjb25zdCB5ZWFyPW5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxuXHRcdC8qKkBUT0RPOiBnZXQgZGF0ZSBmcm9tIHdlZWsrZGF5Ki9cblx0XHRjb25zdCBnZXREYXRlPSh3ZWVrLGkpPT57fVxuXHRcdGxldCBmaW5pc2hlZD10YXNrcy5tYXAodGFzaz0+e1xuXHRcdFx0Y29uc3Qge2RvbmVzfT10YXNrXG5cdFx0XHRkb25lcy5mb3JFYWNoKGk9Pntcblx0XHRcdFx0dGFzay53ZWVrPXdlZWtcblx0XHRcdFx0dGFzay5kYXk9aVxuXHRcdFx0XHR0YXNrLmRhdGU9Z2V0RGF0ZSh3ZWVrLGkpXG5cdFx0XHR9KVxuXG5cdFx0XHR0YXNrLmtub3dsZWRnZT10YXNrLl9pZFxuXHRcdFx0ZGVsZXRlIHRhc2suX2lkXG5cblx0XHRcdHRhc2suYmFieT1jaGlsZC5faWRcblx0XHRcdHJldHVybiB0YXNrXG5cdFx0fSlcblxuXHRcdHJldHVybiBGaW5pc2hlZC51cHNlcnQoZmluaXNoZWQpXG5cdH1cblxuICAgIHN0YXRpYyBwbGFuKGtub3dsZWRnZSwgZGF0ZXMpe1xuICAgICAgICBsZXQge19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdGVwcywgaW1hZ2VzPVtdfT1rbm93bGVkZ2VcblxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQoe1xuXHRcdFx0a25vd2xlZGdlOntfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksIHN0ZXBzfSxcbiAgICAgICAgICAgIHRodW1ibmFpbDogaW1hZ2VzWzBdLFxuICAgICAgICAgICAgY3VycmVudDowLFxuXHRcdFx0Y2hpbGQ6RmFtaWx5LmdldEN1cnJlbnRDaGlsZC5faWR9KVxuICAgIH1cblxuICAgIHN0YXRpYyBmaW5pc2godGFzayl7XG4gICAgICAgIHRhc2suZmluaXNoZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suZmluaXNoZWRBdXRob3I9VXNlci5jdXJyZW50QXNBdXRob3JcbiAgICAgICAgdGFzay5jdXJyZW50PTEwMDBcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxufVxuIl19