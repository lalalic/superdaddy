"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _materialUi = require("material-ui");

var _alarmAdd = require("material-ui/svg-icons/action/alarm-add");

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _arrowForward = require("material-ui/svg-icons/navigation/arrow-forward");

var _arrowForward2 = _interopRequireDefault(_arrowForward);

var _db = require("../db");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards() {
		_classCallCheck(this, Rewards);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).apply(this, arguments));

		_this.state = {
			goals: null,
			rewards: null
		};
		_this.onChange = _this.onChange.bind(_this);
		_this.onScroll = _this.onScroll.bind(_this);
		return _this;
	}

	_createClass(Rewards, [{
		key: "onChange",
		value: function onChange(condition) {
			var _this2 = this;

			condition = { child: condition.child };

			Promise.all([new Promise(function (resolve, reject) {
				return _db.Reward.find(condition).fetch(resolve, reject);
			}), new Promise(function (resolve, reject) {
				return _db.Goal.find(condition).fetch(resolve, reject);
			})]).then(function (a) {
				var _a = _slicedToArray(a, 2);

				var rewards = _a[0];
				var goals = _a[1];

				_this2.setState({ rewards: rewards, goals: goals });
			});
		}
	}, {
		key: "onScroll",
		value: function onScroll(e) {
			var _this3 = this;

			if (this._scrollTimer) clearTimeout(this._scrollTimer);
			this._scrollTimer = setTimeout(function (e) {
				var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this3).getBoundingClientRect();

				var top = _ReactDOM$findDOMNode.top;
				var height = _ReactDOM$findDOMNode.height;
				var bottom = top + height;
				var _props = _this3.props;
				var minY = _props.minY;
				var maxY = _props.maxY;
				var editable = _props.editable;
				var _refs = _this3.refs;
				var pendingGoal = _refs.pendingGoal;
				var rewardor = _refs.rewardor;


				if (pendingGoal) {
					(function () {
						var classes = _reactDom2.default.findDOMNode(pendingGoal).classList;
						var act = top <= minY ? "add" : "remove";
						"sticky top left".split(" ").forEach(function (a) {
							return classes[act](a);
						});
					})();
				}

				if (rewardor) {
					var _classes = _reactDom2.default.findDOMNode(rewardor).classList;
					var _act = top > maxY || bottom < minY ? "add" : "remove";
					_classes[_act]("hide");
				}
			}, 300);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			_db.Reward.on("upserted", this.onChange);
			_db.Goal.on("upserted", this.onChange);
			window.addEventListener("scroll", this.onScroll);
			this.onChange({ child: this.props.child._id });
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_db.Reward.removeListener("upserted", this.onChange);
			_db.Goal.removeListener("upserted", this.onChange);
			window.removeEventListener("scroll", this.onScroll);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			var newChild = nextProps.child;
			var child = this.props.child;


			if (child != newChild) this.onChange({ child: newChild._id });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			if (this.refs.pendingGoal) this.refs.pendingGoal.setState({ reward: "", total: "" });
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var _state = this.state;
			var goals = _state.goals;
			var rewards = _state.rewards;
			var outView = _state.outView;
			var outTop = _state.outTop;
			var _props2 = this.props;
			var height = _props2.height;
			var editable = _props2.editable;
			var _props2$style = _props2.style;
			var style = _props2$style === undefined ? {} : _props2$style;

			var total = 0,
			    max = 0,
			    action = null,
			    buf = 7;
			goals = goals && goals.map(function (a) {
				return _qiliApp.React.createElement(AGoal, {
					key: "goal_" + a.total,
					height: height,
					reward: a.reward,
					total: (max = Math.max(max, a.total), a.total) });
			});

			rewards = rewards && rewards.map(function (a) {
				return _qiliApp.React.createElement(AReward, {
					key: "reward_" + (total += a.amount),
					onReasonChange: function onReasonChange(newReason) {
						return _this4.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			if (editable) {
				action = _qiliApp.React.createElement(PendingGoal, { ref: "pendingGoal", bottom: (max + buf) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
						return _this4.pendGoal(goal);
					} });
			} else if (!outView) {
				action = _qiliApp.React.createElement(Rewardor, { ref: "rewardor", current: total, height: height, onReward: function onReward(amount) {
						return _this4.reward(amount);
					} });
			}

			style.height = (max + buf) * height;
			return _qiliApp.React.createElement(
				"div",
				{ className: "rewards page", style: style },
				_qiliApp.React.createElement(
					"svg",
					{ className: "arrow", width: "100%", height: "100%", viewBox: "0 0 10 10" },
					_qiliApp.React.createElement("path", { d: "M0,10 L5,0 L10,10", "stroke-width": "0.2" })
				),
				goals,
				rewards,
				action
			);
		}
	}, {
		key: "pendGoal",
		value: function pendGoal(goal) {
			goal.child = this.props.child._id;
			_db.Goal.upsert(goal);
		}
	}, {
		key: "reward",
		value: function reward(amount) {
			var newReward = { amount: amount, child: this.props.child._id };
			_db.Reward.upsert(newReward);
		}
	}, {
		key: "onReasonChange",
		value: function onReasonChange(reward, newReason) {
			reward.reason = newReason;
			_db.Reward.upsert(reward);
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

Rewards.defaultProps = {
	editable: false,
	height: 20,
	minY: 0,
	maxY: window.innerHeight
};
Rewards.propTypes = {
	child: _qiliApp.React.PropTypes.object,
	editable: _qiliApp.React.PropTypes.bool,
	height: _qiliApp.React.PropTypes.number,
	maxY: _qiliApp.React.PropTypes.number,
	minY: _qiliApp.React.PropTypes.number
};
exports.default = Rewards;

var Item = function (_React$Component2) {
	_inherits(Item, _React$Component2);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
	}

	return Item;
}(_qiliApp.React.Component);

Item.defaultProps = {
	height: 20
};

var PendingGoal = function (_Item) {
	_inherits(PendingGoal, _Item);

	function PendingGoal() {
		_classCallCheck(this, PendingGoal);

		var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(PendingGoal).apply(this, arguments));

		_this6.state = {
			reward: "",
			total: ""
		};
		return _this6;
	}

	_createClass(PendingGoal, [{
		key: "render",
		value: function render() {
			var _this7 = this;

			var _props3 = this.props;
			var current = _props3.current;
			var bottom = _props3.bottom;
			var _state2 = this.state;
			var reward = _state2.reward;
			var total = _state2.total;

			return _qiliApp.React.createElement(
				"div",
				{ className: "goal pending", style: { bottom: bottom } },
				_qiliApp.React.createElement(
					"div",
					null,
					_qiliApp.React.createElement("input", { onBlur: function onBlur(e) {
							return _this7.tryPend({ reward: e.target.value });
						},
						value: reward || "",
						onChange: function onChange(e) {
							return _this7.setState({ reward: e.target.value });
						},
						className: "pendingReward",
						placeholder: "New Reward...",
						style: { textAlign: "right", width: "100%" } })
				),
				_qiliApp.React.createElement(
					"div",
					{ className: "icon" },
					"»"
				),
				_qiliApp.React.createElement(
					"div",
					null,
					_qiliApp.React.createElement("input", { onBlur: function onBlur(e) {
							return _this7.tryPend({ total: e.target.value });
						},
						type: "number",
						value: total || "",
						onChange: function onChange(e) {
							return _this7.setState({ total: e.target.value });
						},
						placeholder: "Goal:>" + current,
						style: { width: "6em" } })
				)
			);
		}
	}, {
		key: "tryPend",
		value: function tryPend(state) {
			var newReward = state.reward;
			var newTotal = state.total;
			var _props4 = this.props;
			var current = _props4.current;
			var onPendGoal = _props4.onPendGoal;
			var _state3 = this.state;
			var reward = _state3.reward;
			var total = _state3.total;

			if (newReward) reward = newReward;
			if (newTotal) total = newTotal;
			if (reward.trim() && total.trim()) {
				total = parseInt(total.trim());
				if (total > current) {
					reward = reward.trim();
					onPendGoal({ reward: reward, total: total });
					return;
				} else {
					_qiliApp.UI.Messager.show("new goal must greater than current total " + current);
					_reactDom2.default.findDOMNode(this.refs.goal).focus();
				}
			}
			this.setState({ reward: reward, total: total });
		}
	}]);

	return PendingGoal;
}(Item);

PendingGoal.defaultProps = {
	onPendGoal: function onPendGoal(a) {
		return 1;
	}
};

var AGoal = function (_Item2) {
	_inherits(AGoal, _Item2);

	function AGoal() {
		_classCallCheck(this, AGoal);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AGoal).apply(this, arguments));
	}

	_createClass(AGoal, [{
		key: "render",
		value: function render() {
			var _props5 = this.props;
			var reward = _props5.reward;
			var total = _props5.total;
			var height = _props5.height;

			var style = { fontSize: "x-small", whiteSpace: "nowrap", backgroundColor: "lightgreen" };
			return _qiliApp.React.createElement(
				"div",
				{ className: "goal", style: { bottom: height * total } },
				_qiliApp.React.createElement(
					"div",
					null,
					_qiliApp.React.createElement(
						_materialUi.Avatar,
						{ style: style },
						reward
					)
				),
				_qiliApp.React.createElement(
					"div",
					{ className: "icon" },
					"•"
				),
				_qiliApp.React.createElement(
					"div",
					null,
					total
				)
			);
		}
	}]);

	return AGoal;
}(Item);

var AReward = function (_Item3) {
	_inherits(AReward, _Item3);

	function AReward() {
		_classCallCheck(this, AReward);

		var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(AReward).apply(this, arguments));

		_this9.state = { newReason: null };
		return _this9;
	}

	_createClass(AReward, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps() {
			this.setState({ newReason: null });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var reason = this.refs.reason;

			reason && reason.focus();
		}
	}, {
		key: "render",
		value: function render() {
			var _this10 = this;

			var _props6 = this.props;
			var reason = _props6.reason;
			var amount = _props6.amount;
			var total = _props6.total;
			var height = _props6.height;
			var newReason = this.state.newReason;


			if (newReason) {
				reason = _qiliApp.React.createElement(_materialUi.TextField, { ref: "reason", defaultValue: newReason,
					onEnterKeyDown: function onEnterKeyDown(e) {
						return e.target.blur();
					},
					onBlur: function onBlur(e) {
						return _this10.reasonChanged(e.target.value.trim());
					} });
			}

			return _qiliApp.React.createElement(
				"div",
				{ className: "reward", style: { bottom: height * total } },
				_qiliApp.React.createElement(
					"div",
					{ className: "icon" },
					"•"
				),
				_qiliApp.React.createElement(
					"div",
					{ className: "reason", onClick: function onClick(e) {
							return _this10.setState({ newReason: reason || " " });
						} },
					reason || "..."
				),
				_qiliApp.React.createElement(
					"div",
					null,
					"+",
					amount,
					"/",
					total
				)
			);
		}
	}, {
		key: "reasonChanged",
		value: function reasonChanged(newReason) {
			var _props7 = this.props;
			var reason = _props7.reason;
			var onReasonChange = _props7.onReasonChange;

			if (!newReason || newReason == reason) {
				this.setState({ newReason: undefined });
				return;
			}

			onReasonChange && onReasonChange(newReason);
		}
	}]);

	return AReward;
}(Item);

var Rewardor = function (_Item4) {
	_inherits(Rewardor, _Item4);

	function Rewardor() {
		_classCallCheck(this, Rewardor);

		var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).apply(this, arguments));

		_this11.state = { plus: 0, ticker: null };
		return _this11;
	}

	_createClass(Rewardor, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps() {
			this.setState({ plus: 0, ticker: null });
		}
	}, {
		key: "render",
		value: function render() {
			var _this12 = this;

			var plus = this.state.plus;
			var _props8 = this.props;
			var height = _props8.height;
			var current = _props8.current;

			return _qiliApp.React.createElement(
				"div",
				{ className: "reward pending" },
				_qiliApp.React.createElement(
					"div",
					{ className: "reason" },
					_qiliApp.React.createElement(_mood2.default, { className: "rewarder", onClick: function onClick(e) {
							return _this12.plus();
						} }),
					_qiliApp.React.createElement(
						"span",
						null,
						current
					),
					_qiliApp.React.createElement(
						"span",
						{ className: "plus " + (plus ? "plusing" : "") },
						"+",
						plus || 'x'
					)
				)
			);
		}
	}, {
		key: "plus",
		value: function plus() {
			var _state4 = this.state;
			var plus = _state4.plus;
			var ticker = _state4.ticker;

			ticker && clearTimeout(ticker);
			plus++;
			ticker = setTimeout(this.reward.bind(this), 1000);
			this.setState({ plus: plus, ticker: ticker });
		}
	}, {
		key: "reward",
		value: function reward() {
			var _state5 = this.state;
			var plus = _state5.plus;
			var ticker = _state5.ticker;

			ticker && clearTimeout(ticker);
			this.props.onReward(plus);
		}
	}]);

	return Rewardor;
}(Item);

Rewardor.propTypes = {
	current: _qiliApp.React.PropTypes.number,
	onReward: _qiliApp.React.PropTypes.func
};
Rewardor.defaultProps = {
	current: 0,
	onReward: function onReward(a) {
		return 1;
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQW1SQTs7Ozs7Ozs7Ozs7O0lBalJxQjs7O0FBZXBCLFVBZm9CLE9BZXBCLEdBQWE7d0JBZk8sU0FlUDs7cUVBZk8scUJBZ0JWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixVQUFNLElBQU47QUFDQSxZQUFRLElBQVI7R0FGRCxDQUZZO0FBTVosUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkLENBTlk7QUFPWixRQUFLLFFBQUwsR0FBYyxNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWQsQ0FQWTs7RUFBYjs7Y0Fmb0I7OzJCQXlCWCxXQUFVOzs7QUFDbEIsZUFBVSxFQUFDLE9BQU0sVUFBVSxLQUFWLEVBQWpCLENBRGtCOztBQUdsQixXQUFRLEdBQVIsQ0FBWSxDQUNYLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsV0FBUyxJQUFULENBQWMsU0FBZCxFQUF5QixLQUF6QixDQUErQixPQUEvQixFQUF1QyxNQUF2QztJQUFsQixDQURELEVBRVgsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixTQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLENBQTZCLE9BQTdCLEVBQXFDLE1BQXJDO0lBQWxCLENBRkQsQ0FBWixFQUdHLElBSEgsQ0FHUSxhQUFHOzRCQUNXLE1BRFg7O1FBQ0wsZ0JBREs7UUFDSSxjQURKOztBQUVWLFdBQUssUUFBTCxDQUFjLEVBQUMsZ0JBQUQsRUFBUyxZQUFULEVBQWQsRUFGVTtJQUFILENBSFIsQ0FIa0I7Ozs7MkJBWVYsR0FBRTs7O0FBQ1YsT0FBRyxLQUFLLFlBQUwsRUFDRixhQUFhLEtBQUssWUFBTCxDQUFiLENBREQ7QUFFQSxRQUFLLFlBQUws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TSxTQUFOLENBQWdCLElBQWhCOztBQUhOLFNBTUUsZUFBYTtBQUNuQixVQUFRLENBQVI7QUFDQSxXQUFVO1NBQUc7RUFBSCIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLWFkZCdcbmltcG9ydCBGb3J3YXJkSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseSwgUmV3YXJkIGFzIGRiUmV3YXJkLCBHb2FsIGFzIGRiR29hbH0gZnJvbSAnLi4vZGInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGVkaXRhYmxlOmZhbHNlLFxuXHRcdGhlaWdodDoyMCxcblx0XHRtaW5ZOjAsXG5cdFx0bWF4WTp3aW5kb3cuaW5uZXJIZWlnaHRcblx0fVxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRlZGl0YWJsZTpSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRoZWlnaHQ6UmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0XHRtYXhZOlJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWluWTpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGdvYWxzOm51bGwsXG5cdFx0XHRyZXdhcmRzOm51bGxcblx0XHR9XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGwuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblxuXHRcdFByb21pc2UuYWxsKFtcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiUmV3YXJkLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpLFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cblx0b25TY3JvbGwoZSl7XG5cdFx0aWYodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XG5cdFx0XHR2YXIge3RvcCxoZWlnaHR9PVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0XHQsYm90dG9tPXRvcCtoZWlnaHRcblx0XHRcdCx7bWluWSxtYXhZLGVkaXRhYmxlfT10aGlzLnByb3BzXG5cdFx0XHQse3BlbmRpbmdHb2FsLCByZXdhcmRvcn09dGhpcy5yZWZzXG5cblx0XHRcdGlmKHBlbmRpbmdHb2FsKXtcblx0XHRcdFx0bGV0IGNsYXNzZXM9UmVhY3RET00uZmluZERPTU5vZGUocGVuZGluZ0dvYWwpLmNsYXNzTGlzdFxuXHRcdFx0XHRsZXQgYWN0PXRvcDw9bWluWSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuXHRcdFx0XHRcInN0aWNreSB0b3AgbGVmdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGE9PmNsYXNzZXNbYWN0XShhKSlcblx0XHRcdH1cblxuXHRcdFx0aWYocmV3YXJkb3Ipe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdERPTS5maW5kRE9NTm9kZShyZXdhcmRvcikuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9KHRvcD5tYXhZIHx8IGJvdHRvbTxtaW5ZKSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXG5cdFx0XHRcdGNsYXNzZXNbYWN0XShcImhpZGVcIilcblx0XHRcdH1cblx0XHR9LDMwMClcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0ZGJSZXdhcmQub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOnRoaXMucHJvcHMuY2hpbGQuX2lkfSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0ZGJSZXdhcmQucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0bGV0IHtjaGlsZDpuZXdDaGlsZH09bmV4dFByb3BzLFxuXHRcdFx0e2NoaWxkfT10aGlzLnByb3BzXG5cblx0XHRpZihjaGlsZCE9bmV3Q2hpbGQpXG5cdFx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDpuZXdDaGlsZC5faWR9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0aWYodGhpcy5yZWZzLnBlbmRpbmdHb2FsKVxuXHRcdFx0dGhpcy5yZWZzLnBlbmRpbmdHb2FsLnNldFN0YXRlKHtyZXdhcmQ6XCJcIix0b3RhbDpcIlwifSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Z29hbHMsIHJld2FyZHMsIG91dFZpZXcsIG91dFRvcH09dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGVkaXRhYmxlLCBzdHlsZT17fX09dGhpcy5wcm9wc1xuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH1cblx0XHRcdFx0XHR0b3RhbD17bWF4PU1hdGgubWF4KG1heCxhLnRvdGFsKSwgYS50b3RhbH0vPilcblxuXHRcdHJld2FyZHM9cmV3YXJkcyAmJiByZXdhcmRzLm1hcChhPT48QVJld2FyZFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259XG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXG5cdFx0aWYoZWRpdGFibGUpe1xuXHRcdFx0YWN0aW9uPSg8UGVuZGluZ0dvYWwgcmVmPVwicGVuZGluZ0dvYWxcIiBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcblx0XHR9ZWxzZSBpZighb3V0Vmlldyl7XG5cdFx0XHRhY3Rpb249KDxSZXdhcmRvciByZWY9XCJyZXdhcmRvclwiIGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25SZXdhcmQ9e2Ftb3VudD0+dGhpcy5yZXdhcmQoYW1vdW50KX0vPilcblx0XHR9XG5cblx0XHRzdHlsZS5oZWlnaHQ9KG1heCtidWYpKmhlaWdodFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZHMgcGFnZVwiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdDxzdmcgY2xhc3NOYW1lPVwiYXJyb3dcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMCAxMFwiPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNMCwxMCBMNSwwIEwxMCwxMFwiIHN0cm9rZS13aWR0aD1cIjAuMlwiLz5cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdHtnb2Fsc31cblxuXHRcdFx0XHR7cmV3YXJkc31cblxuXHRcdFx0XHR7YWN0aW9ufVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cGVuZEdvYWwoZ29hbCl7XG5cdFx0Z29hbC5jaGlsZD10aGlzLnByb3BzLmNoaWxkLl9pZFxuXHRcdGRiR29hbC51cHNlcnQoZ29hbClcblx0fVxuXG5cdHJld2FyZChhbW91bnQpe1xuXHRcdGxldCBuZXdSZXdhcmQ9e2Ftb3VudCwgY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWR9XG5cdFx0ZGJSZXdhcmQudXBzZXJ0KG5ld1Jld2FyZClcblx0fVxuXG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Y3VycmVudCwgYm90dG9tfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbCBwZW5kaW5nXCIgc3R5bGU9e3tib3R0b219fT5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Jld2FyZHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7dGV4dEFsaWduOlwicmlnaHRcIix3aWR0aDpcIjEwMCVcIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcblx0XHRcdFx0XHRcdHZhbHVlPXt0b3RhbHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCI2ZW1cIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHR0cnlQZW5kKHN0YXRlKXtcblx0XHRsZXQge3Jld2FyZDpuZXdSZXdhcmQsIHRvdGFsOm5ld1RvdGFsfT1zdGF0ZVxuXHRcdGxldCB7Y3VycmVudCxvblBlbmRHb2FsfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0aWYobmV3UmV3YXJkKVxuXHRcdFx0cmV3YXJkPW5ld1Jld2FyZFxuXHRcdGlmKG5ld1RvdGFsKVxuXHRcdFx0dG90YWw9bmV3VG90YWxcblx0XHRpZihyZXdhcmQudHJpbSgpICYmIHRvdGFsLnRyaW0oKSl7XG5cdFx0XHR0b3RhbD1wYXJzZUludCh0b3RhbC50cmltKCkpXG5cdFx0XHRpZih0b3RhbD5jdXJyZW50KXtcblx0XHRcdFx0cmV3YXJkPXJld2FyZC50cmltKClcblx0XHRcdFx0b25QZW5kR29hbCh7cmV3YXJkLHRvdGFsfSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0VUkuTWVzc2FnZXIuc2hvdyhgbmV3IGdvYWwgbXVzdCBncmVhdGVyIHRoYW4gY3VycmVudCB0b3RhbCAke2N1cnJlbnR9YClcblx0XHRcdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmdvYWwpLmZvY3VzKClcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkLHRvdGFsfSlcblx0fVxufVxuXG5jbGFzcyBBR29hbCBleHRlbmRzIEl0ZW17XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmV3YXJkLHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCBzdHlsZT17Zm9udFNpemU6XCJ4LXNtYWxsXCIsIHdoaXRlU3BhY2U6XCJub3dyYXBcIixiYWNrZ3JvdW5kQ29sb3I6XCJsaWdodGdyZWVuXCJ9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2PjxBdmF0YXIgc3R5bGU9e3N0eWxlfT57cmV3YXJkfTwvQXZhdGFyPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdj57dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgQVJld2FyZCBleHRlbmRzIEl0ZW17XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e25ld1JlYXNvbjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpudWxsfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGxldCB7cmVhc29ufT10aGlzLnJlZnNcblx0XHRyZWFzb24gJiYgcmVhc29uLmZvY3VzKClcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYobmV3UmVhc29uKXtcblx0XHRcdHJlYXNvbj0oPFRleHRGaWVsZCByZWY9XCJyZWFzb25cIiBkZWZhdWx0VmFsdWU9e25ld1JlYXNvbn1cblx0XHRcdFx0b25FbnRlcktleURvd249e2U9PmUudGFyZ2V0LmJsdXIoKX1cblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XG5cdFx0XHRcdHtyZWFzb258fFwiLi4uXCJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pit7YW1vdW50fS97dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxuXG5cdHJlYXNvbkNoYW5nZWQobmV3UmVhc29uKXtcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHRpZighbmV3UmVhc29uIHx8IG5ld1JlYXNvbj09cmVhc29uKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjp1bmRlZmluZWR9KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG9uUmVhc29uQ2hhbmdlICYmIG9uUmVhc29uQ2hhbmdlKG5ld1JlYXNvbilcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZCdcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uUmV3YXJkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uUmV3YXJkOiBhPT4xXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtwbHVzOjAsdGlja2VyOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1czowLHRpY2tlcjpudWxsfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cGx1c309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGN1cnJlbnR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmQgcGVuZGluZ1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiPlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIGNsYXNzTmFtZT1cInJld2FyZGVyXCIgb25DbGljaz17ZT0+dGhpcy5wbHVzKCl9IC8+XG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YHBsdXMgJHtwbHVzID8gXCJwbHVzaW5nXCIgOiBcIlwifWB9Pit7cGx1c3x8J3gnfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=