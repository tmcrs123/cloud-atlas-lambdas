aws --endpoint-url=http://localhost:4566 sns publish \
    --topic-arn arn:aws:sns:us-east-1:000000000000:my-topic \
    --message "Hello from Dockerized LocalStack!"
