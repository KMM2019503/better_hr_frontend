import { defineStore } from "pinia";
import { useApolloClient } from "@vue/apollo-composable";
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
      const { resolveClient } = useApolloClient();
      const apolloClient = resolveClient();

      try {
        this.isLoading = true;
        const variables = {
          page: page,
          limit: limit,
        };

        // Execute the query using Apollo Client
        const { data } = await apolloClient.query({
          query: fetchEmployeeDataQuery,
          variables,
          fetchPolicy: "no-cache",
        });

        // Update the state with the fetched data
        this.employees = data.users.data;
        this.current_page = data.users.current_page;
        this.last_page = data.users.last_page;
        this.total = data.users.total;
        this.per_page = data.users.per_page;
      } catch (error) {
        console.error("Failed to fetch employees data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
