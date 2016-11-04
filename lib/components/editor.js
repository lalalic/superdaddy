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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTzs7SUFFYzs7O0FBQ2pCLGFBRGlCLE1BQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxRQUNDOzsyRUFERCxtQkFFUCxRQURROzswQkFFYyxNQUFLLEtBQUwsQ0FGZDs4Q0FFVCxRQUZTO1lBRVQsOENBQVEseUJBRkM7QUFFVixZQUFZLG1DQUFaLENBRlU7QUFHVix3QkFBVSxFQUFWLENBSFU7QUFJZCxZQUFHLFVBQUgsRUFDSSxVQUFVLElBQVYsQ0FBZSxFQUFDLFFBQU8sRUFBUCxFQUFVLFNBQVEsSUFBSSxJQUFKLEVBQVIsRUFBMUIsRUFESjtBQUVBLGNBQUssS0FBTCxHQUFXLEVBQUMsb0JBQUQsRUFBWCxDQU5jOztLQUFsQjs7aUJBRGlCOzs4Q0FVSyxNQUFLO0FBQ25CLGdCQUFDLGFBQVksS0FBWixVQUFELENBRG1CO0FBRW5CLDRCQUFVLEVBQVYsQ0FGbUI7QUFHdkIsZ0JBQUcsVUFBSCxFQUNJLFVBQVUsSUFBVixDQUFlLEVBQUMsUUFBTyxFQUFQLEVBQWhCLEVBREo7QUFFQSxpQkFBSyxLQUFMLENBQVcsU0FBWCxHQUFxQixTQUFyQixDQUx1QjtBQU12QixtQkFBTyxLQUFLLE9BQUwsSUFBYyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBTkU7Ozs7aUNBU25COzs7eUJBQ3lCLEtBQUssS0FBTCxDQUR6Qjt3Q0FDQyxRQUREO2dCQUNDLHlDQUFRLG9CQURUO0FBQ0EsZ0JBQWEsOEJBQWIsQ0FEQTtBQUVBLGdCQUFDLFlBQVcsS0FBSyxLQUFMLENBQVgsU0FBRCxDQUZBO0FBR0EsNkJBQVcsUUFBUSxHQUFSLENBQVksVUFBUyxPQUFULEVBQWlCO0FBQ3BDLHVCQUFRLDhCQUFDLE9BQUQsSUFBUyxLQUFLLFFBQVEsU0FBUixFQUFtQixVQUFVLENBQUMsVUFBRCxFQUFhLFNB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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEFkZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGRcIlxuXG5jb25zdCB7UGhvdG99PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge2NvbnRlbnQ9W10sYXBwZW5kYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W10sY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5zdGF0ZT17YWRkaXRpb25zfVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0KXtcbiAgICAgICAgdmFyIHthcHBlbmRhYmxlfT1uZXh0LFxuICAgICAgICAgICAgYWRkaXRpb25zPVtdO1xuICAgICAgICBpZihhcHBlbmRhYmxlKVxuICAgICAgICAgICAgYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXX0pXG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zPWFkZGl0aW9uc1xuICAgICAgICByZXR1cm4gbmV4dC5jb250ZW50IT10aGlzLnByb3BzLmNvbmVudFxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NvbnRlbnQ9W10sIGNoYW5nZWFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7YWRkaXRpb25zfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgdWlTZWN0aW9ucz1jb250ZW50Lm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17c2VjdGlvbi5jcmVhdGVkQXR9IHJlYWRvbmx5PXshY2hhbmdlYWJsZX0gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbm93PURhdGUubm93KCksXG4gICAgICAgICAgICB1aUFkZGl0aW9ucz1hZGRpdGlvbnMubWFwKGZ1bmN0aW9uKHNlY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFNlY3Rpb24ga2V5PXtub3crK30gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yXCI+XG4gICAgICAgICAgICAgICAge3VpU2VjdGlvbnN9XG4gICAgICAgICAgICAgICAge3VpQWRkaXRpb25zfVxuICAgICAgICAgICAgICAgIDxBZGRJY29uIGNsYXNzTmFtZT1cImFkZGVyXCIgb25DbGljaz17ZT0+dGhpcy5hZGQoKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBhZGQoKXtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLCBjcmVhdGVkOm5ldyBEYXRlKCl9KVxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKXtcbiAgICAgICAgdmFyIHtjb250ZW50LCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maWx0ZXIoZnVuY3Rpb24gbm90RW1wdHkoc2VjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gKHNlY3Rpb24uZGVzYyAmJiBzZWN0aW9uLmRlc2MudHJpbSgpLmxlbmd0aCkgfHwgc2VjdGlvbi5waG90b3MubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0IHRodW1ibmFpbCgpe1xuICAgICAgICB2YXIgYT0obmV3IEFycmF5KC4uLmNvbnRlbnQsIC4uLmFkZGl0aW9ucykpLmZpbmQoZnVuY3Rpb24gKHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGEgPyBhLnBob3Rvc1swXSA6IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuRWRpdG9yLnByb3BUeXBlcz17XG4gICAgYXBwZW5kYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hhbmdlYWJsZTogUHJvcFR5cGVzLmJvb2xcbn1cblxuRWRpdG9yLmRlZmF1bHRQcm9wcz17XG4gICAgYXBwZW5kYWJsZTogdHJ1ZSxcbiAgICBjaGFuZ2VhYmxlOiBmYWxzZVxufVxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtyZWFkb25seSxjb250ZW50PXt9fT10aGlzLnByb3BzO1xuICAgICAgICBpZihyZWFkb25seSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRvbmx5KGNvbnRlbnQpXG5cbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W119PWNvbnRlbnQsXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXG4gICAgICAgICAgICBpPTAsXG4gICAgICAgICAgICB1aVBob3Rvcz1waG90b3MubWFwKGZ1bmN0aW9uKHBob3RvKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxuICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5vblBob3RvKHVybCxpKyspfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e3Bob3RvfS8+KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBpZih1aVBob3Rvcy5sZW5ndGg8OSlcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byB7Li4uc3R5bGVzfSBvblBob3RvPXt0aGlzLm9uUGhvdG8uYmluZCh0aGlzKX0ga2V5PXtEYXRlLm5vdygpfS8+KSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGJvcmRlcjowLGhlaWdodDoxMDAsIGZvbnRTaXplOjEyfX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT5jb250ZW50LmRlc2M9ZS50YXJnZXQudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVzY30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZWFkb25seShjb250ZW50KXtcbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W10sIGNyZWF0ZWRBdH09Y29udGVudFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFkb25seVwiPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7cGhvdG9zLm1hcCgocGhvdG8pPT4oPGltZyBrZXk9e3Bob3RvfSBzcmM9e3Bob3RvfS8+KSl9XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjfTx0aW1lPntjcmVhdGVkQXR9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25QaG90byh1cmwsIGluZGV4KXtcbiAgICAgICAgdmFyIHtjb250ZW50fT10aGlzLnByb3BzXG4gICAgICAgIGlmKGNvbnRlbnQucGhvdG9zLmluZGV4T2YodXJsKSE9LTEpe1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5zcGxpY2UoaW5kZXgsMSx1cmwpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5wdXNoKHVybClcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19