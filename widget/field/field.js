Editor.registerWidget( 'editor-field', {
    is: 'editor-field',

    properties: {
        value: {
            value: null,
            notify: true,
            observer: '_valueChanged',
        },

        attrs: {
            type: Object,
            value: function () { return {}; },
            observer: '_attrsChanged',
        },
    },

    ready: function () {
        this._rebuild();
    },

    factoryImpl: function ( value, attrs ) {
        this.value = value;
        this.attrs = attrs;
    },

    _rebuild: function () {
        var thisDOM = Polymer.dom(this);
        var type, propEL;

        if ( thisDOM.firstChild ) {
            thisDOM.removeChild( thisDOM.firstChild );
        }

        if ( this.attrs === undefined )
            return;

        if ( this.value === null || this.value === undefined ) {
            type = 'null-or-undefined';
        }
        else {
            if ( this.attrs.type ) {
                type = this.attrs.type.toLowerCase();
            }
            else if ( this.value.__type__ ) {
                type = this.value.__type__.toLowerCase();
            }
            else {
                type = typeof this.value;
            }

            // check if type error
            if ( this.attrs.type &&
                 this.value.__type__ &&
                 this.attrs.type !== this.value.__type__ )
            {
                Editor.error( 'Failed to create field %s. Message: type not the same', type );
                propEL = new Editor.properties.error('value and attr has different type');
            }
        }

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
                propEL = propCreator( this, this.value, this.attrs );
            }
            catch ( error ) {
                Editor.error( 'Failed to create field %s. Message: %s', type, error.stack );
                propEL = new Editor.properties.error( 'Element create failed for type: ' + type );
            }
        }

        //
        thisDOM.appendChild(propEL);
    },

    _valueChanged: function ( newValue, oldValue ) {
        if ( typeof oldValue !== typeof newValue ) {
            this._rebuild();
            return;
        }

        if ( oldValue.__type__ !== newValue.__type__ ) {
            this._rebuild();
            return;
        }
    },

    _attrsChanged: function ( newValue, oldValue ) {
        this._rebuild();
    },

});
