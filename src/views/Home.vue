<template>
  <div class="home">
    <b-container>
      <b-row align-v="center">
        <job-card
          :name="job.name"
          :id="job.id"
          v-for="job in getDisplayJobs"
          :key="job.id"
        ></job-card>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="getRows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import JobCard from "@/components/JobCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  async mounted() {
    this.getRecords();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 3
    };
  },
  components: { "job-card": JobCard },
  computed: {
    ...mapGetters(["getRows", "getDisplayJobs"])
  },
  methods: {
    paginate(currentPage) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage });
    },
    async getRecords() {
      await this.$store.dispatch("fetchJobs");
    }
  }
};
</script>
<style lang="scss" scoped>
// b-card {
// padding: 10px;
// }
</style>
