import admin from "../firebaseAdmin.js";

export async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = decodedToken; // Firebase user info
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}
