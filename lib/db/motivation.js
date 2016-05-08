"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _ = require(".");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_RULE = /[\/-]/;

var Motivation = function (_Model) {
	_inherits(Motivation, _Model);

	function Motivation() {
		_classCallCheck(this, Motivation);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Motivation).apply(this, arguments));
	}

	_createClass(Motivation, null, [{
		key: "addRule",
		value: function addRule(rule) {
			var target = rule.target;
			var reward = rule.reward;

			target.split(",").forEach(function (seg) {
				var els = seg.split(REG_RULE),
				    temp = void 0;
				switch (els.length) {
					case 1:
						//5
						var n = parseInt(els[0].trim());
						temp = rewards.get(n) || [];
						temp.push(reward);
						rewards.set(n, temp);
						break;
					case 2: //5-10, step=1
					case 3:
						// 10-20/5, every 5 from 10 to 20

						var _els = _slicedToArray(els, 3);

						var a = _els[0];
						var b = _els[1];
						var _els$ = _els[2];
						var step = _els$ === undefined ? "1" : _els$;
						var ia = parseInt(a.trim());
						var ib = parseInt(b.trim());
						var start = Math.min(ia, ib);
						var end = Math.max(ia, ib);
						step = parseInt(step.trim());
						for (; start < end + 1; start += step) {
							temp = rewards.get(start) || [];
							temp.push(reward);
							rewards.set(start, temp);
						}
						break;
				}
			});
		}
	}, {
		key: "_name",
		get: function get() {
			return "motivation";
		}
	}]);

	return Motivation;
}(_qiliApp.Model);

exports.default = Motivation;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9tb3RpdmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVMsT0FBVDs7SUFDaUI7Ozs7Ozs7Ozs7OzBCQUtGLE1BQUs7T0FDakIsU0FBZ0IsS0FBaEIsT0FEaUI7T0FDVCxTQUFRLEtBQVIsT0FEUzs7QUFFdEIsVUFBTyxLQUFQLENBQWEsR0FBYixFQUFrQixPQUFsQixDQUEwQixlQUFLO0FBQzlCLFFBQUksTUFBSSxJQUFJLEtBQUosQ0FBVSxRQUFWLENBQUo7UUFBeUIsYUFBN0IsQ0FEOEI7QUFFOUIsWUFBTyxJQUFJLE1BQUo7QUFDUCxVQUFLLENBQUw7O0FBQ0MsVUFBSSxJQUFFLFNBQVMsSUFBSSxDQUFKLEVBQU8sSUFBUCxFQUFULENBQUYsQ0FETDtBQUVDLGFBQUssUUFBUSxHQUFSLENBQVksQ0FBWixLQUFnQixFQUFoQixDQUZOO0FBR0MsV0FBSyxJQUFMLENBQVUsTUFBVixFQUhEO0FBSUMsY0FBUSxHQUFSLENBQVksQ0FBWixFQUFjLElBQWQsRUFKRDtBQUtBLFlBTEE7QUFEQSxVQU9LLENBQUw7QUFQQSxVQVFLLENBQUw7OztnQ0FDb0IsUUFEcEI7O1VBQ00sWUFETjtVQUNRLFlBRFI7O0FBQ0ssVUFBSyw2QkFBSyxXQUFWLENBREw7QUFFRSxlQUFHLFNBQVMsRUFBRSxJQUFGLEVBQVQsQ0FBSCxDQUZGO0FBR0UsZUFBRyxTQUFTLEVBQUUsSUFBRixFQUFULENBQUgsQ0FIRjtBQUlFLGtCQUFNLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBWSxFQUFaLENBQU4sQ0FKRjtBQUtFLGdCQUFJLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBWSxFQUFaLENBQUosQ0FMRjtBQU1DLGFBQUssU0FBUyxLQUFLLElBQUwsRUFBVCxDQUFMLENBTkQ7QUFPQyxhQUFLLFFBQU0sTUFBSSxDQUFKLEVBQU0sU0FBTyxJQUFQLEVBQVk7QUFDNUIsY0FBSyxRQUFRLEdBQVIsQ0FBWSxLQUFaLEtBQW9CLEVBQXBCLENBRHVCO0FBRTVCLFlBQUssSUFBTCxDQUFVLE1BQVYsRUFGNEI7QUFHNUIsZUFBUSxHQUFSLENBQVksS0FBWixFQUFrQixJQUFsQixFQUg0QjtPQUE3QjtBQUtELFlBWkE7QUFSQSxLQUY4QjtJQUFMLENBQTFCLENBRnNCOzs7O3NCQUpGO0FBQ2QsVUFBTyxZQUFQLENBRGM7Ozs7UUFERCIsImZpbGUiOiJtb3RpdmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7RmFtaWx5fSBmcm9tIFwiLlwiXG5cbnZhciBSRUdfUlVMRT0vW1xcLy1dL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW90aXZhdGlvbiBleHRlbmRzIE1vZGVse1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuIFwibW90aXZhdGlvblwiXG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFJ1bGUocnVsZSl7XG5cdFx0bGV0IHt0YXJnZXQsIHJld2FyZH09cnVsZVxuXHRcdHRhcmdldC5zcGxpdChcIixcIikuZm9yRWFjaChzZWc9Pntcblx0XHRcdGxldCBlbHM9c2VnLnNwbGl0KFJFR19SVUxFKSwgdGVtcFxuXHRcdFx0c3dpdGNoKGVscy5sZW5ndGgpe1xuXHRcdFx0Y2FzZSAxOi8vNVxuXHRcdFx0XHRsZXQgbj1wYXJzZUludChlbHNbMF0udHJpbSgpKVxuXHRcdFx0XHR0ZW1wPXJld2FyZHMuZ2V0KG4pfHxbXVxuXHRcdFx0XHR0ZW1wLnB1c2gocmV3YXJkKVxuXHRcdFx0XHRyZXdhcmRzLnNldChuLHRlbXApXG5cdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOi8vNS0xMCwgc3RlcD0xXG5cdFx0XHRjYXNlIDM6Ly8gMTAtMjAvNSwgZXZlcnkgNSBmcm9tIDEwIHRvIDIwXG5cdFx0XHRcdGxldCBbYSxiLHN0ZXA9XCIxXCJdPWVscyxcblx0XHRcdFx0XHRpYT1wYXJzZUludChhLnRyaW0oKSksXG5cdFx0XHRcdFx0aWI9cGFyc2VJbnQoYi50cmltKCkpLFxuXHRcdFx0XHRcdHN0YXJ0PU1hdGgubWluKGlhLGliKSxcblx0XHRcdFx0XHRlbmQ9TWF0aC5tYXgoaWEsaWIpXG5cdFx0XHRcdHN0ZXA9cGFyc2VJbnQoc3RlcC50cmltKCkpXG5cdFx0XHRcdGZvcig7c3RhcnQ8ZW5kKzE7c3RhcnQrPXN0ZXApe1xuXHRcdFx0XHRcdHRlbXA9cmV3YXJkcy5nZXQoc3RhcnQpfHxbXVxuXHRcdFx0XHRcdHRlbXAucHVzaChyZXdhcmQpXG5cdFx0XHRcdFx0cmV3YXJkcy5zZXQoc3RhcnQsdGVtcClcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9KVxuICAgIH1cbn1cbiJdfQ==