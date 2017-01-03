'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Knowledge = function (_Model) {
    _inherits(Knowledge, _Model);

    function Knowledge() {
        _classCallCheck(this, Knowledge);

        return _possibleConstructorReturn(this, (Knowledge.__proto__ || Object.getPrototypeOf(Knowledge)).apply(this, arguments));
    }

    _createClass(Knowledge, null, [{
        key: '_name',
        get: function get() {
            return 'knowledge';
        }

        /*
        {_id,title,content,summary,keywords,category,props:{...}}
        */

    }]);

    return Knowledge;
}(_qiliApp.Model);

exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9rbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiS25vd2xlZGdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7NEJBQ0M7QUFDZCxtQkFBTyxXQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztrQkFMaUJBLFMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSAncWlsaS1hcHAnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBNb2RlbHtcclxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcclxuICAgICAgICByZXR1cm4gJ2tub3dsZWRnZSdcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAge19pZCx0aXRsZSxjb250ZW50LHN1bW1hcnksa2V5d29yZHMsY2F0ZWdvcnkscHJvcHM6ey4uLn19XHJcbiAgICAqL1xyXG59XHJcbiJdfQ==