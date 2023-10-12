export const myProfile = (req, res, next) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  };

  export const logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid", {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      });
      res.status(200).json({
        message: "Logged Out",
      });
    });
  };