import axios from "axios";

export const addNewProduct = async (authorization, form) => {
  try {
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      birdTypeId: Number(form.birdTypeId),
      material: form.material,
      origin: form.origin,
      usageTarget: form.usageTarget,
      weight: Number(form.weight),
      color: form.color,
      dimensions: form.dimensions,
      imageUrl: form.imageUrl,
    };

    console.log("PAYLOAD:", payload); // debug

    const response = await axios.post(
      "https://flyora-backend-v2.onrender.com/api/v1/owner/products",
      payload,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("BACKEND ERROR:", error.response?.data);
    throw error;
  }
};

// import axios from "axios";

// export const addNewProduct = async (
//   authorization,
//   {
//     name,
//     description,
//     price,
//     stock,
//     categoryId,
//     birdTypeId,
//     material,
//     origin,
//     usageTarget,
//     weight,
//     color,
//     dimensions,
//     imageUrl,
//   }
// ) => {
//   try {
//     const response = await axios.post(
//       "https://flyora-backend.onrender.com/api/v1/owner/products",
//       {
//         name,
//         description,
//         price,
//         stock,
//         categoryId,
//         birdTypeId,
//         material,
//         origin,
//         usageTarget,
//         weight,
//         color,
//         dimensions,
//         imageUrl,
//       },
//       {
//         headers: {
//           Authorization: authorization,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };