/**
 * Measure.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define('tinymce/inlight/core/Measure', [
	'global!tinymce.DOM',
	'global!tinymce.geom.Rect',
	'tinymce/inlight/core/Convert'
], function (DOM, Rect, Convert) {
	var RESIZE_HANDLE_SIZE = 8;

	var toAbsolute = function (rect) {
		var vp = DOM.getViewPort();

		return {
			x: rect.x + vp.x,
			y: rect.y + vp.y,
			w: rect.w,
			h: rect.h
		};
	};

	var getElementRect = function (editor, elm) {
		var pos, targetRect, root;

		pos = DOM.getPos(editor.getContentAreaContainer());
		targetRect = editor.dom.getRect(elm);
		root = editor.dom.getRoot();

		// Adjust targetPos for scrolling in the editor
		if (root.nodeName == 'BODY') {
			targetRect.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
			targetRect.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop;
		}

		targetRect.x += pos.x;
		targetRect.y += pos.y;

		// We need to use these instead of the rect values since the style
		// size properites might not be the same as the real size for a table
		targetRect.w = elm.clientWidth;
		targetRect.h = elm.clientHeight;

		// Inflate the elementRect so it doesn't get placed above resize handles
		if (editor.selection.controlSelection.isResizable(elm)) {
			targetRect = Rect.inflate(targetRect, 0, RESIZE_HANDLE_SIZE);
		}

		return targetRect;
	};

	var getContentAreaRect = function (editor) {
		return toAbsolute(DOM.getRect(editor.getContentAreaContainer() || editor.getBody()));
	};

	var getSelectionRect = function (editor) {
		var rect = Convert.fromClientRect(editor.selection.getBoundingClientRect());
		return toAbsolute(Rect.inflate(rect, 0, 8));
	};

	return {
		getElementRect: getElementRect,
		getContentAreaRect: getContentAreaRect,
		getSelectionRect: getSelectionRect
	};
});