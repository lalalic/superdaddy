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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImNoaWxkIiwidGFza3MiLCJkb21haW4iLCJ0YXJnZXRzIiwidGFyZ2V0Iiwid2VlayIsInRvZG9XZWVrIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZmluaXNoZWQiLCJyZWR1Y2UiLCJ0YXNrIiwicHJvcHMiLCJiYXliIiwiX2lkIiwib3duZXIiLCJkb25lcyIsImZvckVhY2giLCJwdXNoIiwiZGF0ZSIsImdldERhdGUiLCJpIiwidW5kZWZpbmVkIiwidXBzZXJ0Iiwia25vd2xlZGdlIiwiZGF0ZXMiLCJ0aXRsZSIsImtleXdvcmRzIiwiY2F0ZWdvcnkiLCJzdGVwcyIsImltYWdlcyIsInRodW1ibmFpbCIsImN1cnJlbnQiLCJnZXRDdXJyZW50Q2hpbGQiLCJmaW5pc2hlZEF0IiwiZmluaXNoZWRBdXRob3IiLCJjdXJyZW50QXNBdXRob3IiLCJyZWxhdGl2ZURhdGUiLCJnZXREYXkiLCJ0b0RhdGUiLCJ3ZWVrU3RhcnQiLCJkYXkiLCJyZXBsYWNlIiwiciIsIk1hdGgiLCJyYW5kb20iLCJ2IiwiYyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsUUFBSUMsYUFBYSxJQUFJQyxJQUFKLENBQVNGLEVBQUVHLE9BQUYsRUFBVCxDQUFqQjtBQUNBRixlQUFXRyxRQUFYLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0EsV0FBT0gsVUFBUDtBQUNEOztJQUVvQkksSTs7Ozs7Ozs7Ozs7d0NBS0dDLEssRUFBT0MsSyxFQUFPQyxNLEVBQU87QUFDM0MsZ0JBQU1DLFVBQVFILE1BQU1HLE9BQXBCO0FBQ0Es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YXBwJ1xyXG5pbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5J1xyXG5pbXBvcnQgRmluaXNoZWQgZnJvbSBcIi4vZmluaXNoZWRcIlxyXG5cclxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xyXG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xyXG4gIGNsb25lZERhdGUuc2V0SG91cnMoMCwwLDAsMCk7XHJcbiAgcmV0dXJuIGNsb25lZERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcclxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcclxuICAgICAgICByZXR1cm4gJ3Rhc2snXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBmaW5pc2hXZWVrVGFza3MoY2hpbGQsIHRhc2tzLCBkb21haW4pe1xyXG5cdFx0Y29uc3QgdGFyZ2V0cz1jaGlsZC50YXJnZXRzXHJcblx0XHRjb25zdCB0YXJnZXQ9dGFyZ2V0c1tkb21haW5dXHJcblx0XHRjb25zdCB7dG9kb1dlZWs6d2Vla309dGFyZ2V0XHJcblx0XHRjb25zdCB5ZWFyPW5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cclxuXHRcdGxldCBmaW5pc2hlZD10YXNrcy5yZWR1Y2UoKGZpbmlzaGVkLHRhc2spPT57XHJcblx0XHRcdGxldCBwcm9wcz17YmF5YjogY2hpbGQuX2lkLCBvd25lcjpkb21haW59XHJcblx0XHRcdHRhc2suZG9uZXMuZm9yRWFjaChpPT57XHJcblx0XHRcdFx0ZmluaXNoZWQucHVzaCh7Li4udGFzayxkYXRlOlRhc2suZ2V0RGF0ZSh3ZWVrLGkpLCAuLi5wcm9wcywgZG9uZXM6dW5kZWZpbmVkfSlcclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIGZpbmlzaGVkXHJcblx0XHR9LFtdKVxyXG5cclxuXHRcdHJldHVybiBGaW5pc2hlZC51cHNlcnQoZmluaXNoZWQpXHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBwbGFuKGtub3dsZWRnZSwgZGF0ZXMpe1xyXG4gICAgICAgIGxldCB7X2lkLHRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN0ZXBzLCBpbWFnZXM9W119PWtub3dsZWRnZVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQoe1xyXG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSwgc3RlcHN9LFxyXG4gICAgICAgICAgICB0aHVtYm5haWw6IGltYWdlc1swXSxcclxuICAgICAgICAgICAgY3VycmVudDowLFxyXG5cdFx0XHRjaGlsZDpGYW1pbHkuZ2V0Q3VycmVudENoaWxkLl9pZH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcclxuICAgICAgICB0YXNrLmZpbmlzaGVkQXQ9bmV3IERhdGUoKVxyXG4gICAgICAgIHRhc2suZmluaXNoZWRBdXRob3I9VXNlci5jdXJyZW50QXNBdXRob3JcclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxyXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRXZWVrU3RhcnQoZGF0ZT1uZXcgRGF0ZSgpKXtcclxuICAgICAgICByZXR1cm4gZGF0ZS5yZWxhdGl2ZURhdGUoLTEqZGF0ZS5nZXREYXkoKSkudG9EYXRlKCkuZ2V0VGltZSgpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERhdGUod2Vla1N0YXJ0LCBkYXkpe1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh3ZWVrU3RhcnQpLnJlbGF0aXZlRGF0ZShkYXkpLnRvRGF0ZSgpXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIGNyZWF0ZVVpZCgpe1xyXG5cdFx0cmV0dXJuICd4eHh4eHh4eHh4eHg0eHh4eXh4eHh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBjPT57XHJcblx0XHRcdGxldCByID0gTWF0aC5yYW5kb20oKSoxNnwwXHJcblx0XHRcdGxldCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OClcclxuXHRcdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=