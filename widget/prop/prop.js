Editor.registerWidget( 'editor-prop', {
    is: 'editor-prop',

    properties: {
        type: {
            type: String,
            value: '',
        },

        name: {
            type: String,
            value: '',
        },

        attrs: {
            type: Object,
            value: function () { return {}; },
        },

        value: {
            value: null,
            notify: true,
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
