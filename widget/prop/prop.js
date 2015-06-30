Editor.registerWidget( 'editor-prop', {
    is: 'editor-prop',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focusin': '_onFocusIn',
        'focusout': '_onFocusOut',
        'mousedown': '_onMouseDown',
        'keydown': '_onKeyDown',
    },

    properties: {
        value: {
            value: null,
            notify: true,
        },

        name: {
            type: String,
            value: '',
        },

        attrs: {
            type: Object,
            value: function () { return {}; },
        },
    },

    ready: function () {
        this._initFocusable(this);

        if ( this.attrs.displayName ) {
            this.name = this.attrs.displayName;
        } else if ( this.name ) {
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

        var el = EditorUI.getFirstFocusableChild( this.$.field );
        el.focus();
    },

    _onFieldMouseDown: function ( event ) {
        event.stopPropagation();
        // don't do any propagation if we mouse down on field
    },

    _onKeyDown: function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            var el = EditorUI.getFirstFocusableChild( this.$.field );
            el.focus();
        }
    },
});
