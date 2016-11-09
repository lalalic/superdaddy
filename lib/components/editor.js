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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Editor).call(this, props));

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
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Section).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7O0lBRU87O0lBRWM7OztBQUNqQixhQURpQixNQUNqQixDQUFZLEtBQVosRUFBa0I7NENBREQsUUFDQzs7aUdBREQsbUJBRVAsUUFEUTs7MEJBRWMsTUFBSyxLQUFMLENBRmQ7OENBRVQsUUFGUztZQUVULDhDQUFRLHlCQUZDO0FBRVYsWUFBWSxtQ0FBWixDQUZVO0FBR1Ysd0JBQVUsRUFBVixDQUhVO0FBSWQsWUFBRyxVQUFILEVBQ0ksVUFBVSxJQUFWLENBQWUsRUFBQyxRQUFPLEVBQVAsRUFBVSxTQUFRLElBQUksSUFBSixFQUFSLEVBQTFCLEVBREo7QUFFQSxjQUFLLEtBQUwsR0FBVyxFQUFDLG9CQUFELEVBQVgsQ0FOYzs7S0FBbEI7OytCQURpQjs7OENBVUssTUFBSztBQUNuQixnQkFBQyxhQUFZLEtBQVosVUFBRCxDQURtQjtBQUVuQiw0QkFBVSxFQUFWLENBRm1CO0FBR3ZCLGdCQUFHLFVBQUgsRUFDSSxVQUFVLElBQVYsQ0FBZSxFQUFDLFFBQU8sRUFBUCxFQUFoQixFQURKO0FBRUEsaUJBQUssS0FBTCxDQUFXLFNBQVgsR0FBcUIsU0FBckIsQ0FMdUI7QUFNdkIsbUJBQU8sS0FBSyxPQUFMLElBQWMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQU5FOzs7O2lDQVNuQjs7O3lCQUN5QixLQUFLLEtBQUwsQ0FEekI7d0NBQ0MsUUFERDtnQkFDQyx5Q0FBUSxvQkFEVDtBQUNBLGdCQUFhLDhCQUFiLENBREE7QUFFQSxnQkFBQyxZQUFXLEtBQUssS0FBTCxDQUFYLFNBQUQsQ0FGQTtBQUdBLDZCQUFXLFFBQVEsR0FBUixDQUFZLFVBQVMsT0FBVCxFQUFpQjtBQUNwQyx1QkFBUSw4QkFBQyxPQUFELElBQVMsS0FBSyxRQUFRLFNBQVIsRUFBbUIsVUFBVSxD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LCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IEFkZEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGRcIlxuXG5jb25zdCB7UGhvdG99PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge2NvbnRlbnQ9W10sYXBwZW5kYWJsZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFkZGl0aW9ucz1bXTtcbiAgICAgICAgaWYoYXBwZW5kYWJsZSlcbiAgICAgICAgICAgIGFkZGl0aW9ucy5wdXNoKHtwaG90b3M6W10sY3JlYXRlZDpuZXcgRGF0ZSgpfSlcbiAgICAgICAgdGhpcy5zdGF0ZT17YWRkaXRpb25zfVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0KXtcbiAgICAgICAgdmFyIHthcHBlbmRhYmxlfT1uZXh0LFxuICAgICAgICAgICAgYWRkaXRpb25zPVtdO1xuICAgICAgICBpZihhcHBlbmRhYmxlKVxuICAgICAgICAgICAgYWRkaXRpb25zLnB1c2goe3Bob3RvczpbXX0pXG4gICAgICAgIHRoaXMuc3RhdGUuYWRkaXRpb25zPWFkZGl0aW9uc1xuICAgICAgICByZXR1cm4gbmV4dC5jb250ZW50IT10aGlzLnByb3BzLmNvbmVudFxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NvbnRlbnQ9W10sIGNoYW5nZWFibGV9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7YWRkaXRpb25zfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgdWlTZWN0aW9ucz1jb250ZW50Lm1hcChmdW5jdGlvbihzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxTZWN0aW9uIGtleT17c2VjdGlvbi5jcmVhdGVkQXR9IHJlYWRvbmx5PXshY2hhbmdlYWJsZX0gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbm93PURhdGUubm93KCksXG4gICAgICAgICAgICB1aUFkZGl0aW9ucz1hZGRpdGlvbnMubWFwKGZ1bmN0aW9uKHNlY3Rpb24pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoPFNlY3Rpb24ga2V5PXtub3crK30gY29udGVudD17c2VjdGlvbn0vPilcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yXCI+XG4gICAgICAgICAgICAgICAge3VpU2VjdGlvbnN9XG4gICAgICAgICAgICAgICAge3VpQWRkaXRpb25zfVxuICAgICAgICAgICAgICAgIDxBZGRJY29uIGNsYXNzTmFtZT1cImFkZGVyXCIgb25DbGljaz17ZT0+dGhpcy5hZGQoKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBhZGQoKXtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRpdGlvbnMucHVzaCh7cGhvdG9zOltdLCBjcmVhdGVkOm5ldyBEYXRlKCl9KVxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKXtcbiAgICAgICAgdmFyIHtjb250ZW50LCBjaGFuZ2VhYmxlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2FkZGl0aW9uc309dGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKG5ldyBBcnJheSguLi5jb250ZW50LCAuLi5hZGRpdGlvbnMpKS5maWx0ZXIoZnVuY3Rpb24gbm90RW1wdHkoc2VjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gKHNlY3Rpb24uZGVzYyAmJiBzZWN0aW9uLmRlc2MudHJpbSgpLmxlbmd0aCkgfHwgc2VjdGlvbi5waG90b3MubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0IHRodW1ibmFpbCgpe1xuICAgICAgICB2YXIgYT0obmV3IEFycmF5KC4uLmNvbnRlbnQsIC4uLmFkZGl0aW9ucykpLmZpbmQoZnVuY3Rpb24gKHNlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24ucGhvdG9zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGEgPyBhLnBob3Rvc1swXSA6IHVuZGVmaW5lZFxuICAgIH1cbn1cblxuRWRpdG9yLnByb3BUeXBlcz17XG4gICAgYXBwZW5kYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2hhbmdlYWJsZTogUHJvcFR5cGVzLmJvb2xcbn1cblxuRWRpdG9yLmRlZmF1bHRQcm9wcz17XG4gICAgYXBwZW5kYWJsZTogdHJ1ZSxcbiAgICBjaGFuZ2VhYmxlOiBmYWxzZVxufVxuY2xhc3MgU2VjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtyZWFkb25seSxjb250ZW50PXt9fT10aGlzLnByb3BzO1xuICAgICAgICBpZihyZWFkb25seSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRvbmx5KGNvbnRlbnQpXG5cbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W119PWNvbnRlbnQsXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXG4gICAgICAgICAgICBpPTAsXG4gICAgICAgICAgICB1aVBob3Rvcz1waG90b3MubWFwKGZ1bmN0aW9uKHBob3RvKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxuICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5vblBob3RvKHVybCxpKyspfVxuICAgICAgICAgICAgICAgICAgICBzcmM9e3Bob3RvfS8+KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBpZih1aVBob3Rvcy5sZW5ndGg8OSlcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byB7Li4uc3R5bGVzfSBvblBob3RvPXt0aGlzLm9uUGhvdG8uYmluZCh0aGlzKX0ga2V5PXtEYXRlLm5vdygpfS8+KSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGJvcmRlcjowLGhlaWdodDoxMDAsIGZvbnRTaXplOjEyfX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT5jb250ZW50LmRlc2M9ZS50YXJnZXQudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVzY30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZWFkb25seShjb250ZW50KXtcbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W10sIGNyZWF0ZWRBdH09Y29udGVudFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFkb25seVwiPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7cGhvdG9zLm1hcCgocGhvdG8pPT4oPGltZyBrZXk9e3Bob3RvfSBzcmM9e3Bob3RvfS8+KSl9XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjfTx0aW1lPntjcmVhdGVkQXR9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25QaG90byh1cmwsIGluZGV4KXtcbiAgICAgICAgdmFyIHtjb250ZW50fT10aGlzLnByb3BzXG4gICAgICAgIGlmKGNvbnRlbnQucGhvdG9zLmluZGV4T2YodXJsKSE9LTEpe1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5zcGxpY2UoaW5kZXgsMSx1cmwpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5wdXNoKHVybClcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19