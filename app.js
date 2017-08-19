var express =  require('express');
var app = express();

app.use(express.static(__dirname+"/"));


app.listen(3002);
console.log("server on port 3002");