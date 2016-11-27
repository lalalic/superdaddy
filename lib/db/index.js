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
    init: function init(name) {
        _knowledge2.default.init();
        _task2.default.init();
        _experience2.default.init();
        _reward2.default.init();
        _goal2.default.init();
        return _family2.default.init(name);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiRmFtaWx5IiwiS25vd2xlZGdlIiwiVGFzayIsIkV4cGVyaWVuY2UiLCJSZXdhcmQiLCJHb2FsIiwiaW5pdCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFlO0FBQ1hDLDRCQURXLEVBQ0hDLDhCQURHLEVBQ09DLG9CQURQLEVBQ2FDLGdDQURiLEVBQ3dCQyx3QkFEeEIsRUFDK0JDLG9CQUQvQjtBQUVYQyxRQUZXLGdCQUVOQyxJQUZNLEVBRUQ7QUFDTiw0QkFBVUQsSUFBVjtBQUNBLHVCQUFLQSxJQUFMO0FBQ0EsNkJBQVdBLElBQVg7QUFDQSx5QkFBT0EsSUFBUDtBQUNBLHVCQUFLQSxJQUFMO0FBQ0EsZUFBTyxpQkFBT0EsSUFBUCxDQUFZQyxJQUFaLENBQVA7QUFDSDtBQVRVLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFtaWx5IGZyb20gJy4vZmFtaWx5J1xyXG5pbXBvcnQgS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xyXG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snXHJcbmltcG9ydCBFeHBlcmllbmNlIGZyb20gJy4vZXhwZXJpZW5jZSdcclxuaW1wb3J0IFJld2FyZCBmcm9tIFwiLi9yZXdhcmRcIlxyXG5pbXBvcnQgR29hbCBmcm9tIFwiLi9nb2FsXCJcclxuXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgIEZhbWlseSwgS25vd2xlZGdlLFRhc2ssIEV4cGVyaWVuY2UsUmV3YXJkLEdvYWwsXHJcbiAgICBpbml0KG5hbWUpe1xyXG4gICAgICAgIEtub3dsZWRnZS5pbml0KClcclxuICAgICAgICBUYXNrLmluaXQoKVxyXG4gICAgICAgIEV4cGVyaWVuY2UuaW5pdCgpXHJcbiAgICAgICAgUmV3YXJkLmluaXQoKVxyXG4gICAgICAgIEdvYWwuaW5pdCgpXHJcbiAgICAgICAgcmV0dXJuIEZhbWlseS5pbml0KG5hbWUpXHJcbiAgICB9XHJcbn1cclxuIl19