import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV} from "constants/ActionTypes";


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}
