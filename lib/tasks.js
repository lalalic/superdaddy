'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _floatingAdd = require('./components/floating-add');

var _floatingAdd2 = _interopRequireDefault(_floatingAdd);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _star = require('material-ui/svg-icons/toggle/star');

var _star2 = _interopRequireDefault(_star);

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
			var _this3 = this;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(_floatingAdd2.default, { mini: true, onClick: function onClick(e) {
						return _this3.context.router.push("courses");
					} }),
				_qiliApp.React.createElement(_materialUi.AppBar, {
					titleStyle: { color: "lightgray" },
					showMenuIconButton: false,
					title: this.props.child.name + '的课程' }),
				_qiliApp.React.createElement(List, { model: this.state.tasks,
					empty: _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_logo2.default, null) }),
					template: this.props.template || this.constructor.Item })
			);
		}
	}]);

	return Tasks;
}(_qiliApp.Component);

Tasks.contextTypes = { router: _qiliApp.React.PropTypes.object };
Tasks.Item = (_temp2 = _class = function (_Component2) {
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			var _props = this.props;
			var model = _props.model;
			var thumbnail = _props.thumbnail;

			var others = _objectWithoutProperties(_props, ['model', 'thumbnail']);

			var knowledge = model.knowledge;

			return _qiliApp.React.createElement(
				'div',
				_extends({ className: 'li inset photo1' }, others, { onClick: function onClick() {
						return _this5.onDetail();
					} }),
				_qiliApp.React.createElement(
					'div',
					null,
					_qiliApp.React.createElement(
						'div',
						{ className: 'title' },
						knowledge.title
					),
					_qiliApp.React.createElement(_materialUi.LinearProgress, { mode: 'determinate', max: knowledge.steps || 10, value: model.current }),
					_qiliApp.React.createElement(
						'div',
						{ className: 'more' },
						_qiliApp.React.createElement(_star2.default, { color: 'orange', viewBox: '0 0 48 48' }),
						model.current,
						'/',
						knowledge.steps
					)
				),
				_qiliApp.React.createElement(
					'div',
					{ className: 'photos' },
					_qiliApp.React.createElement(
						'div',
						null,
						_qiliApp.React.createElement('img', { src: model.thumbnail || thumbnail })
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
}(_qiliApp.Component), _class.defaultProps = { thumbnail: "images/icon.svg" }, _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp2);
exports.default = Tasks;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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dGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0FwcEJhciwgTGluZWFyUHJvZ3Jlc3MgYXMgUHJvZ3Jlc3N9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5cbmltcG9ydCB7VGFzayBhcyBkYlRhc2ssRmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IENhbGVuZGFyLCB7YWRkRGF5cywgZ2V0TGFzdERheU9mTW9udGh9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBGbG9hdGluZ0FkZCBmcm9tIFwiLi9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZFwiXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvblN0YXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhclwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG4vKipcbkAgd2l0aCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrcyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Rhc2tzOm51bGx9XG5cblx0Z2V0RGF0YShjaGlsZCl7XG5cdFx0ZGJUYXNrLmZpbmQoLyp7c3RhdHVzOlwic2NoZWR1bGVkXCIsY2hpbGQ6dGhpcy5wcm9wcy5jaGlsZC5faWQsIHNjaGVkdWxlZEF0OndoZW59Ki8pLmZldGNoKHRhc2tzPT57XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrc30pXG5cdFx0fSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMuY2hpbGQpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy5jaGlsZCE9bmV4dFByb3BzLmNoaWxkKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5jaGlsZClcblx0fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxGbG9hdGluZ0FkZCBtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJjb3Vyc2VzXCIpfS8+XG5cblx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdHRpdGxlU3R5bGU9e3tjb2xvcjpcImxpZ2h0Z3JheVwifX1cblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfVxuXHRcdFx0XHRcdHRpdGxlPXtgJHt0aGlzLnByb3BzLmNoaWxkLm5hbWV955qE6K++56iLYH0vPlxuXG5cdCAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLnRhc2tzfVxuXHRcdFx0XHRcdGVtcHR5PXs8RW1wdHkgaWNvbj17PExvZ28vPn0vPn1cblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5wcm9wcy50ZW1wbGF0ZXx8dGhpcy5jb25zdHJ1Y3Rvci5JdGVtfS8+XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHRzdGF0aWMgSXRlbT1jbGFzcyAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRsZXQge21vZGVsLHRodW1ibmFpbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRcdGxldCB7a25vd2xlZGdlfT1tb2RlbFxuXHQgICAgICAgIHJldHVybiAoXG5cdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGkgaW5zZXQgcGhvdG8xXCIgey4uLm90aGVyc30gb25DbGljaz17KCk9PnRoaXMub25EZXRhaWwoKX0+XG5cdCAgICAgICAgICAgICAgICA8ZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57a25vd2xlZGdlLnRpdGxlfTwvZGl2PlxuXHRcdFx0XHRcdFx0PFByb2dyZXNzIG1vZGU9XCJkZXRlcm1pbmF0ZVwiIG1heD17a25vd2xlZGdlLnN0ZXBzfHwxMH0gdmFsdWU9e21vZGVsLmN1cnJlbnR9Lz5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb3JlXCI+XG5cdFx0XHQgICAgICAgICAgICAgICAgPEljb25TdGFyIGNvbG9yPVwib3JhbmdlXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiLz57bW9kZWwuY3VycmVudH0ve2tub3dsZWRnZS5zdGVwc31cblx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3Rvc1wiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXY+PGltZyBzcmM9e21vZGVsLnRodW1ibmFpbHx8dGh1bWJuYWlsfS8+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgKVxuXHRcdH1cblx0XHRvbkRldGFpbCgpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKHtwYXRobmFtZTpgdGFzay8ke3RoaXMucHJvcHMubW9kZWwuX2lkfWAsIHN0YXRlOnt0YXNrOnRoaXMucHJvcHMubW9kZWx9fSlcblx0XHR9XG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17dGh1bWJuYWlsOlwiaW1hZ2VzL2ljb24uc3ZnXCJ9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==