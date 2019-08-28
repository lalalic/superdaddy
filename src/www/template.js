export default ({content,_init})=>`
<!doctype html>
<html>
    <head>
		<meta charset="utf-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta name="msapplication-tap-highlight" content="no" />
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Security-Policy">
		<base href="/">
        <title></title>
    </head>
    <body style="display:flex;flex-direction:column;overflow:hidden;margin:0px auto;padding:0;background-color:lightgray;position:absolute;width:100%;height:100%">
		<div id="app" style="flex:1 1 100%;background-color:white;margin:0px auto;position:relative;display:flex;flex-direction:column;">${content}</div>
	</body>
	<script>
		window._initRelay=${_init ? JSON.stringify(_init) : "undefined"}
	</script>
	<script src="www.js" defer></script>
</html>

`