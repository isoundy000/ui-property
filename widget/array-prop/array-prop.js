Editor.registerWidget( 'editor-array-prop', {
    is: 'editor-array-prop',

    behaviors: [EditorUI.focusable],

    listeners: {
        'disabled-changed': '_onDisabledChanged',
    },

    properties: {
        prop: {
            value: function () {
                return {
                    path: '',
                    type: '',
                    name: '',
                    attrs: {},
                    value: [],
                };
            },
            notify: true,
        },

        folded: {
            type: Boolean,
            value: true,
        },
    },

    ready: function () {
        this._initFocusable(this.$.focus);
    },

    _nameText: function ( name, attrs ) {
        if ( attrs && attrs.displayName ) {
            return attrs.displayName;
        }
        else if ( name ) {
            return EditorUI.toHumanText(name);
        }

        return '(Anonymous)';
    },

    _nameClass: function ( name, attrs ) {
        if ( attrs && attrs.displayName ) {
            return 'name flex-1';
        }
        else if ( name ) {
            return 'name flex-1';
        }

        return 'name anonymous flex-1';
    },

    _onFocusIn: function ( event ) {
        this._setFocused(true);
        this.$.field.editing = true;
    },

    _onFocusOut: function ( event ) {
        this._setFocused(false);
        this.$.field.editing = false;
    },

    _onMouseDown: function ( event ) {
        event.preventDefault();
        event.stopPropagation();

        var el = EditorUI.getFirstFocusableChild( this.$.field );
        if ( el )
            el.focus();
    },

    _onFieldMouseDown: function ( event ) {
        event.stopPropagation();
        // don't do any propagation if we mouse down on field
    },

    _onKeyDown: function (event) {
        // enter
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            var el = EditorUI.getFirstFocusableChild( this.$.field );
            if ( el )
                el.focus();
        }
    },

    _onDisabledChanged: function ( event ) {
        var children = Polymer.dom(this.$.field).children;
        for ( var i = 0; i < children.length; ++i ) {
            var childEL = children[i];
            if ( childEL.disabled !== undefined ) {
                childEL.disabled = event.detail.value;
            }
        }
    },

    _onFoldMouseDown: function ( event ) {
        event.stopPropagation();
        event.preventDefault();
    },

    _onFoldClick: function ( event ) {
        event.stopPropagation();

        if ( event.which !== 1 )
            return;

        this.folded = !this.folded;
    },

    _foldClass: function ( folded ) {
        if ( folded ) {
            return 'fa fa-caret-right fold flex-none';
        }

        return 'fa fa-caret-down fold flex-none';
    },

    _onArrayLengthChanged: function ( event ) {
        this.notifyPath('prop.value.length', event.detail.value );
    },
});
