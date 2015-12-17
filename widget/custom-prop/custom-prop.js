'use strict';

Editor.registerElement({

  behaviors: [EditorUI.focusable],

  listeners: {
    'focus': '_onFocus',
    'blur': '_onBlur',
    'focusin': '_onFocusIn',
    'focusout': '_onFocusOut',
    'mousedown': '_onMouseDown',
    'keydown': '_onKeyDown',
    'disabled-changed': '_onDisabledChanged',
  },

  properties: {
    name: {
      type: String,
      value: '',
    },
  },

  ready () {
    this._initFocusable(this);
  },

  _nameText ( name ) {
    if ( name ) {
      return EditorUI.toHumanText(name);
    }
    return '(Anonymous)';
  },

  _nameClass ( name ) {
    if ( name ) {
      return 'name flex-1';
    }
    return 'name anonymous flex-1';
  },

  _onFocusIn () {
    this._setFocused(true);
  },

  _onFocusOut () {
    this._setFocused(false);
  },

  _onMouseDown ( event ) {
    event.preventDefault();
    event.stopPropagation();

    let children = Polymer.dom(this).children;
    for ( let i = 0; i < children.length; ++i ) {
      let el = EditorUI.getFirstFocusableChild(children[i]);
      if ( el ) {
        el.focus();
        break;
      }
    }
  },

  _onFieldMouseDown ( event ) {
    event.stopPropagation();
    // don't do any propagation if we mouse down on field
  },

  _onKeyDown (event) {
    // enter
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      let children = Polymer.dom(this).children;
      for ( let i = 0; i < children.length; ++i ) {
        let el = EditorUI.getFirstFocusableChild(children[i]);
        if ( el ) {
          el.focus();
          break;
        }
      }
    }
  },

  _onDisabledChanged ( event ) {
    let children = Polymer.dom(this).children;
    for ( let i = 0; i < children.length; ++i ) {
      let childEL = children[i];
      if ( childEL.disabled !== undefined ) {
        childEL.disabled = event.detail.value;
      }
    }
  },
});
