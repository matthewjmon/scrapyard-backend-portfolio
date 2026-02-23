const ALLOWED_DB_NAME_PARTS = ["portfolio", "demo"];

const isAllowedDbName = (dbName) => {
  const normalized = (dbName || "").toLowerCase();
  return ALLOWED_DB_NAME_PARTS.some((part) => normalized.includes(part));
};

export const validatePortfolioMongoUri = (mongoUri) => {
  // Fail fast on boot instead of accidentally connecting to the wrong database.
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set.");
  }

  let parsed;
  try {
    parsed = new URL(mongoUri);
  } catch {
    throw new Error("MONGO_URI is not a valid URI.");
  }

  const protocol = parsed.protocol;
  if (protocol !== "mongodb+srv:" && protocol !== "mongodb:") {
    throw new Error("MONGO_URI must use mongodb:// or mongodb+srv://.");
  }

  if (protocol === "mongodb+srv:" && !parsed.hostname.endsWith(".mongodb.net")) {
    throw new Error(
      "MONGO_URI appears invalid for Atlas SRV. Host should end with .mongodb.net."
    );
  }

  const dbName = parsed.pathname.replace("/", "");
  if (!isAllowedDbName(dbName)) {
    throw new Error(
      "MONGO_URI database name must include 'portfolio' or 'demo' for safety."
    );
  }
};
