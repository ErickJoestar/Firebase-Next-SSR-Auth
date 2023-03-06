# Firebase-Next-SSR-Auth

Application that demonstrates the usage of Firebase Authentication with Next.js and SSR. This project uses  [Firebase Web Frameworks](https://firebase.google.com/docs/hosting/frameworks-overview) to handle the SSR and the synchronization of the Firebase Authentication state between the client and the server.


## Local Development
Create a `.env` file in the root of the project copying the `.env.example` file and fill the variables with your Firebase project credentials.

Install the dependencies and run the project:

```bash
npm install
```

Enable the firebase frameworks in your firebase project:

```bash
firebase experiments:enable webframeworks
```

Run the project:

```bash
npm run dev
```


## Deployment 
This project is ready to be deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting/). You can deploy it using the Firebase CLI:

```bash
npm run deploy
```
