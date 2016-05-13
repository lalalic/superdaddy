"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _ = require(".");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rewards = [{ amount: 1, reason: "smile" }, { amount: 5, reason: "reading" }, { amount: 10, reason: "english speaking" }];
var goals = [{ total: 5, reward: "hug" }, { total: 10, reward: "pencil" }, { total: 20, reward: "pencil sharpener" }];

var Reward = function (_Model) {
	_inherits(Reward, _Model);

	function Reward() {
		_classCallCheck(this, Reward);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Reward).apply(this, arguments));
	}

	_createClass(Reward, null, [{
		key: "upsert",
		value: function upsert(reward) {
			if (reward.reason) {} else {
				rewards.push(reward);
			}

			this.emit("change");
		}
	}, {
		key: "addGoal",
		value: function addGoal(goal) {

			goals.push(goal);
			this.emit("change");
		}
	}, {
		key: "getRewards",
		value: function getRewards(child) {
			var _this2 = this;

			return Promise.resolve(rewards);
			return new Promise(function (resolve, reject) {
				return _this2.find({ child: child._id }).fetch(resolve, reject);
			});
		}
	}, {
		key: "getGoals",
		value: function getGoals(child) {
			return Promise.resolve(goals);
			return new Promise(function (resolve, reject) {
				return _.Goal.find({ child: child._id }).fetch(resolve, reject);
			});
		}
	}, {
		key: "_name",
		get: function get() {
			return "reward";
		}
	}]);

	return Reward;
}(_qiliApp.Model);

exports.default = Reward;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9yZXdhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLFVBQVEsQ0FBQyxFQUFDLFFBQU8sQ0FBUCxFQUFVLFFBQU8sT0FBUCxFQUFaLEVBQTZCLEVBQUMsUUFBTyxDQUFQLEVBQVUsUUFBTyxTQUFQLEVBQXhDLEVBQTJELEVBQUMsUUFBTyxFQUFQLEVBQVUsUUFBTyxrQkFBUCxFQUF0RSxDQUFSO0FBQ0osSUFBSSxRQUFNLENBQUMsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLEtBQVAsRUFBWCxFQUF5QixFQUFDLE9BQU0sRUFBTixFQUFVLFFBQU8sUUFBUCxFQUFwQyxFQUFzRCxFQUFDLE9BQU0sRUFBTixFQUFVLFFBQU8sa0JBQVAsRUFBakUsQ0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3lCQUdOLFFBQU87QUFDcEIsT0FBRyxPQUFPLE1BQVAsRUFBYyxFQUFqQixNQUVLO0FBQ0osWUFBUSxJQUFSLENBQWEsTUFBYixFQURJO0lBRkw7O0FBTUEsUUFBSyxJQUFMLENBQVUsUUFBVixFQVBvQjs7OzswQkFVTixNQUFLOztBQUVuQixTQUFNLElBQU4sQ0FBVyxJQUFYLEVBRm1CO0FBR25CLFFBQUssSUFBTCxDQUFVLFFBQVYsRUFIbUI7Ozs7NkJBTUYsT0FBTTs7O0FBQ3ZCLFVBQU8sUUFBUSxPQUFSLENBQWdCLE9BQWhCLENBQVAsQ0FEdUI7QUFFdkIsVUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLE9BQUssSUFBTCxDQUFVLEVBQUMsT0FBTSxNQUFNLEdBQU4sRUFBakIsRUFBNkIsS0FBN0IsQ0FBbUMsT0FBbkMsRUFBMkMsTUFBM0M7SUFBbEIsQ0FBbkIsQ0FGdUI7Ozs7MkJBS1IsT0FBTTtBQUNyQixVQUFPLFFBQVEsT0FBUixDQUFnQixLQUFoQixDQUFQLENBRHFCO0FBRXJCLFVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixPQUFLLElBQUwsQ0FBVSxFQUFDLE9BQU0sTUFBTSxHQUFOLEVBQWpCLEVBQTZCLEtBQTdCLENBQW1DLE9BQW5DLEVBQTJDLE1BQTNDO0lBQWxCLENBQW5CLENBRnFCOzs7O3NCQXZCRDtBQUFDLFVBQU8sUUFBUCxDQUFEOzs7O1FBREQiLCJmaWxlIjoicmV3YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtGYW1pbHksIEdvYWx9IGZyb20gXCIuXCJcblxudmFyIHJld2FyZHM9W3thbW91bnQ6MSwgcmVhc29uOlwic21pbGVcIn0sIHthbW91bnQ6NSwgcmVhc29uOlwicmVhZGluZ1wifSwge2Ftb3VudDoxMCxyZWFzb246XCJlbmdsaXNoIHNwZWFraW5nXCJ9XVxudmFyIGdvYWxzPVt7dG90YWw6NSwgcmV3YXJkOlwiaHVnXCJ9LHt0b3RhbDoxMCwgcmV3YXJkOlwicGVuY2lsXCJ9LCB7dG90YWw6MjAsIHJld2FyZDpcInBlbmNpbCBzaGFycGVuZXJcIn1dXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmQgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7cmV0dXJuIFwicmV3YXJkXCJ9XG5cdFxuXHRzdGF0aWMgdXBzZXJ0KHJld2FyZCl7XG5cdFx0aWYocmV3YXJkLnJlYXNvbil7XG5cdFx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdHJld2FyZHMucHVzaChyZXdhcmQpXG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuZW1pdChcImNoYW5nZVwiKVxuXHR9XG5cdFxuXHRzdGF0aWMgYWRkR29hbChnb2FsKXtcblx0XG5cdFx0Z29hbHMucHVzaChnb2FsKVxuXHRcdHRoaXMuZW1pdChcImNoYW5nZVwiKVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0UmV3YXJkcyhjaGlsZCl7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXdhcmRzKVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT50aGlzLmZpbmQoe2NoaWxkOmNoaWxkLl9pZH0pLmZldGNoKHJlc29sdmUscmVqZWN0KSlcblx0fVxuXHRcblx0c3RhdGljIGdldEdvYWxzKGNoaWxkKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdvYWxzKVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5Hb2FsLmZpbmQoe2NoaWxkOmNoaWxkLl9pZH0pLmZldGNoKHJlc29sdmUscmVqZWN0KSlcblx0XHRcblx0fVxufVxuIl19