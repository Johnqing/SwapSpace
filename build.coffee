# 各种包引入
fs = require 'fs'
path = require 'path'
ejs = require 'ejs'


# 数据引入
dataFolder = './sites'
tmpIndex = './tmp/index.ejs'
INFO = './data/info.json'

data = 
	types: {}

# 模板解析
parseTmp = ->
	fs.readFile tmpIndex, 'utf8', (err, tmp) ->
		keyArr = []
		for k, v of data.types
			keyArr.push k

		data.keyArr = keyArr


		console.log data


		tmp = ejs.render tmp, data
		
		fs.writeFile './index.html', tmp, 'utf-8', (err) ->
			if err
				console.log err
				return
			console.log '生成完毕'

		return
	return


writeSiteInfo = (info) ->
    fs.writeFileSync INFO, JSON.stringify(info), 'utf8'
    console.log '信息生成完成'


fs.readdir dataFolder, (err, files) ->
	if err
		throw err

	# 获取文件总数
	filesLen = files.length
	info = JSON.parse fs.readFileSync(INFO)

	files.forEach (v, i)->
		# 拼接文件完整
		filePath = path.join dataFolder, v

		fs.readFile filePath, 'utf8', (err, file)->
			if err
				throw err

			jsonData = JSON.parse file
			
			# 格式化类型，类型必须以|隔开
			typesArr = jsonData.name.split '|'

			typesArr.forEach (v, i) ->
				if data.types[v] is undefined
					data.types[v] = []
				
				data.types[v].push jsonData
				return
			filesLen--
			if not filesLen

				if files.length isnt info.totalCount
                    info.totalCount = files.length

				writeSiteInfo info

				data.info = info
				parseTmp()
			return
		return
	return
