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
					items: ["Back", { action: "Remove", onSelect: function onSelect(a) {
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
					items: ["Back", { action: "Save", onSelect: function onSelect(a) {
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
//# sourceMappingURL=data:application/json;base64,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V0FBVSxFQUFWLEVBQVI7QUFDQSxhQUFLLFFBQUw7QUFDQSx3QkFBZ0IsR0FBaEIsRUFIRDtNQUlDLHdEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sTUFBTixFQUF2QixDQUpEO01BS0Msd0RBQWEsT0FBTSxHQUFOLEVBQVUsT0FBTSxLQUFOLEVBQXZCLENBTEQ7TUFsQkQ7S0FERDtJQTRCQyw2QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsWUFBTyxDQUFDLE1BQUQsRUFBUyxFQUFDLFFBQU8sTUFBUCxFQUFlLFVBQVM7Y0FBRyxPQUFLLElBQUw7T0FBSCxFQUFsQyxDQUFQLEVBREQsQ0E1QkQ7SUFERCxDQURPOzs7O3lCQW9DRjs7O2VBQytCLEtBQUssSUFBTCxDQUQvQjtPQUNBLG9CQURBO09BQ08sa0JBRFA7T0FDYSwwQkFEYjtPQUN1QixzQkFEdkI7O0FBRUwsV0FBTSxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBRkQ7QUFHTCxVQUFLLEtBQUssUUFBTCxFQUFMLENBSEs7QUFJTCxjQUFTLFNBQVMsUUFBVCxFQUFULENBSks7QUFLTCxZQUFPLE9BQU8sUUFBUCxFQUFQLENBTEs7O0FBT0wsT0FBRyxDQUFDLElBQUQsRUFBTTtBQUNSLGFBQVMsSUFBVCxDQUFjLHFCQUFkLEVBRFE7QUFFUixXQUZRO0lBQVQ7O0FBS0EsVUFBTyxNQUFQLENBQWMsRUFBQyxZQUFELEVBQU8sVUFBUCxFQUFhLGNBQWIsRUFBcUIsSUFBRyxRQUFILEVBQW5DLEVBQ0UsSUFERixDQUNPLGdCQUFNO0FBQ1gsV0FBTyxZQUFQLEdBQW9CLElBQXBCLENBRFc7QUFFWCxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLFdBQW9DLElBQXBDLEVBRlc7SUFBTixDQURQLENBWks7Ozs7OzhCQWtCQyxlQUFhLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBM0pUIiwiZmlsZSI6ImJhYnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxpbW11dGFibGUsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7VGV4dEZpZWxkLCBSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbixEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IFJld2FyZEdvYWwgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5cbmNvbnN0IHtMaXN0LENvbW1hbmRCYXIsUGhvdG8sIE1lc3NhZ2VyfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17fVxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUobmV3UHJvcHMpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZnJvemVuKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZCE9bmV3UHJvcHMuY2hpbGRcbiAgICB9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV3UHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRkYkZhbWlseS5jdXJyZW50Q2hpbGQ9bmV3UHJvcHMucGFyYW1zLm5hbWVcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQaG90byByZWY9XCJwaG90b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2NoaWxkLnBob3RvfVxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9Pntcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5waG90bz11cmxcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH19Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiY2hpbGQgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y2hpbGQubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0XHRsZXQgdmFsdWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG5cdFx0XHRcdFx0XHRcdGlmKGNoaWxkLm5hbWUhPXZhbHVlKXtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lPXZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPERhdGVQaWNrZXIgcmVmPVwiYmlydGhkYXlcIiBmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Paz17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dZZWFyU2VsZWN0b3I9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoaWxkLmJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhuaWwsIGRhdGUpPT57XG5cdFx0XHRcdFx0XHRcdGlmKCFjaGlsZC5kYiB8fCBjaGlsZC5kYi5nZXRUaW1lKCkhPWRhdGUuZ2V0VGltZSgpKXtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5kYj1kYXRlXG5cdFx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9fS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJnZW5kZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlLHNlbGVjdGVkKT0+e1xuXHRcdFx0XHRcdFx0XHRpZihjaGlsZC5nZW5kZXIhPXNlbGVjdGVkKXtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5nZW5kZXI9c2VsZWN0ZWRcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNlbGVjdGVkPXtjaGlsZC5nZW5kZXJ8fFwiZlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cImZcIiBsYWJlbD1cImdpcmxcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvQnV0dG9uR3JvdXA+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZvbnRTaXplOlwic21hbGxlclwiLCBjb2xvcjpcImdyYXlcIiwgYm9yZGVyQm90dG9tOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19PlxuXHRcdFx0XHRcdFx0XHR7Y2hpbGQubmFtZX3nmoTmv4DlirHorqHliJJcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PFJld2FyZEdvYWxcblx0XHRcdFx0XHRcdFx0ZWRpdGFibGU9e3RydWV9XG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjMwfX1cblx0XHRcdFx0XHRcdFx0Y2hpbGQ9e2NoaWxkfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIiwge2FjdGlvbjpcIlJlbW92ZVwiLCBvblNlbGVjdDphPT50aGlzLnJlbW92ZSgpfV19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVtb3ZlKCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Zyb3plbjp0cnVlfSlcblx0XHRkYkZhbWlseS5yZW1vdmUodGhpcy5wcm9wcy5jaGlsZC5faWQpXG5cdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdHJlbmRlcigpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hpbGQtcGhvdG9cIj5cblx0XHRcdFx0XHRcdFx0PFBob3RvIHJlZj1cInBob3RvXCJcblx0XHRcdFx0XHRcdFx0XHR3aWR0aD17MTUwfVxuXHRcdFx0XHRcdFx0XHRcdGhlaWdodD17MTUwfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJiaXJ0aGRheVwiXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRzaG93WWVhclNlbGVjdG9yPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlPXtuZXcgRGF0ZSgpfS8+XG5cblx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIHJlZj1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7bWFyZ2luVG9wOjM2fX1cblx0XHRcdFx0XHRcdFx0bmFtZT1cImdlbmRlclwiXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHRTZWxlY3RlZD1cImZcIj5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIHZhbHVlPVwibVwiIGxhYmVsPVwiYm95XCIgLz5cblx0XHRcdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdFx0aXRlbXM9e1tcIkJhY2tcIiwge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6YT0+dGhpcy5zYXZlKCl9XX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cblx0XHRzYXZlKCl7XG5cdFx0XHRsZXQge3Bob3RvLCBuYW1lLCBiaXJ0aGRheSwgZ2VuZGVyfT10aGlzLnJlZnNcblx0XHRcdHBob3RvPXBob3RvLnN0YXRlLnVybFxuXHRcdFx0bmFtZT1uYW1lLmdldFZhbHVlKClcblx0XHRcdGJpcnRoZGF5PWJpcnRoZGF5LmdldFZhbHVlKClcblx0XHRcdGdlbmRlcj1nZW5kZXIuZ2V0VmFsdWUoKVxuXG5cdFx0XHRpZighbmFtZSl7XG5cdFx0XHRcdE1lc3NhZ2VyLnNob3coXCJuYW1lIGNhbid0IGJlIGVtcHR5XCIpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHRGYW1pbHkudXBzZXJ0KHtwaG90byxuYW1lLCBnZW5kZXIsIGRiOmJpcnRoZGF5fSlcblx0XHRcdFx0LnRoZW4oYmFieT0+e1xuXHRcdFx0XHRcdEZhbWlseS5jdXJyZW50Q2hpbGQ9YmFieVxuXHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgYmFieS8ke25hbWV9YClcblx0XHRcdFx0fSlcblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==