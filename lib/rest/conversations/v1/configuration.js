'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../base/Page');  /* jshint ignore:line */
var WebhookList = require('./configuration/webhook').WebhookList;
var values = require('../../../base/values');  /* jshint ignore:line */

var ConfigurationList;
var ConfigurationPage;
var ConfigurationInstance;
var ConfigurationContext;

/* jshint ignore:start */
/**
 * Initialize the ConfigurationList
 *
 * @constructor Twilio.Conversations.V1.ConfigurationList
 *
 * @param {Twilio.Conversations.V1} version - Version of the resource
 */
/* jshint ignore:end */
ConfigurationList = function ConfigurationList(version) {
  /* jshint ignore:start */
  /**
   * @function configuration
   * @memberof Twilio.Conversations.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Conversations.V1.ConfigurationContext}
   */
  /* jshint ignore:end */
  function ConfigurationListInstance(sid) {
    return ConfigurationListInstance.get(sid);
  }

  ConfigurationListInstance._version = version;
  // Path Solution
  ConfigurationListInstance._solution = {};

  // Components
  ConfigurationListInstance._webhooks = undefined;

  /* jshint ignore:start */
  /**
   * Constructs a configuration
   *
   * @function get
   * @memberof Twilio.Conversations.V1.ConfigurationList#
   *
   * @returns {Twilio.Conversations.V1.ConfigurationContext}
   */
  /* jshint ignore:end */
  ConfigurationListInstance.get = function get() {
    return new ConfigurationContext(this._version);
  };

  Object.defineProperty(ConfigurationListInstance,
    'webhooks', {
      get: function webhooks() {
        if (!this._webhooks) {
          this._webhooks = new WebhookList(this._version);
        }

        return this._webhooks;
      }
  });

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Conversations.V1.ConfigurationList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  ConfigurationListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  ConfigurationListInstance[util.inspect.custom] = function inspect(depth,
      options) {
    return util.inspect(this.toJSON(), options);
  };

  return ConfigurationListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the ConfigurationPage
 *
 * @constructor Twilio.Conversations.V1.ConfigurationPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {ConfigurationSolution} solution - Path solution
 *
 * @returns ConfigurationPage
 */
/* jshint ignore:end */
ConfigurationPage = function ConfigurationPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(ConfigurationPage.prototype, Page.prototype);
ConfigurationPage.prototype.constructor = ConfigurationPage;

/* jshint ignore:start */
/**
 * Build an instance of ConfigurationInstance
 *
 * @function getInstance
 * @memberof Twilio.Conversations.V1.ConfigurationPage#
 *
 * @param {ConfigurationPayload} payload - Payload response from the API
 *
 * @returns ConfigurationInstance
 */
/* jshint ignore:end */
ConfigurationPage.prototype.getInstance = function getInstance(payload) {
  return new ConfigurationInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Conversations.V1.ConfigurationPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConfigurationPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

ConfigurationPage.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the ConfigurationContext
 *
 * @constructor Twilio.Conversations.V1.ConfigurationInstance
 *
 * @property {string} accountSid -
 *          The SID of the Account responsible for this configuration.
 * @property {string} defaultChatServiceSid -
 *          The SID of the default Conversation Service that every new conversation is associated with.
 * @property {string} defaultMessagingServiceSid -
 *          The SID of the default Messaging Service that every new conversation is associated with.
 * @property {string} defaultInactiveTimer -
 *          Default ISO8601 duration when conversation will be switched to `inactive` state.
 * @property {string} defaultClosedTimer -
 *          Default ISO8601 duration when conversation will be switched to `closed` state.
 * @property {string} url - An absolute URL for this global configuration.
 * @property {string} links -
 *          Absolute URLs to access the webhook and default service configurations.
 *
 * @param {V1} version - Version of the resource
 * @param {ConfigurationPayload} payload - The instance payload
 */
/* jshint ignore:end */
ConfigurationInstance = function ConfigurationInstance(version, payload) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.defaultChatServiceSid = payload.default_chat_service_sid; // jshint ignore:line
  this.defaultMessagingServiceSid = payload.default_messaging_service_sid; // jshint ignore:line
  this.defaultInactiveTimer = payload.default_inactive_timer; // jshint ignore:line
  this.defaultClosedTimer = payload.default_closed_timer; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {};
};

Object.defineProperty(ConfigurationInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new ConfigurationContext(this._version);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a ConfigurationInstance
 *
 * @function fetch
 * @memberof Twilio.Conversations.V1.ConfigurationInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConfigurationInstance
 */
/* jshint ignore:end */
ConfigurationInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a ConfigurationInstance
 *
 * @function update
 * @memberof Twilio.Conversations.V1.ConfigurationInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.defaultChatServiceSid] -
 *          The SID of the default Conversation Service that every new conversation will be associated with.
 * @param {string} [opts.defaultMessagingServiceSid] -
 *          The SID of the default Messaging Service that every new conversation will be associated with.
 * @param {string} [opts.defaultInactiveTimer] -
 *          Default ISO8601 duration when conversation will be switched to `inactive` state.
 * @param {string} [opts.defaultClosedTimer] -
 *          Default ISO8601 duration when conversation will be switched to `closed` state.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConfigurationInstance
 */
/* jshint ignore:end */
ConfigurationInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Conversations.V1.ConfigurationInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConfigurationInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

ConfigurationInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the ConfigurationContext
 *
 * @constructor Twilio.Conversations.V1.ConfigurationContext
 *
 * @param {V1} version - Version of the resource
 */
/* jshint ignore:end */
ConfigurationContext = function ConfigurationContext(version) {
  this._version = version;

  // Path Solution
  this._solution = {};
  this._uri = `/Configuration`;
};

/* jshint ignore:start */
/**
 * fetch a ConfigurationInstance
 *
 * @function fetch
 * @memberof Twilio.Conversations.V1.ConfigurationContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConfigurationInstance
 */
/* jshint ignore:end */
ConfigurationContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new ConfigurationInstance(this._version, payload));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a ConfigurationInstance
 *
 * @function update
 * @memberof Twilio.Conversations.V1.ConfigurationContext#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.defaultChatServiceSid] -
 *          The SID of the default Conversation Service that every new conversation will be associated with.
 * @param {string} [opts.defaultMessagingServiceSid] -
 *          The SID of the default Messaging Service that every new conversation will be associated with.
 * @param {string} [opts.defaultInactiveTimer] -
 *          Default ISO8601 duration when conversation will be switched to `inactive` state.
 * @param {string} [opts.defaultClosedTimer] -
 *          Default ISO8601 duration when conversation will be switched to `closed` state.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed ConfigurationInstance
 */
/* jshint ignore:end */
ConfigurationContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'DefaultChatServiceSid': _.get(opts, 'defaultChatServiceSid'),
    'DefaultMessagingServiceSid': _.get(opts, 'defaultMessagingServiceSid'),
    'DefaultInactiveTimer': _.get(opts, 'defaultInactiveTimer'),
    'DefaultClosedTimer': _.get(opts, 'defaultClosedTimer')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new ConfigurationInstance(this._version, payload));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Conversations.V1.ConfigurationContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
ConfigurationContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

ConfigurationContext.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  ConfigurationList: ConfigurationList,
  ConfigurationPage: ConfigurationPage,
  ConfigurationInstance: ConfigurationInstance,
  ConfigurationContext: ConfigurationContext
};
