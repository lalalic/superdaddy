"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = extract;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var document = function (_Any) {
    _inherits(document, _Any);

    function document() {
        _classCallCheck(this, document);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(document).apply(this, arguments));

        _this._children = [];
        _this.images = [];
        _this._id = "docx_" + Date.now();
        return _this;
    }

    _createClass(document, [{
        key: "html",
        get: function get() {
            return "<div id=\"" + this._id + "\">" + this._children.map(function (a) {
                return a.html;
            }).join("") + "</div>";
        }
    }, {
        key: "properties",
        get: function get() {
            return this.srcModel.wDoc.props;
        }
    }]);

    return document;
}(_docx4js.Visitor);

var Ignore = function (_Any2) {
    _inherits(Ignore, _Any2);

    function Ignore() {
        _classCallCheck(this, Ignore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Ignore).apply(this, arguments));
    }

    _createClass(Ignore, [{
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return true;
        }
    }]);

    return Ignore;
}(_docx4js.Visitor);

var Visitor = function (_Any3) {
    _inherits(Visitor, _Any3);

    function Visitor() {
        _classCallCheck(this, Visitor);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Visitor).apply(this, arguments));

        _this3._children = [];
        _this3.container = null;
        return _this3;
    }

    _createClass(Visitor, [{
        key: "findTypedParent",
        value: function findTypedParent() {
            var p = this.parent;

            for (var _len = arguments.length, Types = Array(_len), _key = 0; _key < _len; _key++) {
                Types[_key] = arguments[_key];
            }

            while (p) {
                if (Types.filter(function (Type) {
                    return p instanceof Type;
                }).length) return p;else p = p.parent;
            }
            throw new Error("Wrong structure: can not find container for a " + this.srcModel.type);
        }
    }, {
        key: "visit",
        value: function visit() {
            _get(Object.getPrototypeOf(Visitor.prototype), "visit", this).call(this);
            this.container._children.push(this);
        }
    }, {
        key: "html",
        get: function get() {
            if (!this.tag) return '';
            return "<" + this.tag + ">" + this._children.map(function (a) {
                return a.html;
            }).join("\r\n") + "</" + this.tag + ">";
        }
    }, {
        key: "text",
        get: function get() {
            return "" + this._children.map(function (a) {
                return a.text;
            }).join('');
        }
    }]);

    return Visitor;
}(_docx4js.Visitor);

/**
* [key:alt] is an editable region
*/


var paragraph = function (_Visitor) {
    _inherits(paragraph, _Visitor);

    function paragraph() {
        _classCallCheck(this, paragraph);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(paragraph).apply(this, arguments));

        _this4.tag = "p";
        _this4.container = _this4.findTypedParent(cell, document);
        return _this4;
    }

    _createClass(paragraph, [{
        key: "html",
        get: function get() {
            var text = this._children.map(function (a) {
                return a.html;
            }).join("").trim(),
                len = text.length;
            if (len > 1 && text[0] == '[' && text[len - 1] == ']') {
                //editable region
                var sep = text.indexOf(':'),
                    key,
                    alt;
                if (sep > 1) {
                    key = text.substring(1, sep);
                    alt = text.substring(sep + 1, len - 1);
                } else {
                    alt = key = text.substring(1, len - 1) || "__";
                }
                return Template.placeholder(key, alt);
            } else {
                return "<" + this.tag + ">" + text + "</" + this.tag + ">";
            }
        }
    }]);

    return paragraph;
}(Visitor);

var table = function (_Visitor2) {
    _inherits(table, _Visitor2);

    function table() {
        _classCallCheck(this, table);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(table).apply(this, arguments));

        _this5.tag = "table";
        _this5.container = _this5.findTypedParent(cell, document);
        return _this5;
    }

    return table;
}(Visitor);

var row = function (_Visitor3) {
    _inherits(row, _Visitor3);

    function row() {
        _classCallCheck(this, row);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(row).apply(this, arguments));

        _this6.tag = "tr";
        _this6.container = _this6.findTypedParent(table);
        return _this6;
    }

    return row;
}(Visitor);

var cell = function (_Visitor4) {
    _inherits(cell, _Visitor4);

    function cell() {
        _classCallCheck(this, cell);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(cell).apply(this, arguments));

        _this7.tag = "td";
        _this7.container = _this7.findTypedParent(row);
        return _this7;
    }

    return cell;
}(Visitor);

var text = function (_Visitor5) {
    _inherits(text, _Visitor5);

    function text() {
        _classCallCheck(this, text);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(text).apply(this, arguments));

        _this8.container = _this8.findTypedParent(hyperlink, paragraph);
        return _this8;
    }

    _createClass(text, [{
        key: "html",
        get: function get() {
            return this.text;
        }
    }, {
        key: "text",
        get: function get() {
            return this.srcModel.getText();
        }
    }]);

    return text;
}(Visitor);

var image = function (_Visitor6) {
    _inherits(image, _Visitor6);

    function image() {
        _classCallCheck(this, image);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(image).apply(this, arguments));

        _this9.container = _this9.findTypedParent(paragraph);
        _this9.data = _this9.srcModel.getImage();
        if (typeof _this9.data != 'string') {
            _this9.findTypedParent(document).images.push(_this9);
        }
        return _this9;
    }

    _createClass(image, [{
        key: "html",
        get: function get() {
            var alt = this.alt ? "alt=\"" + this.alt + "\"" : "";
            switch (_typeof(this.data)) {
                case 'string':
                    return "<img src=\"" + this.data + "\" " + alt + ">";
                default:
                    return "<img class=\"__revoking\" " + alt + " src=\"" + URL.createObjectURL(new Blob([this.data], { type: "image/*" })) + "\">";
            }
        }
    }, {
        key: "alt",
        get: function get() {
            return this.container.text;
        }
    }]);

    return image;
}(Visitor);

var hyperlink = function (_Visitor7) {
    _inherits(hyperlink, _Visitor7);

    function hyperlink() {
        _classCallCheck(this, hyperlink);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(hyperlink).apply(this, arguments));

        _this10.container = _this10.findTypedParent(paragraph);
        return _this10;
    }

    _createClass(hyperlink, [{
        key: "html",
        get: function get() {
            var text = this.text.trim().toLowerCase();
            if ('buy' == text || '买' == text) {
                return "<a class=\"buy\" target=\"buy\" href=\"" + this.link + "\">" + text + "</a>";
            } else {
                return text;
            }
        }
    }, {
        key: "link",
        get: function get() {
            return this.srcModel.getLink();
        }
    }]);

    return hyperlink;
}(Visitor);

hyperlink.BUY = /[(buy|买]/;

var Non_Content_Properties = "title,keywords,category,abstract,subject".split(',');

var documentProperty = function (_Visitor8) {
    _inherits(documentProperty, _Visitor8);

    function documentProperty() {
        _classCallCheck(this, documentProperty);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(documentProperty).apply(this, arguments));
    }

    _createClass(documentProperty, [{
        key: "visit",
        value: function visit() {}
    }, {
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return Non_Content_Properties.indexOf(this.srcModel.key) != -1;
        }
    }]);

    return documentProperty;
}(Visitor);

var factory = _docx4js2.default.createVisitorFactory({ document: document, documentProperty: documentProperty, paragraph: paragraph, table: table, row: row, cell: cell, text: text, image: image,
    hyperlink: hyperlink, heading: paragraph, header: Ignore, footer: Ignore, documentStyles: Ignore });

function extract(file) {
    return _docx4js2.default.load(file).then(function (docx) {
        var doc = docx.parse(factory);
        var content = doc.html;
        var properties = doc.properties;
        var elId = doc.id;
        var images = doc.images;
        var name = properties.name;
        var title = properties.title;
        var keywords = properties.keywords;
        var category = properties.category;
        var subject = properties.subject;
        var abstract = properties.abstract;
        var description = properties.description;

        var others = _objectWithoutProperties(properties, ["name", "title", "keywords", "category", "subject", "abstract", "description"]);

        return {
            knowledge: {
                content: content,
                title: title || name,
                summary: abstract || description || subject,
                keywords: keywords, category: category,
                props: others
            },
            revoke: function revoke() {
                var nodes = window.document.querySelectorAll("#" + elId + " img.__revoking");
                Array.prototype.forEach.call(nodes, function (a) {
                    return URL.revokeObjectURL(a.src);
                });
            },
            getPhotos: function getPhotos() {
                return Array.prototype.map.call(window.document.querySelectorAll("#" + elId + " img"), function (a) {
                    return a.src;
                });
            },
            upload: function upload(entity) {
                var _this12 = this;

                var _require = require('qili-app');

                var File = _require.File;
                var kind = require('./db/Knowledge')._name;
                var more = { entity: { kind: kind, _id: entity._id } };
                return new Promise(function (resolve, reject) {
                    return File.find({ params: more, fields: "crc32" }).fetch(function (files) {
                        var pImages = images.map(function (image) {
                            var data = image.data,
                                crc32 = data.crc32;
                            if (files.find(function (a) {
                                return a.crc32 == crc32;
                            })) return undefined;

                            return File.upload(data, "image", Object.assign({ crc32: crc32, key: "a.jpg" }, more)).then(function (url) {
                                return image.data = url;
                            });
                        }).filter(function (a) {
                            return a;
                        });

                        var pRawDocx = File.upload(file, "docx", Object.assign({ key: "a.docx" }, more));

                        Promise.all([pRawDocx].concat(_toConsumableArray(pImages))).then(function () {
                            resolve(_this12.knowledge.content = doc.html);
                        }, reject);
                    });
                } //fetch
                ); //promise
            }
        };
    });
}

var Template = function () {
    function Template(html) {
        _classCallCheck(this, Template);

        this.contents = [];
        var matcher,
            lastIndex = 0,
            reg = Template.reg,
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

Template.reg = /<editable\s+key="(.*?)">(.*?)<\/editable>/gm;

extract.Template = Template;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUF0Qjs7SUFtRFQ7QUFDRixhQURFLFFBQ0YsQ0FBWSxJQUFaLEVBQWlCOzhCQURmLFVBQ2U7O0FBQ2IsYUFBSyxRQUFMLEdBQWMsRUFBZCxDQURhO0FBRWIsWUFBSSxPQUFKO1lBQWEsWUFBVSxDQUFWO1lBQWEsTUFBSSxTQUFTLEdBQVQ7WUFBYyxNQUFJLEtBQUssTUFBTCxDQUZuQztBQUdiLFlBQUksYUFBSixFQUFrQixHQUFsQixFQUF1QixHQUF2QixDQUhhO0FBSWIsZUFBTSxDQUFDLFVBQVEsSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFSLENBQUQsSUFBMEIsSUFBMUIsRUFBK0I7QUFDakMsNEJBQWMsS0FBSyxTQUFMLENBQWUsU0FBZixFQUF5QixRQUFRLEtBQVIsQ0FBdkMsQ0FEaUM7QUFFakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FGaUM7QUFHakMsa0JBQUksUUFBUSxDQUFSLENBQUosQ0FIaUM7QUFJakMsd0JBQVUsSUFBSSxTQUFKLENBSnVCO0FBS2pDLGdCQUFHLGFBQUgsRUFDSSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLGFBQW5CLEVBREo7QUFFQSxnQkFBRyxPQUFPLEdBQVAsRUFDQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQUMsUUFBRCxFQUFLLFFBQUwsRUFBbkIsRUFESjtTQVBKOztBQVdBLFlBQUcsYUFBVyxNQUFJLENBQUosRUFDVixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBeUIsR0FBekIsQ0FBbkIsRUFESjtLQWZKOztpQkFERTs7b0NBb0JpQixLQUFJLEtBQUk7QUFDdkIsd0NBQXlCLGNBQVEsbUJBQWpDLENBRHVCOzs7O1dBcEJ6Qjs7O0FBd0JOLFNBQVMsR0FBVCxHQUFhLDZDQUFiOztBQUVBLFFBQVEsUUFBUixHQUFpQixRQUFqQiIsImZpbGUiOiJleHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRE9DWCAsIHtWaXNpdG9yIGFzIEFueX1mcm9tIFwiZG9jeDRqc1wiXHJcblxyXG5jbGFzcyBkb2N1bWVudCBleHRlbmRzIEFueXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuPVtdXHJcbiAgICAgICAgdGhpcy5pbWFnZXM9W11cclxuICAgICAgICB0aGlzLl9pZD1gZG9jeF8ke0RhdGUubm93KCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiJHt0aGlzLl9pZH1cIj4ke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEuaHRtbCkuam9pbihcIlwiKX08L2Rpdj5gXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXQgcHJvcGVydGllcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNyY01vZGVsLndEb2MucHJvcHNcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSWdub3JlIGV4dGVuZHMgQW55e1xyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFZpc2l0b3IgZXh0ZW5kcyBBbnl7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbj1bXVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPW51bGxcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVHlwZWRQYXJlbnQoLi4uVHlwZXMpe1xyXG4gICAgICAgIHZhciBwPXRoaXMucGFyZW50XHJcbiAgICAgICAgd2hpbGUocCl7XHJcbiAgICAgICAgICAgIGlmKFR5cGVzLmZpbHRlcigoVHlwZSk9PnAgaW5zdGFuY2VvZiBUeXBlKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwPXAucGFyZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHN0cnVjdHVyZTogY2FuIG5vdCBmaW5kIGNvbnRhaW5lciBmb3IgYSBcIit0aGlzLnNyY01vZGVsLnR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgdmlzaXQoKXtcclxuICAgICAgICBzdXBlci52aXNpdCgpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuX2NoaWxkcmVuLnB1c2godGhpcylcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnRhZylcclxuICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLnRhZ30+JHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcXHJcXG5cIil9PC8ke3RoaXMudGFnfT5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS50ZXh0KS5qb2luKCcnKX1gXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuKiBba2V5OmFsdF0gaXMgYW4gZWRpdGFibGUgcmVnaW9uXHJcbiovXHJcbmNsYXNzIHBhcmFncmFwaCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInBcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KGNlbGwsIGRvY3VtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgdmFyIHRleHQ9dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXCIpLnRyaW0oKSxsZW49dGV4dC5sZW5ndGhcclxuICAgICAgICBpZihsZW4+MSAmJiB0ZXh0WzBdPT0nWycgJiYgdGV4dFtsZW4tMV09PSddJyl7Ly9lZGl0YWJsZSByZWdpb25cclxuICAgICAgICAgICAgdmFyIHNlcD10ZXh0LmluZGV4T2YoJzonKSwga2V5LCBhbHQ7XHJcbiAgICAgICAgICAgIGlmKHNlcD4xKXtcclxuICAgICAgICAgICAgICAgIGtleT10ZXh0LnN1YnN0cmluZygxLHNlcClcclxuICAgICAgICAgICAgICAgIGFsdD10ZXh0LnN1YnN0cmluZyhzZXArMSxsZW4tMSlcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWx0PWtleT0odGV4dC5zdWJzdHJpbmcoMSxsZW4tMSl8fFwiX19cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVGVtcGxhdGUucGxhY2Vob2xkZXIoa2V5LCBhbHQpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfT4ke3RleHR9PC8ke3RoaXMudGFnfT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgdGFibGUgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJ0YWJsZVwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoY2VsbCwgZG9jdW1lbnQpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIHJvdyBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInRyXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudCh0YWJsZSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgY2VsbCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInRkXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChyb3cpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIHRleHQgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoaHlwZXJsaW5rLCBwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRUZXh0KClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgaW1hZ2UgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQocGFyYWdyYXBoKVxyXG4gICAgICAgIHRoaXMuZGF0YT10aGlzLnNyY01vZGVsLmdldEltYWdlKClcclxuICAgICAgICBpZih0eXBlb2YodGhpcy5kYXRhKSE9J3N0cmluZycpe1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRUeXBlZFBhcmVudChkb2N1bWVudCkuaW1hZ2VzLnB1c2godGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBsZXQgYWx0PXRoaXMuYWx0ID8gYGFsdD1cIiR7dGhpcy5hbHR9XCJgIDogXCJcIlxyXG4gICAgICAgIHN3aXRjaCh0eXBlb2YodGhpcy5kYXRhKSl7XHJcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7dGhpcy5kYXRhfVwiICR7YWx0fT5gXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiX19yZXZva2luZ1wiICR7YWx0fSBzcmM9XCIke1VSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3RoaXMuZGF0YV0se3R5cGU6XCJpbWFnZS8qXCJ9KSl9XCI+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWx0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnRleHRcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIGh5cGVybGluayBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICB2YXIgdGV4dD10aGlzLnRleHQudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICBpZignYnV5Jz09dGV4dHx8J+S5sCc9PXRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwiYnV5XCIgdGFyZ2V0PVwiYnV5XCIgaHJlZj1cIiR7dGhpcy5saW5rfVwiPiR7dGV4dH08L2E+YFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxpbmsoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRMaW5rKClcclxuICAgIH1cclxufVxyXG5oeXBlcmxpbmsuQlVZPS9bKGJ1eXzkubBdL1xyXG5cclxudmFyIE5vbl9Db250ZW50X1Byb3BlcnRpZXM9XCJ0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeSxhYnN0cmFjdCxzdWJqZWN0XCIuc3BsaXQoJywnKVxyXG5jbGFzcyBkb2N1bWVudFByb3BlcnR5IGV4dGVuZHMgVmlzaXRvcntcclxuICAgIHZpc2l0KCl7fVxyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiBOb25fQ29udGVudF9Qcm9wZXJ0aWVzLmluZGV4T2YodGhpcy5zcmNNb2RlbC5rZXkpIT0tMVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZmFjdG9yeT1ET0NYLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KHtkb2N1bWVudCxkb2N1bWVudFByb3BlcnR5LHBhcmFncmFwaCwgdGFibGUsIHJvdywgY2VsbCwgdGV4dCxpbWFnZSxcclxuICAgICAgICBoeXBlcmxpbmssIGhlYWRpbmc6cGFyYWdyYXBoLCBoZWFkZXI6SWdub3JlLCBmb290ZXI6SWdub3JlLCBkb2N1bWVudFN0eWxlczogSWdub3JlfSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dHJhY3QoZmlsZSl7XHJcbiAgICByZXR1cm4gRE9DWC5sb2FkKGZpbGUpLnRoZW4oKGRvY3gpPT57XHJcblxyXG4gICAgICAgIHZhciBkb2M9ZG9jeC5wYXJzZShmYWN0b3J5KSxcclxuICAgICAgICAgICAge2h0bWw6Y29udGVudCwgcHJvcGVydGllcywgaWQ6ZWxJZCwgaW1hZ2VzfT1kb2MsXHJcbiAgICAgICAgICAgIHtuYW1lLHRpdGxlLCBrZXl3b3JkcywgY2F0ZWdvcnksIHN1YmplY3QsIGFic3RyYWN0LGRlc2NyaXB0aW9uLCAuLi5vdGhlcnN9PXByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga25vd2xlZGdlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6dGl0bGV8fG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OmFic3RyYWN0fHxkZXNjcmlwdGlvbnx8c3ViamVjdCxcclxuICAgICAgICAgICAgICAgIGtleXdvcmRzLGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6b3RoZXJzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJldm9rZSgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzPXdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtlbElkfSBpbWcuX19yZXZva2luZ2ApXHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCAoYSk9PlVSTC5yZXZva2VPYmplY3RVUkwoYS5zcmMpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQaG90b3MoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwod2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2VsSWR9IGltZ2ApLChhKT0+YS5zcmMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZChlbnRpdHkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHtGaWxlfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ9cmVxdWlyZSgnLi9kYi9Lbm93bGVkZ2UnKS5fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3JlPXtlbnRpdHk6e2tpbmQsX2lkOmVudGl0eS5faWR9fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBGaWxlLmZpbmQoe3BhcmFtczptb3JlLGZpZWxkczpcImNyYzMyXCJ9KS5mZXRjaCgoZmlsZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSW1hZ2VzPWltYWdlcy5tYXAoKGltYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE9aW1hZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmMzMj1kYXRhLmNyYzMyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXMuZmluZCgoYSk9PmEuY3JjMzI9PWNyYzMyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlLnVwbG9hZChkYXRhLCBcImltYWdlXCIsIE9iamVjdC5hc3NpZ24oe2NyYzMyLGtleTpcImEuanBnXCJ9LG1vcmUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1cmwpPT5pbWFnZS5kYXRhPXVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmlsdGVyKChhKT0+YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwUmF3RG9jeD1GaWxlLnVwbG9hZChmaWxlLFwiZG9jeFwiLCBPYmplY3QuYXNzaWduKHtrZXk6XCJhLmRvY3hcIn0sbW9yZSkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbcFJhd0RvY3gsIC4uLnBJbWFnZXNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmtub3dsZWRnZS5jb250ZW50PWRvYy5odG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICB9KS8vZmV0Y2hcclxuICAgICAgICAgICAgICAgICkvL3Byb21pc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNsYXNzIFRlbXBsYXRle1xyXG4gICAgY29uc3RydWN0b3IoaHRtbCl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50cz1bXVxyXG4gICAgICAgIHZhciBtYXRjaGVyLCBsYXN0SW5kZXg9MCwgcmVnPVRlbXBsYXRlLnJlZywgbGVuPWh0bWwubGVuZ3RoXHJcbiAgICAgICAgdmFyIHN0YXRpY0NvbnRlbnQsa2V5LCBhbHRcclxuICAgICAgICB3aGlsZSgobWF0Y2hlcj1yZWcuZXhlYyhodG1sKSkhPW51bGwpe1xyXG4gICAgICAgICAgICBzdGF0aWNDb250ZW50PWh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCxtYXRjaGVyLmluZGV4KVxyXG4gICAgICAgICAgICBrZXk9bWF0Y2hlclsxXVxyXG4gICAgICAgICAgICBhbHQ9bWF0Y2hlclsyXVxyXG4gICAgICAgICAgICBsYXN0SW5kZXg9cmVnLmxhc3RJbmRleFxyXG4gICAgICAgICAgICBpZihzdGF0aWNDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKHN0YXRpY0NvbnRlbnQpXHJcbiAgICAgICAgICAgIGlmKGtleSB8fCBhbHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRzLnB1c2goe2tleSxhbHR9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobGFzdEluZGV4IT1sZW4tMSlcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50cy5wdXNoKGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCxsZW4pKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGFjZWhvbGRlcihrZXksYWx0KXtcclxuICAgICAgICByZXR1cm4gYDxlZGl0YWJsZSBrZXk9XCIke2tleX1cIj4ke2FsdH08L2VkaXRhYmxlPmBcclxuICAgIH1cclxufVxyXG5UZW1wbGF0ZS5yZWc9LzxlZGl0YWJsZVxccytrZXk9XCIoLio/KVwiPiguKj8pPFxcL2VkaXRhYmxlPi9nbVxyXG5cclxuZXh0cmFjdC5UZW1wbGF0ZT1UZW1wbGF0ZVxyXG4iXX0=