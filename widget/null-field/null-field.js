Editor.registerWidget( 'editor-null-field', {
    is: 'editor-null-field',

    properties: {
        label: {
            type: String,
            value: '',
        },

        type: {
            type: String,
            value: '',
        },

        path: {
            type: String,
            value: '',
        },
    },

    _onCreateClick: function ( event ) {
        event.stopPropagation();
        this.fire('new-prop', {
            path: this.path,
            type: this.type,
        });
    },
});
