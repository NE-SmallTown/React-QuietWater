/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/3/19
 */

export function getScrollOfNode (w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;

  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }

  return ret;
}

export function getTransitionName (props) {
  let transitionName = props.transitionName;
  const animation = props.animation;

  if (!transitionName && animation) {
    transitionName = `${props.prefixCls}-${animation}`;
  }

  return transitionName;
}

export function offsetOfNode (el) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;

  pos.left += getScrollOfNode(w);
  pos.top += getScrollOfNode(w, true);

  return pos;
}

export function setTransformOrigin (node, value) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}
