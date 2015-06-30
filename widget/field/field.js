Editor.registerWidget( 'editor-field', {
    is: 'editor-field',

    properties: {
        value: {
            value: null,
            notify: true,
        },

        attrs: {
            type: Object,
            value: function () { return {}; },
        },
    },

    ready: function () {
        var thisDOM = Polymer.dom(this);

        var type;
        if ( this.attrs.type ) {
            type = this.attrs.type.toLowerCase();
        } else {
            type = typeof this.value;
        }

        var propCreator = Editor.properties[type];
        if ( !propCreator ) {
            Editor.error( 'Failed to create field %s.', type );
            return;
        }

        var propEL = propCreator( this, this.value, this.attrs );
        thisDOM.appendChild(propEL);
    },

    factoryImpl: function ( value, attrs ) {
        this.value = value;
        this.attrs = attrs;
    },

});
