'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewKnowledge).call(this, props));

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
                content = _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_noteAdd2.default, { onClick: function onClick() {
                            return _this2.onSelect('New Version');
                        } }), text: 'Select word docx file to create' });
                commands = ["Back"];
            } else {
                content = _qiliApp.React.createElement(
                    'div',
                    { className: 'knowledge' },
                    _knowledge4.default.renderContent(entity)
                );
                commands = ["Back", "Save", { action: "New Version", icon: require("material-ui/svg-icons/editor/border-color") }];
                primary = "Save";
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                content,
                _qiliApp.React.createElement(CommandBar, {
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
                    _knowledge2.default.upsert(entity, null, function () {
                        _this3.docx.upload(entity).then(function (content) {
                            entity.photos = _this3.docx.getPhotos();
                            entity.content = content;
                            _knowledge2.default.upsert(_this3.state.entity, null, function () {
                                return _this3.context.router.replaceWith("knowledge", _this3.state.entity);
                            });
                        }, function () {
                            delete _this3.state.entity._id;
                            _knowledge2.default.remove(_this3.state.entity);
                        });
                    });
                    break;
            }
        }
    }]);

    return NewKnowledge;
}(_qiliApp.Component);

exports.default = NewKnowledge;


NewKnowledge.contextTypes = { router: _qiliApp.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRUs7SUFBTzs7SUFFUzs7O0FBQ2pCLGFBRGlCLFlBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxjQUNDOzsyRUFERCx5QkFFUCxRQURROztBQUVkLGNBQUssS0FBTCxHQUFXLEVBQVgsQ0FGYzs7S0FBbEI7O2lCQURpQjs7NENBTUU7QUFDZixpQkFBSyxRQUFMLENBQWMsYUFBZCxFQURlOzs7OytDQUlHO0FBQ2xCLGlCQUFLLElBQUwsSUFBYSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWIsQ0FEa0I7Ozs7aUNBSWQ7OztBQUNBLGdCQUFDLFNBQVEsS0FBSyxLQUFMLENBQVIsTUFBRCxDQURBLElBQ3FCLFFBRHJCLElBQzhCLFFBRDlCLElBQ3VDLFNBRHZDO0FBRUosZ0JBQUcsQ0FBQyxNQUFELEVBQVE7QUFDUCwwQkFBUyw2QkFBQyxLQUFELElBQU8sTUFBTSxrREFBWSxTQUFTO21DQUFJLE9BQUssUUFBTCxDQUFjLGFBQWQ7eUJBQUosRUFBckIsQ0FBTixFQUFnRSxNQUFLLGlDQUFMLEVBQXZFLENBQVQsQ0FETztBQUVQLDJCQUFTLENBQUMsTUFBRCxDQUFULENBRk87YUFBWCxNQUdLO0FBQ0QsMEJBQVM7O3NCQUFLLFdBQVUsV0FBVixFQUFMO29CQUE0QixvQkFBWSxhQUFaLENBQTBCLE1BQTFCLENBQTVCO2lCQUFULENBREM7QUFFRCwyQkFBUyxDQUFDLE1BQUQsRUFBUSxNQUFSLEVBQ0wsRUFBQyxRQUFPLGFBQVAsRUFBcUIsTUFBSyxRQUFRLDJDQUFSLENBQUwsRUFEakIsQ0FBVCxDQUZDO0FBSUQsMEJBQVEsTUFBUixDQUpDO2FBSEw7O0FBVUEsbUJBQ0k7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNLLE9BREw7Z0JBRUksNkJBQUMsVUFBRDtBQUNJLCtCQUFVLFNBQVY7QUFDQSw2QkFBUyxPQUFUO0FBQ0EsOEJBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ0EsMkJBQU8sUUFBUCxFQUpKLENBRko7YUFESixDQVpJOzs7O2lDQXlCQyxTQUFROzs7QUFDYixvQkFBTyxPQUFQO0FBQ0EscUJBQUssYUFBTDtBQUNJLHdDQUFZLFVBQVosR0FDSyxJQURMLENBQ1UsVUFBQyxJQUFELEVBQVE7QUFDViwrQkFBSyxJQUFMLElBQWEsT0FBSyxJQUFMLENBQVUsTUFBVixFQUFiLENBRFU7QUFFViwrQkFBTyxPQUFLLElBQUwsQ0FGRzs7QUFJViwrQkFBSyxJQUFMLEdBQVUsSUFBVixDQUpVOzRCQUtMLFlBQVcsS0FBWCxVQUxLOztBQU1WLCtCQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sU0FBUCxFQUFmLEVBTlU7cUJBQVIsQ0FEVixDQURKO0FBVUksMEJBVko7QUFEQSxxQkFZSyxNQUFMO3dCQUNTLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEVDs7QUFFSSwyQkFBTyxPQUFQLEdBQWUsRUFBZixDQUZKO0FBR0ksd0NBQVksTUFBWixDQUFtQixNQUFuQixFQUEwQixJQUExQixFQUErQixZQUFJO0FBQy9CLCtCQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLElBQXpCLENBQThCLFVBQUMsT0FBRCxFQUFXO0FBQ3JDLG1DQUFPLE1BQVAsR0FBYyxPQUFLLElBQUwsQ0FBVSxTQUFWLEVBQWQsQ0FEcUM7QUFFckMsbUNBQU8sT0FBUCxHQUFlLE9BQWYsQ0FGcUM7QUFHckMsZ0RBQVksTUFBWixDQUFtQixPQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQWtCLElBQXJDLEVBQ1E7dUNBQUksT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixXQUFwQixDQUFnQyxXQUFoQyxFQUE0QyxPQUFLLEtBQUwsQ0FBVyxNQUFYOzZCQUFoRCxDQURSLENBSHFDO3lCQUFYLEVBSzNCLFlBQUk7QUFDSCxtQ0FBTyxPQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLENBREo7QUFFSCxnREFBWSxNQUFaLENBQW1CLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBbkIsQ0FGRzt5QkFBSixDQUxILENBRCtCO3FCQUFKLENBQS9CLENBSEo7QUFjSSwwQkFkSjtBQVpBLGFBRGE7Ozs7V0F2Q0E7Ozs7OztBQXVFckIsYUFBYSxZQUFiLEdBQTBCLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBbEMiLCJmaWxlIjoibmV3S25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xyXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXHJcbmltcG9ydCB1aUtub3dsZWRnZSBmcm9tICcuL2tub3dsZWRnZSdcclxuaW1wb3J0IGV4dHJhY3RvciBmcm9tICcuL3BhcnNlci9leHRyYWN0b3InXHJcbmltcG9ydCBJbnNlcnRGaWxlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vbm90ZS1hZGQnXHJcblxyXG52YXIge0VtcHR5LCBDb21tYW5kQmFyfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3S25vd2xlZGdlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGU9e31cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIHRoaXMub25TZWxlY3QoJ05ldyBWZXJzaW9uJylcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSwgY29udGVudCwgcHJpbWFyeSwgY29tbWFuZHM7XHJcbiAgICAgICAgaWYoIWVudGl0eSl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8SW5zZXJ0RmlsZSBvbkNsaWNrPXsoKT0+dGhpcy5vblNlbGVjdCgnTmV3IFZlcnNpb24nKX0vPn0gdGV4dD1cIlNlbGVjdCB3b3JkIGRvY3ggZmlsZSB0byBjcmVhdGVcIi8+KVxyXG4gICAgICAgICAgICBjb21tYW5kcz1bXCJCYWNrXCJdXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+e3VpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX08L2Rpdj4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcIkJhY2tcIixcIlNhdmVcIixcclxuICAgICAgICAgICAgICAgIHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCIpfV1cclxuICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xyXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcclxuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XHJcbiAgICAgICAgICAgIHVpS25vd2xlZGdlLnNlbGVjdERvY3goKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRvY3gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcclxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTprbm93bGVkZ2V9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdTYXZlJzpcclxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcclxuICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9XCJcIlxyXG4gICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQoZW50aXR5LG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSxudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZVdpdGgoXCJrbm93bGVkZ2VcIix0aGlzLnN0YXRlLmVudGl0eSkpXHJcbiAgICAgICAgICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YXRlLmVudGl0eS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbk5ld0tub3dsZWRnZS5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxyXG4iXX0=