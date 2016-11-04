'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _normalizr = require('normalizr');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var Model = _require.Model;
var ENTITIES = _require.ENTITIES;

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
        value: function init(dispatch, name) {
            var _this2 = this;

            this.super('init')();
            this._schema = (0, _normalizr.unionOf)({
                children: new _normalizr.Schema("child"),
                relatives: new _normalizr.Schema("relative")
            }, {
                schemaAttribute: function schemaAttribute(_ref) {
                    var relationship = _ref.relationship;
                    return relationship ? "relative" : "child";
                }
            });
            return new Promise(function (resolve, reject) {
                _this2.find().fetch(function (data) {
                    all = data || [];
                    children = [];
                    all.forEach(function (a) {
                        return !a.relationShip && children.push(a);
                    });
                    Family.currentChild = name ? children.find(function (a) {
                        return a.name == name;
                    }) : children[0];
                    resolve({ children: children, currentChild: currentChild, all: all });
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
//# sourceMappingURL=data:application/json;base64,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QyxDQUFsQyxDQUFULENBRlk7QUFHakIsbUJBQU8sV0FBVyxTQUFTLFlBQVQsR0FBd0IsSUFBbkMsQ0FIVTs7Ozs0QkFsRkg7QUFDZCxtQkFBTyxRQUFQLENBRGM7Ozs7NEJBNkNGO0FBQ1osbUJBQU8sR0FBUCxDQURZOzs7OzRCQUlFO0FBQ2QsbUJBQU8sS0FBUCxDQURjOzs7OzRCQUlPO0FBQ3JCLG1CQUFPLFlBQVAsQ0FEcUI7OzBCQUlELEdBQUU7QUFDNUIsZ0JBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxFQUNGLElBQUUsU0FBUyxJQUFULENBQWM7dUJBQUcsRUFBRSxJQUFGLElBQVEsQ0FBUjthQUFILENBQWhCLENBREQ7O0FBR0EsZ0JBQUcsS0FBSyxJQUFMLENBSnlCOztBQU10QixnQkFBRyxLQUFHLFlBQUgsRUFBZ0I7QUFDeEIsNEJBQVUsWUFBVixDQUR3QjtBQUV4QiwrQkFBYSxDQUFiLENBRndCO0FBR3hCLHNCQUFNLElBQU4sQ0FBVyxRQUFYLEVBQW9CLFlBQXBCLEVBQWtDLFNBQWxDLEVBSHdCO2FBQW5COzs7OzRCQVdpQjtBQUNqQixtQkFBTyxRQUFQLENBRGlCOzs7O1dBM0VKO0VBQWU7O2tCQUFmIiwiZmlsZSI6ImZhbWlseS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7TW9kZWwsIEVOVElUSUVTfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtFdmVudEVtaXR0ZXJ9PXJlcXVpcmUoJ2V2ZW50cycpLFxuICAgIGV2ZW50PW5ldyBFdmVudEVtaXR0ZXIoKSxcbiAgICBhbGw9W10sXG4gICAgY2hpbGRyZW49W10sXG4gICAgY3VycmVudENoaWxkPW51bGwsXG4gICAgbGFzdENoaWxkPW51bGw7XG5cbmltcG9ydCB7dW5pb25PZiwgU2NoZW1hfSBmcm9tIFwibm9ybWFsaXpyXCJcbiBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhbWlseSBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmYW1pbHknXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoZGlzcGF0Y2gsIG5hbWUpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuXHRcdHRoaXMuX3NjaGVtYT11bmlvbk9mKHtcblx0XHRcdFx0Y2hpbGRyZW46IG5ldyBTY2hlbWEoXCJjaGlsZFwiKVxuXHRcdFx0XHQscmVsYXRpdmVzOiBuZXcgU2NoZW1hKFwicmVsYXRpdmVcIilcblx0XHRcdH1cblx0XHRcdCx7XG5cdFx0XHRcdHNjaGVtYUF0dHJpYnV0ZTogKHtyZWxhdGlvbnNoaXB9KT0+KHJlbGF0aW9uc2hpcCA/IFwicmVsYXRpdmVcIiA6IFwiY2hpbGRcIilcblx0XHRcdH1cblx0XHQpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5maW5kKCkuZmV0Y2goZGF0YT0+e1xuXHRcdFx0XHRhbGw9ZGF0YXx8W11cbiAgICAgICAgICAgICAgICBjaGlsZHJlbj1bXVxuICAgICAgICAgICAgICAgIGFsbC5mb3JFYWNoKChhKT0+KCFhLnJlbGF0aW9uU2hpcCAmJiBjaGlsZHJlbi5wdXNoKGEpKSlcblx0XHRcdFx0RmFtaWx5LmN1cnJlbnRDaGlsZD1uYW1lID8gY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PW5hbWUpIDogY2hpbGRyZW5bMF1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHtjaGlsZHJlbiwgY3VycmVudENoaWxkLCBhbGx9KVxuICAgICAgICAgICAgfSxyZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHVwc2VydChhLCBiYXNlLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCd1cHNlcnQnKSguLi5hcmd1bWVudHMpLnRoZW4ocj0+e1xuXHRcdFx0XHRpZihhbGwuZmlsdGVyKGI9PmIuX2lkPT1hLl9pZCkubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsLnB1c2gocilcblx0XHRcdFx0XHRpZighci5yZWxhdGlvblNoaXApXG5cdFx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKHIpXG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlKGNoaWxkLHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3JlbW92ZScpKC4uLmFyZ3VtZW50cylcblx0XHRcdC50aGVuKGE9PntcbiAgICAgICAgICAgICAgICBjaGlsZHJlbj1jaGlsZHJlbi5maWx0ZXIoKGEpPT5hLl9pZCE9Y2hpbGQpXG4gICAgICAgICAgICAgICAgYWxsPWFsbC5maWx0ZXIoKGEpPT5hLl9pZCE9Y2hpbGQpXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudENoaWxkLl9pZD09Y2hpbGQpXG4gICAgICAgICAgICAgICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bMF1cblx0XHRcdH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBhbGwoKXtcbiAgICAgICAgcmV0dXJuIGFsbFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZXZlbnQoKXtcbiAgICAgICAgcmV0dXJuIGV2ZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBjdXJyZW50Q2hpbGQoKXtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDaGlsZFxuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgY3VycmVudENoaWxkKGEpe1xuXHRcdGlmKHR5cGVvZihhKT09J3N0cmluZycpXG5cdFx0XHRhPWNoaWxkcmVuLmZpbmQoYj0+Yi5uYW1lPT1hKVxuXHRcdFxuXHRcdGE9IGEgfHwgbnVsbFxuXHRcdFxuICAgICAgICBpZihhIT1jdXJyZW50Q2hpbGQpe1xuXHRcdFx0bGFzdENoaWxkPWN1cnJlbnRDaGlsZFxuXHRcdFx0Y3VycmVudENoaWxkPWFcblx0XHRcdGV2ZW50LmVtaXQoXCJjaGFuZ2VcIixjdXJyZW50Q2hpbGQsIGxhc3RDaGlsZClcblx0XHR9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlc3RvcmVMYXN0KCl7XG4gICAgICAgIHRoaXMuY3VycmVudENoaWxkPWxhc3RDaGlsZFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY2hpbGRyZW4oKXtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgfVxuXG4gICAgc3RhdGljIGludml0ZShpZCxyZWxhdGlvbnNoaXApe1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkKVxuICAgIH1cblxuICAgIHN0YXRpYyByZWxhdGlvbnNoaXAoKXtcbiAgICAgICAgbGV0IGN1cnJlbnQ9VXNlci5jdXJyZW50XG4gICAgICAgICAgICAscmVsYXRpdmU9YWxsLmZpbHRlcihhPT5hLl9pZD09Y3VycmVudC5faWQpWzBdXG4gICAgICAgIHJldHVybiByZWxhdGl2ZSA/IHJlbGF0aXZlLnJlbGF0aW9uc2hpcCA6IG51bGxcbiAgICB9XG59XG4iXX0=