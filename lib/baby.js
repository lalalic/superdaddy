'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _rewards = require('./components/rewards');

var _rewards2 = _interopRequireDefault(_rewards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var Messager = _qiliApp.UI.Messager;

var Baby = function (_Component) {
	_inherits(Baby, _Component);

	function Baby() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Baby);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Baby)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Baby, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(newProps) {
			if (this.state.frozen) return false;

			return this.props.child != newProps.child;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (this.props.params.name != newProps.params.name) _db.Family.currentChild = newProps.params.name;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var child = this.props.child;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(
					'div',
					{ className: 'form' },
					_qiliApp.React.createElement(
						'div',
						{ className: 'child-photo' },
						_qiliApp.React.createElement(Photo, { ref: 'photo',
							width: 150,
							height: 150,
							src: child.photo,
							onPhoto: function onPhoto(url) {
								child.photo = url;
								_db.Family.upsert(child);
							} })
					),
					_qiliApp.React.createElement(_materialUi.TextField, { ref: 'name',
						floatingLabelText: 'child name',
						fullWidth: true,
						value: child.name,
						onBlur: function onBlur(e) {
							var value = e.target.value.trim();
							if (child.name != value) {
								child.name = value;
								_db.Family.upsert(child);
							}
						} }),
					_qiliApp.React.createElement(_materialUi.DatePicker, { ref: 'birthday', floatingLabelText: 'birthday',
						fullWidth: true,
						autoOk: true,
						showYearSelector: true,
						maxDate: new Date(),
						value: child.bd,
						onChange: function onChange(nil, date) {
							if (!child.db || child.db.getTime() != date.getTime()) {
								child.db = date;
								_db.Family.upsert(child);
							}
						} }),
					_qiliApp.React.createElement(
						_materialUi.RadioButtonGroup,
						{
							style: { marginTop: 36 },
							name: 'gender',
							onChange: function onChange(e, selected) {
								if (child.gender != selected) {
									child.gender = selected;
									_db.Family.upsert(child);
								}
							},
							valueSelected: child.gender || "f" },
						_qiliApp.React.createElement(_materialUi.RadioButton, { value: 'f', label: 'girl' }),
						_qiliApp.React.createElement(_materialUi.RadioButton, { value: 'm', label: 'boy' })
					),
					_qiliApp.React.createElement(
						'div',
						null,
						_qiliApp.React.createElement('br', null),
						_qiliApp.React.createElement('br', null),
						_qiliApp.React.createElement(
							'div',
							{ style: { fontSize: "smaller", color: "gray", borderBottom: "1px dotted lightgray" } },
							child.name,
							'的激励计划'
						),
						_qiliApp.React.createElement(_rewards2.default, {
							editable: true,
							style: { marginTop: 30 },
							child: child })
					)
				),
				_qiliApp.React.createElement(CommandBar, { className: 'footbar',
					items: [{ action: "Remove", onSelect: function onSelect(a) {
							return _this2.remove();
						} }] })
			);
		}
	}, {
		key: 'remove',
		value: function remove() {
			var _this3 = this;

			this.setState({ frozen: true });
			_db.Family.remove(this.props.child._id).then(function (a) {
				return _this3.context.router.replace("/");
			});
		}
	}]);

	return Baby;
}(_qiliApp.Component);

Baby.contextTypes = { router: _qiliApp.React.PropTypes.object };
Baby.Creator = (_temp2 = _class = function (_Component2) {
	_inherits(_class, _Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			return _qiliApp.React.createElement(
				'div',
				null,
				_qiliApp.React.createElement(
					'div',
					{ className: 'form' },
					_qiliApp.React.createElement(
						'div',
						{ className: 'child-photo' },
						_qiliApp.React.createElement(Photo, { ref: 'photo',
							width: 150,
							height: 150 })
					),
					_qiliApp.React.createElement(_materialUi.TextField, { ref: 'name',
						floatingLabelText: 'child name',
						fullWidth: true }),
					_qiliApp.React.createElement(_materialUi.DatePicker, { ref: 'birthday',
						floatingLabelText: 'birthday',
						fullWidth: true,
						autoOk: true,
						showYearSelector: true,
						maxDate: new Date() }),
					_qiliApp.React.createElement(
						_materialUi.RadioButtonGroup,
						{ ref: 'gender',
							style: { marginTop: 36 },
							name: 'gender',
							defaultSelected: 'f' },
						_qiliApp.React.createElement(_materialUi.RadioButton, { value: 'f', label: 'girl' }),
						_qiliApp.React.createElement(_materialUi.RadioButton, { value: 'm', label: 'boy' })
					)
				),
				_qiliApp.React.createElement(CommandBar, { className: 'footbar',
					items: [{ action: "Save", onSelect: function onSelect(a) {
							return _this5.save();
						} }] })
			);
		}
	}, {
		key: 'save',
		value: function save() {
			var _this6 = this;

			var _refs = this.refs;
			var photo = _refs.photo;
			var name = _refs.name;
			var birthday = _refs.birthday;
			var gender = _refs.gender;

			photo = photo.state.url;
			name = name.getValue();
			birthday = birthday.getValue();
			gender = gender.getValue();

			if (!name) {
				Messager.show("name can't be empty");
				return;
			}

			Family.upsert({ photo: photo, name: name, gender: gender, db: birthday }).then(function (baby) {
				Family.currentChild = baby;
				_this6.context.router.replace('baby/' + name);
			});
		}
	}]);

	return _class;
}(_qiliApp.Component), _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp2);
exports.default = Baby;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RUFBUjtBQUNBLGFBQUssUUFBTDtBQUNBLHdCQUFnQixHQUFoQixFQUhEO01BSUMsd0RBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxNQUFOLEVBQXZCLENBSkQ7TUFLQyx3REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLEtBQU4sRUFBdkIsQ0FMRDtNQWxCRDtLQUREO0lBNEJDLDZCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDWCxZQUFPLENBQUMsRUFBQyxRQUFPLE1BQVAsRUFBZSxVQUFTO2NBQUcsT0FBSyxJQUFMO09BQUgsRUFBMUIsQ0FBUCxFQURELENBNUJEO0lBREQsQ0FETzs7Ozt5QkFvQ0Y7OztlQUMrQixLQUFLLElBQUwsQ0FEL0I7T0FDQSxvQkFEQTtPQUNPLGtCQURQO09BQ2EsMEJBRGI7T0FDdUIsc0JBRHZCOztBQUVMLFdBQU0sTUFBTSxLQUFOLENBQVksR0FBWixDQUZEO0FBR0wsVUFBSyxLQUFLLFFBQUwsRUFBTCxDQUhLO0FBSUwsY0FBUyxTQUFTLFFBQVQsRUFBVCxDQUpLO0FBS0wsWUFBTyxPQUFPLFFBQVAsRUFBUCxDQUxLOztBQU9MLE9BQUcsQ0FBQyxJQUFELEVBQU07QUFDUixhQUFTLElBQVQsQ0FBYyxxQkFBZCxFQURRO0FBRVIsV0FGUTtJQUFUOztBQUtBLFVBQU8sTUFBUCxDQUFjLEVBQUMsWUFBRCxFQUFPLFVBQVAsRUFBYSxjQUFiLEVBQXFCLElBQUcsUUFBSCxFQUFuQyxFQUNFLElBREYsQ0FDTyxnQkFBTTtBQUNYLFdBQU8sWUFBUCxHQUFvQixJQUFwQixDQURXO0FBRVgsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixPQUFwQixXQUFvQyxJQUFwQyxFQUZXO0lBQU4sQ0FEUCxDQVpLOzs7Ozs4QkFrQkMsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQTNKVCIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsaW1tdXRhYmxlLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBSZXdhcmRHb2FsIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuXG5jb25zdCB7TGlzdCxDb21tYW5kQmFyLFBob3RvLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e31cblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnN0YXRlLmZyb3plbilcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGQhPW5ld1Byb3BzLmNoaWxkXG4gICAgfVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuXHRcdGlmKHRoaXMucHJvcHMucGFyYW1zLm5hbWUhPW5ld1Byb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0ZGJGYW1pbHkuY3VycmVudENoaWxkPW5ld1Byb3BzLnBhcmFtcy5uYW1lXG5cdH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGhvdG8gcmVmPVwicGhvdG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsxNTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjaGlsZC5waG90b31cblx0XHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT57XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQucGhvdG89dXJsXG5cdFx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9fS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2U9Pntcblx0XHRcdFx0XHRcdFx0bGV0IHZhbHVlPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuXHRcdFx0XHRcdFx0XHRpZihjaGlsZC5uYW1lIT12YWx1ZSl7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQubmFtZT12YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyIHJlZj1cImJpcnRoZGF5XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT2s9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5iZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmlsLCBkYXRlKT0+e1xuXHRcdFx0XHRcdFx0XHRpZighY2hpbGQuZGIgfHwgY2hpbGQuZGIuZ2V0VGltZSgpIT1kYXRlLmdldFRpbWUoKSl7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQuZGI9ZGF0ZVxuXHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbkdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e21hcmdpblRvcDozNn19XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZ2VuZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSxzZWxlY3RlZCk9Pntcblx0XHRcdFx0XHRcdFx0aWYoY2hpbGQuZ2VuZGVyIT1zZWxlY3RlZCl7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQuZ2VuZGVyPXNlbGVjdGVkXG5cdFx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZWxlY3RlZD17Y2hpbGQuZ2VuZGVyfHxcImZcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb0J1dHRvbkdyb3VwPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9e3tmb250U2l6ZTpcInNtYWxsZXJcIiwgY29sb3I6XCJncmF5XCIsIGJvcmRlckJvdHRvbTpcIjFweCBkb3R0ZWQgbGlnaHRncmF5XCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NoaWxkLm5hbWV955qE5r+A5Yqx6K6h5YiSXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxSZXdhcmRHb2FsXG5cdFx0XHRcdFx0XHRcdGVkaXRhYmxlPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRzdHlsZT17e21hcmdpblRvcDozMH19XG5cdFx0XHRcdFx0XHRcdGNoaWxkPXtjaGlsZH0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbe2FjdGlvbjpcIlJlbW92ZVwiLCBvblNlbGVjdDphPT50aGlzLnJlbW92ZSgpfV19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVtb3ZlKCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Zyb3plbjp0cnVlfSlcblx0XHRkYkZhbWlseS5yZW1vdmUodGhpcy5wcm9wcy5jaGlsZC5faWQpXG5cdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdHJlbmRlcigpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdFx0PFBob3RvIHJlZj1cInBob3RvXCJcblx0XHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiU2F2ZVwiLCBvblNlbGVjdDphPT50aGlzLnNhdmUoKX1dfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdHNhdmUoKXtcblx0XHRcdGxldCB7cGhvdG8sIG5hbWUsIGJpcnRoZGF5LCBnZW5kZXJ9PXRoaXMucmVmc1xuXHRcdFx0cGhvdG89cGhvdG8uc3RhdGUudXJsXG5cdFx0XHRuYW1lPW5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0YmlydGhkYXk9YmlydGhkYXkuZ2V0VmFsdWUoKVxuXHRcdFx0Z2VuZGVyPWdlbmRlci5nZXRWYWx1ZSgpXG5cblx0XHRcdGlmKCFuYW1lKXtcblx0XHRcdFx0TWVzc2FnZXIuc2hvdyhcIm5hbWUgY2FuJ3QgYmUgZW1wdHlcIilcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdEZhbWlseS51cHNlcnQoe3Bob3RvLG5hbWUsIGdlbmRlciwgZGI6YmlydGhkYXl9KVxuXHRcdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0RmFtaWx5LmN1cnJlbnRDaGlsZD1iYWJ5XG5cdFx0XHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBiYWJ5LyR7bmFtZX1gKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0fVxufVxuIl19