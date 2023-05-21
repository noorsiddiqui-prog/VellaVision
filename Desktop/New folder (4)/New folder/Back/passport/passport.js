const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


const GOOGLE_CLIENT_ID = "171278790726-1r4d3o48dsve8vhr53jn7thml5kmdngj.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const GITHUB_CLIENT_ID = "eb769edcfc417d43b6cc"
const GITHUB_CLIENT_SECRET = "eb2993b6827d246982a1293b37fe80a23652b18a"

const FACEBOOK_APP_ID = "970591734284227"
const FACEBOOK_APP_SECRET = "d1de767a98ecf3a53762306428948ebb"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
      
      done(null, profile)

      //for mongodb
    //    const user = {
    //     username: profile.displayName,
    //     avatar: profile.photos[0],
    // }
    //   User.save(user)
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
   
})
passport.deserializeUser((user, done) => {
    done(null, user)
   
})




// github

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, profile)
  }
));



//facebook
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, profile)
  }
));
