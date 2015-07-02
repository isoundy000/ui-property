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
        if ( this.value === undefined ) {
            return;
        }

        var thisDOM = Polymer.dom(this);
        var type;

        if ( thisDOM.firstChild ) {
            thisDOM.removeChild( thisDOM.firstChild );
        }

        if ( this.value === null ) {
            type = 'null';
        }
        else {
            if ( this.attrs.type ) {
                type = this.attrs.type.toLowerCase();
            } else {
                type = typeof this.value;
            }
        }

        var propCreator = Editor.properties[type];
        if ( !propCreator ) {
            Editor.error( 'Failed to create field %s.', type );
            return;
        }

        var propEL = propCreator( this, this.value, this.attrs );
        thisDOM.appendChild(propEL);
    },

    _valueChanged: function () {
        this._rebuild();
    },

    _attrsChanged: function () {
        this._rebuild();
    },

});
