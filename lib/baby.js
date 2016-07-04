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

			return true;
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

			var child = this.context.child;

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
			_db.Family.remove(this.context.child._id).then(function (a) {
				return _this3.context.router.replace("/");
			});
		}
	}]);

	return Baby;
}(_qiliApp.Component);

Baby.contextTypes = {
	router: _qiliApp.React.PropTypes.object,
	child: _qiliApp.React.PropTypes.object
};
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
//# sourceMappingURL=data:application/json;base64,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QUFDLFdBQVUsRUFBVixFQUFSO0FBQ0EsYUFBSyxRQUFMO0FBQ0Esd0JBQWdCLEdBQWhCLEVBSEQ7TUFJQyx3REFBYSxPQUFNLEdBQU4sRUFBVSxPQUFNLE1BQU4sRUFBdkIsQ0FKRDtNQUtDLHdEQUFhLE9BQU0sR0FBTixFQUFVLE9BQU0sS0FBTixFQUF2QixDQUxEO01BbEJEO0tBREQ7SUE0QkMsNkJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNYLFlBQU8sQ0FBQyxNQUFELEVBQVMsRUFBQyxRQUFPLE1BQVAsRUFBZSxVQUFTO2NBQUcsT0FBSyxJQUFMO09BQUgsRUFBbEMsQ0FBUCxFQURELENBNUJEO0lBREQsQ0FETzs7Ozt5QkFvQ0Y7OztlQUMrQixLQUFLLElBQUwsQ0FEL0I7T0FDQSxvQkFEQTtPQUNPLGtCQURQO09BQ2EsMEJBRGI7T0FDdUIsc0JBRHZCOztBQUVMLFdBQU0sTUFBTSxLQUFOLENBQVksR0FBWixDQUZEO0FBR0wsVUFBSyxLQUFLLFFBQUwsRUFBTCxDQUhLO0FBSUwsY0FBUyxTQUFTLFFBQVQsRUFBVCxDQUpLO0FBS0wsWUFBTyxPQUFPLFFBQVAsRUFBUCxDQUxLOztBQU9MLE9BQUcsQ0FBQyxJQUFELEVBQU07QUFDUixhQUFTLElBQVQsQ0FBYyxxQkFBZCxFQURRO0FBRVIsV0FGUTtJQUFUOztBQUtBLFVBQU8sTUFBUCxDQUFjLEVBQUMsWUFBRCxFQUFPLFVBQVAsRUFBYSxjQUFiLEVBQXFCLElBQUcsUUFBSCxFQUFuQyxFQUNFLElBREYsQ0FDTyxnQkFBTTtBQUNYLFdBQU8sWUFBUCxHQUFvQixJQUFwQixDQURXO0FBRVgsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixPQUFwQixXQUFvQyxJQUFwQyxFQUZXO0lBQU4sQ0FEUCxDQVpLOzs7Ozs4QkFrQkMsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQTlKVCIsImZpbGUiOiJiYWJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsaW1tdXRhYmxlLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1RleHRGaWVsZCwgUmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b24sRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBSZXdhcmRHb2FsIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuXG5jb25zdCB7TGlzdCxDb21tYW5kQmFyLFBob3RvLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieSBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e31cblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnN0YXRlLmZyb3plbilcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0cmV0dXJuIHRydWVcbiAgICB9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV3UHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRkYkZhbWlseS5jdXJyZW50Q2hpbGQ9bmV3UHJvcHMucGFyYW1zLm5hbWVcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMuY29udGV4dFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBob3RvIHJlZj1cInBob3RvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Y2hpbGQucGhvdG99XG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+e1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLnBob3RvPXVybFxuXHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0XHRcdFx0fX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJjaGlsZCBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGlsZC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZT1lLnRhcmdldC52YWx1ZS50cmltKClcblx0XHRcdFx0XHRcdFx0aWYoY2hpbGQubmFtZSE9dmFsdWUpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLm5hbWU9dmFsdWVcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlciByZWY9XCJiaXJ0aGRheVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwiYmlydGhkYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09rPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1llYXJTZWxlY3Rvcj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y2hpbGQuYmR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KG5pbCwgZGF0ZSk9Pntcblx0XHRcdFx0XHRcdFx0aWYoIWNoaWxkLmRiIHx8IGNoaWxkLmRiLmdldFRpbWUoKSE9ZGF0ZS5nZXRUaW1lKCkpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmRiPWRhdGVcblx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH19Lz5cblxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9CdXR0b25Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImdlbmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUsc2VsZWN0ZWQpPT57XG5cdFx0XHRcdFx0XHRcdGlmKGNoaWxkLmdlbmRlciE9c2VsZWN0ZWQpe1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmdlbmRlcj1zZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2VsZWN0ZWQ9e2NoaWxkLmdlbmRlcnx8XCJmXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvQnV0dG9uIHZhbHVlPVwiZlwiIGxhYmVsPVwiZ2lybFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpb0J1dHRvbiB2YWx1ZT1cIm1cIiBsYWJlbD1cImJveVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9CdXR0b25Hcm91cD5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7Zm9udFNpemU6XCJzbWFsbGVyXCIsIGNvbG9yOlwiZ3JheVwiLCBib3JkZXJCb3R0b206XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX0+XG5cdFx0XHRcdFx0XHRcdHtjaGlsZC5uYW1lfeeahOa/gOWKseiuoeWIklxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8UmV3YXJkR29hbFxuXHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzB9fVxuXHRcdFx0XHRcdFx0XHRjaGlsZD17Y2hpbGR9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLCB7YWN0aW9uOlwiUmVtb3ZlXCIsIG9uU2VsZWN0OmE9PnRoaXMucmVtb3ZlKCl9XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW1vdmUoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZnJvemVuOnRydWV9KVxuXHRcdGRiRmFtaWx5LnJlbW92ZSh0aGlzLmNvbnRleHQuY2hpbGQuX2lkKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0Y2hpbGQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGlsZC1waG90b1wiPlxuXHRcdFx0XHRcdFx0XHQ8UGhvdG8gcmVmPVwicGhvdG9cIlxuXHRcdFx0XHRcdFx0XHRcdHdpZHRoPXsxNTB9XG5cdFx0XHRcdFx0XHRcdFx0aGVpZ2h0PXsxNTB9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxuXHRcdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImNoaWxkIG5hbWVcIlxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiYmlydGhkYXlcIlxuXHRcdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImJpcnRoZGF5XCJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9XG5cdFx0XHRcdFx0XHRcdHNob3dZZWFyU2VsZWN0b3I9e3RydWV9XG5cdFx0XHRcdFx0XHRcdG1heERhdGU9e25ldyBEYXRlKCl9Lz5cblxuXHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgcmVmPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3ttYXJnaW5Ub3A6MzZ9fVxuXHRcdFx0XHRcdFx0XHRuYW1lPVwiZ2VuZGVyXCJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdFNlbGVjdGVkPVwiZlwiPlxuXHRcdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJmXCIgbGFiZWw9XCJnaXJsXCIvPlxuXHRcdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24gdmFsdWU9XCJtXCIgbGFiZWw9XCJib3lcIiAvPlxuXHRcdFx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0XHRpdGVtcz17W1wiQmFja1wiLCB7YWN0aW9uOlwiU2F2ZVwiLCBvblNlbGVjdDphPT50aGlzLnNhdmUoKX1dfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdHNhdmUoKXtcblx0XHRcdGxldCB7cGhvdG8sIG5hbWUsIGJpcnRoZGF5LCBnZW5kZXJ9PXRoaXMucmVmc1xuXHRcdFx0cGhvdG89cGhvdG8uc3RhdGUudXJsXG5cdFx0XHRuYW1lPW5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0YmlydGhkYXk9YmlydGhkYXkuZ2V0VmFsdWUoKVxuXHRcdFx0Z2VuZGVyPWdlbmRlci5nZXRWYWx1ZSgpXG5cblx0XHRcdGlmKCFuYW1lKXtcblx0XHRcdFx0TWVzc2FnZXIuc2hvdyhcIm5hbWUgY2FuJ3QgYmUgZW1wdHlcIilcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdEZhbWlseS51cHNlcnQoe3Bob3RvLG5hbWUsIGdlbmRlciwgZGI6YmlydGhkYXl9KVxuXHRcdFx0XHQudGhlbihiYWJ5PT57XG5cdFx0XHRcdFx0RmFtaWx5LmN1cnJlbnRDaGlsZD1iYWJ5XG5cdFx0XHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBiYWJ5LyR7bmFtZX1gKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0fVxufVxuIl19