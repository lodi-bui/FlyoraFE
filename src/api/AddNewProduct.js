import axios from "axios";

export const addNewProduct = async (
  authorization,
  {
    name,
    description,
    price,
    stock,
    categoryId,
    birdTypeId,
    material,
    origin,
    usageTarget,
    weight,
    color,
    dimensions,
    imageUrl,
  }
) => {
  try {
    const response = await axios.post(
      "https://flyora-backend.onrender.com/api/v1/owner/products",
      {
        name,
        description,
        price,
        stock,
        categoryId,
        birdTypeId,
        material,
        origin,
        usageTarget,
        weight,
        color,
        dimensions,
        imageUrl,
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
