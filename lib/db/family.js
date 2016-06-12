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
var currentChild;
var lastChild;
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
            var _arguments = arguments;

            return this.super('upsert')(a, base, function (r) {
                if (all.filter(function (b) {
                    return b._id = a._id;
                }).length == 0) {
                    all.push(r);
                    children.push(r);
                    currentChild = r;
                    event.emit("change");
                }
                success && success.apply(undefined, _arguments);
            }, error);
        }
    }, {
        key: 'remove',
        value: function remove(child, success, error) {
            var _arguments2 = arguments;

            return this.super('remove')(child, function () {
                children = children.filter(function (a) {
                    return a._id != child;
                });
                all = all.filter(function (a) {
                    return a._id != child;
                });
                if (currentChild._id == child) {
                    currentChild = children[0];
                    event.emit("change");
                }
                success && success.apply(undefined, _arguments2);
            }, error);
        }
    }, {
        key: 'restoreLast',
        value: function restoreLast() {
            if (lastChild != null && lastChild._id && currentChild != lastChild) currentChild = lastChild;else currentChild = children[0];
            lastChild = null;
            event.emit("change");
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
            if (typeof a == 'string') a = children.filter(function (b) {
                return b._id == a;
            })[0];

            if (currentChild && currentChild._id) lastChild = currentChild;else lastChild = null;
            currentChild = a;
            event.emit("change");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mYW1pbHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7ZUFBWSxRQUFRLFVBQVI7O0FBQVIsSUFBQyxzQkFBRDs7Z0JBQ2UsUUFBUSxRQUFSOztBQUFmLElBQUMscUNBQUQ7QUFDQSxZQUFNLElBQUksWUFBSixFQUFOO0FBQ0EsVUFBSSxFQUFKO0FBQ0EsZUFBUyxFQUFUO0FBQ0E7QUFDQTtJQUNpQjs7Ozs7Ozs7Ozs7NkJBS0wsTUFBSzs7O0FBQ2IsaUJBQUssS0FBTCxDQUFXLE1BQVgsSUFEYTtBQUViLG1CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDbEMsdUJBQUssSUFBTCxHQUFZLEtBQVosQ0FBa0IsVUFBQyxJQUFELEVBQVE7QUFDdEIsMEJBQUksUUFBTSxFQUFOLENBRGtCO0FBRXRCLCtCQUFTLEVBQVQsQ0FGc0I7QUFHdEIsd0JBQUksT0FBSixDQUFZLFVBQUMsQ0FBRDsrQkFBTSxDQUFDLEVBQUUsWUFBRixJQUFrQixTQUFTLElBQVQsQ0FBYyxDQUFkLENBQW5CO3FCQUFOLENBQVosQ0FIc0I7QUFJdEIsNEJBQVEsT0FBTyxZQUFQLEdBQW9CLE9BQU8sU0FBUyxJQUFULENBQWM7K0JBQUcsRUFBRSxJQUFGLElBQVEsSUFBUjtxQkFBSCxDQUFyQixHQUF3QyxTQUFTLENBQVQsQ0FBeEMsQ0FBNUIsQ0FKc0I7aUJBQVIsRUFLaEIsTUFMRixFQURrQzthQUFuQixDQUFuQixDQUZhOzs7OytCQVlILEdBQUcsTUFBTSxTQUFTLE9BQU07OztBQUNsQyxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLENBQXJCLEVBQXVCLElBQXZCLEVBQTRCLFVBQUMsQ0FBRCxFQUFLO0FBQ2hDLG9CQUFHLElBQUksTUFBSixDQUFXOzJCQUFHLEVBQUUsR0FBRixHQUFNLEVBQUUsR0FBRjtpQkFBVCxDQUFYLENBQTJCLE1BQTNCLElBQW1DLENBQW5DLEVBQXFDO0FBQ3BDLHdCQUFJLElBQUosQ0FBUyxDQUFULEVBRG9DO0FBRXBDLDZCQUFTLElBQVQsQ0FBYyxDQUFkLEVBRm9DO0FBR3BDLG1DQUFhLENBQWIsQ0FIb0M7QUFJcEMsMEJBQU0sSUFBTixDQUFXLFFBQVgsRUFKb0M7aUJBQXhDO0FBTUEsMkJBQVcsb0NBQVgsQ0FQZ0M7YUFBTCxFQVE3QixLQVJDLENBQVAsQ0FEa0M7Ozs7K0JBWXhCLE9BQU0sU0FBUyxPQUFNOzs7QUFDL0IsbUJBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQixLQUFyQixFQUEyQixZQUFJO0FBQzlCLDJCQUFTLFNBQVMsTUFBVCxDQUFnQixVQUFDLENBQUQ7MkJBQUssRUFBRSxHQUFGLElBQU8sS0FBUDtpQkFBTCxDQUF6QixDQUQ4QjtBQUU5QixzQkFBSSxJQUFJLE1BQUosQ0FBVyxVQUFDLENBQUQ7MkJBQUssRUFBRSxHQUFGLElBQU8sS0FBUDtpQkFBTCxDQUFmLENBRjhCO0FBRzlCLG9CQUFHLGFBQWEsR0FBYixJQUFrQixLQUFsQixFQUF3QjtBQUN2QixtQ0FBYSxTQUFTLENBQVQsQ0FBYixDQUR1QjtBQUV2QiwwQkFBTSxJQUFOLENBQVcsUUFBWCxFQUZ1QjtpQkFBM0I7QUFJQSwyQkFBVyxxQ0FBWCxDQVA4QjthQUFKLEVBUTVCLEtBUkMsQ0FBUCxDQUQrQjs7OztzQ0FvQ2Y7QUFDaEIsZ0JBQUcsYUFBVyxJQUFYLElBQW1CLFVBQVUsR0FBVixJQUFpQixnQkFBYyxTQUFkLEVBQ25DLGVBQWEsU0FBYixDQURKLEtBR0ksZUFBYSxTQUFTLENBQVQsQ0FBYixDQUhKO0FBSUEsd0JBQVUsSUFBVixDQUxnQjtBQU1oQixrQkFBTSxJQUFOLENBQVcsUUFBWCxFQU5nQjs7OzsrQkFhTixJQUFHLGNBQWE7QUFDMUIsbUJBQU8sUUFBUSxPQUFSLENBQWdCLEVBQWhCLENBQVAsQ0FEMEI7Ozs7dUNBSVQ7QUFDakIsZ0JBQUksVUFBUSxLQUFLLE9BQUw7Z0JBQ1AsV0FBUyxJQUFJLE1BQUosQ0FBVzt1QkFBRyxFQUFFLEdBQUYsSUFBTyxRQUFRLEdBQVI7YUFBVixDQUFYLENBQWtDLENBQWxDLENBQVQsQ0FGWTtBQUdqQixtQkFBTyxXQUFXLFNBQVMsWUFBVCxHQUF3QixJQUFuQyxDQUhVOzs7OzRCQWpGSDtBQUNkLG1CQUFPLFFBQVAsQ0FEYzs7Ozs0QkF3Q0Y7QUFDWixtQkFBTyxHQUFQLENBRFk7Ozs7NEJBSUU7QUFDZCxtQkFBTyxLQUFQLENBRGM7Ozs7NEJBSU87QUFDckIsbUJBQU8sWUFBUCxDQURxQjs7MEJBSUQsR0FBRTtBQUM1QixnQkFBRyxPQUFPLENBQVAsSUFBVyxRQUFYLEVBQ0YsSUFBRSxTQUFTLE1BQVQsQ0FBZ0I7dUJBQUcsRUFBRSxHQUFGLElBQU8sQ0FBUDthQUFILENBQWhCLENBQTZCLENBQTdCLENBQUYsQ0FERDs7QUFHTSxnQkFBRyxnQkFBZ0IsYUFBYSxHQUFiLEVBQ2YsWUFBVSxZQUFWLENBREosS0FHSSxZQUFVLElBQVYsQ0FISjtBQUlBLDJCQUFhLENBQWIsQ0FSc0I7QUFTdEIsa0JBQU0sSUFBTixDQUFXLFFBQVgsRUFUc0I7Ozs7NEJBcUJMO0FBQ2pCLG1CQUFPLFFBQVAsQ0FEaUI7Ozs7V0ExRUo7RUFBZTs7a0JBQWYiLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtNb2RlbH09cmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICB7RXZlbnRFbWl0dGVyfT1yZXF1aXJlKCdldmVudHMnKSxcbiAgICBldmVudD1uZXcgRXZlbnRFbWl0dGVyKCksXG4gICAgYWxsPVtdLFxuICAgIGNoaWxkcmVuPVtdLFxuICAgIGN1cnJlbnRDaGlsZCxcbiAgICBsYXN0Q2hpbGQ7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYW1pbHkgZXh0ZW5kcyBNb2RlbHtcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnZmFtaWx5J1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG5hbWUpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuZmluZCgpLmZldGNoKChkYXRhKT0+e1xuICAgICAgICAgICAgICAgIGFsbD1kYXRhfHxbXVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPVtdXG4gICAgICAgICAgICAgICAgYWxsLmZvckVhY2goKGEpPT4oIWEucmVsYXRpb25TaGlwICYmIGNoaWxkcmVuLnB1c2goYSkpKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoRmFtaWx5LmN1cnJlbnRDaGlsZD1uYW1lID8gY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PW5hbWUpIDogY2hpbGRyZW5bMF0pXG4gICAgICAgICAgICB9LHJlamVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGEsIGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3Vwc2VydCcpKGEsYmFzZSwocik9PntcbiAgICAgICAgICAgICAgICBpZihhbGwuZmlsdGVyKGI9PmIuX2lkPWEuX2lkKS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICBhbGwucHVzaChyKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHIpXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1yXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmVtaXQoXCJjaGFuZ2VcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShjaGlsZCxzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCdyZW1vdmUnKShjaGlsZCwoKT0+e1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuPWNoaWxkcmVuLmZpbHRlcigoYSk9PmEuX2lkIT1jaGlsZClcbiAgICAgICAgICAgICAgICBhbGw9YWxsLmZpbHRlcigoYSk9PmEuX2lkIT1jaGlsZClcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50Q2hpbGQuX2lkPT1jaGlsZCl7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgICAgICBldmVudC5lbWl0KFwiY2hhbmdlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9LGVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgYWxsKCl7XG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGV2ZW50KCl7XG4gICAgICAgIHJldHVybiBldmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY3VycmVudENoaWxkKCl7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2hpbGRcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGN1cnJlbnRDaGlsZChhKXtcblx0XHRpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuXHRcdFx0YT1jaGlsZHJlbi5maWx0ZXIoYj0+Yi5faWQ9PWEpWzBdXG5cbiAgICAgICAgaWYoY3VycmVudENoaWxkICYmIGN1cnJlbnRDaGlsZC5faWQpXG4gICAgICAgICAgICBsYXN0Q2hpbGQ9Y3VycmVudENoaWxkXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGxhc3RDaGlsZD1udWxsXG4gICAgICAgIGN1cnJlbnRDaGlsZD1hXG4gICAgICAgIGV2ZW50LmVtaXQoXCJjaGFuZ2VcIilcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVzdG9yZUxhc3QoKXtcbiAgICAgICAgaWYobGFzdENoaWxkIT1udWxsICYmIGxhc3RDaGlsZC5faWQgJiYgY3VycmVudENoaWxkIT1sYXN0Q2hpbGQpXG4gICAgICAgICAgICBjdXJyZW50Q2hpbGQ9bGFzdENoaWxkXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1jaGlsZHJlblswXVxuICAgICAgICBsYXN0Q2hpbGQ9bnVsbFxuICAgICAgICBldmVudC5lbWl0KFwiY2hhbmdlXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBjaGlsZHJlbigpe1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzdGF0aWMgaW52aXRlKGlkLHJlbGF0aW9uc2hpcCl7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaWQpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbGF0aW9uc2hpcCgpe1xuICAgICAgICBsZXQgY3VycmVudD1Vc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICxyZWxhdGl2ZT1hbGwuZmlsdGVyKGE9PmEuX2lkPT1jdXJyZW50Ll9pZClbMF1cbiAgICAgICAgcmV0dXJuIHJlbGF0aXZlID8gcmVsYXRpdmUucmVsYXRpb25zaGlwIDogbnVsbFxuICAgIH1cbn1cbiJdfQ==