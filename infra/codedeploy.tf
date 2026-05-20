# CodeDeploy Application
resource "aws_codedeploy_app" "app" {
  name             = var.project_name
  compute_platform = "Server"
}
// CodeDeploy Service Role
# CodeDeploy Deployment Group
resource "aws_codedeploy_deployment_group" "app" {
  app_name               = aws_codedeploy_app.app.name
  deployment_group_name  = "${var.project_name}-dg"
  service_role_arn       = data.aws_iam_role.codedeploy.arn
  deployment_config_name = "CodeDeployDefault.OneAtATime"
// The auto_rollback_configuration block enables automatic rollback of deployments if a failure occurs. In this case, it is configured to trigger a rollback if a "DEPLOYMENT_FAILURE" event is detected. This helps ensure that your application remains in a stable state even if a deployment does not succeed.
  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  autoscaling_groups = [aws_autoscaling_group.app.name]

  load_balancer_info {
    target_group_info {
      name = aws_lb_target_group.app.name
    }
  }
}