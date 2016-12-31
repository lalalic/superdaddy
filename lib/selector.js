'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getKnowledge = exports.getKnowledges = exports.getCurrentChildTasks = exports.getChild = exports.getCurrentChild = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _db = require('./db');

var getCurrentChild = exports.getCurrentChild = function getCurrentChild(state) {
	try {
		return state.entities.children[state.superdaddy.child];
	} catch (e) {}
	return null;
};

var getChild = exports.getChild = function getChild(state, id) {
	try {
		return state.entities.children[id];
	} catch (e) {}
	return null;
};

var getCurrentChildTasks = exports.getCurrentChildTasks = function getCurrentChildTasks(state) {
	var child = getCurrentChild(state);
	var _child$todos = child.todos,
	    todos = _child$todos === undefined ? [] : _child$todos;

	return todos;
};

var getKnowledges = exports.getKnowledges = function getKnowledges(state) {
	try {
		var _ret = function () {
			var key = _db.Knowledge.schema.getKey();
			var all = state.entities[key];
			var ids = state.ui.knowledge.knowledges;
			if (all && ids) return {
					v: ids.map(function (id) {
						return all[id];
					})
				};
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	} catch (e) {}
	return [];
};

var getKnowledge = exports.getKnowledge = function getKnowledge(state) {
	try {
		var key = _db.Knowledge.schema.getKey();
		var all = state.entities[key];
		var id = state.routing.params._id;
		var selectedDocx = state.ui.knowledge.selectedDocx;
		if (all && id && all[id]) {
			if (selectedDocx) return Object.assign({}, all[id], selectedDocx.knowledge);else return all[id];
		}
	} catch (e) {}
	return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50Q2hpbGQiLCJzdGF0ZSIsImVudGl0aWVzIiwiY2hpbGRyZW4iLCJzdXBlcmRhZGR5IiwiY2hpbGQiLCJlIiwiZ2V0Q2hpbGQiLCJpZCIsImdldEN1cnJlbnRDaGlsZFRhc2tzIiwidG9kb3MiLCJnZXRLbm93bGVkZ2VzIiwia2V5Iiwic2NoZW1hIiwiZ2V0S2V5IiwiYWxsIiwiaWRzIiwidWkiLCJrbm93bGVkZ2UiLCJrbm93bGVkZ2VzIiwibWFwIiwiZ2V0S25vd2xlZGdlIiwicm91dGluZyIsInBhcmFtcyIsIl9pZCIsInNlbGVjdGVkRG9jeCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRU8sSUFBTUEsNENBQWdCLFNBQWhCQSxlQUFnQixRQUFPO0FBQ25DLEtBQUc7QUFDRixTQUFPQyxNQUFNQyxRQUFOLENBQWVDLFFBQWYsQ0FBd0JGLE1BQU1HLFVBQU4sQ0FBaUJDLEtBQXpDLENBQVA7QUFDQSxFQUZELENBRUMsT0FBTUMsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVBNOztBQVNBLElBQU1DLDhCQUFTLFNBQVRBLFFBQVMsQ0FBQ04sS0FBRCxFQUFPTyxFQUFQLEVBQVk7QUFDakMsS0FBRztBQUNGLFNBQU9QLE1BQU1DLFFBQU4sQ0FBZUMsUUFBZixDQUF3QkssRUFBeEIsQ0FBUDtBQUNBLEVBRkQsQ0FFQyxPQUFNRixDQUFOLEVBQVEsQ0FFUjtBQUNELFFBQU8sSUFBUDtBQUNBLENBUE07O0FBU0EsSUFBTUcsc0RBQXFCLFNBQXJCQSxvQkFBcUIsUUFBTztBQUN4QyxLQUFJSixRQUFNTCxnQkFBZ0JDLEtBQWhCLENBQVY7QUFEd0Msb0JBRXZCSSxLQUZ1QixDQUVqQ0ssS0FGaUM7QUFBQSxLQUVqQ0EsS0FGaUMsZ0NBRTNCLEVBRjJCOztBQUd4QyxRQUFPQSxLQUFQO0FBQ0EsQ0FKTTs7QUFNQSxJQUFNQyx3Q0FBYyxTQUFkQSxhQUFjLFFBQU87QUFDakMsS0FBRztBQUFBO0FBQ0YsT0FBTUMsTUFBSSxjQUFVQyxNQUFWLENBQWlCQyxNQUFqQixFQUFWO0FBQ0EsT0FBTUMsTUFBSWQsTUFBTUMsUUFBTixDQUFlVSxHQUFmLENBQVY7QUFDQSxPQUFNSSxNQUFJZixNQUFNZ0IsRUFBTixDQUFTQyxTQUFULENBQW1CQyxVQUE3QjtBQUNBLE9BQUdKLE9BQU9DLEdBQVYsRUFDQztBQUFBLFFBQU9BLElBQUlJLEdBQUosQ0FBUTtBQUFBLGFBQUlMLElBQUlQLEVBQUosQ0FBSjtBQUFBLE1BQVI7QUFBUDtBQUxDOztBQUFBO0FBTUYsRUFORCxDQU1DLE9BQU1GLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxFQUFQO0FBQ0EsQ0FYTTs7QUFhQSxJQUFNZSxzQ0FBYSxTQUFiQSxZQUFhLFFBQU87QUFDaEMsS0FBRztBQUNGLE1BQU1ULE1BQUksY0FBVUMsTUFBVixDQUFpQkMsTUFBakIsRUFBVjtBQUNBLE1BQU1DLE1BQUlkLE1BQU1DLFFBQU4sQ0FBZVUsR0FBZixDQUFWO0FBQ0EsTUFBTUosS0FBR1AsTUFBTXFCLE9BQU4sQ0FBY0MsTUFBZCxDQUFxQkMsR0FBOUI7QUFDQSxNQUFNQyxlQUFheEIsTUFBTWdCLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQk8sWUFBdEM7QUFDQSxNQUFHVixPQUFPUCxFQUFQLElBQWFPLElBQUlQLEVBQUosQ0FBaEIsRUFBd0I7QUFDdkIsT0FBR2lCLFlBQUgsRUFDQyxPQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBSVAsRUFBSixDQUFsQixFQUEyQmlCLGFBQWFQLFNBQXhDLENBQVAsQ0FERCxLQUdDLE9BQU9ILElBQUlQLEVBQUosQ0FBUDtBQUNEO0FBQ0QsRUFYRCxDQVdDLE9BQU1GLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FoQk0iLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGV9IGZyb20gJy4vZGInXG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50Q2hpbGQ9c3RhdGU9Pntcblx0dHJ5e1xuXHRcdHJldHVybiBzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbltzdGF0ZS5zdXBlcmRhZGR5LmNoaWxkXVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2hpbGQ9KHN0YXRlLGlkKT0+e1xuXHR0cnl7XG5cdFx0cmV0dXJuIHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuW2lkXVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENoaWxkVGFza3M9c3RhdGU9Pntcblx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0Y29uc3Qge3RvZG9zPVtdfT1jaGlsZFxuXHRyZXR1cm4gdG9kb3Ncbn1cblxuZXhwb3J0IGNvbnN0IGdldEtub3dsZWRnZXM9c3RhdGU9Pntcblx0dHJ5e1xuXHRcdGNvbnN0IGtleT1Lbm93bGVkZ2Uuc2NoZW1hLmdldEtleSgpXG5cdFx0Y29uc3QgYWxsPXN0YXRlLmVudGl0aWVzW2tleV1cblx0XHRjb25zdCBpZHM9c3RhdGUudWkua25vd2xlZGdlLmtub3dsZWRnZXNcblx0XHRpZihhbGwgJiYgaWRzKVxuXHRcdFx0cmV0dXJuIGlkcy5tYXAoaWQ9PmFsbFtpZF0pXG5cdH1jYXRjaChlKXtcblxuXHR9XG5cdHJldHVybiBbXVxufVxuXG5leHBvcnQgY29uc3QgZ2V0S25vd2xlZGdlPXN0YXRlPT57XG5cdHRyeXtcblx0XHRjb25zdCBrZXk9S25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKVxuXHRcdGNvbnN0IGFsbD1zdGF0ZS5lbnRpdGllc1trZXldXG5cdFx0Y29uc3QgaWQ9c3RhdGUucm91dGluZy5wYXJhbXMuX2lkXG5cdFx0Y29uc3Qgc2VsZWN0ZWREb2N4PXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRpZihhbGwgJiYgaWQgJiYgYWxsW2lkXSl7XG5cdFx0XHRpZihzZWxlY3RlZERvY3gpXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBhbGxbaWRdLCBzZWxlY3RlZERvY3gua25vd2xlZGdlKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gYWxsW2lkXVxuXHRcdH1cblx0fWNhdGNoKGUpe1xuXG5cdH1cblx0cmV0dXJuIG51bGxcbn1cbiJdfQ==