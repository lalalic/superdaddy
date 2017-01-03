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
								value: function finishWeekTasks(child, tasks, domain) {
												var targets = child.targets;
												var target = targets[domain];
												var week = target.todoWeek;

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
																task.owner = domain;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJkb21haW4iLCJ0YXJnZXRzIiwidGFyZ2V0Iiwid2VlayIsInRvZG9XZWVrIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZ2V0RGF0ZSIsImkiLCJmaW5pc2hlZCIsIm1hcCIsImRvbmVzIiwidGFzayIsImZvckVhY2giLCJkYXkiLCJkYXRlIiwia25vd2xlZGdlIiwiX2lkIiwiYmFieSIsIm93bmVyIiwidXBzZXJ0IiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsUUFBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixlQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsV0FBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7Ozs7d0NBS0dDLEssRUFBT0MsSyxFQUFPQyxNLEVBQU87QUFDM0MsZ0JBQU1DLFVBQVFILE1BQU1HLE9BQXBCO0FBQ0EsZ0JBQU1DLFNBQU9ELFFBQVFELE1BQVIsQ0FBYjtBQUYyQyxnQkFHM0JHLElBSDJCLEdBR3JCRCxNQUhxQixDQUdwQ0UsUUFIb0M7O0FBSTNDLGdCQUFNQyxPQUFLLElBQUlYLElBQUosR0FBV1ksV0FBWCxFQUFYOztBQUVBO0FBQ0EsZ0JBQU1DLFVBQVEsU0FBUkEsT0FBUSxDQUFDSixJQUFELEVBQU1LLENBQU4sRUFBVSxDQUFFLENBQTFCO0FBQ0EsZ0JBQUlDLFdBQVNWLE1BQU1XLEdBQU4sQ0FBVSxnQkFBTTtBQUFBLG9CQUNyQkMsS0FEcUIsR0FDZEMsSUFEYyxDQUNyQkQsS0FEcUI7O0FBRTVCQSxzQkFBTUUsT0FBTixDQUFjLGFBQUc7QUFDaEJELHlCQUFLVCxJQUFMLEdBQVVBLElBQVY7QUFDQVMseUJBQUtFLEdBQUwsR0FBU04sQ0FBVDtBQUNBSSx5QkFBS0csSUFBTCxHQUFVUixRQUFRSixJQUFSLEVBQWFLLENBQWIsQ0FBVjtBQUNBLGlCQUpEOztBQU1BSSxxQkFBS0ksU0FBTCxHQUFlSixLQUFLSyxHQUFwQjtBQUNBLHVCQUFPTCxLQUFLSyxHQUFaOztBQUVBTCxxQkFBS00sSUFBTCxHQUFVcEIsTUFBTW1CLEdBQWhCO0FBQ0FMLHFCQUFLTyxLQUFMLEdBQVduQixNQUFYO0FBQ0EsdUJBQU9ZLElBQVA7QUFDQSxhQWRZLENBQWI7O0FBZ0JBLG1CQUFPLG1CQUFTUSxNQUFULENBQWdCWCxRQUFoQixDQUFQO0FBQ0E7Ozs2QkFFY08sUyxFQUFXSyxLLEVBQU07QUFBQSxnQkFDcEJKLEdBRG9CLEdBQzBCRCxTQUQxQixDQUNwQkMsR0FEb0I7QUFBQSxnQkFDaEJLLEtBRGdCLEdBQzBCTixTQUQxQixDQUNoQk0sS0FEZ0I7QUFBQSxnQkFDVkMsUUFEVSxHQUMwQlAsU0FEMUIsQ0FDVk8sUUFEVTtBQUFBLGdCQUNEQyxRQURDLEdBQzBCUixTQUQxQixDQUNEUSxRQURDO0FBQUEsZ0JBQ1FDLEtBRFIsR0FDMEJULFNBRDFCLENBQ1FTLEtBRFI7QUFBQSxvQ0FDMEJULFNBRDFCLENBQ2VVLE1BRGY7QUFBQSxnQkFDZUEsTUFEZixxQ0FDc0IsRUFEdEI7OztBQUd6QixtQkFBTyxLQUFLTixNQUFMLENBQVk7QUFDeEJKLDJCQUFVLEVBQUNDLFFBQUQsRUFBS0ssWUFBTCxFQUFXQyxrQkFBWCxFQUFvQkMsa0JBQXBCLEVBQThCQyxZQUE5QixFQURjO0FBRWZFLDJCQUFXRCxPQUFPLENBQVAsQ0FGSTtBQUdmRSx5QkFBUSxDQUhPO0FBSXhCOUIsdUJBQU0saUJBQU8rQixlQUFQLENBQXVCWixHQUpMLEVBQVosQ0FBUDtBQUtIOzs7K0JBRWFMLEksRUFBSztBQUNmQSxpQkFBS2tCLFVBQUwsR0FBZ0IsSUFBSXBDLElBQUosRUFBaEI7QUFDQWtCLGlCQUFLbUIsY0FBTCxHQUFvQixjQUFLQyxlQUF6QjtBQUNBcEIsaUJBQUtnQixPQUFMLEdBQWEsSUFBYjtBQUNBLG1CQUFPLEtBQUtSLE1BQUwsQ0FBWVIsSUFBWixDQUFQO0FBQ0g7Ozs0QkE5Q2lCO0FBQ2QsbUJBQU8sTUFBUDtBQUNIOzs7Ozs7a0JBSGdCZixJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5J1xyXG5pbXBvcnQgRmluaXNoZWQgZnJvbSBcIi4vZmluaXNoZWRcIlxyXG5cclxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xyXG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xyXG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XHJcbiAgcmV0dXJuIGNsb25lZERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcclxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcclxuICAgICAgICByZXR1cm4gJ3Rhc2snXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBmaW5pc2hXZWVrVGFza3MoY2hpbGQsIHRhc2tzLCBkb21haW4pe1xyXG5cdFx0Y29uc3QgdGFyZ2V0cz1jaGlsZC50YXJnZXRzXHJcblx0XHRjb25zdCB0YXJnZXQ9dGFyZ2V0c1tkb21haW5dXHJcblx0XHRjb25zdCB7dG9kb1dlZWs6d2Vla309dGFyZ2V0XHJcblx0XHRjb25zdCB5ZWFyPW5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHJcblx0XHQvKipAVE9ETzogZ2V0IGRhdGUgZnJvbSB3ZWVrK2RheSovXHJcblx0XHRjb25zdCBnZXREYXRlPSh3ZWVrLGkpPT57fVxyXG5cdFx0bGV0IGZpbmlzaGVkPXRhc2tzLm1hcCh0YXNrPT57XHJcblx0XHRcdGNvbnN0IHtkb25lc309dGFza1xyXG5cdFx0XHRkb25lcy5mb3JFYWNoKGk9PntcclxuXHRcdFx0XHR0YXNrLndlZWs9d2Vla1xyXG5cdFx0XHRcdHRhc2suZGF5PWlcclxuXHRcdFx0XHR0YXNrLmRhdGU9Z2V0RGF0ZSh3ZWVrLGkpXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHR0YXNrLmtub3dsZWRnZT10YXNrLl9pZFxyXG5cdFx0XHRkZWxldGUgdGFzay5faWRcclxuXHJcblx0XHRcdHRhc2suYmFieT1jaGlsZC5faWRcclxuXHRcdFx0dGFzay5vd25lcj1kb21haW5cclxuXHRcdFx0cmV0dXJuIHRhc2tcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIEZpbmlzaGVkLnVwc2VydChmaW5pc2hlZClcclxuXHR9XHJcblxyXG4gICAgc3RhdGljIHBsYW4oa25vd2xlZGdlLCBkYXRlcyl7XHJcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XHJcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXHJcbiAgICAgICAgICAgIHRodW1ibmFpbDogaW1hZ2VzWzBdLFxyXG4gICAgICAgICAgICBjdXJyZW50OjAsXHJcblx0XHRcdGNoaWxkOkZhbWlseS5nZXRDdXJyZW50Q2hpbGQuX2lkfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xyXG4gICAgICAgIHRhc2suZmluaXNoZWRBdD1uZXcgRGF0ZSgpXHJcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxyXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXHJcbiAgICB9XHJcbn1cclxuIl19