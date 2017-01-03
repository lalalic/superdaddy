"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getKnowledge = exports.getKnowledges = exports.getCurrentChildTarget = exports.getCurrentChildTasks = exports.getChild = exports.getCurrentChild = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _db = require("./db");

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
	var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "baby";

	var target = getCurrentChildTarget(state, domain);
	var _target$todos = target.todos,
	    todos = _target$todos === undefined ? [] : _target$todos;

	return todos;
};

var getCurrentChildTarget = exports.getCurrentChildTarget = function getCurrentChildTarget(state) {
	var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "baby";

	var child = getCurrentChild(state);
	if (child.targets && child.targets[domain]) return child.targets[domain];
	return {};
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

		if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50Q2hpbGQiLCJzdGF0ZSIsImVudGl0aWVzIiwiY2hpbGRyZW4iLCJzdXBlcmRhZGR5IiwiY2hpbGQiLCJlIiwiZ2V0Q2hpbGQiLCJpZCIsImdldEN1cnJlbnRDaGlsZFRhc2tzIiwiZG9tYWluIiwidGFyZ2V0IiwiZ2V0Q3VycmVudENoaWxkVGFyZ2V0IiwidG9kb3MiLCJ0YXJnZXRzIiwiZ2V0S25vd2xlZGdlcyIsImtleSIsInNjaGVtYSIsImdldEtleSIsImFsbCIsImlkcyIsInVpIiwia25vd2xlZGdlIiwia25vd2xlZGdlcyIsIm1hcCIsImdldEtub3dsZWRnZSIsInJvdXRpbmciLCJwYXJhbXMiLCJfaWQiLCJzZWxlY3RlZERvY3giLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVPLElBQU1BLDRDQUFnQixTQUFoQkEsZUFBZ0IsUUFBTztBQUNuQyxLQUFHO0FBQ0YsU0FBT0MsTUFBTUMsUUFBTixDQUFlQyxRQUFmLENBQXdCRixNQUFNRyxVQUFOLENBQWlCQyxLQUF6QyxDQUFQO0FBQ0EsRUFGRCxDQUVDLE9BQU1DLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FQTTs7QUFTQSxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTLENBQUNOLEtBQUQsRUFBT08sRUFBUCxFQUFZO0FBQ2pDLEtBQUc7QUFDRixTQUFPUCxNQUFNQyxRQUFOLENBQWVDLFFBQWYsQ0FBd0JLLEVBQXhCLENBQVA7QUFDQSxFQUZELENBRUMsT0FBTUYsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVBNOztBQVNBLElBQU1HLHNEQUFxQixTQUFyQkEsb0JBQXFCLENBQUNSLEtBQUQsRUFBdUI7QUFBQSxLQUFoQlMsTUFBZ0IsdUVBQVQsTUFBUzs7QUFDeEQsS0FBSUMsU0FBT0Msc0JBQXNCWCxLQUF0QixFQUE0QlMsTUFBNUIsQ0FBWDtBQUR3RCxxQkFFdkNDLE1BRnVDLENBRWpERSxLQUZpRDtBQUFBLEtBRWpEQSxLQUZpRCxpQ0FFM0MsRUFGMkM7O0FBR3hELFFBQU9BLEtBQVA7QUFDQSxDQUpNOztBQU1BLElBQU1ELHdEQUFzQixTQUF0QkEscUJBQXNCLENBQUNYLEtBQUQsRUFBdUI7QUFBQSxLQUFoQlMsTUFBZ0IsdUVBQVQsTUFBUzs7QUFDekQsS0FBTUwsUUFBTUwsZ0JBQWdCQyxLQUFoQixDQUFaO0FBQ0EsS0FBR0ksTUFBTVMsT0FBTixJQUFpQlQsTUFBTVMsT0FBTixDQUFjSixNQUFkLENBQXBCLEVBQ0MsT0FBT0wsTUFBTVMsT0FBTixDQUFjSixNQUFkLENBQVA7QUFDRCxRQUFPLEVBQVA7QUFDQSxDQUxNOztBQU9BLElBQU1LLHdDQUFjLFNBQWRBLGFBQWMsUUFBTztBQUNqQyxLQUFHO0FBQUE7QUFDRixPQUFNQyxNQUFJLGNBQVVDLE1BQVYsQ0FBaUJDLE1BQWpCLEVBQVY7QUFDQSxPQUFNQyxNQUFJbEIsTUFBTUMsUUFBTixDQUFlYyxHQUFmLENBQVY7QUFDQSxPQUFNSSxNQUFJbkIsTUFBTW9CLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQkMsVUFBN0I7QUFDQSxPQUFHSixPQUFPQyxHQUFWLEVBQ0M7QUFBQSxRQUFPQSxJQUFJSSxHQUFKLENBQVE7QUFBQSxhQUFJTCxJQUFJWCxFQUFKLENBQUo7QUFBQSxNQUFSO0FBQVA7QUFMQzs7QUFBQTtBQU1GLEVBTkQsQ0FNQyxPQUFNRixDQUFOLEVBQVEsQ0FFUjtBQUNELFFBQU8sRUFBUDtBQUNBLENBWE07O0FBYUEsSUFBTW1CLHNDQUFhLFNBQWJBLFlBQWEsUUFBTztBQUNoQyxLQUFHO0FBQ0YsTUFBTVQsTUFBSSxjQUFVQyxNQUFWLENBQWlCQyxNQUFqQixFQUFWO0FBQ0EsTUFBTUMsTUFBSWxCLE1BQU1DLFFBQU4sQ0FBZWMsR0FBZixDQUFWO0FBQ0EsTUFBTVIsS0FBR1AsTUFBTXlCLE9BQU4sQ0FBY0MsTUFBZCxDQUFxQkMsR0FBOUI7QUFDQSxNQUFNQyxlQUFhNUIsTUFBTW9CLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQk8sWUFBdEM7QUFDQSxNQUFHVixPQUFPWCxFQUFQLElBQWFXLElBQUlYLEVBQUosQ0FBaEIsRUFBd0I7QUFDdkIsT0FBR3FCLFlBQUgsRUFDQyxPQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBSVgsRUFBSixDQUFsQixFQUEyQnFCLGFBQWFQLFNBQXhDLENBQVAsQ0FERCxLQUdDLE9BQU9ILElBQUlYLEVBQUosQ0FBUDtBQUNEO0FBQ0QsRUFYRCxDQVdDLE9BQU1GLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FoQk0iLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGV9IGZyb20gJy4vZGInXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENoaWxkPXN0YXRlPT57XHJcblx0dHJ5e1xyXG5cdFx0cmV0dXJuIHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuW3N0YXRlLnN1cGVyZGFkZHkuY2hpbGRdXHJcblx0fWNhdGNoKGUpe1xyXG5cclxuXHR9XHJcblx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldENoaWxkPShzdGF0ZSxpZCk9PntcclxuXHR0cnl7XHJcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXMuY2hpbGRyZW5baWRdXHJcblx0fWNhdGNoKGUpe1xyXG5cclxuXHR9XHJcblx0cmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRDaGlsZFRhc2tzPShzdGF0ZSxkb21haW49XCJiYWJ5XCIpPT57XHJcblx0bGV0IHRhcmdldD1nZXRDdXJyZW50Q2hpbGRUYXJnZXQoc3RhdGUsZG9tYWluKVxyXG5cdGNvbnN0IHt0b2Rvcz1bXX09dGFyZ2V0XHJcblx0cmV0dXJuIHRvZG9zXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50Q2hpbGRUYXJnZXQ9KHN0YXRlLGRvbWFpbj1cImJhYnlcIik9PntcclxuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXHJcblx0aWYoY2hpbGQudGFyZ2V0cyAmJiBjaGlsZC50YXJnZXRzW2RvbWFpbl0pXHJcblx0XHRyZXR1cm4gY2hpbGQudGFyZ2V0c1tkb21haW5dXHJcblx0cmV0dXJuIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRLbm93bGVkZ2VzPXN0YXRlPT57XHJcblx0dHJ5e1xyXG5cdFx0Y29uc3Qga2V5PUtub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KClcclxuXHRcdGNvbnN0IGFsbD1zdGF0ZS5lbnRpdGllc1trZXldXHJcblx0XHRjb25zdCBpZHM9c3RhdGUudWkua25vd2xlZGdlLmtub3dsZWRnZXNcclxuXHRcdGlmKGFsbCAmJiBpZHMpXHJcblx0XHRcdHJldHVybiBpZHMubWFwKGlkPT5hbGxbaWRdKVxyXG5cdH1jYXRjaChlKXtcclxuXHJcblx0fVxyXG5cdHJldHVybiBbXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0S25vd2xlZGdlPXN0YXRlPT57XHJcblx0dHJ5e1xyXG5cdFx0Y29uc3Qga2V5PUtub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KClcclxuXHRcdGNvbnN0IGFsbD1zdGF0ZS5lbnRpdGllc1trZXldXHJcblx0XHRjb25zdCBpZD1zdGF0ZS5yb3V0aW5nLnBhcmFtcy5faWRcclxuXHRcdGNvbnN0IHNlbGVjdGVkRG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XHJcblx0XHRpZihhbGwgJiYgaWQgJiYgYWxsW2lkXSl7XHJcblx0XHRcdGlmKHNlbGVjdGVkRG9jeClcclxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWxsW2lkXSwgc2VsZWN0ZWREb2N4Lmtub3dsZWRnZSlcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBhbGxbaWRdXHJcblx0XHR9XHJcblx0fWNhdGNoKGUpe1xyXG5cclxuXHR9XHJcblx0cmV0dXJuIG51bGxcclxufVxyXG4iXX0=