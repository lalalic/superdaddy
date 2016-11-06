'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var CommandBar = _qiliApp.UI.CommandBar;

var NewKnowledge = function (_Component) {
    _inherits(NewKnowledge, _Component);

    function NewKnowledge(props) {
        _classCallCheck(this, NewKnowledge);

        var _this = _possibleConstructorReturn(this, (NewKnowledge.__proto__ || Object.getPrototypeOf(NewKnowledge)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(NewKnowledge, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJDb21tYW5kQmFyIiwiTmV3S25vd2xlZGdlIiwicHJvcHMiLCJzdGF0ZSIsIm9uU2VsZWN0IiwiZG9jeCIsInJldm9rZSIsImVudGl0eSIsImNvbnRlbnQiLCJyZW5kZXJDb250ZW50IiwiY29tbWFuZHMiLCJhY3Rpb24iLCJpY29uIiwicHJpbWFyeSIsImJpbmQiLCJjb21tYW5kIiwic2VsZWN0RG9jeCIsInRoZW4iLCJrbm93bGVkZ2UiLCJzZXRTdGF0ZSIsInVwc2VydCIsInVwbG9hZCIsInBob3RvcyIsImdldFBob3RvcyIsImNvbnRleHQiLCJyb3V0ZXIiLCJyZXBsYWNlIiwiX2lkIiwicmVtb3ZlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU9BLEssZUFBQUEsSztJQUFPQyxVLGVBQUFBLFU7O0lBRU9DLFk7OztBQUNqQiwwQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLGdJQUNSQSxLQURROztBQUVkLGNBQUtDLEtBQUwsR0FBVyxFQUFYO0FBRmM7QUFHakI7Ozs7NENBRWtCO0FBQ2YsaUJBQUtDLFFBQUwsQ0FBYyxhQUFkO0FBQ0g7OzsrQ0FFcUI7QUFDbEIsaUJBQUtDLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBYjtBQUNIOzs7aUNBRU87QUFBQTs7QUFDQSxnQkFBQ0MsTUFBRCxHQUFTLEtBQUtKLEtBQWQsQ0FBQ0ksTUFBRCxDQUFxQixZQUFTLFlBQVM7QUFDM0MsZ0JBQUcsQ0FBQ0EsTUFBSixFQUFXO0FBQ1BDLDBCQUFTLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG1EQUFZLFNBQVM7QUFBQSxtQ0FBSSxPQUFLSixRQUFMLENBQWMsYUFBZCxDQUFKO0FBQUEseUJBQXJCLEdBQWI7QUFDakIsMEJBQUssMENBRFksR0FBVDtBQUVILGFBSEQsTUFHSztBQUNESSwwQkFBUztBQUFBO0FBQUEsc0JBQUssV0FBVSxXQUFmO0FBQTRCLHdDQUFZQyxhQUFaLENBQTBCRixNQUExQjtBQUE1QixpQkFBVDtBQUNBRywyQkFBUyxDQUFDLE1BQUQsRUFDTCxFQUFDQyxRQUFPLGFBQVIsRUFBc0JDLE1BQUssMERBQTNCLEVBREssQ0FBVDtBQUVBQywwQkFBUSxNQUFSO0FBQ0g7O0FBRUQsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUNLTCx1QkFETDtBQUVLRSw0QkFBYSw4QkFBQyxVQUFEO0FBQ1YsK0JBQVUsU0FEQTtBQUVWLDZCQUFTRyxPQUZDO0FBR1YsOEJBQVUsS0FBS1QsUUFBTCxDQUFjVSxJQUFkLENBQW1CLElBQW5CLENBSEE7QUFJViwyQkFBT0osUUFKRztBQUZsQixhQURKO0FBVUg7OztpQ0FHUUssTyxFQUFRO0FBQUE7O0FBQ2Isb0JBQU9BLE9BQVA7QUFDQSxxQkFBSyxhQUFMO0FBQ0ksd0NBQVlDLFVBQVosR0FDS0MsSUFETCxDQUNVLGdCQUFNO0FBQ1IsK0JBQUtaLElBQUwsSUFBYSxPQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBYjtBQUNBLCtCQUFPLE9BQUtELElBQVo7O0FBRUEsK0JBQUtBLElBQUwsR0FBVUEsSUFBVjtBQUpRLDRCQUtIYSxTQUxHLEdBS1FiLElBTFIsQ0FLSGEsU0FMRzs7QUFNUiwrQkFBS0MsUUFBTCxDQUFjLEVBQUNaLFFBQU9XLFNBQVIsRUFBZDtBQUNILHFCQVJMO0FBU0E7QUFDSixxQkFBSyxNQUFMO0FBQUEsd0JBQ1NYLE1BRFQsR0FDaUIsS0FBS0osS0FEdEIsQ0FDU0ksTUFEVDs7QUFFSUEsMkJBQU9DLE9BQVAsR0FBZSxFQUFmO0FBQ0Esd0NBQVlZLE1BQVosQ0FBbUJiLE1BQW5CLEVBQTJCVSxJQUEzQixDQUFnQyxhQUFHO0FBQy9CLCtCQUFLWixJQUFMLENBQVVnQixNQUFWLENBQWlCZCxNQUFqQixFQUF5QlUsSUFBekIsQ0FBOEIsbUJBQVM7QUFDbkNWLG1DQUFPZSxNQUFQLEdBQWMsT0FBS2pCLElBQUwsQ0FBVWtCLFNBQVYsRUFBZDtBQUNBaEIsbUNBQU9DLE9BQVAsR0FBZUEsT0FBZjtBQUNBLGdEQUFZWSxNQUFaLENBQW1CLE9BQUtqQixLQUFMLENBQVdJLE1BQTlCLEVBQ0tVLElBREwsQ0FDVTtBQUFBLHVDQUFHLE9BQUtPLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsT0FBcEIsZ0JBQXlDLE9BQUt2QixLQUFMLENBQVdJLE1BQVgsQ0FBa0JvQixHQUEzRCxDQUFIO0FBQUEsNkJBRFY7QUFFSCx5QkFMRCxFQUtHLGFBQUc7QUFDRixtQ0FBTyxPQUFLeEIsS0FBTCxDQUFXSSxNQUFYLENBQWtCb0IsR0FBekI7QUFDQSxnREFBWUMsTUFBWixDQUFtQixPQUFLekIsS0FBTCxDQUFXSSxNQUE5QjtBQUNILHlCQVJEO0FBU0gscUJBVkQ7QUFXQTtBQTFCSjtBQTRCSDs7Ozs7O0FBcEVnQk4sWSxDQXNFYjRCLFksR0FBYSxFQUFDSixRQUFPLGlCQUFVSyxNQUFsQixFO2tCQXRFQTdCLFkiLCJmaWxlIjoibmV3S25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgSW5zZXJ0RmlsZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkJ1xyXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxyXG5cclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xyXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcbmltcG9ydCBleHRyYWN0b3IgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xyXG5cclxuY29uc3Qge0VtcHR5LCBDb21tYW5kQmFyfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3S25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGU9e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIHRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJylcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwgY29udGVudCwgcHJpbWFyeSwgY29tbWFuZHM7XHJcbiAgICAgICAgaWYoIWVudGl0eSl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8SW5zZXJ0RmlsZSBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdCgnTmV3IFZlcnNpb24nKX0vPn1cclxuXHRcdFx0XHR0ZXh0PVwi6YCJ5oupZG9jeOaWh+ahiOaWh+S7tlwiLz4pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+e3VpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX08L2Rpdj4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcIlNhdmVcIixcclxuICAgICAgICAgICAgICAgIHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246PEljb25DcmVhdGUvPn1dXHJcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICB7Y29tbWFuZHMgJiYgKDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XHJcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xyXG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcclxuICAgICAgICAgICAgdWlLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcclxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTprbm93bGVkZ2V9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdTYXZlJzpcclxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcclxuICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9XCJcIlxyXG4gICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQoZW50aXR5KS50aGVuKGE9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKGNvbnRlbnQ9PntcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShga25vd2xlZGdlLyR7dGhpcy5zdGF0ZS5lbnRpdHkuX2lkfWApKVxyXG4gICAgICAgICAgICAgICAgfSwgYT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLmVudGl0eS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==