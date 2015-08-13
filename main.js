module.exports = {
    load: function () {
        require('./init');
    },

    unload: function () {
        [
            'null-or-undefined',
            'error',
            'Boolean',
            'Integer',
            'Float',
            'Number',
            'String',
            'Enum',
            'Fire.Vec2',
            'Fire.Color',
            'Fire.RawAsset',
            'Fire.Asset',
            'Fire.Texture',
            'Fire.BitmapFont',
            'Fire.TTFFont',
            'Fire.AudioClip',
            'Runtime.NodeWrapper',
        ].forEach(function ( item ) {
            delete Editor.properties[item];
        });
    },

    'ui-property:open': function () {
        Editor.Panel.open('ui-property.panel');
    },
};
