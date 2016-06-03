"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
    function Template(html) {
        _classCallCheck(this, Template);

        this.contents = [];
        var matcher,
            lastIndex = 0,
            reg = this.constructor.EDITABLE_REG,
            len = html.length;
        var staticContent, key, alt;
        while ((matcher = reg.exec(html)) != null) {
            staticContent = html.substring(lastIndex, matcher.index);
            key = matcher[1];
            alt = matcher[2];
            lastIndex = reg.lastIndex;
            if (staticContent) this.contents.push(staticContent);
            if (key || alt) this.contents.push({ key: key, alt: alt });
        }

        if (lastIndex != len - 1) this.contents.push(html.substring(lastIndex, len));
    }

    _createClass(Template, null, [{
        key: "placeholder",
        value: function placeholder(key, alt) {
            return "<editable key=\"" + key + "\">" + alt + "</editable>";
        }
    }]);

    return Template;
}();

Template.EDITABLE_REG = /<editable\s+key="(.*?)">(.*?)<\/editable>/gm;
exports.default = Template;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvdGVtcGxhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQjtBQUNqQixhQURpQixRQUNqQixDQUFZLElBQVosRUFBaUI7OEJBREEsVUFDQTs7QUFDYixhQUFLLFFBQUwsR0FBYyxFQUFkLENBRGE7QUFFYixZQUFJLE9BQUo7WUFBYSxZQUFVLENBQVY7WUFBYSxNQUFJLEtBQUssV0FBTCxDQUFpQixZQUFqQjtZQUErQixNQUFJLEtBQUssTUFBTCxDQUZwRDtBQUdiLFlBQUksYUFBSixFQUFrQixHQUFsQixFQUF1QixHQUF2QixDQUhhO0FBSWIsZUFBTSxDQUFDLFVBQVEsSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFSLENBQUQsSUFBMEIsSUFBMUIsRUFBK0I7QUFDakMsNEJBQWMsS0FBSyxTQUFMLENBQWUsU0FBZixFQUF5QixRQUFRLEtBQVIsQ0FBdkMsQ0FEaUM7QUFFakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FGaUM7QUFHakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FIaUM7QUFJakMsd0JBQVUsSUFBSSxTQUFKLENBSnVCO0FBS2pDLGdCQUFHLGFBQUgsRUFDSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLGFBQW5CLEVBREo7QUFFQSxnQkFBRyxPQUFPLEdBQVAsRUFDQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQUMsUUFBRCxFQUFLLFFBQUwsRUFBbkIsRUFESjtTQVBKOztBQVdBLFlBQUcsYUFBVyxNQUFJLENBQUosRUFDVixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBeUIsR0FBekIsQ0FBbkIsRUFESjtLQWZKOztpQkFEaUI7O29DQW9CRSxLQUFJLEtBQUk7QUFDdkIsd0NBQXlCLGNBQVEsbUJBQWpDLENBRHVCOzs7O1dBcEJWOzs7U0F3QmIsZUFBYTtrQkF4QkEiLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZXtcclxuICAgIGNvbnN0cnVjdG9yKGh0bWwpe1xyXG4gICAgICAgIHRoaXMuY29udGVudHM9W11cclxuICAgICAgICB2YXIgbWF0Y2hlciwgbGFzdEluZGV4PTAsIHJlZz10aGlzLmNvbnN0cnVjdG9yLkVESVRBQkxFX1JFRywgbGVuPWh0bWwubGVuZ3RoXHJcbiAgICAgICAgdmFyIHN0YXRpY0NvbnRlbnQsa2V5LCBhbHRcclxuICAgICAgICB3aGlsZSgobWF0Y2hlcj1yZWcuZXhlYyhodG1sKSkhPW51bGwpe1xyXG4gICAgICAgICAgICBzdGF0aWNDb250ZW50PWh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCxtYXRjaGVyLmluZGV4KVxyXG4gICAgICAgICAgICBrZXk9bWF0Y2hlclsxXVxyXG4gICAgICAgICAgICBhbHQ9bWF0Y2hlclsyXVxyXG4gICAgICAgICAgICBsYXN0SW5kZXg9cmVnLmxhc3RJbmRleFxyXG4gICAgICAgICAgICBpZihzdGF0aWNDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKHN0YXRpY0NvbnRlbnQpXHJcbiAgICAgICAgICAgIGlmKGtleSB8fCBhbHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRzLnB1c2goe2tleSxhbHR9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobGFzdEluZGV4IT1sZW4tMSlcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCxsZW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGFjZWhvbGRlcihrZXksYWx0KXtcclxuICAgICAgICByZXR1cm4gYDxlZGl0YWJsZSBrZXk9XCIke2tleX1cIj4ke2FsdH08L2VkaXRhYmxlPmBcclxuICAgIH1cclxuXHJcblx0c3RhdGljIEVESVRBQkxFX1JFRz0vPGVkaXRhYmxlXFxzK2tleT1cIiguKj8pXCI+KC4qPyk8XFwvZWRpdGFibGU+L2dtXHJcbn1cclxuIl19