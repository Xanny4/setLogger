import { Password } from "@mui/icons-material";
import axios from "axios";

module.exports = {
  getSets: async (exercise = "", dateStart = "", dateEnd = "", typeSort = "", sortOrder = "desc", page = 1, pageSize = 10) => {
    try {
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
  deleteSet: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/sets/${id}`,
        {
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        }
      )
      return response.data;
    }
    catch {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token"))
          sessionStorage.removeItem("token")
        return;
      } console.error("Error deleting set:", error);
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
      } console.error("Error getting exercises:", error);
    }
  },
  createExercise: async (exercise) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/exercises/",
        { exercise },
        {
          headers: {
            authorization: sessionStorage.getItem("token")
          }
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token"))
          sessionStorage.removeItem("token")
        return;
      } console.error("Error creating exercise:", error);
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
  },

  //User
  getUser: async () => {
    try {
      const Response = await axios.get(`http://localhost:3000/api/users/`,
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
      } console.error("Error getting user:", error);
    }
  },
  modifyUser: async (username, email) => {
    try {
      const Response = await axios.put(`http://localhost:3000/api/users/`,
        {
          username,
          email
        },
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
      } console.error("Error modifying user:", error);
    }
  },
  confirmPassword: async (password) => {
    try {
      const Response = await axios.post(`http://localhost:3000/api/users/confirmPassword`,
        {
          password
        },
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
      } console.error("Error confirming user's password:", error);
    }
  }
};
