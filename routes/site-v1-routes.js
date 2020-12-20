/**
 * @name site-v1-api
 * @description This module packages the Site API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

const express = hydraExpress.getExpress();
const ServerResponse = hydra.getServerResponseHelper();

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);

let api = express.Router();

/**
* @name health
* @summary health check endpoint
* @param {object} req - express request object.
* @param {object} res - express response object
* @return {undefined}
*/
api.get('/health', (req, res) => {
  let healthInfo = hydra.getHealth();
  serverResponse.sendOk(res, {
    result: healthInfo
  });
});

module.exports = api;
