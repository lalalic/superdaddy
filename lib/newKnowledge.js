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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NewKnowledge).call(this, props));

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
                    text: '选择docx文案文件' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVPO0lBQU87O0lBRU87OztBQUNqQixhQURpQixZQUNqQixDQUFZLEtBQVosRUFBa0I7NENBREQsY0FDQzs7aUdBREQseUJBRVAsUUFEUTs7QUFFZCxjQUFLLEtBQUwsR0FBVyxFQUFYLENBRmM7O0tBQWxCOzsrQkFEaUI7OzRDQU1FO0FBQ2YsaUJBQUssUUFBTCxDQUFjLGFBQWQsRUFEZTs7OzsrQ0FJRztBQUNsQixpQkFBSyxJQUFMLElBQWEsS0FBSyxJQUFMLENBQVUsTUFBVixFQUFiLENBRGtCOzs7O2lDQUlkOzs7QUFDQSxnQkFBQyxTQUFRLEtBQUssS0FBTCxDQUFSLE1BQUQsQ0FEQSxJQUNxQixRQURyQixJQUM4QixRQUQ5QixJQUN1QyxTQUR2QztBQUVKLGdCQUFHLENBQUMsTUFBRCxFQUFRO0FBQ1AsMEJBQVMsOEJBQUMsS0FBRCxJQUFPLE1BQU0sbURBQVksU0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxhQUFkO3lCQUFKLEVBQXJCLENBQU47QUFDeEIsMEJBQUssWUFBTCxFQURpQixDQUFULENBRE87YUFBWCxNQUdLO0FBQ0QsMEJBQVM7O3NCQUFLLFdBQVUsV0FBVixFQUFMO29CQUE0QixvQkFBWSxhQUFaLENBQTBCLE1BQTFCLENBQTVCO2lCQUFULENBREM7QUFFRCwyQkFBUyxDQUFDLE1BQUQsRUFDTCxFQUFDLFFBQU8sYUFBUCxFQUFxQixNQUFLLDBEQUFMLEVBRGpCLENBQVQsQ0FGQztBQUlELDBCQUFRLE1BQVIsQ0FKQzthQUhMOztBQVVBLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDSyxPQURMO2dCQUVLLFlBQWEsOEJBQUMsVUFBRDtBQUNWLCtCQUFVLFNBQVY7QUFDQSw2QkFBUyxPQUFUO0FBQ0EsOEJBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ0EsMkJBQU8sUUFBUCxFQUpVLENBQWI7YUFIVCxDQVpJOzs7O2lDQXlCQyxTQUFROzs7QUFDYixvQkFBTyxPQUFQO0FBQ0EscUJBQUssYUFBTDtBQUNJLHdDQUFZLFVBQVosR0FDSyxJQURMLENBQ1UsZ0JBQU07QUFDUiwrQkFBSyxJQUFMLElBQWEsT0FBSyxJQUFMLENBQVUsTUFBVixFQUFiLENBRFE7QUFFUiwrQkFBTyxPQUFLLElBQUwsQ0FGQzs7QUFJUiwrQkFBSyxJQUFMLEdBQVUsSUFBVixDQUpROzRCQUtILFlBQVcsS0FBWCxVQUxHOztBQU1SLCtCQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sU0FBUCxFQUFmLEVBTlE7cUJBQU4sQ0FEVixDQURKO0FBVUksMEJBVko7QUFEQSxxQkFZSyxNQUFMO3dCQUNTLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEVDs7QUFFSSwyQkFBTyxPQUFQLEdBQWUsRUFBZixDQUZKO0FBR0ksd0NBQVksTUFBWixDQUFtQixNQUFuQixFQUEyQixJQUEzQixDQUFnQyxhQUFHO0FBQy9CLCtCQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLElBQXpCLENBQThCLG1CQUFTO0FBQ25DLG1DQUFPLE1BQVAsR0FBYyxPQUFLLElBQUwsQ0FBVSxTQUFWLEVBQWQsQ0FEbUM7QUFFbkMsbUNBQU8sT0FBUCxHQUFlLE9BQWYsQ0FGbUM7QUFHbkMsZ0RBQVksTUFBWixDQUFtQixPQUFLLEtBQUwsQ0FBVyxNQUFYLENBQW5CLENBQ0ssSUFETCxDQUNVO3VDQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsZ0JBQXlDLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEI7NkJBQTVDLENBRFYsQ0FIbUM7eUJBQVQsRUFLM0IsYUFBRztBQUNGLG1DQUFPLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FETDtBQUVGLGdEQUFZLE1BQVosQ0FBbUIsT0FBSyxLQUFMLENBQVcsTUFBWCxDQUFuQixDQUZFO3lCQUFILENBTEgsQ0FEK0I7cUJBQUgsQ0FBaEMsQ0FISjtBQWNJLDBCQWRKO0FBWkEsYUFEYTs7O1dBdkNBOzs7YUFzRWIsZUFBYSxFQUFDLFFBQU8saUJBQVUsTUFBVjtrQkF0RVIiLCJmaWxlIjoibmV3S25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgSW5zZXJ0RmlsZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkJ1xyXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxyXG5cclxuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xyXG5pbXBvcnQgdWlLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcbmltcG9ydCBleHRyYWN0b3IgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xyXG5cclxuY29uc3Qge0VtcHR5LCBDb21tYW5kQmFyfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3S25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGU9e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIHRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJylcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwgY29udGVudCwgcHJpbWFyeSwgY29tbWFuZHM7XHJcbiAgICAgICAgaWYoIWVudGl0eSl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8SW5zZXJ0RmlsZSBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdCgnTmV3IFZlcnNpb24nKX0vPn1cclxuXHRcdFx0XHR0ZXh0PVwi6YCJ5oupZG9jeOaWh+ahiOaWh+S7tlwiLz4pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+e3VpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX08L2Rpdj4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcIlNhdmVcIixcclxuICAgICAgICAgICAgICAgIHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246PEljb25DcmVhdGUvPn1dXHJcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxyXG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICB7Y29tbWFuZHMgJiYgKDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XHJcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xyXG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcclxuICAgICAgICAgICAgdWlLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkb2N4PT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcclxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTprbm93bGVkZ2V9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdTYXZlJzpcclxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcclxuICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9XCJcIlxyXG4gICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQoZW50aXR5KS50aGVuKGE9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKGNvbnRlbnQ9PntcclxuICAgICAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShga25vd2xlZGdlLyR7dGhpcy5zdGF0ZS5lbnRpdHkuX2lkfWApKVxyXG4gICAgICAgICAgICAgICAgfSwgYT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLmVudGl0eS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==