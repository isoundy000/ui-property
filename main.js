module.exports = {
    load: function () {
        require('./init');
    },

    unload: function () {
        [
            'boolean',
            'integer',
            'float',
            'number',
            'string',
            'enum',
            'array',
            'object',
            'fire.vec2',
            'fire.color',
            'fire.asset',
            'fire.node',
        ].forEach(function ( item ) {
            delete Editor.properties[item];
        });
    },

    'ui-property:open': function () {
        Editor.Panel.open('ui-property.panel');
    },
};
