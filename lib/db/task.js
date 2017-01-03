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
            var finished = tasks.map(function (task) {
                var dones = task.dones;

                dones.forEach(function (i) {
                    return task.date = Task.getDate(week, i);
                });

                task.knowledge = task._id;
                delete task._id;

                task.baby = child._id;
                task.owner = domain;

                if (task._qid) {
                    task._id = task._qid;
                    delete task._qid;
                }
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
        key: 'getWeekStart',
        value: function getWeekStart() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

            return date.relativeDate(-1 * date.getDay()).toDate().getTime();
        }
    }, {
        key: 'getDate',
        value: function getDate(weekStart, day) {
            return new Date(weekStart).relativeDate(day).toDate();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJkb21haW4iLCJ0YXJnZXRzIiwidGFyZ2V0Iiwid2VlayIsInRvZG9XZWVrIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZmluaXNoZWQiLCJtYXAiLCJkb25lcyIsInRhc2siLCJmb3JFYWNoIiwiZGF0ZSIsImdldERhdGUiLCJpIiwia25vd2xlZGdlIiwiX2lkIiwiYmFieSIsIm93bmVyIiwiX3FpZCIsInVwc2VydCIsImRhdGVzIiwidGl0bGUiLCJrZXl3b3JkcyIsImNhdGVnb3J5Iiwic3RlcHMiLCJpbWFnZXMiLCJ0aHVtYm5haWwiLCJjdXJyZW50IiwiZ2V0Q3VycmVudENoaWxkIiwiZmluaXNoZWRBdCIsImZpbmlzaGVkQXV0aG9yIiwiY3VycmVudEFzQXV0aG9yIiwicmVsYXRpdmVEYXRlIiwiZ2V0RGF5IiwidG9EYXRlIiwid2Vla1N0YXJ0IiwiZGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLENBQXJCLEVBQXdCO0FBQ3RCLFFBQUlDLGFBQWEsSUFBSUMsSUFBSixDQUFTRixFQUFFRyxPQUFGLEVBQVQsQ0FBakI7QUFDQUYsZUFBV0csUUFBWCxDQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QixFQUEwQixDQUExQjtBQUNBLFdBQU9ILFVBQVA7QUFDRDs7SUFFb0JJLEk7Ozs7Ozs7Ozs7O3dDQUtHQyxLLEVBQU9DLEssRUFBT0MsTSxFQUFPO0FBQzNDLGdCQUFNQyxVQUFRSCxNQUFNRyxPQUFwQjtBQUNBLGdCQUFNQyxTQUFPRCxRQUFRRCxNQUFSLENBQWI7QUFGMkMsZ0JBRzNCRyxJQUgyQixHQUdyQkQsTUFIcUIsQ0FHcENFLFFBSG9DOztBQUkzQyxnQkFBTUMsT0FBSyxJQUFJWCxJQUFKLEdBQVdZLFdBQVgsRUFBWDs7QUFFQTtBQUNBLGdCQUFJQyxXQUFTUixNQUFNUyxHQUFOLENBQVUsZ0JBQU07QUFBQSxvQkFDckJDLEtBRHFCLEdBQ2RDLElBRGMsQ0FDckJELEtBRHFCOztBQUU1QkEsc0JBQU1FLE9BQU4sQ0FBYztBQUFBLDJCQUFHRCxLQUFLRSxJQUFMLEdBQVVmLEtBQUtnQixPQUFMLENBQWFWLElBQWIsRUFBa0JXLENBQWxCLENBQWI7QUFBQSxpQkFBZDs7QUFFQUoscUJBQUtLLFNBQUwsR0FBZUwsS0FBS00sR0FBcEI7QUFDQSx1QkFBT04sS0FBS00sR0FBWjs7QUFFQU4scUJBQUtPLElBQUwsR0FBVW5CLE1BQU1rQixHQUFoQjtBQUNBTixxQkFBS1EsS0FBTCxHQUFXbEIsTUFBWDs7QUFFUyxvQkFBR1UsS0FBS1MsSUFBUixFQUFhO0FBQ1RULHlCQUFLTSxHQUFMLEdBQVNOLEtBQUtTLElBQWQ7QUFDQSwyQkFBT1QsS0FBS1MsSUFBWjtBQUNIO0FBQ1YsdUJBQU9ULElBQVA7QUFDQSxhQWZZLENBQWI7O0FBaUJBLG1CQUFPLG1CQUFTVSxNQUFULENBQWdCYixRQUFoQixDQUFQO0FBQ0E7Ozs2QkFFY1EsUyxFQUFXTSxLLEVBQU07QUFBQSxnQkFDcEJMLEdBRG9CLEdBQzBCRCxTQUQxQixDQUNwQkMsR0FEb0I7QUFBQSxnQkFDaEJNLEtBRGdCLEdBQzBCUCxTQUQxQixDQUNoQk8sS0FEZ0I7QUFBQSxnQkFDVkMsUUFEVSxHQUMwQlIsU0FEMUIsQ0FDVlEsUUFEVTtBQUFBLGdCQUNEQyxRQURDLEdBQzBCVCxTQUQxQixDQUNEUyxRQURDO0FBQUEsZ0JBQ1FDLEtBRFIsR0FDMEJWLFNBRDFCLENBQ1FVLEtBRFI7QUFBQSxvQ0FDMEJWLFNBRDFCLENBQ2VXLE1BRGY7QUFBQSxnQkFDZUEsTUFEZixxQ0FDc0IsRUFEdEI7OztBQUd6QixtQkFBTyxLQUFLTixNQUFMLENBQVk7QUFDeEJMLDJCQUFVLEVBQUNDLFFBQUQsRUFBS00sWUFBTCxFQUFXQyxrQkFBWCxFQUFvQkMsa0JBQXBCLEVBQThCQyxZQUE5QixFQURjO0FBRWZFLDJCQUFXRCxPQUFPLENBQVAsQ0FGSTtBQUdmRSx5QkFBUSxDQUhPO0FBSXhCOUIsdUJBQU0saUJBQU8rQixlQUFQLENBQXVCYixHQUpMLEVBQVosQ0FBUDtBQUtIOzs7K0JBRWFOLEksRUFBSztBQUNmQSxpQkFBS29CLFVBQUwsR0FBZ0IsSUFBSXBDLElBQUosRUFBaEI7QUFDQWdCLGlCQUFLcUIsY0FBTCxHQUFvQixjQUFLQyxlQUF6QjtBQUNBdEIsaUJBQUtrQixPQUFMLEdBQWEsSUFBYjtBQUNBLG1CQUFPLEtBQUtSLE1BQUwsQ0FBWVYsSUFBWixDQUFQO0FBQ0g7Ozt1Q0FFbUM7QUFBQSxnQkFBaEJFLElBQWdCLHVFQUFYLElBQUlsQixJQUFKLEVBQVc7O0FBQ2hDLG1CQUFPa0IsS0FBS3FCLFlBQUwsQ0FBa0IsQ0FBQyxDQUFELEdBQUdyQixLQUFLc0IsTUFBTCxFQUFyQixFQUFvQ0MsTUFBcEMsR0FBNkN4QyxPQUE3QyxFQUFQO0FBQ0g7OztnQ0FFY3lDLFMsRUFBV0MsRyxFQUFJO0FBQzFCLG1CQUFPLElBQUkzQyxJQUFKLENBQVMwQyxTQUFULEVBQW9CSCxZQUFwQixDQUFpQ0ksR0FBakMsRUFBc0NGLE1BQXRDLEVBQVA7QUFDSDs7OzRCQXREaUI7QUFDZCxtQkFBTyxNQUFQO0FBQ0g7Ozs7OztrQkFIZ0J0QyxJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEZhbWlseSBmcm9tICcuL2ZhbWlseSdcbmltcG9ydCBGaW5pc2hlZCBmcm9tIFwiLi9maW5pc2hlZFwiXG5cbmZ1bmN0aW9uIGNsb25lQXNEYXRlKGQpIHtcbiAgbGV0IGNsb25lZERhdGUgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ3Rhc2snXG4gICAgfVxuXG5cdHN0YXRpYyBmaW5pc2hXZWVrVGFza3MoY2hpbGQsIHRhc2tzLCBkb21haW4pe1xuXHRcdGNvbnN0IHRhcmdldHM9Y2hpbGQudGFyZ2V0c1xuXHRcdGNvbnN0IHRhcmdldD10YXJnZXRzW2RvbWFpbl1cblx0XHRjb25zdCB7dG9kb1dlZWs6d2Vla309dGFyZ2V0XG5cdFx0Y29uc3QgeWVhcj1uZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcblxuXHRcdC8qKkBUT0RPOiBnZXQgZGF0ZSBmcm9tIHdlZWsrZGF5Ki9cblx0XHRsZXQgZmluaXNoZWQ9dGFza3MubWFwKHRhc2s9Pntcblx0XHRcdGNvbnN0IHtkb25lc309dGFza1xuXHRcdFx0ZG9uZXMuZm9yRWFjaChpPT50YXNrLmRhdGU9VGFzay5nZXREYXRlKHdlZWssaSkpXG5cblx0XHRcdHRhc2sua25vd2xlZGdlPXRhc2suX2lkXG5cdFx0XHRkZWxldGUgdGFzay5faWRcblxuXHRcdFx0dGFzay5iYWJ5PWNoaWxkLl9pZFxuXHRcdFx0dGFzay5vd25lcj1kb21haW5cblxuICAgICAgICAgICAgaWYodGFzay5fcWlkKXtcbiAgICAgICAgICAgICAgICB0YXNrLl9pZD10YXNrLl9xaWRcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFzay5fcWlkXG4gICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gdGFza1xuXHRcdH0pXG5cblx0XHRyZXR1cm4gRmluaXNoZWQudXBzZXJ0KGZpbmlzaGVkKVxuXHR9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3RlcHMsIGltYWdlcz1bXX09a25vd2xlZGdlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHtcblx0XHRcdGtub3dsZWRnZTp7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LCBzdGVwc30sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6MCxcblx0XHRcdGNoaWxkOkZhbWlseS5nZXRDdXJyZW50Q2hpbGQuX2lkfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmZpbmlzaGVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suY3VycmVudD0xMDAwXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRXZWVrU3RhcnQoZGF0ZT1uZXcgRGF0ZSgpKXtcbiAgICAgICAgcmV0dXJuIGRhdGUucmVsYXRpdmVEYXRlKC0xKmRhdGUuZ2V0RGF5KCkpLnRvRGF0ZSgpLmdldFRpbWUoKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXREYXRlKHdlZWtTdGFydCwgZGF5KXtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHdlZWtTdGFydCkucmVsYXRpdmVEYXRlKGRheSkudG9EYXRlKClcbiAgICB9XG59XG4iXX0=