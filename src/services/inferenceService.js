const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    // const classes = ["Cancer", "Non-cancer"];

    const label = confidenceScore >= 0.5 ? "Cancer" : "Non-cancer";

    const suggestion =
      label === "Cancer" ? "Hati-hati, musuh terlihat" : "Kerja bagus !!!";

    return { label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
