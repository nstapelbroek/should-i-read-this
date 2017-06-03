.PHONY: build install

# Variables
PWD := $(dir $(MAKEPATH))
PROJECTNAME=nstapelbroek/should-i-read-this
REGISTRYNAME=nstapelbroek/should-i-read-this
TAGNAME=latest

install:
	yarn install

build:
	docker build --tag $(PROJECTNAME):$(TAGNAME) .
	docker tag $(PROJECTNAME):$(TAGNAME) $(REGISTRYNAME):$(TAGNAME)
	docker push $(REGISTRYNAME)
