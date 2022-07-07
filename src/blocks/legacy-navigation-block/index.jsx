

import "./style.scss";


import attributes_block from "./attributes.json";


(function (wp) {

    const { __ }                                 = wp.i18n ;
    const { registerBlockType }                  = wp.blocks;
    const { serverSideRender: ServerSideRender } = wp ;
    const { Fragment }                           = wp.element;

    const { InnerBlocks, BlockControls, BlockAlignmentToolbar } = wp.blockEditor;
    const { ToolbarGroup, ToolbarItem, Button, TextControl, TextareaControl, SelectControl, FocusableIframe } = wp.components;
    

    registerBlockType('maxpertici/legacy-navigation-block', {

        title: 'Legacy Navigation Block',

        icon: { background: '#F1F9F9', src: 'admin-site-alt2' },
        category: 'maxpertici',

        attributes: attributes_block ,

        edit( { attributes, className, setAttributes, isSelected } ){

            
            const { whoRenderPreview, title, text, cta_label, cta_link, navigation } = attributes ;

            return (
                <Fragment>

                    <BlockControls>

                        <BlockAlignmentToolbar
                            value={ attributes.textAlign }
                            onChange={ ( nextAlign ) => { setAttributes( { textAlign: nextAlign } ); } }
                        />

                        <ToolbarGroup>
                            <ToolbarItem as={ Button } onClick={ () => setAttributes( {  whoRenderPreview: ! whoRenderPreview } ) }>* SWITCH *</ToolbarItem>    
                        </ToolbarGroup>

                    </BlockControls>

                    { whoRenderPreview && <ServerSideRender block="maxpertici/legacy-navigation-block" attributes={ attributes } /> }

                    { ! whoRenderPreview && 

                        <FocusableIframe
                            width="1200"
                            height="600"
                            src="http://localhost:10004/wp-admin/nav-menus.php?admin-page-viewport=modal"
                            onFocus={ () => console.log( 'iframe is focused' ) }
                        />
                    }


                    { ! whoRenderPreview && 

                        <div className="whoEditorFields">

                            <div className="whoEditorFields__cell" data-ext-command-slug="title">

                                <div className="whoEditorFields__cell-title">{__( 'Title' )}</div>
                                <div>
                                <TextControl
                                    label="Title"
                                    value={ title }
                                    onChange={ ( nextTitle ) => { setAttributes( { title : nextTitle } ); } }
                                    type="text"
                                />
                                </div>
                            </div>

                            <div className="whoEditorFields__cell" data-ext-command-slug="text">

                                <div className="whoEditorFields__cell-title">{__( 'Text' )}</div>
                                <div>
                                <TextareaControl
                                    label="Textarea"
                                    rows={ 4 }
                                    value={ text }
                                    onChange={ ( nextText ) => { setAttributes( { text : nextText } ); } }
                                />
                                </div>
                                
                            </div>

                            <div className="whoEditorFields__cell" data-ext-command-slug="image">

                                <div className="whoEditorFields__cell-title">{__( 'Image' )}</div>
                                <div>
                                <SelectControl
                                    label={ __( 'Select some users:' ) }
                                    value={ navigation } // e.g: value = [ 'a', 'c' ]
                                    onChange={ ( nextNav ) => { setAttributes( { navigation: nextNav } ); } }
                                    
                                    options={ [
                                        { value: null, label: 'Select a Navigation', disabled: true },
                                        { value: 'a', label: 'Nav. A' },
                                        { value: 'b', label: 'Nav. B' },
                                        { value: 'c', label: 'Nav. c' },
                                    ] }
                                />
                                </div>
                            </div>

                            <div className="whoEditorFields__cell" data-ext-command-slug="cta">

                                <div className="whoEditorFields__cell-title">{__( 'CTA' )}</div>
                                <div>
                                <TextControl
                                    label="Label"
                                    value={ cta_label }
                                    onChange={ ( nextLabel ) => { setAttributes( { cta_label : nextLabel } ); } }
                                    type="text"
                                />
                                <TextControl
                                    label="Link"
                                    value={ cta_link }
                                    onChange={ ( nextLink ) => { setAttributes( { cta_link : nextLink } ); } }
                                    type="url"
                                />
                                </div>
                            </div>

                        </div>
                    } 

                </Fragment>
            );
        },

        save( { attributes, className } ){

            return null;
        },

    });
})(window.wp);