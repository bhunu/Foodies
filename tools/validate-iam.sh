#!/bin/bash
# Save as: tools/validate-iam.sh

set -e

PROFILE="default"
REGION="af-south-1"
ACCOUNT_ID="703671925719"
GITHUB_REPO="bhunu/Foodies"

echo "🔍 Validating IAM configuration for FoodieFinder..."
echo ""
echo "Account ID: $ACCOUNT_ID"
echo "GitHub Repo: $GITHUB_REPO"
echo "Region: $REGION"
echo ""

# Check Role 1: FoodieEC2Role
echo "Checking FoodieEC2Role..."
if aws iam get-role --role-name FoodieEC2Role --profile $PROFILE &>/dev/null; then
    echo "  ✓ Role exists"
    
    POLICIES=$(aws iam list-attached-role-policies --role-name FoodieEC2Role --profile $PROFILE --query 'AttachedPolicies[].PolicyName' --output text)
    
    if echo "$POLICIES" | grep -q "AmazonEC2RoleforAWSCodeDeploy"; then
        echo "  ✓ AmazonEC2RoleforAWSCodeDeploy attached"
    else
        echo "  ✗ Missing AmazonEC2RoleforAWSCodeDeploy"
    fi
    
    if echo "$POLICIES" | grep -q "AmazonSSMManagedInstanceCore"; then
        echo "  ✓ AmazonSSMManagedInstanceCore attached"
    else
        echo "  ✗ Missing AmazonSSMManagedInstanceCore"
    fi
else
    echo "  ✗ Role does not exist - CREATE IT"
fi
echo ""

# Check Role 2: FoodieCodeDeployRole
echo "Checking FoodieCodeDeployRole..."
if aws iam get-role --role-name FoodieCodeDeployRole --profile $PROFILE &>/dev/null; then
    echo "  ✓ Role exists"
    
    POLICIES=$(aws iam list-attached-role-policies --role-name FoodieCodeDeployRole --profile $PROFILE --query 'AttachedPolicies[].PolicyName' --output text)
    
    if echo "$POLICIES" | grep -q "AWSCodeDeployRole"; then
        echo "  ✓ AWSCodeDeployRole attached"
    else
        echo "  ✗ Missing AWSCodeDeployRole"
    fi
else
    echo "  ✗ Role does not exist - CREATE IT"
fi
echo ""

# Check OIDC Provider
echo "Checking GitHub OIDC Provider..."
if aws iam list-open-id-connect-providers --profile $PROFILE --output text | grep -q "token.actions.githubusercontent.com"; then
    echo "  ✓ OIDC provider exists"
else
    echo "  ✗ OIDC provider missing - CREATE IT"
fi
echo ""

# Check Role 3: FoodieGitHubDeployRole
echo "Checking FoodieGitHubDeployRole..."
if aws iam get-role --role-name FoodieGitHubDeployRole --profile $PROFILE &>/dev/null; then
    echo "  ✓ Role exists"
    
    TRUST_POLICY=$(aws iam get-role --role-name FoodieGitHubDeployRole --profile $PROFILE --query 'Role.AssumeRolePolicyDocument' --output json)
    
    if echo "$TRUST_POLICY" | grep -q "repo:$GITHUB_REPO"; then
        echo "  ✓ Trust policy configured for repo: $GITHUB_REPO"
    else
        echo "  ✗ Trust policy NOT configured correctly"
        echo "    Expected: repo:$GITHUB_REPO:*"
    fi
    
    INLINE_POLICIES=$(aws iam list-role-policies --role-name FoodieGitHubDeployRole --profile $PROFILE --query 'PolicyNames' --output text)
    
    if [ -n "$INLINE_POLICIES" ]; then
        echo "  ✓ Inline policy exists: $INLINE_POLICIES"
    else
        echo "  ✗ No inline policy - ADD GitHubDeployPermissions"
    fi
else
    echo "  ✗ Role does not exist - CREATE IT"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [ "$(aws iam get-role --role-name FoodieEC2Role --profile $PROFILE 2>/dev/null)" ] && \
   [ "$(aws iam get-role --role-name FoodieCodeDeployRole --profile $PROFILE 2>/dev/null)" ] && \
   [ "$(aws iam get-role --role-name FoodieGitHubDeployRole --profile $PROFILE 2>/dev/null)" ]; then
    echo "✅ All IAM roles exist! Run detailed checks above."
    echo ""
    echo "Next step: Phase 3 - Network & Compute"
else
    echo "⚠️  Some roles missing. Create them before proceeding."
fi