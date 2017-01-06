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
		key: 'isForParent',


		/*
  {_id,title,content,summary,keywords,category,props:{...}}
  */

		value: function isForParent(knowledge) {
			return (knowledge.category || []).includes("父母教育");
		}
	}, {
		key: 'isForBaby',
		value: function isForBaby(knowledge) {
			return (knowledge.category || []).join("") !== "父母教育";
		}
	}, {
		key: '_name',
		get: function get() {
			return 'knowledge';
		}
	}]);

	return Knowledge;
}(_qiliApp.Model);

exports.default = Knowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9rbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiS25vd2xlZGdlIiwia25vd2xlZGdlIiwiY2F0ZWdvcnkiLCJpbmNsdWRlcyIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7O0FBS2pCOzs7OzhCQUlnQkMsUyxFQUFVO0FBQzVCLFVBQU8sQ0FBQ0EsVUFBVUMsUUFBVixJQUFvQixFQUFyQixFQUF5QkMsUUFBekIsQ0FBa0MsTUFBbEMsQ0FBUDtBQUNBOzs7NEJBRWdCRixTLEVBQVU7QUFDMUIsVUFBTyxDQUFDQSxVQUFVQyxRQUFWLElBQW9CLEVBQXJCLEVBQXlCRSxJQUF6QixDQUE4QixFQUE5QixNQUFvQyxNQUEzQztBQUNBOzs7c0JBZG9CO0FBQ2QsVUFBTyxXQUFQO0FBQ0g7Ozs7OztrQkFIZ0JKLFMiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSAncWlsaS1hcHAnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdrbm93bGVkZ2UnXG4gICAgfVxuXG4gICAgLypcbiAgICB7X2lkLHRpdGxlLGNvbnRlbnQsc3VtbWFyeSxrZXl3b3JkcyxjYXRlZ29yeSxwcm9wczp7Li4ufX1cbiAgICAqL1xuXHRcblx0c3RhdGljIGlzRm9yUGFyZW50KGtub3dsZWRnZSl7XG5cdFx0cmV0dXJuIChrbm93bGVkZ2UuY2F0ZWdvcnl8fFtdKS5pbmNsdWRlcyhcIueItuavjeaVmeiCslwiKVxuXHR9XG5cdFxuXHRzdGF0aWMgaXNGb3JCYWJ5KGtub3dsZWRnZSl7XG5cdFx0cmV0dXJuIChrbm93bGVkZ2UuY2F0ZWdvcnl8fFtdKS5qb2luKFwiXCIpIT09XCLniLbmr43mlZnogrJcIlxuXHR9XG59XG4iXX0=