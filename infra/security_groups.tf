// This file defines the security groups for the Application Load Balancer (ALB) and the EC2 instances. The ALB security group allows inbound traffic on HTTP (port 80) and HTTPS (port 443) from anywhere, while the EC2 security group allows inbound traffic on port 80 from the ALB security group. Both security groups allow all outbound traffic.
resource "aws_security_group" "alb" {
  name_prefix = "${var.project_name}-alb-"
  description = "Security group for Application Load Balancer"
  vpc_id      = data.aws_vpc.default.id
  
  ingress {
    description = "HTTP from internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  
}
}
// The app security group allows inbound traffic on port 3000 from the ALB security group, which is where the application instances will be listening for requests. This ensures that only traffic from the ALB can reach the application instances, providing an additional layer of security.
resource "aws_security_group" "app" {
  name_prefix = "${var.project_name}-app-"
  description = "Security group for application instances"
  vpc_id      = data.aws_vpc.default.id
// The ingress rule allows traffic on port 3000 from the ALB security group, which is where the application instances will be listening for requests. This ensures that only traffic from the ALB can reach the application instances, providing an additional layer of security.
  ingress {
    description     = "HTTP from ALB only"
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
}