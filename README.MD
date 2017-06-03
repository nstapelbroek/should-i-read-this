# Should i read this
Ever wanted to know the topics of an article that has a clickbait title? Ever wondered if those links in a slack channel are meant specifically for you?
Should i read this is a small service that analyzes links and returns topics using the [TextRazor API](https://www.textrazor.com/). 

## getting started
We assume you have:
- Yarn installed
- A textRazor API key
- A Slack channel you can develop on

## deployment
The most straight forward method would be to deploy the code on a server and run `yarn install && yarn start`. A better way would be to use a process manager like pm2, supervisord or forever. The best way currently is to ship a container and configure auto-restart. 
```
docker run --rm -p 8080:3000 -e RAZOR_API_KEY=YOURRAZORAPIKEY --restart on-failure nstapelbroek/should-i-read-this:latest
```

### containerize your own changes
You can use the `make build` to create an image and push it to docker hub. Use an environment variable to overwrite the registyrname like so:
```
make build REGISTRYNAME=myawesomeregistry.com/username/should-i-read-this
```