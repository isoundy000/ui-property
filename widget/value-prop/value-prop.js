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

    slidable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
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
    this.$.field.editing = true;
  },

  _onFocusOut () {
    this._setFocused(false);
    this.$.field.editing = false;
  },

  _onMouseDown ( event ) {
    event.preventDefault();
    event.stopPropagation();

    var el = EditorUI.getFirstFocusableChild( this.$.field );
    if ( el )
      el.focus();

    if (this.slidable) {
      var lastValue = this.prop.value;

      var min = Number.NEGATIVE_INFINITY;
      if ( typeof this.prop.attrs.min === 'number' ) min = this.prop.attrs.min;

      var max = Number.POSITIVE_INFINITY;
      if ( typeof this.prop.attrs.max === 'number' ) max = this.prop.attrs.max;

      EditorUI.startDrag('ew-resize', event, (event, dx, dy, offsetx, offsety) => {
        this.set('prop.value', Editor.Math.clamp(lastValue + offsetx, min, max));
      }, () => {
        this.async(() => {
          this.fire('end-editing');
        },1);
      });
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

      var el = EditorUI.getFirstFocusableChild( this.$.field );
      if ( el ) {
        el.focus();
      }
    }
  },
});
