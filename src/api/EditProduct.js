import axios from "axios";

export const editProduct = async (
  authorization,
  {
    id,
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
    const response = await axios.put(
      `https://flyora-backend.onrender.com/api/v1/owner/products/${id}`,
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
