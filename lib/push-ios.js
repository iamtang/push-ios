const apn = require('apn');
const _ = require('lodash');

class IOS {
  constructor(options = {}) {
    options.maxLength = 1;
    this.options = options;

    if(!options.cert) throw new Error('IOS Cert 不能为空');
    if(!options.key) throw new Error('IOS Key 不能为空');
    if(!options.topic) throw new Error('IOS Topic 不能为空');
  }

  push(data) {
    let provider = new apn.Provider(this.options);

    const compiled = _.merge({
      aps: {
        alert: {
          title: data.title,
          body: data.content,
        },
        badge: 1,
        'mutable-content': 1
      }
    }, data);

    const opt = {
      topic: this.options.topic,
      expiry: Math.floor(Date.now() / 1000) + 86400,
      compiled: JSON.stringify(compiled)
    };

    const notification = new apn.Notification(opt);

    const pushIds = [];
    while (data.list.length > 0) {
      pushIds.push(data.list.splice(0, this.options.maxLength));
    }

    for (const i in pushIds) {
      provider.send(notification, pushIds[i]).then(data.success).catch(data.fail);
    }
  }
}

module.exports = IOS;