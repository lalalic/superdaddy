'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _mood = require('material-ui/lib/svg-icons/social/mood');

var _mood2 = _interopRequireDefault(_mood);

var _timeline = require('./timeline');

var _timeline2 = _interopRequireDefault(_timeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_RULE = /[\/-]/;

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards() {
		_classCallCheck(this, Rewards);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).apply(this, arguments));
	}

	_createClass(Rewards, [{
		key: 'render',
		value: function render() {
			var editable = this.props.editable;

			var _getResolvedRules2 = this._getResolvedRules();

			var _getResolvedRules3 = _slicedToArray(_getResolvedRules2, 3);

			var rewardsFromRules = _getResolvedRules3[0];
			var min1 = _getResolvedRules3[1];
			var max1 = _getResolvedRules3[2];

			var _getRewardedDetail2 = this._getRewardedDetail();

			var _getRewardedDetail3 = _slicedToArray(_getRewardedDetail2, 4);

			var total = _getRewardedDetail3[0];
			var rewarded = _getRewardedDetail3[1];
			var min2 = _getRewardedDetail3[2];
			var max2 = _getRewardedDetail3[3];

			var min = Math.min(min1, min2),
			    max = Math.max(max1, max2);
			var height = 20 * max + 20;

			var editor = editable ? this._renderEditor() : null;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(
					'div',
					{ className: 'rewards_reward' },
					total,
					_qiliApp.React.createElement(
						_materialUi.IconButton,
						null,
						_qiliApp.React.createElement(_mood2.default, null)
					)
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'rewards_detail grid', style: { height: height } },
					_qiliApp.React.createElement(
						'ul',
						{ ref: 'rewarded', className: 'rewarded', style: { height: height } },
						function (a) {
							var sum = 0;
							rewarded.forEach(function (detail, k) {
								return a.push(_qiliApp.React.createElement(
									'li',
									{ style: { top: (sum += detail.count) * 20 }, key: k },
									k,
									' ->',
									detail.count + ' for ' + detail.comment + ' at ' + detail.createdAt
								));
							});
							return a;
						}([])
					),
					_qiliApp.React.createElement(
						'ul',
						{ ref: 'rules', className: 'rules' },
						function (a) {
							rewardsFromRules.forEach(function (details, k) {
								return a.push(_qiliApp.React.createElement(
									'li',
									{ style: { top: k * 20 } },
									k,
									' -> ',
									details.join(",")
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
		key: '_getResolvedRules',
		value: function _getResolvedRules() {
			var rewards = new Map(),
			    min = 0,
			    max = 0;
			this.props.rules.forEach(function (rule) {
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
								min = Math.min(start, min);
								max = Math.max(start, max);
							}
							break;
					}
				});
			});
			return [rewards, min, max];
		}
	}, {
		key: '_renderEditor',
		value: function _renderEditor() {
			return _qiliApp.React.createElement(
				'div',
				{ className: 'rewards_editor' },
				_qiliApp.React.createElement('input', { placeholder: '1, or 1-5 for a range, or 10-20/2, every 2 from 10 to 20' }),
				_qiliApp.React.createElement('input', { placeholder: 'reward:a chocolate or a set of lego ...' })
			);
		}
	}, {
		key: '_getRewardedDetail',
		value: function _getRewardedDetail() {
			var details = new Map(),
			    sum = 0,
			    min = 0;
			this.props.rewardDetail.forEach(function (a) {
				if (min == 0) min = a.count;

				sum += a.count;
				details.set(sum, a);
			});
			return [sum, details, min, sum];
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

Rewards.defaultProps = {
	rules: [{ //you can get ${reward} when get ${target} stars
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
	}],
	rewardDetail: [],
	editable: false
};
Rewards.propTypes = {
	rules: _qiliApp.React.PropTypes.array,
	rewardDetail: _qiliApp.React.PropTypes.array,
	onRule: _qiliApp.React.PropTypes.func,
	onReward: _qiliApp.React.PropTypes.func,
	editable: _qiliApp.React.PropTypes.bool
};
exports.default = Rewards;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksV0FBUyxPQUFUOztJQUVpQjs7Ozs7Ozs7Ozs7MkJBMkJUO09BQ0wsV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURLOzs0QkFFdUIsS0FBSyxpQkFBTCxHQUZ2Qjs7OztPQUVMLHlDQUZLO09BRVksNkJBRlo7T0FFaUIsNkJBRmpCOzs2QkFHcUIsS0FBSyxrQkFBTCxHQUhyQjs7OztPQUdMLCtCQUhLO09BR0Msa0NBSEQ7T0FHVSw4QkFIVjtPQUdlLDhCQUhmOztBQUlWLE9BQUksTUFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFULEVBQWMsSUFBZCxDQUFKO09BQXlCLE1BQUksS0FBSyxHQUFMLENBQVMsSUFBVCxFQUFjLElBQWQsQ0FBSixDQUpuQjtBQUtWLE9BQUksU0FBTyxLQUFHLEdBQUgsR0FBTyxFQUFQLENBTEQ7O0FBT1YsT0FBSSxTQUFRLFdBQVcsS0FBSyxhQUFMLEVBQVgsR0FBa0MsSUFBbEMsQ0FQRjs7QUFTSixVQUNJOzs7SUFDUjs7T0FBSyxXQUFVLGdCQUFWLEVBQUw7S0FDRyxLQURIO0tBRUM7OztNQUNDLGtEQUREO01BRkQ7S0FEUTtJQVFSOztPQUFLLFdBQVUscUJBQVYsRUFBZ0MsT0FBTyxFQUFDLGNBQUQsRUFBUCxFQUFyQztLQUNDOztRQUFJLEtBQUksVUFBSixFQUFlLFdBQVUsVUFBVixFQUFxQixPQUFPLEVBQUMsY0FBRCxFQUFQLEVBQXhDO01BRUUsVUFBUyxDQUFULEVBQVc7QUFDVixXQUFJLE1BQUksQ0FBSixDQURNO0FBRVYsZ0JBQVMsT0FBVCxDQUFpQixVQUFDLE1BQUQsRUFBUSxDQUFSO2VBQ2hCLEVBQUUsSUFBRixDQUFPOztXQUFJLE9BQU8sRUFBQyxLQUFJLENBQUMsT0FBSyxPQUFPLEtBQVAsQ0FBTixHQUFvQixFQUFwQixFQUFaLEVBQXFDLEtBQUssQ0FBTCxFQUF6QztTQUFrRCxDQUFsRDs7U0FBMkQsT0FBTyxLQUFQLGFBQW9CLE9BQU8sT0FBUCxZQUFxQixPQUFPLFNBQVA7U0FBM0c7UUFEZ0IsQ0FBakIsQ0FGVTtBQUtWLGNBQU8sQ0FBUCxDQUxVO09BQVgsQ0FNRSxFQU5GLENBRkY7TUFERDtLQVlDOztRQUFJLEtBQUksT0FBSixFQUFZLFdBQVUsT0FBVixFQUFoQjtNQUVFLFVBQVMsQ0FBVCxFQUFXO0FBQ1Ysd0JBQWlCLE9BQWpCLENBQXlCLFVBQUMsT0FBRCxFQUFTLENBQVQ7ZUFDeEIsRUFBRSxJQUFGLENBQU87O1dBQUksT0FBTyxFQUFDLEtBQUksSUFBRSxFQUFGLEVBQVosRUFBSjtTQUF3QixDQUF4Qjs7U0FBK0IsUUFBUSxJQUFSLENBQWEsR0FBYixDQUEvQjtTQUFQO1FBRHdCLENBQXpCLENBRFU7QUFJVixjQUFPLENBQVAsQ0FKVTtPQUFYLENBS0UsRUFMRixDQUZGO01BWkQ7S0FSUTtJQWdDUCxNQWhDTztJQURKLENBVEk7Ozs7c0NBZ0RRO0FBQ2xCLE9BQUksVUFBUSxJQUFJLEdBQUosRUFBUjtPQUFtQixNQUFJLENBQUo7T0FBTyxNQUFJLENBQUosQ0FEWjtBQUVsQixRQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE9BQWpCLENBQXlCLGdCQUFNO1FBQ3pCLFNBQWdCLEtBQWhCLE9BRHlCO1FBQ2pCLFNBQVEsS0FBUixPQURpQjs7QUFFOUIsV0FBTyxLQUFQLENBQWEsR0FBYixFQUFrQixPQUFsQixDQUEwQixlQUFLO0FBQzlCLFNBQUksTUFBSSxJQUFJLEtBQUosQ0FBVSxRQUFWLENBQUo7U0FBeUIsYUFBN0IsQ0FEOEI7QUFFOUIsYUFBTyxJQUFJLE1BQUo7QUFDUCxXQUFLLENBQUw7O0FBQ0MsV0FBSSxJQUFFLFNBQVMsSUFBSSxDQUFKLEVBQU8sSUFBUCxFQUFULENBQUYsQ0FETDtBQUVDLGNBQUssUUFBUSxHQUFSLENBQVksQ0FBWixLQUFnQixFQUFoQixDQUZOO0FBR0MsWUFBSyxJQUFMLENBQVUsTUFBVixFQUhEO0FBSUMsZUFBUSxHQUFSLENBQVksQ0FBWixFQUFjLElBQWQsRUFKRDtBQUtDLGFBQUksS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFhLENBQWIsQ0FBSixDQUxEO0FBTUMsYUFBSSxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWEsQ0FBYixDQUFKLENBTkQ7QUFPQSxhQVBBO0FBREEsV0FTSyxDQUFMO0FBVEEsV0FVSyxDQUFMOzs7aUNBQ29CLFFBRHBCOztXQUNNLFlBRE47V0FDUSxZQURSOztBQUNLLFdBQUssNkJBQUssV0FBVixDQURMO0FBRUUsZ0JBQUcsU0FBUyxFQUFFLElBQUYsRUFBVCxDQUFILENBRkY7QUFHRSxnQkFBRyxTQUFTLEVBQUUsSUFBRixFQUFULENBQUgsQ0FIRjtBQUlFLG1CQUFNLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBWSxFQUFaLENBQU4sQ0FKRjtBQUtFLGlCQUFJLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBWSxFQUFaLENBQUosQ0FMRjtBQU1DLGNBQUssU0FBUyxLQUFLLElBQUwsRUFBVCxDQUFMLENBTkQ7QUFPQyxjQUFLLFFBQU0sTUFBSSxDQUFKLEVBQU0sU0FBTyxJQUFQLEVBQVk7QUFDNUIsZUFBSyxRQUFRLEdBQVIsQ0FBWSxLQUFaLEtBQW9CLEVBQXBCLENBRHVCO0FBRTVCLGFBQUssSUFBTCxDQUFVLE1BQVYsRUFGNEI7QUFHNUIsZ0JBQVEsR0FBUixDQUFZLEtBQVosRUFBa0IsSUFBbEIsRUFINEI7QUFJNUIsY0FBSSxLQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWUsR0FBZixDQUFKLENBSjRCO0FBSzVCLGNBQUksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFlLEdBQWYsQ0FBSixDQUw0QjtRQUE3QjtBQU9ELGFBZEE7QUFWQSxNQUY4QjtLQUFMLENBQTFCLENBRjhCO0lBQU4sQ0FBekIsQ0FGa0I7QUFrQ2xCLFVBQU8sQ0FBQyxPQUFELEVBQVMsR0FBVCxFQUFhLEdBQWIsQ0FBUCxDQWxDa0I7Ozs7a0NBcUNKO0FBQ2QsVUFDQzs7TUFBSyxXQUFVLGdCQUFWLEVBQUw7SUFDQyx3Q0FBTyxhQUFZLDBEQUFaLEVBQVAsQ0FERDtJQUVDLHdDQUFPLGFBQVkseUNBQVosRUFBUCxDQUZEO0lBREQsQ0FEYzs7Ozt1Q0FTSztBQUNuQixPQUFJLFVBQVEsSUFBSSxHQUFKLEVBQVI7T0FBbUIsTUFBSSxDQUFKO09BQU8sTUFBSSxDQUFKLENBRFg7QUFFbkIsUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixPQUF4QixDQUFnQyxhQUFHO0FBQ2xDLFFBQUcsT0FBSyxDQUFMLEVBQ0YsTUFBSSxFQUFFLEtBQUYsQ0FETDs7QUFHQSxXQUFLLEVBQUUsS0FBRixDQUo2QjtBQUtsQyxZQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWdCLENBQWhCLEVBTGtDO0lBQUgsQ0FBaEMsQ0FGbUI7QUFTbkIsVUFBTyxDQUFDLEdBQUQsRUFBSyxPQUFMLEVBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFQLENBVG1COzs7O1FBekhBO0VBQWdCLGVBQU0sU0FBTjs7QUFBaEIsUUFDYixlQUFhO0FBQ25CLFFBQU0sQ0FBQztBQUNOLFVBQVEsTUFBUjtBQUNBLFVBQVEsS0FBUjtFQUZLLEVBR0o7QUFDRCxVQUFRLFdBQVI7QUFDQSxVQUFRLE1BQVI7RUFMSyxFQU1KO0FBQ0QsVUFBUSxJQUFSO0FBQ0EsVUFBUSxTQUFSO0VBUkssRUFTSjtBQUNELFVBQVEsS0FBUjtBQUNBLFVBQVEsWUFBUjtFQVhLLENBQU47QUFhQSxlQUFhLEVBQWI7QUFDQSxXQUFTLEtBQVQ7O0FBaEJtQixRQW1CYixZQUFVO0FBQ2hCLFFBQU8sZUFBTSxTQUFOLENBQWdCLEtBQWhCO0FBQ1AsZUFBYyxlQUFNLFNBQU4sQ0FBZ0IsS0FBaEI7QUFDZCxTQUFRLGVBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNSLFdBQVUsZUFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ1YsV0FBVSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O2tCQXhCUyIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdH0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7VGV4dEZpZWxkLCBJY29uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBSZXdhcmRJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL21vb2QnXG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi90aW1lbGluZSdcblxudmFyIFJFR19SVUxFPS9bXFwvLV0vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHJ1bGVzOlt7Ly95b3UgY2FuIGdldCAke3Jld2FyZH0gd2hlbiBnZXQgJHt0YXJnZXR9IHN0YXJzXG5cdFx0XHR0YXJnZXQ6IFwiMS0xMFwiLC8vNSB8IDUtMTBbLzFdIHwgMTAtMjAvNSB8ICwsLFxuXHRcdFx0cmV3YXJkOiBcImh1Z1wiXG5cdFx0fSx7XG5cdFx0XHR0YXJnZXQ6IFwiMTAtMTAwLzEwXCIsXG5cdFx0XHRyZXdhcmQ6IFwia2lzc1wiXG5cdFx0fSx7XG5cdFx0XHR0YXJnZXQ6IFwiNTBcIixcblx0XHRcdHJld2FyZDogXCJwZW4gYm94XCJcblx0XHR9LHtcblx0XHRcdHRhcmdldDogXCIxMDBcIixcblx0XHRcdHJld2FyZDogXCJCYXJiaWUgZG95XCJcblx0XHR9XSxcblx0XHRyZXdhcmREZXRhaWw6W10sXG5cdFx0ZWRpdGFibGU6ZmFsc2Vcblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHJ1bGVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0cmV3YXJkRGV0YWlsOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0b25SdWxlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvblJld2FyZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0ZWRpdGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG5cdH1cblxuICAgIHJlbmRlcigpe1xuXHRcdGxldCB7ZWRpdGFibGV9PXRoaXMucHJvcHNcblx0XHRsZXQgW3Jld2FyZHNGcm9tUnVsZXMsbWluMSxtYXgxXT10aGlzLl9nZXRSZXNvbHZlZFJ1bGVzKClcblx0XHRsZXQgW3RvdGFsLHJld2FyZGVkLG1pbjIsbWF4Ml09dGhpcy5fZ2V0UmV3YXJkZWREZXRhaWwoKVxuXHRcdGxldCBtaW49TWF0aC5taW4obWluMSxtaW4yKSwgbWF4PU1hdGgubWF4KG1heDEsbWF4Milcblx0XHRsZXQgaGVpZ2h0PTIwKm1heCsyMFxuXG5cdFx0bGV0IGVkaXRvcj0gZWRpdGFibGUgPyB0aGlzLl9yZW5kZXJFZGl0b3IoKSA6IG51bGxcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzX3Jld2FyZFwiPlxuXHRcdFx0XHRcdHsgdG90YWwgfVxuXHRcdFx0XHRcdDxJY29uQnV0dG9uPlxuXHRcdFx0XHRcdFx0PFJld2FyZEljb24gLz5cblx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkc19kZXRhaWwgZ3JpZFwiIHN0eWxlPXt7aGVpZ2h0fX0+XG5cdFx0XHRcdFx0PHVsIHJlZj1cInJld2FyZGVkXCIgY2xhc3NOYW1lPVwicmV3YXJkZWRcIiBzdHlsZT17e2hlaWdodH19PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRcdFx0XHRsZXQgc3VtPTBcblx0XHRcdFx0XHRcdFx0XHRyZXdhcmRlZC5mb3JFYWNoKChkZXRhaWwsayk9PlxuXHRcdFx0XHRcdFx0XHRcdFx0YS5wdXNoKDxsaSBzdHlsZT17e3RvcDooc3VtKz1kZXRhaWwuY291bnQpKjIwfX0ga2V5PXtrfT57a30gLT57YCR7ZGV0YWlsLmNvdW50fSBmb3IgJHtkZXRhaWwuY29tbWVudH0gYXQgJHtkZXRhaWwuY3JlYXRlZEF0fWB9PC9saT4pXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdFx0XHRcdH0oW10pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHQ8dWwgcmVmPVwicnVsZXNcIiBjbGFzc05hbWU9XCJydWxlc1wiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRcdFx0XHRyZXdhcmRzRnJvbVJ1bGVzLmZvckVhY2goKGRldGFpbHMsayk9PlxuXHRcdFx0XHRcdFx0XHRcdFx0YS5wdXNoKDxsaSBzdHlsZT17e3RvcDprKjIwfX0+e2t9IC0+IHtkZXRhaWxzLmpvaW4oXCIsXCIpfTwvbGk+KVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHRcdFx0XHR9KFtdKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdHtlZGl0b3J9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdF9nZXRSZXNvbHZlZFJ1bGVzKCl7XG5cdFx0dmFyIHJld2FyZHM9bmV3IE1hcCgpLCBtaW49MCwgbWF4PTBcblx0XHR0aGlzLnByb3BzLnJ1bGVzLmZvckVhY2gocnVsZT0+e1xuXHRcdFx0bGV0IHt0YXJnZXQsIHJld2FyZH09cnVsZVxuXHRcdFx0dGFyZ2V0LnNwbGl0KFwiLFwiKS5mb3JFYWNoKHNlZz0+e1xuXHRcdFx0XHRsZXQgZWxzPXNlZy5zcGxpdChSRUdfUlVMRSksIHRlbXBcblx0XHRcdFx0c3dpdGNoKGVscy5sZW5ndGgpe1xuXHRcdFx0XHRjYXNlIDE6Ly81XG5cdFx0XHRcdFx0bGV0IG49cGFyc2VJbnQoZWxzWzBdLnRyaW0oKSlcblx0XHRcdFx0XHR0ZW1wPXJld2FyZHMuZ2V0KG4pfHxbXVxuXHRcdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdFx0cmV3YXJkcy5zZXQobix0ZW1wKVxuXHRcdFx0XHRcdG1pbj1NYXRoLm1pbihtaW4sbilcblx0XHRcdFx0XHRtYXg9TWF0aC5tYXgobWF4LG4pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgMjovLzUtMTAsIHN0ZXA9MVxuXHRcdFx0XHRjYXNlIDM6Ly8gMTAtMjAvNSwgZXZlcnkgNSBmcm9tIDEwIHRvIDIwXG5cdFx0XHRcdFx0bGV0IFthLGIsc3RlcD1cIjFcIl09ZWxzLFxuXHRcdFx0XHRcdFx0aWE9cGFyc2VJbnQoYS50cmltKCkpLFxuXHRcdFx0XHRcdFx0aWI9cGFyc2VJbnQoYi50cmltKCkpLFxuXHRcdFx0XHRcdFx0c3RhcnQ9TWF0aC5taW4oaWEsaWIpLFxuXHRcdFx0XHRcdFx0ZW5kPU1hdGgubWF4KGlhLGliKVxuXHRcdFx0XHRcdHN0ZXA9cGFyc2VJbnQoc3RlcC50cmltKCkpXG5cdFx0XHRcdFx0Zm9yKDtzdGFydDxlbmQrMTtzdGFydCs9c3RlcCl7XG5cdFx0XHRcdFx0XHR0ZW1wPXJld2FyZHMuZ2V0KHN0YXJ0KXx8W11cblx0XHRcdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdFx0XHRyZXdhcmRzLnNldChzdGFydCx0ZW1wKVxuXHRcdFx0XHRcdFx0bWluPU1hdGgubWluKHN0YXJ0LG1pbilcblx0XHRcdFx0XHRcdG1heD1NYXRoLm1heChzdGFydCxtYXgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0cmV0dXJuIFtyZXdhcmRzLG1pbixtYXhdXG5cdH1cblxuXHRfcmVuZGVyRWRpdG9yKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmV3YXJkc19lZGl0b3JcIj5cblx0XHRcdFx0PGlucHV0IHBsYWNlaG9sZGVyPVwiMSwgb3IgMS01IGZvciBhIHJhbmdlLCBvciAxMC0yMC8yLCBldmVyeSAyIGZyb20gMTAgdG8gMjBcIi8+XG5cdFx0XHRcdDxpbnB1dCBwbGFjZWhvbGRlcj1cInJld2FyZDphIGNob2NvbGF0ZSBvciBhIHNldCBvZiBsZWdvIC4uLlwiLz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdF9nZXRSZXdhcmRlZERldGFpbCgpe1xuXHRcdHZhciBkZXRhaWxzPW5ldyBNYXAoKSwgc3VtPTAsIG1pbj0wXG5cdFx0dGhpcy5wcm9wcy5yZXdhcmREZXRhaWwuZm9yRWFjaChhPT57XG5cdFx0XHRpZihtaW49PTApXG5cdFx0XHRcdG1pbj1hLmNvdW50O1xuXG5cdFx0XHRzdW0rPWEuY291bnRcblx0XHRcdGRldGFpbHMuc2V0KHN1bSxhKVxuXHRcdH0pXG5cdFx0cmV0dXJuIFtzdW0sZGV0YWlscywgbWluLCBzdW1dXG5cdH1cbn1cbiJdfQ==