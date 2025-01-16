DUMP_BUCKET_NAME="snappin-dump"

aws --endpoint-url=http://localhost:4566 s3 cp ../test_image.jpg s3://$DUMP_BUCKET_NAME/
