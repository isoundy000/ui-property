'use strict';

Editor.registerElement({
  properties: {
    label: {
      type: String,
      value: '',
    },

    type: {
      type: String,
      value: '',
    },

    path: {
      type: String,
      value: '',
    },
  },

  _onCreateClick ( event ) {
    event.stopPropagation();
    this.fire('new-prop', {
      path: this.path,
      type: this.type,
    });
  },
});
