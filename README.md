# Interactive online mouses

## Summary

This project contains a ReactJS app that shows a little colored circle under the mouse of every user currently online. The app makes use of `socket.io` in order to update circles in real time. Ideally to be used over a private network.

## Functioning

coming soon...

## Install and Run

The steps to run the project in development mode are the following:

### Set Up


- In order to install dependencies, enter both the `client` and the `server` folder and run:

```bash
npm install
```

- Go to the client folder and create a `.env.local` file in where you can store the only environment variable needed, which is the host for the React app. It should be the same as your private IP address. An example of the content of this file:

```bash
REACT_APP_HOST=127.0.0.1
```

### Run it

- Go to the client and the server folder (in separate consoles) and run:

```bash
npm start
```

You should be able to open the following address `http://<your_private_ip_address>:3000/` in your browser and it'll work correctly. Have fun!