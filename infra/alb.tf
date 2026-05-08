# alb.tf
# Application Load Balancer configuration
// This file defines the Application Load Balancer (ALB) and its associated resources, such as the target group and listener.
resource "aws_lb" "app" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnets.default.ids

  enable_deletion_protection = false

  tags = {
    Name        = "${var.project_name}-alb"
    Environment = var.environment
  }
}

// Target Group for the ALB
resource "aws_lb_target_group" "app" {
  name     = "${var.project_name}-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id
// Health check configuration for the target group
  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 15
    path                = "/health"
    protocol            = "HTTP"
    matcher             = "200"
  }
// Time (in seconds) to wait before deregistering a target after it has been marked unhealthy
  deregistration_delay = 30

  tags = {
    Name        = "${var.project_name}-tg"
    Environment = var.environment
  }
}

# ALB Listener
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}