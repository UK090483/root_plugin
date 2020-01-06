const { registerBlockType } = wp.blocks;

import "./editor.scss";

registerBlockType("cgb/test-block-drei", {
  title: "test Block-drei",
  icon: "smiley",
  category: "common",

  attributes: {
    images: {
      type: "array",
      default: []
    }
  },

  edit({ setAttributes, attributes }) {
    return <div>Blaaaa</div>;
  },

  // No information saved to the block
  // Data is saved to post meta via attributes
  save({ className, setAttributes, attributes }) {
    return <div className="fade-animate">bla</div>;
  }
});
