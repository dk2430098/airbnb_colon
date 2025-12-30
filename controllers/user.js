const User = require("../models/user");
const Listing = require("../models/listing");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};

module.exports.toggleWishlist = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    // Check if listing is already in wishlist
    const index = user.wishlist.indexOf(id);

    if (index === -1) {
        // Not in wishlist, add it
        user.wishlist.push(id);
        await user.save();
        res.json({ status: 'added', message: 'Added to wishlist' });
    } else {
        // In wishlist, remove it
        user.wishlist.splice(index, 1);
        await user.save();
        res.json({ status: 'removed', message: 'Removed from wishlist' });
    }
};

module.exports.renderDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        const myListings = await Listing.find({ owner: req.user._id });

        // Calculate total likes received (optional feature, but good for stats)
        // For now just sending listing count

        res.render("users/dashboard.ejs", { user, myListings });
    } catch (e) {
        req.flash("error", "Could not load dashboard");
        res.redirect("/listings");
    }
};
