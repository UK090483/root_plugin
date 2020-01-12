!function(e){function t(l){if(n[l])return n[l].exports;var r=n[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";n.d(t,"a",function(){return i});var l=wp.components,r=l.G,a=l.Path,o=l.SVG,i=(wp.element.createElement(o,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(a,{fill:"none",d:"M0 0h24v24H0V0z"}),wp.element.createElement(r,null,wp.element.createElement(a,{d:"M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"}))),wp.element.createElement(o,{width:"18",height:"18",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(a,{d:"M5 8.70002L10.6 14.4L12 12.9L7.8 8.70002L12 4.50002L10.6 3.00002L5 8.70002Z"})),wp.element.createElement(o,{width:"18",height:"18",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(a,{d:"M13 8.7L7.4 3L6 4.5L10.2 8.7L6 12.9L7.4 14.4L13 8.7Z"})),wp.element.createElement(o,{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(a,{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(2),n(8)},function(e,t,n){"use strict";n(3)},function(e,t,n){"use strict";var l=n(4),r=(n.n(l),n(5)),a=(n.n(r),n(6)),__=wp.i18n.__,o=wp.blocks.registerBlockType,i=wp.editor.RichText,c=wp.element.createElement,m=c("svg",{width:128,height:128,viewBox:"0 0 128 128"},c("rect",{x:0,y:0,width:128,height:128,stroke:"white"}),c("path",{d:"M41.7607 39.0615H52.8432V60.866L73.2637 39.0615H86.6547L66.1434 60.2237L87.5885 88.9388H74.2753L58.66 67.706L52.8432 73.6982V88.9388H41.7607V39.0615Z",fill:"white"}));o("klarity/klarity-read-more-block",{title:__("Read more"),icon:m,category:"kubase-blocks",attributes:{introBlock:{type:"string",default:""},contentBlock:{type:"string",default:""},textAlignment:{type:"string",default:"left"},showMore:{type:"string",default:"Show more"},showLess:{type:"string",default:"Show less"},buttonAlign:{type:"string",default:"center"}},edit:function(e){var t=e.attributes,n=(e.className,e.setAttributes);return wp.element.createElement("div",null,wp.element.createElement(a.a,e),wp.element.createElement("p",null,"This text will always be visible"),wp.element.createElement("div",{class:"text-input"},wp.element.createElement(i,{id:"introBlock",placeholder:"Thi text will always be visible",value:t.introBlock,onChange:function(e){return n({introBlock:e})}})),wp.element.createElement("p",null,"This will be hidden behind the read more section"),wp.element.createElement("div",{class:"text-input"},wp.element.createElement(i,{id:"contentBlock",placeholder:"Thi will be hidden behind the read more section",value:t.contentBlock,onChange:function(e){return n({contentBlock:e})}})))},save:function(e){var t=e.attributes,n=t.showMore,l=t.showLess,r=t.buttonAlign;return wp.element.createElement("div",{class:"text-center"},wp.element.createElement("div",{className:"read-more-wrap text-"+e.attributes.textAlignment},wp.element.createElement(i.Content,{tagName:"p",value:e.attributes.introBlock}),wp.element.createElement("div",{className:"read-more-target collapsed"},wp.element.createElement(i.Content,{tagName:"p",value:e.attributes.contentBlock}))),wp.element.createElement("div",{className:"ku_base_show_more_button",style:{justifyContent:r}},wp.element.createElement("button",{className:"read-more-trigger","data-more":n,"data-less":l},n)))}})},function(e,t){},function(e,t){},function(e,t,n){"use strict";function l(e){var t=e.attributes,n=e.setAttributes,l=t.showLess,o=t.showMore,m=t.buttonAlign,u=t.textAlignment;return console.log(u),wp.element.createElement(a,null,wp.element.createElement(i,null,wp.element.createElement(c,{label:"ShowMore Text",value:o,onChange:function(e){return n({showMore:e})}})),wp.element.createElement(i,null,wp.element.createElement(c,{label:"ShowLess Text",value:l,onChange:function(e){return n({showLess:e})}})),wp.element.createElement("h5",null,"Button Align"),wp.element.createElement(r.a,{items:[{value:"flex-start",label:"Left"},{value:"center",label:"Center"},{value:"flex-end",label:"Right"}],activeItem:m,onChange:function(e){return n({buttonAlign:e})}}),wp.element.createElement("h5",null,"Text Align"),wp.element.createElement(r.a,{items:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}],activeItem:u,onChange:function(e){return n({textAlignment:e})}}))}t.a=l;var r=n(7),a=wp.blockEditor.InspectorControls,o=wp.components,i=(o.Button,o.CheckboxControl,o.PanelBody),c=(o.PanelRow,o.PanelColor,o.RadioControl,o.RangeControl,o.TextControl);o.TextareaControl,o.ToggleControl,o.Toolbar,o.SelectControl,wp.element.useState},function(e,t,n){"use strict";function l(e){function t(e){return l===e}var n=e.items,l=e.activeItem,r=e.onChange;return wp.element.createElement(i,null,function(){return n.map(function(e){return wp.element.createElement(o,{isSmall:!0,isPrimary:t(e.value),onClick:function(){return r(e.value)}},e.icon?wp.element.createElement(a,{icon:e.icon}):e.label)})}())}t.a=l;var r=wp.components,a=r.Icon,o=r.Button,i=r.ButtonGroup;r.RangeControl,r.IconButton,r.Toolbar},function(e,t,n){"use strict";n(9)},function(e,t,n){"use strict";var l=n(10),r=(n.n(l),n(11)),a=(n.n(r),n(12)),o=n(14),__=wp.i18n.__,i=wp.blocks.registerBlockType,c=(wp.editor.RichText,["left","center","right"]),m=wp.element.createElement,u=m("svg",{width:128,height:128,viewBox:"0 0 128 128"},m("rect",{x:0,y:0,width:128,height:128,stroke:"white"}),m("path",{d:"M41.7607 39.0615H52.8432V60.866L73.2637 39.0615H86.6547L66.1434 60.2237L87.5885 88.9388H74.2753L58.66 67.706L52.8432 73.6982V88.9388H41.7607V39.0615Z",fill:"white"}));i("amh/amh-read-more-block",{title:__("Amh Read more"),icon:u,category:"kubase-blocks",attributes:{mainBlock:{type:"string",default:""},Id:{type:"number",default:0},subBlocks:{type:"array",default:[{label:"CDU",short:"ja",color:"inherit",content:"CDU Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"},{label:"FDP",short:"nein",color:"inherit",content:"FDP Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"},{label:"Gr\xfcne",short:"unklar",color:"inherit",content:"GR\xdcNE Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"},{label:"Linke",short:"ja",color:"inherit",content:"LINKE Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"}]},textAlignment:{type:"string",default:c[0]}},edit:a.a,save:o.a})},function(e,t){},function(e,t){},function(e,t,n){"use strict";function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e){function t(e,t,n){var a=[].concat(l(m));a[n][t]=e,r({subBlocks:a})}var n=e.attributes,r=(e.className,e.setAttributes),i=n.mainBlock,m=(n.textAlignments,n.subBlocks),s=n.Id;c(function(){s||r({Id:Date.now()})},[]);return wp.element.createElement("div",null,wp.element.createElement("p",null,"Head"),wp.element.createElement("div",{className:"text-input"},wp.element.createElement(o,{id:"introBlock",placeholder:"Thi text will always be visible",value:i,onChange:function(e){return r({mainBlock:e})}})),wp.element.createElement("p",null,"Content"),function(e){return m.map(function(e,n){return wp.element.createElement("div",{class:"text-input"},wp.element.createElement(u,{label:"Name",value:e.label,onChange:function(e){t(e,"label",n)}}),wp.element.createElement(u,{style:{color:e.color},label:"short",value:e.short,onChange:function(e){t(e,"short",n)}}),wp.element.createElement(a.a,{items:[{value:"inherit",label:"none"},{value:"red",label:"Red"},{value:"green",label:"Green"},{value:"orange",label:"Orange"}],activeItem:e.color,onChange:function(e){return t(e,"color",n)}}),wp.element.createElement("p",null,"This will be hidden behind "),wp.element.createElement(o,{id:"contentBlock",placeholder:"Thi will be hidden behind the read more section",value:m[n].content,onChange:function(e){return t(e,"content",n)}}))})}())}t.a=r;var a=(n(0),n(13)),o=wp.editor.RichText,i=wp.element,c=(i.useState,i.useEffect),m=wp.components,u=m.TextControl;m.DateTimePicker,m.Button,m.BaseControl},function(e,t,n){"use strict";function l(e){function t(e){return l===e}var n=e.items,l=e.activeItem,r=e.onChange;return wp.element.createElement(i,null,function(){return n.map(function(e){return wp.element.createElement(o,{isSmall:!0,isPrimary:t(e.value),onClick:function(){return r(e.value)}},e.icon?wp.element.createElement(a,{icon:e.icon}):e.label)})}())}t.a=l;var r=wp.components,a=r.Icon,o=r.Button,i=r.ButtonGroup;r.RangeControl,r.IconButton,r.Toolbar},function(e,t,n){"use strict";function l(e){var t=e.attributes,n=t.subBlocks,l=t.Id,o=t.mainBlock;return wp.element.createElement("div",{className:"amh-readmore-wrap"},wp.element.createElement("div",{className:"amh-readmore-item-head"},wp.element.createElement(a.Content,{tagName:"p",value:o})),wp.element.createElement("div",{className:"amh-readmore-items"},function(){return n.map(function(e,t){return wp.element.createElement("div",{className:"amh-readmore-item"},wp.element.createElement("h5",null,e.label,":"),wp.element.createElement("h5",{style:{color:e.color}},e.short),wp.element.createElement("div",{className:"amh-readmore-item-arrow","data-id":l+t},r.a))})}()),wp.element.createElement("div",{className:"amh-readmore-items-subContent"},function(){return n.map(function(e,t){return wp.element.createElement("div",{className:"amh-readmore-subContent","data-id":l+t},wp.element.createElement(a.Content,{tagName:"p",value:e.content}))})}()))}t.a=l;var r=n(0),a=wp.editor.RichText}]);