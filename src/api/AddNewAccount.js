import axios from "axios";

export const addNewAccount = async (
  requesterId,
  {
    username,
    password,
    email,
    phone,
    isActive,
    isApproved,
    roleId,
    roleName,
    approvedBy,
    name,
    otherInfo,
    shopOwnerId
  }
) => {
  try {
    const response = await axios.post(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts?requesterId=${requesterId}`,
      {
        username,
        password,
        email,
        phone,
        isActive,
        isApproved,
        roleId,
        roleName,
        approvedBy,
        name,
        otherInfo,
        shopOwnerId
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add new account:", error);
    throw error;
  }
};
