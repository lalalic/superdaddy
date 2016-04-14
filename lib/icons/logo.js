'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var _require = require('material-ui');

var SvgIcon = _require.SvgIcon;


var Logo = React.createClass({
  displayName: 'Logo',


  mixins: [PureRenderMixin],

  render: function render() {
    var _props = this.props;
    var _props$drawStyle = _props.drawStyle;
    var drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle;

    var others = _objectWithoutProperties(_props, ['drawStyle']);

    var _Object$assign = Object.assign({
      fill: "none",
      stroke: "rgb(200,200,200)",
      strokeWidth: 1,
      fontSize: 5
    }, drawStyle);

    var _Object$assign$textSt = _Object$assign.textStroke;
    var textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt;

    var otherDrawStyle = _objectWithoutProperties(_Object$assign, ['textStroke']);

    return React.createElement(
      SvgIcon,
      others,
      React.createElement(
        'g',
        otherDrawStyle,
        React.createElement('circle', { cx: '18', cy: '4', r: '2' }),
        React.createElement('circle', { cx: '4', cy: '6', r: '3' }),
        React.createElement(
          'text',
          { x: '5', y: '20', stroke: textStroke },
          'C N B'
        ),
        React.createElement('path', { d: 'M 3.5208 10.2525 q 6.95554 7.98853 16.9068 -4.76903', fill: 'none' })
      )
    );
  }
});

module.exports = Logo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNLFFBQVEsUUFBUSxjQUFSLENBQVI7QUFDTixJQUFNLGtCQUFrQixNQUFNLE1BQU4sQ0FBYSxlQUFiOztlQUNSLFFBQVEsYUFBUjs7SUFBWDs7O0FBRUwsSUFBTSxPQUFPLE1BQU0sV0FBTixDQUFrQjs7OztBQUU3QixVQUFRLENBQUMsZUFBRCxDQUFSOztBQUVBLDRCQUFTO2lCQUN5QixLQUFLLEtBQUwsQ0FEekI7a0NBQ0EsVUFEQTtRQUNBLDZDQUFVLHNCQURWOztRQUNpQix5REFEakI7O3lCQUUyQyxPQUFPLE1BQVAsQ0FBYztBQUN0RCxZQUFLLE1BQUw7QUFDQSxjQUFPLGtCQUFQO0FBQ0EsbUJBQVksQ0FBWjtBQUNBLGdCQUFTLENBQVQ7S0FKd0MsRUFLMUMsU0FMMEMsRUFGM0M7OytDQUVBLFdBRkE7UUFFQSxtREFBVyxvQ0FGWDs7UUFFMkIsMEVBRjNCOztBQVNQLFdBQ0U7QUFBQyxhQUFEO01BQWEsTUFBYjtNQUNFOztRQUFPLGNBQVA7UUFDSSxnQ0FBUSxJQUFHLElBQUgsRUFBUSxJQUFHLEdBQUgsRUFBTyxHQUFFLEdBQUYsRUFBdkIsQ0FESjtRQUVJLGdDQUFRLElBQUcsR0FBSCxFQUFPLElBQUcsR0FBSCxFQUFPLEdBQUUsR0FBRixFQUF0QixDQUZKO1FBR0k7O1lBQU0sR0FBRSxHQUFGLEVBQU0sR0FBRSxJQUFGLEVBQU8sUUFBUSxVQUFSLEVBQW5COztTQUhKO1FBSUksOEJBQU0sR0FBRSxxREFBRixFQUF3RCxNQUFLLE1BQUwsRUFBOUQsQ0FKSjtPQURGO0tBREYsQ0FUTztHQUpvQjtDQUFsQixDQUFQOztBQTJCTixPQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoibG9nby5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbmNvbnN0IFB1cmVSZW5kZXJNaXhpbiA9IFJlYWN0LmFkZG9ucy5QdXJlUmVuZGVyTWl4aW47XHJcbnZhciB7U3ZnSWNvbn0gPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xyXG5cclxuY29uc3QgTG9nbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgICB2YXIge2RyYXdTdHlsZT17fSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgIHZhciB7dGV4dFN0cm9rZT1cImxpZ2h0Z3JheVwiLCAuLi5vdGhlckRyYXdTdHlsZX09T2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgICAgZmlsbDpcIm5vbmVcIixcclxuICAgICAgICAgICAgICBzdHJva2U6XCJyZ2IoMjAwLDIwMCwyMDApXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6MSxcclxuICAgICAgICAgICAgICBmb250U2l6ZTo1XHJcbiAgICAgICAgICB9LGRyYXdTdHlsZSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8U3ZnSWNvbiB7Li4ub3RoZXJzfT5cclxuICAgICAgICA8ZyB7Li4ub3RoZXJEcmF3U3R5bGV9PlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMThcIiBjeT1cIjRcIiByPVwiMlwiLz5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjRcIiBjeT1cIjZcIiByPVwiM1wiLz5cclxuICAgICAgICAgICAgPHRleHQgeD1cIjVcIiB5PVwiMjBcIiBzdHJva2U9e3RleHRTdHJva2V9PkMmbmJzcDtOJm5ic3A7QjwvdGV4dD5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0gMy41MjA4IDEwLjI1MjUgcSA2Ljk1NTU0IDcuOTg4NTMgMTYuOTA2OCAtNC43NjkwM1wiIGZpbGw9XCJub25lXCIvPlxyXG4gICAgICAgIDwvZz5cclxuICAgIDwvU3ZnSWNvbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvZ287XHJcbiJdfQ==