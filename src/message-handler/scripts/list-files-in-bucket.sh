# list
aws --endpoint-url=http://localhost:4566 s3 ls s3://snappin-optimized --recursive


# copy
aws --endpoint-url=http://localhost:4566 s3 cp s3://snappin-optimized/test_image.jpg ../test_image_processed.jpeg


# delete
aws --endpoint-url=http://localhost:4566 s3 rm s3://snappin-optimized/test_image.jpg

