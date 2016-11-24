'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getKnowledge = exports.getKnowledges = exports.getCurrentChildTasks = exports.getChild = exports.getCurrentChild = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    todos = _child$todos === undefined ? [] : _child$todos,
	    todoWeek = child.todoWeek;

	var week = new Date().getWeek();
	if (todoWeek !== week) {
		//dispatch(TimeManageUI.ACTION.RESET())
	}
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

		if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
			if (selectedDocx) return (0, _assign2.default)({}, all[id], selectedDocx.knowledge);else return all[id];
		}
	} catch (e) {}
	return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50Q2hpbGQiLCJzdGF0ZSIsImVudGl0aWVzIiwiY2hpbGRyZW4iLCJzdXBlcmRhZGR5IiwiY2hpbGQiLCJlIiwiZ2V0Q2hpbGQiLCJpZCIsImdldEN1cnJlbnRDaGlsZFRhc2tzIiwidG9kb3MiLCJ0b2RvV2VlayIsIndlZWsiLCJEYXRlIiwiZ2V0V2VlayIsImdldEtub3dsZWRnZXMiLCJrZXkiLCJzY2hlbWEiLCJnZXRLZXkiLCJhbGwiLCJpZHMiLCJ1aSIsImtub3dsZWRnZSIsImtub3dsZWRnZXMiLCJtYXAiLCJnZXRLbm93bGVkZ2UiLCJyb3V0aW5nIiwicGFyYW1zIiwiX2lkIiwic2VsZWN0ZWREb2N4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVPLElBQU1BLDRDQUFnQixTQUFoQkEsZUFBZ0IsUUFBTztBQUNuQyxLQUFHO0FBQ0YsU0FBT0MsTUFBTUMsUUFBTixDQUFlQyxRQUFmLENBQXdCRixNQUFNRyxVQUFOLENBQWlCQyxLQUF6QyxDQUFQO0FBQ0EsRUFGRCxDQUVDLE9BQU1DLENBQU4sRUFBUSxDQUVSO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FQTTs7QUFTQSxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTLENBQUNOLEtBQUQsRUFBT08sRUFBUCxFQUFZO0FBQ2pDLEtBQUc7QUFDRixTQUFPUCxNQUFNQyxRQUFOLENBQWVDLFFBQWYsQ0FBd0JLLEVBQXhCLENBQVA7QUFDQSxFQUZELENBRUMsT0FBTUYsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVBNOztBQVNBLElBQU1HLHNEQUFxQixTQUFyQkEsb0JBQXFCLFFBQU87QUFDeEMsS0FBSUosUUFBTUwsZ0JBQWdCQyxLQUFoQixDQUFWO0FBRHdDLG9CQUVkSSxLQUZjLENBRWpDSyxLQUZpQztBQUFBLEtBRWpDQSxLQUZpQyxnQ0FFM0IsRUFGMkI7QUFBQSxLQUV4QkMsUUFGd0IsR0FFZE4sS0FGYyxDQUV4Qk0sUUFGd0I7O0FBR3hDLEtBQUlDLE9BQUssSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQVQ7QUFDQSxLQUFHSCxhQUFXQyxJQUFkLEVBQW1CO0FBQ2xCO0FBQ0E7QUFDRCxRQUFPRixLQUFQO0FBQ0EsQ0FSTTs7QUFVQSxJQUFNSyx3Q0FBYyxTQUFkQSxhQUFjLFFBQU87QUFDakMsS0FBRztBQUFBO0FBQ0YsT0FBTUMsTUFBSSxjQUFVQyxNQUFWLENBQWlCQyxNQUFqQixFQUFWO0FBQ0EsT0FBTUMsTUFBSWxCLE1BQU1DLFFBQU4sQ0FBZWMsR0FBZixDQUFWO0FBQ0EsT0FBTUksTUFBSW5CLE1BQU1vQixFQUFOLENBQVNDLFNBQVQsQ0FBbUJDLFVBQTdCO0FBQ0EsT0FBR0osT0FBT0MsR0FBVixFQUNDO0FBQUEsUUFBT0EsSUFBSUksR0FBSixDQUFRO0FBQUEsYUFBSUwsSUFBSVgsRUFBSixDQUFKO0FBQUEsTUFBUjtBQUFQO0FBTEM7O0FBQUE7QUFNRixFQU5ELENBTUMsT0FBTUYsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLEVBQVA7QUFDQSxDQVhNOztBQWFBLElBQU1tQixzQ0FBYSxTQUFiQSxZQUFhLFFBQU87QUFDaEMsS0FBRztBQUNGLE1BQU1ULE1BQUksY0FBVUMsTUFBVixDQUFpQkMsTUFBakIsRUFBVjtBQUNBLE1BQU1DLE1BQUlsQixNQUFNQyxRQUFOLENBQWVjLEdBQWYsQ0FBVjtBQUNBLE1BQU1SLEtBQUdQLE1BQU15QixPQUFOLENBQWNDLE1BQWQsQ0FBcUJDLEdBQTlCO0FBQ0EsTUFBTUMsZUFBYTVCLE1BQU1vQixFQUFOLENBQVNDLFNBQVQsQ0FBbUJPLFlBQXRDO0FBQ0EsTUFBR1YsT0FBT1gsRUFBUCxJQUFhVyxJQUFJWCxFQUFKLENBQWhCLEVBQXdCO0FBQ3ZCLE9BQUdxQixZQUFILEVBQ0MsT0FBTyxzQkFBYyxFQUFkLEVBQWtCVixJQUFJWCxFQUFKLENBQWxCLEVBQTJCcUIsYUFBYVAsU0FBeEMsQ0FBUCxDQURELEtBR0MsT0FBT0gsSUFBSVgsRUFBSixDQUFQO0FBQ0Q7QUFDRCxFQVhELENBV0MsT0FBTUYsQ0FBTixFQUFRLENBRVI7QUFDRCxRQUFPLElBQVA7QUFDQSxDQWhCTSIsImZpbGUiOiJzZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZX0gZnJvbSAnLi9kYidcblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRDaGlsZD1zdGF0ZT0+e1xuXHR0cnl7XG5cdFx0cmV0dXJuIHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuW3N0YXRlLnN1cGVyZGFkZHkuY2hpbGRdXG5cdH1jYXRjaChlKXtcblxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDaGlsZD0oc3RhdGUsaWQpPT57XG5cdHRyeXtcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXMuY2hpbGRyZW5baWRdXG5cdH1jYXRjaChlKXtcblxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50Q2hpbGRUYXNrcz1zdGF0ZT0+e1xuXHRsZXQgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRjb25zdCB7dG9kb3M9W10sdG9kb1dlZWt9PWNoaWxkXG5cdGxldCB3ZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdGlmKHRvZG9XZWVrIT09d2Vlayl7XG5cdFx0Ly9kaXNwYXRjaChUaW1lTWFuYWdlVUkuQUNUSU9OLlJFU0VUKCkpXG5cdH1cblx0cmV0dXJuIHRvZG9zXG59XG5cbmV4cG9ydCBjb25zdCBnZXRLbm93bGVkZ2VzPXN0YXRlPT57XG5cdHRyeXtcblx0XHRjb25zdCBrZXk9S25vd2xlZGdlLnNjaGVtYS5nZXRLZXkoKVxuXHRcdGNvbnN0IGFsbD1zdGF0ZS5lbnRpdGllc1trZXldXG5cdFx0Y29uc3QgaWRzPXN0YXRlLnVpLmtub3dsZWRnZS5rbm93bGVkZ2VzXG5cdFx0aWYoYWxsICYmIGlkcylcblx0XHRcdHJldHVybiBpZHMubWFwKGlkPT5hbGxbaWRdKVxuXHR9Y2F0Y2goZSl7XG5cblx0fVxuXHRyZXR1cm4gW11cbn1cblxuZXhwb3J0IGNvbnN0IGdldEtub3dsZWRnZT1zdGF0ZT0+e1xuXHR0cnl7XG5cdFx0Y29uc3Qga2V5PUtub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KClcblx0XHRjb25zdCBhbGw9c3RhdGUuZW50aXRpZXNba2V5XVxuXHRcdGNvbnN0IGlkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGNvbnN0IHNlbGVjdGVkRG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG5cdFx0aWYoYWxsICYmIGlkICYmIGFsbFtpZF0pe1xuXHRcdFx0aWYoc2VsZWN0ZWREb2N4KVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWxsW2lkXSwgc2VsZWN0ZWREb2N4Lmtub3dsZWRnZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGFsbFtpZF1cblx0XHR9XG5cdH1jYXRjaChlKXtcblxuXHR9XG5cdHJldHVybiBudWxsXG59XG4iXX0=