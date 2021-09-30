const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const Student = require("../models/student");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let student = await Student.findOne({ googleId: profile.id });
        if (student) {
          return cb(null, student);
        } else {
          let newStudent = new Student({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          await newStudent.save();
          return cb(null, newStudent);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser(function (student, done) {
  done(null, student.id);
});

passport.deserializeUser(function (id, done) {
  Student.findById(id, function (err, student) {
    done(err, student);
  });
});
