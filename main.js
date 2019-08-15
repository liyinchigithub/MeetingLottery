const {
    app,
    BrowserWindow,
    globalShortcut,//设置全局快捷键
    ipcMain,
  } = require('electron')
  
  let mainWindow
  
  function createWindow () {
    mainWindow = new BrowserWindow({
          frame: false,
          resizable: false,
          fullscreen:false
    });
    
    //主进程展示首页画布
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    // 自动隐藏菜单
    mainWindow.setAutoHideMenuBar(true)
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  
    globalShortcut.unregisterAll();//设置全局快捷键
  
    //开始抽奖
    globalShortcut.register('alt+s',()=>{
      //主进程发送消息给渲染进程
      mainWindow.webContents.send('global-shortcut','start');
    });
    //停止抽奖
    globalShortcut.register('alt+c',()=>{
      mainWindow.webContents.send('global-shortcut','stop');
    });
    //切换到下一个奖项
    globalShortcut.register('alt+n',()=>{
      mainWindow.webContents.send('global-shortcut','next');
    });
    //截屏
    globalShortcut.register('alt+x',()=>{
      mainWindow.webContents.send('global-shortcut','capture');
    });
    //关闭/打开背景音乐
    globalShortcut.register('alt+v',()=>{
      mainWindow.webContents.send('global-shortcut','novoice');
    });
    //退出
    globalShortcut.register('ctrl+q',()=>{
      app.quit();
    });
    //调试
    globalShortcut.register('ctrl+i',function(){
      mainWindow.webContents.openDevTools();
    });
  
    
  }
  app.on('ready', createWindow)
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })

  app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required')