(function () {
    'use strict';

    var type2widget = {
        'null-or-undefined': function ( fieldEL, info ) {
            var el = document.createElement('editor-null-field');

            el.path = info.path;
            el.type = info.attrs.type;
            el.label = info.value === null ? 'null' : 'undefined';

            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'error': function ( text ) {
            var el = document.createElement('editor-label');
            el.classList.add('red');
            Polymer.dom(el).innerHTML = 'Error: ' + text;

            var div = document.createElement('div');
            div.classList.add('layout');
            div.classList.add('horizontal');
            Polymer.dom(div).appendChild(el);

            return div;
        },

        'Boolean': function ( fieldEL, info ) {
            var el = document.createElement('editor-checkbox');

            el.checked = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'checked' );

            return el;
        },

        'Integer': function ( fieldEL, info ) {
            var el = document.createElement('editor-unit-input');

            el.min = info.attrs.min;
            el.max = info.attrs.max;
            el.inputValue = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'Float': function ( fieldEL, info ) {
            var el;
            if ( info.attrs.min !== undefined && info.attrs.max !== undefined ) {
                el = document.createElement('editor-slider');

                el.setAttribute('input','');
                el.min = info.attrs.min;
                el.max = info.attrs.max;
                el.value = info.value;

                EditorUI.bind( fieldEL, 'value', el, 'value' );
            }
            else {
                el = document.createElement('editor-unit-input');

                el.min = info.attrs.min;
                el.max = info.attrs.max;
                el.inputValue = info.value;
                EditorUI.bind( fieldEL, 'value', el, 'input-value' );
            }
            return el;
        },

        'Number': function ( fieldEL, info ) {
            var el = document.createElement('editor-unit-input');

            el.min = info.attrs.min;
            el.max = info.attrs.max;
            el.inputValue = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'String': function ( fieldEL, info ) {
            var el = document.createElement('editor-input');

            el.inputValue = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'Enum': function ( fieldEL, info ) {
            var el = document.createElement('editor-select');

            // attrs.enumList
            info.attrs.enumList.forEach( function ( item ) {
                el.add( item.value, item.name );
            });

            // we must wait until menu ready
            fieldEL.async( function () {
                el.value = info.value;

                var el1 = fieldEL;
                var el2 = el;

                // FIXME: there is a bug in iron-selector, that it can not select Number 0
                el1.addEventListener( 'value-changed', function ( event ) {
                    if ( event.detail.path )
                        el2.set( event.detail.path, event.detail.value );
                    else
                        el2.set( 'value', event.detail.value );
                });
                el2.addEventListener( 'value-changed', function ( event ) {
                    if ( event.detail.path )
                        el1.set( event.detail.path, parseInt(event.detail.value) );
                    else
                        el1.set( 'value', parseInt(event.detail.value) );
                });
            });

            return el;
        },

        'cc.Vec2': function ( fieldEL, info ) {
            var el = document.createElement('fire-vec2');

            el.value = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'cc.Color': function ( fieldEL, info ) {
            var el = document.createElement('fire-color');

            el.value = info.value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'cc.RawAsset': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'raw-asset' );
        },

        'cc.Asset': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'asset' );
        },

        'cc.TextureAsset': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'texture' );
        },

        'cc.BitmapFont': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'bitmap-font' );
        },

        'cc.TTFFont': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'ttf-font' );
        },

        'cc.AudioClip': function ( fieldEL, info ) {
            return Editor.bindAsset( fieldEL, info.value, info.attrs, 'audio-clip' );
        },

        'cc.NodeWrapper': function ( fieldEL, info ) {
            return Editor.bindNode( fieldEL, info.value, info.attrs, 'cc.NodeWrapper' );
        },

    };

    for ( var t in type2widget ) {
        Editor.properties[t] = type2widget[t];
    }

    Editor.bindNode = function ( fieldEL, value, attrs, type ) {
        var el = document.createElement('fire-node');

        el.type = type;
        el.value = value ? value.uuid : '';
        EditorUI.bindUUID( fieldEL, 'value', el, 'value' );

        return el;
    };

    Editor.bindAsset = function ( fieldEL, value, attrs, type ) {
        var el = document.createElement('fire-asset');

        el.type = type;
        el.value = value ? value.uuid : '';
        EditorUI.bindUUID( fieldEL, 'value', el, 'value' );

        return el;
    };
})();
