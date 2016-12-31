'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _normalizr = require('normalizr');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app'),
    Model = _require.Model,
    ENTITIES = _require.ENTITIES,
    _require2 = require('events'),
    EventEmitter = _require2.EventEmitter,
    event = new EventEmitter();

var Family = function (_Model) {
    _inherits(Family, _Model);

    function Family() {
        _classCallCheck(this, Family);

        return _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).apply(this, arguments));
    }

    _createClass(Family, null, [{
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
            return Promise.resolve(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk1vZGVsIiwiRU5USVRJRVMiLCJFdmVudEVtaXR0ZXIiLCJldmVudCIsIkZhbWlseSIsIm5hbWUiLCJzdXBlciIsIl9zY2hlbWEiLCJjaGlsZHJlbiIsImlkQXR0cmlidXRlIiwicmVsYXRpdmVzIiwic2NoZW1hQXR0cmlidXRlIiwicmVsYXRpb25zaGlwIiwiaWQiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQTs7Ozs7Ozs7ZUFKc0JBLFFBQVEsVUFBUixDO0lBQWpCQyxLLFlBQUFBLEs7SUFBT0MsUSxZQUFBQSxRO2dCQUNPRixRQUFRLFFBQVIsQztJQUFkRyxZLGFBQUFBLFk7SUFDREMsSyxHQUFNLElBQUlELFlBQUosRTs7SUFJV0UsTTs7Ozs7Ozs7Ozs7NkJBS0xDLEksRUFBSztBQUNiLGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNOLGlCQUFLQyxPQUFMLEdBQWEsd0JBQVE7QUFDbkJDLDBCQUFVLHNCQUFXLFVBQVgsRUFBc0IsRUFBQ0MsYUFBWSxLQUFiLEVBQXRCLENBRFM7QUFFbEJDLDJCQUFXLHNCQUFXLFdBQVgsRUFBdUIsRUFBQ0QsYUFBWSxLQUFiLEVBQXZCO0FBRk8sYUFBUixFQUlYO0FBQ0FFLGlDQUFpQjtBQUFBLHdCQUFFQyxZQUFGLFFBQUVBLFlBQUY7QUFBQSwyQkFBbUJBLGVBQWUsV0FBZixHQUE2QixVQUFoRDtBQUFBO0FBRGpCLGFBSlcsQ0FBYjtBQVFHOzs7K0JBRWFDLEUsRUFBR0QsWSxFQUFhO0FBQzFCLG1CQUFPRSxRQUFRQyxPQUFSLENBQWdCRixFQUFoQixDQUFQO0FBQ0g7Ozs0QkFsQmlCO0FBQ2QsbUJBQU8sUUFBUDtBQUNIOzs7O0VBSCtCYixLOztrQkFBZkksTSIsImZpbGUiOiJmYW1pbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge01vZGVsLCBFTlRJVElFU309cmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICB7RXZlbnRFbWl0dGVyfT1yZXF1aXJlKCdldmVudHMnKSxcbiAgICBldmVudD1uZXcgRXZlbnRFbWl0dGVyKClcblxuaW1wb3J0IHt1bmlvbk9mLCBTY2hlbWF9IGZyb20gXCJub3JtYWxpenJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYW1pbHkgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnZmFtaWx5J1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG5hbWUpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuXHRcdHRoaXMuX3NjaGVtYT11bmlvbk9mKHtcblx0XHRcdFx0Y2hpbGRyZW46IG5ldyBTY2hlbWEoXCJjaGlsZHJlblwiLHtpZEF0dHJpYnV0ZTpcIl9pZFwifSlcblx0XHRcdFx0LHJlbGF0aXZlczogbmV3IFNjaGVtYShcInJlbGF0aXZlc1wiLHtpZEF0dHJpYnV0ZTpcIl9pZFwifSlcblx0XHRcdH1cblx0XHRcdCx7XG5cdFx0XHRcdHNjaGVtYUF0dHJpYnV0ZTogKHtyZWxhdGlvbnNoaXB9KT0+KHJlbGF0aW9uc2hpcCA/IFwicmVsYXRpdmVzXCIgOiBcImNoaWxkcmVuXCIpXG5cdFx0XHR9XG5cdFx0KVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgaW52aXRlKGlkLHJlbGF0aW9uc2hpcCl7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaWQpXG4gICAgfVxufVxuIl19