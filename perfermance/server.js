var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/track.gif", function (req, res, next) {
    try {
        // 处理埋点数据
        // ...
        console.log("走到这里来没有？");
        // 返回1x1像素的透明gif图像
        const buffer = Buffer.from(
            "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            "base64"
        );
        res.writeHead(200, {
            "Content-Type": "image/gif",
            "Content-Length": buffer.length,
        });
        console.log("buffer", buffer);
        res.end(buffer);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
