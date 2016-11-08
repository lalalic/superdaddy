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

        var _this$props = _this.props;
        var _this$props$content = _this$props.content;
        var content = _this$props$content === undefined ? [] : _this$props$content;
        var appendable = _this$props.appendable;
        var additions = [];
        if (appendable) additions.push({ photos: [], created: new Date() });
        _this.state = { additions: additions };
        return _this;
    }

    (0, _createClass3.default)(Editor, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(next) {
            var appendable = next.appendable;
            var additions = [];
            if (appendable) additions.push({ photos: [] });
            this.state.additions = additions;
            return next.content != this.props.conent;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var _props$content = _props.content;
            var content = _props$content === undefined ? [] : _props$content;
            var changeable = _props.changeable;
            var additions = this.state.additions;
            var uiSections = content.map(function (section) {
                return _react2.default.createElement(Section, { key: section.createdAt, readonly: !changeable, content: section });
            });
            var now = Date.now();
            var uiAdditions = additions.map(function (section) {
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
            var _props2 = this.props;
            var content = _props2.content;
            var changeable = _props2.changeable;
            var additions = this.state.additions;


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
            var _props3 = this.props;
            var readonly = _props3.readonly;
            var _props3$content = _props3.content;
            var content = _props3$content === undefined ? {} : _props3$content;

            if (readonly) return this.readonly(content);

            var desc = content.desc;
            var _content$photos = content.photos;
            var photos = _content$photos === undefined ? [] : _content$photos;
            var styles = { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } };
            var i = 0;
            var uiPhotos = photos.map(function (photo) {
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
                    placeholder: "\u8FD9\u4E00\u523B\u7684\u60F3\u6CD5",
                    onChange: function onChange(e) {
                        return content.desc = e.target.value;
                    },
                    defaultValue: desc })
            );
        }
    }, {
        key: "readonly",
        value: function readonly(content) {
            var desc = content.desc;
            var _content$photos2 = content.photos;
            var photos = _content$photos2 === undefined ? [] : _content$photos2;
            var createdAt = content.createdAt;

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

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJQaG90byIsIkVkaXRvciIsInByb3BzIiwiY29udGVudCIsImFwcGVuZGFibGUiLCJhZGRpdGlvbnMiLCJwdXNoIiwicGhvdG9zIiwiY3JlYXRlZCIsIkRhdGUiLCJzdGF0ZSIsIm5leHQiLCJjb25lbnQiLCJjaGFuZ2VhYmxlIiwibWFwIiwic2VjdGlvbiIsImNyZWF0ZWRBdCIsIm5vdyIsInVpU2VjdGlvbnMiLCJ1aUFkZGl0aW9ucyIsImFkZCIsImZvcmNlVXBkYXRlIiwiQXJyYXkiLCJmaWx0ZXIiLCJub3RFbXB0eSIsImRlc2MiLCJ0cmltIiwibGVuZ3RoIiwiYSIsImZpbmQiLCJ1bmRlZmluZWQiLCJwcm9wVHlwZXMiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiU2VjdGlvbiIsInJlYWRvbmx5IiwiaWNvblJhdGlvIiwiaWNvblNpemUiLCJ3aWR0aCIsImhlaWdodCIsInBob3RvIiwic3R5bGVzIiwidXJsIiwib25QaG90byIsImkiLCJ1aVBob3RvcyIsImJpbmQiLCJ0ZXh0QWxpZ24iLCJib3JkZXIiLCJmb250U2l6ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7OztJQUVPQSxLLGVBQUFBLEs7O0lBRWNDLE07OztBQUNqQixvQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDBJQUNSQSxLQURROztBQUFBLDBCQUVjLE1BQUtBLEtBRm5CO0FBQUEsOENBRVRDLE9BRlM7QUFBQSxZQUVUQSxPQUZTLHVDQUVELEVBRkM7QUFFVixZQUFZQyxVQUFaLGVBQVlBLFVBQVo7QUFDQSx3QkFBVSxFQUFWO0FBQ0osWUFBR0EsVUFBSCxFQUNJQyxVQUFVQyxJQUFWLENBQWUsRUFBQ0MsUUFBTyxFQUFSLEVBQVdDLFNB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QUFDQSxxQkFBS3JCLFdBQUw7QUFDSDtBQUNKIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBBZGRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkXCJcblxuY29uc3Qge1Bob3RvfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLGFwcGVuZGFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhZGRpdGlvbnM9W107XG4gICAgICAgIGlmKGFwcGVuZGFibGUpXG4gICAgICAgICAgICBhZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLGNyZWF0ZWQ6bmV3IERhdGUoKX0pXG4gICAgICAgIHRoaXMuc3RhdGU9e2FkZGl0aW9uc31cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dCl7XG4gICAgICAgIHZhciB7YXBwZW5kYWJsZX09bmV4dCxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W119KVxuICAgICAgICB0aGlzLnN0YXRlLmFkZGl0aW9ucz1hZGRpdGlvbnNcbiAgICAgICAgcmV0dXJuIG5leHQuY29udGVudCE9dGhpcy5wcm9wcy5jb25lbnRcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHVpU2VjdGlvbnM9Y29udGVudC5tYXAoZnVuY3Rpb24oc2VjdGlvbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8U2VjdGlvbiBrZXk9e3NlY3Rpb24uY3JlYXRlZEF0fSByZWFkb25seT17IWNoYW5nZWFibGV9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5vdz1EYXRlLm5vdygpLFxuICAgICAgICAgICAgdWlBZGRpdGlvbnM9YWRkaXRpb25zLm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17bm93Kyt9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVkaXRvclwiPlxuICAgICAgICAgICAgICAgIHt1aVNlY3Rpb25zfVxuICAgICAgICAgICAgICAgIHt1aUFkZGl0aW9uc31cbiAgICAgICAgICAgICAgICA8QWRkSWNvbiBjbGFzc05hbWU9XCJhZGRlclwiIG9uQ2xpY2s9e2U9PnRoaXMuYWRkKCl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgYWRkKCl7XG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXSwgY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCl7XG4gICAgICAgIHZhciB7Y29udGVudCwgY2hhbmdlYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHthZGRpdGlvbnN9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgQXJyYXkoLi4uY29udGVudCwgLi4uYWRkaXRpb25zKSkuZmlsdGVyKGZ1bmN0aW9uIG5vdEVtcHR5KHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIChzZWN0aW9uLmRlc2MgJiYgc2VjdGlvbi5kZXNjLnRyaW0oKS5sZW5ndGgpIHx8IHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCB0aHVtYm5haWwoKXtcbiAgICAgICAgdmFyIGE9KG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maW5kKGZ1bmN0aW9uIChzZWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnBob3Rvcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhID8gYS5waG90b3NbMF0gOiB1bmRlZmluZWRcbiAgICB9XG59XG5cbkVkaXRvci5wcm9wVHlwZXM9e1xuICAgIGFwcGVuZGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGNoYW5nZWFibGU6IFByb3BUeXBlcy5ib29sXG59XG5cbkVkaXRvci5kZWZhdWx0UHJvcHM9e1xuICAgIGFwcGVuZGFibGU6IHRydWUsXG4gICAgY2hhbmdlYWJsZTogZmFsc2Vcbn1cbmNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7cmVhZG9ubHksY29udGVudD17fX09dGhpcy5wcm9wcztcbiAgICAgICAgaWYocmVhZG9ubHkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkb25seShjb250ZW50KVxuXG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdfT1jb250ZW50LFxuICAgICAgICAgICAgc3R5bGVzPXtpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19LFxuICAgICAgICAgICAgaT0wLFxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UGhvdG8ga2V5PXtwaG90b30gey4uLnN0eWxlc31cbiAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMub25QaG90byh1cmwsaSsrKX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXG4gICAgICAgICAgICB1aVBob3Rvcy5wdXNoKCg8UGhvdG8gey4uLnN0eWxlc30gb25QaG90bz17dGhpcy5vblBob3RvLmJpbmQodGhpcyl9IGtleT17RGF0ZS5ub3coKX0vPikpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMn19XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+Y29udGVudC5kZXNjPWUudGFyZ2V0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2Rlc2N9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVhZG9ubHkoY29udGVudCl7XG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdLCBjcmVhdGVkQXR9PWNvbnRlbnRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge3Bob3Rvcy5tYXAoKHBob3RvKT0+KDxpbWcga2V5PXtwaG90b30gc3JjPXtwaG90b30vPikpfVxuICAgICAgICAgICAgICAgICAgICB7ZGVzY308dGltZT57Y3JlYXRlZEF0fTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uUGhvdG8odXJsLCBpbmRleCl7XG4gICAgICAgIHZhciB7Y29udGVudH09dGhpcy5wcm9wc1xuICAgICAgICBpZihjb250ZW50LnBob3Rvcy5pbmRleE9mKHVybCkhPS0xKXtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihpbmRleCE9dW5kZWZpbmVkKVxuICAgICAgICAgICAgY29udGVudC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29udGVudC5waG90b3MucHVzaCh1cmwpXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==