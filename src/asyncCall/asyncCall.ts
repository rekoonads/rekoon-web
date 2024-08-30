import axios from 'axios';
const domainName = import.meta.env.VITE_DOMAIN;
export const searchUser = async (userId) => {
  try {
    const response = await axios.get(`${domainName}/api/search-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getAgency = async(agencyId) =>{
  try {
    const agenceyData = await axios.get(`${domainName}/api/search-agency/${agencyId}`);
    return agenceyData.data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }

};

export const getAdvertiser = async(userId) =>{
  try {
    const advertiserData = await axios(`/api/advertisers/${userId}`);
    return advertiserData.data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}