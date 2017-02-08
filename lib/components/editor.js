"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        var _this$props = _this.props,
            _this$props$content = _this$props.content,
            content = _this$props$content === undefined ? [] : _this$props$content,
            appendable = _this$props.appendable,
            additions = [];

        if (appendable) additions.push({ photos: [], created: new Date() });
        _this.state = { additions: additions };
        return _this;
    }

    _createClass(Editor, [{
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
    _inherits(Section, _Component2);

    function Section() {
        _classCallCheck(this, Section);

        return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
    }

    _createClass(Section, [{
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

                return _react2.default.createElement(Photo, _extends({ key: photo }, styles, {
                    onPhoto: function onPhoto(url) {
                        return _this4.onPhoto(url, i++);
                    },
                    src: photo }));
            });


            if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, _extends({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJQaG90byIsIkVkaXRvciIsInByb3BzIiwiY29udGVudCIsImFwcGVuZGFibGUiLCJhZGRpdGlvbnMiLCJwdXNoIiwicGhvdG9zIiwiY3JlYXRlZCIsIkRhdGUiLCJzdGF0ZSIsIm5leHQiLCJjb25lbnQiLCJjaGFuZ2VhYmxlIiwidWlTZWN0aW9ucyIsIm1hcCIsInNlY3Rpb24iLCJjcmVhdGVkQXQiLCJub3ciLCJ1aUFkZGl0aW9ucyIsImFkZCIsImZvcmNlVXBkYXRlIiwiQXJyYXkiLCJmaWx0ZXIiLCJub3RFbXB0eSIsImRlc2MiLCJ0cmltIiwibGVuZ3RoIiwiYSIsImZpbmQiLCJ1bmRlZmluZWQiLCJwcm9wVHlwZXMiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiU2VjdGlvbiIsInJlYWRvbmx5Iiwic3R5bGVzIiwiaWNvblJhdGlvIiwiaWNvblNpemUiLCJ3aWR0aCIsImhlaWdodCIsImkiLCJ1aVBob3RvcyIsInBob3RvIiwidXJsIiwib25QaG90byIsImJpbmQiLCJ0ZXh0QWxpZ24iLCJib3JkZXIiLCJmb250U2l6ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU9BLEssZUFBQUEsSzs7SUFFY0MsTTs7O0FBQ2pCLG9CQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0hBQ1JBLEtBRFE7O0FBQUEsMEJBRWMsTUFBS0EsS0FGbkI7QUFBQSw4Q0FFVEMsT0FGUztBQUFBLFlBRVRBLE9BRlMsdUNBRUQsRUFGQztBQUFBLFlBRUVDLFVBRkYsZUFFRUEsVUFGRjtBQUFBLFlBR1ZDLFNBSFUsR0FHQSxFQUhBOztBQUlkLFlBQUdELFVBQUgsRUFDSUMsVUFBVUMsSUFBVixDQUFlLEVBQUNDLFFBQU8sRUFBUixFQUFXQyxTQUFRLElB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LENBQTVCLEVBQThCVCxHQUE5QixFQURKLEtBRUk7QUFDQXpDLHdCQUFRSSxNQUFSLENBQWVELElBQWYsQ0FBb0JzQyxHQUFwQjtBQUNBLHFCQUFLdkIsV0FBTDtBQUNIO0FBQ0oiLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEFkZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGRcIlxuXG5jb25zdCB7UGhvdG99PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge2NvbnRlbnQ9W10sYXBwZW5kYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W10sY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5zdGF0ZT17YWRkaXRpb25zfVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0KXtcbiAgICAgICAgdmFyIHthcHBlbmRhYmxlfT1uZXh0LFxuICAgICAgICAgICAgYWRkaXRpb25zPVtdO1xuICAgICAgICBpZihhcHBlbmRhYmxlKVxuICAgICAgICAgICAgYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXX0pXG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zPWFkZGl0aW9uc1xuICAgICAgICByZXR1cm4gbmV4dC5jb250ZW50IT10aGlzLnByb3BzLmNvbmVudFxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NvbnRlbnQ9W10sIGNoYW5nZWFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7YWRkaXRpb25zfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgdWlTZWN0aW9ucz1jb250ZW50Lm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17c2VjdGlvbi5jcmVhdGVkQXR9IHJlYWRvbmx5PXshY2hhbmdlYWJsZX0gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbm93PURhdGUubm93KCksXG4gICAgICAgICAgICB1aUFkZGl0aW9ucz1hZGRpdGlvbnMubWFwKGZ1bmN0aW9uKHNlY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFNlY3Rpb24ga2V5PXtub3crK30gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yXCI+XG4gICAgICAgICAgICAgICAge3VpU2VjdGlvbnN9XG4gICAgICAgICAgICAgICAge3VpQWRkaXRpb25zfVxuICAgICAgICAgICAgICAgIDxBZGRJY29uIGNsYXNzTmFtZT1cImFkZGVyXCIgb25DbGljaz17ZT0+dGhpcy5hZGQoKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBhZGQoKXtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLCBjcmVhdGVkOm5ldyBEYXRlKCl9KVxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKXtcbiAgICAgICAgdmFyIHtjb250ZW50LCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maWx0ZXIoZnVuY3Rpb24gbm90RW1wdHkoc2VjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gKHNlY3Rpb24uZGVzYyAmJiBzZWN0aW9uLmRlc2MudHJpbSgpLmxlbmd0aCkgfHwgc2VjdGlvbi5waG90b3MubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0IHRodW1ibmFpbCgpe1xuICAgICAgICB2YXIgYT0obmV3IEFycmF5KC4uLmNvbnRlbnQsIC4uLmFkZGl0aW9ucykpLmZpbmQoZnVuY3Rpb24gKHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGEgPyBhLnBob3Rvc1swXSA6IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuRWRpdG9yLnByb3BUeXBlcz17XG4gICAgYXBwZW5kYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hhbmdlYWJsZTogUHJvcFR5cGVzLmJvb2xcbn1cblxuRWRpdG9yLmRlZmF1bHRQcm9wcz17XG4gICAgYXBwZW5kYWJsZTogdHJ1ZSxcbiAgICBjaGFuZ2VhYmxlOiBmYWxzZVxufVxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtyZWFkb25seSxjb250ZW50PXt9fT10aGlzLnByb3BzO1xuICAgICAgICBpZihyZWFkb25seSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRvbmx5KGNvbnRlbnQpXG5cbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W119PWNvbnRlbnQsXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXG4gICAgICAgICAgICBpPTAsXG4gICAgICAgICAgICB1aVBob3Rvcz1waG90b3MubWFwKGZ1bmN0aW9uKHBob3RvKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxuICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5vblBob3RvKHVybCxpKyspfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e3Bob3RvfS8+KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBpZih1aVBob3Rvcy5sZW5ndGg8OSlcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byB7Li4uc3R5bGVzfSBvblBob3RvPXt0aGlzLm9uUGhvdG8uYmluZCh0aGlzKX0ga2V5PXtEYXRlLm5vdygpfS8+KSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGJvcmRlcjowLGhlaWdodDoxMDAsIGZvbnRTaXplOjEyfX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT5jb250ZW50LmRlc2M9ZS50YXJnZXQudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVzY30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZWFkb25seShjb250ZW50KXtcbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W10sIGNyZWF0ZWRBdH09Y29udGVudFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFkb25seVwiPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7cGhvdG9zLm1hcCgocGhvdG8pPT4oPGltZyBrZXk9e3Bob3RvfSBzcmM9e3Bob3RvfS8+KSl9XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjfTx0aW1lPntjcmVhdGVkQXR9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25QaG90byh1cmwsIGluZGV4KXtcbiAgICAgICAgdmFyIHtjb250ZW50fT10aGlzLnByb3BzXG4gICAgICAgIGlmKGNvbnRlbnQucGhvdG9zLmluZGV4T2YodXJsKSE9LTEpe1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5zcGxpY2UoaW5kZXgsMSx1cmwpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5wdXNoKHVybClcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19