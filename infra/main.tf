terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
// Configure the AWS provider with the specified region and profile. The region is set to "af-south-1" (Cape Town) by default for cost-effectiveness, but you can change it to any region that supports the services you need. The profile is set to "default" by default, but you can specify a different profile if you have multiple AWS CLI profiles configured.
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}