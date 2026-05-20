// The AWS region where the resources will be created. You can change this to any region that supports the services you need. The default is set to "af-south-1" (Cape Town) for cost-effectiveness, but you can choose a different region if you prefer.
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "af-south-1"
}
// The AWS CLI profile to use for authentication.
variable "aws_profile" {
  description = "AWS CLI profile to use"
  type        = string
  default     = "default"
}
// The min_size is the minimum number of instances that the ASG will maintain. You can set it to a value between 0 and desired_capacity. The default is set to 1 to ensure that there is always at least one instance running.
variable "min_size" {
  description = "Minimum number of instances in ASG"
  type        = number
  default     = 1
}
// The desired capacity is the number of instances that the ASG will try to maintain. You can set it to a value between min_size and max_size. The default is set to 2 for a balance between cost and availability.
variable "desired_capacity" {
  description = "Desired number of instances in ASG"
  type        = number
  default     = 2
}
// You can adjust these values based on your needs and budget. The defaults are set to be cost-effective while still providing a functional environment for testing and development.
variable "max_size" {
  description = "Maximum number of instances in ASG"
  type        = number
  default     = 5
}

// The project name is used as a prefix for naming resources. You can change this to any name you like, but it should be unique to avoid naming conflicts with other resources in your AWS account. The default is set to "foodies" for this project.

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "foodies"
}
// The environment variable is used to differentiate between different stages of your application (e.g., dev, staging, prod). You can set this to any value that makes sense for your workflow. The default is set to "dev" for development purposes
variable "environment" {
  description = "The environment for the resources (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}
variable "instance_type" {
  description = "EC2 instance type for ASG launch template"
  type        = string
  default     = "t3.micro"
}