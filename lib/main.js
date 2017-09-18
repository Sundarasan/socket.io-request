'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _error = require('./error');

var _middleware = require('./middleware');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketIORequest = function () {
  function SocketIORequest(io) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SocketIORequest);

    this.io = io;
    this.options = Object.assign({
      event: 'socket.io-request',
      timeout: 90000
    }, options);
  }

  _createClass(SocketIORequest, [{
    key: 'request',
    value: function request(method, data) {
      var _this = this;

      if (typeof method !== 'string') throw new Error('argument "method" is missing');

      return new Promise(function (resolve, reject) {
        _this.io.emit(_this.options.event, { method: method, data: data }, function (res) {
          clearTimeout(timeout);
          _this.io.removeListener('disconnect', onDisconnect);
          if (res.error) return reject((0, _error.convertObjectToError)(res.error));
          resolve(res.data);
        });

        var onDisconnect = function onDisconnect() {
          clearTimeout(timeout);
          reject(new _error.SocketIOError('disconnect'));
        };

        var timeout = setTimeout(function () {
          _this.io.removeListener('disconnect', onDisconnect);
          reject(new _error.TimeoutError('exceeded ' + _this.options.timeout + ' (msec)'));
        }, _this.options.timeout);

        _this.io.once('disconnect', onDisconnect);
      });
    }
  }, {
    key: 'response',
    value: function response(method) {
      if (typeof method !== 'string') throw new Error('argument "method" is missing');

      for (var _len = arguments.length, middlewares = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        middlewares[_key - 1] = arguments[_key];
      }

      if (middlewares.find(function (m) {
        return typeof m !== 'function';
      })) {
        throw new Error('"middlewares" must be a function');
      }
      var combined = _middleware.combineMiddlewares.apply(undefined, _toConsumableArray(middlewares.concat()));
      this.io.on(this.options.event, function (req, ack) {
        if (req.method !== method) return;
        var res = function res(data) {
          return ack({ data: data });
        };
        res.error = function (err) {
          return ack({ error: (0, _error.convertErrorToObject)(err) });
        };
        combined(req.data, res);
      });
    }
  }]);

  return SocketIORequest;
}();

exports.default = SocketIORequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbIlNvY2tldElPUmVxdWVzdCIsImlvIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImV2ZW50IiwidGltZW91dCIsIm1ldGhvZCIsImRhdGEiLCJFcnJvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZW1pdCIsInJlcyIsImNsZWFyVGltZW91dCIsInJlbW92ZUxpc3RlbmVyIiwib25EaXNjb25uZWN0IiwiZXJyb3IiLCJzZXRUaW1lb3V0Iiwib25jZSIsIm1pZGRsZXdhcmVzIiwiZmluZCIsIm0iLCJjb21iaW5lZCIsImNvbmNhdCIsIm9uIiwicmVxIiwiYWNrIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7SUFFcUJBLGU7QUFDbkIsMkJBQWFDLEVBQWIsRUFBK0I7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQzdCLFNBQUtELEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE9BQUwsR0FBZUMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxhQUFPLG1CQURvQjtBQUUzQkMsZUFBUztBQUZrQixLQUFkLEVBR1pKLE9BSFksQ0FBZjtBQUlEOzs7OzRCQUVRSyxNLEVBQVFDLEksRUFBTTtBQUFBOztBQUNyQixVQUFJLE9BQU9ELE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0MsTUFBTSxJQUFJRSxLQUFKLENBQVUsOEJBQVYsQ0FBTjs7QUFFaEMsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGNBQUtYLEVBQUwsQ0FBUVksSUFBUixDQUFhLE1BQUtYLE9BQUwsQ0FBYUcsS0FBMUIsRUFBaUMsRUFBQ0UsY0FBRCxFQUFTQyxVQUFULEVBQWpDLEVBQWlELFVBQUNNLEdBQUQsRUFBUztBQUN4REMsdUJBQWFULE9BQWI7QUFDQSxnQkFBS0wsRUFBTCxDQUFRZSxjQUFSLENBQXVCLFlBQXZCLEVBQXFDQyxZQUFyQztBQUNBLGNBQUlILElBQUlJLEtBQVIsRUFBZSxPQUFPTixPQUFPLGlDQUFxQkUsSUFBSUksS0FBekIsQ0FBUCxDQUFQO0FBQ2ZQLGtCQUFRRyxJQUFJTixJQUFaO0FBQ0QsU0FMRDs7QUFPQSxZQUFNUyxlQUFlLFNBQWZBLFlBQWUsR0FBTTtBQUN6QkYsdUJBQWFULE9BQWI7QUFDQU0saUJBQU8seUJBQWtCLFlBQWxCLENBQVA7QUFDRCxTQUhEOztBQUtBLFlBQU1OLFVBQVVhLFdBQVcsWUFBTTtBQUMvQixnQkFBS2xCLEVBQUwsQ0FBUWUsY0FBUixDQUF1QixZQUF2QixFQUFxQ0MsWUFBckM7QUFDQUwsaUJBQU8sc0NBQTZCLE1BQUtWLE9BQUwsQ0FBYUksT0FBMUMsYUFBUDtBQUNELFNBSGUsRUFHYixNQUFLSixPQUFMLENBQWFJLE9BSEEsQ0FBaEI7O0FBS0EsY0FBS0wsRUFBTCxDQUFRbUIsSUFBUixDQUFhLFlBQWIsRUFBMkJILFlBQTNCO0FBQ0QsT0FuQk0sQ0FBUDtBQW9CRDs7OzZCQUVTVixNLEVBQXdCO0FBQ2hDLFVBQUksT0FBT0EsTUFBUCxLQUFrQixRQUF0QixFQUFnQyxNQUFNLElBQUlFLEtBQUosQ0FBVSw4QkFBVixDQUFOOztBQURBLHdDQUFiWSxXQUFhO0FBQWJBLG1CQUFhO0FBQUE7O0FBRWhDLFVBQUlBLFlBQVlDLElBQVosQ0FBaUI7QUFBQSxlQUFLLE9BQU9DLENBQVAsS0FBYSxVQUFsQjtBQUFBLE9BQWpCLENBQUosRUFBb0Q7QUFDbEQsY0FBTSxJQUFJZCxLQUFKLENBQVUsa0NBQVYsQ0FBTjtBQUNEO0FBQ0QsVUFBTWUsV0FBVyxtRUFBc0JILFlBQVlJLE1BQVosRUFBdEIsRUFBakI7QUFDQSxXQUFLeEIsRUFBTCxDQUFReUIsRUFBUixDQUFXLEtBQUt4QixPQUFMLENBQWFHLEtBQXhCLEVBQStCLFVBQUNzQixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUMzQyxZQUFJRCxJQUFJcEIsTUFBSixLQUFlQSxNQUFuQixFQUEyQjtBQUMzQixZQUFNTyxNQUFNLFNBQU5BLEdBQU07QUFBQSxpQkFBUWMsSUFBSSxFQUFDcEIsVUFBRCxFQUFKLENBQVI7QUFBQSxTQUFaO0FBQ0FNLFlBQUlJLEtBQUosR0FBWTtBQUFBLGlCQUFPVSxJQUFJLEVBQUNWLE9BQU8saUNBQXFCVyxHQUFyQixDQUFSLEVBQUosQ0FBUDtBQUFBLFNBQVo7QUFDQUwsaUJBQVNHLElBQUluQixJQUFiLEVBQW1CTSxHQUFuQjtBQUNELE9BTEQ7QUFNRDs7Ozs7O2tCQTlDa0JkLGUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29udmVydEVycm9yVG9PYmplY3QsIGNvbnZlcnRPYmplY3RUb0Vycm9yLCBUaW1lb3V0RXJyb3IsIFNvY2tldElPRXJyb3J9IGZyb20gJy4vZXJyb3InXG5pbXBvcnQge2NvbWJpbmVNaWRkbGV3YXJlc30gZnJvbSAnLi9taWRkbGV3YXJlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRJT1JlcXVlc3Qge1xuICBjb25zdHJ1Y3RvciAoaW8sIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuaW8gPSBpb1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZXZlbnQ6ICdzb2NrZXQuaW8tcmVxdWVzdCcsXG4gICAgICB0aW1lb3V0OiA5MDAwMFxuICAgIH0sIG9wdGlvbnMpXG4gIH1cblxuICByZXF1ZXN0IChtZXRob2QsIGRhdGEpIHtcbiAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcignYXJndW1lbnQgXCJtZXRob2RcIiBpcyBtaXNzaW5nJylcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmlvLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB7bWV0aG9kLCBkYXRhfSwgKHJlcykgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGhpcy5pby5yZW1vdmVMaXN0ZW5lcignZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdClcbiAgICAgICAgaWYgKHJlcy5lcnJvcikgcmV0dXJuIHJlamVjdChjb252ZXJ0T2JqZWN0VG9FcnJvcihyZXMuZXJyb3IpKVxuICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgfSlcblxuICAgICAgY29uc3Qgb25EaXNjb25uZWN0ID0gKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgcmVqZWN0KG5ldyBTb2NrZXRJT0Vycm9yKCdkaXNjb25uZWN0JykpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pby5yZW1vdmVMaXN0ZW5lcignZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdClcbiAgICAgICAgcmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IoYGV4Y2VlZGVkICR7dGhpcy5vcHRpb25zLnRpbWVvdXR9IChtc2VjKWApKVxuICAgICAgfSwgdGhpcy5vcHRpb25zLnRpbWVvdXQpXG5cbiAgICAgIHRoaXMuaW8ub25jZSgnZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdClcbiAgICB9KVxuICB9XG5cbiAgcmVzcG9uc2UgKG1ldGhvZCwgLi4ubWlkZGxld2FyZXMpIHtcbiAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcignYXJndW1lbnQgXCJtZXRob2RcIiBpcyBtaXNzaW5nJylcbiAgICBpZiAobWlkZGxld2FyZXMuZmluZChtID0+IHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIm1pZGRsZXdhcmVzXCIgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG4gICAgY29uc3QgY29tYmluZWQgPSBjb21iaW5lTWlkZGxld2FyZXMoLi4ubWlkZGxld2FyZXMuY29uY2F0KCkpXG4gICAgdGhpcy5pby5vbih0aGlzLm9wdGlvbnMuZXZlbnQsIChyZXEsIGFjaykgPT4ge1xuICAgICAgaWYgKHJlcS5tZXRob2QgIT09IG1ldGhvZCkgcmV0dXJuXG4gICAgICBjb25zdCByZXMgPSBkYXRhID0+IGFjayh7ZGF0YX0pXG4gICAgICByZXMuZXJyb3IgPSBlcnIgPT4gYWNrKHtlcnJvcjogY29udmVydEVycm9yVG9PYmplY3QoZXJyKX0pXG4gICAgICBjb21iaW5lZChyZXEuZGF0YSwgcmVzKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==