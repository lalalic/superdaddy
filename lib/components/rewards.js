"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rewards = function (_Component) {
	_inherits(Rewards, _Component);

	function Rewards() {
		_classCallCheck(this, Rewards);

		var _this = _possibleConstructorReturn(this, (Rewards.__proto__ || Object.getPrototypeOf(Rewards)).apply(this, arguments));

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
				var _a = _slicedToArray(a, 2),
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
					var classes = _reactDom2.default.findDOMNode(rewardor).classList;
					var act = top > maxY || bottom < minY ? "add" : "remove";
					classes[act]("hide");
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
	_inherits(Item, _Component2);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
	}

	return Item;
}(_react.Component);

Item.defaultProps = {
	height: 20
};

var PendingGoal = function (_Item) {
	_inherits(PendingGoal, _Item);

	function PendingGoal() {
		_classCallCheck(this, PendingGoal);

		var _this6 = _possibleConstructorReturn(this, (PendingGoal.__proto__ || Object.getPrototypeOf(PendingGoal)).apply(this, arguments));

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
	_inherits(AGoal, _Item2);

	function AGoal() {
		_classCallCheck(this, AGoal);

		return _possibleConstructorReturn(this, (AGoal.__proto__ || Object.getPrototypeOf(AGoal)).apply(this, arguments));
	}

	_createClass(AGoal, [{
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
	_inherits(AReward, _Item3);

	function AReward() {
		_classCallCheck(this, AReward);

		var _this9 = _possibleConstructorReturn(this, (AReward.__proto__ || Object.getPrototypeOf(AReward)).apply(this, arguments));

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
	_inherits(Rewardor, _Item4);

	function Rewardor() {
		_classCallCheck(this, Rewardor);

		var _this11 = _possibleConstructorReturn(this, (Rewardor.__proto__ || Object.getPrototypeOf(Rewardor)).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOlsiUmV3YXJkcyIsImFyZ3VtZW50cyIsInN0YXRlIiwiZ29hbHMiLCJyZXdhcmRzIiwib25DaGFuZ2UiLCJiaW5kIiwib25TY3JvbGwiLCJjb25kaXRpb24iLCJjaGlsZCIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImZldGNoIiwidGhlbiIsImEiLCJzZXRTdGF0ZSIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJoZWlnaHQiLCJib3R0b20iLCJwcm9wcyIsIm1pblkiLCJtYXhZIiwiZWRpdGFibGUiLCJyZWZzIiwicGVuZGluZ0dvYWwiLCJyZXdhcmRvciIsImNsYXNzZXMiLCJjbGFzc0xpc3QiLCJhY3QiLCJzcGxpdCIsImZvckVhY2giLCJvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250ZXh0IiwiX2lkIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyZXdhcmQiLCJ0b3RhbCIsIm91dFZpZXciLCJvdXRUb3AiLCJzdHlsZSIsIm1heCIsImFjdGlvbiIsImJ1ZiIsIm1hcCIsIk1hdGgiLCJhbW91bnQiLCJvblJlYXNvbkNoYW5nZSIsIm5ld1JlYXNvbiIsInJlYXNvbiIsInBlbmRHb2FsIiwiZ29hbCIsInVwc2VydCIsIm5ld1Jld2FyZCIsImRlZmF1bHRQcm9wcyIsImlubmVySGVpZ2h0IiwicHJvcFR5cGVzIiwiYm9vbCIsIm51bWJlciIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkl0ZW0iLCJQZW5kaW5nR29hbCIsImN1cnJlbnQiLCJ0cnlQZW5kIiwidGFyZ2V0IiwidmFsdWUiLCJ0ZXh0QWxpZ24iLCJ3aWR0aCIsIm5ld1RvdGFsIiwib25QZW5kR29hbCIsInRyaW0iLCJwYXJzZUludCIsIk1lc3NhZ2VyIiwic2hvdyIsImZvY3VzIiwiQUdvYWwiLCJmb250U2l6ZSIsIndoaXRlU3BhY2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJBUmV3YXJkIiwiYmx1ciIsInJlYXNvbkNoYW5nZWQiLCJ1bmRlZmluZWQiLCJSZXdhcmRvciIsInBsdXMiLCJ0aWNrZXIiLCJvblJld2FyZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQW1SQTs7Ozs7Ozs7Ozs7O0lBalJxQkEsTzs7O0FBa0JwQixvQkFBYTtBQUFBOztBQUFBLGlIQUNIQyxTQURHOztBQUVaLFFBQUtDLEtBQUwsR0FBVztBQUNWQyxVQUFNLElBREk7QUFFVkMsWUFBUTtBQUZFLEdBQVg7QUFJQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLE9BQWQ7QUFDQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjRCxJQUFkLE9BQWQ7QUFQWTtBQVFaOzs7OzJCQUVRRSxTLEVBQVU7QUFBQTs7QUFDbEJBLGVBQVUsRUFBQ0MsT0FBTUQsVUFBVUMsS0FBakIsRUFBVjs7QUFFQUMsV0FBUUMsR0FBUixDQUFZLENBQ1gsSUFBSUQsT0FBSixDQUFZLFVBQUNFLE9BQUQsRUFBU0MsTUFBVDtBQUFBLFdBQWtCLFdBQVNDLElBQVQsQ0FBY04sU0FBZCxFQUF5Qk8sS0FBekIsQ0FBK0JILE9BQS9CLEVBQXVDQyxNQUF2QyxDQUFsQjtBQUFBLElBQVosQ0FEVyxFQUVYLElBQUlILE9BQUosQ0FBWSxVQUFDRSxPQUFELEVBQVNDLE1BQVQ7QUFBQSxXQUFrQixTQUFPQyxJQUFQLENBQVlOLFNBQVosRUFBdUJPLEtBQXZCLENBQTZCSCxPQUE3QixFQUFxQ0MsTUFBckMsQ0FBbEI7QUFBQSxJQUFaLENBRlcsQ0FBWixFQUdHRyxJQUhILENBR1EsYUFBRztBQUFBLDRCQUNXQyxDQURYO0FBQUEsUUFDTGIsT0FESztBQUFBLFFBQ0lELEtBREo7O0FBRVYsV0FBS2UsUUFBTCxDQUFjLEVBQUNkLGdCQUFELEVBQVNELFlBQVQsRUFBZDtBQUNBLElBTkQ7QUFPQTs7OzJCQUVRZ0IsQyxFQUFFO0FBQUE7O0FBQ1YsT0FBRyxLQUFLQyxZQUFSLEVBQ0NDLGFBQWEsS0FBS0QsWUFBbEI7QUFDRCxRQUFLQSxZQUFMLEdBQWtCRSxXQUFXLGFBQUc7QUFBQSxnQ0FDZCxtQkFBU0MsV0FBVCxTQUEyQkMscUJBQTNCLEVBRGM7QUFBQSxRQUMxQkMsR0FEMEIseUJBQzFCQSxHQUQwQjtBQUFBLFFBQ3RCQyxNQURzQix5QkFDdEJBLE1BRHNCO0FBQUEsUUFFOUJDLE1BRjhCLEdBRXZCRixNQUFJQyxNQUZtQjtBQUFBLGlCQUdULE9BQUtFLEtBSEk7QUFBQSxRQUc3QkMsSUFINkIsVUFHN0JBLElBSDZCO0FBQUEsUUFHeEJDLElBSHdCLFVBR3hCQSxJQUh3QjtBQUFBLFFBR25CQyxRQUhtQixVQUduQkEsUUFIbUI7QUFBQSxnQkFJTixPQUFLQyxJQUpDO0FBQUEsUUFJN0JDLFdBSjZCLFNBSTdCQSxXQUo2QjtBQUFBLFFBSWhCQyxRQUpnQixTQUloQkEsUUFKZ0I7O0FBTS9CLFFBQUdELFdBQUgsRUFBZTtBQUFBO0FBQ2QsVUFBSUUsVUFBUSxtQkFBU1osV0FBVCxDQUFxQlUsV0FBckIsRUFBa0NHLFNBQTlDO0FBQ0EsVUFBSUMsTUFBSVosT0FBS0ksSUFBTCxHQUFZLEtBQVosR0FBb0IsUUFBNUI7QUFDQSx3QkFBa0JTLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCQyxPQUE3QixDQUFxQztBQUFBLGNBQUdKLFFBQVFFLEdBQVIsRUFBYXBCLENBQWIsQ0FBSDtBQUFBLE9BQXJDO0FBSGM7QUFJZDs7QUFFRCxRQUFHaUIsUUFBSCxFQUFZO0FBQ1gsU0FBSUMsVUFBUSxtQkFBU1osV0FBVCxDQUFxQlcsUUFBckIsRUFBK0JFLFNBQTNDO0FBQ0EsU0FBSUMsTUFBS1osTUFBSUssSUFBSixJQUFZSCxTQUFPRSxJQUFwQixHQUE0QixLQUE1QixHQUFvQyxRQUE1QztBQUNBTSxhQUFRRSxHQUFSLEVBQWEsTUFBYjtBQUNBO0FBQ0QsSUFqQmlCLEVBaUJoQixHQWpCZ0IsQ0FBbEI7QUFrQkE7OztzQ0FFa0I7QUFDbEIsY0FBU0csRUFBVCxDQUFZLFVBQVosRUFBd0IsS0FBS25DLFFBQTdCO0FBQ0EsWUFBT21DLEVBQVAsQ0FBVSxVQUFWLEVBQXNCLEtBQUtuQyxRQUEzQjtBQUNBb0MsVUFBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBaUMsS0FBS25DLFFBQXRDO0FBQ0EsUUFBS0YsUUFBTCxDQUFjLEVBQUNJLE9BQU0sS0FBS2tDLE9BQUwsQ0FBYWxDLEtBQWIsQ0FBbUJtQyxHQUExQixFQUFkO0FBQ0E7Ozt5Q0FFcUI7QUFDckIsY0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFLeEMsUUFBekM7QUFDQSxZQUFPd0MsY0FBUCxDQUFzQixVQUF0QixFQUFrQyxLQUFLeEMsUUFBdkM7QUFDQW9DLFVBQU9LLG1CQUFQLENBQTJCLFFBQTNCLEVBQW9DLEtBQUt2QyxRQUF6QztBQUNBOzs7NENBR3lCd0MsUyxFQUFXQyxXLEVBQVk7QUFDaEQsT0FBRyxLQUFLTCxPQUFMLENBQWFsQyxLQUFiLElBQW9CdUMsWUFBWXZDLEtBQW5DLEVBQ0MsS0FBS0osUUFBTCxDQUFjLEVBQUNJLE9BQU11QyxZQUFZdkMsS0FBWixDQUFrQm1DLEdBQXpCLEVBQWQ7QUFDRDs7O3VDQUVtQjtBQUNuQixPQUFHLEtBQUtaLElBQUwsQ0FBVUMsV0FBYixFQUNDLEtBQUtELElBQUwsQ0FBVUMsV0FBVixDQUFzQmYsUUFBdEIsQ0FBK0IsRUFBQytCLFFBQU8sRUFBUixFQUFXQyxPQUFNLEVBQWpCLEVBQS9CO0FBQ0Q7OzsyQkFFTztBQUFBOztBQUFBLGdCQUMrQixLQUFLaEQsS0FEcEM7QUFBQSxPQUNGQyxLQURFLFVBQ0ZBLEtBREU7QUFBQSxPQUNLQyxPQURMLFVBQ0tBLE9BREw7QUFBQSxPQUNjK0MsT0FEZCxVQUNjQSxPQURkO0FBQUEsT0FDdUJDLE1BRHZCLFVBQ3VCQSxNQUR2QjtBQUFBLGlCQUV5QixLQUFLeEIsS0FGOUI7QUFBQSxPQUVGRixNQUZFLFdBRUZBLE1BRkU7QUFBQSxPQUVLSyxRQUZMLFdBRUtBLFFBRkw7QUFBQSwrQkFFZXNCLEtBRmY7QUFBQSxPQUVlQSxLQUZmLGlDQUVxQixFQUZyQjs7QUFHUCxPQUFJSCxRQUFNLENBQVY7QUFBQSxPQUFhSSxNQUFJLENBQWpCO0FBQUEsT0FBb0JDLFNBQU8sSUFBM0I7QUFBQSxPQUFpQ0MsTUFBSSxDQUFyQztBQUNBckQsV0FBTUEsU0FBU0EsTUFBTXNELEdBQU4sQ0FBVTtBQUFBLFdBQUcsOEJBQUMsS0FBRDtBQUN6QixvQkFBYXhDLEVBQUVpQyxLQURVO0FBRXpCLGFBQVF4QixNQUZpQjtBQUd6QixhQUFRVCxFQUFFZ0MsTUFIZTtBQUl6QixhQUFPSyxNQUFJSSxLQUFLSixHQUFMLENBQVNBLEdBQVQsRUFBYXJDLEVBQUVpQyxLQUFmLENBQUosRUFBMkJqQyxFQUFFaUMsS0FBcEMsQ0FKeUIsR0FBSDtBQUFBLElBQVYsQ0FBZjs7QUFNQTlDLGFBQVFBLFdBQVdBLFFBQVFxRCxHQUFSLENBQVk7QUFBQSxXQUFHLDhCQUFDLE9BQUQ7QUFDL0IsdUJBQWVQLFNBQU9qQyxFQUFFMEMsTUFBeEIsQ0FEK0I7QUFFL0IscUJBQWdCO0FBQUEsYUFBVyxPQUFLQyxjQUFMLENBQW9CM0MsQ0FBcEIsRUFBc0I0QyxTQUF0QixDQUFYO0FBQUEsTUFGZTtBQUcvQixhQUFRbkMsTUFIdUI7QUFJL0IsYUFBUVQsRUFBRTZDLE1BSnFCO0FBSy9CLGFBQVE3QyxFQUFFMEMsTUFMcUI7QUFNL0IsWUFBT1QsS0FOd0IsR0FBSDtBQUFBLElBQVosQ0FBbkI7O0FBUUFJLFNBQUlJLEtBQUtKLEdBQUwsQ0FBU0osS0FBVCxFQUFlSSxHQUFmLENBQUo7O0FBRUEsT0FBR3ZCLFFBQUgsRUFBWTtBQUNYd0IsYUFBUSw4QkFBQyxXQUFELElBQWEsS0FBSSxhQUFqQixFQUErQixRQUFRLENBQUNELE1BQUlFLEdBQUwsSUFBVTlCLE1BQWpELEVBQXlELFNBQVN3QixLQUFsRSxFQUF5RSxRQUFReEIsTUFBakYsRUFBeUYsWUFBWTtBQUFBLGFBQU0sT0FBS3FDLFFBQUwsQ0FBY0MsSUFBZCxDQUFOO0FBQUEsTUFBckcsR0FBUjtBQUNBLElBRkQsTUFFTSxJQUFHLENBQUNiLE9BQUosRUFBWTtBQUNqQkksYUFBUSw4QkFBQyxRQUFELElBQVUsS0FBSSxVQUFkLEVBQXlCLFNBQVNMLEtBQWxDLEVBQXlDLFFBQVF4QixNQUFqRCxFQUF5RCxVQUFVO0FBQUEsYUFBUSxPQUFLdUIsTUFBTCxDQUFZVSxNQUFaLENBQVI7QUFBQSxNQUFuRSxHQUFSO0FBQ0E7O0FBRUROLFNBQU0zQixNQUFOLEdBQWEsQ0FBQzRCLE1BQUlFLEdBQUwsSUFBVTlCLE1BQXZCO0FBQ0EsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLGNBQWYsRUFBOEIsT0FBTzJCLEtBQXJDO0FBQ0M7QUFBQTtBQUFBLE9BQUssV0FBVSxPQUFmLEVBQXVCLE9BQU0sTUFBN0IsRUFBb0MsUUFBTyxNQUEzQyxFQUFrRCxTQUFRLFdBQTFEO0FBQ0MsNkNBQU0sR0FBRSxtQkFBUixFQUE0QixnQkFBYSxLQUF6QztBQURELEtBREQ7QUFJRWxELFNBSkY7QUFNRUMsV0FORjtBQVFFbUQ7QUFSRixJQUREO0FBWUE7OzsyQkFFUVMsSSxFQUFLO0FBQ2JBLFFBQUt2RCxLQUFMLEdBQVcsS0FBS2tDLE9BQUwsQ0FBYWxDLEtBQWIsQ0FBbUJtQyxHQUE5QjtBQUNBLFlBQU9xQixNQUFQLENBQWNELElBQWQ7QUFDQTs7O3lCQUVNTCxNLEVBQU87QUFDYixPQUFJTyxZQUFVLEVBQUNQLGNBQUQsRUFBU2xELE9BQU0sS0FBS2tDLE9BQUwsQ0FBYWxDLEtBQWIsQ0FBbUJtQyxHQUFsQyxFQUFkO0FBQ0EsY0FBU3FCLE1BQVQsQ0FBZ0JDLFNBQWhCO0FBQ0E7OztpQ0FFY2pCLE0sRUFBUVksUyxFQUFVO0FBQ2hDWixVQUFPYSxNQUFQLEdBQWNELFNBQWQ7QUFDQSxjQUFTSSxNQUFULENBQWdCaEIsTUFBaEI7QUFDQTs7Ozs7O0FBN0ltQmpELE8sQ0FDYm1FLFksR0FBYTtBQUNuQnBDLFdBQVMsS0FEVTtBQUVuQkwsU0FBTyxFQUZZO0FBR25CRyxPQUFLLENBSGM7QUFJbkJDLE9BQUtXLE9BQU8yQjtBQUpPLEM7QUFEQXBFLE8sQ0FPYnFFLFMsR0FBVTtBQUNoQnRDLFdBQVMsaUJBQVV1QyxJQURIO0FBRWhCNUMsU0FBTyxpQkFBVTZDLE1BRkQ7QUFHaEJ6QyxPQUFLLGlCQUFVeUMsTUFIQztBQUloQjFDLE9BQUssaUJBQVUwQztBQUpDLEM7QUFQR3ZFLE8sQ0FjYndFLFksR0FBYTtBQUNuQi9ELFFBQU8saUJBQVVnRTtBQURFLEM7a0JBZEF6RSxPOztJQWdKZjBFLEk7Ozs7Ozs7Ozs7OztBQUFBQSxJLENBQ0VQLFksR0FBYTtBQUNuQnpDLFNBQU87QUFEWSxDOztJQUtmaUQsVzs7O0FBSUwsd0JBQWE7QUFBQTs7QUFBQSwwSEFDSDFFLFNBREc7O0FBRVosU0FBS0MsS0FBTCxHQUFXO0FBQ1YrQyxXQUFPLEVBREc7QUFFVkMsVUFBTTtBQUZJLEdBQVg7QUFGWTtBQU1aOzs7OzJCQUVPO0FBQUE7O0FBQUEsaUJBQ2UsS0FBS3RCLEtBRHBCO0FBQUEsT0FDRmdELE9BREUsV0FDRkEsT0FERTtBQUFBLE9BQ09qRCxNQURQLFdBQ09BLE1BRFA7QUFBQSxpQkFFYSxLQUFLekIsS0FGbEI7QUFBQSxPQUVGK0MsTUFGRSxXQUVGQSxNQUZFO0FBQUEsT0FFTUMsS0FGTixXQUVNQSxLQUZOOztBQUdQLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxjQUFmLEVBQThCLE9BQU8sRUFBQ3ZCLGNBQUQsRUFBckM7QUFDQztBQUFBO0FBQUE7QUFDQyw4Q0FBTyxRQUFRO0FBQUEsY0FBRyxPQUFLa0QsT0FBTCxDQUFhLEVBQUM1QixRQUFPOUIsRUFBRTJELE1BQUYsQ0FBU0MsS0FBakIsRUFBYixDQUFIO0FBQUEsT0FBZjtBQUNDLGFBQU85QixVQUFRLEVBRGhCO0FBRUMsZ0JBQVU7QUFBQSxjQUFHLE9BQUsvQixRQUFMLENBQWMsRUFBQytCLFFBQU85QixFQUFFMkQsTUFBRixDQUFTQyxLQUFqQixFQUFkLENBQUg7QUFBQSxPQUZYO0FBR0MsaUJBQVUsZUFIWDtBQUlDLG1CQUFZLGVBSmI7QUFLQyxhQUFPLEVBQUNDLFdBQVUsT0FBWCxFQUFtQkMsT0FBTSxNQUF6QixFQUxSO0FBREQsS0FERDtBQVNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsTUFBZjtBQUFBO0FBQUEsS0FURDtBQVVDO0FBQUE7QUFBQTtBQUNDLDhDQUFPLFFBQVE7QUFBQSxjQUFHLE9BQUtKLE9BQUwsQ0FBYSxFQUFDM0IsT0FBTS9CLEVBQUUyRCxNQUFGLENBQVNDLEtBQWhCLEVBQWIsQ0FBSDtBQUFBLE9BQWY7QUFDQyxZQUFLLFFBRE47QUFFQyxhQUFPN0IsU0FBTyxFQUZmO0FBR0MsZ0JBQVU7QUFBQSxjQUFHLE9BQUtoQyxRQUFMLENBQWMsRUFBQ2dDLE9BQU0vQixFQUFFMkQsTUFBRixDQUFTQyxLQUFoQixFQUFkLENBQUg7QUFBQSxPQUhYO0FBSUMsOEJBQXNCSCxPQUp2QjtBQUtDLGFBQU8sRUFBQ0ssT0FBTSxLQUFQLEVBTFI7QUFERDtBQVZELElBREQ7QUFxQkE7OzswQkFFTy9FLEssRUFBTTtBQUFBLE9BQ0RnRSxTQURDLEdBQzBCaEUsS0FEMUIsQ0FDUitDLE1BRFE7QUFBQSxPQUNnQmlDLFFBRGhCLEdBQzBCaEYsS0FEMUIsQ0FDVWdELEtBRFY7QUFBQSxpQkFFWSxLQUFLdEIsS0FGakI7QUFBQSxPQUVSZ0QsT0FGUSxXQUVSQSxPQUZRO0FBQUEsT0FFQU8sVUFGQSxXQUVBQSxVQUZBO0FBQUEsaUJBR08sS0FBS2pGLEtBSFo7QUFBQSxPQUdSK0MsTUFIUSxXQUdSQSxNQUhRO0FBQUEsT0FHQUMsS0FIQSxXQUdBQSxLQUhBOztBQUliLE9BQUdnQixTQUFILEVBQ0NqQixTQUFPaUIsU0FBUDtBQUNELE9BQUdnQixRQUFILEVBQ0NoQyxRQUFNZ0MsUUFBTjtBQUNELE9BQUdqQyxPQUFPbUMsSUFBUCxNQUFpQmxDLE1BQU1rQyxJQUFOLEVBQXBCLEVBQWlDO0FBQ2hDbEMsWUFBTW1DLFNBQVNuQyxNQUFNa0MsSUFBTixFQUFULENBQU47QUFDQSxRQUFHbEMsUUFBTTBCLE9BQVQsRUFBaUI7QUFDaEIzQixjQUFPQSxPQUFPbUMsSUFBUCxFQUFQO0FBQ0FELGdCQUFXLEVBQUNsQyxjQUFELEVBQVFDLFlBQVIsRUFBWDtBQUNBO0FBQ0EsS0FKRCxNQUlLO0FBQ0osaUJBQUdvQyxRQUFILENBQVlDLElBQVosK0NBQTZEWCxPQUE3RDtBQUNBLHdCQUFTckQsV0FBVCxDQUFxQixLQUFLUyxJQUFMLENBQVVnQyxJQUEvQixFQUFxQ3dCLEtBQXJDO0FBQ0E7QUFDRDtBQUNELFFBQUt0RSxRQUFMLENBQWMsRUFBQytCLGNBQUQsRUFBUUMsWUFBUixFQUFkO0FBQ0E7Ozs7RUExRHdCd0IsSTs7QUFBcEJDLFcsQ0FDRVIsWSxHQUFhO0FBQ25CZ0IsYUFBVztBQUFBLFNBQUcsQ0FBSDtBQUFBO0FBRFEsQzs7SUE0RGZNLEs7Ozs7Ozs7Ozs7OzJCQUNHO0FBQUEsaUJBQ21CLEtBQUs3RCxLQUR4QjtBQUFBLE9BQ0ZxQixNQURFLFdBQ0ZBLE1BREU7QUFBQSxPQUNLQyxLQURMLFdBQ0tBLEtBREw7QUFBQSxPQUNXeEIsTUFEWCxXQUNXQSxNQURYOztBQUVQLE9BQUkyQixRQUFNLEVBQUNxQyxVQUFTLFNBQVYsRUFBcUJDLFlBQVcsUUFBaEMsRUFBeUNDLGlCQUFnQixZQUF6RCxFQUFWO0FBQ0EsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLE1BQWYsRUFBc0IsT0FBTyxFQUFDakUsUUFBT0QsU0FBT3dCLEtBQWYsRUFBN0I7QUFDQztBQUFBO0FBQUE7QUFBSztBQUFBO0FBQUEsUUFBUSxPQUFPRyxLQUFmO0FBQXVCSjtBQUF2QjtBQUFMLEtBREQ7QUFFQztBQUFBO0FBQUEsT0FBSyxXQUFVLE1BQWY7QUFBQTtBQUFBLEtBRkQ7QUFHQztBQUFBO0FBQUE7QUFBTUM7QUFBTjtBQUhELElBREQ7QUFPQTs7OztFQVhrQndCLEk7O0lBY2RtQixPOzs7QUFDTCxvQkFBYTtBQUFBOztBQUFBLGtIQUNINUYsU0FERzs7QUFFWixTQUFLQyxLQUFMLEdBQVcsRUFBQzJELFdBQVUsSUFBWCxFQUFYO0FBRlk7QUFHWjs7Ozs4Q0FFMEI7QUFDMUIsUUFBSzNDLFFBQUwsQ0FBYyxFQUFDMkMsV0FBVSxJQUFYLEVBQWQ7QUFDQTs7O3VDQUVtQjtBQUFBLE9BQ2RDLE1BRGMsR0FDTixLQUFLOUIsSUFEQyxDQUNkOEIsTUFEYzs7QUFFbkJBLGFBQVVBLE9BQU8wQixLQUFQLEVBQVY7QUFDQTs7OzJCQUVPO0FBQUE7O0FBQUEsaUJBQzBCLEtBQUs1RCxLQUQvQjtBQUFBLE9BQ0ZrQyxNQURFLFdBQ0ZBLE1BREU7QUFBQSxPQUNLSCxNQURMLFdBQ0tBLE1BREw7QUFBQSxPQUNZVCxLQURaLFdBQ1lBLEtBRFo7QUFBQSxPQUNrQnhCLE1BRGxCLFdBQ2tCQSxNQURsQjtBQUFBLE9BRUZtQyxTQUZFLEdBRVMsS0FBSzNELEtBRmQsQ0FFRjJELFNBRkU7OztBQUlQLE9BQUdBLFNBQUgsRUFBYTtBQUNaQyxhQUFRLHVEQUFXLEtBQUksUUFBZixFQUF3QixjQUFjRCxTQUF0QztBQUNQLHFCQUFnQjtBQUFBLGFBQUcxQyxFQUFFMkQsTUFBRixDQUFTZ0IsSUFBVCxFQUFIO0FBQUEsTUFEVDtBQUVQLGFBQVE7QUFBQSxhQUFHLFFBQUtDLGFBQUwsQ0FBbUI1RSxFQUFFMkQsTUFBRixDQUFTQyxLQUFULENBQWVLLElBQWYsRUFBbkIsQ0FBSDtBQUFBLE1BRkQsR0FBUjtBQUdBOztBQUVELFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxRQUFmLEVBQXdCLE9BQU8sRUFBQ3pELFFBQU9ELFNBQU93QixLQUFmLEVBQS9CO0FBQ0M7QUFBQTtBQUFBLE9BQUssV0FBVSxNQUFmO0FBQUE7QUFBQSxLQUREO0FBRUM7QUFBQTtBQUFBLE9BQUssV0FBVSxRQUFmLEVBQXdCLFNBQVM7QUFBQSxjQUFHLFFBQUtoQyxRQUFMLENBQWMsRUFBQzJDLFdBQVVDLFVBQVEsR0FBbkIsRUFBZCxDQUFIO0FBQUEsT0FBakM7QUFDQ0EsZUFBUTtBQURULEtBRkQ7QUFLQztBQUFBO0FBQUE7QUFBQTtBQUFPSCxXQUFQO0FBQUE7QUFBZ0JUO0FBQWhCO0FBTEQsSUFERDtBQVNBOzs7Z0NBRWFXLFMsRUFBVTtBQUFBLGlCQUNNLEtBQUtqQyxLQURYO0FBQUEsT0FDbEJrQyxNQURrQixXQUNsQkEsTUFEa0I7QUFBQSxPQUNWRixjQURVLFdBQ1ZBLGNBRFU7O0FBRXZCLE9BQUcsQ0FBQ0MsU0FBRCxJQUFjQSxhQUFXQyxNQUE1QixFQUFtQztBQUNsQyxTQUFLNUMsUUFBTCxDQUFjLEVBQUMyQyxXQUFVbUMsU0FBWCxFQUFkO0FBQ0E7QUFDQTs7QUFFRHBDLHFCQUFrQkEsZUFBZUMsU0FBZixDQUFsQjtBQUNBOzs7O0VBNUNvQmEsSTs7SUFpRGhCdUIsUTs7O0FBV0wscUJBQWE7QUFBQTs7QUFBQSxxSEFDSGhHLFNBREc7O0FBRVosVUFBS0MsS0FBTCxHQUFXLEVBQUNnRyxNQUFLLENBQU4sRUFBUUMsUUFBTyxJQUFmLEVBQVg7QUFGWTtBQUdaOzs7OzhDQUUwQjtBQUMxQixRQUFLakYsUUFBTCxDQUFjLEVBQUNnRixNQUFLLENBQU4sRUFBUUMsUUFBTyxJQUFmLEVBQWQ7QUFDQTs7OzJCQUVPO0FBQUE7O0FBQUEsT0FDRkQsSUFERSxHQUNJLEtBQUtoRyxLQURULENBQ0ZnRyxJQURFO0FBQUEsaUJBRWMsS0FBS3RFLEtBRm5CO0FBQUEsT0FFRkYsTUFGRSxXQUVGQSxNQUZFO0FBQUEsT0FFS2tELE9BRkwsV0FFS0EsT0FGTDs7QUFHUCxVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsZ0JBQWY7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLFFBQWY7QUFDQyxxREFBWSxXQUFVLFVBQXRCLEVBQWlDLFNBQVM7QUFBQSxjQUFHLFFBQUtzQixJQUFMLEVBQUg7QUFBQSxPQUExQyxHQUREO0FBRUM7QUFBQTtBQUFBO0FBQU90QjtBQUFQLE1BRkQ7QUFHQztBQUFBO0FBQUEsUUFBTSxzQkFBbUJzQixPQUFPLFNBQVAsR0FBbUIsRUFBdEMsQ0FBTjtBQUFBO0FBQW9EQSxjQUFNO0FBQTFEO0FBSEQ7QUFERCxJQUREO0FBU0E7Ozt5QkFFSztBQUFBLGlCQUNhLEtBQUtoRyxLQURsQjtBQUFBLE9BQ0FnRyxJQURBLFdBQ0FBLElBREE7QUFBQSxPQUNLQyxNQURMLFdBQ0tBLE1BREw7O0FBRUxBLGFBQVU5RSxhQUFhOEUsTUFBYixDQUFWO0FBQ0FEO0FBQ0FDLFlBQU83RSxXQUFXLEtBQUsyQixNQUFMLENBQVkzQyxJQUFaLENBQWlCLElBQWpCLENBQVgsRUFBa0MsSUFBbEMsQ0FBUDtBQUNBLFFBQUtZLFFBQUwsQ0FBYyxFQUFDZ0YsVUFBRCxFQUFNQyxjQUFOLEVBQWQ7QUFDQTs7OzJCQUVPO0FBQUEsaUJBQ1csS0FBS2pHLEtBRGhCO0FBQUEsT0FDRmdHLElBREUsV0FDRkEsSUFERTtBQUFBLE9BQ0dDLE1BREgsV0FDR0EsTUFESDs7QUFFUEEsYUFBVTlFLGFBQWE4RSxNQUFiLENBQVY7QUFDQSxRQUFLdkUsS0FBTCxDQUFXd0UsUUFBWCxDQUFvQkYsSUFBcEI7QUFDQTs7OztFQTlDcUJ4QixJOztBQUFqQnVCLFEsQ0FDRTVCLFMsR0FBVTtBQUNoQk8sVUFBUSxpQkFBVUwsTUFERjtBQUVoQjZCLFdBQVUsaUJBQVVDO0FBRkosQztBQURaSixRLENBTUU5QixZLEdBQWE7QUFDbkJTLFVBQVEsQ0FEVztBQUVuQndCLFdBQVU7QUFBQSxTQUFHLENBQUg7QUFBQTtBQUZTLEMiLCJmaWxlIjoicmV3YXJkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXHJcbmltcG9ydCBGb3J3YXJkSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRlZGl0YWJsZTpmYWxzZSxcclxuXHRcdGhlaWdodDoyMCxcclxuXHRcdG1pblk6MCxcclxuXHRcdG1heFk6d2luZG93LmlubmVySGVpZ2h0XHJcblx0fVxyXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0ZWRpdGFibGU6UHJvcFR5cGVzLmJvb2wsXHJcblx0XHRoZWlnaHQ6UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdG1heFk6UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdG1pblk6UHJvcFR5cGVzLm51bWJlclxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3RhdGU9e1xyXG5cdFx0XHRnb2FsczpudWxsLFxyXG5cdFx0XHRyZXdhcmRzOm51bGxcclxuXHRcdH1cclxuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXHJcblx0XHR0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGwuYmluZCh0aGlzKVxyXG5cdH1cclxuXHJcblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcclxuXHRcdGNvbmRpdGlvbj17Y2hpbGQ6Y29uZGl0aW9uLmNoaWxkfVxyXG5cclxuXHRcdFByb21pc2UuYWxsKFtcclxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJSZXdhcmQuZmluZChjb25kaXRpb24pLmZldGNoKHJlc29sdmUscmVqZWN0KSksXHJcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiR29hbC5maW5kKGNvbmRpdGlvbikuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxyXG5cdFx0XSkudGhlbihhPT57XHJcblx0XHRcdGxldCBbcmV3YXJkcywgZ29hbHNdPWFcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkcyxnb2Fsc30pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0b25TY3JvbGwoZSl7XHJcblx0XHRpZih0aGlzLl9zY3JvbGxUaW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3Njcm9sbFRpbWVyKVxyXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XHJcblx0XHRcdHZhciB7dG9wLGhlaWdodH09UmVhY3RET00uZmluZERPTU5vZGUodGhpcykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdFx0LGJvdHRvbT10b3AraGVpZ2h0XHJcblx0XHRcdCx7bWluWSxtYXhZLGVkaXRhYmxlfT10aGlzLnByb3BzXHJcblx0XHRcdCx7cGVuZGluZ0dvYWwsIHJld2FyZG9yfT10aGlzLnJlZnNcclxuXHJcblx0XHRcdGlmKHBlbmRpbmdHb2FsKXtcclxuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdERPTS5maW5kRE9NTm9kZShwZW5kaW5nR29hbCkuY2xhc3NMaXN0XHJcblx0XHRcdFx0bGV0IGFjdD10b3A8PW1pblkgPyBcImFkZFwiIDogXCJyZW1vdmVcIjtcclxuXHRcdFx0XHRcInN0aWNreSB0b3AgbGVmdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGE9PmNsYXNzZXNbYWN0XShhKSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocmV3YXJkb3Ipe1xyXG5cdFx0XHRcdGxldCBjbGFzc2VzPVJlYWN0RE9NLmZpbmRET01Ob2RlKHJld2FyZG9yKS5jbGFzc0xpc3RcclxuXHRcdFx0XHRsZXQgYWN0PSh0b3A+bWF4WSB8fCBib3R0b208bWluWSkgPyBcImFkZFwiIDogXCJyZW1vdmVcIlxyXG5cdFx0XHRcdGNsYXNzZXNbYWN0XShcImhpZGVcIilcclxuXHRcdFx0fVxyXG5cdFx0fSwzMDApXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0ZGJSZXdhcmQub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxyXG5cdFx0ZGJHb2FsLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcclxuXHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOnRoaXMuY29udGV4dC5jaGlsZC5faWR9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuXHRcdGRiUmV3YXJkLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcclxuXHRcdGRiR29hbC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXHJcblx0fVxyXG5cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcclxuXHRcdGlmKHRoaXMuY29udGV4dC5jaGlsZCE9bmV4dENvbnRleHQuY2hpbGQpXHJcblx0XHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOm5leHRDb250ZXh0LmNoaWxkLl9pZH0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcclxuXHRcdGlmKHRoaXMucmVmcy5wZW5kaW5nR29hbClcclxuXHRcdFx0dGhpcy5yZWZzLnBlbmRpbmdHb2FsLnNldFN0YXRlKHtyZXdhcmQ6XCJcIix0b3RhbDpcIlwifSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtnb2FscywgcmV3YXJkcywgb3V0Vmlldywgb3V0VG9wfT10aGlzLnN0YXRlXHJcblx0XHRsZXQge2hlaWdodCxlZGl0YWJsZSwgc3R5bGU9e319PXRoaXMucHJvcHNcclxuXHRcdGxldCB0b3RhbD0wLCBtYXg9MCwgYWN0aW9uPW51bGwsIGJ1Zj03XHJcblx0XHRnb2Fscz1nb2FscyAmJiBnb2Fscy5tYXAoYT0+PEFHb2FsXHJcblx0XHRcdFx0XHRrZXk9e2Bnb2FsXyR7YS50b3RhbH1gfVxyXG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XHJcblx0XHRcdFx0XHRyZXdhcmQ9e2EucmV3YXJkfVxyXG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXHJcblxyXG5cdFx0cmV3YXJkcz1yZXdhcmRzICYmIHJld2FyZHMubWFwKGE9PjxBUmV3YXJkXHJcblx0XHRcdFx0XHRrZXk9e2ByZXdhcmRfJHt0b3RhbCs9YS5hbW91bnR9YH1cclxuXHRcdFx0XHRcdG9uUmVhc29uQ2hhbmdlPXtuZXdSZWFzb249PnRoaXMub25SZWFzb25DaGFuZ2UoYSxuZXdSZWFzb24pfVxyXG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XHJcblx0XHRcdFx0XHRyZWFzb249e2EucmVhc29ufVxyXG5cdFx0XHRcdFx0YW1vdW50PXthLmFtb3VudH1cclxuXHRcdFx0XHRcdHRvdGFsPXt0b3RhbH0vPilcclxuXHJcblx0XHRtYXg9TWF0aC5tYXgodG90YWwsbWF4KVxyXG5cclxuXHRcdGlmKGVkaXRhYmxlKXtcclxuXHRcdFx0YWN0aW9uPSg8UGVuZGluZ0dvYWwgcmVmPVwicGVuZGluZ0dvYWxcIiBib3R0b209eyhtYXgrYnVmKSpoZWlnaHR9IGN1cnJlbnQ9e3RvdGFsfSBoZWlnaHQ9e2hlaWdodH0gb25QZW5kR29hbD17Z29hbD0+dGhpcy5wZW5kR29hbChnb2FsKX0vPilcclxuXHRcdH1lbHNlIGlmKCFvdXRWaWV3KXtcclxuXHRcdFx0YWN0aW9uPSg8UmV3YXJkb3IgcmVmPVwicmV3YXJkb3JcIiBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXHJcblx0XHR9XHJcblxyXG5cdFx0c3R5bGUuaGVpZ2h0PShtYXgrYnVmKSpoZWlnaHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkcyBwYWdlXCIgc3R5bGU9e3N0eWxlfT5cclxuXHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cImFycm93XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTAgMTBcIj5cclxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNMCwxMCBMNSwwIEwxMCwxMFwiIHN0cm9rZS13aWR0aD1cIjAuMlwiLz5cclxuXHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHR7Z29hbHN9XHJcblxyXG5cdFx0XHRcdHtyZXdhcmRzfVxyXG5cclxuXHRcdFx0XHR7YWN0aW9ufVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHBlbmRHb2FsKGdvYWwpe1xyXG5cdFx0Z29hbC5jaGlsZD10aGlzLmNvbnRleHQuY2hpbGQuX2lkXHJcblx0XHRkYkdvYWwudXBzZXJ0KGdvYWwpXHJcblx0fVxyXG5cclxuXHRyZXdhcmQoYW1vdW50KXtcclxuXHRcdGxldCBuZXdSZXdhcmQ9e2Ftb3VudCwgY2hpbGQ6dGhpcy5jb250ZXh0LmNoaWxkLl9pZH1cclxuXHRcdGRiUmV3YXJkLnVwc2VydChuZXdSZXdhcmQpXHJcblx0fVxyXG5cclxuXHRvblJlYXNvbkNoYW5nZShyZXdhcmQsIG5ld1JlYXNvbil7XHJcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxyXG5cdFx0ZGJSZXdhcmQudXBzZXJ0KHJld2FyZClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRoZWlnaHQ6MjBcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBlbmRpbmdHb2FsIGV4dGVuZHMgSXRlbXtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdG9uUGVuZEdvYWw6YT0+MVxyXG5cdH1cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT17XHJcblx0XHRcdHJld2FyZDpcIlwiLFxyXG5cdFx0XHR0b3RhbDpcIlwiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7Y3VycmVudCwgYm90dG9tfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbCBwZW5kaW5nXCIgc3R5bGU9e3tib3R0b219fT5cclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e3Jld2FyZHx8XCJcIn1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJwZW5kaW5nUmV3YXJkXCJcclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t0ZXh0QWxpZ246XCJyaWdodFwiLHdpZHRoOlwiMTAwJVwifX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGlucHV0IG9uQmx1cj17ZT0+dGhpcy50cnlQZW5kKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RvdGFsfHxcIlwifVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX1cclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjZlbVwifX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHRyeVBlbmQoc3RhdGUpe1xyXG5cdFx0bGV0IHtyZXdhcmQ6bmV3UmV3YXJkLCB0b3RhbDpuZXdUb3RhbH09c3RhdGVcclxuXHRcdGxldCB7Y3VycmVudCxvblBlbmRHb2FsfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcclxuXHRcdGlmKG5ld1Jld2FyZClcclxuXHRcdFx0cmV3YXJkPW5ld1Jld2FyZFxyXG5cdFx0aWYobmV3VG90YWwpXHJcblx0XHRcdHRvdGFsPW5ld1RvdGFsXHJcblx0XHRpZihyZXdhcmQudHJpbSgpICYmIHRvdGFsLnRyaW0oKSl7XHJcblx0XHRcdHRvdGFsPXBhcnNlSW50KHRvdGFsLnRyaW0oKSlcclxuXHRcdFx0aWYodG90YWw+Y3VycmVudCl7XHJcblx0XHRcdFx0cmV3YXJkPXJld2FyZC50cmltKClcclxuXHRcdFx0XHRvblBlbmRHb2FsKHtyZXdhcmQsdG90YWx9KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRVSS5NZXNzYWdlci5zaG93KGBuZXcgZ29hbCBtdXN0IGdyZWF0ZXIgdGhhbiBjdXJyZW50IHRvdGFsICR7Y3VycmVudH1gKVxyXG5cdFx0XHRcdFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5nb2FsKS5mb2N1cygpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZCx0b3RhbH0pXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBBR29hbCBleHRlbmRzIEl0ZW17XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcclxuXHRcdGxldCBzdHlsZT17Zm9udFNpemU6XCJ4LXNtYWxsXCIsIHdoaXRlU3BhY2U6XCJub3dyYXBcIixiYWNrZ3JvdW5kQ29sb3I6XCJsaWdodGdyZWVuXCJ9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdvYWxcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cclxuXHRcdFx0XHQ8ZGl2PjxBdmF0YXIgc3R5bGU9e3N0eWxlfT57cmV3YXJkfTwvQXZhdGFyPjwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxyXG5cdFx0XHRcdDxkaXY+e3RvdGFsfTwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEFSZXdhcmQgZXh0ZW5kcyBJdGVte1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPXtuZXdSZWFzb246bnVsbH1cclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpudWxsfSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xyXG5cdFx0bGV0IHtyZWFzb259PXRoaXMucmVmc1xyXG5cdFx0cmVhc29uICYmIHJlYXNvbi5mb2N1cygpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcclxuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXHJcblxyXG5cdFx0aWYobmV3UmVhc29uKXtcclxuXHRcdFx0cmVhc29uPSg8VGV4dEZpZWxkIHJlZj1cInJlYXNvblwiIGRlZmF1bHRWYWx1ZT17bmV3UmVhc29ufVxyXG5cdFx0XHRcdG9uRW50ZXJLZXlEb3duPXtlPT5lLnRhcmdldC5ibHVyKCl9XHJcblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XHJcblx0XHRcdFx0e3JlYXNvbnx8XCIuLi5cIn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2Pit7YW1vdW50fS97dG90YWx9PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0fVxyXG5cclxuXHRyZWFzb25DaGFuZ2VkKG5ld1JlYXNvbil7XHJcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcclxuXHRcdGlmKCFuZXdSZWFzb24gfHwgbmV3UmVhc29uPT1yZWFzb24pe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtuZXdSZWFzb246dW5kZWZpbmVkfSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUmVhc29uQ2hhbmdlICYmIG9uUmVhc29uQ2hhbmdlKG5ld1JlYXNvbilcclxuXHR9XHJcbn1cclxuXHJcblxyXG5pbXBvcnQgUmV3YXJkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2QnXHJcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcclxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcclxuXHRcdGN1cnJlbnQ6UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdG9uUmV3YXJkOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRjdXJyZW50OjAsXHJcblx0XHRvblJld2FyZDogYT0+MVxyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXM6MCx0aWNrZXI6bnVsbH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7cGx1c309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmQgcGVuZGluZ1wiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XHJcblx0XHRcdFx0XHQ8UmV3YXJkSWNvbiBjbGFzc05hbWU9XCJyZXdhcmRlclwiIG9uQ2xpY2s9e2U9PnRoaXMucGx1cygpfSAvPlxyXG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgcGx1cyAke3BsdXMgPyBcInBsdXNpbmdcIiA6IFwiXCJ9YH0+K3twbHVzfHwneCd9PC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHBsdXMoKXtcclxuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcclxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxyXG5cdFx0cGx1cysrXHJcblx0XHR0aWNrZXI9c2V0VGltZW91dCh0aGlzLnJld2FyZC5iaW5kKHRoaXMpLDEwMDApXHJcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXHJcblx0fVxyXG5cclxuXHRyZXdhcmQoKXtcclxuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcclxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxyXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxyXG5cdH1cclxufVxyXG4iXX0=