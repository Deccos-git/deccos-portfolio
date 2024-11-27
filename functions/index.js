const functions = require("firebase-functions");
const admin = require('firebase-admin');
const pkg = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const metaPortfolio = require('./synchronisations/metaPortfolio')
const outputPortfolio = require('./synchronisations/outputPortfolio')
const effectPortfolio = require('./synchronisations/effectPortfolio')
const syncStatusUpdate = require('./synchronisations/syncStatusUpdate')
const projectOutputUpdate = require('./synchronisations/projectOutputUpdate')
const projectEffectUpdate = require('./synchronisations/projectEffectUpdate')
const indicatorsPortfolio = require('./synchronisations/indicatorsPortfolio')
const cors = require('cors')({
  origin: [
    'https://www.deccos.nl',
    'https://portfolio.deccos.nl',
    'http://localhost:5002',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://dashboard.stripe.com/',
  ]
});

// Firebase settings
const { credential } = pkg;

const adminConfig = {
  credential: credential.cert(serviceAccount),
};

admin.initializeApp(adminConfig);

const firestore = admin.firestore();

// Portfolio data 
exports.portfolioMeta = functions.https.onCall( async (data, context) => {

  const portfolio = await metaPortfolio(data, firestore)

  return portfolio

})

// Portfolio output 
exports.portfolioOutput = functions.https.onCall( async (data, context) => {

  const output = await outputPortfolio(data, firestore)

  return output

})

// Portfolio effect
exports.portfolioEffect = functions.https.onCall( async (data, context) => {

  const effect = await effectPortfolio(data, firestore)

  return effect

})

// Portfolio indicators
exports.portfolioIndicators = functions.https.onCall( async (data, context) => {

  const indicators = await indicatorsPortfolio(data, firestore)

  return indicators

})

// Update sync status
exports.updateSyncStatus = functions.https.onCall( async (data, context) => {

  const updateStatus = syncStatusUpdate(data, firestore)

  return updateStatus

})

// Update project output in sync
exports.updateProjectOutput = functions.https.onCall( async (data, context) => {

  const updateOutput = projectOutputUpdate(data, firestore)

  return updateOutput

})

// Update project effect in sync
exports.updateProjectEffect = functions.https.onCall( async (data, context) => {

  const updateEffect = projectEffectUpdate(data, firestore)

  return updateEffect

})


