const express = require("express");
const router = express.Router();

router.get("/summoner", (req, res) => {
    res.render("summoner", {});
});

module.exports = router;