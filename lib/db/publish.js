'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_Model) {
	_inherits(Publish, _Model);

	function Publish() {
		_classCallCheck(this, Publish);

		return _possibleConstructorReturn(this, (Publish.__proto__ || Object.getPrototypeOf(Publish)).apply(this, arguments));
	}

	_createClass(Publish, null, [{
		key: '_name',
		get: function get() {
			return "publish";
		}
	}]);

	return Publish;
}(_qiliApp.Model);

exports.default = Publish;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbIlB1Ymxpc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7c0JBQ0Y7QUFBQyxVQUFPLFNBQVA7QUFBaUI7Ozs7OztrQkFEaEJBLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgTW9kZWx7XHJcblx0c3RhdGljIGdldCBfbmFtZSgpe3JldHVybiBcInB1Ymxpc2hcIn1cclxuXHRcclxuXHRcclxufSJdfQ==