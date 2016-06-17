'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var Messager = _qiliApp.UI.Messager;
var Icons = _qiliApp.UI.Icons;
var DialogCommand = CommandBar.DialogCommand;

/**
@ with currentChild
*/

var Tasks = function (_Component) {
	_inherits(Tasks, _Component);

	function Tasks() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Tasks);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tasks)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { tasks: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tasks, [{
		key: 'getData',
		value: function getData(child) {
			var _this2 = this;

			_db.Task.find(). /*{status:"scheduled",child:this.props.child._id, scheduledAt:when}*/fetch(function (tasks) {
				_this2.setState({ tasks: tasks });
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getData(this.props.child);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.child != nextProps.child) this.getData(nextProps.child);
		}
	}, {
		key: 'render',
		value: function render() {
			return _qiliApp.React.createElement(List, { model: this.state.tasks,
				empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
				template: this.props.template || this.constructor.Item });
		}
	}]);

	return Tasks;
}(_qiliApp.Component);

Tasks.Item = (_temp2 = _class = function (_Component2) {
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var task = _props.model;
			var image = _props.image;
			var actions = _props.actions;
			var others = _objectWithoutProperties(_props, ['model', 'image', 'actions']);
			var knowledge = task.knowledge;

			return _qiliApp.React.createElement(
				'div',
				{ className: 'li' },
				_qiliApp.React.createElement(
					'div',
					{ className: 'content', onClick: this.onDetail.bind(this) },
					_qiliApp.React.createElement(
						'div',
						null,
						_qiliApp.React.createElement(
							'h4',
							null,
							task.knowledge.title
						)
					),
					_qiliApp.React.createElement(
						'div',
						{ className: 'photo' },
						_qiliApp.React.createElement('img', { src: task.photo || image })
					)
				)
			);
		}
	}, {
		key: 'onDetail',
		value: function onDetail() {
			this.context.router.push({ pathname: 'task/' + this.props.model._id, state: { task: this.props.model } });
		}
	}]);

	return _class;
}(_qiliApp.Component), _class.defaultProps = { image: "images/task.jpg" }, _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp2);
exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPO0lBQU07SUFBUztJQUFNO0lBQVE7SUFBVztJQUFNO0lBQVM7SUFDdkQsZ0JBQWUsV0FBZjs7Ozs7O0lBS2M7Ozs7Ozs7Ozs7Ozs7O2lNQUNwQixRQUFNLEVBQUMsT0FBTSxJQUFOOzs7Y0FEYTs7MEJBR1osT0FBTTs7O0FBQ2IsWUFBTyxJQUFQLHlFQUFtRixLQUFuRixDQUF5RixpQkFBTztBQUMvRixXQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZCxFQUQrRjtJQUFQLENBQXpGLENBRGE7Ozs7c0NBTUs7QUFDbEIsUUFBSyxPQUFMLENBQWEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFiLENBRGtCOzs7OzRDQUlPLFdBQVU7QUFDbkMsT0FBRyxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQWtCLFVBQVUsS0FBVixFQUNwQixLQUFLLE9BQUwsQ0FBYSxVQUFVLEtBQVYsQ0FBYixDQUREOzs7OzJCQUlVO0FBQ1YsVUFDVSw2QkFBQyxJQUFELElBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ3JCLFdBQU8sNkJBQUMsS0FBRCxJQUFPLE1BQU0sa0RBQU4sRUFBUCxDQUFQO0FBQ0EsY0FBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXFCLEtBQUssV0FBTCxDQUFpQixJQUFqQixFQUZ2QixDQURWLENBRFU7Ozs7UUFsQlM7OztNQTBCYjs7Ozs7Ozs7Ozs7MkJBQ0U7Z0JBQ3FDLEtBQUssS0FBTCxDQURyQztPQUNJLGNBQU4sTUFERTtPQUNVLHFCQURWO09BQ2lCLHlCQURqQjtBQUNILE9BQWdDLHdFQUFoQyxDQURHO09BRUwsWUFBVyxLQUFYLFVBRks7O0FBR1AsVUFDQzs7TUFBSyxXQUFVLElBQVYsRUFBTDtJQUNDOztPQUFLLFdBQVUsU0FBVixFQUFvQixTQUFTLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FBVCxFQUF6QjtLQUNDOzs7TUFDQzs7O09BQUssS0FBSyxTQUFMLENBQWUsS0FBZjtPQUROO01BREQ7S0FJQzs7UUFBSyxXQUFVLE9BQVYsRUFBTDtNQUNDLHNDQUFLLEtBQUssS0FBSyxLQUFMLElBQVksS0FBWixFQUFWLENBREQ7TUFKRDtLQUREO0lBREQsQ0FITzs7Ozs2QkFnQkU7QUFDVCxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEVBQUMsb0JBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBd0IsT0FBTSxFQUFDLE1BQUssS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFaLEVBQW5FLEVBRFM7Ozs7OzhCQUdILGVBQWEsRUFBQyxPQUFNLGlCQUFOLFdBQ2QsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQS9DVCIsImZpbGUiOiJ0YXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1N1YmhlYWRlciwgRGl2aWRlciwgVGFicywgVGFiLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciwge2FkZERheXMsIGdldExhc3REYXlPZk1vbnRofSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG4vKipcbkAgd2l0aCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Rhc2tzOm51bGx9XG5cblx0Z2V0RGF0YShjaGlsZCl7XG5cdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwic2NoZWR1bGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWQsIHNjaGVkdWxlZEF0OndoZW59Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMuY2hpbGQpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy5jaGlsZCE9bmV4dFByb3BzLmNoaWxkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5jaGlsZClcblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLnRhc2tzfVxuXHRcdFx0XHRlbXB0eT17PEVtcHR5IGljb249ezxMb2dvLz59Lz59XG5cdFx0XHRcdHRlbXBsYXRlPXt0aGlzLnByb3BzLnRlbXBsYXRlfHx0aGlzLmNvbnN0cnVjdG9yLkl0ZW19Lz5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgSXRlbT1jbGFzcyAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHR2YXIge21vZGVsOnRhc2ssIGltYWdlLCBhY3Rpb25zLCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG5cdFx0XHRcdHtrbm93bGVkZ2V9PXRhc2s7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwaG90b1wiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17dGFzay5waG90b3x8aW1hZ2V9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0b25EZXRhaWwoKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCh7cGF0aG5hbWU6YHRhc2svJHt0aGlzLnByb3BzLm1vZGVsLl9pZH1gLCBzdGF0ZTp7dGFzazp0aGlzLnByb3BzLm1vZGVsfX0pXG5cdFx0fVxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e2ltYWdlOlwiaW1hZ2VzL3Rhc2suanBnXCJ9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==