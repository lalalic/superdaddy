"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Account = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _materialUi = require("material-ui");

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _groupAdd = require("material-ui/svg-icons/social/group-add");

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _childCare = require("material-ui/svg-icons/places/child-care");

var _childCare2 = _interopRequireDefault(_childCare);

var _baby = require("./baby");

var _baby2 = _interopRequireDefault(_baby);

var _db = require("./db");

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Photo = _qiliApp.UI.Photo;
var BaseAccount = _qiliApp.UI.Account;
var Account = exports.Account = function Account(_ref, _ref2) {
    var dispatch = _ref.dispatch;
    var babies = _ref.babies;
    var router = _ref2.router;
    return _react2.default.createElement(
        BaseAccount,
        null,
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u6211\u7684\u5B9D\u8D1D",
            leftIcon: _react2.default.createElement(_addCircleOutline2.default, null),
            initiallyOpen: true,
            autoGenerateNestedIndicator: false,
            onClick: function onClick(a) {
                return router.push("/baby");
            },
            nestedItems: babies.map(function (_ref3) {
                var _id = _ref3._id;
                var photo = _ref3.photo;
                var name = _ref3.name;
                return _react2.default.createElement(_materialUi.ListItem, { key: _id, primaryText: name,
                    onClick: function onClick(e) {
                        return router.push("/baby/" + _id);
                    },
                    leftAvatar: _react2.default.createElement(Photo, { src: photo,
                        onPhoto: function onPhoto(url) {
                            return dispatch(_baby2.default.ACTION.CHANGE("photo", url));
                        },
                        iconRatio: 2 / 3, width: 40, height: 40 })
                });
            })
        })
    );
};

Account.contextTypes = {
    router: _react.PropTypes.object
};

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIlBob3RvIiwiQmFzZUFjY291bnQiLCJBY2NvdW50IiwiZGlzcGF0Y2giLCJiYWJpZXMiLCJyb3V0ZXIiLCJwdXNoIiwibWFwIiwiX2lkIiwicGhvdG8iLCJuYW1lIiwiQUNUSU9OIiwiQ0hBTkdFIiwidXJsIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0lBR09BLEssZUFBQUEsSztJQUFjQyxXLGVBQVJDLE87QUFFTixJQUFNQSw0QkFBUSxTQUFSQSxPQUFRO0FBQUEsUUFBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsUUFBV0MsTUFBWCxRQUFXQSxNQUFYO0FBQUEsUUFBb0JDLE1BQXBCLFNBQW9CQSxNQUFwQjtBQUFBLFdBQ2pCO0FBQUMsbUJBQUQ7QUFBQTtBQUNJLDhEQUFVLGFBQVksMEJBQXRCO0FBQ0ksc0JBQVUsK0RBRGQ7QUFFSSwyQkFBZSxJQUZuQjtBQUdJLHlDQUE2QixLQUhqQztBQUlJLHFCQUFTO0FBQUEsdUJBQUdBLE9BQU9DLElBQVAsQ0FBWSxPQUFaLENBQUg7QUFBQSxhQUpiO0FBS0kseUJBQ0lGLE9BQU9HLEdBQVAsQ0FBVztBQUFBLG9CQUFFQyxHQUFGLFNBQUVBLEdBQUY7QUFBQSxvQkFBTUMsS0FBTixTQUFNQSxLQUFOO0FBQUEsb0JBQVlDLElBQVosU0FBWUEsSUFBWjtBQUFBLHVCQUNILHNEQUFVLEtBQUtGLEdBQWYsRUFBb0IsYUFBYUUsSUFBakM7QUFDSSw2QkFBUztBQUFBLCtCQUFHTCxPQUFPQyxJQUFQLFlBQXFCRSxHQUFyQixDQUFIO0FBQUEscUJBRGI7QUFFSSxnQ0FDSSw4QkFBQyxLQUFELElBQU8sS0FBS0MsS0FBWjtBQUNJLGlDQUFTO0FBQUEsbUNBQUtOLFNBQVMsZUFBS1EsTUFBTCxDQUFZQyxNQUFaLENBQW1CLE9BQW5CLEVBQTJCQyxHQUEzQixDQUFULENBQUw7QUFBQSx5QkFEYjtBQUVJLG1DQUFXLElBQUUsQ0FGakIsRUFFb0IsT0FBTyxFQUYzQixFQUUrQixRQUFRLEVBRnZDO0FBSFIsa0JBREc7QUFBQSxhQUFYO0FBTlI7QUFESixLQURpQjtBQUFBLENBQWQ7O0FBdUJQWCxRQUFRWSxZQUFSLEdBQXFCO0FBQ2pCVCxZQUFRLGlCQUFVVTtBQURELENBQXJCOztrQkFJZWIsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUksIEVOSVRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5pbXBvcnQge0xpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IFNldHRpbmdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJbnZpdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvZ3JvdXAtYWRkJ1xyXG5pbXBvcnQgUHVibGlzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBCYWJ5SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcclxuXHJcbmltcG9ydCBCYWJ5IGZyb20gXCIuL2JhYnlcIlxyXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQge2N1cnJlbnRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuXHJcbmNvbnN0IHtQaG90byxBY2NvdW50OkJhc2VBY2NvdW50fT1VSVxyXG5cclxuZXhwb3J0IGNvbnN0IEFjY291bnQ9KHtkaXNwYXRjaCxiYWJpZXN9LHtyb3V0ZXJ9KT0+KFxyXG4gICAgPEJhc2VBY2NvdW50PlxyXG4gICAgICAgIDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaIkeeahOWunei0nVwiXHJcbiAgICAgICAgICAgIGxlZnRJY29uPXs8SWNvbkFkZC8+fVxyXG4gICAgICAgICAgICBpbml0aWFsbHlPcGVuPXt0cnVlfVxyXG4gICAgICAgICAgICBhdXRvR2VuZXJhdGVOZXN0ZWRJbmRpY2F0b3I9e2ZhbHNlfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIucHVzaChcIi9iYWJ5XCIpfVxyXG4gICAgICAgICAgICBuZXN0ZWRJdGVtcz17XHJcbiAgICAgICAgICAgICAgICBiYWJpZXMubWFwKCh7X2lkLHBob3RvLG5hbWV9KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e19pZH0gcHJpbWFyeVRleHQ9e25hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgL2JhYnkvJHtfaWR9YCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGhvdG8gc3JjPXtwaG90b31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90bz17dXJsPT5kaXNwYXRjaChCYWJ5LkFDVElPTi5DSEFOR0UoXCJwaG90b1wiLHVybCkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvPlxyXG4gICAgPC9CYXNlQWNjb3VudD5cclxuKVxyXG5cclxuQWNjb3VudC5jb250ZXh0VHlwZXM9e1xyXG4gICAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcclxuIl19