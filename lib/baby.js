'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp;

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
		_classCallCheck(this, Baby);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Baby).apply(this, arguments));
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
							onChange: function onChange(url) {
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
Baby.Creator = (_temp = _class = function (_Component2) {
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
}(_qiliApp.Component), _class.contextTypes = { router: _qiliApp.React.PropTypes.object }, _temp);
exports.default = Baby;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QSx3QkFBZ0IsR0FBaEIsRUFIRDtNQUlDLHdEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sTUFBTixFQUF2QixDQUpEO01BS0Msd0RBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxLQUFOLEVBQXZCLENBTEQ7TUFsQkQ7S0FERDtJQTRCQyw2QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUFDLEVBQUMsUUFBTyxNQUFQLEVBQWUsVUFBUztjQUFHLE9BQUssSUFBTDtPQUFILEVBQTFCLENBQVAsRUFERCxDQTVCRDtJQURELENBRE87Ozs7eUJBb0NGOzs7ZUFDK0IsS0FBSyxJQUFMLENBRC9CO09BQ0Esb0JBREE7T0FDTyxrQkFEUDtPQUNhLDBCQURiO09BQ3VCLHNCQUR2Qjs7QUFFTCxXQUFNLE1BQU0sS0FBTixDQUFZLEdBQVosQ0FGRDtBQUdMLFVBQUssS0FBSyxRQUFMLEVBQUwsQ0FISztBQUlMLGNBQVMsU0FBUyxRQUFULEVBQVQsQ0FKSztBQUtMLFlBQU8sT0FBTyxRQUFQLEVBQVAsQ0FMSzs7QUFPTCxPQUFHLENBQUMsSUFBRCxFQUFNO0FBQ1IsYUFBUyxJQUFULENBQWMscUJBQWQsRUFEUTtBQUVSLFdBRlE7SUFBVDs7QUFLQSxVQUFPLE1BQVAsQ0FBYyxFQUFDLFlBQUQsRUFBTyxVQUFQLEVBQWEsY0FBYixFQUFxQixJQUFHLFFBQUgsRUFBbkMsRUFDRSxJQURGLENBQ08sZ0JBQU07QUFDWCxXQUFPLFlBQVAsR0FBb0IsSUFBcEIsQ0FEVztBQUVYLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsV0FBb0MsSUFBcEMsRUFGVztJQUFOLENBRFAsQ0FaSzs7Ozs7OEJBa0JDLGVBQWEsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixNQUFoQjtrQkExSlQiLCJmaWxlIjoiYmFieS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LGltbXV0YWJsZSwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtUZXh0RmllbGQsIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9uLERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgUmV3YXJkR29hbCBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcblxuY29uc3Qge0xpc3QsQ29tbWFuZEJhcixQaG90bywgTWVzc2FnZXJ9PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhYnkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5zdGF0ZS5mcm96ZW4pXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkIT1uZXdQcm9wcy5jaGlsZFxuICAgIH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXdQcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdGRiRmFtaWx5LmN1cnJlbnRDaGlsZD1uZXdQcm9wcy5wYXJhbXMubmFtZVxuXHR9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBob3RvIHJlZj1cInBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Y2hpbGQucGhvdG99XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt1cmw9Pntcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5waG90bz11cmxcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH19Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIFxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZT1lLnRhcmdldC52YWx1ZS50cmltKClcblx0XHRcdFx0XHRcdFx0aWYoY2hpbGQubmFtZSE9dmFsdWUpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLm5hbWU9dmFsdWVcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlciByZWY9XCJiaXJ0aGRheVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09rPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y2hpbGQuYmR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KG5pbCwgZGF0ZSk9Pntcblx0XHRcdFx0XHRcdFx0aWYoIWNoaWxkLmRiIHx8IGNoaWxkLmRiLmdldFRpbWUoKSE9ZGF0ZS5nZXRUaW1lKCkpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmRiPWRhdGVcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19Lz5cblxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b25Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUsc2VsZWN0ZWQpPT57XG5cdFx0XHRcdFx0XHRcdGlmKGNoaWxkLmdlbmRlciE9c2VsZWN0ZWQpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmdlbmRlcj1zZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2VsZWN0ZWQ9e2NoaWxkLmdlbmRlcnx8XCJmXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZvbnRTaXplOlwic21hbGxlclwiLCBjb2xvcjpcImdyYXlcIiwgYm9yZGVyQm90dG9tOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19PlxuXHRcdFx0XHRcdFx0XHR7Y2hpbGQubmFtZX3nmoTmv4DlirHorqHliJJcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PFJld2FyZEdvYWxcblx0XHRcdFx0XHRcdFx0ZWRpdGFibGU9e3RydWV9XG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjMwfX1cblx0XHRcdFx0XHRcdFx0Y2hpbGQ9e2NoaWxkfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W3thY3Rpb246XCJSZW1vdmVcIiwgb25TZWxlY3Q6YT0+dGhpcy5yZW1vdmUoKX1dfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG4gICAgcmVtb3ZlKCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Zyb3plbjp0cnVlfSlcblx0XHRkYkZhbWlseS5yZW1vdmUodGhpcy5wcm9wcy5jaGlsZC5faWQpXG5cdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHRcblx0XHRyZW5kZXIoKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoaWxkLXBob3RvXCI+XG5cdFx0XHRcdFx0XHRcdDxQaG90byByZWY9XCJwaG90b1wiXG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg9ezE1MH1cblx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ9ezE1MH0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIFxuXHRcdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiYmlydGhkYXlcIiBcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6YT0+dGhpcy5zYXZlKCl9XX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0XG5cdFx0c2F2ZSgpe1xuXHRcdFx0bGV0IHtwaG90bywgbmFtZSwgYmlydGhkYXksIGdlbmRlcn09dGhpcy5yZWZzXG5cdFx0XHRwaG90bz1waG90by5zdGF0ZS51cmxcblx0XHRcdG5hbWU9bmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHRiaXJ0aGRheT1iaXJ0aGRheS5nZXRWYWx1ZSgpXG5cdFx0XHRnZW5kZXI9Z2VuZGVyLmdldFZhbHVlKClcblx0XHRcdFxuXHRcdFx0aWYoIW5hbWUpe1xuXHRcdFx0XHRNZXNzYWdlci5zaG93KFwibmFtZSBjYW4ndCBiZSBlbXB0eVwiKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0RmFtaWx5LnVwc2VydCh7cGhvdG8sbmFtZSwgZ2VuZGVyLCBkYjpiaXJ0aGRheX0pXG5cdFx0XHRcdC50aGVuKGJhYnk9Pntcblx0XHRcdFx0XHRGYW1pbHkuY3VycmVudENoaWxkPWJhYnlcblx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGJhYnkvJHtuYW1lfWApXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHR9XG59XG4iXX0=