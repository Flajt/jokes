## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# .env
Create a .env file in the root directory and fill it with the following values:
- FIREBASE_STRING=<Firebase-admin-token>
- PROD=<false or true>
You may need to modify firebase config object in /src/lib/firebase.ts to be adjusted to your project.


## Diagram:
High level flow diagram:
[Click here](https://lucid.app/lucidchart/6c7bb976-4294-4bc5-b159-8ac869d21345/edit?viewport_loc=-144%2C10%2C2316%2C1167%2C9xsxWB7hr-h~&invitationId=inv_d5670158-dd8a-4306-b0eb-bcb000fc3fbd)<br>


## Notice
The code is a bit messy. However it should be enough to show authorization and authentication.
In theory one could use firebase in `onMount` to handle login and registration. However this always feels akward to do, this is why even the calls which could be done from the frontend, run in the backend.
