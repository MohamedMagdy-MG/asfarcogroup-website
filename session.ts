// session.js
import { withIronSessionSsr } from "iron-session/next";

export function withSessionSsr(handler: any) {
  return withIronSessionSsr(handler, {
    password: "asdas54d56as4d56as4d56as4d56as456d4as56d4a56sd46a",
    cookieName: "mostafa",
    cookieOptions: {
      secure: true,
    },
  });
}
