'use strict';

Editor.registerElement({

  properties: {
    path: {
      type: String,
      value: '',
    },

    type: {
      type: String,
      value: '',
      observer: '_typeChanged',
    },

    attrs: {
      type: Object,
      value () { return {}; },
      observer: '_attrsChanged',
    },

    value: {
      value: null,
      notify: true,
      observer: '_valueChanged',
    },

    slidable: {
      type: Boolean,
      value: false,
      notify: true,
    },

    disabled: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
      observer: '_disabledChanged',
    },

    editing: {
      value: null,
      notify: true,
      reflectToAttribute: true,
    },
  },

  factoryImpl ( value, attrs ) {
    this.value = value;
    this.attrs = attrs;
  },

  ready () {
    this.rebuild();
  },

  rebuild () {
    this.debounce ('rebuild', () => {
      this._rebuild();
    }, 50);
  },

  _isExpectedType ( type ) {
    let attrsType = this.attrs.type;

    // if attrs.type is undefined, it means the type is dynamic changed ( which happend in getter property )
    if ( !attrsType ) {
      return true;
    }

    if ( type === attrsType ) {
      return true;
    }

    if ( this.attrs.extends && this.attrs.extends.indexOf(type) !== -1 ) {
      return true;
    }

    if ( type === 'Number' && (attrsType === 'Enum' || attrsType === 'Float' || attrsType === 'Integer') ) {
      return true;
    }

    return false;
  },

  _rebuild () {
    // if ( this.editing )
    //   return;

    // NOTE: never rebuild when type is Object or Array, this is because it will
    //     go to the object-prop and array-prop instead
    if ( this.type === 'Object' || this.type === 'Array' ) {
      return;
    }

    let thisDOM = Polymer.dom(this);
    let type;

    if ( thisDOM.firstChild ) {
      thisDOM.removeChild( thisDOM.firstChild );
    }

    if ( this.attrs === undefined || this.type === undefined ) {
      return;
    }

    //
    if ( this.value === null || this.value === undefined ) {
      type = 'null-or-undefined';
    }

    if ( this.type === 'error-unknown' ) {
      type = 'error-unknown';
    }

    if (
      this.attrs.extends &&
      this.attrs.extends.indexOf('cc.Component') !== -1
    ) {
      type = 'cc.Component';
    }

    if ( !type ) {
      if ( this.attrs.type ) {
        type = this.attrs.type;
      } else if ( this.type ) {
        type = this.type;
      } else {
        type = typeof this.value;
        type = type.charAt(0).toUpperCase() + type.slice(1);
      }
    }

    let propEL;

    // unknown type
    if ( type === 'error-unknown' ) {
      propEL = Editor.properties.error('Unknown Type');
    }

    // check if type error
    if ( !propEL ) {
      if ( this.value !== null && this.value !== undefined ) {
        let curType = this.type;
        if ( !curType ) {
          curType = typeof this.value;
          curType = curType.charAt(0).toUpperCase() + curType.slice(1);
        }
        if ( !this._isExpectedType(curType) ) {
          Editor.error( `Failed to create field ${curType}. type not the same ${curType}:${this.attrs.type}` );
          propEL = Editor.properties.error( 'Error: type not the same', true, this.path, this.attrs.type );
        }
      }
    }

    let propCreator;

    // try to get propCreator
    if ( !propEL ) {
      propCreator = Editor.properties[type];
      if ( !propCreator ) {
        Editor.error( `Failed to create field ${type}.` );
        propEL = Editor.properties.error( `Error: type '${type}' not found` );
      }
    }

    // try to create propEL
    if ( !propEL ) {
      try {
        propEL = propCreator( this, {
          value: this.value,
          attrs: this.attrs,
          type: type,
          path: this.path,
        });
        propEL.readonly = this.attrs.readonly;
        propEL.disabled = this.disabled;
      }
      catch ( error ) {
        Editor.error( `Failed to create field ${type}. Message: ${error.stack}` );
        propEL = Editor.properties.error( `Error: type '${type}' create failed` );
      }
    }

    if ( type === 'Number' || type === 'Float' || type === 'Integer' ) {
      this.set( 'slidable', true );
    }

    //
    thisDOM.appendChild(propEL);
  },

  _valueChanged ( newValue, oldValue ) {
    if ( oldValue === null || oldValue === undefined ) {
      if ( newValue !== null && newValue !== undefined ) {
        this.rebuild();
        return;
      }
    }

    if ( typeof newValue !== typeof oldValue ) {
      this.rebuild();
      return;
    }
  },

  _attrsChanged () {
    this.rebuild();
  },

  _typeChanged () {
    this.rebuild();
  },

  _disabledChanged ( newValue ) {
    let thisDOM = Polymer.dom(this);
    if ( thisDOM.firstChild ) {
      thisDOM.firstChild.disabled = newValue;
    }
  },

  // TODO
  // behaviors: [
  //   Polymer.Templatizer
  // ],

  // _forwardParentProp (prop, value) {
  //   if (this._instance) {
  //     this._instance[prop] = value;
  //   }
  // },

  // _forwardParentPath (path, value) {
  //   if (this._instance) {
  //     this._instance.notifyPath(path, value, true);
  //   }
  // },

  // _forwardInstanceProp (inst, prop, value) {
  //   this[prop] = value;
  // },

  // _forwardInstancePath (inst, path, value) {
  //   this.notifyPath(path, value);
  // },
  // TODO

});
