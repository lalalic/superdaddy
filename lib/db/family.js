'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var Model = _require.Model;

var _require2 = require('events');

var EventEmitter = _require2.EventEmitter;
var event = new EventEmitter();
var all = [];
var children = [];
var currentChild = null;
var lastChild = null;
var Family = function (_Model) {
    _inherits(Family, _Model);

    function Family() {
        _classCallCheck(this, Family);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Family).apply(this, arguments));
    }

    _createClass(Family, null, [{
        key: 'init',
        value: function init(name) {
            var _this2 = this;

            this.super('init')();
            return new Promise(function (resolve, reject) {
                _this2.find().fetch(function (data) {
                    all = data || [];
                    children = [];
                    all.forEach(function (a) {
                        return !a.relationShip && children.push(a);
                    });
                    resolve(Family.currentChild = name ? children.find(function (a) {
                        return a.name == name;
                    }) : children[0]);
                }, reject);
            });
        }
    }, {
        key: 'upsert',
        value: function upsert(a, base, success, error) {
            return this.super('upsert').apply(undefined, arguments).then(function (r) {
                if (all.filter(function (b) {
                    return b._id == a._id;
                }).length == 0) {
                    all.push(r);
                    if (!r.relationShip) children.push(r);
                }
            });
        }
    }, {
        key: 'remove',
        value: function remove(child, success, error) {
            return this.super('remove').apply(undefined, arguments).then(function (a) {
                children = children.filter(function (a) {
                    return a._id != child;
                });
                all = all.filter(function (a) {
                    return a._id != child;
                });
                if (currentChild._id == child) Family.currentChild = children[0];
            });
        }
    }, {
        key: 'restoreLast',
        value: function restoreLast() {
            this.currentChild = lastChild;
        }
    }, {
        key: 'invite',
        value: function invite(id, relationship) {
            return Promise.resolve(id);
        }
    }, {
        key: 'relationship',
        value: function relationship() {
            var current = User.current,
                relative = all.filter(function (a) {
                return a._id == current._id;
            })[0];
            return relative ? relative.relationship : null;
        }
    }, {
        key: '_name',
        get: function get() {
            return 'family';
        }
    }, {
        key: 'all',
        get: function get() {
            return all;
        }
    }, {
        key: 'event',
        get: function get() {
            return event;
        }
    }, {
        key: 'currentChild',
        get: function get() {
            return currentChild;
        },
        set: function set(a) {
            if (typeof a == 'string') a = children.find(function (b) {
                return b.name == a;
            });

            a = a || null;

            if (a != currentChild) {
                lastChild = currentChild;
                currentChild = a;
                event.emit("change", currentChild, lastChild);
            }
        }
    }, {
        key: 'children',
        get: function get() {
            return children;
        }
    }]);

    return Family;
}(Model);

exports.default = Family;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7ZUFBWSxRQUFRLFVBQVI7O0FBQVIsSUFBQyxzQkFBRDs7Z0JBQ2UsUUFBUSxRQUFSOztBQUFmLElBQUMscUNBQUQ7QUFDQSxZQUFNLElBQUksWUFBSixFQUFOO0FBQ0EsVUFBSSxFQUFKO0FBQ0EsZUFBUyxFQUFUO0FBQ0EsbUJBQWEsSUFBYjtBQUNBLGdCQUFVLElBQVY7SUFDaUI7Ozs7Ozs7Ozs7OzZCQUtMLE1BQUs7OztBQUNiLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLElBRGE7QUFFYixtQkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW1CO0FBQ2xDLHVCQUFLLElBQUwsR0FBWSxLQUFaLENBQWtCLFVBQUMsSUFBRCxFQUFRO0FBQ3RCLDBCQUFJLFFBQU0sRUFBTixDQURrQjtBQUV0QiwrQkFBUyxFQUFULENBRnNCO0FBR3RCLHdCQUFJLE9BQUosQ0FBWSxVQUFDLENBQUQ7K0JBQU0sQ0FBQyxFQUFFLFlBQUYsSUFBa0IsU0FBUyxJQUFULENBQWMsQ0FBZCxDQUFuQjtxQkFBTixDQUFaLENBSHNCO0FBSXRCLDRCQUFRLE9BQU8sWUFBUCxHQUFvQixPQUFPLFNBQVMsSUFBVCxDQUFjOytCQUFHLEVBQUUsSUFBRixJQUFRLElBQVI7cUJBQUgsQ0FBckIsR0FBd0MsU0FBUyxDQUFULENBQXhDLENBQTVCLENBSnNCO2lCQUFSLEVBS2hCLE1BTEYsRUFEa0M7YUFBbkIsQ0FBbkIsQ0FGYTs7OzsrQkFZSCxHQUFHLE1BQU0sU0FBUyxPQUFNO0FBQ2xDLG1CQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsbUJBQXdCLFNBQXhCLEVBQW1DLElBQW5DLENBQXdDLGFBQUc7QUFDdEQsb0JBQUcsSUFBSSxNQUFKLENBQVc7MkJBQUcsRUFBRSxHQUFGLElBQU8sRUFBRSxHQUFGO2lCQUFWLENBQVgsQ0FBNEIsTUFBNUIsSUFBb0MsQ0FBcEMsRUFBc0M7QUFDekIsd0JBQUksSUFBSixDQUFTLENBQVQsRUFEeUI7QUFFeEMsd0JBQUcsQ0FBQyxFQUFFLFlBQUYsRUFDSCxTQUFTLElBQVQsQ0FBYyxDQUFkLEVBREQ7aUJBRkQ7YUFEbUQsQ0FBL0MsQ0FEa0M7Ozs7K0JBVXhCLE9BQU0sU0FBUyxPQUFNO0FBQy9CLG1CQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsbUJBQXdCLFNBQXhCLEVBQ1gsSUFEVyxDQUNOLGFBQUc7QUFDSSwyQkFBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxDQUFEOzJCQUFLLEVBQUUsR0FBRixJQUFPLEtBQVA7aUJBQUwsQ0FBekIsQ0FESjtBQUVJLHNCQUFJLElBQUksTUFBSixDQUFXLFVBQUMsQ0FBRDsyQkFBSyxFQUFFLEdBQUYsSUFBTyxLQUFQO2lCQUFMLENBQWYsQ0FGSjtBQUdJLG9CQUFHLGFBQWEsR0FBYixJQUFrQixLQUFsQixFQUNDLE9BQU8sWUFBUCxHQUFvQixTQUFTLENBQVQsQ0FBcEIsQ0FESjthQUhQLENBREQsQ0FEK0I7Ozs7c0NBbUNmO0FBQ2hCLGlCQUFLLFlBQUwsR0FBa0IsU0FBbEIsQ0FEZ0I7Ozs7K0JBUU4sSUFBRyxjQUFhO0FBQzFCLG1CQUFPLFFBQVEsT0FBUixDQUFnQixFQUFoQixDQUFQLENBRDBCOzs7O3VDQUlUO0FBQ2pCLGdCQUFJLFVBQVEsS0FBSyxPQUFMO2dCQUNQLFdBQVMsSUFBSSxNQUFKLENBQVc7dUJBQUcsRUFBRSxHQUFGLElBQU8sUUFBUSxHQUFSO2FBQVYsQ0FBWCxDQUFrQyxDQUFsQyxDQUFULENBRlk7QUFHakIsbUJBQU8sV0FBVyxTQUFTLFlBQVQsR0FBd0IsSUFBbkMsQ0FIVTs7Ozs0QkF6RUg7QUFDZCxtQkFBTyxRQUFQLENBRGM7Ozs7NEJBb0NGO0FBQ1osbUJBQU8sR0FBUCxDQURZOzs7OzRCQUlFO0FBQ2QsbUJBQU8sS0FBUCxDQURjOzs7OzRCQUlPO0FBQ3JCLG1CQUFPLFlBQVAsQ0FEcUI7OzBCQUlELEdBQUU7QUFDNUIsZ0JBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxFQUNGLElBQUUsU0FBUyxJQUFULENBQWM7dUJBQUcsRUFBRSxJQUFGLElBQVEsQ0FBUjthQUFILENBQWhCLENBREQ7O0FBR0EsZ0JBQUcsS0FBSyxJQUFMLENBSnlCOztBQU10QixnQkFBRyxLQUFHLFlBQUgsRUFBZ0I7QUFDeEIsNEJBQVUsWUFBVixDQUR3QjtBQUV4QiwrQkFBYSxDQUFiLENBRndCO0FBR3hCLHNCQUFNLElBQU4sQ0FBVyxRQUFYLEVBQW9CLFlBQXBCLEVBQWtDLFNBQWxDLEVBSHdCO2FBQW5COzs7OzRCQVdpQjtBQUNqQixtQkFBTyxRQUFQLENBRGlCOzs7O1dBbEVKO0VBQWU7O2tCQUFmIiwiZmlsZSI6ImZhbWlseS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7TW9kZWx9PXJlcXVpcmUoJ3FpbGktYXBwJyksXG4gICAge0V2ZW50RW1pdHRlcn09cmVxdWlyZSgnZXZlbnRzJyksXG4gICAgZXZlbnQ9bmV3IEV2ZW50RW1pdHRlcigpLFxuICAgIGFsbD1bXSxcbiAgICBjaGlsZHJlbj1bXSxcbiAgICBjdXJyZW50Q2hpbGQ9bnVsbCxcbiAgICBsYXN0Q2hpbGQ9bnVsbDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhbWlseSBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmYW1pbHknXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQobmFtZSl7XG4gICAgICAgIHRoaXMuc3VwZXIoJ2luaXQnKSgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5maW5kKCkuZmV0Y2goKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgYWxsPWRhdGF8fFtdXG4gICAgICAgICAgICAgICAgY2hpbGRyZW49W11cbiAgICAgICAgICAgICAgICBhbGwuZm9yRWFjaCgoYSk9PighYS5yZWxhdGlvblNoaXAgJiYgY2hpbGRyZW4ucHVzaChhKSkpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShGYW1pbHkuY3VycmVudENoaWxkPW5hbWUgPyBjaGlsZHJlbi5maW5kKGE9PmEubmFtZT09bmFtZSkgOiBjaGlsZHJlblswXSlcbiAgICAgICAgICAgIH0scmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoYSwgYmFzZSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICByZXR1cm4gdGhpcy5zdXBlcigndXBzZXJ0JykoLi4uYXJndW1lbnRzKS50aGVuKHI9Pntcblx0XHRcdFx0aWYoYWxsLmZpbHRlcihiPT5iLl9pZD09YS5faWQpLmxlbmd0aD09MCl7XG4gICAgICAgICAgICAgICAgICAgIGFsbC5wdXNoKHIpXG5cdFx0XHRcdFx0aWYoIXIucmVsYXRpb25TaGlwKVxuXHRcdFx0XHRcdFx0Y2hpbGRyZW4ucHVzaChyKVxuICAgICAgICAgICAgICAgIH1cblx0XHRcdH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShjaGlsZCxzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCdyZW1vdmUnKSguLi5hcmd1bWVudHMpXG5cdFx0XHQudGhlbihhPT57XG4gICAgICAgICAgICAgICAgY2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKChhKT0+YS5faWQhPWNoaWxkKVxuICAgICAgICAgICAgICAgIGFsbD1hbGwuZmlsdGVyKChhKT0+YS5faWQhPWNoaWxkKVxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRDaGlsZC5faWQ9PWNoaWxkKVxuICAgICAgICAgICAgICAgICAgICBGYW1pbHkuY3VycmVudENoaWxkPWNoaWxkcmVuWzBdXG5cdFx0XHR9KVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgYWxsKCl7XG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGV2ZW50KCl7XG4gICAgICAgIHJldHVybiBldmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY3VycmVudENoaWxkKCl7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2hpbGRcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGN1cnJlbnRDaGlsZChhKXtcblx0XHRpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuXHRcdFx0YT1jaGlsZHJlbi5maW5kKGI9PmIubmFtZT09YSlcblx0XHRcblx0XHRhPSBhIHx8IG51bGxcblx0XHRcbiAgICAgICAgaWYoYSE9Y3VycmVudENoaWxkKXtcblx0XHRcdGxhc3RDaGlsZD1jdXJyZW50Q2hpbGRcblx0XHRcdGN1cnJlbnRDaGlsZD1hXG5cdFx0XHRldmVudC5lbWl0KFwiY2hhbmdlXCIsY3VycmVudENoaWxkLCBsYXN0Q2hpbGQpXG5cdFx0fVxuICAgIH1cblxuICAgIHN0YXRpYyByZXN0b3JlTGFzdCgpe1xuICAgICAgICB0aGlzLmN1cnJlbnRDaGlsZD1sYXN0Q2hpbGRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGNoaWxkcmVuKCl7XG4gICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgIH1cblxuICAgIHN0YXRpYyBpbnZpdGUoaWQscmVsYXRpb25zaGlwKXtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpZClcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVsYXRpb25zaGlwKCl7XG4gICAgICAgIGxldCBjdXJyZW50PVVzZXIuY3VycmVudFxuICAgICAgICAgICAgLHJlbGF0aXZlPWFsbC5maWx0ZXIoYT0+YS5faWQ9PWN1cnJlbnQuX2lkKVswXVxuICAgICAgICByZXR1cm4gcmVsYXRpdmUgPyByZWxhdGl2ZS5yZWxhdGlvbnNoaXAgOiBudWxsXG4gICAgfVxufVxuIl19