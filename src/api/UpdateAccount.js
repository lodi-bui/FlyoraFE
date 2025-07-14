import axios from "axios";

export const updateAccount = async (
  id,
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
    const response = await axios.put(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts/${id}?requesterId=${requesterId}`,
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
    console.error("Failed to update account:", error);
    throw error;
  }
};



