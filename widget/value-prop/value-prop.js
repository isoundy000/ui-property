Editor.registerElement({

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
        prop: {
            value: function () {
                return {
                    path: '',
                    type: '',
                    name: '',
                    attrs: {},
                    value: null,
                };
            },
            notify: true,
        },

        slidable: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },
    },

    ready: function () {
        this._initFocusable(this);
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

        if (this.slidable) {
            var lastValue = this.prop.value;

            var min = Number.NEGATIVE_INFINITY;
            if ( typeof this.prop.attrs.min === 'number' ) min = this.prop.attrs.min;

            var max = Number.POSITIVE_INFINITY;
            if ( typeof this.prop.attrs.max === 'number' ) max = this.prop.attrs.max;

            EditorUI.startDrag('ew-resize', event,function (event, dx, dy, offsetx, offsety) {
                this.set('prop.value', Math.clamp(lastValue + offsetx, min, max));
            }.bind(this),null);
        }
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
});
