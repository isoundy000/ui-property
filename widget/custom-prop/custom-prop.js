Editor.registerWidget( 'editor-custom-prop', {
    is: 'editor-custom-prop',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focusin': '_onFocusIn',
        'focusout': '_onFocusOut',
        'mousedown': '_onMouseDown',
        'keydown': '_onKeyDown',
        'disabled-changed': '_onDisabledChanged',
    },

    properties: {
        name: {
            type: String,
            value: '',
        },
    },

    ready: function () {
        this._initFocusable(this);

        if ( this.name ) {
            this.name = EditorUI.toHumanText(this.name);
        }
    },

    _nameText: function () {
        if ( this.name )
            return this.name;
        return '(Anonymous)';
    },

    _nameClass: function () {
        if ( this.name )
            return 'name flex-1';
        return 'name anonymous flex-1';
    },

    _onFocusIn: function ( event ) {
        this._setFocused(true);
    },

    _onFocusOut: function ( event ) {
        this._setFocused(false);
    },

    _onMouseDown: function ( event ) {
        event.preventDefault();
        event.stopPropagation();

        var children = Polymer.dom(this).children;
        for ( var i = 0; i < children.length; ++i ) {
            var el = EditorUI.getFirstFocusableChild(children[i]);
            if ( el ) {
                el.focus();
                break;
            }
        }
    },

    _onFieldMouseDown: function ( event ) {
        event.stopPropagation();
        // don't do any propagation if we mouse down on field
    },

    _onKeyDown: function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            var children = Polymer.dom(this).children;
            for ( var i = 0; i < children.length; ++i ) {
                var el = EditorUI.getFirstFocusableChild(children[i]);
                if ( el ) {
                    el.focus();
                    break;
                }
            }
        }
    },

    _onDisabledChanged: function ( event ) {
        var children = Polymer.dom(this).children;
        for ( var i = 0; i < children.length; ++i ) {
            var childEL = children[i];
            if ( childEL.disabled !== undefined ) {
                childEL.disabled = event.detail.value;
            }
        }
    },
});
