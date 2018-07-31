!function(e){function t(t){for(var o,i,l=t[0],s=t[1],u=t[2],p=0,f=[];p<l.length;p++)i=l[p],r[i]&&f.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(c&&c(t);f.length;)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,l=1;l<n.length;l++){var s=n[l];0!==r[s]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={1:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vem/api/";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=s;a.push([78,0]),n()}({71:function(e,t,n){"use strict";n.r(t);var o=n(70),r=n(69),a=n.n(r),i=n(68),l=n(60),s=n(61),u=n(62),c=n(14);function p(e){return!!(e&&e.getGeometry&&e.getGeometry.call)}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){m(e,t,n[t])})}return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y={name:"vem-map",introduction:"Container component to initialize a map.",description:"Creates map instances and is the container for all layers and markers.",token:"<vem-map>\x3c!-- see TileLayer and VectorLayer --\x3e</vem-map>",data:function(){return{ignoreNextUpdate:!1,ignoreAllUpdates:!1,savedState:null}},props:{view:{type:Object,default:function(e){return{lon:0,lat:0,zoom:2,rotation:0}},note:"Object to set initial map view. Can be synced."},zoomToFeature:{validator:p,note:"A map feature to zoom to. If set dynamically, the former view state is put on a stack and the map reverts to it after unsetting this."},zoomToExtent:{type:Array,note:"Same as `zoomToFeature` but using an extent, which is an array in the form of [min x, min y, max x, max y] coordinates."},syncImmediately:{type:Boolean,default:!1,note:"If set to true, the map emits events for every movement step instead of waiting for moveEnd."},olOptions:{type:Object,note:"Object with options given the OpenLayers map on initialization."}},watch:{view:function(e){if(!this.ignoreAllUpdates)if(this.ignoreNextUpdate)this.ignoreNextUpdate=!1;else{var t=this.$olMap.getView(),n=e.lonlat,o=e.zoom,r=e.rotation;Array.isArray(n)&&t.setCenter(c.a.fromLonLat(n)),"number"==typeof o&&t.setZoom(o),"number"==typeof r&&t.setRotation(r)}},zoomToExtent:function(e,t){this.toggleZoom(e,t)},zoomToFeature:function(e,t){var n=p(e)?e.getGeometry().getExtent():null,o=p(t)?t.getGeometry().getExtent():null;this.toggleZoom(n,o)}},methods:{toggleZoom:function(e,t){if(e){if(!t){var n=this.$olMap.getView();this.savedState={center:n.getCenter(),zoom:n.getZoom()}}this.$olMap.getView().fit(e,{duration:300,constrainResolution:!1})}else!e&&t&&this.$olMap.getView().animate(f({},this.savedState,{duration:300}))}},mounted:function(){var e=this,t=f({target:this.$el,controls:s.a.defaults(),interactions:u.a.defaults(),loadTilesWhileAnimating:!0,layers:[],view:new l.a({center:[this.view.lon,this.view.lat],zoom:this.view.zoom,rotation:this.view.rotation})},this.olOptions);this.$olMap=new i.a(t),this.$on("addLayer",function(t){if(e.$olMap.addLayer(t.layer),t.minResolution)t.layer.setMinResolution(t.minResolution);else if(t.maxZoom){var n=e.$olMap.getView().getResolutionForZoom(t.maxZoom);t.layer.setMinResolution(n)}if(t.maxResolution)t.layer.setMaxResolution(t.maxResolution);else if(t.minZoom){var o=e.$olMap.getView().getResolutionForZoom(t.minZoom);t.layer.setMaxResolution(o)}"VECTOR"===t.layer.type&&t.fitMapToLayer&&e.$olMap.getView().fit(t.layer.getSource().getExtent())}),this.$on("removeLayer",function(t){return e.$olMap.removeLayer(t.layer)}),this.$on("addInteraction",function(t){return e.$olMap.addInteraction(t.interaction)}),this.$on("removeInteraction",function(t){return e.$olMap.removeInteraction(t.interaction)}),this.$olMap.on("click",function(t){var n=t.map.forEachFeatureAtPixel(t.pixel,function(e){return e});e.$emit("click",{pixel:t.pixel,lonlat:c.a.toLonLat(t.coordinate),pointerEvent:t.pointerEvent,originalEvent:t,feature:n})}),this.$olMap.on("moveend",function(t){var n=e.$olMap.getView();e.ignoreAllUpdates=!1,e.ignoreNextUpdate=!0,e.$emit("update:view",{lonlat:c.a.toLonLat(n.getCenter()),zoom:n.getZoom(),rotation:n.getRotation()})}),this.syncImmediately&&(this.$olMap.on("movestart",function(t){e.ignoreAllUpdates=!0}),this.$olMap.on("pointerdrag",function(t){e.$nextTick(function(){var t=e.$olMap.getView();e.$emit("update:view",{lonlat:c.a.toLonLat(t.getCenter()),zoom:t.getZoom(),rotation:t.getRotation()})})})),console.log("MAP INITIALISED")}},d=n(50),h=Object(d.a)(y,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"vem-map"},[this._t("default")],2)},[],!1,null,null,null).exports,v=n(67),g=n(66);n(57);function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={name:"map-layer",introduction:"TileLayers are used for picture based maps like OpenStreetMap.",description:"Creates a layer with tiles from the given data source and defaults to OpenStreetMap.",token:"<vem-map><tile-layer /></vem-map>",props:{source:{type:Object,default:function(){return new v.a},note:"Source object. Has to be an instance of `ol/source/tile`. Defaults to `ol/source/osm`. `static`"},opacity:{type:Number,default:1,note:"Sets opacity for layer from 0.0 (fully transparent) to 1.0 (fully opaque). `dynamic`"},visible:{type:Boolean,default:!0,note:"Layers can be hidden with this attribute. `dynamic`"},zIndex:{type:Number,default:0,note:"Sets the z-index. Tile layers default to 0, vector layers default to 1. `dynamic`"},extent:{type:Array,note:"Set the extent at which the layer is visible. `dynamic`"}},data:function(){return{layer:null}},mounted:function(){var e=this,t={opacity:this.opacity,visible:this.visible,zIndex:this.zIndex,extent:this.extent};this.layer=new g.a(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){b(e,t,n[t])})}return e}({source:this.source},t)),this.$nextTick(function(t){return e.$parent.$emit("addLayer",{layer:e.layer})})}},x=Object(d.a)(w,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"tile-layer"},[this._t("default")],2)},[],!1,null,null,null).exports,O={name:"documentation",components:{propDoc:a.a},data:function(){return{map:h,tileLayer:x}}},$=Object(d.a)(O,function(){var e=this.$createElement,t=this._self._c||e;return t("section",[t("prop-doc",{attrs:{component:this.map}}),this._v(" "),t("prop-doc",{attrs:{component:this.tileLayer}})],1)},[],!1,null,null,null).exports;n(73);new o.a({el:"#app",render:function(e){return e($)}})},73:function(e,t,n){},78:function(e,t,n){e.exports=n(71)}});
//# sourceMappingURL=main.3544f2c4.js.map