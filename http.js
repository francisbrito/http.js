/*! http.js v0.0.0 - MIT license */

;(function (global) { function moduleDefinition(/*dependency*/) {

// ---------------------------------------------------------------------------

'use strict';

/**
 * @param {}
 * @return {}
 * @api public
 */

function Http() {
    this.headers = {};
}

function _request (method, url, headers, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            var err = null;
            if (status >= 400) {
                err = {
                    status: status,
                    text: statusText
                };
            }

            callback(err, xhr);
        }
    };

    xhr.open(method, url);

    // Headers.
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
        }
    };

    xhr.send(data);
};

Http.prototype.request = function(options, callback) {
    options.port = options.port || 80;
    options.path = options.path || '/';
    options.method = options.method || 'GET';
    options.secure = options.secure || false;
    options.headers = options.headers || {};
    options.host = options.host || 'localhost';
    options.hostname = options.hostname || options.host;

    var url = options.secure ? 'https://' : 'http://';
    url += options.hostname + ':' + options.port + options.path;

    // Inject headers.
    for(var key in this.headers) {
        if (this.headers.hasOwnProperty(key)) {
            options.headers[key] = this.headers[key];
        };

    }

    _request(options.method, url, options.headers, null, callback);
};

Http.prototype.get = function(options, callback) {
    var self = this;

    options.method = 'GET';

    self.request(options, function (err, xhr) {
        if (err) {
            callback(err, null);
        }

        var etag = xhr.getResponseHeader('ETag');

        if (etag) {
            self.headers['If-None-Match'] = etag;
        }

        callback(err, xhr);
    });
};

/**
 * Expose Http
 */

return Http;

// ---------------------------------------------------------------------------

} if (typeof exports === 'object') {
    // node export
    module.exports = moduleDefinition(/*require('dependency')*/);
} else if (typeof define === 'function' && define.amd) {
    // amd anonymous module registration
    define([/*'dependency'*/], moduleDefinition);
} else {
    // browser global
    global.Http = moduleDefinition(/*global.dependency*/);
}}(this));
