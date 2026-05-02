import PhoneModel from "../models/phones.model.js";
import asyncHandler from "../utils/asynchandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiErrors.js";
import { phoneRecommender } from "../services/model.service.js";

const getPhoneRecommendations = asyncHandler(async (req, res) => {
  const { preferences } = req.body;
  let recommendations;
  try {
    const response = await phoneRecommender(preferences);
    recommendations = response.data.results;
  } catch (err) {
    throw new apiError(400, err.message || "Failed to retrieve ");
  }
  console.log("recommendations", recommendations);
  const phoneDetails = [];

  for (const phone of recommendations) {
    const phoneData = await PhoneModel.findOne({ name: phone.name });

    if (!phoneData) continue; // skip if not found in DB

    const phoneDataAndMatchScore = {
      ...phoneData.toObject(),
      match_score: phone.match_score,
    };

    phoneDetails.push(phoneDataAndMatchScore);
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        phoneDetails,
        "Phone recommendations retrieved successfully",
      ),
    );
});

export { getPhoneRecommendations };
