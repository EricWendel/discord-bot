# discord-bot

Goal: Learn how to make a discord bot along with other useful tools

# Environment variables

The .env is not included in the repository for security reasons. The following environment variable are necessary to be in a file named ".env" at the root level of the repository before executing code:

- TOKEN = the token for the discord bot
- PORT = the port to use for the docker image

# Run without docker

1. `npm install` (only for the first run)
2. `npm start`

# Run remote with docker

How to run the bot in a docker container and export it to a server that has docker:

1. Build the docker image using the command `docker compose up --build`
2. Run locally with docker using `docker run discord-bot`
3. To export to a file run the command `docker save -o [/dir/filename.tar] discord-bot`
4. Send the exported file to the remote server using `scp -i ~/.ssh/id_rsa.pub FILENAME USER@SERVER:/home/USER/FILENAME`
5. On the remote machine which will be hosting the bot with docker use the command `docker load -i [FILENAME.tar]`
6. Now the discord bot can be hosted on a remote server using `docker run discord-bot`

# Helpful links for reference

- [Starter tutorial](https://sabe.io/tutorials/how-to-build-discord-bot-typescript)
