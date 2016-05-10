'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards() {
		_classCallCheck(this, Rewards);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).apply(this, arguments));
	}

	_createClass(Rewards, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var goals = _props.goals;
			var rewards = _props.rewards;
			var height = _props.height;

			var total = 0,
			    max = 0;
			goals = goals.map(function (a) {
				return _qiliApp.React.createElement(AGoal, {
					key: 'goal_' + a.total,
					height: height,
					reward: a.reward,
					total: (max = Math.max(max, a.total), a.total) });
			});

			rewards = rewards.map(function (a) {
				return _qiliApp.React.createElement(AReward, {
					key: 'reward_' + (total += a.amount),
					onReasonChange: function onReasonChange(newReason) {
						return _this2.onReasonChange(a, newReason);
					},
					height: height,
					reason: a.reason,
					amount: a.amount,
					total: total });
			});

			max = Math.max(total, max);

			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards', style: { height: max * 20 + 40 } },
				goals,
				rewards
			);
		}
	}, {
		key: 'onReasonChange',
		value: function onReasonChange(reward, newReason) {
			reward.reason = newReason;
			_db.Reward.upsert(reward);
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

Rewards.defaultProps = {
	height: 20,
	goals: [{ total: 5, reward: "hug" }, { total: 10, reward: "pencil" }, { total: 20, reward: "pencil sharpener" }],
	rewards: [{ amount: 1, reason: "smile" }, { amount: 5, reason: "reading" }, { amount: 10, reason: "english speaking" }]
};
Rewards.propTypes = {
	child: _qiliApp.React.PropTypes.object,
	goals: _qiliApp.React.PropTypes.array,
	rewards: _qiliApp.React.PropTypes.array
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

var AGoal = function (_Item) {
	_inherits(AGoal, _Item);

	function AGoal() {
		_classCallCheck(this, AGoal);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AGoal).apply(this, arguments));
	}

	_createClass(AGoal, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var reward = _props2.reward;
			var total = _props2.total;
			var height = _props2.height;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'goal', style: { bottom: height * total } },
				_qiliApp.React.createElement(
					'div',
					null,
					reward
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'•'
				),
				_qiliApp.React.createElement(
					'div',
					null,
					total
				)
			);
		}
	}]);

	return AGoal;
}(Item);

var AReward = function (_Item2) {
	_inherits(AReward, _Item2);

	function AReward() {
		_classCallCheck(this, AReward);

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(AReward).apply(this, arguments));

		_this5.state = {};
		return _this5;
	}

	_createClass(AReward, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _props3 = this.props;
			var _props3$reason = _props3.reason;
			var reason = _props3$reason === undefined ? "..." : _props3$reason;
			var amount = _props3.amount;
			var total = _props3.total;
			var height = _props3.height;
			var _state = this.state;
			var _state$editing = _state.editing;
			var editing = _state$editing === undefined ? false : _state$editing;
			var _state$editingReason = _state.editingReason;
			var editingReason = _state$editingReason === undefined ? reason : _state$editingReason;


			if (editing) reason = _qiliApp.React.createElement('input', { ref: 'reason', value: editingReason,
				onBlur: function onBlur(e) {
					return e.target.value != reason && _this6.reasonChanged(e.target.value);
				},
				onChange: function onChange(e) {
					return _this6.setState({ editingReason: e.target.value });
				} });

			return _qiliApp.React.createElement(
				'div',
				{ className: 'reward', style: { bottom: height * total } },
				_qiliApp.React.createElement(
					'div',
					{ className: 'icon' },
					'•'
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'reason', onClick: function onClick(e) {
							return _this6.setState({ editing: true });
						} },
					reason
				),
				_qiliApp.React.createElement(
					'div',
					null,
					'+',
					amount,
					'/',
					total
				)
			);
		}
	}, {
		key: 'reasonChanged',
		value: function reasonChanged(editingReason) {
			var onReasonChange = this.props.onReasonChange;

			this.setState({ editing: undefined });
			onReasonChange && onReasonChange(editingReason);
		}
	}]);

	return AReward;
}(Item);

var Rewardor = function (_React$Component3) {
	_inherits(Rewardor, _React$Component3);

	function Rewardor(props) {
		_classCallCheck(this, Rewardor);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Rewardor).call(this, props));

		_this7.state = { current: _this7.props.current };
		return _this7;
	}

	_createClass(Rewardor, [{
		key: 'render',
		value: function render() {
			var _this8 = this;

			var current = this.state.current;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards_reward' },
				current,
				_qiliApp.React.createElement(
					_materialUi.IconButton,
					{ onClick: function onClick() {
							return _this8.reward();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBb0dBOzs7Ozs7Ozs7Ozs7SUFsR3FCOzs7Ozs7Ozs7OzsyQkFZWjs7O2dCQUNxQixLQUFLLEtBQUwsQ0FEckI7T0FDRixxQkFERTtPQUNLLHlCQURMO09BQ2EsdUJBRGI7O0FBRVAsT0FBSSxRQUFNLENBQU47T0FBUyxNQUFJLENBQUosQ0FGTjtBQUdQLFdBQU0sTUFBTSxHQUFOLENBQVU7V0FBRyw2QkFBQyxLQUFEO0FBQ2hCLG9CQUFhLEVBQUUsS0FBRjtBQUNiLGFBQVEsTUFBUjtBQUNBLGFBQVEsRUFBRSxNQUFGO0FBQ1IsYUFBTyxNQUFJLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYSxFQUFFLEtBQUYsQ0FBakIsRUFBMkIsRUFBRSxLQUFGLENBQWxDLEVBSmdCO0lBQUgsQ0FBaEIsQ0FITzs7QUFTUCxhQUFRLFFBQVEsR0FBUixDQUFZO1dBQUcsNkJBQUMsT0FBRDtBQUNwQix1QkFBZSxTQUFPLEVBQUUsTUFBRixDQUF0QjtBQUNBLHFCQUFnQjthQUFXLE9BQUssY0FBTCxDQUFvQixDQUFwQixFQUFzQixTQUF0QjtNQUFYO0FBQ2hCLGFBQVEsTUFBUjtBQUNBLGFBQVEsRUFBRSxNQUFGO0FBQ1IsYUFBUSxFQUFFLE1BQUY7QUFDUixZQUFPLEtBQVAsRUFOb0I7SUFBSCxDQUFwQixDQVRPOztBQWlCUCxTQUFJLEtBQUssR0FBTCxDQUFTLEtBQVQsRUFBZSxHQUFmLENBQUosQ0FqQk87O0FBbUJQLFVBQ0M7O01BQUssV0FBVSxTQUFWLEVBQW9CLE9BQU8sRUFBQyxRQUFPLE1BQUksRUFBSixHQUFPLEVBQVAsRUFBZixFQUF6QjtJQUNFLEtBREY7SUFHRSxPQUhGO0lBREQsQ0FuQk87Ozs7aUNBNEJPLFFBQVEsV0FBVTtBQUNoQyxVQUFPLE1BQVAsR0FBYyxTQUFkLENBRGdD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SyxLQUFMLEdBQVcsRUFBQyxTQUFRLE9BQUssS0FBTCxDQUFXLE9BQVgsRUFBcEIsQ0FGaUI7O0VBQWxCOztjQVhLOzsyQkFnQkc7OztPQUNGLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFERTs7QUFFUCxVQUNDOztNQUFLLFdBQVUsZ0JBQVYsRUFBTDtJQUNHLE9BREg7SUFFQzs7T0FBWSxTQUFTO2NBQUksT0FBSyxNQUFMO09BQUosRUFBckI7S0FDQyxrREFERDtLQUZEO0lBREQsQ0FGTzs7OzsyQkFZQTtPQUNGLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFERTs7QUFFUCxhQUZPO0FBR1AsUUFBSyxRQUFMLENBQWMsRUFBQyxnQkFBRCxFQUFkLEVBSE87QUFJUCxRQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLENBQXBCLEVBSk87Ozs7UUE1Qkg7RUFBaUIsZUFBTSxTQUFOOztBQUFqQixTQUNFLFlBQVU7QUFDaEIsVUFBUSxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUixXQUFVLGVBQU0sU0FBTixDQUFnQixJQUFoQjs7QUFITixTQU1FLGVBQWE7QUFDbkIsVUFBUSxDQUFSO0FBQ0EsV0FBVSxrQkFBUyxLQUFULEVBQWUsRUFBZiIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdH0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBQbHVzSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1hZGQnXG5pbXBvcnQgRm9yd2FyZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1mb3J3YXJkXCJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5LCBSZXdhcmQgYXMgZGJSZXdhcmQsIEdvYWwgYXMgZGJHb2FsfSBmcm9tICcuLi9kYidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwLFxuXHRcdGdvYWxzOlt7dG90YWw6NSwgcmV3YXJkOlwiaHVnXCJ9LHt0b3RhbDoxMCwgcmV3YXJkOlwicGVuY2lsXCJ9LCB7dG90YWw6MjAsIHJld2FyZDpcInBlbmNpbCBzaGFycGVuZXJcIn1dLFxuXHRcdHJld2FyZHM6W3thbW91bnQ6MSwgcmVhc29uOlwic21pbGVcIn0sIHthbW91bnQ6NSwgcmVhc29uOlwicmVhZGluZ1wifSwge2Ftb3VudDoxMCxyZWFzb246XCJlbmdsaXNoIHNwZWFraW5nXCJ9XVxuXHR9XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGNoaWxkOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0Z29hbHM6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHJld2FyZHM6UmVhY3QuUHJvcFR5cGVzLmFycmF5XG5cdH1cblx0XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7Z29hbHMsIHJld2FyZHMsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHRvdGFsPTAsIG1heD0wXG5cdFx0Z29hbHM9Z29hbHMubWFwKGE9PjxBR29hbFxuXHRcdFx0XHRcdGtleT17YGdvYWxfJHthLnRvdGFsfWB9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0cmV3YXJkPXthLnJld2FyZH0gXG5cdFx0XHRcdFx0dG90YWw9e21heD1NYXRoLm1heChtYXgsYS50b3RhbCksIGEudG90YWx9Lz4pXG5cdFx0XG5cdFx0cmV3YXJkcz1yZXdhcmRzLm1hcChhPT48QVJld2FyZCBcblx0XHRcdFx0XHRrZXk9e2ByZXdhcmRfJHt0b3RhbCs9YS5hbW91bnR9YH1cblx0XHRcdFx0XHRvblJlYXNvbkNoYW5nZT17bmV3UmVhc29uPT50aGlzLm9uUmVhc29uQ2hhbmdlKGEsbmV3UmVhc29uKX1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHRyZWFzb249e2EucmVhc29ufSBcblx0XHRcdFx0XHRhbW91bnQ9e2EuYW1vdW50fSBcblx0XHRcdFx0XHR0b3RhbD17dG90YWx9Lz4pXG5cdFx0XG5cdFx0bWF4PU1hdGgubWF4KHRvdGFsLG1heClcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzXCIgc3R5bGU9e3toZWlnaHQ6bWF4KjIwKzQwfX0+XG5cdFx0XHRcdHtnb2Fsc31cblx0XHRcdFx0XHRcblx0XHRcdFx0e3Jld2FyZHN9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0XG5cdG9uUmVhc29uQ2hhbmdlKHJld2FyZCwgbmV3UmVhc29uKXtcblx0XHRyZXdhcmQucmVhc29uPW5ld1JlYXNvblxuXHRcdGRiUmV3YXJkLnVwc2VydChyZXdhcmQpXG5cdH1cbn1cblxuY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aGVpZ2h0OjIwXG5cdH1cbn1cblxuY2xhc3MgQUdvYWwgZXh0ZW5kcyBJdGVte1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3Jld2FyZCx0b3RhbCxoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJnb2FsXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXY+e3Jld2FyZH08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpY29uXCI+JmJ1bGw7PC9kaXY+XG5cdFx0XHRcdDxkaXY+e3RvdGFsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIEFSZXdhcmQgZXh0ZW5kcyBJdGVte1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXt9XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtyZWFzb249XCIuLi5cIixhbW91bnQsdG90YWwsaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHtlZGl0aW5nPWZhbHNlLCBlZGl0aW5nUmVhc29uPXJlYXNvbn09dGhpcy5zdGF0ZVxuXG5cdFx0aWYoZWRpdGluZylcblx0XHRcdHJlYXNvbj0oPGlucHV0IHJlZj1cInJlYXNvblwiIHZhbHVlPXtlZGl0aW5nUmVhc29ufVxuXHRcdFx0XHRvbkJsdXI9e2U9PihlLnRhcmdldC52YWx1ZSE9cmVhc29uICYmIHRoaXMucmVhc29uQ2hhbmdlZChlLnRhcmdldC52YWx1ZSkpfVxuXHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZ1JlYXNvbjplLnRhcmdldC52YWx1ZX0pfS8+KVx0XG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkXCIgc3R5bGU9e3tib3R0b206aGVpZ2h0KnRvdGFsfX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPiZidWxsOzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlYXNvblwiIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dHJ1ZX0pfT5cblx0XHRcdFx0e3JlYXNvbn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+K3thbW91bnR9L3t0b3RhbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG5cdFxuXHRyZWFzb25DaGFuZ2VkKGVkaXRpbmdSZWFzb24pe1xuXHRcdGxldCB7b25SZWFzb25DaGFuZ2V9PXRoaXMucHJvcHNcblx0XHR0aGlzLnNldFN0YXRlKHtlZGl0aW5nOnVuZGVmaW5lZH0pXG5cdFx0b25SZWFzb25DaGFuZ2UgJiYgb25SZWFzb25DaGFuZ2UoZWRpdGluZ1JlYXNvbilcblx0fVxufVxuXG5cbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL21vb2QnXG5jbGFzcyBSZXdhcmRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0Y3VycmVudDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0Y3VycmVudDowLFxuXHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihkZWx0YSl7fVxuXHR9XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc3RhdGU9e2N1cnJlbnQ6dGhpcy5wcm9wcy5jdXJyZW50fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHtjdXJyZW50fT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkc19yZXdhcmRcIj5cblx0XHRcdFx0eyBjdXJyZW50IH1cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17KCk9PnRoaXMucmV3YXJkKCl9PlxuXHRcdFx0XHRcdDxSZXdhcmRJY29uIC8+XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJld2FyZCgpe1xuXHRcdGxldCB7Y3VycmVudH09dGhpcy5zdGF0ZVxuXHRcdGN1cnJlbnQrK1xuXHRcdHRoaXMuc2V0U3RhdGUoe2N1cnJlbnR9KVxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UoMSlcblx0fVxufVxuIl19