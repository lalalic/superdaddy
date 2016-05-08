'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _alarmAdd = require('material-ui/lib/svg-icons/action/alarm-add');

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _arrowForward = require('material-ui/lib/svg-icons/navigation/arrow-forward');

var _arrowForward2 = _interopRequireDefault(_arrowForward);

var _db = require('../db');

var _mood = require('material-ui/lib/svg-icons/social/mood');

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_RULE = /[\/-]/;

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards(props) {
		_classCallCheck(this, Rewards);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).call(this, props));

		_this.state = {
			rewards: new Map(),
			rewarded: new Map(),
			max: 0,
			min: 0,
			total: 0
		};

		return _this;
	}

	_createClass(Rewards, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._resolveRules(this.props.child);
			this._resolveRewarded(this.props.child);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var newChild = nextProps.child;
			var child = this.props.child;

			if (child != newChild) {
				this.state.rewards.clear();
				this.state.rewarded.clear();
				this._resolveRules(newChild);
				this._resolveRewarded(newChild);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var editable = this.props.editable;
			var _state = this.state;
			var rewards = _state.rewards;
			var rewarded = _state.rewarded;
			var max = _state.max;
			var total = _state.total;

			var height = 20 * Math.max(max, total) + 20;

			var editor = editable ? this._renderEditor() : null;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(Rewardor, { current: total, onChange: function onChange(n) {
						return _this2._reward(n);
					} }),
				_qiliApp.React.createElement(
					'div',
					{ className: 'rewards_detail grid', style: { height: height } },
					_qiliApp.React.createElement(
						'ul',
						{ ref: 'rewarded', className: 'rewarded', style: { height: height } },
						_qiliApp.React.createElement('li', { style: { top: total * 20 } })
					),
					_qiliApp.React.createElement(
						'ul',
						{ ref: 'rules', className: 'rules' },
						function (a) {
							rewards.forEach(function (details, k) {
								return a.push(_qiliApp.React.createElement(
									'li',
									{ style: { top: k * 20 }, key: -k },
									_qiliApp.React.createElement(
										'span',
										null,
										k
									),
									'-->',
									_qiliApp.React.createElement(
										'span',
										null,
										details.join(",")
									)
								));
							});
							return a;
						}([])
					)
				),
				editor
			);
		}
	}, {
		key: '_insert',
		value: function _insert() {
			var _refs = this.refs;
			var target = _refs.target;
			var reward = _refs.reward;var rule = void 0;
			target = target.getDOMNode().value.trim();
			reward = reward.getDOMNode().value.trim();
			if (target.length && reward.length) {
				this._resolveRule(rule = { target: target, reward: reward });
				this.forceUpdate();
				var child = this.props.child;

				child.rewardDetail.push(rule);
				if (child._id) _db.Family.upsert(child);
			}
		}
	}, {
		key: '_reward',
		value: function _reward(count) {
			var _state2 = this.state;
			var rewarded = _state2.rewarded;
			var total = _state2.total;

			var reward = { count: count, comment: "", createdAt: new Date() };
			rewarded.set(total += count, reward);
			this.setState({ total: total });
			var child = this.props.child;

			child.rewardRules.push(reward);
			if (child._id) _db.Family.upsert(child);
		}
	}, {
		key: '_resolveRules',
		value: function _resolveRules(child) {
			var _this3 = this;

			var _child$rewardRules = child.rewardRules;
			var rules = _child$rewardRules === undefined ? [{ //you can get ${reward} when get ${target} stars
				target: "1-10", //5 | 5-10[/1] | 10-20/5 | ,,,
				reward: "hug"
			}, {
				target: "10-100/10",
				reward: "kiss"
			}, {
				target: "50",
				reward: "pen box"
			}, {
				target: "100",
				reward: "Barbie doy"
			}] : _child$rewardRules;

			rules.forEach(function (rule) {
				return _this3._resolveRule(rule);
			});
			child.rewardRules = rules;
		}
	}, {
		key: '_resolveRule',
		value: function _resolveRule(rule) {
			var _state3 = this.state;
			var rewards = _state3.rewards;
			var min = _state3.min;
			var max = _state3.max;
			var target = rule.target;
			var reward = rule.reward;

			target.split(",").forEach(function (seg) {
				var els = seg.split(REG_RULE),
				    temp = void 0;
				switch (els.length) {
					case 1:
						//5
						var n = parseInt(els[0].trim());
						temp = rewards.get(n) || [];
						temp.push(reward);
						rewards.set(n, temp);
						min = Math.min(min, n);
						max = Math.max(max, n);
						break;
					case 2: //5-10, step=1
					case 3:
						// 10-20/5, every 5 from 10 to 20

						var _els = _slicedToArray(els, 3);

						var a = _els[0];
						var b = _els[1];
						var _els$ = _els[2];
						var step = _els$ === undefined ? "1" : _els$;
						var ia = parseInt(a.trim());
						var ib = parseInt(b.trim());
						var start = Math.min(ia, ib);
						var end = Math.max(ia, ib);
						step = parseInt(step.trim());
						for (; start < end + 1; start += step) {
							temp = rewards.get(start) || [];
							temp.push(reward);
							rewards.set(start, temp);
							min = Math.min(min, start);
							max = Math.max(max, start);
						}
						break;
				}
			});
			this.setState({ min: min, max: max });
		}
	}, {
		key: '_resolveRewarded',
		value: function _resolveRewarded(child) {
			var _state4 = this.state;
			var details = _state4.rewarded;
			var min = _state4.min;
			var total = _state4.total;
			var _child$rewardDetail = child.rewardDetail;
			var rewardDetail = _child$rewardDetail === undefined ? [] : _child$rewardDetail;

			rewardDetail.forEach(function (a) {
				if (min == 0) min = a.count;

				total += a.count;
				details.set(total, a);
			});
			this.setState({ total: total, min: min });
			child.rewardDetail = rewardDetail;
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

Rewards.defaultProps = {
	editable: false
};
Rewards.propTypes = {
	child: _qiliApp.React.PropTypes.object,
	editable: _qiliApp.React.PropTypes.bool
};
exports.default = Rewards;

var Rewardor = function (_React$Component2) {
	_inherits(Rewardor, _React$Component2);

	function Rewardor(props) {
		_classCallCheck(this, Rewardor);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).call(this, props));

		_this4.state = { current: _this4.props.current };
		return _this4;
	}

	_createClass(Rewardor, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			var current = this.state.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards_reward' },
				current,
				_qiliApp.React.createElement(
					_materialUi.IconButton,
					{ onClick: function onClick() {
							return _this5.reward();
						} },
					_qiliApp.React.createElement(_mood2.default, null)
				)
			);
		}
	}, {
		key: 'reward',
		value: function reward() {
			var current = this.state.current;

			current++;
			this.setState({ current: current });
			this.props.onChange(1);
		}
	}]);

	return Rewardor;
}(_qiliApp.React.Component);

Rewardor.propTypes = {
	current: _qiliApp.React.PropTypes.number,
	onChange: _qiliApp.React.PropTypes.func
};
Rewardor.defaultProps = {
	current: 0,
	onChange: function onChange(delta) {}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUF3TEE7Ozs7Ozs7Ozs7OztBQXRMQSxJQUFJLFdBQVMsT0FBVDs7SUFFaUI7OztBQVVwQixVQVZvQixPQVVwQixDQUFZLEtBQVosRUFBa0I7d0JBVkUsU0FVRjs7cUVBVkUsb0JBV2IsUUFEVzs7QUFHakIsUUFBSyxLQUFMLEdBQVc7QUFDVixZQUFRLElBQUksR0FBSixFQUFSO0FBQ0EsYUFBUyxJQUFJLEdBQUosRUFBVDtBQUNBLFFBQUksQ0FBSjtBQUNBLFFBQUksQ0FBSjtBQUNBLFVBQU0sQ0FBTjtHQUxELENBSGlCOzs7RUFBbEI7O2NBVm9COzt1Q0F1QkE7QUFDbkIsUUFBSyxhQUFMLENBQW1CLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBbkIsQ0FEbUI7QUFFbkIsUUFBSyxnQkFBTCxDQUFzQixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQXRCLENBRm1COzs7OzRDQUtNLFdBQVU7T0FDeEIsV0FBVSxVQUFoQixNQUQ4QjtPQUU5QixRQUFPLEtBQUssS0FBTCxDQUFQLE1BRjhCOztBQUduQyxPQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNsQixTQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQW5CLEdBRGtCO0FBRWxCLFNBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEIsR0FGa0I7QUFHbEIsU0FBSyxhQUFMLENBQW1CLFFBQW5CLEVBSGtCO0FBSWxCLFNBQUssZ0JBQUwsQ0FBc0IsUUFBdEIsRUFKa0I7SUFBbkI7Ozs7MkJBUU87OztPQUNGLFdBQVUsS0FBSyxLQUFMLENBQVYsU0FERTtnQkFFNkIsS0FBSyxLQUFMLENBRjdCO09BRUYseUJBRkU7T0FFTywyQkFGUDtPQUVpQixpQkFGakI7T0FFc0IscUJBRnRCOztBQUdQLE9BQUksU0FBTyxLQUFHLEtBQUssR0FBTCxD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QVhiLFVBV2E7O3NFQVhiLHFCQVlFLFFBRFc7O0FBRWpCLFNBQUssS0FBTCxHQUFXLEVBQUMsU0FBUSxPQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQXBCLENBRmlCOztFQUFsQjs7Y0FYSzs7MkJBZ0JHOzs7T0FDRixVQUFTLEtBQUssS0FBTCxDQUFULFFBREU7O0FBRVAsVUFDQzs7TUFBSyxXQUFVLGdCQUFWLEVBQUw7SUFDRyxPQURIO0lBRUM7O09BQVksU0FBUztjQUFJLE9BQUssTUFBTDtPQUFKLEVBQXJCO0tBQ0Msa0RBREQ7S0FGRDtJQURELENBRk87Ozs7MkJBWUE7T0FDRixVQUFTLEtBQUssS0FBTCxDQUFULFFBREU7O0FBRVAsYUFGTztBQUdQLFFBQUssUUFBTCxDQUFjLEVBQUMsZ0JBQUQsRUFBZCxFQUhPO0FBSVAsUUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixDQUFwQixFQUpPOzs7O1FBNUJIO0VBQWlCLGVBQU0sU0FBTjs7QUFBakIsU0FDRSxZQUFVO0FBQ2hCLFVBQVEsZUFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1IsV0FBVSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBSE4sU0FNRSxlQUFhO0FBQ25CLFVBQVEsQ0FBUjtBQUNBLFdBQVUsa0JBQVMsS0FBVCxFQUFlLEVBQWYiLCJmaWxlIjoicmV3YXJkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3R9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge1RleHRGaWVsZCwgSWNvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUGx1c0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tYWRkJ1xuaW1wb3J0IEZvcndhcmRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZm9yd2FyZFwiXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi4vZGInXG5cbnZhciBSRUdfUlVMRT0vW1xcLy1dL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXdhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRlZGl0YWJsZTpmYWxzZVxuXHR9XG5cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y2hpbGQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0ZWRpdGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHJld2FyZHM6bmV3IE1hcCgpLFxuXHRcdFx0cmV3YXJkZWQ6bmV3IE1hcCgpLFxuXHRcdFx0bWF4OjAsXG5cdFx0XHRtaW46MCxcblx0XHRcdHRvdGFsOjBcblx0XHR9XG5cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpe1xuXHRcdHRoaXMuX3Jlc29sdmVSdWxlcyh0aGlzLnByb3BzLmNoaWxkKVxuXHRcdHRoaXMuX3Jlc29sdmVSZXdhcmRlZCh0aGlzLnByb3BzLmNoaWxkKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXHRcdGxldCB7Y2hpbGQ6bmV3Q2hpbGR9PW5leHRQcm9wc1xuXHRcdGxldCB7Y2hpbGR9PXRoaXMucHJvcHNcblx0XHRpZihjaGlsZCE9bmV3Q2hpbGQpe1xuXHRcdFx0dGhpcy5zdGF0ZS5yZXdhcmRzLmNsZWFyKClcblx0XHRcdHRoaXMuc3RhdGUucmV3YXJkZWQuY2xlYXIoKVxuXHRcdFx0dGhpcy5fcmVzb2x2ZVJ1bGVzKG5ld0NoaWxkKVxuXHRcdFx0dGhpcy5fcmVzb2x2ZVJld2FyZGVkKG5ld0NoaWxkKVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGxldCB7ZWRpdGFibGV9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jld2FyZHMsIHJld2FyZGVkLCBtYXgsIHRvdGFsfT10aGlzLnN0YXRlXG5cdFx0bGV0IGhlaWdodD0yMCpNYXRoLm1heChtYXgsdG90YWwpKzIwXG5cblx0XHRsZXQgZWRpdG9yPSBlZGl0YWJsZSA/IHRoaXMuX3JlbmRlckVkaXRvcigpIDogbnVsbFxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXG5cdFx0XHRcdDxSZXdhcmRvciBjdXJyZW50PXt0b3RhbH0gb25DaGFuZ2U9e249PnRoaXMuX3Jld2FyZChuKX0vPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkc19kZXRhaWwgZ3JpZFwiIHN0eWxlPXt7aGVpZ2h0fX0+XG5cdFx0XHRcdFx0PHVsIHJlZj1cInJld2FyZGVkXCIgY2xhc3NOYW1lPVwicmV3YXJkZWRcIiBzdHlsZT17e2hlaWdodH19PlxuXHRcdFx0XHRcdFx0PGxpIHN0eWxlPXt7dG9wOnRvdGFsKjIwfX0vPlxuXHRcdFx0XHRcdFx0ey8qXG5cdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdFx0XHRcdGxldCBzdW09MFxuXHRcdFx0XHRcdFx0XHRcdHJld2FyZGVkLmZvckVhY2goKGRldGFpbCxrKT0+XG5cdFx0XHRcdFx0XHRcdFx0XHRhLnB1c2goPGxpIHN0eWxlPXt7dG9wOihzdW0rPWRldGFpbC5jb3VudCkqMjB9fSBrZXk9e2t9PjwvbGk+KVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHRcdFx0XHR9KFtdKVxuXHRcdFx0XHRcdFx0Ki99XG5cdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHQ8dWwgcmVmPVwicnVsZXNcIiBjbGFzc05hbWU9XCJydWxlc1wiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRcdFx0XHRyZXdhcmRzLmZvckVhY2goKGRldGFpbHMsayk9PlxuXHRcdFx0XHRcdFx0XHRcdFx0YS5wdXNoKDxsaSBzdHlsZT17e3RvcDprKjIwfX0ga2V5PXsta30+PHNwYW4+e2t9PC9zcGFuPi0tPjxzcGFuPntkZXRhaWxzLmpvaW4oXCIsXCIpfTwvc3Bhbj48L2xpPilcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0XHRcdFx0fShbXSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHR7ZWRpdG9yfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXG5cblx0X2luc2VydCgpe1xuXHRcdGxldCB7dGFyZ2V0LCByZXdhcmR9PXRoaXMucmVmcywgcnVsZVxuXHRcdHRhcmdldD10YXJnZXQuZ2V0RE9NTm9kZSgpLnZhbHVlLnRyaW0oKVxuXHRcdHJld2FyZD1yZXdhcmQuZ2V0RE9NTm9kZSgpLnZhbHVlLnRyaW0oKVxuXHRcdGlmKHRhcmdldC5sZW5ndGggJiYgcmV3YXJkLmxlbmd0aCl7XG5cdFx0XHR0aGlzLl9yZXNvbHZlUnVsZShydWxlPXt0YXJnZXQsIHJld2FyZH0pXG5cdFx0XHR0aGlzLmZvcmNlVXBkYXRlKClcblx0XHRcdGxldCB7Y2hpbGR9PXRoaXMucHJvcHNcblx0XHRcdGNoaWxkLnJld2FyZERldGFpbC5wdXNoKHJ1bGUpXG5cdFx0XHRpZihjaGlsZC5faWQpXG5cdCAgICAgICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHR9XG5cdH1cblxuXHRfcmV3YXJkKGNvdW50KXtcblx0XHRsZXQge3Jld2FyZGVkLCB0b3RhbH09dGhpcy5zdGF0ZVxuXHRcdGxldCByZXdhcmQ9e2NvdW50LGNvbW1lbnQ6XCJcIiwgY3JlYXRlZEF0Om5ldyBEYXRlKCl9XG5cdFx0cmV3YXJkZWQuc2V0KHRvdGFsKz1jb3VudCwgcmV3YXJkKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3RvdGFsfSlcblx0XHRsZXQge2NoaWxkfT10aGlzLnByb3BzXG5cdFx0Y2hpbGQucmV3YXJkUnVsZXMucHVzaChyZXdhcmQpXG5cdFx0aWYoY2hpbGQuX2lkKVxuXHRcdFx0ZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHR9XG5cblx0X3Jlc29sdmVSdWxlcyhjaGlsZCl7XG5cdFx0bGV0IHtyZXdhcmRSdWxlczpydWxlcz1bey8veW91IGNhbiBnZXQgJHtyZXdhcmR9IHdoZW4gZ2V0ICR7dGFyZ2V0fSBzdGFyc1xuXHRcdFx0dGFyZ2V0OiBcIjEtMTBcIiwvLzUgfCA1LTEwWy8xXSB8IDEwLTIwLzUgfCAsLCxcblx0XHRcdHJld2FyZDogXCJodWdcIlxuXHRcdH0se1xuXHRcdFx0dGFyZ2V0OiBcIjEwLTEwMC8xMFwiLFxuXHRcdFx0cmV3YXJkOiBcImtpc3NcIlxuXHRcdH0se1xuXHRcdFx0dGFyZ2V0OiBcIjUwXCIsXG5cdFx0XHRyZXdhcmQ6IFwicGVuIGJveFwiXG5cdFx0fSx7XG5cdFx0XHR0YXJnZXQ6IFwiMTAwXCIsXG5cdFx0XHRyZXdhcmQ6IFwiQmFyYmllIGRveVwiXG5cdFx0fV19PWNoaWxkXG5cdFx0cnVsZXMuZm9yRWFjaChydWxlPT50aGlzLl9yZXNvbHZlUnVsZShydWxlKSlcblx0XHRjaGlsZC5yZXdhcmRSdWxlcz1ydWxlc1xuXHR9XG5cblxuXHRfcmVzb2x2ZVJ1bGUocnVsZSl7XG5cdFx0bGV0IHtyZXdhcmRzLG1pbixtYXh9PXRoaXMuc3RhdGVcblx0XHRsZXQge3RhcmdldCwgcmV3YXJkfT1ydWxlXG5cdFx0dGFyZ2V0LnNwbGl0KFwiLFwiKS5mb3JFYWNoKHNlZz0+e1xuXHRcdFx0bGV0IGVscz1zZWcuc3BsaXQoUkVHX1JVTEUpLCB0ZW1wXG5cdFx0XHRzd2l0Y2goZWxzLmxlbmd0aCl7XG5cdFx0XHRjYXNlIDE6Ly81XG5cdFx0XHRcdGxldCBuPXBhcnNlSW50KGVsc1swXS50cmltKCkpXG5cdFx0XHRcdHRlbXA9cmV3YXJkcy5nZXQobil8fFtdXG5cdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdHJld2FyZHMuc2V0KG4sdGVtcClcblx0XHRcdFx0bWluPU1hdGgubWluKG1pbixuKVxuXHRcdFx0XHRtYXg9TWF0aC5tYXgobWF4LG4pXG5cdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOi8vNS0xMCwgc3RlcD0xXG5cdFx0XHRjYXNlIDM6Ly8gMTAtMjAvNSwgZXZlcnkgNSBmcm9tIDEwIHRvIDIwXG5cdFx0XHRcdGxldCBbYSxiLHN0ZXA9XCIxXCJdPWVscyxcblx0XHRcdFx0XHRpYT1wYXJzZUludChhLnRyaW0oKSksXG5cdFx0XHRcdFx0aWI9cGFyc2VJbnQoYi50cmltKCkpLFxuXHRcdFx0XHRcdHN0YXJ0PU1hdGgubWluKGlhLGliKSxcblx0XHRcdFx0XHRlbmQ9TWF0aC5tYXgoaWEsaWIpXG5cdFx0XHRcdHN0ZXA9cGFyc2VJbnQoc3RlcC50cmltKCkpXG5cdFx0XHRcdGZvcig7c3RhcnQ8ZW5kKzE7c3RhcnQrPXN0ZXApe1xuXHRcdFx0XHRcdHRlbXA9cmV3YXJkcy5nZXQoc3RhcnQpfHxbXVxuXHRcdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdFx0cmV3YXJkcy5zZXQoc3RhcnQsdGVtcClcblx0XHRcdFx0XHRtaW49TWF0aC5taW4obWluLHN0YXJ0KVxuXHRcdFx0XHRcdG1heD1NYXRoLm1heChtYXgsc3RhcnQpXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR0aGlzLnNldFN0YXRlKHttaW4sbWF4fSlcblx0fVxuXG5cblx0X3Jlc29sdmVSZXdhcmRlZChjaGlsZCl7XG5cdFx0bGV0IHtyZXdhcmRlZDpkZXRhaWxzLG1pbiwgdG90YWx9PXRoaXMuc3RhdGVcblx0XHRsZXQge3Jld2FyZERldGFpbD1bXX09Y2hpbGRcblx0XHRyZXdhcmREZXRhaWwuZm9yRWFjaChhPT57XG5cdFx0XHRpZihtaW49PTApXG5cdFx0XHRcdG1pbj1hLmNvdW50O1xuXG5cdFx0XHR0b3RhbCs9YS5jb3VudFxuXHRcdFx0ZGV0YWlscy5zZXQodG90YWwsYSlcblx0XHR9KVxuXHRcdHRoaXMuc2V0U3RhdGUoe3RvdGFsLCBtaW59KVxuXHRcdGNoaWxkLnJld2FyZERldGFpbD1yZXdhcmREZXRhaWxcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL21vb2QnXG5jbGFzcyBSZXdhcmRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihkZWx0YSl7fVxuXHR9XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc3RhdGU9e2N1cnJlbnQ6dGhpcy5wcm9wcy5jdXJyZW50fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtjdXJyZW50fT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkc19yZXdhcmRcIj5cblx0XHRcdFx0eyBjdXJyZW50IH1cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17KCk9PnRoaXMucmV3YXJkKCl9PlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIC8+XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7Y3VycmVudH09dGhpcy5zdGF0ZVxuXHRcdGN1cnJlbnQrK1xuXHRcdHRoaXMuc2V0U3RhdGUoe2N1cnJlbnR9KVxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoMSlcblx0fVxufVxuIl19