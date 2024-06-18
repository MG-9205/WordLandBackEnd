const apiKey = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
  const providedApiKey = req.headers["x-api-key"];

  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

module.exports = apiKeyAuth;
