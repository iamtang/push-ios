const apn = require('apn');
const _ = require('lodash');

class IOS {
  constructor(options = {}) {
    options.maxLength = options.maxLength || 100;
    this.options = options;

    if (!options.cert) throw new Error('IOS Cert 不能为空');
    if (!options.key) throw new Error('IOS Key 不能为空');
    if (!options.topic) throw new Error('IOS Topic 不能为空');
  }

  async sleep(time) {
    return new Promise((reslove) => {
      setTimeout(() => {
        reslove({});
      }, time);
    })
  }

  async push(data) {
    let provider = new apn.Provider(this.options);
    let n = 0;
    let success_total = 0;
    let fail_total = 0;

    const pushIds = _.chunk(data.list, this.options.maxLength);

    for (const i in pushIds) {
      data.list = pushIds[i];
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

      data.success = data.success || function () { };
      data.fail = data.fail || function () { };
      data.finish = data.finish || function () { };

      const notification = new apn.Notification(opt);

      const res = await new Promise((reslove) => {
        provider.send(notification, pushIds[i]).then(res => {
          if (res.sent && [...res.sent].length) {
            success_total += [...res.sent].length;
          }

          if (res.failed && [...res.failed].length) {
            fail_total += [...res.failed].length;
          }
          reslove(res)
        }).catch((err) => {
          reslove(err);
        });
      })
      n++;
      data.success(res);


      if (n == pushIds.length) {
        data.finish({
          status: 'success',
          maxLength: this.options.maxLength,
          group: pushIds.length,
          success_total,
          fail_total
        });
      }
    }
  }
}

module.exports = IOS;