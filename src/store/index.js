import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    displayJobs: [],
    rows: 0,
    showSpinner: false
  },
  mutations: {
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_DISPLAY_JOBS(state, displayJobs) {
      state.displayJobs = displayJobs;
    },
    SET_SPINNER(state, spinner) {
      state.showSpinner = spinner;
    }
  },
  actions: {
    async fetchData({ commit }) {
      commit("SET_SPINNER", true);
      return new Promise(resolve => {
        setTimeout(async () => {
          const res = await fetch("jobs.json");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        }, 1000);
      });
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_JOBS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async fetchJobs({ dispatch }) {
      const myJson = await dispatch("fetchData");
      dispatch("updatePagination", { myJson, currentPage: 1, perPage: 3 });
      return myJson;
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const jobs = state.jobs.slice(start, start + 3);
      commit("SET_DISPLAY_JOBS", jobs);
    },
    async search({ dispatch }, { text }) {
      const myJson = await dispatch("fetchData");
      const values = myJson.filter(val => {
        return val.name.toLowerCase().includes(text.toLowerCase());
      });

      dispatch("updatePagination", {
        myJson: values,
        currentPage: 1,
        perPage: 3
      });
    }
  },
  getters: {
    getJobs(state) {
      return state.jobs;
    },
    getRows(state) {
      return state.rows;
    },
    getDisplayJobs(state) {
      return state.displayJobs;
    },
    getSpinner(state) {
      return state.showSpinner;
    }
  },
  modules: {}
});
