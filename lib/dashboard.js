"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _reactRouter = require("react-router");

var _dialpad = require("material-ui/svg-icons/communication/dialpad");

var _dialpad2 = _interopRequireDefault(_dialpad);

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _formatListNumbered = require("material-ui/svg-icons/editor/format-list-numbered");

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _childCare = require("material-ui/svg-icons/places/child-care");

var _childCare2 = _interopRequireDefault(_childCare);

var _rewards = require("./components/rewards");

var _rewards2 = _interopRequireDefault(_rewards);

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _qiliApp.UI.CommandBar;
var Empty = _qiliApp.UI.Empty;

var Dashboard = function (_Component) {
	_inherits(Dashboard, _Component);

	function Dashboard() {
		_classCallCheck(this, Dashboard);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
	}

	_createClass(Dashboard, [{
		key: "render4NoChild",
		value: function render4NoChild() {
			return _qiliApp.React.createElement(
				"div",
				{ className: "page" },
				_qiliApp.React.createElement(
					_reactRouter.Link,
					{ to: "baby", style: { textDecoration: "none" } },
					_qiliApp.React.createElement(Empty, { text: "click to start from your first baby",
						icon: _qiliApp.React.createElement(_logo2.default, null) })
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (!this.props.child) return this.render4NoChild();

			return _qiliApp.React.createElement(
				"div",
				{ className: "page" },
				_qiliApp.React.createElement(_rewards2.default, { child: this.props.child }),
				_qiliApp.React.createElement(CommandBar, {
					className: "footbar",
					items: [{ action: "Reward",
						onSelect: function onSelect(a) {
							return _this2.context.router.push('/');
						},
						icon: _childCare2.default }, { action: "Tasks",
						onSelect: function onSelect() {
							return _this2.context.router.push('tasks');
						},
						icon: _formatListNumbered2.default }, { action: "Knowledges",
						onSelect: function onSelect() {
							return _this2.context.router.push('knowledges');
						},
						icon: _dialpad2.default }, { action: "setting", label: "Account",
						onSelect: function onSelect() {
							return _this2.context.router.push('account');
						},
						icon: _accountBox2.default }]
				})
			);
		}
	}]);

	return Dashboard;
}(_qiliApp.Component);

Dashboard.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Dashboard;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQVk7O0lBRUU7Ozs7Ozs7Ozs7O21DQUNKO0FBQ2YsVUFDQzs7TUFBSyxXQUFVLE1BQVYsRUFBTDtJQUNDOztPQUFNLElBQUcsTUFBSCxFQUFVLE9BQU8sRUFBQyxnQkFBZSxNQUFmLEVBQVIsRUFBaEI7S0FDQyw2QkFBQyxLQUFELElBQU8sTUFBTSxxQ0FBTjtBQUNOLFlBQU0sa0RBQU4sRUFERCxDQUREO0tBREQ7SUFERCxDQURlOzs7OzJCQVVSOzs7QUFDUCxPQUFHLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUNILE9BQU8sS0FBSyxjQUFMLEVBQVAsQ0FERDs7QUFHQSxVQUNDOztNQUFLLFdBQVUsTUFBVixFQUFMO0lBQ0Msa0RBQVMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWhCLENBREQ7SUFHQyw2QkFBQyxVQUFEO0FBQ2dCLGdCQUFVLFNBQVY7QUFDQSxZQUFPLENBQ3JCLEVBQUMsUUFBTyxRQUFQO0FBQ0EsZ0JBQVM7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEdBQXpCO09BQUg7QUFDVCwrQkFGRCxFQURxQixFQUlILEVBQUMsUUFBTyxPQUFQO0FBQ0csZ0JBQVM7Y0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLE9BQXpCO09BQUo7QUFDVCx3Q0FGSixFQUpHLEVBT0gsRUFBQyxRQUFPLFlBQVA7QUFDRyxnQkFBUztjQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsWUFBekI7T0FBSjtBQUNULDZCQUZKLEVBUEcsRUFVSCxFQUFDLFFBQU8sU0FBUCxFQUFrQixPQUFNLFNBQU47QUFDZixnQkFBUztjQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsU0FBekI7T0FBSjtBQUNULGdDQUZKLEVBVkcsQ0FBUDtLQUZoQixDQUhEO0lBREQsQ0FKTzs7OztRQVhZOzs7VUF1Q2IsZUFBYSxFQUFDLFFBQVEsZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQXZDVCIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcclxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXHJcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXHJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxyXG5cclxuaW1wb3J0IFJld2FyZHMgZnJvbSBcIi4vY29tcG9uZW50cy9yZXdhcmRzXCJcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcjROb0NoaWxkKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuXHRcdFx0XHQ8TGluayB0bz1cImJhYnlcIiBzdHlsZT17e3RleHREZWNvcmF0aW9uOlwibm9uZVwifX0+XHJcblx0XHRcdFx0XHQ8RW1wdHkgdGV4dD17XCJjbGljayB0byBzdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieVwifVxyXG5cdFx0XHRcdFx0XHRpY29uPXs8TG9nby8+fS8+XHJcblx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGlmKCF0aGlzLnByb3BzLmNoaWxkKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXI0Tm9DaGlsZCgpXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxyXG5cdFx0XHRcdDxSZXdhcmRzIGNoaWxkPXt0aGlzLnByb3BzLmNoaWxkfS8+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUmV3YXJkXCIsXHJcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCcvJyksXHJcblx0XHRcdFx0XHRcdFx0aWNvbjpJY29uUmV3YXJkfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlRhc2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCd0YXNrcycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uVGFza30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdrbm93bGVkZ2VzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdhY2NvdW50JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBJY29uQWNjb3VudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxyXG59Il19