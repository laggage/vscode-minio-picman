# vscode-minio-picman

一个minio图床插件, 通过快捷键, 在vscode中快速上传剪贴板或本地文件图片到自己的minio server

## 动图演示

![image](https://minio.mytechsky.top/blog/images/2021122523540483-2021-12-25%2023.49.24.gif)

## 使用说明

使用前需要在插件设置中配置好minio的服务器地址和访问密钥

![image](https://minio.mytechsky.top/blog/images/2021122523350071-20211225233458.png)

需要确保已配置的bucket name存在在minio中存在, 否则会上传失败

可以通过minio控制台创建bucket

![image](https://minio.mytechsky.top/blog/images/2021122523382683-20211225233825.png)

![image](https://minio.mytechsky.top/blog/images/2021122523372124-20211225233720.png)

## 主要功能

上传剪贴板图片到minio, 快捷键: `cmd/ctrl+shift+x`;
上传本地图片文件到minio, 快捷键: `cmd/ctrl+shift+z`;

也可以通过上下文菜单上相关的选项进行上传操作

![image](https://minio.mytechsky.top/blog/images/2021122523322162-20211225233220.png)


上传图片成功后若vscode当前没有处于活动状态的markdown编辑器打开, 会弹出一个上传成功对话框, 此对话框会显示出图片的地址; 通过此对话框也可以快速复制不同格式下的图片地址到剪贴板; 否则则会自动将图片自动插入到markdown编辑器中

![image](https://minio.mytechsky.top/blog/images/2021122523291370-20211225232913.png)

