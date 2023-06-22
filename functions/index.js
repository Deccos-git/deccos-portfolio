const {onRequest, onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
const pkg = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const package = require('./package/package');
const cors = require('cors')({
    origin: [
      'https://www.deccos.co',
      'http://localhost:5002',
      'http://localhost:3000',
      'http://localhost:3001'
    ]
  });

// Firebase settings
const { credential } = pkg;

const adminConfig = {
  credential: credential.cert(serviceAccount),
};

admin.initializeApp(adminConfig);

const firestore = admin.firestore();

exports.sendPackages = onRequest((req, res) => {
    cors(req, res, async () => {
        logger.info("Hello logs!", {structuredData: true});
        const packages = await package(req, firestore);

        res.status(200).send(packages);
    })
})

exports.testApi = onCall( async (data, context) => { 
        const packages = await testpackage(data, firestore);
    
        return packages 
   });
