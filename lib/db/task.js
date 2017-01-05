'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

      var finished = tasks.reduce(function (finished, task) {
        var props = { bayb: child._id, owner: domain };
        task.dones.forEach(function (i) {
          finished.push(_extends({}, task, { date: Task.getDate(week, i) }, props, { dones: undefined }));
        });
        return finished;
      }, []);

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
    key: 'createUid',
    value: function createUid() {
      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJkb21haW4iLCJ0YXJnZXRzIiwidGFyZ2V0Iiwid2VlayIsInRvZG9XZWVrIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZmluaXNoZWQiLCJyZWR1Y2UiLCJ0YXNrIiwicHJvcHMiLCJiYXliIiwiX2lkIiwib3duZXIiLCJkb25lcyIsImZvckVhY2giLCJwdXNoIiwiZGF0ZSIsImdldERhdGUiLCJpIiwidW5kZWZpbmVkIiwidXBzZXJ0Iiwia25vd2xlZGdlIiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiLCJyZWxhdGl2ZURhdGUiLCJnZXREYXkiLCJ0b0RhdGUiLCJ3ZWVrU3RhcnQiLCJkYXkiLCJyZXBsYWNlIiwiciIsIk1hdGgiLCJyYW5kb20iLCJ2IiwiYyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsTUFBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixhQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsU0FBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7Ozs7b0NBS0dDLEssRUFBT0MsSyxFQUFPQyxNLEVBQU87QUFDM0MsVUFBTUMsVUFBUUgsTUFBTUcsT0FBcEI7QUFDQSxVQUFNQyxTQUFPRCxRQUFRRCxNQUFSLENBQWI7QUFGMkMsVUFHM0JHLElBSDJCLEdBR3JCRCxNQUhxQixDQUdwQ0UsUUFIb0M7O0FBSTNDLFVBQU1DLE9BQUssSUFBSVgsSUFBSixHQUFXWSxXQUFYLEVBQVg7O0FBRUEsVUFBSUMsV0FBU1IsTUFBTVMsTUFBTixDQUFhLFVBQUNELFFBQUQsRUFBVUUsSUFBVixFQUFpQjtBQUMxQyxZQUFJQyxRQUFNLEVBQUNDLE1BQU1iLE1BQU1jLEdBQWIsRUFBa0JDLE9BQU1iLE1BQXhCLEVBQVY7QUFDQVMsYUFBS0ssS0FBTCxDQUFXQyxPQUFYLENBQW1CLGFBQUc7QUFDckJSLG1CQUFTUyxJQUFULGNBQWtCUCxJQUFsQixJQUF1QlEsTUFBS3BCLEtBQUtxQixPQUFMLENBQWFmLElBQWIsRUFBa0JnQixDQUFsQixDQUE1QixJQUFxRFQsS0FBckQsSUFBNERJLE9BQU1NLFNBQWxFO0FBQ0EsU0FGRDtBQUdBLGVBQU9iLFFBQVA7QUFDQSxPQU5ZLEVBTVgsRUFOVyxDQUFiOztBQVFBLGFBQU8sbUJBQVNjLE1BQVQsQ0FBZ0JkLFFBQWhCLENBQVA7QUFDQTs7O3lCQUVjZSxTLEVBQVdDLEssRUFBTTtBQUFBLFVBQ3BCWCxHQURvQixHQUMwQlUsU0FEMUIsQ0FDcEJWLEdBRG9CO0FBQUEsVUFDaEJZLEtBRGdCLEdBQzBCRixTQUQxQixDQUNoQkUsS0FEZ0I7QUFBQSxVQUNWQyxRQURVLEdBQzBCSCxTQUQxQixDQUNWRyxRQURVO0FBQUEsVUFDREMsUUFEQyxHQUMwQkosU0FEMUIsQ0FDREksUUFEQztBQUFBLFVBQ1FDLEtBRFIsR0FDMEJMLFNBRDFCLENBQ1FLLEtBRFI7QUFBQSw4QkFDMEJMLFNBRDFCLENBQ2VNLE1BRGY7QUFBQSxVQUNlQSxNQURmLHFDQUNzQixFQUR0Qjs7O0FBR3pCLGFBQU8sS0FBS1AsTUFBTCxDQUFZO0FBQ3hCQyxtQkFBVSxFQUFDVixRQUFELEVBQUtZLFlBQUwsRUFBV0Msa0JBQVgsRUFBb0JDLGtCQUFwQixFQUE4QkMsWUFBOUIsRUFEYztBQUVmRSxtQkFBV0QsT0FBTyxDQUFQLENBRkk7QUFHZkUsaUJBQVEsQ0FITztBQUl4QmhDLGVBQU0saUJBQU9pQyxlQUFQLENBQXVCbkIsR0FKTCxFQUFaLENBQVA7QUFLSDs7OzJCQUVhSCxJLEVBQUs7QUFDZkEsV0FBS3VCLFVBQUwsR0FBZ0IsSUFBSXRDLElBQUosRUFBaEI7QUFDQWUsV0FBS3dCLGNBQUwsR0FBb0IsY0FBS0MsZUFBekI7QUFDQXpCLFdBQUtxQixPQUFMLEdBQWEsSUFBYjtBQUNBLGFBQU8sS0FBS1QsTUFBTCxDQUFZWixJQUFaLENBQVA7QUFDSDs7O21DQUVtQztBQUFBLFVBQWhCUSxJQUFnQix1RUFBWCxJQUFJdkIsSUFBSixFQUFXOztBQUNoQyxhQUFPdUIsS0FBS2tCLFlBQUwsQ0FBa0IsQ0FBQyxDQUFELEdBQUdsQixLQUFLbUIsTUFBTCxFQUFyQixFQUFvQ0MsTUFBcEMsR0FBNkMxQyxPQUE3QyxFQUFQO0FBQ0g7Ozs0QkFFYzJDLFMsRUFBV0MsRyxFQUFJO0FBQzFCLGFBQU8sSUFBSTdDLElBQUosQ0FBUzRDLFNBQVQsRUFBb0JILFlBQXBCLENBQWlDSSxHQUFqQyxFQUFzQ0YsTUFBdEMsRUFBUDtBQUNIOzs7Z0NBRWM7QUFDakIsYUFBTyxtQ0FBbUNHLE9BQW5DLENBQTJDLE9BQTNDLEVBQW9ELGFBQUc7QUFDN0QsWUFBSUMsSUFBSUMsS0FBS0MsTUFBTCxLQUFjLEVBQWQsR0FBaUIsQ0FBekI7QUFDQSxZQUFJQyxJQUFJQyxLQUFLLEdBQUwsR0FBV0osQ0FBWCxHQUFnQkEsSUFBRSxHQUFGLEdBQU0sR0FBOUI7QUFDQSxlQUFPRyxFQUFFRSxRQUFGLENBQVcsRUFBWCxDQUFQO0FBQ0EsT0FKTSxDQUFQO0FBS0E7Ozt3QkFwRG9CO0FBQ2QsYUFBTyxNQUFQO0FBQ0g7Ozs7OztrQkFIZ0JqRCxJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEZhbWlseSBmcm9tICcuL2ZhbWlseSdcbmltcG9ydCBGaW5pc2hlZCBmcm9tIFwiLi9maW5pc2hlZFwiXG5cbmZ1bmN0aW9uIGNsb25lQXNEYXRlKGQpIHtcbiAgbGV0IGNsb25lZERhdGUgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gIHJldHVybiBjbG9uZWREYXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ3Rhc2snXG4gICAgfVxuXG5cdHN0YXRpYyBmaW5pc2hXZWVrVGFza3MoY2hpbGQsIHRhc2tzLCBkb21haW4pe1xuXHRcdGNvbnN0IHRhcmdldHM9Y2hpbGQudGFyZ2V0c1xuXHRcdGNvbnN0IHRhcmdldD10YXJnZXRzW2RvbWFpbl1cblx0XHRjb25zdCB7dG9kb1dlZWs6d2Vla309dGFyZ2V0XG5cdFx0Y29uc3QgeWVhcj1uZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcblxuXHRcdGxldCBmaW5pc2hlZD10YXNrcy5yZWR1Y2UoKGZpbmlzaGVkLHRhc2spPT57XG5cdFx0XHRsZXQgcHJvcHM9e2JheWI6IGNoaWxkLl9pZCwgb3duZXI6ZG9tYWlufVxuXHRcdFx0dGFzay5kb25lcy5mb3JFYWNoKGk9Pntcblx0XHRcdFx0ZmluaXNoZWQucHVzaCh7Li4udGFzayxkYXRlOlRhc2suZ2V0RGF0ZSh3ZWVrLGkpLCAuLi5wcm9wcywgZG9uZXM6dW5kZWZpbmVkfSlcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gZmluaXNoZWRcblx0XHR9LFtdKVxuXG5cdFx0cmV0dXJuIEZpbmlzaGVkLnVwc2VydChmaW5pc2hlZClcblx0fVxuXG4gICAgc3RhdGljIHBsYW4oa25vd2xlZGdlLCBkYXRlcyl7XG4gICAgICAgIGxldCB7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN0ZXBzLCBpbWFnZXM9W119PWtub3dsZWRnZVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSwgc3RlcHN9LFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBpbWFnZXNbMF0sXG4gICAgICAgICAgICBjdXJyZW50OjAsXG5cdFx0XHRjaGlsZDpGYW1pbHkuZ2V0Q3VycmVudENoaWxkLl9pZH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0V2Vla1N0YXJ0KGRhdGU9bmV3IERhdGUoKSl7XG4gICAgICAgIHJldHVybiBkYXRlLnJlbGF0aXZlRGF0ZSgtMSpkYXRlLmdldERheSgpKS50b0RhdGUoKS5nZXRUaW1lKClcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGF0ZSh3ZWVrU3RhcnQsIGRheSl7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh3ZWVrU3RhcnQpLnJlbGF0aXZlRGF0ZShkYXkpLnRvRGF0ZSgpXG4gICAgfVxuXHRcblx0c3RhdGljIGNyZWF0ZVVpZCgpe1xuXHRcdHJldHVybiAneHh4eHh4eHh4eHh4NHh4eHl4eHh4eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgYz0+e1xuXHRcdFx0bGV0IHIgPSBNYXRoLnJhbmRvbSgpKjE2fDBcblx0XHRcdGxldCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OClcblx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KVxuXHRcdH0pXG5cdH1cbn1cbiJdfQ==