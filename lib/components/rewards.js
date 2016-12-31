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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOlsiUmV3YXJkcyIsImFyZ3VtZW50cyIsInN0YXRlIiwiZ29hbHMiLCJyZXdhcmRzIiwib25DaGFuZ2UiLCJiaW5kIiwib25TY3JvbGwiLCJjb25kaXRpb24iLCJjaGlsZCIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImZldGNoIiwidGhlbiIsImEiLCJzZXRTdGF0ZSIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJoZWlnaHQiLCJib3R0b20iLCJwcm9wcyIsIm1pblkiLCJtYXhZIiwiZWRpdGFibGUiLCJyZWZzIiwicGVuZGluZ0dvYWwiLCJyZXdhcmRvciIsImNsYXNzZXMiLCJjbGFzc0xpc3QiLCJhY3QiLCJzcGxpdCIsImZvckVhY2giLCJvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250ZXh0IiwiX2lkIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyZXdhcmQiLCJ0b3RhbCIsIm91dFZpZXciLCJvdXRUb3AiLCJzdHlsZSIsIm1heCIsImFjdGlvbiIsImJ1ZiIsIm1hcCIsIk1hdGgiLCJhbW91bnQiLCJvblJlYXNvbkNoYW5nZSIsIm5ld1JlYXNvbiIsInJlYXNvbiIsInBlbmRHb2FsIiwiZ29hbCIsInVwc2VydCIsIm5ld1Jld2FyZCIsImRlZmF1bHRQcm9wcyIsImlubmVySGVpZ2h0IiwicHJvcFR5cGVzIiwiYm9vbCIsIm51bWJlciIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkl0ZW0iLCJQZW5kaW5nR29hbCIsImN1cnJlbnQiLCJ0cnlQZW5kIiwidGFyZ2V0IiwidmFsdWUiLCJ0ZXh0QWxpZ24iLCJ3aWR0aCIsIm5ld1RvdGFsIiwib25QZW5kR29hbCIsInRyaW0iLCJwYXJzZUludCIsIk1lc3NhZ2VyIiwic2hvdyIsImZvY3VzIiwiQUdvYWwiLCJmb250U2l6ZSIsIndoaXRlU3BhY2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJBUmV3YXJkIiwiYmx1ciIsInJlYXNvbkNoYW5nZWQiLCJ1bmRlZmluZWQiLCJSZXdhcmRvciIsInBsdXMiLCJ0aWNrZXIiLCJvblJld2FyZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQW1SQTs7Ozs7Ozs7Ozs7O0lBalJxQkEsTzs7O0FBa0JwQixvQkFBYTtBQUFBOztBQUFBLGlIQUNIQyxTQURHOztBQUVaLFFBQUtDLEtBQUwsR0FBVztBQUNWQyxVQUFNLElBREk7QUFFVkMsWUFBUTtBQUZFLEdBQVg7QUFJQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLE9BQWQ7QUFDQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjRCxJQUFkLE9BQWQ7QUFQWTtBQVFaOzs7OzJCQUVRRSxTLEVBQVU7QUFBQTs7QUFDbEJBLGVBQVUsRUFBQ0MsT0FBTUQsVUFBVUMsS0FBakIsRUFBVjs7QUFFQUMsV0FBUUMsR0FBUixDQUFZLENBQ1gsSUFBSUQsT0FBSixDQUFZLFVBQUNFLE9BQUQsRUFBU0MsTUFBVDtBQUFBLFdBQWtCLFdBQVNDLElBQVQsQ0FBY04sU0FBZCxFQUF5Qk8sS0FBekIsQ0FBK0JILE9BQS9CLEVBQXVDQyxNQUF2QyxDQUFsQjtBQUFBLElBQVosQ0FEVyxFQUVYLElBQUlILE9BQUosQ0FBWSxVQUFDRSxPQUFELEVBQVNDLE1BQVQ7QUFBQSxXQUFrQixTQUFPQyxJQUFQLENBQVlOLFNBQVosRUFBdUJPLEtBQXZCLENBQTZCSCxPQUE3QixFQUFxQ0MsTUFBckMsQ0FBbEI7QUFBQSxJQUFaLENBRlcsQ0FBWixFQUdHRyxJQUhILENBR1EsYUFBRztBQUFBLDRCQUNX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bUIsRUFBdEMsQ0FBTjtBQUFBO0FBQW9EQSxjQUFNO0FBQTFEO0FBSEQ7QUFERCxJQUREO0FBU0E7Ozt5QkFFSztBQUFBLGlCQUNhLEtBQUtoRyxLQURsQjtBQUFBLE9BQ0FnRyxJQURBLFdBQ0FBLElBREE7QUFBQSxPQUNLQyxNQURMLFdBQ0tBLE1BREw7O0FBRUxBLGFBQVU5RSxhQUFhOEUsTUFBYixDQUFWO0FBQ0FEO0FBQ0FDLFlBQU83RSxXQUFXLEtBQUsyQixNQUFMLENBQVkzQyxJQUFaLENBQWlCLElBQWpCLENBQVgsRUFBa0MsSUFBbEMsQ0FBUDtBQUNBLFFBQUtZLFFBQUwsQ0FBYyxFQUFDZ0YsVUFBRCxFQUFNQyxjQUFOLEVBQWQ7QUFDQTs7OzJCQUVPO0FBQUEsaUJBQ1csS0FBS2pHLEtBRGhCO0FBQUEsT0FDRmdHLElBREUsV0FDRkEsSUFERTtBQUFBLE9BQ0dDLE1BREgsV0FDR0EsTUFESDs7QUFFUEEsYUFBVTlFLGFBQWE4RSxNQUFiLENBQVY7QUFDQSxRQUFLdkUsS0FBTCxDQUFXd0UsUUFBWCxDQUFvQkYsSUFBcEI7QUFDQTs7OztFQTlDcUJ4QixJOztBQUFqQnVCLFEsQ0FDRTVCLFMsR0FBVTtBQUNoQk8sVUFBUSxpQkFBVUwsTUFERjtBQUVoQjZCLFdBQVUsaUJBQVVDO0FBRkosQztBQURaSixRLENBTUU5QixZLEdBQWE7QUFDbkJTLFVBQVEsQ0FEVztBQUVuQndCLFdBQVU7QUFBQSxTQUFHLENBQUg7QUFBQTtBQUZTLEMiLCJmaWxlIjoicmV3YXJkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IFBsdXNJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkJ1xuaW1wb3J0IEZvcndhcmRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0ZWRpdGFibGU6ZmFsc2UsXG5cdFx0aGVpZ2h0OjIwLFxuXHRcdG1pblk6MCxcblx0XHRtYXhZOndpbmRvdy5pbm5lckhlaWdodFxuXHR9XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGVkaXRhYmxlOlByb3BUeXBlcy5ib29sLFxuXHRcdGhlaWdodDpQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG1heFk6UHJvcFR5cGVzLm51bWJlcixcblx0XHRtaW5ZOlByb3BUeXBlcy5udW1iZXJcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGdvYWxzOm51bGwsXG5cdFx0XHRyZXdhcmRzOm51bGxcblx0XHR9XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGwuYmluZCh0aGlzKVxuXHR9XG5cblx0b25DaGFuZ2UoY29uZGl0aW9uKXtcblx0XHRjb25kaXRpb249e2NoaWxkOmNvbmRpdGlvbi5jaGlsZH1cblxuXHRcdFByb21pc2UuYWxsKFtcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PmRiUmV3YXJkLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpLFxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJHb2FsLmZpbmQoY29uZGl0aW9uKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXG5cdFx0XSkudGhlbihhPT57XG5cdFx0XHRsZXQgW3Jld2FyZHMsIGdvYWxzXT1hXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmRzLGdvYWxzfSlcblx0XHR9KVxuXHR9XG5cblx0b25TY3JvbGwoZSl7XG5cdFx0aWYodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XG5cdFx0XHR2YXIge3RvcCxoZWlnaHR9PVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0XHQsYm90dG9tPXRvcCtoZWlnaHRcblx0XHRcdCx7bWluWSxtYXhZLGVkaXRhYmxlfT10aGlzLnByb3BzXG5cdFx0XHQse3BlbmRpbmdHb2FsLCByZXdhcmRvcn09dGhpcy5yZWZzXG5cblx0XHRcdGlmKHBlbmRpbmdHb2FsKXtcblx0XHRcdFx0bGV0IGNsYXNzZXM9UmVhY3RET00uZmluZERPTU5vZGUocGVuZGluZ0dvYWwpLmNsYXNzTGlzdFxuXHRcdFx0XHRsZXQgYWN0PXRvcDw9bWluWSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiO1xuXHRcdFx0XHRcInN0aWNreSB0b3AgbGVmdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGE9PmNsYXNzZXNbYWN0XShhKSlcblx0XHRcdH1cblxuXHRcdFx0aWYocmV3YXJkb3Ipe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdERPTS5maW5kRE9NTm9kZShyZXdhcmRvcikuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9KHRvcD5tYXhZIHx8IGJvdHRvbTxtaW5ZKSA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXG5cdFx0XHRcdGNsYXNzZXNbYWN0XShcImhpZGVcIilcblx0XHRcdH1cblx0XHR9LDMwMClcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0ZGJSZXdhcmQub24oXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdGRiR29hbC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuXHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOnRoaXMuY29udGV4dC5jaGlsZC5faWR9KVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHRkYlJld2FyZC5yZW1vdmVMaXN0ZW5lcihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG5cdH1cblxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5jb250ZXh0LmNoaWxkIT1uZXh0Q29udGV4dC5jaGlsZClcblx0XHRcdHRoaXMub25DaGFuZ2Uoe2NoaWxkOm5leHRDb250ZXh0LmNoaWxkLl9pZH0pXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRpZih0aGlzLnJlZnMucGVuZGluZ0dvYWwpXG5cdFx0XHR0aGlzLnJlZnMucGVuZGluZ0dvYWwuc2V0U3RhdGUoe3Jld2FyZDpcIlwiLHRvdGFsOlwiXCJ9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtnb2FscywgcmV3YXJkcywgb3V0Vmlldywgb3V0VG9wfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsZWRpdGFibGUsIHN0eWxlPXt9fT10aGlzLnByb3BzXG5cdFx0bGV0IHRvdGFsPTAsIG1heD0wLCBhY3Rpb249bnVsbCwgYnVmPTdcblx0XHRnb2Fscz1nb2FscyAmJiBnb2Fscy5tYXAoYT0+PEFHb2FsXG5cdFx0XHRcdFx0a2V5PXtgZ29hbF8ke2EudG90YWx9YH1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZXdhcmQ9e2EucmV3YXJkfVxuXHRcdFx0XHRcdHRvdGFsPXttYXg9TWF0aC5tYXgobWF4LGEudG90YWwpLCBhLnRvdGFsfS8+KVxuXG5cdFx0cmV3YXJkcz1yZXdhcmRzICYmIHJld2FyZHMubWFwKGE9PjxBUmV3YXJkXG5cdFx0XHRcdFx0a2V5PXtgcmV3YXJkXyR7dG90YWwrPWEuYW1vdW50fWB9XG5cdFx0XHRcdFx0b25SZWFzb25DaGFuZ2U9e25ld1JlYXNvbj0+dGhpcy5vblJlYXNvbkNoYW5nZShhLG5ld1JlYXNvbil9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmVhc29uPXthLnJlYXNvbn1cblx0XHRcdFx0XHRhbW91bnQ9e2EuYW1vdW50fVxuXHRcdFx0XHRcdHRvdGFsPXt0b3RhbH0vPilcblxuXHRcdG1heD1NYXRoLm1heCh0b3RhbCxtYXgpXG5cblx0XHRpZihlZGl0YWJsZSl7XG5cdFx0XHRhY3Rpb249KDxQZW5kaW5nR29hbCByZWY9XCJwZW5kaW5nR29hbFwiIGJvdHRvbT17KG1heCtidWYpKmhlaWdodH0gY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblBlbmRHb2FsPXtnb2FsPT50aGlzLnBlbmRHb2FsKGdvYWwpfS8+KVxuXHRcdH1lbHNlIGlmKCFvdXRWaWV3KXtcblx0XHRcdGFjdGlvbj0oPFJld2FyZG9yIHJlZj1cInJld2FyZG9yXCIgY3VycmVudD17dG90YWx9IGhlaWdodD17aGVpZ2h0fSBvblJld2FyZD17YW1vdW50PT50aGlzLnJld2FyZChhbW91bnQpfS8+KVxuXHRcdH1cblxuXHRcdHN0eWxlLmhlaWdodD0obWF4K2J1ZikqaGVpZ2h0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkcyBwYWdlXCIgc3R5bGU9e3N0eWxlfT5cblx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJhcnJvd1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDEwIDEwXCI+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk0wLDEwIEw1LDAgTDEwLDEwXCIgc3Ryb2tlLXdpZHRoPVwiMC4yXCIvPlxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0e2dvYWxzfVxuXG5cdFx0XHRcdHtyZXdhcmRzfVxuXG5cdFx0XHRcdHthY3Rpb259XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwZW5kR29hbChnb2FsKXtcblx0XHRnb2FsLmNoaWxkPXRoaXMuY29udGV4dC5jaGlsZC5faWRcblx0XHRkYkdvYWwudXBzZXJ0KGdvYWwpXG5cdH1cblxuXHRyZXdhcmQoYW1vdW50KXtcblx0XHRsZXQgbmV3UmV3YXJkPXthbW91bnQsIGNoaWxkOnRoaXMuY29udGV4dC5jaGlsZC5faWR9XG5cdFx0ZGJSZXdhcmQudXBzZXJ0KG5ld1Jld2FyZClcblx0fVxuXG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgUGVuZGluZ0dvYWwgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRvblBlbmRHb2FsOmE9PjFcblx0fVxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZDpcIlwiLFxuXHRcdFx0dG90YWw6XCJcIlxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Y3VycmVudCwgYm90dG9tfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbCBwZW5kaW5nXCIgc3R5bGU9e3tib3R0b219fT5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Jld2FyZHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHtyZXdhcmQ6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInBlbmRpbmdSZXdhcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJOZXcgUmV3YXJkLi4uXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7dGV4dEFsaWduOlwicmlnaHRcIix3aWR0aDpcIjEwMCVcIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZyYXF1bzs8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgb25CbHVyPXtlPT50aGlzLnRyeVBlbmQoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCJcblx0XHRcdFx0XHRcdHZhbHVlPXt0b3RhbHx8XCJcIn1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHt0b3RhbDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e2BHb2FsOj4ke2N1cnJlbnR9YH1cblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCI2ZW1cIn19Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHR0cnlQZW5kKHN0YXRlKXtcblx0XHRsZXQge3Jld2FyZDpuZXdSZXdhcmQsIHRvdGFsOm5ld1RvdGFsfT1zdGF0ZVxuXHRcdGxldCB7Y3VycmVudCxvblBlbmRHb2FsfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyZXdhcmQsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0aWYobmV3UmV3YXJkKVxuXHRcdFx0cmV3YXJkPW5ld1Jld2FyZFxuXHRcdGlmKG5ld1RvdGFsKVxuXHRcdFx0dG90YWw9bmV3VG90YWxcblx0XHRpZihyZXdhcmQudHJpbSgpICYmIHRvdGFsLnRyaW0oKSl7XG5cdFx0XHR0b3RhbD1wYXJzZUludCh0b3RhbC50cmltKCkpXG5cdFx0XHRpZih0b3RhbD5jdXJyZW50KXtcblx0XHRcdFx0cmV3YXJkPXJld2FyZC50cmltKClcblx0XHRcdFx0b25QZW5kR29hbCh7cmV3YXJkLHRvdGFsfSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0VUkuTWVzc2FnZXIuc2hvdyhgbmV3IGdvYWwgbXVzdCBncmVhdGVyIHRoYW4gY3VycmVudCB0b3RhbCAke2N1cnJlbnR9YClcblx0XHRcdFx0UmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmdvYWwpLmZvY3VzKClcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cmV3YXJkLHRvdGFsfSlcblx0fVxufVxuXG5jbGFzcyBBR29hbCBleHRlbmRzIEl0ZW17XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmV3YXJkLHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCBzdHlsZT17Zm9udFNpemU6XCJ4LXNtYWxsXCIsIHdoaXRlU3BhY2U6XCJub3dyYXBcIixiYWNrZ3JvdW5kQ29sb3I6XCJsaWdodGdyZWVuXCJ9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ29hbFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2PjxBdmF0YXIgc3R5bGU9e3N0eWxlfT57cmV3YXJkfTwvQXZhdGFyPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdj57dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgQVJld2FyZCBleHRlbmRzIEl0ZW17XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e25ld1JlYXNvbjpudWxsfVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjpudWxsfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGxldCB7cmVhc29ufT10aGlzLnJlZnNcblx0XHRyZWFzb24gJiYgcmVhc29uLmZvY3VzKClcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cmVhc29uLGFtb3VudCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQge25ld1JlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYobmV3UmVhc29uKXtcblx0XHRcdHJlYXNvbj0oPFRleHRGaWVsZCByZWY9XCJyZWFzb25cIiBkZWZhdWx0VmFsdWU9e25ld1JlYXNvbn1cblx0XHRcdFx0b25FbnRlcktleURvd249e2U9PmUudGFyZ2V0LmJsdXIoKX1cblx0XHRcdFx0b25CbHVyPXtlPT50aGlzLnJlYXNvbkNoYW5nZWQoZS50YXJnZXQudmFsdWUudHJpbSgpKX0vPilcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRcIiBzdHlsZT17e2JvdHRvbTpoZWlnaHQqdG90YWx9fT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCIgb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnJlYXNvbnx8XCIgXCJ9KX0+XG5cdFx0XHRcdHtyZWFzb258fFwiLi4uXCJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pit7YW1vdW50fS97dG90YWx9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxuXG5cdHJlYXNvbkNoYW5nZWQobmV3UmVhc29uKXtcblx0XHRsZXQge3JlYXNvbiwgb25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHRpZighbmV3UmVhc29uIHx8IG5ld1JlYXNvbj09cmVhc29uKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25ld1JlYXNvbjp1bmRlZmluZWR9KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG9uUmVhc29uQ2hhbmdlICYmIG9uUmVhc29uQ2hhbmdlKG5ld1JlYXNvbilcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZCdcbmNsYXNzIFJld2FyZG9yIGV4dGVuZHMgSXRlbXtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uUmV3YXJkOiBQcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uUmV3YXJkOiBhPT4xXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtwbHVzOjAsdGlja2VyOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGx1czowLHRpY2tlcjpudWxsfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7cGx1c309dGhpcy5zdGF0ZVxuXHRcdGxldCB7aGVpZ2h0LGN1cnJlbnR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmQgcGVuZGluZ1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiPlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIGNsYXNzTmFtZT1cInJld2FyZGVyXCIgb25DbGljaz17ZT0+dGhpcy5wbHVzKCl9IC8+XG5cdFx0XHRcdFx0PHNwYW4+e2N1cnJlbnR9PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YHBsdXMgJHtwbHVzID8gXCJwbHVzaW5nXCIgOiBcIlwifWB9Pit7cGx1c3x8J3gnfTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRwbHVzKCl7XG5cdFx0bGV0IHtwbHVzLHRpY2tlcn09dGhpcy5zdGF0ZVxuXHRcdHRpY2tlciAmJiBjbGVhclRpbWVvdXQodGlja2VyKVxuXHRcdHBsdXMrK1xuXHRcdHRpY2tlcj1zZXRUaW1lb3V0KHRoaXMucmV3YXJkLmJpbmQodGhpcyksMTAwMClcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzLHRpY2tlcn0pXG5cdH1cblxuXHRyZXdhcmQoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0dGhpcy5wcm9wcy5vblJld2FyZChwbHVzKVxuXHR9XG59XG4iXX0=