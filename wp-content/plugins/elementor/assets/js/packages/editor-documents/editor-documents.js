/*! For license information please see editor-documents.js.LICENSE.txt */
!function(){"use strict";var t={react:function(t){t.exports=window.React},"@elementor/editor-v1-adapters":function(t){t.exports=window.elementorV2.editorV1Adapters},"@elementor/store":function(t){t.exports=window.elementorV2.store}},e={};function n(i){var a=e[i];if(void 0!==a)return a.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,n),o.exports}n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};!function(){n.r(i),n.d(i,{__useActiveDocument:function(){return f},__useActiveDocumentActions:function(){return g},__useHostDocument:function(){return h},__useNavigateToDocument:function(){return y},slice:function(){return s}});var t=n("@elementor/store"),e=n("@elementor/editor-v1-adapters"),a=n("react");function o(t){return!(!t.activeId||!t.entities[t.activeId])}var s=(0,t.__createSlice)({name:"documents",initialState:{entities:{},activeId:null,hostId:null},reducers:{init(t,{payload:e}){t.entities=e.entities,t.hostId=e.hostId,t.activeId=e.activeId},activateDocument(t,e){t.entities[e.payload.id]=e.payload,t.activeId=e.payload.id},setAsHost(t,e){t.hostId=e.payload},updateActiveDocument(t,e){o(t)&&(t.entities[t.activeId]={...t.entities[t.activeId],...e.payload})},startSaving(t){o(t)&&(t.entities[t.activeId].isSaving=!0)},endSaving(t,e){o(t)&&(t.entities[t.activeId]={...e.payload,isSaving:!1})},startSavingDraft:t=>{o(t)&&(t.entities[t.activeId].isSavingDraft=!0)},endSavingDraft(t,e){o(t)&&(t.entities[t.activeId]={...e.payload,isSavingDraft:!1})},markAsDirty(t){o(t)&&(t.entities[t.activeId].isDirty=!0)},markAsPristine(t){o(t)&&(t.entities[t.activeId].isDirty=!1)}}});function r(){const t=window.elementor?.documents;if(!t)throw new Error("Elementor Editor V1 documents manager not found");return t}function c(t){switch(window.elementor?.getPreferences?.("exit_to")||"this_post"){case"dashboard":return t.config.urls.main_dashboard;case"all_posts":return t.config.urls.all_post_type;default:return t.config.urls.exit_to_dashboard}}function d(t){return t?.config?.panel?.show_copy_and_share??!1}function u(t){return t.config.urls.permalink??""}function l(t){const e=t.config.revisions.current_id!==t.id,n=c(t);return{id:t.id,title:t.container.settings.get("post_title"),type:{value:t.config.type,label:t.config.panel.title},status:{value:t.config.status.value,label:t.config.status.label},links:{permalink:u(t),platformEdit:n},isDirty:t.editor.isChanged||e,isSaving:t.editor.isSaving,isSavingDraft:!1,permissions:{allowAddingWidgets:t.config.panel?.allow_adding_widgets??!0,showCopyAndShare:d(t)},userCan:{publish:t.config.user.can_publish}}}function v(t,e){let n;return(...i)=>{clearTimeout(n),n=setTimeout((()=>{t(...i)}),e)}}var _=t=>t.documents.entities,m=(0,t.__createSelector)(_,(t=>t.documents.activeId),((t,e)=>e&&t[e]?t[e]:null)),p=(0,t.__createSelector)(_,(t=>t.documents.hostId),((t,e)=>e&&t[e]?t[e]:null));function f(){return(0,t.__useSelector)(m)}function g(){const t=f(),n=t?.links?.permalink??"";return{save:(0,a.useCallback)((()=>(0,e.__privateRunCommand)("document/save/default")),[]),saveDraft:(0,a.useCallback)((()=>(0,e.__privateRunCommand)("document/save/draft")),[]),saveTemplate:(0,a.useCallback)((()=>(0,e.__privateOpenRoute)("library/save-template")),[]),copyAndShare:(0,a.useCallback)((()=>{navigator.clipboard.writeText(n)}),[n])}}function h(){return(0,t.__useSelector)(p)}function y(){return(0,a.useCallback)((async t=>{await(0,e.__privateRunCommand)("editor/documents/switch",{id:t,setAsInitial:!0});const n=new URL(window.location.href);n.searchParams.set("post",t.toString()),n.searchParams.delete("active-document"),history.replaceState({},"",n)}),[])}(0,t.__registerSlice)(s),function(){const{init:n}=s.actions;(0,e.__privateListenTo)((0,e.v1ReadyEvent)(),(()=>{const e=r(),i=Object.entries(e.documents).reduce(((t,[e,n])=>(t[e]=l(n),t)),{});(0,t.__dispatch)(n({entities:i,hostId:e.getInitialId(),activeId:e.getCurrentId()}))}))}(),function(){const{activateDocument:n,setAsHost:i}=s.actions;(0,e.__privateListenTo)((0,e.commandEndEvent)("editor/documents/open"),(()=>{const e=r(),a=l(e.getCurrent());(0,t.__dispatch)(n(a)),e.getInitialId()===a.id&&(0,t.__dispatch)(i(a.id))}))}(),function(){const{startSaving:n,endSaving:i,startSavingDraft:a,endSavingDraft:o}=s.actions,c=t=>{const e=t;return"autosave"===e.args?.status};(0,e.__privateListenTo)((0,e.commandStartEvent)("document/save/save"),(e=>{c(e)?(0,t.__dispatch)(a()):(0,t.__dispatch)(n())})),(0,e.__privateListenTo)((0,e.commandEndEvent)("document/save/save"),(e=>{const n=l(r().getCurrent());c(e)?(0,t.__dispatch)(o(n)):(0,t.__dispatch)(i(n))}))}(),function(){const{updateActiveDocument:n}=s.actions,i=v((e=>{const i=e;if(!("post_title"in i.args?.settings))return;const a=r().getCurrent().container.settings.get("post_title");(0,t.__dispatch)(n({title:a}))}),400);(0,e.__privateListenTo)((0,e.commandEndEvent)("document/elements/settings"),i)}(),function(){const{markAsDirty:n,markAsPristine:i}=s.actions;(0,e.__privateListenTo)((0,e.commandEndEvent)("document/save/set-is-modified"),(()=>{r().getCurrent().editor.isChanged?(0,t.__dispatch)(n()):(0,t.__dispatch)(i())}))}(),function(){const{updateActiveDocument:n}=s.actions,i=v((e=>{const i=e;if(!("exit_to"in i.args?.settings))return;const a=r().getCurrent(),o=c(a),s=u(a);(0,t.__dispatch)(n({links:{platformEdit:o,permalink:s}}))}),400);(0,e.__privateListenTo)((0,e.commandEndEvent)("document/elements/settings"),i)}()}(),(window.elementorV2=window.elementorV2||{}).editorDocuments=i}();