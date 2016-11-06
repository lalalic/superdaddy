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

		return _possibleConstructorReturn(this, (AGoal.__proto__ || Object.getPrototypeOf(AGoal)).apply(this, arguments));
	}

	_createClass(AGoal, [{
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOlsiUmV3YXJkcyIsImFyZ3VtZW50cyIsInN0YXRlIiwiZ29hbHMiLCJyZXdhcmRzIiwib25DaGFuZ2UiLCJiaW5kIiwib25TY3JvbGwiLCJjb25kaXRpb24iLCJjaGlsZCIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImZldGNoIiwidGhlbiIsImEiLCJzZXRTdGF0ZSIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJoZWlnaHQiLCJwcm9wcyIsIm1pblkiLCJtYXhZIiwiZWRpdGFibGUiLCJyZWZzIiwicGVuZGluZ0dvYWwiLCJyZXdhcmRvciIsImNsYXNzZXMiLCJjbGFzc0xpc3QiLCJhY3QiLCJzcGxpdCIsImZvckVhY2giLCJib3R0b20iLCJvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250ZXh0IiwiX2lkIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJyZXdhcmQiLCJ0b3RhbCIsIm91dFZpZXciLCJvdXRUb3AiLCJzdHlsZSIsIm1heCIsImFjdGlvbiIsImJ1ZiIsIm1hcCIsIk1hdGgiLCJhbW91bnQiLCJvblJlYXNvbkNoYW5nZSIsIm5ld1JlYXNvbiIsInJlYXNvbiIsInBlbmRHb2FsIiwiZ29hbCIsInVwc2VydCIsIm5ld1Jld2FyZCIsImRlZmF1bHRQcm9wcyIsImlubmVySGVpZ2h0IiwicHJvcFR5cGVzIiwiYm9vbCIsIm51bWJlciIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkl0ZW0iLCJQZW5kaW5nR29hbCIsImN1cnJlbnQiLCJ0cnlQZW5kIiwidGFyZ2V0IiwidmFsdWUiLCJ0ZXh0QWxpZ24iLCJ3aWR0aCIsIm5ld1RvdGFsIiwib25QZW5kR29hbCIsInRyaW0iLCJwYXJzZUludCIsIk1lc3NhZ2VyIiwic2hvdyIsImZvY3VzIiwiQUdvYWwiLCJmb250U2l6ZSIsIndoaXRlU3BhY2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJBUmV3YXJkIiwiYmx1ciIsInJlYXNvbkNoYW5nZWQiLCJ1bmRlZmluZWQiLCJSZXdhcmRvciIsInBsdXMiLCJ0aWNrZXIiLCJvblJld2FyZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQW1SQTs7Ozs7Ozs7Ozs7O0lBalJxQkEsTzs7O0FBa0JwQixvQkFBYTtBQUFBOztBQUFBLGlIQUNIQyxTQURHOztBQUVaLFFBQUtDLEtBQUwsR0FBVztBQUNWQyxVQUFNLElBREk7QUFFVkMsWUFBUTtBQUZFLEdBQVg7QUFJQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLE9BQWQ7QUFDQSxRQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBTCxDQUFjRCxJQUFkLE9BQWQ7QUFQWTtBQVFaOzs7OzJCQUVRRSxTLEVBQVU7QUFBQTs7QUFDbEJBLGVBQVUsRUFBQ0MsT0FBTUQsVUFBVUMsS0FBakIsRUFBVjs7QUFFQUMsV0FBUUMsR0FBUixDQUFZLENBQ1gsSUFBSUQsT0FBSixDQUFZLFVBQUNFLE9BQUQsRUFBU0MsTUFBVDtBQUFBLFdBQWtCLFdBQVNDLElBQVQsQ0FBY04sU0FBZCxFQUF5Qk8sS0FBekIsQ0FBK0JILE9BQS9CLEVBQXVDQyxNQUF2QyxDQUFsQjtBQUFBLElBQVosQ0FEVyxFQUVYLElBQUlILE9BQUosQ0FBWSxVQUFDRSxPQUFELEVBQVNDLE1BQVQ7QUFBQSxXQUFrQixTQUFPQyxJQUFQLENBQVlOLFNBQVosRUFBdUJPLEtBQXZCLENBQTZCSCxPQUE3QixFQUFxQ0MsTUFBckMsQ0FBbEI7QUFBQSxJQUFaLENBRlcsQ0FBWixFQUdHRyxJQUhILENBR1EsYUFBRztBQUFBLDRCQUNX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QUE7QUFBb0RBLGNBQU07QUFBMUQ7QUFIRDtBQURELElBREQ7QUFTQTs7O3lCQUVLO0FBQUEsaUJBQ2EsS0FBS2hHLEtBRGxCO0FBQUEsT0FDQWdHLElBREEsV0FDQUEsSUFEQTtBQUFBLE9BQ0tDLE1BREwsV0FDS0EsTUFETDs7QUFFTEEsYUFBVTlFLGFBQWE4RSxNQUFiLENBQVY7QUFDQUQ7QUFDQUMsWUFBTzdFLFdBQVcsS0FBSzJCLE1BQUwsQ0FBWTNDLElBQVosQ0FBaUIsSUFBakIsQ0FBWCxFQUFrQyxJQUFsQyxDQUFQO0FBQ0EsUUFBS1ksUUFBTCxDQUFjLEVBQUNnRixVQUFELEVBQU1DLGNBQU4sRUFBZDtBQUNBOzs7MkJBRU87QUFBQSxpQkFDVyxLQUFLakcsS0FEaEI7QUFBQSxPQUNGZ0csSUFERSxXQUNGQSxJQURFO0FBQUEsT0FDR0MsTUFESCxXQUNHQSxNQURIOztBQUVQQSxhQUFVOUUsYUFBYThFLE1BQWIsQ0FBVjtBQUNBLFFBQUt4RSxLQUFMLENBQVd5RSxRQUFYLENBQW9CRixJQUFwQjtBQUNBOzs7O0VBOUNxQnhCLEk7O0FBQWpCdUIsUSxDQUNFNUIsUyxHQUFVO0FBQ2hCTyxVQUFRLGlCQUFVTCxNQURGO0FBRWhCNkIsV0FBVSxpQkFBVUM7QUFGSixDO0FBRFpKLFEsQ0FNRTlCLFksR0FBYTtBQUNuQlMsVUFBUSxDQURXO0FBRW5Cd0IsV0FBVTtBQUFBLFNBQUcsQ0FBSDtBQUFBO0FBRlMsQyIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHtUZXh0RmllbGQsIEljb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWZvcndhcmRcIlxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHksIFJld2FyZCBhcyBkYlJld2FyZCwgR29hbCBhcyBkYkdvYWx9IGZyb20gJy4uL2RiJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRlZGl0YWJsZTpmYWxzZSxcblx0XHRoZWlnaHQ6MjAsXG5cdFx0bWluWTowLFxuXHRcdG1heFk6d2luZG93LmlubmVySGVpZ2h0XG5cdH1cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0ZWRpdGFibGU6UHJvcFR5cGVzLmJvb2wsXG5cdFx0aGVpZ2h0OlByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWF4WTpQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG1pblk6UHJvcFR5cGVzLm51bWJlclxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0Y2hpbGQ6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Z29hbHM6bnVsbCxcblx0XHRcdHJld2FyZHM6bnVsbFxuXHRcdH1cblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKVxuXHRcdHRoaXMub25TY3JvbGw9dGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpXG5cdH1cblxuXHRvbkNoYW5nZShjb25kaXRpb24pe1xuXHRcdGNvbmRpdGlvbj17Y2hpbGQ6Y29uZGl0aW9uLmNoaWxkfVxuXG5cdFx0UHJvbWlzZS5hbGwoW1xuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+ZGJSZXdhcmQuZmluZChjb25kaXRpb24pLmZldGNoKHJlc29sdmUscmVqZWN0KSksXG5cdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5kYkdvYWwuZmluZChjb25kaXRpb24pLmZldGNoKHJlc29sdmUscmVqZWN0KSlcblx0XHRdKS50aGVuKGE9Pntcblx0XHRcdGxldCBbcmV3YXJkcywgZ29hbHNdPWFcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Jld2FyZHMsZ29hbHN9KVxuXHRcdH0pXG5cdH1cblxuXHRvblNjcm9sbChlKXtcblx0XHRpZih0aGlzLl9zY3JvbGxUaW1lcilcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9zY3JvbGxUaW1lcilcblx0XHR0aGlzLl9zY3JvbGxUaW1lcj1zZXRUaW1lb3V0KGU9Pntcblx0XHRcdHZhciB7dG9wLGhlaWdodH09UmVhY3RET00uZmluZERPTU5vZGUodGhpcykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRcdCxib3R0b209dG9wK2hlaWdodFxuXHRcdFx0LHttaW5ZLG1heFksZWRpdGFibGV9PXRoaXMucHJvcHNcblx0XHRcdCx7cGVuZGluZ0dvYWwsIHJld2FyZG9yfT10aGlzLnJlZnNcblxuXHRcdFx0aWYocGVuZGluZ0dvYWwpe1xuXHRcdFx0XHRsZXQgY2xhc3Nlcz1SZWFjdERPTS5maW5kRE9NTm9kZShwZW5kaW5nR29hbCkuY2xhc3NMaXN0XG5cdFx0XHRcdGxldCBhY3Q9dG9wPD1taW5ZID8gXCJhZGRcIiA6IFwicmVtb3ZlXCI7XG5cdFx0XHRcdFwic3RpY2t5IHRvcCBsZWZ0XCIuc3BsaXQoXCIgXCIpLmZvckVhY2goYT0+Y2xhc3Nlc1thY3RdKGEpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXdhcmRvcil7XG5cdFx0XHRcdGxldCBjbGFzc2VzPVJlYWN0RE9NLmZpbmRET01Ob2RlKHJld2FyZG9yKS5jbGFzc0xpc3Rcblx0XHRcdFx0bGV0IGFjdD0odG9wPm1heFkgfHwgYm90dG9tPG1pblkpID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJcblx0XHRcdFx0Y2xhc3Nlc1thY3RdKFwiaGlkZVwiKVxuXHRcdFx0fVxuXHRcdH0sMzAwKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRkYlJld2FyZC5vbihcInVwc2VydGVkXCIsIHRoaXMub25DaGFuZ2UpXG5cdFx0ZGJHb2FsLm9uKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG5cdFx0dGhpcy5vbkNoYW5nZSh7Y2hpbGQ6dGhpcy5jb250ZXh0LmNoaWxkLl9pZH0pXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdGRiUmV3YXJkLnJlbW92ZUxpc3RlbmVyKFwidXBzZXJ0ZWRcIiwgdGhpcy5vbkNoYW5nZSlcblx0XHRkYkdvYWwucmVtb3ZlTGlzdGVuZXIoXCJ1cHNlcnRlZFwiLCB0aGlzLm9uQ2hhbmdlKVxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcblx0fVxuXG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcblx0XHRpZih0aGlzLmNvbnRleHQuY2hpbGQhPW5leHRDb250ZXh0LmNoaWxkKVxuXHRcdFx0dGhpcy5vbkNoYW5nZSh7Y2hpbGQ6bmV4dENvbnRleHQuY2hpbGQuX2lkfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGlmKHRoaXMucmVmcy5wZW5kaW5nR29hbClcblx0XHRcdHRoaXMucmVmcy5wZW5kaW5nR29hbC5zZXRTdGF0ZSh7cmV3YXJkOlwiXCIsdG90YWw6XCJcIn0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRsZXQge2dvYWxzLCByZXdhcmRzLCBvdXRWaWV3LCBvdXRUb3B9PXRoaXMuc3RhdGVcblx0XHRsZXQge2hlaWdodCxlZGl0YWJsZSwgc3R5bGU9e319PXRoaXMucHJvcHNcblx0XHRsZXQgdG90YWw9MCwgbWF4PTAsIGFjdGlvbj1udWxsLCBidWY9N1xuXHRcdGdvYWxzPWdvYWxzICYmIGdvYWxzLm1hcChhPT48QUdvYWxcblx0XHRcdFx0XHRrZXk9e2Bnb2FsXyR7YS50b3RhbH1gfVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHJld2FyZD17YS5yZXdhcmR9XG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXG5cblx0XHRyZXdhcmRzPXJld2FyZHMgJiYgcmV3YXJkcy5tYXAoYT0+PEFSZXdhcmRcblx0XHRcdFx0XHRrZXk9e2ByZXdhcmRfJHt0b3RhbCs9YS5hbW91bnR9YH1cblx0XHRcdFx0XHRvblJlYXNvbkNoYW5nZT17bmV3UmVhc29uPT50aGlzLm9uUmVhc29uQ2hhbmdlKGEsbmV3UmVhc29uKX1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZWFzb249e2EucmVhc29ufVxuXHRcdFx0XHRcdGFtb3VudD17YS5hbW91bnR9XG5cdFx0XHRcdFx0dG90YWw9e3RvdGFsfS8+KVxuXG5cdFx0bWF4PU1hdGgubWF4KHRvdGFsLG1heClcblxuXHRcdGlmKGVkaXRhYmxlKXtcblx0XHRcdGFjdGlvbj0oPFBlbmRpbmdHb2FsIHJlZj1cInBlbmRpbmdHb2FsXCIgYm90dG9tPXsobWF4K2J1ZikqaGVpZ2h0fSBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUGVuZEdvYWw9e2dvYWw9PnRoaXMucGVuZEdvYWwoZ29hbCl9Lz4pXG5cdFx0fWVsc2UgaWYoIW91dFZpZXcpe1xuXHRcdFx0YWN0aW9uPSg8UmV3YXJkb3IgcmVmPVwicmV3YXJkb3JcIiBjdXJyZW50PXt0b3RhbH0gaGVpZ2h0PXtoZWlnaHR9IG9uUmV3YXJkPXthbW91bnQ9PnRoaXMucmV3YXJkKGFtb3VudCl9Lz4pXG5cdFx0fVxuXG5cdFx0c3R5bGUuaGVpZ2h0PShtYXgrYnVmKSpoZWlnaHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzIHBhZ2VcIiBzdHlsZT17c3R5bGV9PlxuXHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cImFycm93XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMTAgMTBcIj5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTAsMTAgTDUsMCBMMTAsMTBcIiBzdHJva2Utd2lkdGg9XCIwLjJcIi8+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHR7Z29hbHN9XG5cblx0XHRcdFx0e3Jld2FyZHN9XG5cblx0XHRcdFx0e2FjdGlvbn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBlbmRHb2FsKGdvYWwpe1xuXHRcdGdvYWwuY2hpbGQ9dGhpcy5jb250ZXh0LmNoaWxkLl9pZFxuXHRcdGRiR29hbC51cHNlcnQoZ29hbClcblx0fVxuXG5cdHJld2FyZChhbW91bnQpe1xuXHRcdGxldCBuZXdSZXdhcmQ9e2Ftb3VudCwgY2hpbGQ6dGhpcy5jb250ZXh0LmNoaWxkLl9pZH1cblx0XHRkYlJld2FyZC51cHNlcnQobmV3UmV3YXJkKVxuXHR9XG5cblx0b25SZWFzb25DaGFuZ2UocmV3YXJkLCBuZXdSZWFzb24pe1xuXHRcdHJld2FyZC5yZWFzb249bmV3UmVhc29uXG5cdFx0ZGJSZXdhcmQudXBzZXJ0KHJld2FyZClcblx0fVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRoZWlnaHQ6MjBcblx0fVxufVxuXG5jbGFzcyBQZW5kaW5nR29hbCBleHRlbmRzIEl0ZW17XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdG9uUGVuZEdvYWw6YT0+MVxuXHR9XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0cmV3YXJkOlwiXCIsXG5cdFx0XHR0b3RhbDpcIlwiXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtjdXJyZW50LCBib3R0b219PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsIHBlbmRpbmdcIiBzdHlsZT17e2JvdHRvbX19PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7cmV3YXJkOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cmV3YXJkfHxcIlwifVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3Jld2FyZDplLnRhcmdldC52YWx1ZX0pfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwicGVuZGluZ1Jld2FyZFwiXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIk5ldyBSZXdhcmQuLi5cIlxuXHRcdFx0XHRcdFx0c3R5bGU9e3t0ZXh0QWxpZ246XCJyaWdodFwiLHdpZHRoOlwiMTAwJVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JnJhcXVvOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkJsdXI9e2U9PnRoaXMudHJ5UGVuZCh7dG90YWw6ZS50YXJnZXQudmFsdWV9KX1cblx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIlxuXHRcdFx0XHRcdFx0dmFsdWU9e3RvdGFsfHxcIlwifVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3RvdGFsOmUudGFyZ2V0LnZhbHVlfSl9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17YEdvYWw6PiR7Y3VycmVudH1gfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjZlbVwifX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHRyeVBlbmQoc3RhdGUpe1xuXHRcdGxldCB7cmV3YXJkOm5ld1Jld2FyZCwgdG90YWw6bmV3VG90YWx9PXN0YXRlXG5cdFx0bGV0IHtjdXJyZW50LG9uUGVuZEdvYWx9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZCwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRpZihuZXdSZXdhcmQpXG5cdFx0XHRyZXdhcmQ9bmV3UmV3YXJkXG5cdFx0aWYobmV3VG90YWwpXG5cdFx0XHR0b3RhbD1uZXdUb3RhbFxuXHRcdGlmKHJld2FyZC50cmltKCkgJiYgdG90YWwudHJpbSgpKXtcblx0XHRcdHRvdGFsPXBhcnNlSW50KHRvdGFsLnRyaW0oKSlcblx0XHRcdGlmKHRvdGFsPmN1cnJlbnQpe1xuXHRcdFx0XHRyZXdhcmQ9cmV3YXJkLnRyaW0oKVxuXHRcdFx0XHRvblBlbmRHb2FsKHtyZXdhcmQsdG90YWx9KVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRVSS5NZXNzYWdlci5zaG93KGBuZXcgZ29hbCBtdXN0IGdyZWF0ZXIgdGhhbiBjdXJyZW50IHRvdGFsICR7Y3VycmVudH1gKVxuXHRcdFx0XHRSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZ29hbCkuZm9jdXMoKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtyZXdhcmQsdG90YWx9KVxuXHR9XG59XG5cbmNsYXNzIEFHb2FsIGV4dGVuZHMgSXRlbXtcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZXdhcmQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHN0eWxlPXtmb250U2l6ZTpcIngtc21hbGxcIiwgd2hpdGVTcGFjZTpcIm5vd3JhcFwiLGJhY2tncm91bmRDb2xvcjpcImxpZ2h0Z3JlZW5cIn1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXY+PEF2YXRhciBzdHlsZT17c3R5bGV9PntyZXdhcmR9PC9BdmF0YXI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2Pnt0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBBUmV3YXJkIGV4dGVuZHMgSXRlbXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT17bmV3UmVhc29uOm51bGx9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOm51bGx9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0bGV0IHtyZWFzb259PXRoaXMucmVmc1xuXHRcdHJlYXNvbiAmJiByZWFzb24uZm9jdXMoKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZWFzb24sYW1vdW50LHRvdGFsLGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCB7bmV3UmVhc29ufT10aGlzLnN0YXRlXG5cblx0XHRpZihuZXdSZWFzb24pe1xuXHRcdFx0cmVhc29uPSg8VGV4dEZpZWxkIHJlZj1cInJlYXNvblwiIGRlZmF1bHRWYWx1ZT17bmV3UmVhc29ufVxuXHRcdFx0XHRvbkVudGVyS2V5RG93bj17ZT0+ZS50YXJnZXQuYmx1cigpfVxuXHRcdFx0XHRvbkJsdXI9e2U9PnRoaXMucmVhc29uQ2hhbmdlZChlLnRhcmdldC52YWx1ZS50cmltKCkpfS8+KVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZFwiIHN0eWxlPXt7Ym90dG9tOmhlaWdodCp0b3RhbH19PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImljb25cIj4mYnVsbDs8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFzb25cIiBvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHtuZXdSZWFzb246cmVhc29ufHxcIiBcIn0pfT5cblx0XHRcdFx0e3JlYXNvbnx8XCIuLi5cIn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+K3thbW91bnR9L3t0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG5cblx0cmVhc29uQ2hhbmdlZChuZXdSZWFzb24pe1xuXHRcdGxldCB7cmVhc29uLCBvblJlYXNvbkNoYW5nZX09dGhpcy5wcm9wc1xuXHRcdGlmKCFuZXdSZWFzb24gfHwgbmV3UmVhc29uPT1yZWFzb24pe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bmV3UmVhc29uOnVuZGVmaW5lZH0pXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0b25SZWFzb25DaGFuZ2UgJiYgb25SZWFzb25DaGFuZ2UobmV3UmVhc29uKVxuXHR9XG59XG5cblxuaW1wb3J0IFJld2FyZEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kJ1xuY2xhc3MgUmV3YXJkb3IgZXh0ZW5kcyBJdGVte1xuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRjdXJyZW50OlByb3BUeXBlcy5udW1iZXIsXG5cdFx0b25SZXdhcmQ6IFByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRjdXJyZW50OjAsXG5cdFx0b25SZXdhcmQ6IGE9PjFcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9e3BsdXM6MCx0aWNrZXI6bnVsbH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwbHVzOjAsdGlja2VyOm51bGx9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtwbHVzfT10aGlzLnN0YXRlXG5cdFx0bGV0IHtoZWlnaHQsY3VycmVudH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJld2FyZCBwZW5kaW5nXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhc29uXCI+XG5cdFx0XHRcdFx0PFJld2FyZEljb24gY2xhc3NOYW1lPVwicmV3YXJkZXJcIiBvbkNsaWNrPXtlPT50aGlzLnBsdXMoKX0gLz5cblx0XHRcdFx0XHQ8c3Bhbj57Y3VycmVudH08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtgcGx1cyAke3BsdXMgPyBcInBsdXNpbmdcIiA6IFwiXCJ9YH0+K3twbHVzfHwneCd9PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHBsdXMoKXtcblx0XHRsZXQge3BsdXMsdGlja2VyfT10aGlzLnN0YXRlXG5cdFx0dGlja2VyICYmIGNsZWFyVGltZW91dCh0aWNrZXIpXG5cdFx0cGx1cysrXG5cdFx0dGlja2VyPXNldFRpbWVvdXQodGhpcy5yZXdhcmQuYmluZCh0aGlzKSwxMDAwKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3BsdXMsdGlja2VyfSlcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7cGx1cyx0aWNrZXJ9PXRoaXMuc3RhdGVcblx0XHR0aWNrZXIgJiYgY2xlYXJUaW1lb3V0KHRpY2tlcilcblx0XHR0aGlzLnByb3BzLm9uUmV3YXJkKHBsdXMpXG5cdH1cbn1cbiJdfQ==