'use strict';

Editor.registerElement({
  properties: {
    message: {
      type: String,
      value: '',
    },

    resetable: {
      type: Boolean,
      value: false,
    },

    path: {
      type: String,
      value: '',
    },

    type: {
      type: String,
      value: '',
    },
  },

  _onResetClick ( event ) {
    event.stopPropagation();
    this.fire('reset-prop', {
      path: this.path,
      type: this.type,
    });
  },
});
