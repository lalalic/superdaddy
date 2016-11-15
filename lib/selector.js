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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVPLElBQU0sNENBQWdCLFNBQWhCLGVBQWdCLFFBQU87QUFDbkMsS0FBRztBQUNGLFNBQU8sTUFBTSxRQUFOLENBQWUsUUFBZixDQUF3QixNQUFNLFVBQU4sQ0FBaUIsS0FBakIsQ0FBL0IsQ0FERTtFQUFILENBRUMsT0FBTSxDQUFOLEVBQVEsRUFBUjtBQUdELFFBQU8sSUFBUCxDQU5tQztDQUFQOztBQVN0QixJQUFNLDhCQUFTLFNBQVQsUUFBUyxDQUFDLEtBQUQsRUFBTyxFQUFQLEVBQVk7QUFDakMsS0FBRztBQUNGLFNBQU8sTUFBTSxRQUFOLENBQWUsUUFBZixDQUF3QixFQUF4QixDQUFQLENBREU7RUFBSCxDQUVDLE9BQU0sQ0FBTixFQUFRLEVBQVI7QUFHRCxRQUFPLElBQVAsQ0FOaUM7Q0FBWjs7QUFTZixJQUFNLHNEQUFxQixTQUFyQixvQkFBcUIsUUFBTztBQUN4QyxLQUFJLFFBQU0sZ0JBQWdCLEtBQWhCLENBQU4sQ0FEb0M7b0JBRXZCLE1BQVY7MENBQU0sa0JBRjJCOztBQUd4QyxRQUFPLEtBQVAsQ0FId0M7Q0FBUDs7QUFNM0IsSUFBTSx3Q0FBYyxTQUFkLGFBQWMsUUFBTztBQUNqQyxLQUFHOztBQUNGLE9BQU0sTUFBSSxjQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBSjtBQUNOLE9BQU0sTUFBSSxNQUFNLFFBQU4sQ0FBZSxHQUFmLENBQUo7QUFDTixPQUFNLE1BQUksTUFBTSxFQUFOLENBQVMsU0FBVCxDQUFtQixVQUFuQjtBQUNWLE9BQUcsT0FBTyxHQUFQLEVBQ0Y7UUFBTyxJQUFJLEdBQUosQ0FBUTthQUFJLElBQUksRUFBSjtNQUFKO0tBQWYsQ0FERDtNQUpFOzs7RUFBSCxDQU1DLE9BQU0sQ0FBTixFQUFRLEVBQVI7QUFHRCxRQUFPLEVBQVAsQ0FWaUM7Q0FBUDs7QUFhcEIsSUFBTSxzQ0FBYSxTQUFiLFlBQWEsUUFBTztBQUNoQyxLQUFHO0FBQ0YsTUFBTSxNQUFJLGNBQVUsTUFBVixDQUFpQixNQUFqQixFQUFKLENBREo7QUFFRixNQUFNLE1BQUksTUFBTSxRQUFOLENBQWUsR0FBZixDQUFKLENBRko7QUFHRixNQUFNLEtBQUcsTUFBTSxPQUFOLENBQWMsTUFBZCxDQUFxQixHQUFyQixDQUhQO0FBSUYsTUFBTSxlQUFhLE1BQU0sRUFBTixDQUFTLFNBQVQsQ0FBbUIsWUFBbkIsQ0FKakI7QUFLRixNQUFHLE9BQU8sRUFBUCxJQUFhLElBQUksRUFBSixDQUFiLEVBQXFCO0FBQ3ZCLE9BQUcsWUFBSCxFQUNDLE9BQU8sc0JBQWMsRUFBZCxFQUFrQixJQUFJLEVBQUosQ0FBbEIsRUFBMkIsYUFBYSxTQUFiLENBQWxDLENBREQsS0FHQyxPQUFPLElBQUksRUFBSixDQUFQLENBSEQ7R0FERDtFQUxELENBV0MsT0FBTSxDQUFOLEVBQVEsRUFBUjtBQUdELFFBQU8sSUFBUCxDQWZnQztDQUFQIiwiZmlsZSI6InNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlfSBmcm9tICcuL2RiJ1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENoaWxkPXN0YXRlPT57XG5cdHRyeXtcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXMuY2hpbGRyZW5bc3RhdGUuc3VwZXJkYWRkeS5jaGlsZF1cblx0fWNhdGNoKGUpe1xuXHRcdFxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDaGlsZD0oc3RhdGUsaWQpPT57XG5cdHRyeXtcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXMuY2hpbGRyZW5baWRdXG5cdH1jYXRjaChlKXtcblx0XHRcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudENoaWxkVGFza3M9c3RhdGU9Pntcblx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0Y29uc3Qge3RvZG9zPVtdfT1jaGlsZFxuXHRyZXR1cm4gdG9kb3Ncbn1cblxuZXhwb3J0IGNvbnN0IGdldEtub3dsZWRnZXM9c3RhdGU9Pntcblx0dHJ5e1xuXHRcdGNvbnN0IGtleT1Lbm93bGVkZ2Uuc2NoZW1hLmdldEtleSgpXG5cdFx0Y29uc3QgYWxsPXN0YXRlLmVudGl0aWVzW2tleV1cblx0XHRjb25zdCBpZHM9c3RhdGUudWkua25vd2xlZGdlLmtub3dsZWRnZXNcblx0XHRpZihhbGwgJiYgaWRzKVxuXHRcdFx0cmV0dXJuIGlkcy5tYXAoaWQ9PmFsbFtpZF0pXG5cdH1jYXRjaChlKXtcblx0XHRcblx0fVxuXHRyZXR1cm4gW11cbn1cblxuZXhwb3J0IGNvbnN0IGdldEtub3dsZWRnZT1zdGF0ZT0+e1xuXHR0cnl7XG5cdFx0Y29uc3Qga2V5PUtub3dsZWRnZS5zY2hlbWEuZ2V0S2V5KClcblx0XHRjb25zdCBhbGw9c3RhdGUuZW50aXRpZXNba2V5XVxuXHRcdGNvbnN0IGlkPXN0YXRlLnJvdXRpbmcucGFyYW1zLl9pZFxuXHRcdGNvbnN0IHNlbGVjdGVkRG9jeD1zdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG5cdFx0aWYoYWxsICYmIGlkICYmIGFsbFtpZF0pe1xuXHRcdFx0aWYoc2VsZWN0ZWREb2N4KVxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWxsW2lkXSwgc2VsZWN0ZWREb2N4Lmtub3dsZWRnZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGFsbFtpZF1cblx0XHR9XG5cdH1jYXRjaChlKXtcblx0XHRcblx0fVxuXHRyZXR1cm4gbnVsbFxufSJdfQ==