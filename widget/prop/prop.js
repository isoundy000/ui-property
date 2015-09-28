Editor.registerElement({

    properties: {
        prop: {
            value: function () {
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

        disabled: {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true,
        },
    },

    ready: function () {
    },

    _isValueProp: function ( type ) {
        if ( type === 'Array' )
            return false;

        if ( type === 'Object' )
            return false;

        return true;
    },

    _isArrayProp: function ( type ) {
        if ( type === 'Array' )
            return true;

        return false;
    },

    _isObjectProp: function ( type ) {
        if ( type === 'Object' )
            return true;

        return false;
    },
});
