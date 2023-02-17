const fs = require('fs');
const path = require('path');

// prepares the cloud function to be deployed. This is an attempt to mimic the 
// functionality provided by firebase-tools with Web Frameworks.
// This is done this way because the firebase-tools can be unstable and this solves
// different issues and gives more control
// SEE: https://github.com/firebase/firebase-tools/blob/master/src/frameworks/index.ts
// ********************************************************************************

// create a symlink from the '.next' directory to the 'function' directory
// NOTE: this is done because the firebase-frameworks expects the '.next' directory
//       to be in the same directory as the 'function' directory
// ================================================================================
// the path to the '.next' directory from this project's directory
const relativeNextDir = '.next';

// the path to the 'function' directory from this project's directory
const relativeFunctionDir = 'function';

// --------------------------------------------------------------------------------
// establish absolute dirs for sanity
const rootDir = path.resolve(process.cwd());
const nextDir = path.resolve(rootDir, relativeNextDir);
const functionDir = path.resolve(rootDir, relativeFunctionDir);

const resultDir = path.resolve(functionDir, relativeNextDir);

// symlink the nextDir to the functionDir if it doesn't exist already
console.log('Setting up symlink dependency for .next');
if(!fs.existsSync(resultDir)) { /*dependency doesn't exist*/
  console.log(`Link: ${nextDir} => ${resultDir}`);
  fs.symlinkSync(nextDir, resultDir, 'dir');

  console.log('✅ .next symlink created.\n');
} else { /*dependency link already exists*/
  // validate if is a symlink folder
  const resultDirStats = fs.lstatSync(resultDir);
  // FIXME: Firebase is throwing these errors when deploying Cloud Functions but
  //        this shouldn't run at that time! Temporarily logging instead of throwing
  if(!resultDirStats.isSymbolicLink()) console.error('This directory is not a symlink folder. Remove manually and try again');

  console.log('✅ .next symlink configured correctly.\n');
}

// prepare the .env file
// these .env variables are expected to be in the function directory and are 
// used by the firebase-frameworks. This is the configuration that enables the usage
// of NextJs with Firebase client app
// ================================================================================
// SEE: https://github.com/firebase/firebase-tools/blob/d6826ee9e9c2dc5b8e320953aa794be7ba2fdcdb/src/frameworks/index.ts#L394
// is "firebase aware" 
const __FIREBASE_DEFAULTS__ = {
  config: {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    locationId: process.env.NEXT_PUBLIC_FUNCTION_REGION,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
  },
  _authTokenSyncURL: '/__session'
}

// use NextJs as the framework
// SEE:  https://github.com/FirebaseExtended/firebase-framework-tools/blob/main/src/index.ts
const __FIREBASE_FRAMEWORKS_ENTRY__ = 'next.js';

// writes the .env file
// ================================================================================
const envFile = path.resolve(functionDir, '.env');
const envFileContent = `__FIREBASE_DEFAULTS__=${JSON.stringify(__FIREBASE_DEFAULTS__)}
__FIREBASE_FRAMEWORKS_ENTRY__=${__FIREBASE_FRAMEWORKS_ENTRY__}\n
`;

// write the .env file
console.log('Writing .env file');
fs.writeFileSync(envFile, envFileContent);
console.log('✅ ', '.env file written.\n');