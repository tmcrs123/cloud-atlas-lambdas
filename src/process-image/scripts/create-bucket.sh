LAMBDA_NAME="snappin-process-image"
DUMP_BUCKET_NAME="snappin-dump"
OPTIMIZED_BUCKET_NAME="snappin-optimized"

# Create s3 dump bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://$DUMP_BUCKET_NAME

# Create s3 optimized bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://$OPTIMIZED_BUCKET_NAME