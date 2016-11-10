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

var Empty = _qiliApp.UI.Empty,
    CommandBar = _qiliApp.UI.CommandBar;

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

            var entity = this.state.entity,
                content,
                primary,
                commands;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJDb21tYW5kQmFyIiwiTmV3S25vd2xlZGdlIiwicHJvcHMiLCJzdGF0ZSIsIm9uU2VsZWN0IiwiZG9jeCIsInJldm9rZSIsImVudGl0eSIsImNvbnRlbnQiLCJwcmltYXJ5IiwiY29tbWFuZHMiLCJyZW5kZXJDb250ZW50IiwiYWN0aW9uIiwiaWNvbiIsImJpbmQiLCJjb21tYW5kIiwic2VsZWN0RG9jeCIsInRoZW4iLCJrbm93bGVkZ2UiLCJzZXRTdGF0ZSIsInVwc2VydCIsInVwbG9hZCIsInBob3RvcyIsImdldFBob3RvcyIsImNvbnRleHQiLCJyb3V0ZXIiLCJyZXBsYWNlIiwiX2lkIiwicmVtb3ZlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU9BLEssZUFBQUEsSztJQUFPQyxVLGVBQUFBLFU7O0lBRU9DLFk7OztBQUNqQiwwQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLHNKQUNSQSxLQURROztBQUVkLGNBQUtDLEtBQUwsR0FBVyxFQUFYO0FBRmM7QUFHakI7Ozs7NENBRWtCO0FBQ2YsaUJBQUtDLFFBQUwsQ0FBYyxhQUFkO0FBQ0g7OzsrQ0FFcUI7QUFDbEIsaUJBQUtDLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBYjtBQUNIOzs7aUNBRU87QUFBQTs7QUFDQSxnQkFBQ0MsTUFBRCxHQUFTLEtBQUtKLEtBQWQsQ0FBQ0ksTUFBRDtBQUFBLGdCQUFxQkMsT0FBckI7QUFBQSxnQkFBOEJDLE9BQTlCO0FBQUEsZ0JBQXVDQyxRQUF2QztBQUNKLGdCQUFHLENBQUNILE1BQUosRUFBVztBQUNQQywwQkFBUyw4QkFBQyxLQUFELElBQU8sTUFBTSxtREFBWSxTQUFTO0FBQUEsbUNBQUksT0FBS0osUUFBTCxDQUFjLGFBQWQsQ0FBSjtBQUFBLHlCQUFyQixHQUFiO0FBQ2pCLDBCQUFLLDBDQURZLEdBQVQ7QUFFSCxhQUhELE1BR0s7QUFDREksMEJBQVM7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUE0Qix3Q0FBWUcsYUFBWixDQUEwQkosTUFBMUI7QUFBNUIsaUJBQVQ7QUFDQUcsMkJBQVMsQ0FBQyxNQUFELEVBQ0wsRUFBQ0UsUUFBTyxhQUFSLEVBQXNCQyxNQUFLLDBEQUEzQixFQURLLENBQVQ7QUFFQUosMEJBQVEsTUFBUjtBQUNIOztBQUVELG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLE1BQWY7QUFDS0QsdUJBREw7QUFFS0UsNEJBQWEsOEJBQUMsVUFBRDtBQUNWLCtCQUFVLFNBREE7QUFFViw2QkFBU0QsT0FGQztBQUdWLDhCQUFVLEtBQUtMLFFBQUwsQ0FBY1UsSUFBZCxDQUFtQixJQUFuQixDQUhBO0FBSVYsMkJBQU9KLFFBSkc7QUFGbEIsYUFESjtBQVVIOzs7aUNBR1FLLE8sRUFBUTtBQUFBOztBQUNiLG9CQUFPQSxPQUFQO0FBQ0EscUJBQUssYUFBTDtBQUNJLHdDQUFZQyxVQUFaLEdBQ0tDLElBREwsQ0FDVSxnQkFBTTtBQUNSLCtCQUFLWixJQUFMLElBQWEsT0FBS0EsSUFBTCxDQUFVQyxNQUFWLEVBQWI7QUFDQSwrQkFBTyxPQUFLRCxJQUFaOztBQUVBLCtCQUFLQSxJQUFMLEdBQVVBLElBQVY7QUFKUSw0QkFLSGEsU0FMRyxHQUtRYixJQUxSLENBS0hhLFNBTEc7O0FBTVIsK0JBQUtDLFFBQUwsQ0FBYyxFQUFDWixRQUFPVyxTQUFSLEVBQWQ7QUFDSCxxQkFSTDtBQVNBO0FBQ0oscUJBQUssTUFBTDtBQUFBLHdCQUNTWCxNQURULEdBQ2lCLEtBQUtKLEtBRHRCLENBQ1NJLE1BRFQ7O0FBRUlBLDJCQUFPQyxPQUFQLEdBQWUsRUFBZjtBQUNBLHdDQUFZWSxNQUFaLENBQW1CYixNQUFuQixFQUEyQlUsSUFBM0IsQ0FBZ0MsYUFBRztBQUMvQiwrQkFBS1osSUFBTCxDQUFVZ0IsTUFBVixDQUFpQmQsTUFBakIsRUFBeUJVLElBQXpCLENBQThCLG1CQUFTO0FBQ25DVixtQ0FBT2UsTUFBUCxHQUFjLE9BQUtqQixJQUFMLENBQVVrQixTQUFWLEVBQWQ7QUFDQWhCLG1DQUFPQyxPQUFQLEdBQWVBLE9BQWY7QUFDQSxnREFBWVksTUFBWixDQUFtQixPQUFLakIsS0FBTCxDQUFXSSxNQUE5QixFQUNLVSxJQURMLENBQ1U7QUFBQSx1Q0FBRyxPQUFLTyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLE9BQXBCLGdCQUF5QyxPQUFLdkIsS0FBTCxDQUFXSSxNQUFYLENBQWtCb0IsR0FBM0QsQ0FBSDtBQUFBLDZCQURWO0FBRUgseUJBTEQsRUFLRyxhQUFHO0FBQ0YsbUNBQU8sT0FBS3hCLEtBQUwsQ0FBV0ksTUFBWCxDQUFrQm9CLEdBQXpCO0FBQ0EsZ0RBQVlDLE1BQVosQ0FBbUIsT0FBS3pCLEtBQUwsQ0FBV0ksTUFBOUI7QUFDSCx5QkFSRDtBQVNILHFCQVZEO0FBV0E7QUExQko7QUE0Qkg7Ozs7O0FBcEVnQk4sWSxDQXNFYjRCLFksR0FBYSxFQUFDSixRQUFPLGlCQUFVSyxNQUFsQixFO2tCQXRFQTdCLFkiLCJmaWxlIjoibmV3S25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgSW5zZXJ0RmlsZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkJ1xyXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxyXG5cclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xyXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcbmltcG9ydCBleHRyYWN0b3IgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xyXG5cclxuY29uc3Qge0VtcHR5LCBDb21tYW5kQmFyfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3S25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGU9e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIHRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJylcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwgY29udGVudCwgcHJpbWFyeSwgY29tbWFuZHM7XHJcbiAgICAgICAgaWYoIWVudGl0eSl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8SW5zZXJ0RmlsZSBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdCgnTmV3IFZlcnNpb24nKX0vPn1cclxuXHRcdFx0XHR0ZXh0PVwi6YCJ5oupZG9jeOaWh+ahiOaWh+S7tlwiLz4pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+e3VpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX08L2Rpdj4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcIlNhdmVcIixcclxuICAgICAgICAgICAgICAgIHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246PEljb25DcmVhdGUvPn1dXHJcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICB7Y29tbWFuZHMgJiYgKDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XHJcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xyXG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcclxuICAgICAgICAgICAgdWlLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcclxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTprbm93bGVkZ2V9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdTYXZlJzpcclxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcclxuICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9XCJcIlxyXG4gICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQoZW50aXR5KS50aGVuKGE9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKGNvbnRlbnQ9PntcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShga25vd2xlZGdlLyR7dGhpcy5zdGF0ZS5lbnRpdHkuX2lkfWApKVxyXG4gICAgICAgICAgICAgICAgfSwgYT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLmVudGl0eS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==