'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty;
var CommandBar = _qiliApp.UI.CommandBar;

var NewKnowledge = function (_Component) {
    (0, _inherits3.default)(NewKnowledge, _Component);

    function NewKnowledge(props) {
        (0, _classCallCheck3.default)(this, NewKnowledge);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NewKnowledge.__proto__ || (0, _getPrototypeOf2.default)(NewKnowledge)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(NewKnowledge, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onSelect('New Version');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.docx && this.docx.revoke();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var entity = this.state.entity;var content;var primary;var commands;
            if (!entity) {
                content = _react2.default.createElement(Empty, { icon: _react2.default.createElement(_noteAdd2.default, { onClick: function onClick() {
                            return _this2.onSelect('New Version');
                        } }),
                    text: '\u9009\u62E9docx\u6587\u6848\u6587\u4EF6' });
            } else {
                content = _react2.default.createElement(
                    'div',
                    { className: 'knowledge' },
                    _knowledge4.default.renderContent(entity)
                );
                commands = ["Save", { action: "New Version", icon: _react2.default.createElement(_borderColor2.default, null) }];
                primary = "Save";
            }

            return _react2.default.createElement(
                'div',
                { className: 'post' },
                content,
                commands && _react2.default.createElement(CommandBar, {
                    className: 'footbar',
                    primary: primary,
                    onSelect: this.onSelect.bind(this),
                    items: commands })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this3 = this;

            switch (command) {
                case 'New Version':
                    _knowledge4.default.selectDocx().then(function (docx) {
                        _this3.docx && _this3.docx.revoke();
                        delete _this3.docx;

                        _this3.docx = docx;
                        var knowledge = docx.knowledge;

                        _this3.setState({ entity: knowledge });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    entity.content = "";
                    _knowledge2.default.upsert(entity).then(function (a) {
                        _this3.docx.upload(entity).then(function (content) {
                            entity.photos = _this3.docx.getPhotos();
                            entity.content = content;
                            _knowledge2.default.upsert(_this3.state.entity).then(function (a) {
                                return _this3.context.router.replace('knowledge/' + _this3.state.entity._id);
                            });
                        }, function (a) {
                            delete _this3.state.entity._id;
                            _knowledge2.default.remove(_this3.state.entity);
                        });
                    });
                    break;
            }
        }
    }]);
    return NewKnowledge;
}(_react.Component);

NewKnowledge.contextTypes = { router: _react.PropTypes.object };
exports.default = NewKnowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJDb21tYW5kQmFyIiwiTmV3S25vd2xlZGdlIiwicHJvcHMiLCJzdGF0ZSIsIm9uU2VsZWN0IiwiZG9jeCIsInJldm9rZSIsImVudGl0eSIsImNvbnRlbnQiLCJyZW5kZXJDb250ZW50IiwiY29tbWFuZHMiLCJhY3Rpb24iLCJpY29uIiwicHJpbWFyeSIsImJpbmQiLCJjb21tYW5kIiwic2VsZWN0RG9jeCIsInRoZW4iLCJrbm93bGVkZ2UiLCJzZXRTdGF0ZSIsInVwc2VydCIsInVwbG9hZCIsInBob3RvcyIsImdldFBob3RvcyIsImNvbnRleHQiLCJyb3V0ZXIiLCJyZXBsYWNlIiwiX2lkIiwicmVtb3ZlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU9BLEssZUFBQUEsSztJQUFPQyxVLGVBQUFBLFU7O0lBRU9DLFk7OztBQUNqQiwwQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLHNKQUNSQSxLQURROztBQUVkLGNBQUtDLEtBQUwsR0FBVyxFQUFYO0FBRmM7QUFHakI7Ozs7NENBRWtCO0FBQ2YsaUJBQUtDLFFBQUwsQ0FBYyxhQUFkO0FBQ0g7OzsrQ0FFcUI7QUFDbEIsaUJBQUtDLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBYjtBQUNIOzs7aUNBRU87QUFBQTs7QUFDQSxnQkFBQ0MsTUFBRCxHQUFTLEtBQUtKLEtBQWQsQ0FBQ0ksTUFBRCxDQUFxQixZQUFTLFlBQVM7QUFDM0MsZ0JBQUcsQ0FBQ0EsTUFBSixFQUFXO0FBQ1BDLDBCQUFTLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG1EQUFZLFNBQVM7QUFBQSxtQ0FBSSxPQUFLSixRQUFMLENBQWMsYUFBZCxDQUFKO0FBQUEseUJBQXJCLEdBQWI7QUFDakIsMEJBQUssMENBRFksR0FBVDtBQUVILGFBSEQsTUFHSztBQUNESSwwQkFBUztBQUFBO0FBQUEsc0JBQUssV0FBVSxXQUFmO0FBQTRCLHdDQUFZQyxhQUFaLENBQTBCRixNQUExQjtBQUE1QixpQkFBVDtBQUNBRywyQkFBUyxDQUFDLE1BQUQsRUFDTCxFQUFDQyxRQUFPLGFBQVIsRUFBc0JDLE1BQUssMERBQTNCLEVBREssQ0FBVDtBQUVBQywwQkFBUSxNQUFSO0FBQ0g7O0FBRUQsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUNLTCx1QkFETDtBQUVLRSw0QkFBYSw4QkFBQyxVQUFEO0FBQ1YsK0JBQVUsU0FEQTtBQUVWLDZCQUFTRyxPQUZDO0FBR1YsOEJBQVUsS0FBS1QsUUFBTCxDQUFjVSxJQUFkLENBQW1CLElBQW5CLENBSEE7QUFJViwyQkFBT0osUUFKRztBQUZsQixhQURKO0FBVUg7OztpQ0FHUUssTyxFQUFRO0FBQUE7O0FBQ2Isb0JBQU9BLE9BQVA7QUFDQSxxQkFBSyxhQUFMO0FBQ0ksd0NBQVlDLFVBQVosR0FDS0MsSUFETCxDQUNVLGdCQUFNO0FBQ1IsK0JBQUtaLElBQUwsSUFBYSxPQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBYjtBQUNBLCtCQUFPLE9BQUtELElBQVo7O0FBRUEsK0JBQUtBLElBQUwsR0FBVUEsSUFBVjtBQUpRLDRCQUtIYSxTQUxHLEdBS1FiLElBTFIsQ0FLSGEsU0FMRzs7QUFNUiwrQkFBS0MsUUFBTCxDQUFjLEVBQUNaLFFBQU9XLFNBQVIsRUFBZDtBQUNILHFCQVJMO0FBU0E7QUFDSixxQkFBSyxNQUFMO0FBQUEsd0JBQ1NYLE1BRFQsR0FDaUIsS0FBS0osS0FEdEIsQ0FDU0ksTUFEVDs7QUFFSUEsMkJBQU9DLE9BQVAsR0FBZSxFQUFmO0FBQ0Esd0NBQVlZLE1BQVosQ0FBbUJiLE1BQW5CLEVBQTJCVSxJQUEzQixDQUFnQyxhQUFHO0FBQy9CLCtCQUFLWixJQUFMLENBQVVnQixNQUFWLENBQWlCZCxNQUFqQixFQUF5QlUsSUFBekIsQ0FBOEIsbUJBQVM7QUFDbkNWLG1DQUFPZSxNQUFQLEdBQWMsT0FBS2pCLElBQUwsQ0FBVWtCLFNBQVYsRUFBZDtBQUNBaEIsbUNBQU9DLE9BQVAsR0FBZUEsT0FBZjtBQUNBLGdEQUFZWSxNQUFaLENBQW1CLE9BQUtqQixLQUFMLENBQVdJLE1BQTlCLEVBQ0tVLElBREwsQ0FDVTtBQUFBLHVDQUFHLE9BQUtPLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsT0FBcEIsZ0JBQXlDLE9BQUt2QixLQUFMLENBQVdJLE1BQVgsQ0FBa0JvQixHQUEzRCxDQUFIO0FBQUEsNkJBRFY7QUFFSCx5QkFMRCxFQUtHLGFBQUc7QUFDRixtQ0FBTyxPQUFLeEIsS0FBTCxDQUFXSSxNQUFYLENBQWtCb0IsR0FBekI7QUFDQSxnREFBWUMsTUFBWixDQUFtQixPQUFLekIsS0FBTCxDQUFXSSxNQUE5QjtBQUNILHlCQVJEO0FBU0gscUJBVkQ7QUFXQTtBQTFCSjtBQTRCSDs7Ozs7QUFwRWdCTixZLENBc0ViNEIsWSxHQUFhLEVBQUNKLFFBQU8saUJBQVVLLE1BQWxCLEU7a0JBdEVBN0IsWSIsImZpbGUiOiJuZXdLbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCBJbnNlcnRGaWxlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGQnXHJcbmltcG9ydCBJY29uQ3JlYXRlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiXHJcblxyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXHJcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcclxuaW1wb3J0IGV4dHJhY3RvciBmcm9tICcuL3BhcnNlci9leHRyYWN0b3InXHJcblxyXG5jb25zdCB7RW1wdHksIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdCgnTmV3IFZlcnNpb24nKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLCBjb250ZW50LCBwcmltYXJ5LCBjb21tYW5kcztcclxuICAgICAgICBpZighZW50aXR5KXtcclxuICAgICAgICAgICAgY29udGVudD0oPEVtcHR5IGljb249ezxJbnNlcnRGaWxlIG9uQ2xpY2s9eygpPT50aGlzLm9uU2VsZWN0KCdOZXcgVmVyc2lvbicpfS8+fVxyXG5cdFx0XHRcdHRleHQ9XCLpgInmi6lkb2N45paH5qGI5paH5Lu2XCIvPilcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29udGVudD0oPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj57dWlLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfTwvZGl2PilcclxuICAgICAgICAgICAgY29tbWFuZHM9W1wiU2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAge2FjdGlvbjpcIk5ldyBWZXJzaW9uXCIsaWNvbjo8SWNvbkNyZWF0ZS8+fV1cclxuICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgICAgIHtjb21tYW5kcyAmJiAoPENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtwcmltYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+KX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblNlbGVjdChjb21tYW5kKXtcclxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XHJcbiAgICAgICAgY2FzZSAnTmV3IFZlcnNpb24nOlxyXG4gICAgICAgICAgICB1aUtub3dsZWRnZS5zZWxlY3REb2N4KClcclxuICAgICAgICAgICAgICAgIC50aGVuKGRvY3g9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5Omtub3dsZWRnZX0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxyXG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxyXG4gICAgICAgICAgICBlbnRpdHkuY29udGVudD1cIlwiXHJcbiAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydChlbnRpdHkpLnRoZW4oYT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oY29udGVudD0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBrbm93bGVkZ2UvJHt0aGlzLnN0YXRlLmVudGl0eS5faWR9YCkpXHJcbiAgICAgICAgICAgICAgICB9LCBhPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGUuZW50aXR5Ll9pZDtcclxuICAgICAgICAgICAgICAgICAgICBkYktub3dsZWRnZS5yZW1vdmUodGhpcy5zdGF0ZS5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcbn1cclxuIl19