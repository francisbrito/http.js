/*! http.js v0.0.0 - MIT license */

;(function (global) { function moduleDefinition(/*dependency*/) {

// ---------------------------------------------------------------------------

'use strict';

/**
 * @param {}
 * @return {}
 * @api public
 */

function http() {
}

/**
 * Expose http
 */

return http;

// ---------------------------------------------------------------------------

} if (typeof exports === 'object') {
    // node export
    module.exports = moduleDefinition(/*require('dependency')*/);
} else if (typeof define === 'function' && define.amd) {
    // amd anonymous module registration
    define([/*'dependency'*/], moduleDefinition);
} else {
    // browser global
    global.http = moduleDefinition(/*global.dependency*/);
}}(this));
