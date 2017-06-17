'use strict';

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var SegmentMembershipList = require(
    './user/segmentMemberships').SegmentMembershipList;
var UserBindingList = require('./user/userBinding').UserBindingList;
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var UserList;
var UserPage;
var UserInstance;
var UserContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Notify.V1.ServiceContext.UserList
 * @description Initialize the UserList
 *
 * @param {Twilio.Notify.V1} version - Version of the resource
 * @param {string} serviceSid - The service_sid
 */
/* jshint ignore:end */
UserList = function UserList(version, serviceSid) {
  /* jshint ignore:start */
  /**
   * @function users
   * @memberof Twilio.Notify.V1.ServiceContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Notify.V1.ServiceContext.UserContext}
   */
  /* jshint ignore:end */
  function UserListInstance(sid) {
    return UserListInstance.get(sid);
  }

  UserListInstance._version = version;
  // Path Solution
  UserListInstance._solution = {
    serviceSid: serviceSid
  };
  UserListInstance._uri = _.template(
    '/Services/<%= serviceSid %>/Users' // jshint ignore:line
  )(UserListInstance._solution);
  /* jshint ignore:start */
  /**
   * create a UserInstance
   *
   * @function create
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {object} opts - ...
   * @param {string|list} [opts.segment] - The segment
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed UserInstance
   */
  /* jshint ignore:end */
  UserListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.identity)) {
      throw new Error('Required parameter "opts.identity" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'Identity': _.get(opts, 'identity'),
      'Segment': _.get(opts, 'segment')
    });

    var promise = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new UserInstance(
        this._version,
        payload,
        this._solution.serviceSid,
        this._solution.identity
      ));
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
   * Streams UserInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string|list} [opts.identity] - The identity
   * @param {string} [opts.segment] - The segment
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  UserListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * @description Lists UserInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string|list} [opts.identity] - The identity
   * @param {string} [opts.segment] - The segment
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  UserListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of UserInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string|list} [opts.identity] - The identity
   * @param {string} [opts.segment] - The segment
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  UserListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Identity': _.get(opts, 'identity'),
      'Segment': _.get(opts, 'segment'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new UserPage(
        this._version,
        payload,
        this._solution
      ));
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
   * Retrieve a single target page of UserInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function getPage
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {string|list} [opts.identity] - The identity
   * @param {string} [opts.segment] - The segment
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  UserListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({
      method: 'GET',
      uri: targetUrl
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new UserPage(
        this._version,
        payload,
        this._solution
      ));
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
   * Constructs a user
   *
   * @function get
   * @memberof Twilio.Notify.V1.ServiceContext.UserList
   * @instance
   *
   * @param {string} identity - The identity
   *
   * @returns {Twilio.Notify.V1.ServiceContext.UserContext}
   */
  /* jshint ignore:end */
  UserListInstance.get = function get(identity) {
    return new UserContext(
      this._version,
      this._solution.serviceSid,
      identity
    );
  };

  return UserListInstance;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Notify.V1.ServiceContext.UserPage
 * @augments Page
 * @description Initialize the UserPage
 *
 * @param {Twilio.Notify.V1} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns UserPage
 */
/* jshint ignore:end */
UserPage = function UserPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(UserPage.prototype, Page.prototype);
UserPage.prototype.constructor = UserPage;

/* jshint ignore:start */
/**
 * Build an instance of UserInstance
 *
 * @function getInstance
 * @memberof Twilio.Notify.V1.ServiceContext.UserPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns UserInstance
 */
/* jshint ignore:end */
UserPage.prototype.getInstance = function getInstance(payload) {
  return new UserInstance(
    this._version,
    payload,
    this._solution.serviceSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Notify.V1.ServiceContext.UserInstance
 * @description Initialize the UserContext
 *
 * @property {string} sid - The sid
 * @property {string} accountSid - The account_sid
 * @property {string} serviceSid - The service_sid
 * @property {string} identity - The identity
 * @property {Date} dateCreated - The date_created
 * @property {Date} dateUpdated - The date_updated
 * @property {string} segments - The segments
 * @property {string} url - The url
 * @property {string} links - The links
 *
 * @param {Twilio.Notify.V1} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} serviceSid - The service_sid
 * @param {sid_like} identity - The identity
 */
/* jshint ignore:end */
UserInstance = function UserInstance(version, payload, serviceSid, identity) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.serviceSid = payload.service_sid; // jshint ignore:line
  this.identity = payload.identity; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.segments = payload.segments; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    serviceSid: serviceSid,
    identity: identity || this.identity,
  };
};

Object.defineProperty(UserInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new UserContext(
        this._version,
        this._solution.serviceSid,
        this._solution.identity
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * remove a UserInstance
 *
 * @function remove
 * @memberof Twilio.Notify.V1.ServiceContext.UserInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed UserInstance
 */
/* jshint ignore:end */
UserInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * fetch a UserInstance
 *
 * @function fetch
 * @memberof Twilio.Notify.V1.ServiceContext.UserInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed UserInstance
 */
/* jshint ignore:end */
UserInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * Access the bindings
 *
 * @function bindings
 * @memberof Twilio.Notify.V1.ServiceContext.UserInstance
 * @instance
 *
 * @returns {Twilio.Notify.V1.ServiceContext.UserContext.UserBindingList}
 */
/* jshint ignore:end */
UserInstance.prototype.bindings = function bindings() {
  return this._proxy.bindings;
};

/* jshint ignore:start */
/**
 * Access the segmentMemberships
 *
 * @function segmentMemberships
 * @memberof Twilio.Notify.V1.ServiceContext.UserInstance
 * @instance
 *
 * @returns {Twilio.Notify.V1.ServiceContext.UserContext.SegmentMembershipList}
 */
/* jshint ignore:end */
UserInstance.prototype.segmentMemberships = function segmentMemberships() {
  return this._proxy.segmentMemberships;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Notify.V1.ServiceContext.UserContext
 * @description Initialize the UserContext
 *
 * @property {Twilio.Notify.V1.ServiceContext.UserContext.UserBindingList} bindings -
 *          bindings resource
 * @property {Twilio.Notify.V1.ServiceContext.UserContext.SegmentMembershipList} segmentMemberships -
 *          segmentMemberships resource
 *
 * @param {Twilio.Notify.V1} version - Version of the resource
 * @param {sid} serviceSid - The service_sid
 * @param {sid_like} identity - The identity
 */
/* jshint ignore:end */
UserContext = function UserContext(version, serviceSid, identity) {
  this._version = version;

  // Path Solution
  this._solution = {
    serviceSid: serviceSid,
    identity: identity,
  };
  this._uri = _.template(
    '/Services/<%= serviceSid %>/Users/<%= identity %>' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._bindings = undefined;
  this._segmentMemberships = undefined;
};

/* jshint ignore:start */
/**
 * remove a UserInstance
 *
 * @function remove
 * @memberof Twilio.Notify.V1.ServiceContext.UserContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed UserInstance
 */
/* jshint ignore:end */
UserContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
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
 * fetch a UserInstance
 *
 * @function fetch
 * @memberof Twilio.Notify.V1.ServiceContext.UserContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed UserInstance
 */
/* jshint ignore:end */
UserContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new UserInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.identity
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

Object.defineProperty(UserContext.prototype,
  'bindings', {
  get: function() {
    if (!this._bindings) {
      this._bindings = new UserBindingList(
        this._version,
        this._solution.serviceSid,
        this._solution.identity
      );
    }
    return this._bindings;
  }
});

Object.defineProperty(UserContext.prototype,
  'segmentMemberships', {
  get: function() {
    if (!this._segmentMemberships) {
      this._segmentMemberships = new SegmentMembershipList(
        this._version,
        this._solution.serviceSid,
        this._solution.identity
      );
    }
    return this._segmentMemberships;
  }
});

module.exports = {
  UserList: UserList,
  UserPage: UserPage,
  UserInstance: UserInstance,
  UserContext: UserContext
};