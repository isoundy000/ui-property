'use strict';

Editor.registerElement({

    behaviors: [EditorUI.focusable],

    listeners: {
        'disabled-changed': '_onDisabledChanged',
    },

    properties: {
        prop: {
            value () {
                return {
                    path: '',
                    type: '',
                    name: '',
                    attrs: {},
                    value: [],
                };
            },
            notify: true,
            observer: '_propChanged',
        },

        folded: {
            type: Boolean,
            value: true,
        },
    },

    ready () {
        this._initFocusable(this.$.focus);
    },

    _nameText ( name, attrs ) {
        if ( attrs && attrs.displayName ) {
            return attrs.displayName;
        }
        else if ( name ) {
            return EditorUI.toHumanText(name);
        }

        return '(Anonymous)';
    },

    _nameClass ( name, attrs ) {
        if ( attrs && attrs.displayName ) {
            return 'name flex-1';
        }
        else if ( name ) {
            return 'name flex-1';
        }

        return 'name anonymous flex-1';
    },

    _onFocusIn () {
        this._setFocused(true);
        this.$.field.editing = true;
    },

    _onFocusOut () {
        this._setFocused(false);
        this.$.field.editing = false;
    },

    _onMouseDown ( event ) {
        event.preventDefault();
        event.stopPropagation();

        let el = EditorUI.getFirstFocusableChild( this.$.field );
        if ( el ) {
            el.focus();
        }
    },

    _onFieldMouseDown ( event ) {
        event.stopPropagation();
        // don't do any propagation if we mouse down on field
    },

    _onKeyDown (event) {
        // enter
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            let el = EditorUI.getFirstFocusableChild( this.$.field );
            if ( el ) {
                el.focus();
            }
        }
    },

    _onDisabledChanged ( event ) {
        let children = Polymer.dom(this.$.field).children;
        for ( let i = 0; i < children.length; ++i ) {
            let childEL = children[i];
            if ( childEL.disabled !== undefined ) {
                childEL.disabled = event.detail.value;
            }
        }
    },

    _onFoldMouseDown ( event ) {
        event.stopPropagation();
        event.preventDefault();
    },

    _onFoldClick ( event ) {
        event.stopPropagation();

        if ( event.which !== 1 ) {
            return;
        }

        this.folded = !this.folded;
    },

    _foldClass ( folded ) {
        if ( folded ) {
            return 'fa fa-caret-right fold flex-none';
        }

        return 'fa fa-caret-down fold flex-none';
    },

    // auto folded array
    _propChanged ( newValue ) {
        if ( newValue.value.length >= 10 ) {
            this.set('folded', true);
        } else {
            this.set('folded', false);
        }
    },

    _onArrayLengthChanged ( event ) {
        let originalLength = this.prop.value.length;
        this.notifyPath('prop.value.length', event.detail.value );
        this.prop.value.length = originalLength;
    },
});
