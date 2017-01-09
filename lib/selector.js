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
	if (child && child.targets && child.targets[domain]) return child.targets[domain];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50Q2hpbGQiLCJzdGF0ZSIsImVudGl0aWVzIiwiY2hpbGRyZW4iLCJzdXBlcmRhZGR5IiwiY2hpbGQiLCJlIiwiZ2V0Q2hpbGQiLCJpZCIsImdldEN1cnJlbnRDaGlsZFRhc2tzIiwiZG9tYWluIiwidGFyZ2V0IiwiZ2V0Q3VycmVudENoaWxkVGFyZ2V0IiwidG9kb3MiLCJ0YXJnZXRzIiwiZ2V0S25vd2xlZGdlcyIsImtleSIsInNjaGVtYSIsImdldEtleSIsImFsbCIsImlkcyIsInVpIiwia25vd2xlZGdlIiwia25vd2xlZGdlcyIsIm1hcCIsImdldEtub3dsZWRnZSIsInJvdXRpbmciLCJwYXJhbXMiLCJfaWQiLCJzZWxlY3RlZERvY3giLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVPLElBQU1BLDRDQUFnQixTQUFoQkEsZUFBZ0IsUUFBTztBQUNuQyxLQUFHO0FBQ0YsU0FBT0MsTUFBTUMsUUFBTixDQUFlQyxRQUFmLENBQXdCRixNQUFNRyxVQUFOLENBQWlCQyxLQUF6QyxDQUFQO0FBQ0EsRUFGRCxDQUVDLE9BQU1DLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FQTTs7QUFTQSxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTLENBQUNOLEtBQUQsRUFBT08sRUFBUCxFQUFZO0FBQ2pDLEtBQUc7QUFDRixTQUFPUCxNQUFNQyxRQUFOLENBQWVDLFFBQWYsQ0FBd0JLLEVBQXhCLENBQVA7QUFDQSxFQUZELENBRUMsT0FBTUYsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVBNOztBQVNBLElBQU1HLHNEQUFxQixTQUFyQkEsb0JBQXFCLENBQUNSLEtBQUQsRUFBdUI7QUFBQSxLQUFoQlMsTUFBZ0IsdUVBQVQsTUFBUzs7QUFDeEQsS0FBSUMsU0FBT0Msc0JBQXNCWCxLQUF0QixFQUE0QlMsTUFBNUIsQ0FBWDtBQUR3RCxxQkFFdkNDLE1BRnVDLENBRWpERSxLQUZpRDtBQUFBLEtBRWpEQSxLQUZpRCxpQ0FFM0MsRUFGMkM7O0FBR3hELFFBQU9BLEtBQVA7QUFDQSxDQUpNOztBQU1BLElBQU1ELHdEQUFzQixTQUF0QkEscUJBQXNCLENBQUNYLEtBQUQsRUFBdUI7QUFBQSxLQUFoQlMsTUFBZ0IsdUVBQVQsTUFBUzs7QUFDekQsS0FBTUwsUUFBTUwsZ0JBQWdCQyxLQUFoQixDQUFaO0FBQ0EsS0FBR0ksU0FBU0EsTUFBTVMsT0FBZixJQUEwQlQsTUFBTVMsT0FBTixDQUFjSixNQUFkLENBQTdCLEVBQ0MsT0FBT0wsTUFBTVMsT0FBTixDQUFjSixNQUFkLENBQVA7QUFDRCxRQUFPLEVBQVA7QUFDQSxDQUxNOztBQU9BLElBQU1LLHdDQUFjLFNBQWRBLGFBQWMsUUFBTztBQUNqQyxLQUFHO0FBQUE7QUFDRixPQUFNQyxNQUFJLGNBQVVDLE1BQVYsQ0FBaUJDLE1BQWpCLEVBQVY7QUFDQSxPQUFNQyxNQUFJbEIsTUFBTUMsUUFBTixDQUFlYyxHQUFmLENBQVY7QUFDQSxPQUFNSSxNQUFJbkIsTUFBTW9CLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQkMsVUFBN0I7QUFDQSxPQUFHSixPQUFPQyxHQUFWLEVBQ0M7QUFBQSxRQUFPQSxJQUFJSSxHQUFKLENBQVE7QUFBQSxhQUFJTCxJQUFJWCxFQUFKLENBQUo7QUFBQSxNQUFSO0FBQVA7QUFMQzs7QUFBQTtBQU1GLEVBTkQsQ0FNQyxPQUFNRixDQUFOLEVBQVEsQ0FFUjtBQUNELFFBQU8sRUFBUDtBQUNBLENBWE07O0FBYUEsSUFBTW1CLHNDQUFhLFNBQWJBLFlBQWEsUUFBTztBQUNoQyxLQUFHO0FBQ0YsTUFBTVQsTUFBSSxjQUFVQyxNQUFWLENBQWlCQyxNQUFqQixFQUFWO0FBQ0EsTUFBTUMsTUFBSWxCLE1BQU1DLFFBQU4sQ0FBZWMsR0FBZixDQUFWO0FBQ0EsTUFBTVIsS0FBR1AsTUFBTXlCLE9BQU4sQ0FBY0MsTUFBZCxDQUFxQkMsR0FBOUI7QUFDQSxNQUFNQyxlQUFhNUIsTUFBTW9CLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQk8sWUFBdEM7QUFDQSxNQUFHVixPQUFPWCxFQUFQLElBQWFXLElBQUlYLEVBQUosQ0FBaEIsRUFBd0I7QUFDdkIsT0FBR3FCLFlBQUgsRUFDQyxPQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBSVgsRUFBSixDQUFsQixFQUEyQnFCLGFBQWFQLFNBQXhDLENBQVAsQ0FERCxLQUdDLE9BQU9ILElBQUlYLEVBQUosQ0FBUDtBQUNEO0FBQ0QsRUFYRCxDQVdDLE9BQU1GLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FoQk0iLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGV9IGZyb20gJy4vZGInXG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50Q2hpbGQ9c3RhdGU9Pntcblx0dHJ5e1xuXHRcdHJldHVybiBzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbltzdGF0ZS5zdXBlcmRhZGR5LmNoaWxkXVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2hpbGQ9KHN0YXRlLGlkKT0+e1xuXHR0cnl7XG5cdFx0cmV0dXJuIHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuW2lkXVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENoaWxkVGFza3M9KHN0YXRlLGRvbWFpbj1cImJhYnlcIik9Pntcblx0bGV0IHRhcmdldD1nZXRDdXJyZW50Q2hpbGRUYXJnZXQoc3RhdGUsZG9tYWluKVxuXHRjb25zdCB7dG9kb3M9W119PXRhcmdldFxuXHRyZXR1cm4gdG9kb3Ncbn1cblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRDaGlsZFRhcmdldD0oc3RhdGUsZG9tYWluPVwiYmFieVwiKT0+e1xuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdGlmKGNoaWxkICYmIGNoaWxkLnRhcmdldHMgJiYgY2hpbGQudGFyZ2V0c1tkb21haW5dKVxuXHRcdHJldHVybiBjaGlsZC50YXJnZXRzW2RvbWFpbl1cblx0cmV0dXJuIHt9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRLbm93bGVkZ2VzPXN0YXRlPT57XG5cdHRyeXtcblx0XHRjb25zdCBrZXk9S25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKVxuXHRcdGNvbnN0IGFsbD1zdGF0ZS5lbnRpdGllc1trZXldXG5cdFx0Y29uc3QgaWRzPXN0YXRlLnVpLmtub3dsZWRnZS5rbm93bGVkZ2VzXG5cdFx0aWYoYWxsICYmIGlkcylcblx0XHRcdHJldHVybiBpZHMubWFwKGlkPT5hbGxbaWRdKVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gW11cbn1cblxuZXhwb3J0IGNvbnN0IGdldEtub3dsZWRnZT1zdGF0ZT0+e1xuXHR0cnl7XG5cdFx0Y29uc3Qga2V5PUtub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KClcblx0XHRjb25zdCBhbGw9c3RhdGUuZW50aXRpZXNba2V5XVxuXHRcdGNvbnN0IGlkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGNvbnN0IHNlbGVjdGVkRG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG5cdFx0aWYoYWxsICYmIGlkICYmIGFsbFtpZF0pe1xuXHRcdFx0aWYoc2VsZWN0ZWREb2N4KVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWxsW2lkXSwgc2VsZWN0ZWREb2N4Lmtub3dsZWRnZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGFsbFtpZF1cblx0XHR9XG5cdH1jYXRjaChlKXtcblxuXHR9XG5cdHJldHVybiBudWxsXG59XG4iXX0=