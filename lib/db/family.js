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
        key: 'upgrade',
        value: function upgrade(members) {
            return members.map(function (a) {
                if (a.goal) {
                    var todoWeek = a.todoWeek,
                        goal = a.goal,
                        score = a.score,
                        todos = a.todos,
                        totalScore = a.totalScore,
                        todo = a.todo;

                    var now = new Date().toDate(),
                        week = now.getWeek();
                    todoWeek = now.relativeDate(-1 * ((week - todoWeek) * 7 + now.getDay())).getTime();
                    a.targets = { baby: { goal: goal, score: score, todos: todos, totalScore: totalScore, todoWeek: todoWeek, todo: todo } };
                    "goal,score,todos,totalScore,todoWeek,todo".split(",").forEach(function (b) {
                        return a[b] = undefined;
                    });
                }
                return a;
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk1vZGVsIiwiRU5USVRJRVMiLCJFdmVudEVtaXR0ZXIiLCJldmVudCIsIkZhbWlseSIsIm5hbWUiLCJzdXBlciIsIl9zY2hlbWEiLCJjaGlsZHJlbiIsImlkQXR0cmlidXRlIiwicmVsYXRpdmVzIiwic2NoZW1hQXR0cmlidXRlIiwicmVsYXRpb25zaGlwIiwiaWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1lbWJlcnMiLCJtYXAiLCJhIiwiZ29hbCIsInRvZG9XZWVrIiwic2NvcmUiLCJ0b2RvcyIsInRvdGFsU2NvcmUiLCJ0b2RvIiwibm93IiwiRGF0ZSIsInRvRGF0ZSIsIndlZWsiLCJnZXRXZWVrIiwicmVsYXRpdmVEYXRlIiwiZ2V0RGF5IiwiZ2V0VGltZSIsInRhcmdldHMiLCJiYWJ5Iiwic3BsaXQiLCJmb3JFYWNoIiwiYiIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQTs7Ozs7Ozs7ZUFKc0JBLFFBQVEsVUFBUixDO0lBQWpCQyxLLFlBQUFBLEs7SUFBT0MsUSxZQUFBQSxRO2dCQUNPRixRQUFRLFFBQVIsQztJQUFkRyxZLGFBQUFBLFk7SUFDREMsSyxHQUFNLElBQUlELFlBQUosRTs7SUFJV0UsTTs7Ozs7Ozs7Ozs7NkJBS0xDLEksRUFBSztBQUNiLGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNOLGlCQUFLQyxPQUFMLEdBQWEsd0JBQVE7QUFDbkJDLDBCQUFVLHNCQUFXLFVBQVgsRUFBc0IsRUFBQ0MsYUFBWSxLQUFiLEVBQXRCLENBRFM7QUFFbEJDLDJCQUFXLHNCQUFXLFdBQVgsRUFBdUIsRUFBQ0QsYUFBWSxLQUFiLEVBQXZCO0FBRk8sYUFBUixFQUlYO0FBQ0FFLGlDQUFpQjtBQUFBLHdCQUFFQyxZQUFGLFFBQUVBLFlBQUY7QUFBQSwyQkFBbUJBLGVBQWUsV0FBZixHQUE2QixVQUFoRDtBQUFBO0FBRGpCLGFBSlcsQ0FBYjtBQVFHOzs7K0JBRWFDLEUsRUFBR0QsWSxFQUFhO0FBQzFCLG1CQUFPRSxRQUFRQyxPQUFSLENBQWdCRixFQUFoQixDQUFQO0FBQ0g7OztnQ0FFY0csTyxFQUFRO0FBQ25CLG1CQUFPQSxRQUFRQyxHQUFSLENBQVksYUFBRztBQUNsQixvQkFBR0MsRUFBRUMsSUFBTCxFQUFVO0FBQUEsd0JBQ0RDLFFBREMsR0FDMENGLENBRDFDLENBQ0RFLFFBREM7QUFBQSx3QkFDUUQsSUFEUixHQUMwQ0QsQ0FEMUMsQ0FDUUMsSUFEUjtBQUFBLHdCQUNhRSxLQURiLEdBQzBDSCxDQUQxQyxDQUNhRyxLQURiO0FBQUEsd0JBQ21CQyxLQURuQixHQUMwQ0osQ0FEMUMsQ0FDbUJJLEtBRG5CO0FBQUEsd0JBQ3lCQyxVQUR6QixHQUMwQ0wsQ0FEMUMsQ0FDeUJLLFVBRHpCO0FBQUEsd0JBQ29DQyxJQURwQyxHQUMwQ04sQ0FEMUMsQ0FDb0NNLElBRHBDOztBQUVOLHdCQUFJQyxNQUFJLElBQUlDLElBQUosR0FBV0MsTUFBWCxFQUFSO0FBQUEsd0JBQTZCQyxPQUFLSCxJQUFJSSxPQUFKLEVBQWxDO0FBQ0FULCtCQUFTSyxJQUFJSyxZQUFKLENBQWlCLENBQUMsQ0FBRCxJQUFJLENBQUNGLE9BQUtSLFFBQU4sSUFBZ0IsQ0FBaEIsR0FBa0JLLElBQUlNLE1BQUosRUFBdEIsQ0FBakIsRUFBc0RDLE9BQXRELEVBQVQ7QUFDQWQsc0JBQUVlLE9BQUYsR0FBVSxFQUFDQyxNQUFLLEVBQUNmLFVBQUQsRUFBTUUsWUFBTixFQUFZQyxZQUFaLEVBQWtCQyxzQkFBbEIsRUFBNkJILGtCQUE3QixFQUFzQ0ksVUFBdEMsRUFBTixFQUFWO0FBQ0EsZ0VBQTRDVyxLQUE1QyxDQUFrRCxHQUFsRCxFQUF1REMsT0FBdkQsQ0FBK0Q7QUFBQSwrQkFBR2xCLEVBQUVtQixDQUFGLElBQUtDLFNBQVI7QUFBQSxxQkFBL0Q7QUFDSDtBQUNELHVCQUFPcEIsQ0FBUDtBQUNILGFBVE0sQ0FBUDtBQVVIOzs7NEJBL0JpQjtBQUNkLG1CQUFPLFFBQVA7QUFDSDs7OztFQUgrQmxCLEs7O2tCQUFmSSxNIiwiZmlsZSI6ImZhbWlseS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7TW9kZWwsIEVOVElUSUVTfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtFdmVudEVtaXR0ZXJ9PXJlcXVpcmUoJ2V2ZW50cycpLFxuICAgIGV2ZW50PW5ldyBFdmVudEVtaXR0ZXIoKVxuXG5pbXBvcnQge3VuaW9uT2YsIFNjaGVtYX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhbWlseSBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmYW1pbHknXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQobmFtZSl7XG4gICAgICAgIHRoaXMuc3VwZXIoJ2luaXQnKSgpXG5cdFx0dGhpcy5fc2NoZW1hPXVuaW9uT2Yoe1xuXHRcdFx0XHRjaGlsZHJlbjogbmV3IFNjaGVtYShcImNoaWxkcmVuXCIse2lkQXR0cmlidXRlOlwiX2lkXCJ9KVxuXHRcdFx0XHQscmVsYXRpdmVzOiBuZXcgU2NoZW1hKFwicmVsYXRpdmVzXCIse2lkQXR0cmlidXRlOlwiX2lkXCJ9KVxuXHRcdFx0fVxuXHRcdFx0LHtcblx0XHRcdFx0c2NoZW1hQXR0cmlidXRlOiAoe3JlbGF0aW9uc2hpcH0pPT4ocmVsYXRpb25zaGlwID8gXCJyZWxhdGl2ZXNcIiA6IFwiY2hpbGRyZW5cIilcblx0XHRcdH1cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGludml0ZShpZCxyZWxhdGlvbnNoaXApe1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkKVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGdyYWRlKG1lbWJlcnMpe1xuICAgICAgICByZXR1cm4gbWVtYmVycy5tYXAoYT0+e1xuICAgICAgICAgICAgaWYoYS5nb2FsKXtcbiAgICAgICAgICAgICAgICBsZXQge3RvZG9XZWVrLGdvYWwsc2NvcmUsdG9kb3MsdG90YWxTY29yZSx0b2RvfT1hXG4gICAgICAgICAgICAgICAgbGV0IG5vdz1uZXcgRGF0ZSgpLnRvRGF0ZSgpLCB3ZWVrPW5vdy5nZXRXZWVrKClcbiAgICAgICAgICAgICAgICB0b2RvV2Vlaz1ub3cucmVsYXRpdmVEYXRlKC0xKigod2Vlay10b2RvV2VlaykqNytub3cuZ2V0RGF5KCkpKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICBhLnRhcmdldHM9e2JhYnk6e2dvYWwsc2NvcmUsdG9kb3MsdG90YWxTY29yZSx0b2RvV2Vlayx0b2RvfX1cbiAgICAgICAgICAgICAgICBcImdvYWwsc2NvcmUsdG9kb3MsdG90YWxTY29yZSx0b2RvV2Vlayx0b2RvXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goYj0+YVtiXT11bmRlZmluZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==