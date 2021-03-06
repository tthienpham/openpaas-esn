'use strict';

module.exports = function() {

  var mailInBrowser = typeof process.env.MAIL_BROWSER === 'undefined',
    noreply = process.env.MAIL_NO_REPLY || 'noreply@open-paas.org',
    smtpHost = process.env.SMTP_HOST || 'localhost',
    smtpPort = +process.env.SMTP_PORT || 25;

  return mailInBrowser ? _inBrowserConfig() : _smtpConfig();

  function _inBrowserConfig() {
    return {
      mail: {
        noreply: noreply
      },
      transport: {
        module: 'nodemailer-browser',
          type: 'MailBrowser',
          config: {
          dir: '/tmp',
            browser: true
        }
      }
    };
  }

  function _smtpConfig() {
    return {
      mail: {
        noreply: noreply
      },
      transport: {
        name: 'SMTP',
        config: {
          host: smtpHost,
          port: smtpPort,
          secure: false,
          ignoreTLS: true
        }
      }
    };
  }

};
