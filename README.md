# 健康智脑

## [文档(engligh)🇺🇸](https://markdown.com.cn)
## [文档(中文)🇨🇳](https://www.reactnative.cn/docs/0.68/environment-setup)

### 注意：此版基于RN0.6x版本开发，安卓环境需要JDK1.8版本

### 安装
- npm install --force

### 运行
- 根目录下运行npx react-native run-android
- 或者 使用Android Studio打开./android文件夹
### 开发
- app安装完毕后在根目录执行npm start
- 真机开发使其与pc在同一网络下，摇晃手机选择change bundle location输入pc的IP地址(xxx.xxx.xxx.xxx:8081)点击确定即可

### 打包
- 替换./android/app下的keystore密钥文件为自己的密钥
- 在./android目录下执行 ./gradlew assembleRelease 命令
- 生成的apk文件目录为./android/app/build/outputs/apk/