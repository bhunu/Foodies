# iam.tf
# This file references the IAM roles you created manually in Phase 2

# Reference existing EC2 role (created manually via AWS Console)
data "aws_iam_role" "ec2" {
  name = "FoodieEC2Role"
}

# Reference existing CodeDeploy role (created manually via AWS Console)
data "aws_iam_role" "codedeploy" {
  name = "FoodieCodeDeployRole"
}

# Create Instance Profile (wrapper for the EC2 role)
# This is what actually gets attached to EC2 instances
resource "aws_iam_instance_profile" "app" {
  name = "${var.project_name}-instance-profile"
  role = data.aws_iam_role.ec2.name

  tags = {
    Name        = "${var.project_name}-instance-profile"
    Environment = var.environment
  }
}