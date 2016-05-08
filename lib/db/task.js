'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Task).apply(this, arguments));
    }

    _createClass(Task, null, [{
        key: 'approvings',
        value: function approvings() {
            return this.find({ status: "finished" });
        }
    }, {
        key: 'plan',
        value: function plan(knowledge, dates) {
            var title = knowledge.title;
            var keywords = knowledge.keywords;
            var category = knowledge.category;
            var summary = knowledge.summary;
            var a = { title: title, keywords: keywords, category: category, summary: summary };
            var today = cloneAsDate(new Date());
            if (!Array.isArray(dates)) dates = [dates];
            return Promise.all(dates.map(function (date) {
                var scheduledAt = cloneAsDate(date);
                if (scheduledAt < today) return null; //ignore
                return this.upsert({ knowledge: a, scheduledAt: scheduledAt, status: "scheduled" });
            }.bind(this))).then(function (tasks) {
                return tasks.filter(function (a) {
                    return a;
                });
            });
        }
    }, {
        key: 'startNow',
        value: function startNow(knowledge) {
            var title = knowledge.title;
            var keywords = knowledge.keywords;
            var category = knowledge.category;
            var summary = knowledge.summary;
            var a = { title: title, keywords: keywords, category: category, summary: summary };
            var today = cloneAsDate(new Date());
            var task = { knowledge: a, scheduledAt: today,
                startedAt: new Date(),
                startedAuthor: _qiliApp.User.currentAsAuthor,
                status: "started"
            };
            return this.upsert(task);
        }
    }, {
        key: 'start',
        value: function start(task) {
            if (task.status) return Promise.reject(new Error("status is not right"));
            task.startedAt = new Date();
            task.startedAuthor = _qiliApp.User.currentAsAuthor;
            task.status = "started";
            return this.upsert(task);
        }
    }, {
        key: 'finish',
        value: function finish(task) {
            if (task.status != "started") return Promise.reject(new Error("status is not right"));
            task.finishedAt = new Date();
            task.finishedAuthor = _qiliApp.User.currentAsAuthor;
            task.status = "finished";
            return this.upsert(task);
        }
    }, {
        key: 'approve',
        value: function approve(task) {
            if (task.status != "finished") return Promise.reject(new Error("status is not right"));

            if (!_family2.default.relationship()) return Promise.reject(new Error("only relatives can approve your task"));

            task.approvedAt = new Date();
            task.approvedAuthor = _qiliApp.User.currentAsAuthor;
            task.status = "approved";
            return this.upsert(task);
        }
    }, {
        key: 'byDate',
        value: function byDate(date) {
            return this.find({ scheduledAt: cloneAsDate(date) });
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
//# sourceMappingURL=data:application/json;base64,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QkFBSyxjQUFMLEdBQW9CLGNBQUssZUFBTCxDQUpMO0FBS2YsaUJBQUssTUFBTCxHQUFZLFVBQVosQ0FMZTtBQU1mLG1CQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBUCxDQU5lOzs7O2dDQVNKLE1BQUs7QUFDaEIsZ0JBQUcsS0FBSyxNQUFMLElBQWEsVUFBYixFQUNDLE9BQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUscUJBQVYsQ0FBZixDQUFQLENBREo7O0FBR0EsZ0JBQUcsQ0FBQyxpQkFBUyxZQUFULEVBQUQsRUFDQyxPQUFPLFFBQVEsTUFBUixDQUFlLElBQUksS0FBSixDQUFVLHNDQUFWLENBQWYsQ0FBUCxDQURKOztBQUdBLGlCQUFLLFVBQUwsR0FBZ0IsSUFBSSxJQUFKLEVBQWhCLENBUGdCO0FBUWhCLGlCQUFLLGNBQUwsR0FBb0IsY0FBSyxlQUFMLENBUko7QUFTaEIsaUJBQUssTUFBTCxHQUFZLFVBQVosQ0FUZ0I7QUFVaEIsbUJBQU8sS0FBSyxNQUFMLENBQVksSUFBWixDQUFQLENBVmdCOzs7OytCQWFOLE1BQUs7QUFDZixtQkFBTyxLQUFLLElBQUwsQ0FBVSxFQUFDLGFBQVksWUFBWSxJQUFaLENBQVosRUFBWCxDQUFQLENBRGU7Ozs7NEJBakVEO0FBQ2QsbUJBQU8sTUFBUCxDQURjOzs7O1dBREQiLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSAncWlsaS1hcHAnO1xuaW1wb3J0IEZhbWlseURCIGZyb20gJy4vZmFtaWx5JztcblxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xuICBsZXQgY2xvbmVkRGF0ZSA9IG5ldyBEYXRlKGQuZ2V0VGltZSgpKTtcbiAgY2xvbmVkRGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgcmV0dXJuIGNsb25lZERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAndGFzaydcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwcm92aW5ncygpe1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKHtzdGF0dXM6XCJmaW5pc2hlZFwifSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHt0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdW1tYXJ5fT1rbm93bGVkZ2VcbiAgICAgICAgICAgICxhPXt0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdW1tYXJ5fVxuICAgICAgICAgICAgLHRvZGF5PWNsb25lQXNEYXRlKG5ldyBEYXRlKCkpXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KGRhdGVzKSlcbiAgICAgICAgICAgIGRhdGVzPVtkYXRlc11cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGRhdGVzLm1hcChmdW5jdGlvbihkYXRlKXtcbiAgICAgICAgICAgIGxldCBzY2hlZHVsZWRBdD1jbG9uZUFzRGF0ZShkYXRlKVxuICAgICAgICAgICAgaWYoc2NoZWR1bGVkQXQ8dG9kYXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7Ly9pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7a25vd2xlZGdlOmEsc2NoZWR1bGVkQXQsIHN0YXR1czpcInNjaGVkdWxlZFwifSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKSkudGhlbih0YXNrcz0+dGFza3MuZmlsdGVyKGE9PmEpKVxuICAgIH1cblxuICAgIHN0YXRpYyBzdGFydE5vdyhrbm93bGVkZ2Upe1xuICAgICAgICBsZXQge3RpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN1bW1hcnl9PWtub3dsZWRnZVxuICAgICAgICAgICAgLGE9e3RpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN1bW1hcnl9XG4gICAgICAgICAgICAsdG9kYXk9Y2xvbmVBc0RhdGUobmV3IERhdGUoKSlcbiAgICAgICAgICAgICx0YXNrPXtrbm93bGVkZ2U6YSwgc2NoZWR1bGVkQXQ6dG9kYXksXG4gICAgICAgICAgICAgICAgc3RhcnRlZEF0Om5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRlZEF1dGhvcjpVc2VyLmN1cnJlbnRBc0F1dGhvcixcbiAgICAgICAgICAgICAgICBzdGF0dXM6XCJzdGFydGVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXJ0KHRhc2spe1xuICAgICAgICBpZih0YXNrLnN0YXR1cylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdGF0dXMgaXMgbm90IHJpZ2h0XCIpKVxuICAgICAgICB0YXNrLnN0YXJ0ZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suc3RhcnRlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLnN0YXR1cz1cInN0YXJ0ZWRcIlxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICBpZih0YXNrLnN0YXR1cyE9XCJzdGFydGVkXCIpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic3RhdHVzIGlzIG5vdCByaWdodFwiKSlcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLnN0YXR1cz1cImZpbmlzaGVkXCJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxuXG4gICAgc3RhdGljIGFwcHJvdmUodGFzayl7XG4gICAgICAgIGlmKHRhc2suc3RhdHVzIT1cImZpbmlzaGVkXCIpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic3RhdHVzIGlzIG5vdCByaWdodFwiKSlcblxuICAgICAgICBpZighRmFtaWx5REIucmVsYXRpb25zaGlwKCkpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwib25seSByZWxhdGl2ZXMgY2FuIGFwcHJvdmUgeW91ciB0YXNrXCIpKVxuXG4gICAgICAgIHRhc2suYXBwcm92ZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suYXBwcm92ZWRBdXRob3I9VXNlci5jdXJyZW50QXNBdXRob3JcbiAgICAgICAgdGFzay5zdGF0dXM9XCJhcHByb3ZlZFwiXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh0YXNrKVxuICAgIH1cblxuICAgIHN0YXRpYyBieURhdGUoZGF0ZSl7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoe3NjaGVkdWxlZEF0OmNsb25lQXNEYXRlKGRhdGUpfSlcbiAgICB9XG59XG4iXX0=