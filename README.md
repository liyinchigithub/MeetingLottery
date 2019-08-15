
# MeetingLottery
年会抽奖软件

![logo](./images/app.png)

> 效果图

![效果图](./images/20190815.png)

>开发目的

每年公司都有年会，每次都要到网上找这样的抽奖软件，
要么需要花钱买，这样的软件一般的公司是不在采购范围，
要么有人数限制，规则限制，或者根本运行不起来。
所以自己开一款分享给需要的人，比较简陋，但是够用

> 源码使用手册

```sh
git clone https://github.com/liyinchigithub/MeetingLottery
cd MeetingLottery

#安装依赖包
npm install -g electron electron-packager
npm install
#启动项目
npm start


#electron-builder打包 
npm run dist:mac
npm run dist:win
npm run dist:linux

#package.json的script内容
"scripts": {
os系统:"packageDarwin": "electron-packager . 'MeetingLottery' --platform=darwin --arch=x64 --icon=./images/app.icns --out=./dist --asar --app-version=2.0.1 --ignore=\"(dist|src|docs|.gitignore|LICENSE|README.md|webpack.config*|node_modules)\"",
os系统:"packageDarwin": "electron-packager . 'MeetingLottery' --platform=darwin --arch=x64 --icon=./images/app.icns --out=./dist --asar --app-version=2.0.1",

windows系统:"packageWin": "electron-packager . 'MeetingLottery' --platform=win32 --arch=x64 --icon=./images/app.ico --out=./dist --asar --app-version=2.0.1 --ignore=\"(dist|src|docs|.gitignore|LICENSE|README.md|webpack.config.js|node_modules)\"",
windows系统:"packageWin": "electron-packager . 'MeetingLottery' --platform=win32 --arch=x64 --icon=./images/app.ico --out=./dist --asar --app-version=2.0.1",

linux系统:"packageLinux": "electron-packager . 'MeetingLottery' --platform=linux --arch=x64 --out=./dist --asar --app-version=2.0.1 --ignore=\"(dist|src|docs|.gitignore|LICENSE|README.md|webpack.config.js|node_modules)\""
linux系统:"packageLinux": "electron-packager . 'MeetingLottery' --platform=linux --arch=x64 --out=./dist --asar --app-version=2.0.1"
}


#electron-packager打包 
#或者打包win32，，默认是64位版
npm run-script package

#如果要打包其他版本自己修改参数 --platform=win32 

#package.json的script内容
electron-packager ./ MeetingLottery --out ./dist/MeetingLottery-release --platform=win32 --arch=x64 --overwrite --icon=./images/app.ico



```

> 打包后如何使用

- 配置文件在打包的目录 lucky-lottery-win32-x64\resources\app\config.js
- 用户文件在打包的目录 lucky-lottery-win32-x64\resources\app\data\users.txt
- 运行 lucky-lottery-win32-x64\lucky-lottory.exe

> 关于配置数据

- 在data/users.txt,添加用户的名称，每行一个名称
- 修改配置文件 config.js 文件有备注
- 背景图片路径 images
- 退出 ctrl+q 
- 打开调试窗口 ctrl+i
- 打开音乐/关闭音乐，alt+v 由于新版浏览器用户体验策略调整，不允许自动播放音乐，所有打开之后没有自动播放，需要手动执行 alt+v
- 选择下一轮奖项：alt+n  启动软件之后第一个要执行的命令
- 开始本轮抽奖：alt+s
- 停止本轮抽奖[选出结果]：alt+c （此快捷键可能跟 翻译软件比如：金山快译冲突，建议关闭翻译软件）
- 手动截屏：alt+x  （可以考虑存储图片结果，本软件对每轮的结果自动截屏保存）
- 自由定制

> 结果保存

抽奖结果自动截图，默认保存在 d:/lottery/
可以在配置文件中修改，设置其他路径
还可以查看日子文件 log/log.txt

> 编辑配置 config.js

```javascript
 {
     //默认字体颜色
    fontColor: '#fdd312',
    //背景图片
    background:'images/bg-1.png',

    title: '公司年会',
    titleFontSize: '32px',
    titleColor:'#fdd312',

    subTitle: '幸运大抽奖',
    subTitleFontSize: '50px',
    subTitleColor:'#fdd312',
    
    rewardTitleFontSize:'32px',
    rewardTitleColor:'#fdd312',
    rewardAreaTop: "0", //10%
    rewardWelcomeMessage: "激动人心的时刻即将开始！",

    onceEndMessage:"本轮抽奖结束，更多精彩在下一轮！",
    allEndMessage:"抽奖全部结束，新年快，恭喜发财!",

    //抽奖滚动时长 单位秒，自动停止,0表示只能手动停止
    //本系统手动停止始终存在
    rollingTime:0, 

    resultPath:'d:/lottery/', //结果截图保存路径
    tasks:[
        //一个任务可以添加多抽奖活动，
        //每个抽奖活动消费一定数量的人员，
        //消费的人员不出现在后面的活动中
        //每个任务使用 users.txt中的名单
        {
            title:'开心百分百',
            except:['胡歌','张铭恩'], //排除users.txt中的名单
            rewards:[
                {
                    title:'四等奖',  //奖项名称
                    count:70,     //奖项数量
                    capacity:35,//一次抽取数量[1，count]
                    namesOfLine:6,  //获奖区每行显示几个名字 [1,2,3,4,6,12]
                    nameFontSize: 24 //px
                },
                {
                    title:'三等奖', //奖项名称
                    count:10,     //奖项数量
                    capacity:5,//一次抽取数量[1，count]
                    namesOfLine:3,  //获奖区每行显示几个名字 [1,2,3,4,6,12]
                    nameFontSize: 32 //px
                },
                {
                    title:'二等奖',  //奖项名称
                    count:5,//奖项数量
                    capacity:5,//一次抽取数量[1，count]
                    namesOfLine:3,  //获奖区每行显示几个名字 [1,2,3,4,6,12]
                    nameFontSize: 32 //px
                },
                {
                    title:'一等奖', //奖项名称
                    count:5,     //奖项数量
                    capacity:5,//一次抽取数量[1，count]
                    namesOfLine:3,  //获奖区每行显示几个名字 [1,2,3,4,6,12]
                    nameFontSize: 32 //px
                }
            ]
        },
        {
            title:'幸运百分百',
            except:['胡歌','李易峰'], //排除users.txt中的名单
            rewards:[
                {
                    title:'幸运奖', //奖项名称
                    count:1,     //奖项数量
                    capacity:1,  //一次抽取数量[1，count]
                    namesOfLine:1,  //获奖区每行显示几个名字 [1,2,3,4,6,12]
                    nameFontSize: 64 //px
                }
            ]
        }
    ]

}
```

非常感谢，祝您中大奖




MIT License

Copyright (c) 2019

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# MeetingLottery

# MeetingLottery
# MeetingLottery
