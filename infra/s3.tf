// S3 Bucket for CodeDeploy Artifacts
resource "aws_s3_bucket" "deployments" {
  bucket_prefix = "${var.project_name}-deploy-"
  
  tags = {
    Name        = "${var.project_name}-deployments"
    Environment = var.environment
  }
}
// Enable versioning on the S3 bucket to keep track of all versions of the deployment artifacts. This allows you to roll back to previous versions if needed and provides a history of changes.
resource "aws_s3_bucket_versioning" "deployments" {
  bucket = aws_s3_bucket.deployments.id
  
  versioning_configuration {
    status = "Enabled"
  }
}