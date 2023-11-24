import express from "express";
import db from "../../models/index.cjs";
const { Users, SocialAccounts, RefreshTokens } = db;
import "dotenv/config";
import passport from "passport";
import NaverStrategy from "passport-naver";
import { generateToken } from "../../utils/token.js";

const router = express.Router();

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3006/api/naverCallback"
    },
    async function (accessToken, refreshToken, profile, done) {
      const userEmail = profile.emails[0].value;

      let user = await Users.findOne({ where: { email: userEmail } });

      if (!user) {
        user = await Users.create({
          email: userEmail,
          name: profile.displayName,
          password: profile.displayName,
          verified: true
        });
      } else {
        await RefreshTokens.destroy({ where: { user_Id: user.id } });
      }

      let socialAccount = await SocialAccounts.findOne({
        where: { email: userEmail }
      });

      if (!socialAccount) {
        socialAccount = await SocialAccounts.create({
          provider: "naver",
          email: userEmail,
          socialId: profile.id,
          userId: user.id
        });
      }

      const tokens = await generateToken(user.id);
      done(null, { user, ...tokens });
    }
  )
);

router.get("/login-naver", passport.authenticate("naver", { session: false }));

router.get(
  "/naverCallback",
  passport.authenticate("naver", {
    session: false,
    failureRedirect: "/fail.html"
  }),
  function (req, res) {
    res.cookie("accessToken", req.user.accessToken, { httpOnly: true });
    res.cookie("refreshToken", req.user.refreshToken, { httpOnly: true });
    res.redirect("/login.html");
  }
);

export default router;
