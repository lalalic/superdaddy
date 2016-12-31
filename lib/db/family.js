'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _normalizr = require('normalizr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('qili-app'),
    Model = _require.Model,
    ENTITIES = _require.ENTITIES,
    _require2 = require('events'),
    EventEmitter = _require2.EventEmitter,
    event = new EventEmitter();

var Family = function (_Model) {
    (0, _inherits3.default)(Family, _Model);

    function Family() {
        (0, _classCallCheck3.default)(this, Family);
        return (0, _possibleConstructorReturn3.default)(this, (Family.__proto__ || (0, _getPrototypeOf2.default)(Family)).apply(this, arguments));
    }

    (0, _createClass3.default)(Family, null, [{
        key: 'init',
        value: function init(name) {
            this.super('init')();
            this._schema = (0, _normalizr.unionOf)({
                children: new _normalizr.Schema("children", { idAttribute: "_id" }),
                relatives: new _normalizr.Schema("relatives", { idAttribute: "_id" })
            }, {
                schemaAttribute: function schemaAttribute(_ref) {
                    var relationship = _ref.relationship;
                    return relationship ? "relatives" : "children";
                }
            });
        }
    }, {
        key: 'invite',
        value: function invite(id, relationship) {
            return _promise2.default.resolve(id);
        }
    }, {
        key: '_name',
        get: function get() {
            return 'family';
        }
    }]);
    return Family;
}(Model);

exports.default = Family;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk1vZGVsIiwiRU5USVRJRVMiLCJFdmVudEVtaXR0ZXIiLCJldmVudCIsIkZhbWlseSIsIm5hbWUiLCJzdXBlciIsIl9zY2hlbWEiLCJjaGlsZHJlbiIsImlkQXR0cmlidXRlIiwicmVsYXRpdmVzIiwic2NoZW1hQXR0cmlidXRlIiwicmVsYXRpb25zaGlwIiwiaWQiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztlQUpzQkEsUUFBUSxVQUFSLEM7SUFBakJDLEssWUFBQUEsSztJQUFPQyxRLFlBQUFBLFE7Z0JBQ09GLFFBQVEsUUFBUixDO0lBQWRHLFksYUFBQUEsWTtJQUNEQyxLLEdBQU0sSUFBSUQsWUFBSixFOztJQUlXRSxNOzs7Ozs7Ozs7OzZCQUtMQyxJLEVBQUs7QUFDYixpQkFBS0MsS0FBTCxDQUFXLE1BQVg7QUFDTixpQkFBS0MsT0FBTCxHQUFhLHdCQUFRO0FBQ25CQywwQkFBVSxzQkFBVyxVQUFYLEVBQXNCLEVBQUNDLGFBQVksS0FBYixFQUF0QixDQURTO0FBRWxCQywyQkFBVyxzQkFBVyxXQUFYLEVBQXVCLEVBQUNELGFBQVksS0FBYixFQUF2QjtBQUZPLGFBQVIsRUFJWDtBQUNBRSxpQ0FBaUI7QUFBQSx3QkFBRUMsWUFBRixRQUFFQSxZQUFGO0FBQUEsMkJBQW1CQSxlQUFlLFdBQWYsR0FBNkIsVUFBaEQ7QUFBQTtBQURqQixhQUpXLENBQWI7QUFRRzs7OytCQUVhQyxFLEVBQUdELFksRUFBYTtBQUMxQixtQkFBTyxrQkFBUUUsT0FBUixDQUFnQkQsRUFBaEIsQ0FBUDtBQUNIOzs7NEJBbEJpQjtBQUNkLG1CQUFPLFFBQVA7QUFDSDs7O0VBSCtCYixLOztrQkFBZkksTSIsImZpbGUiOiJmYW1pbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge01vZGVsLCBFTlRJVElFU309cmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICB7RXZlbnRFbWl0dGVyfT1yZXF1aXJlKCdldmVudHMnKSxcbiAgICBldmVudD1uZXcgRXZlbnRFbWl0dGVyKClcblxuaW1wb3J0IHt1bmlvbk9mLCBTY2hlbWF9IGZyb20gXCJub3JtYWxpenJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYW1pbHkgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnZmFtaWx5J1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG5hbWUpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuXHRcdHRoaXMuX3NjaGVtYT11bmlvbk9mKHtcblx0XHRcdFx0Y2hpbGRyZW46IG5ldyBTY2hlbWEoXCJjaGlsZHJlblwiLHtpZEF0dHJpYnV0ZTpcIl9pZFwifSlcblx0XHRcdFx0LHJlbGF0aXZlczogbmV3IFNjaGVtYShcInJlbGF0aXZlc1wiLHtpZEF0dHJpYnV0ZTpcIl9pZFwifSlcblx0XHRcdH1cblx0XHRcdCx7XG5cdFx0XHRcdHNjaGVtYUF0dHJpYnV0ZTogKHtyZWxhdGlvbnNoaXB9KT0+KHJlbGF0aW9uc2hpcCA/IFwicmVsYXRpdmVzXCIgOiBcImNoaWxkcmVuXCIpXG5cdFx0XHR9XG5cdFx0KVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgaW52aXRlKGlkLHJlbGF0aW9uc2hpcCl7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaWQpXG4gICAgfVxufVxuIl19