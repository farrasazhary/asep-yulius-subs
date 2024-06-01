const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const getHistories = require("../services/getHistories");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

async function getHistoriesHandler(request, h) {
  try {
    const histories = await getHistories();
    return h
      .response({
        status: "success",
        data: histories,
      })
      .code(200);
  } catch (error) {
    console.error("Error getting histories:", error);
    return h
      .response({
        status: "error",
        message: "Failed to get histories",
      })
      .code(500);
  }
}

module.exports = { postPredictHandler, getHistoriesHandler };
