/**
* @name Site
* @summary Site Hydra Express service entry point
* @description
*/
const hydraExpress = require('hydra-express');
const HydraLogger = require('hydra-plugin-hls/hydra-express');
const hydraLogger = new HydraLogger();
hydraExpress.use(hydraLogger);

const config = require('./config.json');

const HTTP_MOVED_PERMANENTLY = 301;

/**
* @name redirectMiddleware
* @summary add middleware to redirect http requests to https
* @return {undefined}  -
*/
function redirectMiddleware() {
  let app = hydraExpress.getExpressApp();
  app.use((req, res, next) => {
    let config = hydraExpress.getRuntimeConfig();
    // console.log('req.headers', req.headers);
    // if (req.headers['x-forwarded-proto'] === 'http') {
    //   // console.log(`Redirecting to: https://${config.siteDomain}${req.url}`);
    //   res.writeHead(HTTP_MOVED_PERMANENTLY, {
    //     'Location': `https://${config.siteDomain}${req.url}`
    //   });
    //   res.end();
    //   return;
    // }
    next();
  });
}

/**
 * @name main
 * @description Load configuration file and initialize hydraExpress app
 * @return {undefined}
 */
let main = async () => {
  try {
    let serviceInfo = await hydraExpress.init(config, () => {
      hydraExpress.registerRoutes({
        '/v1/blaster': require('./routes/site-v1-routes')
      });
    }, redirectMiddleware);
    console.log('serviceInfo', serviceInfo);
  } catch (err) {
    console.log('err', err);
  }
};

main();
