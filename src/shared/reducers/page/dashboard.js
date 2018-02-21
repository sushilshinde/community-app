import _ from 'lodash';
import actions, { TABS } from 'actions/page/dashboard';
import cookies from 'browser-cookies';
import { isClientSide } from 'utils/isomorphy';
import { handleActions } from 'redux-actions';

const validTabs = new Set(_.values(TABS));

/**
 * Shows/hides challenge filter by community.
 * @param {Object} state
 * @param {Boolean} payload `true` to show; `false` to hide.
 * @return {Object} New state.
 */
function onShowChallengeFilter(state, { payload }) {
  if (state.showChallengeFilter === payload) return state;
  return { ...state, showChallengeFilter: payload };
}

/**
 * Shows/hides member earnings in the dashboard.
 * @param {*} state
 * @param {Boolean} payload `true` to show; `false` to hide.
 * @return {Object} New state
 */
function onShowEarnings(state, { payload }) {
  if (state.showEarnings === payload) return state;
  if (isClientSide()) {
    cookies.set('showEarningsInDashboard', JSON.stringify(payload));
  }
  return { ...state, showEarnings: payload };
}

/**
 * Switches dash tabs.
 * @param {Object} state
 * @param {String} payload Target tab.
 * @return {Object} New state.
 */
function onSwitchTab(state, { payload }) {
  if (state.tab === payload || !validTabs.has(payload)) return state;
  return { ...state, tab: payload };
}

/**
 * Creates a new reducer.
 * @param {Object} state Optional. Initial state.
 * @return {Function} Reducer.
 */
function create(state = {}) {
  const a = actions.page.dashboard;
  return handleActions({
    [a.showChallengeFilter]: onShowChallengeFilter,
    [a.showEarnings]: onShowEarnings,
    [a.switchTab]: onSwitchTab,
  }, _.defaults(state, {
    tab: TABS.MY_ACTIVE_CHALLENGES,
  }));
}

export default create();