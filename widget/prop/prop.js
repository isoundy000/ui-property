'use strict';

Editor.registerElement({
  properties: {
    prop: {
      value () {
        return {
          path: '',
          type: '',
          name: '',
          attrs: {},
          value: null,
        };
      },
      notify: true,
    },

    disabled: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
    },
  },

  ready () {
  },

  _isValueProp ( type ) {
    if ( type === 'Array' ) {
      return false;
    }

    if ( type === 'Object' ) {
      return false;
    }

    return true;
  },

  _isArrayProp ( type ) {
    if ( type === 'Array' ) {
      return true;
    }

    return false;
  },

  _isObjectProp ( type ) {
    if ( type === 'Object' ) {
      return true;
    }

    return false;
  },
});
