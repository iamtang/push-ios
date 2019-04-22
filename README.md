# push-ios

> IOS推送Node服务

根据IOS提供的推送服务实现的 Node 版SDK。支持IOS通知栏推送功能，欢迎大家使用。

[华为推送](https://www.npmjs.com/package/push-huawei)

[小米推送](https://www.npmjs.com/package/push-xiaomi)

[魅族推送](https://www.npmjs.com/package/push-meizu)

[友盟推送](https://www.npmjs.com/package/push-umeng)

## 安装
```
npm install push-ios --save-dev
```

## 实例
```javascript
const ios = new IOS({
  cert: 'cert.pem',
  key: 'key.pem',
  passphrase: 'psw', // pem证书密码
  production: true,  // 是否生产环境
  topic: 'Topic Number'
});

ios.push({
  title: 'title',
  content: 'content',
  list: ['Token'],
  success(res) {
    // ...
  },
  error(err) {
  // ...
  }
});
```

## 参数

| Setter Name | Target Property | Type |
|:----|:----|:----|
|alert|aps.alert|String orObject|
|body|aps.alert.body|String|
|locKey|aps.alert.loc-key|String|
|locArgs|aps.alert.loc-args|Array|
|title|aps.alert.title|String|
|titleLocKey|aps.alert.title-loc-key|String|
|titleLocArgs|aps.alert.title-loc-args|Array|
|action|aps.alert.action|String|
|actionLocKey|aps.alert.action-loc-key|String|
|launchImage|aps.launch-image|String|
|badge|aps.badge|Number|
|sound|aps.sound|String|
|contentAvailable|aps.content-available|1|
|mutableContent|aps.mutable-content|1|
|urlArgs|aps.url-args|Array|
|category|aps.category|String|
|threadId|aps.thread-id|String|
|mdm|mdm|String|


[魅族官方文档](http://open.res.flyme.cn/fileserver/upload/file/201803/be1f71eac562497f92b42c750196a062.pdf)