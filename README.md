# angify-app
This repository is exclusively reserved for Blacksmith's front test, carried out with a purely pedagogical aim.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
This project is based on `Angular.js` framework.

Make sure that `Node.js` is installed on your local machine. Binaries, installers, and source tarballs are available at <https://nodejs.org/en/download/>. 

### Installation
Clone this repository into a folder of your choice:
```bash
$ git clone https://github.com/kvinchon/angify-app.git && cd angify-app/
```

To load dependencies, run the following command: 
```bash
$ npm install
```

#### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to your Spotify for Developers Dashboard and create your application. 

Once you have created your app, replace the clientId and clientSecret in `src/app/services/spotify.service.ts` with the ones you get from My Applications.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Authors
* **Kevin Vinchon** - *Initial work* - [kvinchon](https://github.com/kvinchon)
