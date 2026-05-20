// Outputs for the infrastructure components
output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.app.dns_name
}
// The zone_id output provides the hosted zone ID of the ALB, which is required for configuring Route 53 to route traffic to the ALB. You can use this value when creating a Route 53 record set to point your domain to the ALB.
output "alb_zone_id" {
  description = "Zone ID of the ALB"
  value       = aws_lb.app.zone_id
}
// The target_group_arn output provides the ARN of the target group associated with the ALB. This is useful for monitoring and debugging purposes, as well as for configuring other AWS services that need to reference the target group.
output "asg_name" {
  description = "Name of the Auto Scaling Group"
  value       = aws_autoscaling_group.app.name
}
// The deployment_bucket output provides the name of the S3 bucket that is used to store CodeDeploy artifacts. This bucket is where you will upload your application revisions (e.g., ZIP files containing your application code) for deployment. You can use this output to easily reference the bucket name when preparing your deployment packages.
output "deployment_bucket" {
  description = "S3 bucket for CodeDeploy artifacts"
  value       = aws_s3_bucket.deployments.id
}
// The deployment_group output provides the name of the CodeDeploy deployment group that is associated with your application. This is important for managing your deployments, as you will need to specify this deployment group when creating new deployments in CodeDeploy.
output "codedeploy_app_name" {
  description = "CodeDeploy application name"
  value       = aws_codedeploy_app.app.name
}
// The deployment_group output provides the name of the CodeDeploy deployment group that is associated with your application. This is important for managing your deployments, as you will need to specify this deployment group when creating new deployments in CodeDeploy.
output "codedeploy_deployment_group" {
  description = "CodeDeploy deployment group name"
  value       = aws_codedeploy_deployment_group.app.deployment_group_name
}