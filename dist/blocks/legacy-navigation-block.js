var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./blocks/legacy-navigation-block/attributes.json
var attributes_namespaceObject = JSON.parse('{"slug":{"type":"string","default":"legacy-navigation-block"},"whoRenderPreview":{"type":"boolean","default":false},"title":{"type":"string","default":""},"text":{"type":"string","default":""},"cta_label":{"type":"string","default":""},"cta_link":{"type":"string","default":""},"navigation":{"type":"string","default":""}}');
;// CONCATENATED MODULE: ./blocks/legacy-navigation-block/index.jsx



(function (wp) {
  const {
    __
  } = wp.i18n;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    serverSideRender: ServerSideRender
  } = wp;
  const {
    Fragment
  } = wp.element;
  const {
    InnerBlocks,
    BlockControls,
    BlockAlignmentToolbar
  } = wp.blockEditor;
  const {
    ToolbarGroup,
    ToolbarItem,
    Button,
    TextControl,
    TextareaControl,
    SelectControl,
    FocusableIframe
  } = wp.components;
  registerBlockType('maxpertici/legacy-navigation-block', {
    title: 'Legacy Navigation Block',
    icon: {
      background: '#F1F9F9',
      src: 'admin-site-alt2'
    },
    category: 'maxpertici',
    attributes: attributes_namespaceObject,

    edit(_ref) {
      let {
        attributes,
        className,
        setAttributes,
        isSelected
      } = _ref;
      const {
        whoRenderPreview,
        title,
        text,
        cta_label,
        cta_link,
        navigation
      } = attributes;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(BlockAlignmentToolbar, {
        value: attributes.textAlign,
        onChange: nextAlign => {
          setAttributes({
            textAlign: nextAlign
          });
        }
      }), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarItem, {
        as: Button,
        onClick: () => setAttributes({
          whoRenderPreview: !whoRenderPreview
        })
      }, "* SWITCH *"))), whoRenderPreview && /*#__PURE__*/React.createElement(ServerSideRender, {
        block: "maxpertici/legacy-navigation-block",
        attributes: attributes
      }), !whoRenderPreview && /*#__PURE__*/React.createElement(FocusableIframe, {
        width: "1200",
        height: "600",
        src: "http://localhost:10004/wp-admin/nav-menus.php?admin-page-viewport=modal",
        onFocus: () => console.log('iframe is focused')
      }), !whoRenderPreview && /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields"
      }, /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell",
        "data-ext-command-slug": "title"
      }, /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell-title"
      }, __('Title')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextControl, {
        label: "Title",
        value: title,
        onChange: nextTitle => {
          setAttributes({
            title: nextTitle
          });
        },
        type: "text"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell",
        "data-ext-command-slug": "text"
      }, /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell-title"
      }, __('Text')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextareaControl, {
        label: "Textarea",
        rows: 4,
        value: text,
        onChange: nextText => {
          setAttributes({
            text: nextText
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell",
        "data-ext-command-slug": "image"
      }, /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell-title"
      }, __('Image')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Select some users:'),
        value: navigation // e.g: value = [ 'a', 'c' ]
        ,
        onChange: nextNav => {
          setAttributes({
            navigation: nextNav
          });
        },
        options: [{
          value: null,
          label: 'Select a Navigation',
          disabled: true
        }, {
          value: 'a',
          label: 'Nav. A'
        }, {
          value: 'b',
          label: 'Nav. B'
        }, {
          value: 'c',
          label: 'Nav. c'
        }]
      }))), /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell",
        "data-ext-command-slug": "cta"
      }, /*#__PURE__*/React.createElement("div", {
        className: "whoEditorFields__cell-title"
      }, __('CTA')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextControl, {
        label: "Label",
        value: cta_label,
        onChange: nextLabel => {
          setAttributes({
            cta_label: nextLabel
          });
        },
        type: "text"
      }), /*#__PURE__*/React.createElement(TextControl, {
        label: "Link",
        value: cta_link,
        onChange: nextLink => {
          setAttributes({
            cta_link: nextLink
          });
        },
        type: "url"
      })))));
    },

    save(_ref2) {
      let {
        attributes,
        className
      } = _ref2;
      return null;
    }

  });
})(window.wp);
