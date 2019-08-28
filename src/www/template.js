export default function({content, data}){
    return `<!doctype html><html>
        <head>
            <meta charset="utf-8" />
            <base href="/www"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
            <title>激励馆</title>
            <style>
                @media screen and (min-width:960px){
                    section{
                        width:960px;
                        margin:auto;
                    }
                }
            </style>
        </head>
        <body style="margin:0;background:lightgray;">
            <header style="z-index:2;position:fixed;top:0px;width:100%;height:50px;line-height:50px;display:flex;flex-direction:row;background-color:#303848;color:white;">
                <center style="flex:none;padding-left:20px;margin:auto">
                    <strong>激励馆</strong>
                </center>
                
                <center style="flex:1 1 100%"></center>
                <center style="flex:none;padding-right:20px;margin:auto">
                    <a href="https://app.jiliguan.com" style="text-decoration:none;padding:10px;white-space:nowrap; border-radius:5px; border:1px solid white;background:transparent;color:white">
                        管理控制台
                    </a>
                </center>
            </header>
            <section style="background:white;margin-top:55px;">
                <div style="min-height:500px;" id="app">${content}</div>
            </section>
            <footer style="padding:10px;background-color:#303848;color:white; min-height:300px;display:flex;flex-direction:column">
                <div style="flex:1 1 100%">
                
                </div>
                <div style="flex:none;border-top:1px solid gray; font-size:small">
                    <p>
                        <span>© 2019 激励馆</span>
                        <span style="float:right">京ICP备15008710号-4</span>
                    </p>
                </div>
            </footer>
        </body>
        <script>
            window.__RELAY_BOOTSTRAP_DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="/www.js" defer></script>
    </html>`
}