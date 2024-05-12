NOTES APP 

To run the app on localserver, follow these steps:

1. Copy the GitHub Repository URL.

```bash
https://github.com/Arijeet10/notesapp.git
```

2. Go to the directory on your local server and open terminal.

3. Type git clone and paste the url you copied earlier.

```bash
git clone https://github.com/Arijeet10/notesapp.git
```

4. Press Enter to clone the repository in your local folder.

5. Then, open the cloned repository from terminal using cd command.

6. Now, go to the client folder and install the necessary node packages by the following command.

```bash
npm install
# or
yarn
```

7. Repeat the same for server folder too.

8. Next, create a environment variable file (.env) on the root of client folder where package.json file is present. Fill the variables accordingly.

```bash
VITE_API_URL=
```

8. Also, create environment variable file in the root of server folder too with the following variables.

```bash
DB=
TOKEN_SECRET=
EMAIL=
EMAIL_PASS=
PORT=8080
```

9. Now go to the server folder and enter the following command to run the server.

```bash
npm run start
```

10. Finally, go to the client folder and enter the following command to run the client side of app on your local server.

```bash
npm run dev
# or
yarn dev
```

11. Lastly, go to the localhost url shown in the terminal on your web browser to use the app.


