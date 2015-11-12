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
            value: function () { return {}; },
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

    factoryImpl: function ( value, attrs ) {
        this.value = value;
        this.attrs = attrs;
    },

    ready: function () {
        this.rebuild();
    },

    rebuild: function () {
        this.debounce ('rebuild', function () {
            this._rebuild();
        }, 50);
    },

    _rebuild: function () {
        // if ( this.editing )
        //     return;

        // NOTE: never rebuild when type is Object or Array, this is because it will
        //       go to the object-prop and array-prop instead
        if ( this.type === 'Object' || this.type === 'Array' )
            return;

        var thisDOM = Polymer.dom(this);
        var type, propEL;

        if ( thisDOM.firstChild ) {
            thisDOM.removeChild( thisDOM.firstChild );
        }

        if ( this.attrs === undefined || this.type === undefined )
            return;

        if ( this.value === null || this.value === undefined ) {
            type = 'null-or-undefined';
        }

        //
        if ( !type ) {
            if ( this.attrs.type ) {
                type = this.attrs.type;
            }
            else if ( this.type ) {
                type = this.type;
            }
            else {
                type = typeof this.value;
                type = type.charAt(0).toUpperCase() + type.slice(1);
            }

            // check if type error
            if ( this.type && this.attrs.type ) {
                if ( this.type !== this.attrs.type ) {
                    if (this.attrs.extends &&
                        this.attrs.extends.indexOf(type) === -1)
                        {
                            Editor.error( 'Failed to create field %s. Message: type not the same %s:%s', type, this.type, this.attrs.type );
                            propEL = new Editor.properties.error('value and attr has different type');
                        }
                }
            }
        }

        let propCreator;

        // try to get propCreator
        if ( !propEL ) {
            propCreator = Editor.properties[type];
            if ( !propCreator ) {
                Editor.error( 'Failed to create field %s.', type );
                propEL = new Editor.properties.error('Type not found: ' + type);
            }
        }

        // try to create propEL
        if ( !propEL ) {
            try {
                propEL = propCreator( this, {
                    value: this.value,
                    attrs: this.attrs,
                    type: this.type,
                    path: this.path,
                });
                propEL.readonly = this.attrs.readonly;
                propEL.disabled = this.disabled;
            }
            catch ( error ) {
                Editor.error( 'Failed to create field %s. Message: %s', type, error.stack );
                propEL = new Editor.properties.error( 'Element create failed for type: ' + type );
            }
        }

        if ( type === 'Number' || type === 'Float' || type === 'Integer' ) {
            this.set( 'slidable', true );
        }

        //
        thisDOM.appendChild(propEL);
    },

    _valueChanged: function ( newValue, oldValue ) {
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

    _attrsChanged: function () {
        this.rebuild();
    },

    _typeChanged: function () {
        this.rebuild();
    },

    _disabledChanged: function ( newValue ) {
        var thisDOM = Polymer.dom(this);
        if ( thisDOM.firstChild ) {
            thisDOM.firstChild.disabled = newValue;
        }
    },

    // TODO
    // behaviors: [
    //   Polymer.Templatizer
    // ],

    // _forwardParentProp: function(prop, value) {
    //     if (this._instance) {
    //         this._instance[prop] = value;
    //     }
    // },

    // _forwardParentPath: function(path, value) {
    //     if (this._instance) {
    //         this._instance.notifyPath(path, value, true);
    //     }
    // },

    // _forwardInstanceProp: function(inst, prop, value) {
    //     this[prop] = value;
    // },

    // _forwardInstancePath: function(inst, path, value) {
    //     this.notifyPath(path, value);
    // },
    // TODO

});
