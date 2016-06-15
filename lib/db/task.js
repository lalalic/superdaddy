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
            var _id = knowledge._id;
            var title = knowledge.title;
            var keywords = knowledge.keywords;
            var category = knowledge.category;
            var summary = knowledge.summary;
            var today = cloneAsDate(new Date());

            return this.upsert({
                knowledge: { _id: _id, title: title, keywords: keywords, category: category, summary: summary },
                today: today,
                status: "scheduled",
                child: _family2.default.currentChild._id });
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
                status: "started", child: _family2.default.currentChild._id
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
//# sourceMappingURL=data:application/json;base64,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QUFPLFlBQVAsRUFBRCxFQUNDLE9BQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUsc0NBQVYsQ0FBZixDQUFQLENBREo7O0FBR0EsaUJBQUssVUFBTCxHQUFnQixJQUFJLElBQUosRUFBaEIsQ0FQZ0I7QUFRaEIsaUJBQUssY0FBTCxHQUFvQixjQUFLLGVBQUwsQ0FSSjtBQVNoQixpQkFBSyxNQUFMLEdBQVksVUFBWixDQVRnQjtBQVVoQixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQVAsQ0FWZ0I7Ozs7K0JBYU4sTUFBSztBQUNmLG1CQUFPLEtBQUssSUFBTCxDQUFVLEVBQUMsYUFBWSxZQUFZLElBQVosQ0FBWixFQUFYLENBQVAsQ0FEZTs7Ozs0QkE5REQ7QUFDZCxtQkFBTyxNQUFQLENBRGM7Ozs7V0FERCIsImZpbGUiOiJ0YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tICdxaWxpLWFwcCc7XG5pbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5JztcblxuZnVuY3Rpb24gY2xvbmVBc0RhdGUoZCkge1xuICBsZXQgY2xvbmVkRGF0ZSA9IG5ldyBEYXRlKGQuZ2V0VGltZSgpKTtcbiAgY2xvbmVkRGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgcmV0dXJuIGNsb25lZERhdGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAndGFzaydcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwcm92aW5ncygpe1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKHtzdGF0dXM6XCJmaW5pc2hlZFwifSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcGxhbihrbm93bGVkZ2UsIGRhdGVzKXtcbiAgICAgICAgbGV0IHtfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksc3VtbWFyeX09a25vd2xlZGdlXG4gICAgICAgICAgICAsdG9kYXk9Y2xvbmVBc0RhdGUobmV3IERhdGUoKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLnVwc2VydCh7XG5cdFx0XHRrbm93bGVkZ2U6e19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdW1tYXJ5fSxcblx0XHRcdHRvZGF5LCBcblx0XHRcdHN0YXR1czpcInNjaGVkdWxlZFwiLFxuXHRcdFx0Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZC5faWR9KVxuICAgIH1cblxuICAgIHN0YXRpYyBzdGFydE5vdyhrbm93bGVkZ2Upe1xuICAgICAgICBsZXQge3RpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN1bW1hcnl9PWtub3dsZWRnZVxuICAgICAgICAgICAgLGE9e3RpdGxlLGtleXdvcmRzLGNhdGVnb3J5LHN1bW1hcnl9XG4gICAgICAgICAgICAsdG9kYXk9Y2xvbmVBc0RhdGUobmV3IERhdGUoKSlcbiAgICAgICAgICAgICx0YXNrPXtrbm93bGVkZ2U6YSwgc2NoZWR1bGVkQXQ6dG9kYXksXG4gICAgICAgICAgICAgICAgc3RhcnRlZEF0Om5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgc3RhcnRlZEF1dGhvcjpVc2VyLmN1cnJlbnRBc0F1dGhvcixcbiAgICAgICAgICAgICAgICBzdGF0dXM6XCJzdGFydGVkXCIsY2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZC5faWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXJ0KHRhc2spe1xuICAgICAgICBpZih0YXNrLnN0YXR1cylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdGF0dXMgaXMgbm90IHJpZ2h0XCIpKVxuICAgICAgICB0YXNrLnN0YXJ0ZWRBdD1uZXcgRGF0ZSgpXG4gICAgICAgIHRhc2suc3RhcnRlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLnN0YXR1cz1cInN0YXJ0ZWRcIlxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluaXNoKHRhc2spe1xuICAgICAgICBpZih0YXNrLnN0YXR1cyE9XCJzdGFydGVkXCIpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic3RhdHVzIGlzIG5vdCByaWdodFwiKSlcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLnN0YXR1cz1cImZpbmlzaGVkXCJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KHRhc2spXG4gICAgfVxuXG4gICAgc3RhdGljIGFwcHJvdmUodGFzayl7XG4gICAgICAgIGlmKHRhc2suc3RhdHVzIT1cImZpbmlzaGVkXCIpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic3RhdHVzIGlzIG5vdCByaWdodFwiKSlcblxuICAgICAgICBpZighRmFtaWx5LnJlbGF0aW9uc2hpcCgpKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIm9ubHkgcmVsYXRpdmVzIGNhbiBhcHByb3ZlIHlvdXIgdGFza1wiKSlcblxuICAgICAgICB0YXNrLmFwcHJvdmVkQXQ9bmV3IERhdGUoKVxuICAgICAgICB0YXNrLmFwcHJvdmVkQXV0aG9yPVVzZXIuY3VycmVudEFzQXV0aG9yXG4gICAgICAgIHRhc2suc3RhdHVzPVwiYXBwcm92ZWRcIlxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlEYXRlKGRhdGUpe1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKHtzY2hlZHVsZWRBdDpjbG9uZUFzRGF0ZShkYXRlKX0pXG4gICAgfVxufVxuIl19