"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _noteAdd = require("material-ui/svg-icons/action/note-add");

var _noteAdd2 = _interopRequireDefault(_noteAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = _qiliApp.UI.Photo;

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).call(this, props));

        var _this$props = _this.props;
        var _this$props$content = _this$props.content;
        var content = _this$props$content === undefined ? [] : _this$props$content;
        var appendable = _this$props.appendable;
        var additions = [];
        if (appendable) additions.push({ photos: [], created: new Date() });
        _this.state = { additions: additions };
        return _this;
    }

    _createClass(Editor, [{
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
            var _props = this.props;
            var _props$content = _props.content;
            var content = _props$content === undefined ? [] : _props$content;
            var changeable = _props.changeable;
            var additions = this.state.additions;
            var uiSections = content.map(function (section) {
                return _qiliApp.React.createElement(Section, { key: section.createdAt, readonly: !changeable, content: section });
            });
            var now = Date.now();
            var uiAdditions = additions.map(function (section) {
                return _qiliApp.React.createElement(Section, { key: now++, content: section });
            });

            return _qiliApp.React.createElement(
                "div",
                { className: "editor" },
                uiSections,
                uiAdditions,
                _qiliApp.React.createElement(_noteAdd2.default, { className: "adder", onClick: this.add.bind(this) })
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


            return new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(content), _toConsumableArray(additions))))().filter(function notEmpty(section) {
                return section.desc && section.desc.trim().length || section.photos.length;
            });
        }
    }, {
        key: "thumbnail",
        get: function get() {
            var a = new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(content), _toConsumableArray(additions))))().find(function (section) {
                return section.photos.length;
            });
            return a ? a.photos[0] : undefined;
        }
    }]);

    return Editor;
}(_qiliApp.Component);

exports.default = Editor;


Editor.propTypes = {
    appendable: _qiliApp.React.PropTypes.bool,
    changeable: _qiliApp.React.PropTypes.bool
};

Editor.defaultProps = {
    appendable: true,
    changeable: false
};

var Section = function (_Component2) {
    _inherits(Section, _Component2);

    function Section() {
        _classCallCheck(this, Section);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
    }

    _createClass(Section, [{
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
                var _this3 = this;

                return _qiliApp.React.createElement(Photo, _extends({ key: photo }, styles, {
                    onPhoto: function onPhoto(url) {
                        return _this3.onPhoto(url, i++);
                    },
                    src: photo }));
            });

            if (uiPhotos.length < 9) uiPhotos.push(_qiliApp.React.createElement(Photo, _extends({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

            return _qiliApp.React.createElement(
                "div",
                { className: "section" },
                _qiliApp.React.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    uiPhotos
                ),
                _qiliApp.React.createElement("textarea", {
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
            var desc = content.desc;
            var _content$photos2 = content.photos;
            var photos = _content$photos2 === undefined ? [] : _content$photos2;
            var createdAt = content.createdAt;

            return _qiliApp.React.createElement(
                "div",
                { className: "readonly" },
                _qiliApp.React.createElement(
                    "p",
                    null,
                    photos.map(function (photo) {
                        return _qiliApp.React.createElement("img", { key: photo, src: photo });
                    }),
                    desc,
                    _qiliApp.React.createElement(
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
}(_qiliApp.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU87O0lBRWM7OztBQUNqQixhQURpQixNQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsUUFDQzs7MkVBREQsbUJBRVAsUUFEUTs7MEJBRWMsTUFBSyxLQUFMLENBRmQ7OENBRVQsUUFGUztZQUVULDhDQUFRLHlCQUZDO0FBRVYsWUFBWSxtQ0FBWixDQUZVO0FBR1Ysd0JBQVUsRUFBVixDQUhVO0FBSWQsWUFBRyxVQUFILEVBQ0ksVUFBVSxJQUFWLENBQWUsRUFBQyxRQUFPLEVBQVAsRUFBVSxTQUFRLElBQUksSUFBSixFQUFSLEVBQTFCLEVBREo7QUFFQSxjQUFLLEtBQUwsR0FBVyxFQUFDLG9CQUFELEVBQVgsQ0FOYzs7S0FBbEI7O2lCQURpQjs7OENBVUssTUFBSztBQUNuQixnQkFBQyxhQUFZLEtBQVosVUFBRCxDQURtQjtBQUVuQiw0QkFBVSxFQUFWLENBRm1CO0FBR3ZCLGdCQUFHLFVBQUgsRUFDSSxVQUFVLElBQVYsQ0FBZSxFQUFDLFFBQU8sRUFBUCxFQUFoQixFQURKO0FBRUEsaUJBQUssS0FBTCxDQUFXLFNBQVgsR0FBcUIsU0FBckIsQ0FMdUI7QUFNdkIsbUJBQU8sS0FBSyxPQUFMLElBQWMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQU5FOzs7O2lDQVNuQjt5QkFDeUIsS0FBSyxLQUFMLENBRHpCO3dDQUNDLFFBREQ7Z0JBQ0MseUNBQVEsb0JBRFQ7QUFDQSxnQkFBYSw4QkFBYixDQURBO0FBRUEsZ0JBQUMsWUFBVyxLQUFLLEtBQUwsQ0FBWCxTQUFELENBRkE7QUFHQSw2QkFBVyxRQUFRLEdBQVIsQ0FBWSxVQUFTLE9BQVQsRUFBaUI7QUFDcEMsdUJBQVEsNkJBQUMsT0FBRCxJQUFTLEtBQUssUUFBUSxTQUFSLEVBQW1CLFVBQVUsQ0FBQyxVQUFELEVBQWEsU0FBUyxPQUFULEVB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Ozs7O1dBakRGIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBBZGRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkXCJcblxuY29uc3Qge1Bob3RvfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLGFwcGVuZGFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhZGRpdGlvbnM9W107XG4gICAgICAgIGlmKGFwcGVuZGFibGUpXG4gICAgICAgICAgICBhZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLGNyZWF0ZWQ6bmV3IERhdGUoKX0pXG4gICAgICAgIHRoaXMuc3RhdGU9e2FkZGl0aW9uc31cbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dCl7XG4gICAgICAgIHZhciB7YXBwZW5kYWJsZX09bmV4dCxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W119KVxuICAgICAgICB0aGlzLnN0YXRlLmFkZGl0aW9ucz1hZGRpdGlvbnNcbiAgICAgICAgcmV0dXJuIG5leHQuY29udGVudCE9dGhpcy5wcm9wcy5jb25lbnRcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjb250ZW50PVtdLCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHVpU2VjdGlvbnM9Y29udGVudC5tYXAoZnVuY3Rpb24oc2VjdGlvbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8U2VjdGlvbiBrZXk9e3NlY3Rpb24uY3JlYXRlZEF0fSByZWFkb25seT17IWNoYW5nZWFibGV9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5vdz1EYXRlLm5vdygpLFxuICAgICAgICAgICAgdWlBZGRpdGlvbnM9YWRkaXRpb25zLm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17bm93Kyt9IGNvbnRlbnQ9e3NlY3Rpb259Lz4pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVkaXRvclwiPlxuICAgICAgICAgICAgICAgIHt1aVNlY3Rpb25zfVxuICAgICAgICAgICAgICAgIHt1aUFkZGl0aW9uc31cbiAgICAgICAgICAgICAgICA8QWRkSWNvbiBjbGFzc05hbWU9XCJhZGRlclwiIG9uQ2xpY2s9e3RoaXMuYWRkLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgYWRkKCl7XG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXSwgY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCl7XG4gICAgICAgIHZhciB7Y29udGVudCwgY2hhbmdlYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHthZGRpdGlvbnN9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgQXJyYXkoLi4uY29udGVudCwgLi4uYWRkaXRpb25zKSkuZmlsdGVyKGZ1bmN0aW9uIG5vdEVtcHR5KHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIChzZWN0aW9uLmRlc2MgJiYgc2VjdGlvbi5kZXNjLnRyaW0oKS5sZW5ndGgpIHx8IHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCB0aHVtYm5haWwoKXtcbiAgICAgICAgdmFyIGE9KG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maW5kKGZ1bmN0aW9uIChzZWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnBob3Rvcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhID8gYS5waG90b3NbMF0gOiB1bmRlZmluZWRcbiAgICB9XG59XG5cbkVkaXRvci5wcm9wVHlwZXM9e1xuICAgIGFwcGVuZGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGNoYW5nZWFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59XG5cbkVkaXRvci5kZWZhdWx0UHJvcHM9e1xuICAgIGFwcGVuZGFibGU6IHRydWUsXG4gICAgY2hhbmdlYWJsZTogZmFsc2Vcbn1cbmNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7cmVhZG9ubHksY29udGVudD17fX09dGhpcy5wcm9wcztcbiAgICAgICAgaWYocmVhZG9ubHkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkb25seShjb250ZW50KVxuXG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdfT1jb250ZW50LFxuICAgICAgICAgICAgc3R5bGVzPXtpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19LFxuICAgICAgICAgICAgaT0wLFxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UGhvdG8ga2V5PXtwaG90b30gey4uLnN0eWxlc31cbiAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMub25QaG90byh1cmwsaSsrKX1cbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXG4gICAgICAgICAgICB1aVBob3Rvcy5wdXNoKCg8UGhvdG8gey4uLnN0eWxlc30gb25QaG90bz17dGhpcy5vblBob3RvLmJpbmQodGhpcyl9IGtleT17RGF0ZS5ub3coKX0vPikpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMn19XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+Y29udGVudC5kZXNjPWUudGFyZ2V0LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2Rlc2N9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVhZG9ubHkoY29udGVudCl7XG4gICAgICAgIHZhciB7ZGVzYywgcGhvdG9zPVtdLCBjcmVhdGVkQXR9PWNvbnRlbnRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge3Bob3Rvcy5tYXAoKHBob3RvKT0+KDxpbWcga2V5PXtwaG90b30gc3JjPXtwaG90b30vPikpfVxuICAgICAgICAgICAgICAgICAgICB7ZGVzY308dGltZT57Y3JlYXRlZEF0fTwvdGltZT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uUGhvdG8odXJsLCBpbmRleCl7XG4gICAgICAgIHZhciB7Y29udGVudH09dGhpcy5wcm9wc1xuICAgICAgICBpZihjb250ZW50LnBob3Rvcy5pbmRleE9mKHVybCkhPS0xKXtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihpbmRleCE9dW5kZWZpbmVkKVxuICAgICAgICAgICAgY29udGVudC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29udGVudC5waG90b3MucHVzaCh1cmwpXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==