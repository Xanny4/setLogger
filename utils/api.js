import axios from "axios";

module.exports = {
  getSets: async (exercise = "", dateStart = "", dateEnd = "", typeSort = "", sortOrder = "desc", page = 1, pageSize = 10) => {
    try {
      console.log("axios: " + `http://localhost:3000/api/sets/?exercise=${exercise}&dateStart=${dateStart}&dateEnd=${dateEnd}&typeSort=${typeSort}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
      const Response = await axios.get(
        `http://localhost:3000/api/sets/?exercise=${exercise}&dateStart=${dateStart}&dateEnd=${dateEnd}&typeSort=${typeSort}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        }
      );
      return Response.data;
    } catch (error) {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token"))
          sessionStorage.removeItem("token")
        return;
      } console.error("Error getting sets:", error);
    }
  },
  getExercises: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/exercises/"
        , {
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token"))
          sessionStorage.removeItem("token")
        return;
      } console.error("Error getting sets:", error);
    }
  },
  getExerciseById: async (id) => {
    try {
      const Response = await axios.get(`http://localhost:3000/api/exercises/${id}`,
        {
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        }
      );
      return Response.data;
    } catch (error) {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token"))
          sessionStorage.removeItem("token")
        return;
      } console.error("Error getting sets:", error);
    }
  }
};
