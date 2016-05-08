'use strict';

var _family = require('./family');

var _family2 = _interopRequireDefault(_family);

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _experience = require('./experience');

var _experience2 = _interopRequireDefault(_experience);

var _rewards = require('./rewards');

var _rewards2 = _interopRequireDefault(_rewards);

var _motivation = require('./motivation');

var _motivation2 = _interopRequireDefault(_motivation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    Family: _family2.default, Knowledge: _knowledge2.default, Task: _task2.default, Experience: _experience2.default, Rewards: _rewards2.default, Motivation: _motivation2.default,
    init: function init() {
        _knowledge2.default.init();
        _task2.default.init();
        _experience2.default.init();
        _rewards2.default.init();
        _motivation2.default.init();
        return _family2.default.init();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsT0FBTyxPQUFQLEdBQWU7QUFDWCw0QkFEVyxFQUNILDhCQURHLEVBQ08sb0JBRFAsRUFDYSxnQ0FEYixFQUN3QiwwQkFEeEIsRUFDZ0MsZ0NBRGhDO0FBRVgsMEJBQU07QUFDRiw0QkFBVSxJQUFWLEdBREU7QUFFRix1QkFBSyxJQUFMLEdBRkU7QUFHRiw2QkFBVyxJQUFYLEdBSEU7QUFJRiwwQkFBUSxJQUFSLEdBSkU7QUFLRiw2QkFBVyxJQUFYLEdBTEU7QUFNRixlQUFPLGlCQUFPLElBQVAsRUFBUCxDQU5FO0tBRks7Q0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGYW1pbHkgZnJvbSAnLi9mYW1pbHknXHJcbmltcG9ydCBLbm93bGVkZ2UgZnJvbSAnLi9rbm93bGVkZ2UnXHJcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzaydcclxuaW1wb3J0IEV4cGVyaWVuY2UgZnJvbSAnLi9leHBlcmllbmNlJ1xyXG5pbXBvcnQgUmV3YXJkcyBmcm9tIFwiLi9yZXdhcmRzXCJcclxuaW1wb3J0IE1vdGl2YXRpb24gZnJvbSBcIi4vbW90aXZhdGlvblwiXHJcblxyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICBGYW1pbHksIEtub3dsZWRnZSxUYXNrLCBFeHBlcmllbmNlLFJld2FyZHMsTW90aXZhdGlvbixcclxuICAgIGluaXQoKXtcclxuICAgICAgICBLbm93bGVkZ2UuaW5pdCgpXHJcbiAgICAgICAgVGFzay5pbml0KClcclxuICAgICAgICBFeHBlcmllbmNlLmluaXQoKVxyXG4gICAgICAgIFJld2FyZHMuaW5pdCgpXHJcbiAgICAgICAgTW90aXZhdGlvbi5pbml0KClcclxuICAgICAgICByZXR1cm4gRmFtaWx5LmluaXQoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==