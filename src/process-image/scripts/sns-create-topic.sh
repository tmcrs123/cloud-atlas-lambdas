#!/bin/bash

# Create SNS Topic
aws --endpoint-url=http://localhost:4566 sns create-topic --name snappin-topic
