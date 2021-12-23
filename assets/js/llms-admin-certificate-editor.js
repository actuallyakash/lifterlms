!function(){"use strict";var e={n:function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},d:function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.plugins,r=window.wp.coreData,n=window.wp.data,i=window.wp.blocks,a=window.wp.domReady,o=e.n(a),s=window.wp.editor,l=window.wp.blockEditor;let c=!1;function u(){const{getCurrentPostAttribute:e,getEditedPostAttribute:t,getCurrentPostType:a}=(0,n.select)(s.store),o=t("certificate_background"),u=t("certificate_margins"),d=t("certificate_width"),f=t("certificate_height"),m=t("certificate_unit"),p=t("certificate_orientation"),h=e("content"),g=t("content"),y=document.querySelector(".block-editor-block-list__layout.is-root-container");if(y){const e="portrait"===p?d:f,t="portrait"===p?f:d,i=u.map((e=>`${e}%`)).join(" ");y.style.backgroundImage=`url( '${function(){const e=function(){const{getEditedPostAttribute:e}=(0,n.select)(s.store),{getMedia:t}=(0,n.select)(r.store),i=e("featured_media");return i?t(i):{}}(),{default_image:t}=window.llms.certificates;if(void 0===e)return null;const{source_url:i}=e;return i||t}()}' )`,y.style.backgroundSize=`${e}${m} ${t}${m}`,y.style.backgroundRepeat="no-repeat",y.style.marginLeft="auto",y.style.marginRight="auto",y.style.padding=i,y.style.width=`${e}${m}`,y.style.minHeight=`${t}${m}`,y.style.boxSizing="border-box"}const b=document.querySelector(".editor-styles-wrapper");if(b&&(b.style.backgroundColor=o),"llms_my_certificate"===a()){!function(e,t){const{isSavingPost:r}=(0,n.select)(s.store),a=r();if(a)c=!0;else if(!a&&c){c=!1;const r=/(\{[A-Za-z_].*\})|(\[llms-user .+])/g,a=e.match(r),o=t.match(r);null==o||!o.length||null!=a&&a.length||function(e){const{replaceBlocks:t}=(0,n.dispatch)(l.store),{savePost:r}=(0,n.dispatch)(s.store),{getBlocks:a}=(0,n.select)(l.store);t(a().map((e=>{let{clientId:t}=e;return t})),(0,i.rawHandler)({HTML:e})),r()}(e)}}(h,g);const e=document.querySelector(".edit-post-visual-editor__post-title-wrapper");e&&(e.style.display=function(){const{getInserterItems:e}=(0,n.select)(l.store),{isDisabled:t}=e().find((e=>{let{name:t}=e;return"llms/certificate-title"===t}));return t}()?"none":"initial")}}o()((()=>{!function(){const e=document.createElement("style");e.type="text/css",e.appendChild(document.createTextNode(".editor-styles-wrapper .wp-block { max-width: 100% !important; }")),e.appendChild(document.createTextNode(".editor-styles-wrapper [data-block], .wp-block { margin-top: 0 !important; margin-bottom: 0 !important }")),document.head.appendChild(e)}(),(0,n.subscribe)(u)}));var d=window.wp.hooks,f=window.wp.i18n;const m=(0,n.subscribe)((()=>{const{getCurrentPostType:e}=(0,n.select)(s.store),t=e();var r;null!==t&&(r="llms_my_certificate"===t,m(),r&&(0,d.addFilter)("i18n.gettext_default","llms/certificates",(function(e){return"Move to trash"===e?(0,f.__)("Delete permanently","lifterlms"):e})))}));var p=window.wp.element,h=window.wp.components,g=window.wp.richText,y=window.llms.components,b=window.llms.icons;function v(e){let{closeModal:t,onChange:r,value:n}=e;const{merge_codes:i}=window.llms.certificates;return Object.entries(i).map(((e,i)=>{let[a,o]=e;return(0,p.createElement)("tr",{key:i},(0,p.createElement)("td",{style:{textAlign:"left"}},o),(0,p.createElement)("td",null,(0,p.createElement)(y.CopyButton,{buttonText:a,copyText:a,onCopy:t,isLink:!0})),(0,p.createElement)("td",null,(0,p.createElement)(h.Button,{isSecondary:!0,isSmall:!0,onClick:()=>{t(),r((0,g.insert)(n,a))}},(0,f.__)("Insert","lifterlms"))))}))}(0,g.registerFormatType)("llms/certificate-merge-codes",{title:(0,f.__)("LifterLMS Certificate Merge Codes","lifterlms"),tagName:"span",className:"llms-cert-mc-wrap",edit:function(e){const[t,r]=(0,p.useState)(!1),n=()=>r(!1),{value:i,onChange:a}=e;return(0,p.createElement)(p.Fragment,null,(0,p.createElement)(l.RichTextToolbarButton,{icon:(0,p.createElement)(b.Icon,{icon:b.lifterlms}),title:(0,f.__)("Merge Codes","lifterlms"),onClick:()=>r(!0)}),t&&(0,p.createElement)(h.Modal,{className:"llms-certificate-merge-codes-modal",title:(0,f.__)("LifterLMS Certificate Merge Codes","lifterlms"),onRequestClose:n},(0,p.createElement)("div",{className:"llms-certificate-merge-codes-modal--main"},(0,p.createElement)("table",{className:"llms-table zebra",style:{width:"480px"}},(0,p.createElement)("thead",null,(0,p.createElement)("tr",null,(0,p.createElement)("th",{style:{textAlign:"left"}},(0,f.__)("Name","lifterlms")),(0,p.createElement)("th",null,(0,f.__)("Merge code","lifterlms")),(0,p.createElement)("th",null,(0,f.__)("Insert","lifterlms")))),(0,p.createElement)("tbody",null,(0,p.createElement)(v,{closeModal:n,onChange:a,value:i}))))))}});const w=(0,n.subscribe)((()=>{const e=new URLSearchParams(window.location.search);if(1!==parseInt(e.get("llms-migrate-legacy-template")))return _(!1);0!==k().length&&_(!0)}));function _(e){w(),e&&function(){const e=k().filter((e=>{let{name:t}=e;return"core/freeform"===t}));if(0===e.length)return;const{replaceBlocks:t}=(0,n.dispatch)(l.store),{savePost:r}=(0,n.dispatch)(s.store);e.forEach((e=>{t(e.clientId,(0,i.rawHandler)({HTML:(0,i.serialize)(e)}))})),r()}()}function k(){const{getBlocks:e}=(0,n.select)(l.store);return e()}var x=window.wp.compose,C=window.wp.editPost;function E(e,t){const{editPost:r}=(0,n.dispatch)(s.store),i={};i[`certificate_${e}`]=t,r(i)}function S(){let e=(0,l.useSetting)("color.palette");return e.length||(e=window.llms.certificates.colors),e.map((e=>{const{color:t}=e;return{...e,color:t.startsWith("#")?t.toLowerCase():t}}))}function P(e){let{background:t}=e;const[r,n]=(0,p.useState)(t);return(0,p.createElement)(h.BaseControl,{label:(0,f.__)("Background Color","lifterlms"),id:"llms-certificate-background-color-control"},(0,p.createElement)(h.ColorPalette,{colors:S(),onChange:e=>{n(e),E("background",e)},value:r,clearable:!1}))}var A=window.React;function T(){return T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T.apply(this,arguments)}var $=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}},I=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,M=$((function(e){return I.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),O=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),z=Math.abs,R=String.fromCharCode;function L(e){return e.trim()}function N(e,t,r){return e.replace(t,r)}function q(e,t){return e.indexOf(t)}function j(e,t){return 0|e.charCodeAt(t)}function F(e,t,r){return e.slice(t,r)}function H(e){return e.length}function B(e){return e.length}function U(e,t){return t.push(e),e}var D=1,W=1,G=0,V=0,X=0,Y="";function Z(e,t,r,n,i,a,o){return{value:e,root:t,parent:r,type:n,props:i,children:a,line:D,column:W,length:o,return:""}}function K(e,t,r){return Z(e,t.root,t.parent,r,t.props,t.children,0)}function Q(){return X=V>0?j(Y,--V):0,W--,10===X&&(W=1,D--),X}function J(){return X=V<G?j(Y,V++):0,W++,10===X&&(W=1,D++),X}function ee(){return j(Y,V)}function te(){return V}function re(e,t){return F(Y,e,t)}function ne(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ie(e){return D=W=1,G=H(Y=e),V=0,[]}function ae(e){return Y="",e}function oe(e){return L(re(V-1,ce(91===e?e+2:40===e?e+1:e)))}function se(e){for(;(X=ee())&&X<33;)J();return ne(e)>2||ne(X)>3?"":" "}function le(e,t){for(;--t&&J()&&!(X<48||X>102||X>57&&X<65||X>70&&X<97););return re(e,te()+(t<6&&32==ee()&&32==J()))}function ce(e){for(;J();)switch(X){case e:return V;case 34:case 39:return ce(34===e||39===e?e:X);case 40:41===e&&ce(e);break;case 92:J()}return V}function ue(e,t){for(;J()&&e+X!==57&&(e+X!==84||47!==ee()););return"/*"+re(t,V-1)+"*"+R(47===e?e:J())}function de(e){for(;!ne(ee());)J();return re(e,V)}var fe="-ms-",me="-moz-",pe="-webkit-",he="comm",ge="rule",ye="decl";function be(e,t){for(var r="",n=B(e),i=0;i<n;i++)r+=t(e[i],i,e,t)||"";return r}function ve(e,t,r,n){switch(e.type){case"@import":case ye:return e.return=e.return||e.value;case he:return"";case ge:e.value=e.props.join(",")}return H(r=be(e.children,n))?e.return=e.value+"{"+r+"}":""}function we(e,t){switch(function(e,t){return(((t<<2^j(e,0))<<2^j(e,1))<<2^j(e,2))<<2^j(e,3)}(e,t)){case 5103:return pe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return pe+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return pe+e+me+e+fe+e+e;case 6828:case 4268:return pe+e+fe+e+e;case 6165:return pe+e+fe+"flex-"+e+e;case 5187:return pe+e+N(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return pe+e+fe+"flex-item-"+N(e,/flex-|-self/,"")+e;case 4675:return pe+e+fe+"flex-line-pack"+N(e,/align-content|flex-|-self/,"")+e;case 5548:return pe+e+fe+N(e,"shrink","negative")+e;case 5292:return pe+e+fe+N(e,"basis","preferred-size")+e;case 6060:return pe+"box-"+N(e,"-grow","")+pe+e+fe+N(e,"grow","positive")+e;case 4554:return pe+N(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return N(N(N(e,/(zoom-|grab)/,pe+"$1"),/(image-set)/,pe+"$1"),e,"")+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,pe+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+pe+e+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,pe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(H(e)-1-t>6)switch(j(e,t+1)){case 109:if(45!==j(e,t+4))break;case 102:return N(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+me+(108==j(e,t+3)?"$3":"$2-$3"))+e;case 115:return~q(e,"stretch")?we(N(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==j(e,t+1))break;case 6444:switch(j(e,H(e)-3-(~q(e,"!important")&&10))){case 107:return N(e,":",":"+pe)+e;case 101:return N(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+pe+(45===j(e,14)?"inline-":"")+"box$3$1"+pe+"$2$3$1"+fe+"$2box$3")+e}break;case 5936:switch(j(e,t+11)){case 114:return pe+e+fe+N(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return pe+e+fe+N(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return pe+e+fe+N(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return pe+e+fe+e+e}return e}function _e(e){return ae(ke("",null,null,null,[""],e=ie(e),0,[0],e))}function ke(e,t,r,n,i,a,o,s,l){for(var c=0,u=0,d=o,f=0,m=0,p=0,h=1,g=1,y=1,b=0,v="",w=i,_=a,k=n,x=v;g;)switch(p=b,b=J()){case 34:case 39:case 91:case 40:x+=oe(b);break;case 9:case 10:case 13:case 32:x+=se(p);break;case 92:x+=le(te()-1,7);continue;case 47:switch(ee()){case 42:case 47:U(Ce(ue(J(),te()),t,r),l);break;default:x+="/"}break;case 123*h:s[c++]=H(x)*y;case 125*h:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+u:m>0&&H(x)-d&&U(m>32?Ee(x+";",n,r,d-1):Ee(N(x," ","")+";",n,r,d-2),l);break;case 59:x+=";";default:if(U(k=xe(x,t,r,c,u,i,s,v,w=[],_=[],d),a),123===b)if(0===u)ke(x,t,k,k,w,a,d,s,_);else switch(f){case 100:case 109:case 115:ke(e,k,k,n&&U(xe(e,k,k,0,0,i,s,v,i,w=[],d),_),i,_,d,s,n?w:_);break;default:ke(x,k,k,k,[""],_,d,s,_)}}c=u=m=0,h=y=1,v=x="",d=o;break;case 58:d=1+H(x),m=p;default:if(h<1)if(123==b)--h;else if(125==b&&0==h++&&125==Q())continue;switch(x+=R(b),b*h){case 38:y=u>0?1:(x+="\f",-1);break;case 44:s[c++]=(H(x)-1)*y,y=1;break;case 64:45===ee()&&(x+=oe(J())),f=ee(),u=H(v=x+=de(te())),b++;break;case 45:45===p&&2==H(x)&&(h=0)}}return a}function xe(e,t,r,n,i,a,o,s,l,c,u){for(var d=i-1,f=0===i?a:[""],m=B(f),p=0,h=0,g=0;p<n;++p)for(var y=0,b=F(e,d+1,d=z(h=o[p])),v=e;y<m;++y)(v=L(h>0?f[y]+" "+b:N(b,/&\f/g,f[y])))&&(l[g++]=v);return Z(e,t,r,0===i?ge:s,l,c,u)}function Ce(e,t,r){return Z(e,t,r,he,R(X),F(e,2,-2),0)}function Ee(e,t,r,n){return Z(e,t,r,ye,F(e,0,n),F(e,n+1,-1),n)}var Se=function(e,t,r){for(var n=0,i=0;n=i,i=ee(),38===n&&12===i&&(t[r]=1),!ne(i);)J();return re(e,V)},Pe=new WeakMap,Ae=function(e){if("rule"===e.type&&e.parent&&e.length){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||Pe.get(r))&&!n){Pe.set(e,!0);for(var i=[],a=function(e,t){return ae(function(e,t){var r=-1,n=44;do{switch(ne(n)){case 0:38===n&&12===ee()&&(t[r]=1),e[r]+=Se(V-1,t,r);break;case 2:e[r]+=oe(n);break;case 4:if(44===n){e[++r]=58===ee()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=R(n)}}while(n=J());return e}(ie(e),t))}(t,i),o=r.props,s=0,l=0;s<a.length;s++)for(var c=0;c<o.length;c++,l++)e.props[l]=i[s]?a[s].replace(/&\f/g,o[c]):o[c]+" "+a[s]}}},Te=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},$e=[function(e,t,r,n){if(!e.return)switch(e.type){case ye:e.return=we(e.value,e.length);break;case"@keyframes":return be([K(N(e.value,"@","@"+pe),e,"")],n);case ge:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return be([K(N(t,/:(read-\w+)/,":-moz-$1"),e,"")],n);case"::placeholder":return be([K(N(t,/:(plac\w+)/,":-webkit-input-$1"),e,""),K(N(t,/:(plac\w+)/,":-moz-$1"),e,""),K(N(t,/:(plac\w+)/,fe+"input-$1"),e,"")],n)}return""}))}}],Ie=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n,i,a=e.stylisPlugins||$e,o={},s=[];n=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)o[t[r]]=!0;s.push(e)}));var l,c,u,d,f=[ve,(d=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],m=(c=[Ae,Te].concat(a,f),u=B(c),function(e,t,r,n){for(var i="",a=0;a<u;a++)i+=c[a](e,t,r,n)||"";return i});i=function(e,t,r,n){l=r,be(_e(e?e+"{"+t.styles+"}":t.styles),m),n&&(p.inserted[t.name]=!0)};var p={key:t,sheet:new O({key:t,container:n,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:i};return p.sheet.hydrate(s),p},Me=function(e){for(var t,r=0,n=0,i=e.length;i>=4;++n,i-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(i){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},Oe={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ze=/[A-Z]|^ms/g,Re=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Le=function(e){return 45===e.charCodeAt(1)},Ne=function(e){return null!=e&&"boolean"!=typeof e},qe=$((function(e){return Le(e)?e:e.replace(ze,"-$&").toLowerCase()})),je=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(Re,(function(e,t,r){return He={name:t,styles:r,next:He},t}))}return 1===Oe[e]||Le(e)||"number"!=typeof t||0===t?t:t+"px"};function Fe(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return He={name:r.name,styles:r.styles,next:He},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)He={name:n.name,styles:n.styles,next:He},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var i=0;i<r.length;i++)n+=Fe(e,t,r[i])+";";else for(var a in r){var o=r[a];if("object"!=typeof o)null!=t&&void 0!==t[o]?n+=a+"{"+t[o]+"}":Ne(o)&&(n+=qe(a)+":"+je(a,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=Fe(e,t,o);switch(a){case"animation":case"animationName":n+=qe(a)+":"+s+";";break;default:n+=a+"{"+s+"}"}}else for(var l=0;l<o.length;l++)Ne(o[l])&&(n+=qe(a)+":"+je(a,o[l])+";")}return n}(e,t,r);case"function":if(void 0!==e){var i=He,a=r(e);return He=i,Fe(e,t,a)}}if(null==t)return r;var o=t[r];return void 0!==o?o:r}var He,Be=/label:\s*([^\s;\n{]+)\s*(;|$)/g,Ue=function(e,t,r){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,i="";He=void 0;var a=e[0];null==a||void 0===a.raw?(n=!1,i+=Fe(r,t,a)):i+=a[0];for(var o=1;o<e.length;o++)i+=Fe(r,t,e[o]),n&&(i+=a[o]);Be.lastIndex=0;for(var s,l="";null!==(s=Be.exec(i));)l+="-"+s[1];return{name:Me(i)+l,styles:i,next:He}},De=(0,A.createContext)("undefined"!=typeof HTMLElement?Ie({key:"css"}):null);De.Provider;var We=function(e){return(0,A.forwardRef)((function(t,r){var n=(0,A.useContext)(De);return e(t,n,r)}))},Ge=(0,A.createContext)({});function Ve(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}var Xe=function(e,t,r){var n=e.key+"-"+t.name;if(!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles),void 0===e.inserted[t.name]){var i=t;do{e.insert(t===i?"."+n:"",i,e.sheet,!0),i=i.next}while(void 0!==i)}},Ye=M,Ze=function(e){return"theme"!==e},Ke=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Ye:Ze},Qe=function(e,t,r){var n;if(t){var i=t.shouldForwardProp;n=e.__emotion_forwardProp&&i?function(t){return e.__emotion_forwardProp(t)&&i(t)}:i}return"function"!=typeof n&&r&&(n=e.__emotion_forwardProp),n},Je=function(){return null},et=function e(t,r){var n,i,a=t.__emotion_real===t,o=a&&t.__emotion_base||t;void 0!==r&&(n=r.label,i=r.target);var s=Qe(t,r,a),l=s||Ke(o),c=!l("as");return function(){var u=arguments,d=a&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==n&&d.push("label:"+n+";"),null==u[0]||void 0===u[0].raw)d.push.apply(d,u);else{d.push(u[0][0]);for(var f=u.length,m=1;m<f;m++)d.push(u[m],u[0][m])}var p=We((function(e,t,r){var n=c&&e.as||o,a="",u=[],f=e;if(null==e.theme){for(var m in f={},e)f[m]=e[m];f.theme=(0,A.useContext)(Ge)}"string"==typeof e.className?a=Ve(t.registered,u,e.className):null!=e.className&&(a=e.className+" ");var p=Ue(d.concat(u),t.registered,f);Xe(t,p,"string"==typeof n),a+=t.key+"-"+p.name,void 0!==i&&(a+=" "+i);var h=c&&void 0===s?Ke(n):l,g={};for(var y in e)c&&"as"===y||h(y)&&(g[y]=e[y]);g.className=a,g.ref=r;var b=(0,A.createElement)(n,g),v=(0,A.createElement)(Je,null);return(0,A.createElement)(A.Fragment,null,v,b)}));return p.displayName=void 0!==n?n:"Styled("+("string"==typeof o?o:o.displayName||o.name||"Component")+")",p.defaultProps=t.defaultProps,p.__emotion_real=p,p.__emotion_base=o,p.__emotion_styles=d,p.__emotion_forwardProp=s,Object.defineProperty(p,"toString",{value:function(){return"."+i}}),p.withComponent=function(t,n){return e(t,T({},r,n,{shouldForwardProp:Qe(p,n,!0)})).apply(void 0,d)},p}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){et[e]=et(e)}));var tt=et;const rt=tt(h.TextControl)`
	& .components-base-control__field {
		position: relative;

		&:hover:after,
		&:focus-within:after {
		    right: 25px;
		}

		&:after {
			content: '%';
			font-size: 85%;
			pointer-events: none;
			position: absolute;
			right: 6px;
			top: 6px;
			transition: right 0.05s ease-in-out;
		}
	}
`;function nt(e){let{margin:t,index:r,editMargins:n}=e;const[i,a]=(0,p.useState)(t);return(0,p.createElement)("div",{style:{flex:1}},(0,p.createElement)(rt,{value:i,type:"number",onChange:e=>{n(e,r,a)}}),(0,p.createElement)("em",{style:{display:"block",marginLeft:"4px",marginTop:"-8px"}},function(e){return[(0,f.__)("Top","lifterlms"),(0,f.__)("Right","lifterlms"),(0,f.__)("Bottom","lifterlms"),(0,f.__)("Left","lifterlms")][e]}(r)))}function it(e){let{margins:t}=e;const r=(e,r,n)=>{const i=[...t];i[r]=e,n(e),E("margins",i)};return(0,p.createElement)(h.BaseControl,{label:(0,f.__)("Inner Margins","lifterlms"),id:"llms-certificate-margins-control"},(0,p.createElement)("div",{style:{display:"flex"}},t.map(((e,t)=>(0,p.createElement)(nt,{key:t,margin:e,index:t,editMargins:r})))))}function at(e){let{orientation:t}=e;const{orientations:r}=window.llms.certificates,n=Object.entries(r).map((e=>{let[t,r]=e;return{value:t,label:r}}));return(0,p.createElement)(y.ButtonGroupControl,{id:"llms-certificate-orientation-control",label:(0,f.__)("Orientation","lifterlms"),selected:t,options:n,onClick:e=>E("orientation",e)})}function ot(e){let{sequentialId:t}=e;const[r,n]=(0,p.useState)(t);let{minSequentialId:i}=window.llms.certificates;return i||(i=t,window.llms.certificates.minSequentialId=i),(0,p.createElement)(h.TextControl,{id:"llms-certificate-title-control",label:(0,f.__)("Next Sequential ID","lifterlms"),value:r,type:"number",step:"1",min:i,onChange:e=>{n(e),E("sequential_id",e)},help:(0,f.__)("Used for the {sequential_id} merge code when generating a certificate from this template.","lifterlms")})}function st(e){let{name:t,width:r,height:n,unit:i}=e;const{units:a}=window.llms.certificates,{symbol:o}=a[i]||{};return(0,f.sprintf)("%1$s (%2$s%4$s x %3$s%4$s)",t,r,n,o)}function lt(e){let{width:t,height:r,unit:n}=e;const[i,a]=(0,p.useState)(t),[o,s]=(0,p.useState)(r),[l,c]=(0,p.useState)(n);return(0,p.createElement)("div",{style:{display:"flex"}},(0,p.createElement)("div",{style:{flex:1}},(0,p.createElement)(h.TextControl,{label:(0,f.__)("Custom Size Width","lifterlms"),placeholder:(0,f.__)("Width","lifterlms"),type:"number",value:i,hideLabelFromVision:!0,onChange:e=>{a(e),E("width",e)}})),(0,p.createElement)("div",{style:{flex:1}},(0,p.createElement)(h.TextControl,{label:(0,f.__)("Custom Size Height","lifterlms"),placeholder:(0,f.__)("Height","lifterlms"),type:"number",value:o,hideLabelFromVision:!0,onChange:e=>{s(e),E("height",e)}})),(0,p.createElement)("div",{style:{flex:2}},(0,p.createElement)(h.SelectControl,{label:(0,f.__)("Custom Size Dimension","lifterlms"),hideLabelFromVision:!0,value:l,onChange:e=>{c(e),E("unit",e)},options:[{value:"in",label:(0,f.__)("in (Inches)","lifterlms")},{value:"mm",label:(0,f.__)("mm (Millimeters)","lifterlms")}]})))}function ct(e){let{size:t,width:r,height:n,unit:i}=e;const{sizes:a}=window.llms.certificates,o=Object.entries(a).map((e=>{let[t,r]=e;return{value:t,label:st(r)}})),[s,l]=(0,p.useState)(t);return o.push({value:"CUSTOM",label:(0,f._x)("Custom","certificate sizing option","lifterlms")}),(0,p.createElement)(p.Fragment,null,(0,p.createElement)(h.SelectControl,{label:(0,f.__)("Size","lifterlms"),value:s,options:o,onChange:e=>{if(l(e),E("size",e),"CUSTOM"!==e){const t=a[e];E("unit",t.unit),E("width",t.width),E("height",t.height)}}}),"CUSTOM"===s&&(0,p.createElement)(lt,{editCertificate:E,width:r,height:n,unit:i}))}function ut(e){let{children:t}=e;const{getCurrentPostType:r}=(0,n.useSelect)(s.store),{getInserterItems:i}=(0,n.useSelect)(l.store);if("llms_certificate"!==r())return null;const{isDisabled:a}=i().find((e=>{let{name:t}=e;return"llms/certificate-title"===t}));return a?null:t}function dt(e){let{title:t}=e;return(0,p.createElement)(h.TextControl,{id:"llms-certificate-title-control",label:(0,f.__)("Title","lifterlms"),value:t,onChange:e=>E("title",e),help:(0,f.__)("Used as the title for certificates generated from this template.","lifterlms")})}const ft=(0,n.withSelect)((e=>{const{getEditedPostAttribute:t}=e(s.store);return{type:t("type"),title:t("certificate_title"),sequentialId:t("certificate_sequential_id"),background:t("certificate_background"),height:t("certificate_height"),margins:t("certificate_margins"),orientation:t("certificate_orientation"),size:t("certificate_size"),unit:t("certificate_unit"),width:t("certificate_width")}}));var mt=(0,x.compose)([ft])((function(e){let{type:t,title:r,sequentialId:n,background:i,height:a,margins:o,orientation:s,size:l,unit:c,width:u}=e;return(0,p.createElement)(C.PluginDocumentSettingPanel,{className:"llms-certificate-doc-settings",name:"llms-certificate-doc-settings",title:(0,f.__)("Settings","lifterlms"),opened:!0},(0,p.createElement)(ut,null,(0,p.createElement)(dt,{title:r}),(0,p.createElement)("br",null)),(0,p.createElement)(ct,{size:l,width:u,height:a,unit:c}),(0,p.createElement)("br",null),(0,p.createElement)(at,{orientation:s}),(0,p.createElement)("br",null),(0,p.createElement)(it,{margins:o,unit:c}),(0,p.createElement)("br",null),(0,p.createElement)(P,{background:i}),"llms_certificate"===t&&(0,p.createElement)(p.Fragment,null,(0,p.createElement)("br",null),(0,p.createElement)(ot,{sequentialId:n})))})),pt=window.wp.url;const ht=tt(h.PanelRow)`
	width: 100%;
`;function gt(e){let{userId:t}=e;const i=(0,n.useSelect)((e=>{const{getEntityRecord:n}=e(r.store),i=n("root","user",t);return null==i?void 0:i.name}),[t]);return i?(0,p.createElement)(h.ExternalLink,{href:(0,pt.addQueryArgs)("admin.php",{page:"llms-reporting",tab:"students",stab:"certificates",student_id:t})},i):(0,p.createElement)("span",null,(0,f.__)("Loading…","lifterlms"))}const yt=(0,n.withSelect)((e=>{const{getEditedPostAttribute:t,isEditedPostNew:r}=e(s.store);return{isNew:r(),type:t("type"),userId:t("author")}}));var bt=(0,x.compose)([yt])((function(e){let{type:t,userId:r,isNew:i}=e;if("llms_my_certificate"!==t)return null;const a=(0,pt.getQueryArg)(window.location.href,"sid");return r=a||r,(0,p.createElement)(C.PluginPostStatusInfo,null,(0,p.createElement)(ht,null,(0,p.createElement)("span",{style:{display:"block",width:"45%"}},(0,f.__)("Student","lifterlms")),(!i||a)&&(0,p.createElement)(gt,{userId:r}),i&&!a&&(0,p.createElement)(y.UserSearchControl,{selectedValue:r,onUpdate:e=>{let{id:t}=e;const{editPost:r}=(0,n.dispatch)(s.store);r({user:t,author:t})}})))}));(0,t.registerPlugin)("llms-certificate-doc-settings",{render:mt,icon:""}),(0,t.registerPlugin)("llms-certificate-user",{render:bt})}();