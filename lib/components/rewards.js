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

		var _this = (0, _possibleConstructorReturn3.default)(this, (Rewards.__proto__ || (0, _getPrototypeOf2.default)(Rewards)).apply(this, arguments));

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
				var _a = (0, _slicedToArray3.default)(a, 2),
				    rewards = _a[0],
				    goals = _a[1];

				_this2.setState({ rewards: rewards, goals: goals });
			});
		}
	}, {
		key: "onScroll",
		value: function onScroll(e) {
			var _this3 = this;

			if (this._scrollTimer) clearTimeout(this._scrollTimer);
			this._scrollTimer = setTimeout(function (e) {
				var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this3).getBoundingClientRect(),
				    top = _ReactDOM$findDOMNode.top,
				    height = _ReactDOM$findDOMNode.height,
				    bottom = top + height,
				    _props = _this3.props,
				    minY = _props.minY,
				    maxY = _props.maxY,
				    editable = _props.editable,
				    _refs = _this3.refs,
				    pendingGoal = _refs.pendingGoal,
				    rewardor = _refs.rewardor;

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

			var _state = this.state,
			    goals = _state.goals,
			    rewards = _state.rewards,
			    outView = _state.outView,
			    outTop = _state.outTop;
			var _props2 = this.props,
			    height = _props2.height,
			    editable = _props2.editable,
			    _props2$style = _props2.style,
			    style = _props2$style === undefined ? {} : _props2$style;

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
		return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
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

		var _this6 = (0, _possibleConstructorReturn3.default)(this, (PendingGoal.__proto__ || (0, _getPrototypeOf2.default)(PendingGoal)).apply(this, arguments));

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

			var _props3 = this.props,
			    current = _props3.current,
			    bottom = _props3.bottom;
			var _state2 = this.state,
			    reward = _state2.reward,
			    total = _state2.total;

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
					"\xBB"
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
			var newReward = state.reward,
			    newTotal = state.total;
			var _props4 = this.props,
			    current = _props4.current,
			    onPendGoal = _props4.onPendGoal;
			var _state3 = this.state,
			    reward = _state3.reward,
			    total = _state3.total;

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
		return (0, _possibleConstructorReturn3.default)(this, (AGoal.__proto__ || (0, _getPrototypeOf2.default)(AGoal)).apply(this, arguments));
	}

	(0, _createClass3.default)(AGoal, [{
		key: "render",
		value: function render() {
			var _props5 = this.props,
			    reward = _props5.reward,
			    total = _props5.total,
			    height = _props5.height;

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
					"\u2022"
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

		var _this9 = (0, _possibleConstructorReturn3.default)(this, (AReward.__proto__ || (0, _getPrototypeOf2.default)(AReward)).apply(this, arguments));

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

			var _props6 = this.props,
			    reason = _props6.reason,
			    amount = _props6.amount,
			    total = _props6.total,
			    height = _props6.height;
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
					"\u2022"
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
			var _props7 = this.props,
			    reason = _props7.reason,
			    onReasonChange = _props7.onReasonChange;

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

		var _this11 = (0, _possibleConstructorReturn3.default)(this, (Rewardor.__proto__ || (0, _getPrototypeOf2.default)(Rewardor)).apply(this, arguments));

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
			var _props8 = this.props,
			    height = _props8.height,
			    current = _props8.current;

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
			var _state4 = this.state,
			    plus = _state4.plus,
			    ticker = _state4.ticker;

			ticker && clearTimeout(ticker);
			plus++;
			ticker = setTimeout(this.reward.bind(this), 1000);
			this.setState({ plus: plus, ticker: ticker });
		}
	}, {
		key: "reward",
		value: function reward() {
			var _state5 = this.state,
			    plus = _state5.plus,
			    ticker = _state5.ticker;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOlsiUmV3YXJkcyIsImFyZ3VtZW50cyIsInN0YXRlIiwiZ29hbHMiLCJyZXdhcmRzIiwib25DaGFuZ2UiLCJiaW5kIiwib25TY3JvbGwiLCJjb25kaXRpb24iLCJjaGlsZCIsImFsbCIsInJlc29sdmUiLCJyZWplY3QiLCJmaW5kIiwiZmV0Y2giLCJ0aGVuIiwiYSIsInNldFN0YXRlIiwiZSIsIl9zY3JvbGxUaW1lciIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJmaW5kRE9NTm9kZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImhlaWdodCIsImJvdHRvbSIsInByb3BzIiwibWluWSIsIm1heFkiLCJlZGl0YWJsZSIsInJlZnMiLCJwZW5kaW5nR29hbCIsInJld2FyZG9yIiwiY2xhc3NlcyIsImNsYXNzTGlzdCIsImFjdCIsInNwbGl0IiwiZm9yRWFjaCIsIm9uIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRleHQiLCJfaWQiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsInJld2FyZCIsInRvdGFsIiwib3V0VmlldyIsIm91dFRvcCIsInN0eWxlIiwibWF4IiwiYWN0aW9uIiwiYnVmIiwibWFwIiwiTWF0aCIsImFtb3VudCIsIm9uUmVhc29uQ2hhbmdlIiwibmV3UmVhc29uIiwicmVhc29uIiwicGVuZEdvYWwiLCJnb2FsIiwidXBzZXJ0IiwibmV3UmV3YXJkIiwiZGVmYXVsdFByb3BzIiwiaW5uZXJIZWlnaHQiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiSXRlbSIsIlBlbmRpbmdHb2FsIiwiY3VycmVudCIsInRyeVBlbmQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRleHRBbGlnbiIsIndpZHRoIiwibmV3VG90YWwiLCJvblBlbmRHb2FsIiwidHJpbSIsInBhcnNlSW50IiwiTWVzc2FnZXIiLCJzaG93IiwiZm9jdXMiLCJBR29hbCIsImZvbnRTaXplIiwid2hpdGVTcGFjZSIsImJhY2tncm91bmRDb2xvciIsIkFSZXdhcmQiLCJibHVyIiwicmVhc29uQ2hhbmdlZCIsInVuZGVmaW5lZCIsIlJld2FyZG9yIiwicGx1cyIsInRpY2tlciIsIm9uUmV3YXJkIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBbVJBOzs7Ozs7SUFqUnFCQSxPOzs7QUFrQnBCLG9CQUFhO0FBQUE7O0FBQUEsdUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXO0FBQ1ZDLFVBQU0sSUFESTtBQUVWQyxZQUFRO0FBRkUsR0FBWDtBQUlBLFFBQUtDLFFBQUwsR0FBYyxNQUFLQSxRQUFMLENBQWNDLElBQWQsT0FBZDtBQUNBLFFBQUtDLFFBQUwsR0FBYyxNQUFLQSxRQUFMLENBQWNELElBQWQsT0FBZDtBQVBZO0FBUVo7Ozs7MkJBRVFFLFMsRUFBVTtBQUFBOztBQUNsQkEsZUFBVSxFQUFDQyxPQUFNRCxVQUFVQyxLQUFqQixFQUFWOztBQUVBLHFCQUFRQyxHQUFSLENBQVksQ0FDWCxzQkFBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQ7QUFBQSxXQUFrQixXQUFTQyxJQUFULENBQWNMLFNBQWQsRUFBeUJNLEtBQXpCLENBQStCSCxPQUEvQixFQUF1Q0MsTUFBdkMsQ0FBbEI7QUFBQSxJQUFaLENBRFcsRUFFWCxzQkFBWSxVQUFDRCxPQUFELEVBQVNDLE1BQVQ7QUFBQSxXQUFrQixTQUFPQyxJQUFQLENBQVlMLFNBQVosRUFBdUJNLEtBQXZCLENBQTZCSCxPQUE3QixFQUFxQ0MsTUFBckMsQ0FBbEI7QUFBQSxJQUFaLENBRlcsQ0FBWixFQUdHRyxJQUhILENBR1EsYUFBRztBQUFBLDBDQUNXQyxDQURYO0FBQUEs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QUFBb0RBLGNBQU07QUFBMUQ7QUFIRDtBQURELElBREQ7QUFTQTs7O3lCQUVLO0FBQUEsaUJBQ2EsS0FBSy9GLEtBRGxCO0FBQUEsT0FDQStGLElBREEsV0FDQUEsSUFEQTtBQUFBLE9BQ0tDLE1BREwsV0FDS0EsTUFETDs7QUFFTEEsYUFBVTlFLGFBQWE4RSxNQUFiLENBQVY7QUFDQUQ7QUFDQUMsWUFBTzdFLFdBQVcsS0FBSzJCLE1BQUwsQ0FBWTFDLElBQVosQ0FBaUIsSUFBakIsQ0FBWCxFQUFrQyxJQUFsQyxDQUFQO0FBQ0EsUUFBS1csUUFBTCxDQUFjLEVBQUNnRixVQUFELEVBQU1DLGNBQU4sRUFBZDtBQUNBOzs7MkJBRU87QUFBQSxpQkFDVyxLQUFLaEcsS0FEaEI7QUFBQSxPQUNGK0YsSUFERSxXQUNGQSxJQURFO0FBQUEsT0FDR0MsTUFESCxXQUNHQSxNQURIOztBQUVQQSxhQUFVOUUsYUFBYThFLE1BQWIsQ0FBVjtBQUNBLFFBQUt2RSxLQUFMLENBQVd3RSxRQUFYLENBQW9CRixJQUFwQjtBQUNBOzs7RUE5Q3FCeEIsSTs7QUFBakJ1QixRLENBQ0U1QixTLEdBQVU7QUFDaEJPLFVBQVEsaUJBQVVMLE1BREY7QUFFaEI2QixXQUFVLGlCQUFVQztBQUZKLEM7QUFEWkosUSxDQU1FOUIsWSxHQUFhO0FBQ25CUyxVQUFRLENBRFc7QUFFbkJ3QixXQUFVO0FBQUEsU0FBRyxDQUFIO0FBQUE7QUFGUyxDIiwiZmlsZSI6InJld2FyZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLWFkZCdcbmltcG9ydCBGb3J3YXJkSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseSwgUmV3YXJkIGFzIGRiUmV3YXJkLCBHb2FsIGFzIGRiR29hbH0gZnJvbSAnLi4vZGInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGVkaXRhYmxlOmZhbHNlLFxuXHRcdGhlaWdodDoyMCxcblx0XHRtaW5ZOjAsXG5cdFx0bWF4WTp3aW5kb3cuaW5uZXJIZWlnaHRcblx0fVxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRlZGl0YWJsZTpQcm9wVHlwZXMuYm9vbCxcblx0XHRoZWlnaHQ6UHJvcFR5cGVzLm51bWJlcixcblx0XHRtYXhZOlByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWluWTpQcm9wVHlwZXMubnVtYmVyXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRnb2FsczpudWxsLFxuXHRcdFx0cmV3YXJkczpudWxsXG5cdFx0fVxuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vblNjcm9sbD10aGlzLm9uU2Nyb2xsLmJpbmQodGhpcylcblx0fVxuXG5cdG9uQ2hhbmdlKGNvbmRpdGlvbil7XG5cdFx0Y29uZGl0aW9uPXtjaGlsZDpjb25kaXRpb24uY2hpbGR9XG5cblx0XHRQcm9taXNlLmFsbChbXG5cdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5kYlJld2FyZC5maW5kKGNvbmRpdGlvbikuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKSxcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiR29hbC5maW5kKGNvbmRpdGlvbikuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxuXHRcdF0pLnRoZW4oYT0+e1xuXHRcdFx0bGV0IFtyZXdhcmRzLCBnb2Fsc109YVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkcyxnb2Fsc30pXG5cdFx0fSlcblx0fVxuXG5cdG9uU2Nyb2xsKGUpe1xuXHRcdGlmKHRoaXMuX3Njcm9sbFRpbWVyKVxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3Njcm9sbFRpbWVyKVxuXHRcdHRoaXMuX3Njcm9sbFRpbWVyPXNldFRpbWVvdXQoZT0+e1xuXHRcdFx0dmFyIHt0b3AsaGVpZ2h0fT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdFx0LGJvdHRvbT10b3AraGVpZ2h0XG5cdFx0XHQse21pblksbWF4WSxlZGl0YWJsZX09dGhpcy5wcm9wc1xuXHRcdFx0LHtwZW5kaW5nR29hbCwgcmV3YXJkb3J9PXRoaXMucmVmc1xuXG5cdFx0XHRpZihwZW5kaW5nR29hbCl7XG5cdFx0XHRcdGxldCBjbGFzc2VzPVJlYWN0RE9NLmZpbmRET01Ob2RlKHBlbmRpbmdHb2FsKS5jbGFzc0xpc3Rcblx0XHRcdFx0bGV0IGFjdD10b3A8PW1pblkgPyBcImFkZFwiIDogXCJyZW1vdmVcIjtcblx0XHRcdFx0XCJzdGlja3kgdG9wIGxlZnRcIi5zcGxpdChcIiBcIikuZm9yRWFjaChhPT5jbGFzc2VzW2FjdF0oYSkpXG5cdFx0XHR9XG5cblx0XHRcdGlmKHJld2FyZG9yKXtcblx0XHRcdFx0bGV0IGNsYXNzZXM9UmVhY3RET00uZmluZERPTU5vZGUocmV3YXJkb3IpLmNsYXNzTGlzdFxuXHRcdFx0XHRsZXQgYWN0PSh0b3A+bWF4WSB8fCBib3R0b208bWluWSkgPyBcImFkZFwiIDogXCJyZW1vdmVcIlxuXHRcdFx0XHRjbGFzc2VzW2FjdF0oXCJoaWRlXCIpXG5cdFx0XHR9XG5cdFx0fSwzMDApXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGRiUmV3YXJkLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHRkYkdvYWwub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcblx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDp0aGlzLmNvbnRleHQuY2hpbGQuX2lkfSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0ZGJSZXdhcmQucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHR9XG5cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuXHRcdGlmKHRoaXMuY29udGV4dC5jaGlsZCE9bmV4dENvbnRleHQuY2hpbGQpXG5cdFx0XHR0aGlzLm9uQ2hhbmdlKHtjaGlsZDpuZXh0Q29udGV4dC5jaGlsZC5faWR9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0aWYodGhpcy5yZWZzLnBlbmRpbmdHb2FsKVxuXHRcdFx0dGhpcy5yZWZzLnBlbmRpbmdHb2FsLnNldFN0YXRlKHtyZXdhcmQ6XCJcIix0b3RhbDpcIlwifSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Z29hbHMsIHJld2FyZHMsIG91dFZpZXcsIG91dFRvcH09dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGVkaXRhYmxlLCBzdHlsZT17fX09dGhpcy5wcm9wc1xuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XG5cdFx0Z29hbHM9Z29hbHMgJiYgZ29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH1cblx0XHRcdFx0XHR0b3RhbD17bWF4PU1hdGgubWF4KG1heCxhLnRvdGFsKSwgYS50b3RhbH0vPilcblxuXHRcdHJld2FyZHM9cmV3YXJkcyAmJiByZXdhcmRzLm1hcChhPT48QVJld2FyZFxuXHRcdFx0XHRcdGtleT17YHJld2FyZF8ke3RvdGFsKz1hLmFtb3VudH1gfVxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJlYXNvbj17YS5yZWFzb259XG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxuXG5cdFx0aWYoZWRpdGFibGUpe1xuXHRcdFx0YWN0aW9uPSg8UGVuZGluZ0dvYWwgcmVmPVwicGVuZGluZ0dvYWxcIiBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcblx0XHR9ZWxzZSBpZighb3V0Vmlldyl7XG5cdFx0XHRhY3Rpb249KDxSZXdhcmRvciByZWY9XCJyZXdhcmRvclwiIGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25SZXdhcmQ9e2Ftb3VudD0+dGhpcy5yZXdhcmQoYW1vdW50KX0vPilcblx0XHR9XG5cblx0XHRzdHlsZS5oZWlnaHQ9KG1heCtidWYpKmhlaWdodFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZHMgcGFnZVwiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdDxzdmcgY2xhc3NOYW1lPVwiYXJyb3dcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxMCAxMFwiPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNMCwxMCBMNSwwIEwxMCwxMFwiIHN0cm9rZS13aWR0aD1cIjAuMlwiLz5cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdHtnb2Fsc31cblxuXHRcdFx0XHR7cmV3YXJkc31cblxuXHRcdFx0XHR7YWN0aW9ufVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cGVuZEdvYWwoZ29hbCl7XG5cdFx0Z29hbC5jaGlsZD10aGlzLmNvbnRleHQuY2hpbGQuX2lkXG5cdFx0ZGJHb2FsLnVwc2VydChnb2FsKVxuXHR9XG5cblx0cmV3YXJkKGFtb3VudCl7XG5cdFx0bGV0IG5ld1Jld2FyZD17YW1vdW50LCBjaGlsZDp0aGlzLmNvbnRleHQuY2hpbGQuX2lkfVxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXG5cdH1cblxuXHRvblJlYXNvbkNoYW5nZShyZXdhcmQsIG5ld1JlYXNvbil7XG5cdFx0cmV3YXJkLnJlYXNvbj1uZXdSZWFzb25cblx0XHRkYlJld2FyZC51cHNlcnQocmV3YXJkKVxuXHR9XG59XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGhlaWdodDoyMFxuXHR9XG59XG5cbmNsYXNzIFBlbmRpbmdHb2FsIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0b25QZW5kR29hbDphPT4xXG5cdH1cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRyZXdhcmQ6XCJcIixcblx0XHRcdHRvdGFsOlwiXCJcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2N1cnJlbnQsIGJvdHRvbX09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWwgcGVuZGluZ1wiIHN0eWxlPXt7Ym90dG9tfX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHZhbHVlPXtyZXdhcmR8fFwiXCJ9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7cmV3YXJkOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJwZW5kaW5nUmV3YXJkXCJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiTmV3IFJld2FyZC4uLlwiXG5cdFx0XHRcdFx0XHRzdHlsZT17e3RleHRBbGlnbjpcInJpZ2h0XCIsd2lkdGg6XCIxMDAlXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mcmFxdW87PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0dHlwZT1cIm51bWJlclwiXG5cdFx0XHRcdFx0XHR2YWx1ZT17dG90YWx8fFwiXCJ9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtgR29hbDo+JHtjdXJyZW50fWB9XG5cdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiNmVtXCJ9fS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0dHJ5UGVuZChzdGF0ZSl7XG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcblx0XHRsZXQge2N1cnJlbnQsb25QZW5kR29hbH09dGhpcy5wcm9wc1xuXHRcdGxldCB7cmV3YXJkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGlmKG5ld1Jld2FyZClcblx0XHRcdHJld2FyZD1uZXdSZXdhcmRcblx0XHRpZihuZXdUb3RhbClcblx0XHRcdHRvdGFsPW5ld1RvdGFsXG5cdFx0aWYocmV3YXJkLnRyaW0oKSAmJiB0b3RhbC50cmltKCkpe1xuXHRcdFx0dG90YWw9cGFyc2VJbnQodG90YWwudHJpbSgpKVxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XG5cdFx0XHRcdHJld2FyZD1yZXdhcmQudHJpbSgpXG5cdFx0XHRcdG9uUGVuZEdvYWwoe3Jld2FyZCx0b3RhbH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFVJLk1lc3NhZ2VyLnNob3coYG5ldyBnb2FsIG11c3QgZ3JlYXRlciB0aGFuIGN1cnJlbnQgdG90YWwgJHtjdXJyZW50fWApXG5cdFx0XHRcdFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5nb2FsKS5mb2N1cygpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgc3R5bGU9e2ZvbnRTaXplOlwieC1zbWFsbFwiLCB3aGl0ZVNwYWNlOlwibm93cmFwXCIsYmFja2dyb3VuZENvbG9yOlwibGlnaHRncmVlblwifVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdj48QXZhdGFyIHN0eWxlPXtzdHlsZX0+e3Jld2FyZH08L0F2YXRhcj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+e3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIEFSZXdhcmQgZXh0ZW5kcyBJdGVte1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtuZXdSZWFzb246bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246bnVsbH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRsZXQge3JlYXNvbn09dGhpcy5yZWZzXG5cdFx0cmVhc29uICYmIHJlYXNvbi5mb2N1cygpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3JlYXNvbixhbW91bnQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHtuZXdSZWFzb259PXRoaXMuc3RhdGVcblxuXHRcdGlmKG5ld1JlYXNvbil7XG5cdFx0XHRyZWFzb249KDxUZXh0RmllbGQgcmVmPVwicmVhc29uXCIgZGVmYXVsdFZhbHVlPXtuZXdSZWFzb259XG5cdFx0XHRcdG9uRW50ZXJLZXlEb3duPXtlPT5lLnRhcmdldC5ibHVyKCl9XG5cdFx0XHRcdG9uQmx1cj17ZT0+dGhpcy5yZWFzb25DaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9Lz4pXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpyZWFzb258fFwiIFwifSl9PlxuXHRcdFx0XHR7cmVhc29ufHxcIi4uLlwifVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj4re2Ftb3VudH0ve3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cblxuXHRyZWFzb25DaGFuZ2VkKG5ld1JlYXNvbil7XG5cdFx0bGV0IHtyZWFzb24sIG9uUmVhc29uQ2hhbmdlfT10aGlzLnByb3BzXG5cdFx0aWYoIW5ld1JlYXNvbiB8fCBuZXdSZWFzb249PXJlYXNvbil7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246dW5kZWZpbmVkfSlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRvblJlYXNvbkNoYW5nZSAmJiBvblJlYXNvbkNoYW5nZShuZXdSZWFzb24pXG5cdH1cbn1cblxuXG5pbXBvcnQgUmV3YXJkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2QnXG5jbGFzcyBSZXdhcmRvciBleHRlbmRzIEl0ZW17XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGN1cnJlbnQ6UHJvcFR5cGVzLm51bWJlcixcblx0XHRvblJld2FyZDogUHJvcFR5cGVzLmZ1bmNcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGN1cnJlbnQ6MCxcblx0XHRvblJld2FyZDogYT0+MVxuXHR9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17cGx1czowLHRpY2tlcjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXM6MCx0aWNrZXI6bnVsbH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3BsdXN9PXRoaXMuc3RhdGVcblx0XHRsZXQge2hlaWdodCxjdXJyZW50fT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkIHBlbmRpbmdcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIj5cblx0XHRcdFx0XHQ8UmV3YXJkSWNvbiBjbGFzc05hbWU9XCJyZXdhcmRlclwiIG9uQ2xpY2s9e2U9PnRoaXMucGx1cygpfSAvPlxuXHRcdFx0XHRcdDxzcGFuPntjdXJyZW50fTwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2BwbHVzICR7cGx1cyA/IFwicGx1c2luZ1wiIDogXCJcIn1gfT4re3BsdXN8fCd4J308L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cGx1cygpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHRwbHVzKytcblx0XHR0aWNrZXI9c2V0VGltZW91dCh0aGlzLnJld2FyZC5iaW5kKHRoaXMpLDEwMDApXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1cyx0aWNrZXJ9KVxuXHR9XG5cblx0cmV3YXJkKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHRoaXMucHJvcHMub25SZXdhcmQocGx1cylcblx0fVxufVxuIl19