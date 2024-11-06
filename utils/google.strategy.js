import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
  console.log("ticketwwwwww");
  
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(ticket);
  
  return ticket.getPayload();
}

export {
  verifyGoogleToken,
};
