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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7ZUFKc0IsUUFBUSxVQUFSO0lBQWpCO0lBQU87Z0JBQ08sUUFBUSxRQUFSO0lBQWQ7SUFDRCxRQUFNLElBQUksWUFBSjs7SUFJVzs7Ozs7Ozs7Ozs2QkFLTCxNQUFLO0FBQ2IsaUJBQUssS0FBTCxDQUFXLE1BQVgsSUFEYTtBQUVuQixpQkFBSyxPQUFMLEdBQWEsd0JBQVE7QUFDbkIsMEJBQVUsc0JBQVcsVUFBWCxFQUFzQixFQUFDLGFBQVksS0FBWixFQUF2QixDQUFWO0FBQ0MsMkJBQVcsc0JBQVcsV0FBWCxFQUF1QixFQUFDLGFBQVksS0FBWixFQUF4QixDQUFYO2FBRlUsRUFJWDtBQUNBLGlDQUFpQjt3QkFBRTsyQkFBaUIsZUFBZSxXQUFmLEdBQTZCLFVBQTdCO2lCQUFuQjthQUxOLENBQWIsQ0FGbUI7Ozs7K0JBWUgsSUFBRyxjQUFhO0FBQzFCLG1CQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBUCxDQUQwQjs7Ozs0QkFoQlo7QUFDZCxtQkFBTyxRQUFQLENBRGM7Ozs7RUFEYzs7a0JBQWYiLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtNb2RlbCwgRU5USVRJRVN9PXJlcXVpcmUoJ3FpbGktYXBwJyksXG4gICAge0V2ZW50RW1pdHRlcn09cmVxdWlyZSgnZXZlbnRzJyksXG4gICAgZXZlbnQ9bmV3IEV2ZW50RW1pdHRlcigpXG5cbmltcG9ydCB7dW5pb25PZiwgU2NoZW1hfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFtaWx5IGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ2ZhbWlseSdcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdChuYW1lKXtcbiAgICAgICAgdGhpcy5zdXBlcignaW5pdCcpKClcblx0XHR0aGlzLl9zY2hlbWE9dW5pb25PZih7XG5cdFx0XHRcdGNoaWxkcmVuOiBuZXcgU2NoZW1hKFwiY2hpbGRyZW5cIix7aWRBdHRyaWJ1dGU6XCJfaWRcIn0pXG5cdFx0XHRcdCxyZWxhdGl2ZXM6IG5ldyBTY2hlbWEoXCJyZWxhdGl2ZXNcIix7aWRBdHRyaWJ1dGU6XCJfaWRcIn0pXG5cdFx0XHR9XG5cdFx0XHQse1xuXHRcdFx0XHRzY2hlbWFBdHRyaWJ1dGU6ICh7cmVsYXRpb25zaGlwfSk9PihyZWxhdGlvbnNoaXAgPyBcInJlbGF0aXZlc1wiIDogXCJjaGlsZHJlblwiKVxuXHRcdFx0fVxuXHRcdClcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGludml0ZShpZCxyZWxhdGlvbnNoaXApe1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkKVxuICAgIH1cbn1cbiJdfQ==