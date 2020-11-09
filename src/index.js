const app = require("./app")
//CROS
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Authorization ,Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,PATCH, OPTIONS');
    next();
});

app.listen(process.env.PORT||3001, () => {
    console.log("Server Running on port" + process.env.PORT);
})