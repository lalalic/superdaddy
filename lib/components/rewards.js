"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var Rewards = function (_Component) {
	(0, _inherits3.default)(Rewards, _Component);

	function Rewards() {
		(0, _classCallCheck3.default)(this, Rewards);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Rewards).apply(this, arguments));

		_this.state = {
			goals: null,
			rewards: null
		};
		_this.onChange = _this.onChange.bind(_this);
		_this.onScroll = _this.onScroll.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Rewards, [{
		key: "onChange",
		value: function onChange(condition) {
			var _this2 = this;

			condition = { child: condition.child };

			_promise2.default.all([new _promise2.default(function (resolve, reject) {
				return _db.Reward.find(condition).fetch(resolve, reject);
			}), new _promise2.default(function (resolve, reject) {
				return _db.Goal.find(condition).fetch(resolve, reject);
			})]).then(function (a) {
				var _a = (0, _slicedToArray3.default)(a, 2);

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
			this.onChange({ child: this.context.child._id });
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
		value: function componentWillReceiveProps(nextProps, nextContext) {
			if (this.context.child != nextContext.child) this.onChange({ child: nextContext.child._id });
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
				return _react2.default.createElement(AGoal, {
					key: "goal_" + a.total,
					height: height,
					reward: a.reward,
					total: (max = Math.max(max, a.total), a.total) });
			});

			rewards = rewards && rewards.map(function (a) {
				return _react2.default.createElement(AReward, {
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
				action = _react2.default.createElement(PendingGoal, { ref: "pendingGoal", bottom: (max + buf) * height, current: total, height: height, onPendGoal: function onPendGoal(goal) {
						return _this4.pendGoal(goal);
					} });
			} else if (!outView) {
				action = _react2.default.createElement(Rewardor, { ref: "rewardor", current: total, height: height, onReward: function onReward(amount) {
						return _this4.reward(amount);
					} });
			}

			style.height = (max + buf) * height;
			return _react2.default.createElement(
				"div",
				{ className: "rewards page", style: style },
				_react2.default.createElement(
					"svg",
					{ className: "arrow", width: "100%", height: "100%", viewBox: "0 0 10 10" },
					_react2.default.createElement("path", { d: "M0,10 L5,0 L10,10", "stroke-width": "0.2" })
				),
				goals,
				rewards,
				action
			);
		}
	}, {
		key: "pendGoal",
		value: function pendGoal(goal) {
			goal.child = this.context.child._id;
			_db.Goal.upsert(goal);
		}
	}, {
		key: "reward",
		value: function reward(amount) {
			var newReward = { amount: amount, child: this.context.child._id };
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
}(_react.Component);

Rewards.defaultProps = {
	editable: false,
	height: 20,
	minY: 0,
	maxY: window.innerHeight
};
Rewards.propTypes = {
	editable: _react.PropTypes.bool,
	height: _react.PropTypes.number,
	maxY: _react.PropTypes.number,
	minY: _react.PropTypes.number
};
Rewards.contextTypes = {
	child: _react.PropTypes.object
};
exports.default = Rewards;

var Item = function (_Component2) {
	(0, _inherits3.default)(Item, _Component2);

	function Item() {
		(0, _classCallCheck3.default)(this, Item);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Item).apply(this, arguments));
	}

	return Item;
}(_react.Component);

Item.defaultProps = {
	height: 20
};

var PendingGoal = function (_Item) {
	(0, _inherits3.default)(PendingGoal, _Item);

	function PendingGoal() {
		(0, _classCallCheck3.default)(this, PendingGoal);

		var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PendingGoal).apply(this, arguments));

		_this6.state = {
			reward: "",
			total: ""
		};
		return _this6;
	}

	(0, _createClass3.default)(PendingGoal, [{
		key: "render",
		value: function render() {
			var _this7 = this;

			var _props3 = this.props;
			var current = _props3.current;
			var bottom = _props3.bottom;
			var _state2 = this.state;
			var reward = _state2.reward;
			var total = _state2.total;

			return _react2.default.createElement(
				"div",
				{ className: "goal pending", style: { bottom: bottom } },
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement("input", { onBlur: function onBlur(e) {
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
				_react2.default.createElement(
					"div",
					{ className: "icon" },
					"»"
				),
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement("input", { onBlur: function onBlur(e) {
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
	(0, _inherits3.default)(AGoal, _Item2);

	function AGoal() {
		(0, _classCallCheck3.default)(this, AGoal);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AGoal).apply(this, arguments));
	}

	(0, _createClass3.default)(AGoal, [{
		key: "render",
		value: function render() {
			var _props5 = this.props;
			var reward = _props5.reward;
			var total = _props5.total;
			var height = _props5.height;

			var style = { fontSize: "x-small", whiteSpace: "nowrap", backgroundColor: "lightgreen" };
			return _react2.default.createElement(
				"div",
				{ className: "goal", style: { bottom: height * total } },
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						_materialUi.Avatar,
						{ style: style },
						reward
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "icon" },
					"•"
				),
				_react2.default.createElement(
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
	(0, _inherits3.default)(AReward, _Item3);

	function AReward() {
		(0, _classCallCheck3.default)(this, AReward);

		var _this9 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AReward).apply(this, arguments));

		_this9.state = { newReason: null };
		return _this9;
	}

	(0, _createClass3.default)(AReward, [{
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
				reason = _react2.default.createElement(_materialUi.TextField, { ref: "reason", defaultValue: newReason,
					onEnterKeyDown: function onEnterKeyDown(e) {
						return e.target.blur();
					},
					onBlur: function onBlur(e) {
						return _this10.reasonChanged(e.target.value.trim());
					} });
			}

			return _react2.default.createElement(
				"div",
				{ className: "reward", style: { bottom: height * total } },
				_react2.default.createElement(
					"div",
					{ className: "icon" },
					"•"
				),
				_react2.default.createElement(
					"div",
					{ className: "reason", onClick: function onClick(e) {
							return _this10.setState({ newReason: reason || " " });
						} },
					reason || "..."
				),
				_react2.default.createElement(
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
	(0, _inherits3.default)(Rewardor, _Item4);

	function Rewardor() {
		(0, _classCallCheck3.default)(this, Rewardor);

		var _this11 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Rewardor).apply(this, arguments));

		_this11.state = { plus: 0, ticker: null };
		return _this11;
	}

	(0, _createClass3.default)(Rewardor, [{
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

			return _react2.default.createElement(
				"div",
				{ className: "reward pending" },
				_react2.default.createElement(
					"div",
					{ className: "reason" },
					_react2.default.createElement(_mood2.default, { className: "rewarder", onClick: function onClick(e) {
							return _this12.plus();
						} }),
					_react2.default.createElement(
						"span",
						null,
						current
					),
					_react2.default.createElement(
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
	current: _react.PropTypes.number,
	onReward: _react.PropTypes.func
};
Rewardor.defaultProps = {
	current: 0,
	onReward: function onReward(a) {
		return 1;
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBbVJBOzs7Ozs7SUFqUnFCOzs7QUFrQnBCLFVBbEJvQixPQWtCcEIsR0FBYTtzQ0FsQk8sU0FrQlA7OzJGQWxCTyxxQkFtQlYsWUFERzs7QUFFWixRQUFLLEtBQUwsR0FBVztBQUNWLFVBQU0sSUFBTjtBQUNBLFlBQVEsSUFBUjtHQUZELENBRlk7QUFNWixRQUFLLFFBQUwsR0FBYyxNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWQsQ0FOWTtBQU9aLFFBQUssUUFBTCxHQUFjLE1BQUssUUFBTCxDQUFjLElBQWQsT0FBZCxDQVBZOztFQUFiOzs0QkFsQm9COzsyQkE0QlgsV0FBVTs7O0FBQ2xCLGVBQVUsRUFBQyxPQUFNLFVBQVUsS0FBVixFQUFqQixDQURrQjs7QUFHbEIscUJBQVEsR0FBUixDQUFZLENBQ1gsc0JBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixXQUFTLElBQVQsQ0FBYyxTQUFkLEVBQXlCLEtBQXpCLENBQStCLE9BQS9CLEVBQXVDLE1BQXZDO0lBQWxCLENBREQsRUFFWCxzQkFBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLFNBQU8sSUFBUCxDQUFZLFNBQVosRUFBdUIsS0FBdkIsQ0FBNkIsT0FBN0IsRUFBcUMsTUFBckM7SUFBbEIsQ0FGRCxDQUFaLEVBR0csSUFISCxDQUdRLGFBQUc7MENBQ1csTUFEWDs7UUFDTCxnQkFESztRQUNJLGNBREo7O0FBRVYsV0FBSyxRQUFMLENBQWMsRUFBQyxnQkFBRCxFQUFTLFlBQVQsRUFBZCxFQUZVO0lBQUgsQ0FIUixDQUhrQjs7OzsyQkFZVixHQUFFOzs7QUFDVixPQUFHLEtBQUssWUFBTCxFQUNGLGFBQWEsS0FBSyxZQUFMLENBQWIsQ0FE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ImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IFBsdXNJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkJ1xuaW1wb3J0IEZvcndhcmRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0ZWRpdGFibGU6ZmFsc2UsXG5cdFx0aGVpZ2h0OjIwLFxuXHRcdG1pblk6MCxcblx0XHRtYXhZOndpbmRvdy5pbm5lckhlaWdodFxuXHR9XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGVkaXRhYmxlOlByb3BUeXBlcy5ib29sLFxuXHRcdGhlaWdodDpQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG1heFk6UHJvcFR5cGVzLm51bWJlcixcblx0XHRtaW5ZOlByb3BUeXBlcy5udW1iZXJcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGdvYWxzOm51bGwsXG5cdFx0XHRyZXdhcmRzOm51bGxcblx0XHR9XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGwuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblxuXHRcdFByb21pc2UuYWxsKFtcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiUmV3YXJkLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpLFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cblx0b25TY3JvbGwoZSl7XG5cdFx0aWYodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XG5cdFx0XHR2YXIge3RvcCxoZWlnaHR9PVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0XHQsYm90dG9tPXRvcCtoZWlnaHRcblx0XHRcdCx7bWluWSxtYXhZLGVkaXRhYmxlfT10aGlzLnByb3BzXG5cdFx0XHQse3BlbmRpbmdHb2FsLCByZXdhcmRvcn09dGhpcy5yZWZzXG5cblx0XHRcdGlmKHBlbmRpbmdHb2FsKXtcblx0XHRcdFx0bGV0IGNsYXNzZXM9UmVhY3RET00uZmluZERPTU5vZGUocGVuZGluZ0dvYWwpLmNsYXNzTGlzdFxuXHRcdFx0XHRsZXQgYWN0PXRvcDw9bWluWSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuXHRcdFx0XHRcInN0aWNreSB0b3AgbGVmdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGE9PmNsYXNzZXNbYWN0XShhKSlcblx0XHRcdH1cblxuXHRcdFx0aWYocmV3YXJkb3Ipe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdERPTS5maW5kRE9NTm9kZShyZXdhcmRvcikuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9KHRvcD5tYXhZIHx8IGJvdHRvbTxtaW5ZKSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXG5cdFx0XHRcdGNsYXNzZXNbYWN0XShcImhpZGVcIilcblx0XHRcdH1cblx0XHR9LDMwMClcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0ZGJSZXdhcmQub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOnRoaXMuY29udGV4dC5jaGlsZC5faWR9KVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHRkYlJld2FyZC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG5cdH1cblxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5jb250ZXh0LmNoaWxkIT1uZXh0Q29udGV4dC5jaGlsZClcblx0XHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOm5leHRDb250ZXh0LmNoaWxkLl9pZH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRpZih0aGlzLnJlZnMucGVuZGluZ0dvYWwpXG5cdFx0XHR0aGlzLnJlZnMucGVuZGluZ0dvYWwuc2V0U3RhdGUoe3Jld2FyZDpcIlwiLHRvdGFsOlwiXCJ9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkcywgb3V0Vmlldywgb3V0VG9wfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsZWRpdGFibGUsIHN0eWxlPXt9fT10aGlzLnByb3BzXG5cdFx0bGV0IHRvdGFsPTAsIG1heD0wLCBhY3Rpb249bnVsbCwgYnVmPTdcblx0XHRnb2Fscz1nb2FscyAmJiBnb2Fscy5tYXAoYT0+PEFHb2FsXG5cdFx0XHRcdFx0a2V5PXtgZ29hbF8ke2EudG90YWx9YH1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZXdhcmQ9e2EucmV3YXJkfVxuXHRcdFx0XHRcdHRvdGFsPXttYXg9TWF0aC5tYXgobWF4LGEudG90YWwpLCBhLnRvdGFsfS8+KVxuXG5cdFx0cmV3YXJkcz1yZXdhcmRzICYmIHJld2FyZHMubWFwKGE9PjxBUmV3YXJkXG5cdFx0XHRcdFx0a2V5PXtgcmV3YXJkXyR7dG90YWwrPWEuYW1vdW50fWB9XG5cdFx0XHRcdFx0b25SZWFzb25DaGFuZ2U9e25ld1JlYXNvbj0+dGhpcy5vblJlYXNvbkNoYW5nZShhLG5ld1JlYXNvbil9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmVhc29uPXthLnJlYXNvbn1cblx0XHRcdFx0XHRhbW91bnQ9e2EuYW1vdW50fVxuXHRcdFx0XHRcdHRvdGFsPXt0b3RhbH0vPilcblxuXHRcdG1heD1NYXRoLm1heCh0b3RhbCxtYXgpXG5cblx0XHRpZihlZGl0YWJsZSl7XG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCByZWY9XCJwZW5kaW5nR29hbFwiIGJvdHRvbT17KG1heCtidWYpKmhlaWdodH0gY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblBlbmRHb2FsPXtnb2FsPT50aGlzLnBlbmRHb2FsKGdvYWwpfS8+KVxuXHRcdH1lbHNlIGlmKCFvdXRWaWV3KXtcblx0XHRcdGFjdGlvbj0oPFJld2FyZG9yIHJlZj1cInJld2FyZG9yXCIgY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblJld2FyZD17YW1vdW50PT50aGlzLnJld2FyZChhbW91bnQpfS8+KVxuXHRcdH1cblxuXHRcdHN0eWxlLmhlaWdodD0obWF4K2J1ZikqaGVpZ2h0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkcyBwYWdlXCIgc3R5bGU9e3N0eWxlfT5cblx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJhcnJvd1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCI+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk0wLDEwIEw1LDAgTDEwLDEwXCIgc3Ryb2tlLXdpZHRoPVwiMC4yXCIvPlxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0e2dvYWxzfVxuXG5cdFx0XHRcdHtyZXdhcmRzfVxuXG5cdFx0XHRcdHthY3Rpb259XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwZW5kR29hbChnb2FsKXtcblx0XHRnb2FsLmNoaWxkPXRoaXMuY29udGV4dC5jaGlsZC5faWRcblx0XHRkYkdvYWwudXBzZXJ0KGdvYWwpXG5cdH1cblxuXHRyZXdhcmQoYW1vdW50KXtcblx0XHRsZXQgbmV3UmV3YXJkPXthbW91bnQsIGNoaWxkOnRoaXMuY29udGV4dC5jaGlsZC5faWR9XG5cdFx0ZGJSZXdhcmQudXBzZXJ0KG5ld1Jld2FyZClcblx0fVxuXG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Y3VycmVudCwgYm90dG9tfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbCBwZW5kaW5nXCIgc3R5bGU9e3tib3R0b219fT5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Jld2FyZHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7dGV4dEFsaWduOlwicmlnaHRcIix3aWR0aDpcIjEwMCVcIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcblx0XHRcdFx0XHRcdHZhbHVlPXt0b3RhbHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCI2ZW1cIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHR0cnlQZW5kKHN0YXRlKXtcblx0XHRsZXQge3Jld2FyZDpuZXdSZXdhcmQsIHRvdGFsOm5ld1RvdGFsfT1zdGF0ZVxuXHRcdGxldCB7Y3VycmVudCxvblBlbmRHb2FsfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0aWYobmV3UmV3YXJkKVxuXHRcdFx0cmV3YXJkPW5ld1Jld2FyZFxuXHRcdGlmKG5ld1RvdGFsKVxuXHRcdFx0dG90YWw9bmV3VG90YWxcblx0XHRpZihyZXdhcmQudHJpbSgpICYmIHRvdGFsLnRyaW0oKSl7XG5cdFx0XHR0b3RhbD1wYXJzZUludCh0b3RhbC50cmltKCkpXG5cdFx0XHRpZih0b3RhbD5jdXJyZW50KXtcblx0XHRcdFx0cmV3YXJkPXJld2FyZC50cmltKClcblx0XHRcdFx0b25QZW5kR29hbCh7cmV3YXJkLHRvdGFsfSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0VUkuTWVzc2FnZXIuc2hvdyhgbmV3IGdvYWwgbXVzdCBncmVhdGVyIHRoYW4gY3VycmVudCB0b3RhbCAke2N1cnJlbnR9YClcblx0XHRcdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmdvYWwpLmZvY3VzKClcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkLHRvdGFsfSlcblx0fVxufVxuXG5jbGFzcyBBR29hbCBleHRlbmRzIEl0ZW17XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmV3YXJkLHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCBzdHlsZT17Zm9udFNpemU6XCJ4LXNtYWxsXCIsIHdoaXRlU3BhY2U6XCJub3dyYXBcIixiYWNrZ3JvdW5kQ29sb3I6XCJsaWdodGdyZWVuXCJ9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2PjxBdmF0YXIgc3R5bGU9e3N0eWxlfT57cmV3YXJkfTwvQXZhdGFyPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdj57dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgQVJld2FyZCBleHRlbmRzIEl0ZW17XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e25ld1JlYXNvbjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpudWxsfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGxldCB7cmVhc29ufT10aGlzLnJlZnNcblx0XHRyZWFzb24gJiYgcmVhc29uLmZvY3VzKClcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYobmV3UmVhc29uKXtcblx0XHRcdHJlYXNvbj0oPFRleHRGaWVsZCByZWY9XCJyZWFzb25cIiBkZWZhdWx0VmFsdWU9e25ld1JlYXNvbn1cblx0XHRcdFx0b25FbnRlcktleURvd249e2U9PmUudGFyZ2V0LmJsdXIoKX1cblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XG5cdFx0XHRcdHtyZWFzb258fFwiLi4uXCJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pit7YW1vdW50fS97dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxuXG5cdHJlYXNvbkNoYW5nZWQobmV3UmVhc29uKXtcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHRpZighbmV3UmVhc29uIHx8IG5ld1JlYXNvbj09cmVhc29uKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjp1bmRlZmluZWR9KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG9uUmVhc29uQ2hhbmdlICYmIG9uUmVhc29uQ2hhbmdlKG5ld1JlYXNvbilcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZCdcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uUmV3YXJkOiBQcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uUmV3YXJkOiBhPT4xXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtwbHVzOjAsdGlja2VyOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1czowLHRpY2tlcjpudWxsfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cGx1c309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGN1cnJlbnR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmQgcGVuZGluZ1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiPlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIGNsYXNzTmFtZT1cInJld2FyZGVyXCIgb25DbGljaz17ZT0+dGhpcy5wbHVzKCl9IC8+XG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YHBsdXMgJHtwbHVzID8gXCJwbHVzaW5nXCIgOiBcIlwifWB9Pit7cGx1c3x8J3gnfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=