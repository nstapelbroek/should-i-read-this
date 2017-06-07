# Should I read this
Ever wanted to know the topics of an article that has a clickbait title? Ever wondered if those links in a slack channel are meant specifically for you?
Should I read this is a small service that analyzes links and returns topics using the [TextRazor API](https://www.textrazor.com/). 

## Getting started with local development
We assume you have:
- Yarn, Docker and docker-compose installed
- A TextRazor API key
- A Slack channel you can develop on

Once you have these requirements in place, follow these steps to get the environment working:
1. insert your TextRazor API key in the docker-compse.yml file as a envinroment variable for the application
2. run `docker-compse up`
3. navigate to http://localhost:8888 to view the ngrok status, use the given *.ngrok.io URL on this page to develop your application
4. configure this ngrok url as your Slack APP url at https://api.slack.com/apps
5. Make sure your configure your "Event Subscriptions" in the Slack application. Currently, the should I read this application requires at least [link_shared](https://api.slack.com/events/link_shared) and [message.channels](https://api.slack.com/events/message.channels)


## Deployment
The most straight forward method would be to deploy the code on a server and run `yarn install && yarn start`. A better way would be to use a process manager like pm2, supervisord or forever. The best way currently is to ship a container and configure auto-restart. 
```
docker run -d -p 8080:3000 -e RAZOR_API_KEY=YOURRAZORAPIKEY --restart on-failure nstapelbroek/should-i-read-this:latest
```

### Shipping your own changes
You can use the `make build` to create an image and push it to docker hub. Use an environment variable to overwrite the registyrname like so:
```
make build REGISTRYNAME=myawesomeregistry.com/username/should-i-read-this
```
Later on, you can pull the image from your custom registry and host it just like the "Deployment" describes.