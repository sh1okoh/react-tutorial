/*
 * action types
 */

export const CLICK_SQUARE = "CLICK_SQUARE";
export const JUMP_TO_PAST = "JUMP_TO_PAST";
export const CLICK_REVERSE_BUTTON = "CLICK_REVERSE_BUTTON";

/*
 * action creators
 */

export function clickSquare(index) {
  return { type: CLICK_SQUARE, index };
}

export function jumpToPast(step) {
  return { type: JUMP_TO_PAST, step };
}

export function reverseBtn(step) {
  return { type: CLICK_REVERSE_BUTTON, step};
}