'use strict';

Editor.registerElement({

  behaviors: [EditorUI.focusable],

  listeners: {
    'disabled-changed': '_onDisabledChanged',
  },

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

    folded: {
      type: Boolean,
      value: true,
    },
  },

  ready () {
    this._initFocusable(this.$.focus);
  },

  _nameText ( name, attrs ) {
    if ( attrs && attrs.displayName ) {
      return attrs.displayName;
    }
    else if ( name ) {
      return EditorUI.toHumanText(name);
    }

    return '(Anonymous)';
  },

  _nameClass ( name, attrs ) {
    if ( attrs && attrs.displayName ) {
      return 'name flex-1';
    }
    else if ( name ) {
      return 'name flex-1';
    }

    return 'name anonymous flex-1';
  },

  _onKeyDown (event) {
    // press 'enter' and 'space'
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = !this.folded;
    }
    // press left
    else if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = true;
    }
    // press right
    else if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();
      this.folded = false;
    }
  },

  _onFoldClick ( event ) {
    event.stopPropagation();

    if ( event.which !== 1 )
      return;

    this.folded = !this.folded;
  },

  _onDisabledChanged () {
    // TODO
    // var children = Polymer.dom(this.$.field).children;
    // for ( var i = 0; i < children.length; ++i ) {
    //   var childEL = children[i];
    //   if ( childEL.disabled !== undefined ) {
    //     childEL.disabled = event.detail.value;
    //   }
    // }
  },

  _foldClass ( folded ) {
    if ( folded ) {
      return 'fa fa-caret-right fold flex-none';
    }

    return 'fa fa-caret-down fold flex-none';
  },
});
