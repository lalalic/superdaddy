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
				_qiliApp.React.createElement(CommandBar, { className: "footbar",
					primary: "Reward",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQVk7O0lBRUU7Ozs7Ozs7Ozs7O21DQUNKO0FBQ2YsVUFDQzs7TUFBSyxXQUFVLE1BQVYsRUFBTDtJQUNDOztPQUFNLElBQUcsTUFBSCxFQUFVLE9BQU8sRUFBQyxnQkFBZSxNQUFmLEVBQVIsRUFBaEI7S0FDQyw2QkFBQyxLQUFELElBQU8sTUFBTSxxQ0FBTjtBQUNOLFlBQU0sa0RBQU4sRUFERCxDQUREO0tBREQ7SUFERCxDQURlOzs7OzJCQVVSOzs7QUFDUCxPQUFHLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUNILE9BQU8sS0FBSyxjQUFMLEVBQVAsQ0FERDs7QUFHQSxVQUNDOztNQUFLLFdBQVUsTUFBVixFQUFMO0lBQ0Msa0RBQVMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWhCLENBREQ7SUFHQyw2QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsY0FBUSxRQUFSO0FBQ2UsWUFBTyxDQUNyQixFQUFDLFFBQU8sUUFBUDtBQUNBLGdCQUFTO2NBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixHQUF6QjtPQUFIO0FBQ1QsK0JBRkQsRUFEcUIsRUFJSCxFQUFDLFFBQU8sT0FBUDtBQUNHLGdCQUFTO2NBQUksT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixPQUF6QjtPQUFKO0FBQ1Qsd0NBRkosRUFKRyxFQU9ILEVBQUMsUUFBTyxZQUFQO0FBQ0csZ0JBQVM7Y0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFlBQXpCO09BQUo7QUFDVCw2QkFGSixFQVBHLEVBVUgsRUFBQyxRQUFPLFNBQVAsRUFBa0IsT0FBTSxTQUFOO0FBQ2YsZ0JBQVM7Y0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFNBQXpCO09BQUo7QUFDVCxnQ0FGSixFQVZHLENBQVA7S0FGaEIsQ0FIRDtJQURELENBSk87Ozs7UUFYWTs7O1VBdUNiLGVBQWEsRUFBQyxRQUFRLGVBQU0sU0FBTixDQUFnQixNQUFoQjtrQkF2Q1QiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxyXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcclxuXHJcbmltcG9ydCBSZXdhcmRzIGZyb20gXCIuL2NvbXBvbmVudHMvcmV3YXJkc1wiXHJcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcclxuXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eX09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXI0Tm9DaGlsZCgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XHJcblx0XHRcdFx0PExpbmsgdG89XCJiYWJ5XCIgc3R5bGU9e3t0ZXh0RGVjb3JhdGlvbjpcIm5vbmVcIn19PlxyXG5cdFx0XHRcdFx0PEVtcHR5IHRleHQ9e1wiY2xpY2sgdG8gc3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnlcIn1cclxuXHRcdFx0XHRcdFx0aWNvbj17PExvZ28vPn0vPlxyXG5cdFx0XHRcdDwvTGluaz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRpZighdGhpcy5wcm9wcy5jaGlsZClcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyNE5vQ2hpbGQoKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxyXG5cdFx0XHRcdDxSZXdhcmRzIGNoaWxkPXt0aGlzLnByb3BzLmNoaWxkfS8+XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRcdFx0cHJpbWFyeT1cIlJld2FyZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlJld2FyZFwiLFxyXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnLycpLFxyXG5cdFx0XHRcdFx0XHRcdGljb246SWNvblJld2FyZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgndGFza3MnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvblRhc2t9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgna25vd2xlZGdlcycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogSWNvbkFjY291bnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG4iXX0=