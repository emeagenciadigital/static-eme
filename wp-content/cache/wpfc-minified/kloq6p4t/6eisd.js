'use strict';
var current_url=window.location.origin;
var static_url=document.querySelector("meta[name='ssp-url']").getAttribute("content");
if(static_url.includes(current_url)){
var baseurl=document.querySelector("meta[name='ssp-config-url']").getAttribute("content");
var host_name=window.location.hostname;
let config_url=baseurl + host_name.split('.').join('-') + '-forms.json';
let forms;
function loadForms(callback){
var xobj=new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', config_url, false);
xobj.onreadystatechange=function (){
if(xobj.readyState==4&&xobj.status=="200"){
callback(xobj.responseText);
}};
xobj.send(null);
}
loadForms(function (response){
var json=JSON.parse(response);
forms=json;
});
function success(el, redirect_url){
el.target.submit.disabled=false;
if(el.target.querySelector('input[type="submit"]')){
el.target.querySelector('input[type="submit"]').blur();
}
el.target.reset();
if(redirect_url.length > 0){
window.location.replace(redirect_url);
}}
function submitForm(method, url, redirect_url, data, el){
var xhr=new XMLHttpRequest();
xhr.open(method, url);
xhr.onreadystatechange=function (){
if(xhr.readyState!==XMLHttpRequest.DONE) return;
if(xhr.status===200){
success(el, redirect_url);
}};
xhr.send(data);
}
function modifyFormAttributes(form){
form.removeAttribute("action");
form.removeAttribute("method");
form.removeAttribute("enctype");
form.removeAttribute("novalidate");
}
document.addEventListener("DOMContentLoaded", function (){
const allForms=document.querySelectorAll(".wpcf7 form, .wpcf7-form, .gform_wrapper form, .wpforms-container form"
);
allForms.forEach((form)=> {
modifyFormAttributes(form);
const inputs=form.querySelectorAll("input");
inputs.forEach((input)=> {
if(input.getAttribute("aria-required")==="true"){
input.required=true;
}});
form.addEventListener("submit", function (el){
el.preventDefault();
if(form.className.includes('wpcf7-form')){
var parent_id=form.parentNode.id.split('-');
var form_id=parent_id[1].substring(1);
}
if(form.parentNode.className.includes('gform_wrapper')){
var form_id=form.id.split('_');
var form_id=form_id[1];
}
var settings=forms.find(x=> x.id==form_id);
if(settings){
var data=new FormData(form);
submitForm("POST", settings.endpoint, settings.redirect_url, data, el);
}});
});
});
};