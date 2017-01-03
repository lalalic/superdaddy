'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app'),
    Model = _require.Model;

var Experience = function (_Model) {
    _inherits(Experience, _Model);

    function Experience() {
        _classCallCheck(this, Experience);

        return _possibleConstructorReturn(this, (Experience.__proto__ || Object.getPrototypeOf(Experience)).apply(this, arguments));
    }

    _createClass(Experience, null, [{
        key: '_name',
        get: function get() {
            return 'experience';
        }
    }]);

    return Experience;
}(Model);

exports.default = Experience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9leHBlcmllbmNlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJNb2RlbCIsIkV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2VBQVlBLFFBQVEsVUFBUixDO0lBQVBDLEssWUFBQUEsSzs7SUFDZ0JDLFU7Ozs7Ozs7Ozs7OzRCQUNDO0FBQ2QsbUJBQU8sWUFBUDtBQUNIOzs7O0VBSG1DRCxLOztrQkFBbkJDLFUiLCJmaWxlIjoiZXhwZXJpZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7TW9kZWx9PXJlcXVpcmUoJ3FpbGktYXBwJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwZXJpZW5jZSBleHRlbmRzIE1vZGVse1xyXG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiAnZXhwZXJpZW5jZSdcclxuICAgIH1cclxufVxyXG4iXX0=