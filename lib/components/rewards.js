"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_RULE = /[\/-]/;

var Rewards = function (_React$Component) {
	_inherits(Rewards, _React$Component);

	function Rewards(props) {
		_classCallCheck(this, Rewards);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Rewards).call(this, props));
	}

	_createClass(Rewards, [{
		key: "render",
		value: function render() {
			var modeUI = void 0;
			var rewardsFromRules = this._getResolvedRules();

			var _getRewardedDetail2 = this._getRewardedDetail();

			var _getRewardedDetail3 = _slicedToArray(_getRewardedDetail2, 2);

			var total = _getRewardedDetail3[0];
			var rewarded = _getRewardedDetail3[1];


			switch (this.props.mode) {
				case "edit":
					modeUI = this._renderEdit();
					break;
				case "view":
					modeUI = this._renderView();
					break;
				case "reward":
					modeUI = this._renderReward();
					break;
			}

			return _qiliApp.React.createElement(
				"div",
				null,
				_qiliApp.React.createElement(
					"ul",
					{ ref: "rewarded" },
					function (a) {
						rewarded.forEach(function (detail, k) {
							return a.push(_qiliApp.React.createElement(
								"li",
								null,
								k,
								" -> ",
								detail.count + " for " + detail.comment + " at " + detail.createdAt
							));
						});
						return a;
					}([])
				),
				_qiliApp.React.createElement(
					"ul",
					{ ref: "rules" },
					function (a) {
						rewardsFromRules.forEach(function (details, k) {
							return a.push(_qiliApp.React.createElement(
								"li",
								null,
								k,
								" -> ",
								details.join(",")
							));
						});
						return a;
					}([])
				),
				total && _qiliApp.React.createElement(
					"div",
					{ className: "rewards_total" },
					"total:$",
					total
				),
				modeUI
			);
		}
	}, {
		key: "_getResolvedRules",
		value: function _getResolvedRules() {
			var rewards = new Map();
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
							}
							break;
					}
				});
			});
			return rewards;
		}
	}, {
		key: "_renderEdit",
		value: function _renderEdit() {
			return _qiliApp.React.createElement(
				"div",
				null,
				_qiliApp.React.createElement("input", { placeholder: "1, or 1-5 for a range, or 10-20/2, every 2 from 10 to 20" }),
				_qiliApp.React.createElement("input", { placeholder: "reward:a chocolate or a set of lego ..." })
			);
		}
	}, {
		key: "_renderReward",
		value: function _renderReward() {
			return _qiliApp.React.createElement(
				"div",
				null,
				"click here to add 1 point"
			);
		}
	}, {
		key: "_renderView",
		value: function _renderView() {
			return null;
		}
	}, {
		key: "_getRewardedDetail",
		value: function _getRewardedDetail() {
			var details = new Map(),
			    sum = 0;
			this.props.rewardDetail.forEach(function (a) {
				sum += a.count;
				details.set(sum, a);
			});
			return [sum, details];
		}
	}]);

	return Rewards;
}(_qiliApp.React.Component);

exports.default = Rewards;


Rewards.defaultProps = {
	rules: [],
	rewardDetail: [],
	mode: "reward"
};

Rewards.propTypes = {
	rules: _qiliApp.React.PropTypes.array,
	rewardDetail: _qiliApp.React.PropTypes.array,
	total: _qiliApp.React.PropTypes.num,
	mode: _qiliApp.React.PropTypes.oneOf("edit", "reward", "view")
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Jld2FyZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBLElBQUksV0FBUyxPQUFUOztJQUVpQjs7O0FBQ2pCLFVBRGlCLE9BQ2pCLENBQVksS0FBWixFQUFrQjt3QkFERCxTQUNDOztnRUFERCxvQkFFUCxRQURRO0VBQWxCOztjQURpQjs7MkJBS1Q7QUFDVixPQUFJLGVBQUosQ0FEVTtBQUVWLE9BQUksbUJBQWlCLEtBQUssaUJBQUwsRUFBakIsQ0FGTTs7NkJBR1csS0FBSyxrQkFBTCxHQUhYOzs7O09BR0wsK0JBSEs7T0FHQyxrQ0FIRDs7O0FBS1YsV0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ1AsU0FBSyxNQUFMO0FBQ0MsY0FBTyxLQUFLLFdBQUwsRUFBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssTUFBTDtBQUNDLGNBQU8sS0FBSyxXQUFMLEVBQVAsQ0FERDtBQUVBLFdBRkE7QUFKQSxTQU9LLFFBQUw7QUFDQyxjQUFPLEtBQUssYUFBTCxFQUFQLENBREQ7QUFFQSxXQUZBO0FBUEEsSUFMVTs7QUFpQkosVUFDSTs7O0lBQ1I7O09BQUksS0FBSSxVQUFKLEVBQUo7S0FFRSxVQUFTLENBQVQsRUFBVztBQUNWLGVBQVMsT0FBVCxDQUFpQixVQUFDLE1BQUQsRUFBUSxDQUFSO2NBQ2hCLEVBQUUsSUFBRixDQUFPOzs7UUFBSyxDQUFMOztRQUFlLE9BQU8sS0FBUCxhQUFvQixPQUFPLE9BQVAsWUFBcUIsT0FBTyxTQUFQO1FBQS9EO09BRGdCLENBQWpCLENBRFU7QUFJVixhQUFPLENBQVAsQ0FKVTtNQUFYLENBS0UsRUFMRixDQUZGO0tBRFE7SUFXSTs7T0FBSSxLQUFJLE9BQUosRUFBSjtLQUVWLFVBQVMsQ0FBVCxFQUFXO0FBQ1YsdUJBQWlCLE9BQWpCLENBQXlCLFVBQUMsT0FBRCxFQUFTLENBQVQ7Y0FDeEIsRUFBRSxJQUFGLENBQU87OztR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QU4sQ0FBZ0IsS0FBaEI7QUFDZCxRQUFNLGVBQU0sU0FBTixDQUFnQixHQUFoQjtBQUNOLE9BQU0sZUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLE1BQXRCLEVBQTZCLFFBQTdCLEVBQXNDLE1BQXRDLENBQU47Q0FKRCIsImZpbGUiOiJyZXdhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdH0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcblxudmFyIFJFR19SVUxFPS9bXFwvLV0vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRsZXQgbW9kZVVJXG5cdFx0bGV0IHJld2FyZHNGcm9tUnVsZXM9dGhpcy5fZ2V0UmVzb2x2ZWRSdWxlcygpXG5cdFx0bGV0IFt0b3RhbCxyZXdhcmRlZF09dGhpcy5fZ2V0UmV3YXJkZWREZXRhaWwoKVxuXHRcdFxuXHRcdHN3aXRjaCh0aGlzLnByb3BzLm1vZGUpe1xuXHRcdGNhc2UgXCJlZGl0XCI6IFxuXHRcdFx0bW9kZVVJPXRoaXMuX3JlbmRlckVkaXQoKVx0XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidmlld1wiOiBcblx0XHRcdG1vZGVVST10aGlzLl9yZW5kZXJWaWV3KClcdFxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInJld2FyZFwiOiBcblx0XHRcdG1vZGVVST10aGlzLl9yZW5kZXJSZXdhcmQoKVx0XG5cdFx0YnJlYWtcblx0XHR9XG5cdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHQ8dWwgcmVmPVwicmV3YXJkZWRcIj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRcdFx0cmV3YXJkZWQuZm9yRWFjaCgoZGV0YWlsLGspPT5cblx0XHRcdFx0XHRcdFx0XHRhLnB1c2goPGxpPntrfSAtPiB7YCR7ZGV0YWlsLmNvdW50fSBmb3IgJHtkZXRhaWwuY29tbWVudH0gYXQgJHtkZXRhaWwuY3JlYXRlZEF0fWB9PC9saT4pXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0XHRcdH0oW10pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuICAgICAgICAgICAgICAgIDx1bCByZWY9XCJydWxlc1wiPlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdFx0XHRyZXdhcmRzRnJvbVJ1bGVzLmZvckVhY2goKGRldGFpbHMsayk9PlxuXHRcdFx0XHRcdFx0XHRcdGEucHVzaCg8bGk+e2t9IC0+IHtkZXRhaWxzLmpvaW4oXCIsXCIpfTwvbGk+KVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdFx0XHR9KFtdKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC91bD5cblx0XHRcdFx0eyB0b3RhbCAmJiAoPGRpdiBjbGFzc05hbWU9XCJyZXdhcmRzX3RvdGFsXCI+dG90YWw6JHt0b3RhbH08L2Rpdj4pfVxuXHRcdFx0XHRcblx0XHRcdFx0e21vZGVVSX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0X2dldFJlc29sdmVkUnVsZXMoKXtcblx0XHR2YXIgcmV3YXJkcz1uZXcgTWFwKClcblx0XHR0aGlzLnByb3BzLnJ1bGVzLmZvckVhY2gocnVsZT0+e1xuXHRcdFx0bGV0IHt0YXJnZXQsIHJld2FyZH09cnVsZVxuXHRcdFx0dGFyZ2V0LnNwbGl0KFwiLFwiKS5mb3JFYWNoKHNlZz0+e1xuXHRcdFx0XHRsZXQgZWxzPXNlZy5zcGxpdChSRUdfUlVMRSksIHRlbXBcblx0XHRcdFx0c3dpdGNoKGVscy5sZW5ndGgpe1xuXHRcdFx0XHRjYXNlIDE6Ly81XG5cdFx0XHRcdFx0bGV0IG49cGFyc2VJbnQoZWxzWzBdLnRyaW0oKSlcblx0XHRcdFx0XHR0ZW1wPXJld2FyZHMuZ2V0KG4pfHxbXVxuXHRcdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdFx0cmV3YXJkcy5zZXQobix0ZW1wKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIDI6Ly81LTEwLCBzdGVwPTFcblx0XHRcdFx0Y2FzZSAzOi8vIDEwLTIwLzUsIGV2ZXJ5IDUgZnJvbSAxMCB0byAyMFxuXHRcdFx0XHRcdGxldCBbYSxiLHN0ZXA9XCIxXCJdPWVscyxcblx0XHRcdFx0XHRcdGlhPXBhcnNlSW50KGEudHJpbSgpKSxcblx0XHRcdFx0XHRcdGliPXBhcnNlSW50KGIudHJpbSgpKSxcblx0XHRcdFx0XHRcdHN0YXJ0PU1hdGgubWluKGlhLGliKSxcblx0XHRcdFx0XHRcdGVuZD1NYXRoLm1heChpYSxpYilcblx0XHRcdFx0XHRzdGVwPXBhcnNlSW50KHN0ZXAudHJpbSgpKVxuXHRcdFx0XHRcdGZvcig7c3RhcnQ8ZW5kKzE7c3RhcnQrPXN0ZXApe1xuXHRcdFx0XHRcdFx0dGVtcD1yZXdhcmRzLmdldChzdGFydCl8fFtdXG5cdFx0XHRcdFx0XHR0ZW1wLnB1c2gocmV3YXJkKVxuXHRcdFx0XHRcdFx0cmV3YXJkcy5zZXQoc3RhcnQsdGVtcClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHRyZXR1cm4gcmV3YXJkc1xuXHR9XG5cblx0X3JlbmRlckVkaXQoKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGlucHV0IHBsYWNlaG9sZGVyPVwiMSwgb3IgMS01IGZvciBhIHJhbmdlLCBvciAxMC0yMC8yLCBldmVyeSAyIGZyb20gMTAgdG8gMjBcIi8+XG5cdFx0XHRcdDxpbnB1dCBwbGFjZWhvbGRlcj1cInJld2FyZDphIGNob2NvbGF0ZSBvciBhIHNldCBvZiBsZWdvIC4uLlwiLz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRcblx0X3JlbmRlclJld2FyZCgpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHRjbGljayBoZXJlIHRvIGFkZCAxIHBvaW50XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0XG5cdF9yZW5kZXJWaWV3KCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXHRcblx0X2dldFJld2FyZGVkRGV0YWlsKCl7XG5cdFx0dmFyIGRldGFpbHM9bmV3IE1hcCgpLCBzdW09MFxuXHRcdHRoaXMucHJvcHMucmV3YXJkRGV0YWlsLmZvckVhY2goYT0+e1xuXHRcdFx0c3VtKz1hLmNvdW50XG5cdFx0XHRkZXRhaWxzLnNldChzdW0sYSlcblx0XHR9KVxuXHRcdHJldHVybiBbc3VtLGRldGFpbHNdXG5cdH1cbn1cblxuUmV3YXJkcy5kZWZhdWx0UHJvcHM9e1xuICAgIHJ1bGVzOltdLFxuXHRyZXdhcmREZXRhaWw6W10sXG5cdG1vZGU6XCJyZXdhcmRcIlxufVxuXG5SZXdhcmRzLnByb3BUeXBlcz17XG5cdHJ1bGVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdHJld2FyZERldGFpbDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHR0b3RhbDpSZWFjdC5Qcm9wVHlwZXMubnVtLFxuXHRtb2RlOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoXCJlZGl0XCIsXCJyZXdhcmRcIixcInZpZXdcIilcbn1cbiJdfQ==