fs = require 'fs'
path = require 'path'
http = require 'http'
url = require 'url'

DATAPATH = './sites/';
info = JSON.parse fs.readFileSync('./data/info.json', 'utf-8')
tmp = ""
# 模板读取
fs.readFile './tmp/input.ejs', (err, data) ->
	if err
		throw err;
	tmp = data
	return
# log封装
log = (txt) ->
	console.info txt
	return

# 参数解析
queryParse = (queryStr) ->
	if not queryStr
		return ''
	queryArr = queryStr.split '&'
	temp = {}
	queryArr.forEach (v, i)->
		vArr = v.split '='
		console.log vArr[1]
		temp[vArr[0]] = decodeURIComponent(vArr[1])
	return temp

# 写入配置文件
writeConfig = (data)->
	data.createTime = +new Date()
	fileName = path.join DATAPATH, (++info.totalCount) + '.json'
	fs.writeFile fileName, JSON.stringify(data), (err) ->
		if err
			throw err

# 服务开启
http.createServer((req, res) ->
	# 获取 URL 路径并在控制台上打印
	pathname = url.parse(req.url).pathname;
	
	reqBody = queryParse url.parse(req.url).query

	if reqBody
		writeConfig reqBody

	# 模板写入
	res.writeHead 200, 
		'Content-Type': 'text/html'
	res.end tmp

	return
).listen 1337, '127.0.0.1'

console.log('Server running at http://127.0.0.1:1337/');