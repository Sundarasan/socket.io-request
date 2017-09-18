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
  if (err && typeof err === 'function') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0RXJyb3JUb09iamVjdCIsImNvbnZlcnRPYmplY3RUb0Vycm9yIiwic2VyaWFsaXplRXJyb3JXaXRob3V0U3RhY2siLCJlcnIiLCJzdGFjayIsInRvSlNPTiIsIkVycm9yIiwiQXJyYXkiLCJtYXAiLCJvYmoiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJUaW1lb3V0RXJyb3IiLCJtZXNzYWdlIiwibmFtZSIsIlNvY2tldElPRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQVlnQkEsb0IsR0FBQUEsb0I7UUFhQUMsb0IsR0FBQUEsb0I7O0FBekJoQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxTQUFTQywwQkFBVCxDQUFxQ0MsR0FBckMsRUFBMEM7QUFDeEMsU0FBT0EsSUFBSUMsS0FBWDtBQUNBLE1BQUlELE9BQU8sT0FBT0EsR0FBUCxLQUFlLFVBQTFCLEVBQXNDO0FBQ3BDQSxVQUFNQSxJQUFJRSxNQUFKLEVBQU47QUFDRDtBQUNELFNBQU8sOEJBQWVGLEdBQWYsQ0FBUDtBQUNEOztBQUVEO0FBQ08sU0FBU0gsb0JBQVQsQ0FBK0JHLEdBQS9CLEVBQW9DO0FBQ3pDLE1BQUlBLGVBQWVHLEtBQW5CLEVBQTBCLE9BQU9KLDJCQUEyQkMsR0FBM0IsQ0FBUDtBQUMxQixNQUFJQSxlQUFlSSxLQUFuQixFQUEwQixPQUFPSixJQUFJSyxHQUFKLENBQVFOLDBCQUFSLENBQVA7QUFDMUIsTUFBSU8sTUFBTSxFQUFWO0FBQ0EsT0FBSyxJQUFJQyxDQUFULElBQWNQLEdBQWQsRUFBbUI7QUFDakIsUUFBSUEsSUFBSVEsY0FBSixDQUFtQkQsQ0FBbkIsQ0FBSixFQUEyQjtBQUN6QkQsVUFBSUMsQ0FBSixJQUFTUiwyQkFBMkJDLElBQUlPLENBQUosQ0FBM0IsQ0FBVDtBQUNEO0FBQ0Y7QUFDRCxTQUFPRCxHQUFQO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTUixvQkFBVCxDQUErQlEsR0FBL0IsRUFBb0M7QUFDekMsTUFBSUEsZUFBZUgsS0FBbkIsRUFBMEIsT0FBT0csR0FBUDtBQUMxQixNQUFJQSxlQUFlRixLQUFuQixFQUEwQixPQUFPRSxJQUFJRCxHQUFKLDRCQUFQO0FBQzFCLE1BQUksUUFBT0MsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQW5CLEVBQTZCLE9BQU9BLEdBQVA7QUFDN0IsTUFBSU4sTUFBTSxnQ0FBaUJNLEdBQWpCLENBQVY7QUFDQSxNQUFJTixRQUFRTSxHQUFaLEVBQWlCLE9BQU9OLEdBQVA7QUFDakJBLFFBQU0sRUFBTjtBQUNBLE9BQUssSUFBSU8sQ0FBVCxJQUFjRCxHQUFkLEVBQW1CO0FBQ2pCTixRQUFJTyxDQUFKLElBQVMsZ0NBQWlCRCxJQUFJQyxDQUFKLENBQWpCLENBQVQ7QUFDRDtBQUNELFNBQU9QLEdBQVA7QUFDRDs7SUFFWVMsWSxXQUFBQSxZOzs7QUFDWCx3QkFBYUMsT0FBYixFQUFzQjtBQUFBOztBQUFBLDRIQUNkQSxPQURjOztBQUVwQixVQUFLQyxJQUFMLEdBQVksY0FBWjtBQUZvQjtBQUdyQjs7O0VBSitCUixLOztJQU9yQlMsYSxXQUFBQSxhOzs7QUFDWCx5QkFBYUYsT0FBYixFQUFzQjtBQUFBOztBQUFBLCtIQUNkQSxPQURjOztBQUVwQixXQUFLQyxJQUFMLEdBQVksaUJBQVo7QUFGb0I7QUFHckI7OztFQUpnQ1IsSyIsImZpbGUiOiJlcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXJpYWxpemVFcnJvciBmcm9tICdzZXJpYWxpemUtZXJyb3InXG5pbXBvcnQgZGVzZXJpYWxpemVFcnJvciBmcm9tICdkZXNlcmlhbGl6ZS1lcnJvcidcblxuZnVuY3Rpb24gc2VyaWFsaXplRXJyb3JXaXRob3V0U3RhY2sgKGVycikge1xuICBkZWxldGUgZXJyLnN0YWNrXG4gIGlmIChlcnIgJiYgdHlwZW9mIGVyciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVyciA9IGVyci50b0pTT04oKVxuICB9XG4gIHJldHVybiBzZXJpYWxpemVFcnJvcihlcnIpXG59XG5cbi8vIGNvbnZlcnQgKG5lc3RlZCkgRXJyb3Igb2JqZWN0IHRvIFBsYWluIG9iamVjdCB0byBzZW5kIHZpYSBzb2NrZXQuaW9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RXJyb3JUb09iamVjdCAoZXJyKSB7XG4gIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHNlcmlhbGl6ZUVycm9yV2l0aG91dFN0YWNrKGVycilcbiAgaWYgKGVyciBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gZXJyLm1hcChzZXJpYWxpemVFcnJvcldpdGhvdXRTdGFjaylcbiAgbGV0IG9iaiA9IHt9XG4gIGZvciAobGV0IGsgaW4gZXJyKSB7XG4gICAgaWYgKGVyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgb2JqW2tdID0gc2VyaWFsaXplRXJyb3JXaXRob3V0U3RhY2soZXJyW2tdKVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbi8vIGNvbnZlcnQgbmVzdGVkIG9iamVjdCB0byBFcnJvclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRPYmplY3RUb0Vycm9yIChvYmopIHtcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gb2JqXG4gIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkgcmV0dXJuIG9iai5tYXAoZGVzZXJpYWxpemVFcnJvcilcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSByZXR1cm4gb2JqXG4gIGxldCBlcnIgPSBkZXNlcmlhbGl6ZUVycm9yKG9iailcbiAgaWYgKGVyciAhPT0gb2JqKSByZXR1cm4gZXJyXG4gIGVyciA9IHt9XG4gIGZvciAobGV0IGsgaW4gb2JqKSB7XG4gICAgZXJyW2tdID0gZGVzZXJpYWxpemVFcnJvcihvYmpba10pXG4gIH1cbiAgcmV0dXJuIGVyclxufVxuXG5leHBvcnQgY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvciAobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpXG4gICAgdGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcidcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU29ja2V0SU9FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IgKG1lc3NhZ2UpIHtcbiAgICBzdXBlcihtZXNzYWdlKVxuICAgIHRoaXMubmFtZSA9ICdTb2NrZXQuSU8gRXJyb3InXG4gIH1cbn1cbiJdfQ==