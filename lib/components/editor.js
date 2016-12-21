"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _noteAdd = require("material-ui/svg-icons/action/note-add");

var _noteAdd2 = _interopRequireDefault(_noteAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Photo = _qiliApp.UI.Photo;

var Editor = function (_Component) {
    (0, _inherits3.default)(Editor, _Component);

    function Editor(props) {
        (0, _classCallCheck3.default)(this, Editor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Editor.__proto__ || (0, _getPrototypeOf2.default)(Editor)).call(this, props));

        var _this$props = _this.props,
            _this$props$content = _this$props.content,
            content = _this$props$content === undefined ? [] : _this$props$content,
            appendable = _this$props.appendable,
            additions = [];

        if (appendable) additions.push({ photos: [], created: new Date() });
        _this.state = { additions: additions };
        return _this;
    }

    (0, _createClass3.default)(Editor, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(next) {
            var appendable = next.appendable,
                additions = [];

            if (appendable) additions.push({ photos: [] });
            this.state.additions = additions;
            return next.content != this.props.conent;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$content = _props.content,
                content = _props$content === undefined ? [] : _props$content,
                changeable = _props.changeable,
                additions = this.state.additions,
                uiSections = content.map(function (section) {
                return _react2.default.createElement(Section, { key: section.createdAt, readonly: !changeable, content: section });
            }),
                now = Date.now(),
                uiAdditions = additions.map(function (section) {
                return _react2.default.createElement(Section, { key: now++, content: section });
            });


            return _react2.default.createElement(
                "div",
                { className: "editor" },
                uiSections,
                uiAdditions,
                _react2.default.createElement(_noteAdd2.default, { className: "adder", onClick: function onClick(e) {
                        return _this2.add();
                    } })
            );
        }
    }, {
        key: "add",
        value: function add() {
            this.state.additions.push({ photos: [], created: new Date() });
            this.forceUpdate();
        }
    }, {
        key: "value",
        get: function get() {
            var _props2 = this.props,
                content = _props2.content,
                changeable = _props2.changeable,
                additions = this.state.additions;


            return new (Function.prototype.bind.apply(Array, [null].concat((0, _toConsumableArray3.default)(content), (0, _toConsumableArray3.default)(additions))))().filter(function notEmpty(section) {
                return section.desc && section.desc.trim().length || section.photos.length;
            });
        }
    }, {
        key: "thumbnail",
        get: function get() {
            var a = new (Function.prototype.bind.apply(Array, [null].concat((0, _toConsumableArray3.default)(content), (0, _toConsumableArray3.default)(additions))))().find(function (section) {
                return section.photos.length;
            });
            return a ? a.photos[0] : undefined;
        }
    }]);
    return Editor;
}(_react.Component);

exports.default = Editor;


Editor.propTypes = {
    appendable: _react.PropTypes.bool,
    changeable: _react.PropTypes.bool
};

Editor.defaultProps = {
    appendable: true,
    changeable: false
};

var Section = function (_Component2) {
    (0, _inherits3.default)(Section, _Component2);

    function Section() {
        (0, _classCallCheck3.default)(this, Section);
        return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
    }

    (0, _createClass3.default)(Section, [{
        key: "render",
        value: function render() {
            var _props3 = this.props,
                readonly = _props3.readonly,
                _props3$content = _props3.content,
                content = _props3$content === undefined ? {} : _props3$content;

            if (readonly) return this.readonly(content);

            var desc = content.desc,
                _content$photos = content.photos,
                photos = _content$photos === undefined ? [] : _content$photos,
                styles = { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } },
                i = 0,
                uiPhotos = photos.map(function (photo) {
                var _this4 = this;

                return _react2.default.createElement(Photo, (0, _extends3.default)({ key: photo }, styles, {
                    onPhoto: function onPhoto(url) {
                        return _this4.onPhoto(url, i++);
                    },
                    src: photo }));
            });


            if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, (0, _extends3.default)({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

            return _react2.default.createElement(
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    uiPhotos
                ),
                _react2.default.createElement("textarea", {
                    style: { width: "100%", border: 0, height: 100, fontSize: 12 },
                    placeholder: "这一刻的想法",
                    onChange: function onChange(e) {
                        return content.desc = e.target.value;
                    },
                    defaultValue: desc })
            );
        }
    }, {
        key: "readonly",
        value: function readonly(content) {
            var desc = content.desc,
                _content$photos2 = content.photos,
                photos = _content$photos2 === undefined ? [] : _content$photos2,
                createdAt = content.createdAt;

            return _react2.default.createElement(
                "div",
                { className: "readonly" },
                _react2.default.createElement(
                    "p",
                    null,
                    photos.map(function (photo) {
                        return _react2.default.createElement("img", { key: photo, src: photo });
                    }),
                    desc,
                    _react2.default.createElement(
                        "time",
                        null,
                        createdAt
                    )
                )
            );
        }
    }, {
        key: "onPhoto",
        value: function onPhoto(url, index) {
            var content = this.props.content;

            if (content.photos.indexOf(url) != -1) {
                this.forceUpdate();
                return;
            }

            if (index != undefined) content.photos.splice(index, 1, url);else {
                content.photos.push(url);
                this.forceUpdate();
            }
        }
    }]);
    return Section;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7O0lBRU87O0lBRWM7OztBQUNqQixvQkFBWSxLQUFaLEVBQWtCOzs7MElBQ1IsUUFEUTs7MEJBRWMsTUFBSyxLQUFMOzhDQUF2QjswREFBUTtZQUFHO1lBQ1osWUFBVSxHQUhBOztBQUlkLFlBQUcsVUFBSCxFQUNJLFVBQVUsSUFBVixDQUFlLEVBQUMsUUFBTyxFQUFQLEVBQVUsU0FBUSxJQUFJLElBQUosRUFBUixFQUExQixFQURKO0FBRUEsY0FBSyxLQUFMLEdBQVcsRUFBQyxvQkFBRCxFQUFYLENBTmM7O0tBQWxCOzs7OzhDQVNzQixNQUFLO0FBQ25CLGdCQUFDLGFBQVksS0FBWixVQUFEO2dCQUNBLFlBQVUsRUFEVixDQURtQjs7QUFHdkIsZ0JBQUcsVUFBSCxFQUNJLFVBQVUsSUFBVixDQUFlLEVBQUMsUUFBTyxFQUFQLEVBQWhCLEVBREo7QUFFQSxpQkFBSyxLQUFMLENBQVcsU0FBWCxHQUFxQixTQUFyQixDQUx1QjtBQU12QixtQkFBTyxLQUFLLE9BQUwsSUFBYyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBTkU7Ozs7aUNBU25COzs7eUJBQ3lCLEtBQUssS0FBTDt3Q0FBeEI7eURBQVE7Z0JBQUk7Z0JBQ1osWUFBVyxLQUFLLEtBQUwsQ0FBWDtnQkFDRCxhQUFXLFFBQVEsR0FBUixDQUFZLFVBQVMsT0FBVCxFQUFpQjtBQUNwQyx1QkFBUSw4QkFBQyxPQUFELElBQVMsS0FBSyxRQUFRLFNBQVIsRUFBbUIsVUFBVSxDQUFDLFVBQUQsRUFBYSxTQUFTLE9BQVQsRUFBeEQsQ0FBUixDQURvQzthQUFqQjtnQkFHdkIsTUFBSSxLQUFLLEdBQUw7Z0JBQ0osY0FBWSxVQUFVLEdBQVYsQ0FBYyxVQUFTLE9BQVQsRUFBaUI7QUFDdkMsdUJBQVEsOEJBQUMsT0FB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O0FBQ1Ysa0NBQWMsSUFBZCxFQUpKLENBRko7YUFESixDQWpCSTs7OztpQ0E2QkMsU0FBUTtnQkFDUixPQUE0QixRQUE1QjttQ0FBNEIsUUFBdEI7MERBQU87Z0JBQUksWUFBVyxRQUFYLFVBRFQ7O0FBRWIsbUJBQ0k7O2tCQUFLLFdBQVUsVUFBVixFQUFMO2dCQUNJOzs7b0JBQ0ssT0FBTyxHQUFQLENBQVcsVUFBQyxLQUFEOytCQUFVLHVDQUFLLEtBQUssS0FBTCxFQUFZLEtBQUssS0FBTCxFQUFqQjtxQkFBVixDQURoQjtvQkFFSyxJQUZMO29CQUVVOzs7d0JBQU8sU0FBUDtxQkFGVjtpQkFESjthQURKLENBRmE7Ozs7Z0NBWVQsS0FBSyxPQUFNO2dCQUNWLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEVTs7QUFFZixnQkFBRyxRQUFRLE1BQVIsQ0FBZSxPQUFmLENBQXVCLEdBQXZCLEtBQTZCLENBQUMsQ0FBRCxFQUFHO0FBQy9CLHFCQUFLLFdBQUwsR0FEK0I7QUFFL0IsdUJBRitCO2FBQW5DOztBQUtBLGdCQUFHLFNBQU8sU0FBUCxFQUNDLFFBQVEsTUFBUixDQUFlLE1BQWYsQ0FBc0IsS0FBdEIsRUFBNEIsQ0FBNUIsRUFBOEIsR0FBOUIsRUFESixLQUVJO0FBQ0Esd0JBQVEsTUFBUixDQUFlLElBQWYsQ0FBb0IsR0FBcEIsRUFEQTtBQUVBLHFCQUFLLFdBQUwsR0FGQTthQUZKIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBBZGRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkXCJcblxuY29uc3Qge1Bob3RvfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLGFwcGVuZGFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhZGRpdGlvbnM9W107XG4gICAgICAgIGlmKGFwcGVuZGFibGUpXG4gICAgICAgICAgICBhZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLGNyZWF0ZWQ6bmV3IERhdGUoKX0pXG4gICAgICAgIHRoaXMuc3RhdGU9e2FkZGl0aW9uc31cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dCl7XG4gICAgICAgIHZhciB7YXBwZW5kYWJsZX09bmV4dCxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W119KVxuICAgICAgICB0aGlzLnN0YXRlLmFkZGl0aW9ucz1hZGRpdGlvbnNcbiAgICAgICAgcmV0dXJuIG5leHQuY29udGVudCE9dGhpcy5wcm9wcy5jb25lbnRcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHVpU2VjdGlvbnM9Y29udGVudC5tYXAoZnVuY3Rpb24oc2VjdGlvbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8U2VjdGlvbiBrZXk9e3NlY3Rpb24uY3JlYXRlZEF0fSByZWFkb25seT17IWNoYW5nZWFibGV9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5vdz1EYXRlLm5vdygpLFxuICAgICAgICAgICAgdWlBZGRpdGlvbnM9YWRkaXRpb25zLm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17bm93Kyt9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVkaXRvclwiPlxuICAgICAgICAgICAgICAgIHt1aVNlY3Rpb25zfVxuICAgICAgICAgICAgICAgIHt1aUFkZGl0aW9uc31cbiAgICAgICAgICAgICAgICA8QWRkSWNvbiBjbGFzc05hbWU9XCJhZGRlclwiIG9uQ2xpY2s9e2U9PnRoaXMuYWRkKCl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgYWRkKCl7XG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXSwgY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCl7XG4gICAgICAgIHZhciB7Y29udGVudCwgY2hhbmdlYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHthZGRpdGlvbnN9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgQXJyYXkoLi4uY29udGVudCwgLi4uYWRkaXRpb25zKSkuZmlsdGVyKGZ1bmN0aW9uIG5vdEVtcHR5KHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIChzZWN0aW9uLmRlc2MgJiYgc2VjdGlvbi5kZXNjLnRyaW0oKS5sZW5ndGgpIHx8IHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCB0aHVtYm5haWwoKXtcbiAgICAgICAgdmFyIGE9KG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maW5kKGZ1bmN0aW9uIChzZWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnBob3Rvcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhID8gYS5waG90b3NbMF0gOiB1bmRlZmluZWRcbiAgICB9XG59XG5cbkVkaXRvci5wcm9wVHlwZXM9e1xuICAgIGFwcGVuZGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGNoYW5nZWFibGU6IFByb3BUeXBlcy5ib29sXG59XG5cbkVkaXRvci5kZWZhdWx0UHJvcHM9e1xuICAgIGFwcGVuZGFibGU6IHRydWUsXG4gICAgY2hhbmdlYWJsZTogZmFsc2Vcbn1cbmNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7cmVhZG9ubHksY29udGVudD17fX09dGhpcy5wcm9wcztcbiAgICAgICAgaWYocmVhZG9ubHkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkb25seShjb250ZW50KVxuXG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdfT1jb250ZW50LFxuICAgICAgICAgICAgc3R5bGVzPXtpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19LFxuICAgICAgICAgICAgaT0wLFxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UGhvdG8ga2V5PXtwaG90b30gey4uLnN0eWxlc31cbiAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMub25QaG90byh1cmwsaSsrKX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXG4gICAgICAgICAgICB1aVBob3Rvcy5wdXNoKCg8UGhvdG8gey4uLnN0eWxlc30gb25QaG90bz17dGhpcy5vblBob3RvLmJpbmQodGhpcyl9IGtleT17RGF0ZS5ub3coKX0vPikpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMn19XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+Y29udGVudC5kZXNjPWUudGFyZ2V0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2Rlc2N9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVhZG9ubHkoY29udGVudCl7XG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdLCBjcmVhdGVkQXR9PWNvbnRlbnRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge3Bob3Rvcy5tYXAoKHBob3RvKT0+KDxpbWcga2V5PXtwaG90b30gc3JjPXtwaG90b30vPikpfVxuICAgICAgICAgICAgICAgICAgICB7ZGVzY308dGltZT57Y3JlYXRlZEF0fTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uUGhvdG8odXJsLCBpbmRleCl7XG4gICAgICAgIHZhciB7Y29udGVudH09dGhpcy5wcm9wc1xuICAgICAgICBpZihjb250ZW50LnBob3Rvcy5pbmRleE9mKHVybCkhPS0xKXtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihpbmRleCE9dW5kZWZpbmVkKVxuICAgICAgICAgICAgY29udGVudC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29udGVudC5waG90b3MucHVzaCh1cmwpXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==