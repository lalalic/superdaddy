"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var React = _require.React;
var Component = _require.Component;
var Photo = _require.UI.Photo;
var AddIcon = require("material-ui/svg-icons/action/note-add");
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
                return React.createElement(Section, { key: section.createdAt, readonly: !changeable, content: section });
            });
            var now = Date.now();
            var uiAdditions = additions.map(function (section) {
                return React.createElement(Section, { key: now++, content: section });
            });

            return React.createElement(
                "div",
                { className: "editor" },
                uiSections,
                uiAdditions,
                React.createElement(AddIcon, { className: "adder", onClick: this.add.bind(this) })
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
}(Component);

exports.default = Editor;


Editor.propTypes = {
    appendable: React.PropTypes.bool,
    changeable: React.PropTypes.bool
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

                return React.createElement(Photo, _extends({ key: photo }, styles, {
                    onPhoto: function onPhoto(url) {
                        return _this3.onPhoto(url, i++);
                    },
                    src: photo }));
            });

            if (uiPhotos.length < 9) uiPhotos.push(React.createElement(Photo, _extends({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

            return React.createElement(
                "div",
                { className: "section" },
                React.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    uiPhotos
                ),
                React.createElement("textarea", {
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

            return React.createElement(
                "div",
                { className: "readonly" },
                React.createElement(
                    "p",
                    null,
                    photos.map(function (photo) {
                        return React.createElement("img", { key: photo, src: photo });
                    }),
                    desc,
                    React.createElement(
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
}(Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0Esd0JBQVEsTUFBUixDQUFlLElBQWYsQ0FBb0IsR0FBcEIsRUFEQTtBQUVBLHFCQUFLLFdBQUwsR0FGQTthQUZKOzs7O1dBakRGO0VBQWdCIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7UmVhY3QsQ29tcG9uZW50LFVJOntQaG90b319PXJlcXVpcmUoJ3FpbGktYXBwJyksXG4gICAgQWRkSWNvbj1yZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ub3RlLWFkZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7Y29udGVudD1bXSxhcHBlbmRhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgYWRkaXRpb25zPVtdO1xuICAgICAgICBpZihhcHBlbmRhYmxlKVxuICAgICAgICAgICAgYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXSxjcmVhdGVkOm5ldyBEYXRlKCl9KVxuICAgICAgICB0aGlzLnN0YXRlPXthZGRpdGlvbnN9XG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHQpe1xuICAgICAgICB2YXIge2FwcGVuZGFibGV9PW5leHQsXG4gICAgICAgICAgICBhZGRpdGlvbnM9W107XG4gICAgICAgIGlmKGFwcGVuZGFibGUpXG4gICAgICAgICAgICBhZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdfSlcbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRpdGlvbnM9YWRkaXRpb25zXG4gICAgICAgIHJldHVybiBuZXh0LmNvbnRlbnQhPXRoaXMucHJvcHMuY29uZW50XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y29udGVudD1bXSwgY2hhbmdlYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHthZGRpdGlvbnN9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB1aVNlY3Rpb25zPWNvbnRlbnQubWFwKGZ1bmN0aW9uKHNlY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFNlY3Rpb24ga2V5PXtzZWN0aW9uLmNyZWF0ZWRBdH0gcmVhZG9ubHk9eyFjaGFuZ2VhYmxlfSBjb250ZW50PXtzZWN0aW9ufS8+KVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBub3c9RGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHVpQWRkaXRpb25zPWFkZGl0aW9ucy5tYXAoZnVuY3Rpb24oc2VjdGlvbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8U2VjdGlvbiBrZXk9e25vdysrfSBjb250ZW50PXtzZWN0aW9ufS8+KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlZGl0b3JcIj5cbiAgICAgICAgICAgICAgICB7dWlTZWN0aW9uc31cbiAgICAgICAgICAgICAgICB7dWlBZGRpdGlvbnN9XG4gICAgICAgICAgICAgICAgPEFkZEljb24gY2xhc3NOYW1lPVwiYWRkZXJcIiBvbkNsaWNrPXt0aGlzLmFkZC5iaW5kKHRoaXMpfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGFkZCgpe1xuICAgICAgICB0aGlzLnN0YXRlLmFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W10sIGNyZWF0ZWQ6bmV3IERhdGUoKX0pXG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpe1xuICAgICAgICB2YXIge2NvbnRlbnQsIGNoYW5nZWFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7YWRkaXRpb25zfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiAobmV3IEFycmF5KC4uLmNvbnRlbnQsIC4uLmFkZGl0aW9ucykpLmZpbHRlcihmdW5jdGlvbiBub3RFbXB0eShzZWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiAoc2VjdGlvbi5kZXNjICYmIHNlY3Rpb24uZGVzYy50cmltKCkubGVuZ3RoKSB8fCBzZWN0aW9uLnBob3Rvcy5sZW5ndGhcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgdGh1bWJuYWlsKCl7XG4gICAgICAgIHZhciBhPShuZXcgQXJyYXkoLi4uY29udGVudCwgLi4uYWRkaXRpb25zKSkuZmluZChmdW5jdGlvbiAoc2VjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbi5waG90b3MubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYSA/IGEucGhvdG9zWzBdIDogdW5kZWZpbmVkXG4gICAgfVxufVxuXG5FZGl0b3IucHJvcFR5cGVzPXtcbiAgICBhcHBlbmRhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBjaGFuZ2VhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxufVxuXG5FZGl0b3IuZGVmYXVsdFByb3BzPXtcbiAgICBhcHBlbmRhYmxlOiB0cnVlLFxuICAgIGNoYW5nZWFibGU6IGZhbHNlXG59XG5jbGFzcyBTZWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3JlYWRvbmx5LGNvbnRlbnQ9e319PXRoaXMucHJvcHM7XG4gICAgICAgIGlmKHJlYWRvbmx5KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkoY29udGVudClcblxuICAgICAgICB2YXIge2Rlc2MsIHBob3Rvcz1bXX09Y29udGVudCxcbiAgICAgICAgICAgIHN0eWxlcz17aWNvblJhdGlvOjIvMywgaWNvblNpemU6e3dpZHRoOjUwLCBoZWlnaHQ6NTB9fSxcbiAgICAgICAgICAgIGk9MCxcbiAgICAgICAgICAgIHVpUGhvdG9zPXBob3Rvcy5tYXAoZnVuY3Rpb24ocGhvdG8pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFBob3RvIGtleT17cGhvdG99IHsuLi5zdHlsZXN9XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLm9uUGhvdG8odXJsLGkrKyl9XG4gICAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG99Lz4pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIGlmKHVpUGhvdG9zLmxlbmd0aDw5KVxuICAgICAgICAgICAgdWlQaG90b3MucHVzaCgoPFBob3RvIHsuLi5zdHlsZXN9IG9uUGhvdG89e3RoaXMub25QaG90by5iaW5kKHRoaXMpfSBrZXk9e0RhdGUubm93KCl9Lz4pKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7dGV4dEFsaWduOlwiY2VudGVyXCJ9fT57dWlQaG90b3N9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTJ9fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIui/meS4gOWIu+eahOaDs+azlVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PmNvbnRlbnQuZGVzYz1lLnRhcmdldC52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZXNjfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJlYWRvbmx5KGNvbnRlbnQpe1xuICAgICAgICB2YXIge2Rlc2MsIHBob3Rvcz1bXSwgY3JlYXRlZEF0fT1jb250ZW50XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWRvbmx5XCI+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIHtwaG90b3MubWFwKChwaG90byk9Pig8aW1nIGtleT17cGhvdG99IHNyYz17cGhvdG99Lz4pKX1cbiAgICAgICAgICAgICAgICAgICAge2Rlc2N9PHRpbWU+e2NyZWF0ZWRBdH08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBvblBob3RvKHVybCwgaW5kZXgpe1xuICAgICAgICB2YXIge2NvbnRlbnR9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoY29udGVudC5waG90b3MuaW5kZXhPZih1cmwpIT0tMSl7XG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaW5kZXghPXVuZGVmaW5lZClcbiAgICAgICAgICAgIGNvbnRlbnQucGhvdG9zLnNwbGljZShpbmRleCwxLHVybClcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnRlbnQucGhvdG9zLnB1c2godXJsKVxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=