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
            'cc.Vec2',
            'cc.Color',
            'cc.RawAsset',
            'cc.Asset',
            'cc.TextureAsset',
            'cc.BitmapFont',
            'cc.TTFFont',
            'cc.AudioClip',
            'cc.NodeWrapper',
        ].forEach(function ( item ) {
            delete Editor.properties[item];
        });
    },

    'ui-property:open': function () {
        Editor.Panel.open('ui-property.panel');
    },
};
