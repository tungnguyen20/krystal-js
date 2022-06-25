!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(self,(()=>(()=>{"use strict";var e={4:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Web3Kit=void 0;const n=r(194);t.Web3Kit=class{constructor(){this.wrappedModule=new n.ModuleWrapper("Web3Module")}transfer(e){return new Promise((t=>{this.wrappedModule.invoke("transfer",e).then((e=>{var r=e;try{r.status_code,t({code:r.status_code,message:r.error})}catch(e){t({code:400,message:"something_wrong"})}}))}))}}},206:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,u){function i(e){try{a(n.next(e))}catch(e){u(e)}}function s(e){try{a(n.throw(e))}catch(e){u(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function s(u){return function(s){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,n=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.ModuleWrapper=void 0;var u=r(39),i=(0,u.wrapModuleName)("underlyingModule"),s=function(){function e(e){this.moduleName="",this.wrappedModuleName="",this.moduleName=e,this.wrappedModuleName=(0,u.wrapModuleName)(e)}return e.prototype.getWrappedModule=function(){return window[this.wrappedModuleName]||(0,u.wrapModule)(window,this.moduleName),window[this.wrappedModuleName]},e.prototype.invoke=function(e,t){var r=this;return void 0===t&&(t={}),{subscribe:function(n){var o=n.next,u=n.complete,i=null;return r.checkHasModule().then((function(n){n&&(i=r.getWrappedModule().invoke(e,t).subscribe({next:o,complete:u}))})),{unsubscribe:function(){null==i||i.unsubscribe()}}},then:function(n){r.checkHasModule().then((function(o){r.getWrappedModule().invoke(e,t).then(n)}))}}},e.prototype.checkHasModule=function(){return n(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,this.getUnderlyingModule().invoke("hasModule",{moduleName:this.moduleName})];case 1:return[2,200==(e=t.sent()).status_code&&1==e.result]}}))}))},e.prototype.getUnderlyingModule=function(){return window[i]||(0,u.wrapModule)(window,"underlyingModule"),window[i]},e}();t.ModuleWrapper=s},194:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Result=t.toResult=t.ModuleWrapper=void 0;var n=r(206);Object.defineProperty(t,"ModuleWrapper",{enumerable:!0,get:function(){return n.ModuleWrapper}});var o=r(852);Object.defineProperty(t,"toResult",{enumerable:!0,get:function(){return o.toResult}}),Object.defineProperty(t,"Result",{enumerable:!0,get:function(){return o.Result}})},852:function(e,t){var r,n=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.toResult=t.mapResponseToResult=t.failure=t.success=t.Failure=t.Success=t.Result=void 0;var o=function(){function e(e,t,r){this.success=e,this.value=r,this.error=t}return e.prototype.isSuccess=function(){return this.success},e.prototype.isFailure=function(){return!this.success},e.prototype.getValue=function(){return this.value},e.prototype.getError=function(){return this.error},e}();t.Result=o;var u=function(e){function t(t){return e.call(this,!0,null,t)||this}return n(t,e),t}(o);t.Success=u;var i=function(e){function t(t){return e.call(this,!1,t)||this}return n(t,e),t}(o);t.Failure=i,t.success=function(e){return new u(e)},t.failure=function(e){return new i(e)},t.mapResponseToResult=function(e){return 200===e.status_code?new u(e.result):new i(new Error(e.error))},t.toResult=function(e){return new Promise((function(t){e().then((function(e){200===e.status_code?t(new u(e.result)):t(new i(new Error(e.error)))}))}))}},39:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.wrapModuleName=t.wrapModule=void 0,t.wrapModule=function(e,t){var r=e.wrapModule;if(null!=r)return r(e,t);throw"undefined"!=typeof document?Error("Please install @krystal-js/web-bridge before using any feature of krystal-js"):navigator&&"ReactNative"===navigator.product?Error("Please install @krystal-js/react-native-bridge before using any feature of krystal-js"):new Error("Unsupported environment")},t.wrapModuleName=function(e){return"Wrapped".concat(e)}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}var n={};return(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.web3Kit=e.aaaa=void 0;const t=r(4);e.aaaa="1111",e.web3Kit=new t.Web3Kit})(),n})()));