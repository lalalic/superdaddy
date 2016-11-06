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

        return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
    }

    _createClass(Task, null, [{
        key: 'plan',
        value: function plan(knowledge, dates) {
            var _id = knowledge._id;
            var title = knowledge.title;
            var keywords = knowledge.keywords;
            var category = knowledge.category;
            var steps = knowledge.steps;
            var _knowledge$images = knowledge.images;
            var images = _knowledge$images === undefined ? [] : _knowledge$images;


            return this.upsert({
                knowledge: { _id: _id, title: title, keywords: keywords, category: category, steps: steps },
                thumbnail: images[0],
                current: 0,
                child: _family2.default.currentChild._id });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi90YXNrLmpzIl0sIm5hbWVzIjpbImNsb25lQXNEYXRlIiwiZCIsImNsb25lZERhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiVGFzayIsImtub3dsZWRnZSIsImRhdGVzIiwiX2lkIiwidGl0bGUiLCJrZXl3b3JkcyIsImNhdGVnb3J5Iiwic3RlcHMiLCJpbWFnZXMiLCJ1cHNlcnQiLCJ0aHVtYm5haWwiLCJjdXJyZW50IiwiY2hpbGQiLCJjdXJyZW50Q2hpbGQiLCJ0YXNrIiwiZmluaXNoZWRBdCIsImZpbmlzaGVkQXV0aG9yIiwiY3VycmVudEFzQXV0aG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxXQUFULENBQXFCQyxDQUFyQixFQUF3QjtBQUN0QixRQUFJQyxhQUFhLElBQUlDLElBQUosQ0FBU0YsRUFBRUcsT0FBRixFQUFULENBQWpCO0FBQ0FGLGVBQVdHLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUI7QUFDQSxXQUFPSCxVQUFQO0FBQ0Q7O0lBRW9CSSxJOzs7Ozs7Ozs7Ozs2QkFLTEMsUyxFQUFXQyxLLEVBQU07QUFBQSxnQkFDcEJDLEdBRG9CLEdBQzBCRixTQUQxQixDQUNwQkUsR0FEb0I7QUFBQSxnQkFDaEJDLEtBRGdCLEdBQzBCSCxTQUQxQixDQUNoQkcsS0FEZ0I7QUFBQSxnQkFDVkMsUUFEVSxHQUMwQkosU0FEMUIsQ0FDVkksUUFEVTtBQUFBLGdCQUNEQyxRQURDLEdBQzBCTCxTQUQxQixDQUNESyxRQURDO0FBQUEsZ0JBQ1FDLEtBRFIsR0FDMEJOLFNBRDFCLENBQ1FNLEtBRFI7QUFBQSxvQ0FDMEJOLFNBRDFCLENBQ2VPLE1BRGY7QUFBQSxnQkFDZUEsTUFEZixxQ0FDc0IsRUFEdEI7OztBQUd6QixtQkFBTyxLQUFLQyxNQUFMLENBQVk7QUFDeEJSLDJCQUFVLEVBQUNFLFFBQUQsRUFBS0MsWUFBTCxFQUFXQyxrQkFBWCxFQUFvQkMsa0JBQXBCLEVBQThCQyxZQUE5QixFQURjO0FBRWZHLDJCQUFXRixPQUFPLENBQVAsQ0FGSTtBQUdmRyx5QkFBUSxDQUhPO0FBSXhCQyx1QkFBTSxpQkFBT0MsWUFBUCxDQUFvQlYsR0FKRixFQUFaLENBQVA7QUFLSDs7OytCQUVhVyxJLEVBQUs7QUFDZkEsaUJBQUtDLFVBQUwsR0FBZ0IsSUFBSWxCLElBQUosRUFBaEI7QUFDQWlCLGlCQUFLRSxjQUFMLEdBQW9CLGNBQUtDLGVBQXpCO0FBQ0FILGlCQUFLSCxPQUFMLEdBQWEsSUFBYjtBQUNBLG1CQUFPLEtBQUtGLE1BQUwsQ0FBWUssSUFBWixDQUFQO0FBQ0g7Ozs0QkFuQmlCO0FBQ2QsbUJBQU8sTUFBUDtBQUNIOzs7Ozs7a0JBSGdCZCxJIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gJ3FpbGktYXBwJztcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknO1xuXG5mdW5jdGlvbiBjbG9uZUFzRGF0ZShkKSB7XG4gIGxldCBjbG9uZWREYXRlID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICBjbG9uZWREYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICByZXR1cm4gY2xvbmVkRGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICd0YXNrJ1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGFuKGtub3dsZWRnZSwgZGF0ZXMpe1xuICAgICAgICBsZXQge19pZCx0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxzdGVwcywgaW1hZ2VzPVtdfT1rbm93bGVkZ2VcblxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQoe1xuXHRcdFx0a25vd2xlZGdlOntfaWQsdGl0bGUsa2V5d29yZHMsY2F0ZWdvcnksIHN0ZXBzfSxcbiAgICAgICAgICAgIHRodW1ibmFpbDogaW1hZ2VzWzBdLFxuICAgICAgICAgICAgY3VycmVudDowLFxuXHRcdFx0Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZC5faWR9KVxuICAgIH1cblx0XG4gICAgc3RhdGljIGZpbmlzaCh0YXNrKXtcbiAgICAgICAgdGFzay5maW5pc2hlZEF0PW5ldyBEYXRlKClcbiAgICAgICAgdGFzay5maW5pc2hlZEF1dGhvcj1Vc2VyLmN1cnJlbnRBc0F1dGhvclxuICAgICAgICB0YXNrLmN1cnJlbnQ9MTAwMFxuICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQodGFzaylcbiAgICB9XG59XG4iXX0=