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
        value: function init() {
            var _this2 = this;

            this.super('init')();
            return new Promise(function (resolve, reject) {
                _this2.find().fetch(function (data) {
                    all = data || [];
                    children = [];
                    all.forEach(function (a) {
                        return !a.relationShip && children.push(a);
                    });
                    resolve(Family.currentChild = children[0]);
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
//# sourceMappingURL=data:application/json;base64,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LEdBQXdCLElBQW5DLENBSFU7Ozs7NEJBakZIO0FBQ2QsbUJBQU8sUUFBUCxDQURjOzs7OzRCQXdDRjtBQUNaLG1CQUFPLEdBQVAsQ0FEWTs7Ozs0QkFJRTtBQUNkLG1CQUFPLEtBQVAsQ0FEYzs7Ozs0QkFJTztBQUNyQixtQkFBTyxZQUFQLENBRHFCOzswQkFJRCxHQUFFO0FBQzVCLGdCQUFHLE9BQU8sQ0FBUCxJQUFXLFFBQVgsRUFDRixJQUFFLFNBQVMsTUFBVCxDQUFnQjt1QkFBRyxFQUFFLEdBQUYsSUFBTyxDQUFQO2FBQUgsQ0FBaEIsQ0FBNkIsQ0FBN0IsQ0FBRixDQUREOztBQUdNLGdCQUFHLGdCQUFnQixhQUFhLEdBQWIsRUFDZixZQUFVLFlBQVYsQ0FESixLQUdJLFlBQVUsSUFBVixDQUhKO0FBSUEsMkJBQWEsQ0FBYixDQVJzQjtBQVN0QixrQkFBTSxJQUFOLENBQVcsUUFBWCxFQVRzQjs7Ozs0QkFxQkw7QUFDakIsbUJBQU8sUUFBUCxDQURpQjs7OztXQTFFSjtFQUFlOztrQkFBZiIsImZpbGUiOiJmYW1pbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge01vZGVsfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtFdmVudEVtaXR0ZXJ9PXJlcXVpcmUoJ2V2ZW50cycpLFxuICAgIGV2ZW50PW5ldyBFdmVudEVtaXR0ZXIoKSxcbiAgICBhbGw9W10sXG4gICAgY2hpbGRyZW49W10sXG4gICAgY3VycmVudENoaWxkLFxuICAgIGxhc3RDaGlsZDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhbWlseSBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmYW1pbHknXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKXtcbiAgICAgICAgdGhpcy5zdXBlcignaW5pdCcpKClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmZpbmQoKS5mZXRjaCgoZGF0YSk9PntcbiAgICAgICAgICAgICAgICBhbGw9ZGF0YXx8W11cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj1bXVxuICAgICAgICAgICAgICAgIGFsbC5mb3JFYWNoKChhKT0+KCFhLnJlbGF0aW9uU2hpcCAmJiBjaGlsZHJlbi5wdXNoKGEpKSlcbiAgICAgICAgICAgICAgICByZXNvbHZlKEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bMF0pXG4gICAgICAgICAgICB9LHJlamVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGEsIGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3Vwc2VydCcpKGEsYmFzZSwocik9PntcbiAgICAgICAgICAgICAgICBpZihhbGwuZmlsdGVyKGI9PmIuX2lkPWEuX2lkKS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICBhbGwucHVzaChyKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHIpXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1yXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmVtaXQoXCJjaGFuZ2VcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShjaGlsZCxzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCdyZW1vdmUnKShjaGlsZCwoKT0+e1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuPWNoaWxkcmVuLmZpbHRlcigoYSk9PmEuX2lkIT1jaGlsZClcbiAgICAgICAgICAgICAgICBhbGw9YWxsLmZpbHRlcigoYSk9PmEuX2lkIT1jaGlsZClcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50Q2hpbGQuX2lkPT1jaGlsZCl7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZD1jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgICAgICBldmVudC5lbWl0KFwiY2hhbmdlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9LGVycm9yKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgYWxsKCl7XG4gICAgICAgIHJldHVybiBhbGxcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGV2ZW50KCl7XG4gICAgICAgIHJldHVybiBldmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY3VycmVudENoaWxkKCl7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2hpbGRcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGN1cnJlbnRDaGlsZChhKXtcblx0XHRpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxuXHRcdFx0YT1jaGlsZHJlbi5maWx0ZXIoYj0+Yi5faWQ9PWEpWzBdXG5cdFx0XG4gICAgICAgIGlmKGN1cnJlbnRDaGlsZCAmJiBjdXJyZW50Q2hpbGQuX2lkKVxuICAgICAgICAgICAgbGFzdENoaWxkPWN1cnJlbnRDaGlsZFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBsYXN0Q2hpbGQ9bnVsbFxuICAgICAgICBjdXJyZW50Q2hpbGQ9YVxuICAgICAgICBldmVudC5lbWl0KFwiY2hhbmdlXCIpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlc3RvcmVMYXN0KCl7XG4gICAgICAgIGlmKGxhc3RDaGlsZCE9bnVsbCAmJiBsYXN0Q2hpbGQuX2lkICYmIGN1cnJlbnRDaGlsZCE9bGFzdENoaWxkKVxuICAgICAgICAgICAgY3VycmVudENoaWxkPWxhc3RDaGlsZFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bMF1cbiAgICAgICAgbGFzdENoaWxkPW51bGxcbiAgICAgICAgZXZlbnQuZW1pdChcImNoYW5nZVwiKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY2hpbGRyZW4oKXtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgfVxuXG4gICAgc3RhdGljIGludml0ZShpZCxyZWxhdGlvbnNoaXApe1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkKVxuICAgIH1cblxuICAgIHN0YXRpYyByZWxhdGlvbnNoaXAoKXtcbiAgICAgICAgbGV0IGN1cnJlbnQ9VXNlci5jdXJyZW50XG4gICAgICAgICAgICAscmVsYXRpdmU9YWxsLmZpbHRlcihhPT5hLl9pZD09Y3VycmVudC5faWQpWzBdXG4gICAgICAgIHJldHVybiByZWxhdGl2ZSA/IHJlbGF0aXZlLnJlbGF0aW9uc2hpcCA6IG51bGxcbiAgICB9XG59XG4iXX0=