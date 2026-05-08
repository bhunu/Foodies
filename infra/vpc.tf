# Use default VPC (Free Tier friendly)
data "aws_vpc" "default" {
  default = true
}
//Get subnets in the default VPC.
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}
//Get availability zones in the region.
data "aws_availability_zones" "available" {
  state = "available"
}