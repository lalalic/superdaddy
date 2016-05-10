'use strict';

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _experience = require('./experience');

var _experience2 = _interopRequireDefault(_experience);

var _reward = require('./reward');

var _reward2 = _interopRequireDefault(_reward);

var _goal = require('./goal');

var _goal2 = _interopRequireDefault(_goal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    Family: _family2.default, Knowledge: _knowledge2.default, Task: _task2.default, Experience: _experience2.default, Reward: _reward2.default, Goal: _goal2.default,
    init: function init() {
        _knowledge2.default.init();
        _task2.default.init();
        _experience2.default.init();
        _reward2.default.init();
        _goal2.default.init();
        return _family2.default.init();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsT0FBTyxPQUFQLEdBQWU7QUFDWCw0QkFEVyxFQUNILDhCQURHLEVBQ08sb0JBRFAsRUFDYSxnQ0FEYixFQUN3Qix3QkFEeEIsRUFDK0Isb0JBRC9CO0FBRVgsMEJBQU07QUFDRiw0QkFBVSxJQUFWLEdBREU7QUFFRix1QkFBSyxJQUFMLEdBRkU7QUFHRiw2QkFBVyxJQUFYLEdBSEU7QUFJRix5QkFBTyxJQUFQLEdBSkU7QUFLRix1QkFBSyxJQUFMLEdBTEU7QUFNRixlQUFPLGlCQUFPLElBQVAsRUFBUCxDQU5FO0tBRks7Q0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXHJcbmltcG9ydCBLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzaydcclxuaW1wb3J0IEV4cGVyaWVuY2UgZnJvbSAnLi9leHBlcmllbmNlJ1xyXG5pbXBvcnQgUmV3YXJkIGZyb20gXCIuL3Jld2FyZFwiXHJcbmltcG9ydCBHb2FsIGZyb20gXCIuL2dvYWxcIlxyXG5cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgRmFtaWx5LCBLbm93bGVkZ2UsVGFzaywgRXhwZXJpZW5jZSxSZXdhcmQsR29hbCxcclxuICAgIGluaXQoKXtcclxuICAgICAgICBLbm93bGVkZ2UuaW5pdCgpXHJcbiAgICAgICAgVGFzay5pbml0KClcclxuICAgICAgICBFeHBlcmllbmNlLmluaXQoKVxyXG4gICAgICAgIFJld2FyZC5pbml0KClcclxuICAgICAgICBHb2FsLmluaXQoKVxyXG4gICAgICAgIHJldHVybiBGYW1pbHkuaW5pdCgpXHJcbiAgICB9XHJcbn1cclxuIl19