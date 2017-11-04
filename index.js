
var request = require('request'),
    _ = require('mix-utils');

var register = function (server, options, next) {
    options = Object.assign({}, {
        token: '',
        excludes: [
            /upload\/.*?/ig,
            /^.+\.(?:css|cur|js|jpe?g|gif|htc|ico|png|json|xml|otf|ttf|eot|tif|woff|svg|txt|mp3|mp4|ppt|mpg|rss|zip|rar|doc|docx|wmv|avi|wav|mov|m4v|flv|psd|ai|xls|torrent|dat|iso|dmg).*?/ig
        ]
    }, options || {});

    server.ext('onRequest', function (req, reply) {

        var ua = req.headers['user-agent'];

        if (req.method.toLowerCase() === 'get' && req.info.hostname.toLowerCase() != 'localhost' && _.isCrawl(ua)) {

            var b = options.excludes.some(function (regex) {
                return regex.test(req.url.pathname);
            });

            if (!b) {

                var url = `${req.headers['x-forwarded-proto'] || req.connection.info.protocol}://${req.info.host}${req.url.path}`;
                var lnk = "https://api.krawl.org/?ajax=1&url=" + url;
                request({
                    method: 'GET',
                    uri: lnk,
                    headers: {
                        'X-Krawl-Token': options.token,
                        'User-Agent': ua,
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Encoding': 'gzip'
                    },
                }, function (error, response, body) {
                    if (error) {
                        reply(error);
                    }

                    reply(body);
                });

            } else {
                reply.continue();
            }

        } else {
            reply.continue();
        }


    });

    next();

};

register.attributes = { pkg: require('./package.json') };

exports.register = register;