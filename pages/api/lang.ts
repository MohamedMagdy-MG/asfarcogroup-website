import { withIronSessionApiRoute } from 'iron-session/next';

declare module "iron-session" {
  interface IronSessionData {
    userLanguage?: string;
  }
}

export default withIronSessionApiRoute(
  async (req, res) => {
    const { language } =JSON.parse(req.body);
    req.session.userLanguage =language;
    await req.session.save();
    res.status(200).end();
  },
  {
    password: 'asdas54d56as4d56as4d56as4d56as456d4as56d4a56sd46a',
    cookieName: 'mostafa',
    cookieOptions: {
      secure: true ,
    },
  }
);