(function () {
    var type2widget = {
        'null-or-undefined': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-label'];
            var el = new ctor();

            el.classList.add('mini');
            if ( value === null )
                Polymer.dom(el).innerHTML = 'null';
            else
                Polymer.dom(el).innerHTML = 'undefined';

            // TODO
            // // add a create button
            // ctor = Editor.widgets['editor-button'];
            // var btnEL = new ctor();
            // Polymer.dom(btnEL).innerHTML = 'Create';
            // Polymer.dom(fieldEL).appendChild(btnEL);

            return el;
        },

        'error': function ( text ) {
            var ctor = Editor.widgets['editor-label'];
            var el = new ctor();
            el.classList.add('red');
            Polymer.dom(el).innerHTML = 'Error: ' + text;

            var div = document.createElement('div');
            div.classList.add('layout');
            div.classList.add('horizontal');
            Polymer.dom(div).appendChild(el);

            return div;
        },

        'boolean': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-checkbox'];
            var el = new ctor();

            el.checked = value;
            EditorUI.bind( fieldEL, 'value', el, 'checked' );

            return el;
        },

        'integer': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-unit-input'];
            var el = new ctor();

            el.min = attrs.min;
            el.max = attrs.max;
            el.inputValue = value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'float': function ( fieldEL, value, attrs ) {
            var ctor, el;
            if ( attrs.min !== undefined && attrs.max !== undefined ) {
                ctor = Editor.widgets['editor-slider'];
                el = new ctor();

                el.setAttribute('input','');
                el.min = attrs.min;
                el.max = attrs.max;
                el.value = value;

                EditorUI.bind( fieldEL, 'value', el, 'value' );
            }
            else {
                ctor = Editor.widgets['editor-unit-input'];
                el = new ctor();

                el.min = attrs.min;
                el.max = attrs.max;
                el.inputValue = value;
                EditorUI.bind( fieldEL, 'value', el, 'input-value' );
            }
            return el;
        },

        'number': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-unit-input'];
            var el = new ctor();

            el.min = attrs.min;
            el.max = attrs.max;
            el.inputValue = value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'string': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-input'];
            var el = new ctor();

            el.inputValue = value;
            EditorUI.bind( fieldEL, 'value', el, 'input-value' );

            return el;
        },

        'enum': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['editor-select'];
            var el = new ctor();

            // attrs.enumList
            attrs.enumList.forEach( function ( item ) {
                el.add( item.value, item.name );
            });

            // we must wait until menu ready
            fieldEL.async( function () {
                el.value = value;

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

        // 'array': function ( fieldEL, value, attrs ) {
        //     return null;
        // },

        // 'object': function ( fieldEL, value, attrs ) {
        //     return null;
        // },

        'fire.vec2': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-vec2'];
            var el = new ctor();

            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.color': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-color'];
            var el = new ctor();

            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.asset': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-asset'];
            var el = new ctor();

            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.node': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-node'];
            var el = new ctor();

            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.texture': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-asset'];
            var el = new ctor();

            el.type = 'texture';
            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.bitmapfont': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-asset'];
            var el = new ctor();

            el.type = 'bitmap-font';
            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },

        'fire.ttffont': function ( fieldEL, value, attrs ) {
            var ctor = Editor.widgets['fire-asset'];
            var el = new ctor();

            el.type = 'ttf-font';
            el.value = value;
            EditorUI.bind( fieldEL, 'value', el, 'value' );

            return el;
        },
    };

    for ( var t in type2widget ) {
        Editor.properties[t] = type2widget[t];
    }
})();
