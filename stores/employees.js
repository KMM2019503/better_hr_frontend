import { defineStore } from "pinia";
import fetchEmployeeDataQuery from "~/apollo/query/fetchEmployeeData.graphql";

export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    isLoading: false,
    employees: [],
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
  }),
  actions: {
    setCurrentPage(page) {
      this.current_page = page;
    },

    setPageSize(size) {
      this.per_page = size;
    },

    async getEmployeesData(page, limit) {
      try {
        this.isLoading = true;
        let variables = {
          page: page,
          limit: limit,
        };
        const { data } = await useAsyncQuery(
          fetchEmployeeDataQuery,
          variables,
          {
            fetchPolicy: "network-only",
          }
        );
        console.log(
          "🚀 ~ getEmployeesData ~ data._value.users:",
          data._value.users
        );
        this.employees = data._value.users.data;
        this.current_page = data._value.users.current_page;
        this.last_page = data._value.users.last_page;
        this.total = data._value.users.total;
        this.per_page = data._value.users.per_page;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
