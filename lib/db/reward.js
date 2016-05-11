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
			return rewards;
		}
	}, {
		key: "getGoals",
		value: function getGoals(child) {
			return goals;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9yZXdhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLFVBQVEsQ0FBQyxFQUFDLFFBQU8sQ0FBUCxFQUFVLFFBQU8sT0FBUCxFQUFaLEVBQTZCLEVBQUMsUUFBTyxDQUFQLEVBQVUsUUFBTyxTQUFQLEVBQXhDLEVBQTJELEVBQUMsUUFBTyxFQUFQLEVBQVUsUUFBTyxrQkFBUCxFQUF0RSxDQUFSO0FBQ0osSUFBSSxRQUFNLENBQUMsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLEtBQVAsRUFBWCxFQUF5QixFQUFDLE9BQU0sRUFBTixFQUFVLFFBQU8sUUFBUCxFQUFwQyxFQUFzRCxFQUFDLE9BQU0sRUFBTixFQUFVLFFBQU8sa0JBQVAsRUFBakUsQ0FBTjs7SUFDaUI7Ozs7Ozs7Ozs7O3lCQUdOLFFBQU87QUFDcEIsT0FBRyxPQUFPLE1BQVAsRUFBYyxFQUFqQixNQUVLO0FBQ0osWUFBUSxJQUFSLENBQWEsTUFBYixFQURJO0lBRkw7O0FBTUEsUUFBSyxJQUFMLENBQVUsUUFBVixFQVBvQjs7OzswQkFVTixNQUFLO0FBQ25CLFNBQU0sSUFBTixDQUFXLElBQVgsRUFEbUI7QUFFbkIsUUFBSyxJQUFMLENBQVUsUUFBVixFQUZtQjs7Ozs2QkFLRixPQUFNO0FBQ3ZCLFVBQU8sT0FBUCxDQUR1Qjs7OzsyQkFJUixPQUFNO0FBQ3JCLFVBQU8sS0FBUCxDQURxQjs7OztzQkFyQkQ7QUFBQyxVQUFPLFFBQVAsQ0FBRDs7OztRQUREIiwiZmlsZSI6InJld2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7RmFtaWx5fSBmcm9tIFwiLlwiXG5cbnZhciByZXdhcmRzPVt7YW1vdW50OjEsIHJlYXNvbjpcInNtaWxlXCJ9LCB7YW1vdW50OjUsIHJlYXNvbjpcInJlYWRpbmdcIn0sIHthbW91bnQ6MTAscmVhc29uOlwiZW5nbGlzaCBzcGVha2luZ1wifV1cbnZhciBnb2Fscz1be3RvdGFsOjUsIHJld2FyZDpcImh1Z1wifSx7dG90YWw6MTAsIHJld2FyZDpcInBlbmNpbFwifSwge3RvdGFsOjIwLCByZXdhcmQ6XCJwZW5jaWwgc2hhcnBlbmVyXCJ9XVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe3JldHVybiBcInJld2FyZFwifVxuXHRcblx0c3RhdGljIHVwc2VydChyZXdhcmQpe1xuXHRcdGlmKHJld2FyZC5yZWFzb24pe1xuXHRcdFx0XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXdhcmRzLnB1c2gocmV3YXJkKVxuXHRcdH1cblx0XHRcblx0XHR0aGlzLmVtaXQoXCJjaGFuZ2VcIilcblx0fVxuXHRcblx0c3RhdGljIGFkZEdvYWwoZ29hbCl7XG5cdFx0Z29hbHMucHVzaChnb2FsKVxuXHRcdHRoaXMuZW1pdChcImNoYW5nZVwiKVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0UmV3YXJkcyhjaGlsZCl7XG5cdFx0cmV0dXJuIHJld2FyZHNcblx0fVxuXHRcblx0c3RhdGljIGdldEdvYWxzKGNoaWxkKXtcblx0XHRyZXR1cm4gZ29hbHNcblx0fVxufVxuIl19