Editor.registerWidget( 'editor-array-size', {
    is: 'editor-array-size',

    properties: {
        value: {
            value: function () { return []; },
            notify: true,
        },
    },

    observers: [
        'sizeChanged(value.length)'
    ],

    sizeChanged: function ( changeRecord ) {
        this.$.input.value = this.value.length;
    },
});
