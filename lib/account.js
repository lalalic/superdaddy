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
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "我的宝贝",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7SUFHTztJQUFjLDBCQUFSO0FBRU4sSUFBTSw0QkFBUSxTQUFSLE9BQVE7UUFBRTtRQUFTO1FBQVM7V0FDckM7QUFBQyxtQkFBRDs7UUFDSSxzREFBVSxhQUFZLE1BQVo7QUFDTixzQkFBVSwrREFBVjtBQUNBLDJCQUFlLElBQWY7QUFDQSx5Q0FBNkIsS0FBN0I7QUFDQSxxQkFBUzt1QkFBRyxPQUFPLElBQVAsQ0FBWSxPQUFaO2FBQUg7QUFDVCx5QkFDSSxPQUFPLEdBQVAsQ0FBVztvQkFBRTtvQkFBSTtvQkFBTTt1QkFDZixzREFBVSxLQUFLLEdBQUwsRUFBVSxhQUFhLElBQWI7QUFDaEIsNkJBQVM7K0JBQUcsT0FBTyxJQUFQLFlBQXFCLEdBQXJCO3FCQUFIO0FBQ1QsZ0NBQ0ksOEJBQUMsS0FBRCxJQUFPLEtBQUssS0FBTDtBQUNILGlDQUFTO21DQUFLLFNBQVMsZUFBSyxNQUFMLENBQVksTUFBWixDQUFtQixPQUFuQixFQUEyQixHQUEzQixDQUFUO3lCQUFMO0FBQ1QsbUNBQVcsSUFBRSxDQUFGLEVBQUssT0FBTyxFQUFQLEVBQVcsUUFBUSxFQUFSLEVBRi9CLENBREo7aUJBRko7YUFERyxDQURmO1NBTEosQ0FESjs7Q0FEaUI7O0FBdUJyQixRQUFRLFlBQVIsR0FBcUI7QUFDakIsWUFBUSxpQkFBVSxNQUFWO0NBRFo7O2tCQUllIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSSwgRU5JVElUSUVTfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXHJcbmltcG9ydCB7TGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEludml0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9ncm91cC1hZGQnXHJcbmltcG9ydCBQdWJsaXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEJhYnlJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxyXG5cclxuaW1wb3J0IEJhYnkgZnJvbSBcIi4vYmFieVwiXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5cclxuY29uc3Qge1Bob3RvLEFjY291bnQ6QmFzZUFjY291bnR9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgQWNjb3VudD0oe2Rpc3BhdGNoLGJhYmllc30se3JvdXRlcn0pPT4oXHJcbiAgICA8QmFzZUFjY291bnQ+XHJcbiAgICAgICAgPExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5oiR55qE5a6d6LSdXCJcclxuICAgICAgICAgICAgbGVmdEljb249ezxJY29uQWRkLz59XHJcbiAgICAgICAgICAgIGluaXRpYWxseU9wZW49e3RydWV9XHJcbiAgICAgICAgICAgIGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci5wdXNoKFwiL2JhYnlcIil9XHJcbiAgICAgICAgICAgIG5lc3RlZEl0ZW1zPXtcclxuICAgICAgICAgICAgICAgIGJhYmllcy5tYXAoKHtfaWQscGhvdG8sbmFtZX0pPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtIGtleT17X2lkfSBwcmltYXJ5VGV4dD17bmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKGAvYmFieS8ke19pZH1gKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQaG90byBzcmM9e3Bob3RvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvPXt1cmw9PmRpc3BhdGNoKEJhYnkuQUNUSU9OLkNIQU5HRShcInBob3RvXCIsdXJsKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICA8L0Jhc2VBY2NvdW50PlxyXG4pXHJcblxyXG5BY2NvdW50LmNvbnRleHRUeXBlcz17XHJcbiAgICByb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudFxyXG4iXX0=