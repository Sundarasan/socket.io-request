'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketIOError = exports.TimeoutError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.convertErrorToObject = convertErrorToObject;
exports.convertObjectToError = convertObjectToError;

var _serializeError = require('serialize-error');

var _serializeError2 = _interopRequireDefault(_serializeError);

var _deserializeError = require('deserialize-error');

var _deserializeError2 = _interopRequireDefault(_deserializeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function serializeErrorWithoutStack(err) {
  delete err.stack;
  if (err && typeof err.toJSON === 'function') {
    err = err.toJSON();
  }
  return (0, _serializeError2.default)(err);
}

// convert (nested) Error object to Plain object to send via socket.io
function convertErrorToObject(err) {
  if (err instanceof Error) return serializeErrorWithoutStack(err);
  if (err instanceof Array) return err.map(serializeErrorWithoutStack);
  var obj = {};
  for (var k in err) {
    if (err.hasOwnProperty(k)) {
      obj[k] = serializeErrorWithoutStack(err[k]);
    }
  }
  return obj;
}

// convert nested object to Error
function convertObjectToError(obj) {
  if (obj instanceof Error) return obj;
  if (obj instanceof Array) return obj.map(_deserializeError2.default);
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return obj;
  var err = (0, _deserializeError2.default)(obj);
  if (err !== obj) return err;
  err = {};
  for (var k in obj) {
    err[k] = (0, _deserializeError2.default)(obj[k]);
  }
  return err;
}

var TimeoutError = exports.TimeoutError = function (_Error) {
  _inherits(TimeoutError, _Error);

  function TimeoutError(message) {
    _classCallCheck(this, TimeoutError);

    var _this = _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, message));

    _this.name = 'TimeoutError';
    return _this;
  }

  return TimeoutError;
}(Error);

var SocketIOError = exports.SocketIOError = function (_Error2) {
  _inherits(SocketIOError, _Error2);

  function SocketIOError(message) {
    _classCallCheck(this, SocketIOError);

    var _this2 = _possibleConstructorReturn(this, (SocketIOError.__proto__ || Object.getPrototypeOf(SocketIOError)).call(this, message));

    _this2.name = 'Socket.IO Error';
    return _this2;
  }

  return SocketIOError;
}(Error);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0RXJyb3JUb09iamVjdCIsImNvbnZlcnRPYmplY3RUb0Vycm9yIiwic2VyaWFsaXplRXJyb3JXaXRob3V0U3RhY2siLCJlcnIiLCJzdGFjayIsInRvSlNPTiIsIkVycm9yIiwiQXJyYXkiLCJtYXAiLCJvYmoiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJUaW1lb3V0RXJyb3IiLCJtZXNzYWdlIiwibmFtZSIsIlNvY2tldElPRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQVlnQkEsb0IsR0FBQUEsb0I7UUFhQUMsb0IsR0FBQUEsb0I7O0FBekJoQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQywwQkFBVCxDQUFxQ0MsR0FBckMsRUFBMEM7QUFDeEMsU0FBT0EsSUFBSUMsS0FBWDtBQUNBLE1BQUlELE9BQU8sT0FBT0EsSUFBSUUsTUFBWCxLQUFzQixVQUFqQyxFQUE2QztBQUMzQ0YsVUFBTUEsSUFBSUUsTUFBSixFQUFOO0FBQ0Q7QUFDRCxTQUFPLDhCQUFlRixHQUFmLENBQVA7QUFDRDs7QUFFRDtBQUNPLFNBQVNILG9CQUFULENBQStCRyxHQUEvQixFQUFvQztBQUN6QyxNQUFJQSxlQUFlRyxLQUFuQixFQUEwQixPQUFPSiwyQkFBMkJDLEdBQTNCLENBQVA7QUFDMUIsTUFBSUEsZUFBZUksS0FBbkIsRUFBMEIsT0FBT0osSUFBSUssR0FBSixDQUFRTiwwQkFBUixDQUFQO0FBQzFCLE1BQUlPLE1BQU0sRUFBVjtBQUNBLE9BQUssSUFBSUMsQ0FBVCxJQUFjUCxHQUFkLEVBQW1CO0FBQ2pCLFFBQUlBLElBQUlRLGNBQUosQ0FBbUJELENBQW5CLENBQUosRUFBMkI7QUFDekJELFVBQUlDLENBQUosSUFBU1IsMkJBQTJCQyxJQUFJTyxDQUFKLENBQTNCLENBQVQ7QUFDRDtBQUNGO0FBQ0QsU0FBT0QsR0FBUDtBQUNEOztBQUVEO0FBQ08sU0FBU1Isb0JBQVQsQ0FBK0JRLEdBQS9CLEVBQW9DO0FBQ3pDLE1BQUlBLGVBQWVILEtBQW5CLEVBQTBCLE9BQU9HLEdBQVA7QUFDMUIsTUFBSUEsZUFBZUYsS0FBbkIsRUFBMEIsT0FBT0UsSUFBSUQsR0FBSiw0QkFBUDtBQUMxQixNQUFJLFFBQU9DLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFuQixFQUE2QixPQUFPQSxHQUFQO0FBQzdCLE1BQUlOLE1BQU0sZ0NBQWlCTSxHQUFqQixDQUFWO0FBQ0EsTUFBSU4sUUFBUU0sR0FBWixFQUFpQixPQUFPTixHQUFQO0FBQ2pCQSxRQUFNLEVBQU47QUFDQSxPQUFLLElBQUlPLENBQVQsSUFBY0QsR0FBZCxFQUFtQjtBQUNqQk4sUUFBSU8sQ0FBSixJQUFTLGdDQUFpQkQsSUFBSUMsQ0FBSixDQUFqQixDQUFUO0FBQ0Q7QUFDRCxTQUFPUCxHQUFQO0FBQ0Q7O0lBRVlTLFksV0FBQUEsWTs7O0FBQ1gsd0JBQWFDLE9BQWIsRUFBc0I7QUFBQTs7QUFBQSw0SEFDZEEsT0FEYzs7QUFFcEIsVUFBS0MsSUFBTCxHQUFZLGNBQVo7QUFGb0I7QUFHckI7OztFQUorQlIsSzs7SUFPckJTLGEsV0FBQUEsYTs7O0FBQ1gseUJBQWFGLE9BQWIsRUFBc0I7QUFBQTs7QUFBQSwrSEFDZEEsT0FEYzs7QUFFcEIsV0FBS0MsSUFBTCxHQUFZLGlCQUFaO0FBRm9CO0FBR3JCOzs7RUFKZ0NSLEsiLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VyaWFsaXplRXJyb3IgZnJvbSAnc2VyaWFsaXplLWVycm9yJ1xuaW1wb3J0IGRlc2VyaWFsaXplRXJyb3IgZnJvbSAnZGVzZXJpYWxpemUtZXJyb3InXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUVycm9yV2l0aG91dFN0YWNrIChlcnIpIHtcbiAgZGVsZXRlIGVyci5zdGFja1xuICBpZiAoZXJyICYmIHR5cGVvZiBlcnIudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXJyID0gZXJyLnRvSlNPTigpXG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZUVycm9yKGVycilcbn1cblxuLy8gY29udmVydCAobmVzdGVkKSBFcnJvciBvYmplY3QgdG8gUGxhaW4gb2JqZWN0IHRvIHNlbmQgdmlhIHNvY2tldC5pb1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRFcnJvclRvT2JqZWN0IChlcnIpIHtcbiAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gc2VyaWFsaXplRXJyb3JXaXRob3V0U3RhY2soZXJyKVxuICBpZiAoZXJyIGluc3RhbmNlb2YgQXJyYXkpIHJldHVybiBlcnIubWFwKHNlcmlhbGl6ZUVycm9yV2l0aG91dFN0YWNrKVxuICBsZXQgb2JqID0ge31cbiAgZm9yIChsZXQgayBpbiBlcnIpIHtcbiAgICBpZiAoZXJyLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICBvYmpba10gPSBzZXJpYWxpemVFcnJvcldpdGhvdXRTdGFjayhlcnJba10pXG4gICAgfVxuICB9XG4gIHJldHVybiBvYmpcbn1cblxuLy8gY29udmVydCBuZXN0ZWQgb2JqZWN0IHRvIEVycm9yXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE9iamVjdFRvRXJyb3IgKG9iaikge1xuICBpZiAob2JqIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiBvYmpcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gb2JqLm1hcChkZXNlcmlhbGl6ZUVycm9yKVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHJldHVybiBvYmpcbiAgbGV0IGVyciA9IGRlc2VyaWFsaXplRXJyb3Iob2JqKVxuICBpZiAoZXJyICE9PSBvYmopIHJldHVybiBlcnJcbiAgZXJyID0ge31cbiAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICBlcnJba10gPSBkZXNlcmlhbGl6ZUVycm9yKG9ialtrXSlcbiAgfVxuICByZXR1cm4gZXJyXG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSlcbiAgICB0aGlzLm5hbWUgPSAnVGltZW91dEVycm9yJ1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTb2NrZXRJT0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvciAobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpXG4gICAgdGhpcy5uYW1lID0gJ1NvY2tldC5JTyBFcnJvcidcbiAgfVxufVxuIl19