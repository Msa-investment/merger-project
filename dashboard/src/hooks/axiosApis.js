import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchDashboard = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || user?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/general/dashboard`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchAdmins = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || user?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/admins`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchUser = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/admins/users/${prop.id}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchUsers = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token || prop?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/admins/users`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchStudents = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/students`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchStudent = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/students/${prop.id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchExpense = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/expenses`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchResources = async (prop) => {
  const { page, limit, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/resources?page=${page}&limit=${limit}`,
      config,
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchResource = async (prop) => {
  const { id, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/resources/${id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchProjects = async (prop) => {
  const { page, limit, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/projects?page=${page}&limit=${limit}`,
      config,
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchProject = async (prop) => {
  const { id, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/projects/${id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchActivity = async (prop) => {
  const { id, activityId, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/projects/${id}/activity/${activityId}`,
      config,
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchUserResources = async (prop) => {
  const { id, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/resources/user/${id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchTransactions = async (prop) => {
  const { page, limit, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/admins/transactions?page=${page}&limit=${limit}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchTransaction = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/transactions/${prop.id}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
