<h1 align="center">
  🥊MMA Fights Telegram Bot
</h1>
<h4 align="center"><a href="https://t.me/fightsScraper_bot">Message Bot :speech_balloon:</a></h4>
<p align="center">🤼‍ Integrates with the <a href="https://github.com/matheuspor/mma-fights-scraper-api">MMA Fights Scraper Api</a> to make API requests via chat commands</p>

<div align="center">  
  
  <a href="">![GitHub workflow status](https://img.shields.io/github/workflow/status/matheuspor/mma-fights-telegram-bot/Node.js%20Tests/main)</a>
  <a href="">![GitHub license](https://img.shields.io/github/license/matheuspor/mma-fights-telegram-bot)</a>
  <a href="">![Repo top language](https://img.shields.io/github/languages/top/matheuspor/mma-fights-telegram-bot)</a>  
  
</div>

  <p align="center">
    <a href="#usage">Usage</a> • 
    <a href="#run-locally">Run Locally</a> •
    <a href="#tech-used">Tech Used</a>
  </p>

## Usage
<p align="center">	
  <img src="./.docs/usage-example.gif">
</p>

## Run Locally
Get token from <a href="https://t.me/botfather">BotFather</a> and set a new .env file with your token using .sample.env file as reference. </br>

Run as a Docker container:
```bash
# Install docker-compose if not already: "https://docs.docker.com/compose/install/"

# Clone Repo
$ git clone https://github.com/matheuspor/mma-fights-telegram-bot

# Inside root directory run
$ docker-compose up --build
```

Local run:
```bash
# Clone Repo
$ git clone https://github.com/matheuspor/mma-fights-telegram-bot

# Install Dependencies
$ npm install

# Start app
$ npm start
```

## Tech Used

<ul>
  <li>Typescript</li>
  <li>NodeJS</li>
  <li><a href="https://www.npmjs.com/package/node-telegram-bot-api">Node Telegram Bot Api</a></li>
  <li>Docker</li>
  <li>Heroku</li>
</ul>
