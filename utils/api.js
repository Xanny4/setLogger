import axios from "axios";

// axios.defaults.headers.common["Authorization"] =
//   sessionStorage.getItem("token");

module.exports = {
  getSets: async (exercise = "", dateStart = "", dateEnd = "", typeSort = "", sortOrder = "asc", page = 1, pageSize = 10) => {
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
      console.error("Error getting sets:", error);
    }
  },
};
