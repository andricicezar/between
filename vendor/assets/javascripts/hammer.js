/*! Hammer.JS - v1.0.6dev - 2013-07-12
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t,e){"use strict";function n(){if(!r.READY){r.event.determineEventTypes();for(var t in r.gestures)r.gestures.hasOwnProperty(t)&&r.detection.register(r.gestures[t]);r.event.onTouch(r.DOCUMENT,r.EVENT_MOVE,r.detection.detect),r.event.onTouch(r.DOCUMENT,r.EVENT_END,r.detection.detect),r.READY=!0}}var r=function(t,e){return new r.Instance(t,e||{})};r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=t.navigator.pointerEnabled||t.navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in t,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&t.navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.DIRECTION_DOWN="down",r.DIRECTION_LEFT="left",r.DIRECTION_UP="up",r.DIRECTION_RIGHT="right",r.POINTER_MOUSE="mouse",r.POINTER_TOUCH="touch",r.POINTER_PEN="pen",r.EVENT_START="start",r.EVENT_MOVE="move",r.EVENT_END="end",r.DOCUMENT=t.document,r.plugins={},r.READY=!1,r.Instance=function(t,e){var i=this;return n(),this.element=t,this.enabled=!0,this.options=r.utils.extend(r.utils.extend({},r.defaults),e||{}),this.options.stop_browser_behavior&&r.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),r.event.onTouch(t,r.EVENT_START,function(t){i.enabled&&r.detection.startDetect(i,t)}),this},r.Instance.prototype={on:function(t,e){for(var n=t.split(" "),r=0;n.length>r;r++)this.element.addEventListener(n[r],e,!1);return this},off:function(t,e){for(var n=t.split(" "),r=0;n.length>r;r++)this.element.removeEventListener(n[r],e,!1);return this},trigger:function(t,e){var n=r.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var i=this.element;return r.utils.hasParent(e.target,i)&&(i=e.target),i.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var i=null,o=!1,a=!1;r.event={bindDom:function(t,e,n){for(var r=e.split(" "),i=0;r.length>i;i++)t.addEventListener(r[i],n,!1)},onTouch:function(t,e,n){var s=this;this.bindDom(t,r.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!a){u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which?o=!0:u.match(/mouse/)&&1!==c.which&&(o=!1),u.match(/touch|pointer/)&&(a=!0);var h=0;o&&(r.HAS_POINTEREVENTS&&e!=r.EVENT_END?h=r.PointerEvent.updatePointer(e,c):u.match(/touch/)?h=c.touches.length:a||(h=u.match(/up/)?0:1),h>0&&e==r.EVENT_END?e=r.EVENT_MOVE:h||(e=r.EVENT_END),(h||null===i)&&(i=c),n.call(r.detection,s.collectEventData(t,e,s.getTouchList(i,e),c)),r.HAS_POINTEREVENTS&&e==r.EVENT_END&&(h=r.PointerEvent.updatePointer(e,c))),h||(i=null,o=!1,a=!1,r.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=r.HAS_POINTEREVENTS?r.PointerEvent.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[r.EVENT_START]=t[0],r.EVENT_TYPES[r.EVENT_MOVE]=t[1],r.EVENT_TYPES[r.EVENT_END]=t[2]},getTouchList:function(t){return r.HAS_POINTEREVENTS?r.PointerEvent.getTouchList():t.touches?t.touches:(t.indentifier=1,[t])},collectEventData:function(t,e,n,i){var o=r.POINTER_TOUCH;return(i.type.match(/mouse/)||r.PointerEvent.matchType(r.POINTER_MOUSE,i))&&(o=r.POINTER_MOUSE),{center:r.utils.getCenter(n),timeStamp:(new Date).getTime(),target:i.target,touches:n,eventType:e,pointerType:o,srcEvent:i,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return r.detection.stopDetect()}}}},r.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==r.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[r.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==r.POINTER_MOUSE,n[r.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==r.POINTER_TOUCH,n[r.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==r.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},r.utils={extend:function(t,n,r){for(var i in n)t[i]!==e&&r||(t[i]=n[i]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],r=0,i=t.length;i>r;r++)e.push(t[r].pageX),n.push(t[r].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,r=e.pageX-t.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),i=Math.abs(t.pageY-e.pageY);return n>=i?t.pageX-e.pageX>0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT:t.pageY-e.pageY>0?r.DIRECTION_UP:r.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,r=e.pageY-t.pageY;return Math.sqrt(n*n+r*r)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==r.DIRECTION_UP||t==r.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,r=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var i=0;r.length>i;i++)for(var o in e)e.hasOwnProperty(o)&&(n=o,r[i]&&(n=r[i]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:r.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==r.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=r.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,i=t.touches.length;i>n;n++)e.touches.push(r.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,a=t.center.pageX-e.center.pageX,s=t.center.pageY-e.center.pageY,c=r.utils.getVelocity(o,a,s);return r.utils.extend(t,{deltaTime:o,deltaX:a,deltaY:s,velocityX:c.x,velocityY:c.y,distance:r.utils.getDistance(e.center,t.center),angle:r.utils.getAngle(e.center,t.center),direction:r.utils.getDirection(e.center,t.center),scale:r.utils.getScale(e.touches,t.touches),rotation:r.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),r.utils.extend(r.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},r.gestures=r.gestures||{},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case r.EVENT_START:clearTimeout(this.timer),r.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==r.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case r.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case r.EVENT_END:clearTimeout(this.timer)}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==r.EVENT_END){var n=r.detection.previous,i=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),i=!0),(!i||e.options.tap_always)&&(r.detection.current.name="tap",e.trigger(r.detection.current.name,t))}}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==r.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&r.detection.current.name!=this.name)return;if(r.detection.current.name!=this.name&&(r.detection.current.name=this.name,n.options.correct_for_drag_min_distance)){var i=Math.abs(n.options.drag_min_distance/t.distance);r.detection.current.startEvent.center.pageX+=t.deltaX*i,r.detection.current.startEvent.center.pageY+=t.deltaY*i,t=r.detection.extendEventData(t)}(r.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var o=r.detection.current.lastEvent.direction;t.drag_locked_to_axis&&o!==t.direction&&(t.direction=r.utils.isVertical(o)?0>t.deltaY?r.DIRECTION_UP:r.DIRECTION_DOWN:0>t.deltaX?r.DIRECTION_LEFT:r.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&r.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!r.utils.isVertical(t.direction))&&t.preventDefault();break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:var i=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(n.options.transform_min_scale>i&&n.options.transform_min_rotation>o)return;r.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),o>n.options.transform_min_rotation&&n.trigger("rotate",t),i>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==r.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==r.EVENT_START&&n.trigger(this.name,t),e)}},r.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==r.EVENT_END&&e.trigger(this.name,t)}},"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.Hammer=r,define(function(){return r})):"object"==typeof module&&"object"==typeof module.exports?module.exports=r:t.Hammer=r})(this),function(t,e){"use strict";t!==e&&(Hammer.event.bindDom=function(n,r,i){t(n).on(r,function(t){var n=t.originalEvent||t;n.pageX===e&&(n.pageX=t.pageX,n.pageY=t.pageY),n.target||(n.target=t.target),n.which===e&&(n.which=n.button),n.preventDefault||(n.preventDefault=t.preventDefault),n.stopPropagation||(n.stopPropagation=t.stopPropagation),i.call(this,n)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){var r=t(this.element);return r.has(n.target).length&&(r=t(n.target)),r.trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),r=n.data("hammer");r?r&&e&&Hammer.utils.extend(r.options,e):n.data("hammer",new Hammer(this,e||{}))})})}(window.jQuery||window.Zepto);
