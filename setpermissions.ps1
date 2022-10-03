$TenantID=""                                                                                                  
$GraphAppId = "00000003-0000-0000-c000-000000000000"                                                                                              
$DisplayNameOfMSI="demofunctions"                                                                                                                 
$PermissionName = "User.Read.All"                                                                                                                 
Connect-AzureAD -TenantId $TenantID                                                                                                               
$GraphServicePrincipal = Get-AzureADServicePrincipal -Filter "appId eq '$GraphAppId'"                                                             
$AppRole = $GraphServicePrincipal.AppRoles | Where-Object {$_.Value -eq $PermissionName -and $_.AllowedMemberTypes -contains "Application"}       
$MSI = (Get-AzureADServicePrincipal -Filter "displayName eq '$DisplayNameOfMSI'")                                                                 
New-AzureAdServiceAppRoleAssignment -ObjectId $MSI.ObjectId -PrincipalId $MSI.ObjectId -ResourceId $GraphServicePrincipal.ObjectId -Id $AppRole.Id