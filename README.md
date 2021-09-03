# WOLF.JS API Documentation

**Alpha Status**: This project is currently in development, and therefor may change rapidly over the course of development. Please continually watch this page for updates that may impact you!

## Sample

There are two major ways to consume WOLF.JS, as a `Client` or as a `Bot`. Please read the respective sections to decide which type you will need.

### `Client`

A `Client` provides the bare necessities to interact with WOLF. It provides some things such as caching, events, and I/O for packets. In order to get started with this project type, you will need to create the following files, with their respective content.

`index.js`

```js
const { Client } = require("wolf.js");

// Async Init Function
let init = async () => {
  let client = new Client();

  // Connection Events
  client.On.IO.Connected = () => console.log("Connected");
  client.On.IO.Disconnected = () => console.log("Disconnected");
  client.On.IO.Reconnected = () => console.log("Reconnected");

  // Authentication Events
  client.On.Security.LoginSuccess = (user) => console.log("Login Success");
  client.On.Security.LoginFailed = () => console.log("Login Failed");

  // I/O Based Events
  client.On.Message.Received = (message) => console.log("Message Recieved");

  // Login
  await client.Login("email", "password");
};

init();
```
