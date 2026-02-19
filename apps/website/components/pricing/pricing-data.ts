export type FeatureValue = true | false | string;

export interface FeatureRow {
	category: string;
	feature: string;
	hobby: FeatureValue;
	startup: FeatureValue;
	enterprise: FeatureValue;
}

export const pricingFeatures: FeatureRow[] = [
	// Application and Compose Deployment
	{ category: "Application and Compose Deployment", feature: "Application Deployment", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Multiple Build Types", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Docker Compose Support (Stack & Compose)", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Git Integration", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Docker Registry Support", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Auto Deploy via Webhooks", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Preview Deployments", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "One-Click Templates", hobby: true, startup: true, enterprise: true },
	{ category: "Application and Compose Deployment", feature: "Watch Paths", hobby: true, startup: true, enterprise: true },
	// Database Management
	{ category: "Database Management", feature: "Supported Databases", hobby: true, startup: true, enterprise: true },
	{ category: "Database Management", feature: "Database Management", hobby: true, startup: true, enterprise: true },
	{ category: "Database Management", feature: "Terminal Access", hobby: true, startup: true, enterprise: true },
	{ category: "Database Management", feature: "Database Backups", hobby: "1 backup per database", startup: "Unlimited Backups", enterprise: "Unlimited Backups" },
	{ category: "Database Management", feature: "Backup Logs", hobby: true, startup: true, enterprise: true },
	{ category: "Database Management", feature: "Custom Docker Images", hobby: true, startup: true, enterprise: true },
	{ category: "Database Management", feature: "Resource Limits", hobby: true, startup: true, enterprise: true },
	// Infrastructure and Scaling
	{ category: "Infrastructure and Scaling", feature: "Multi-Server Support", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Docker Swarm Clusters", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Build Server Support", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Traefik Integration", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Custom Domain Management", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Auto SSL/TLS", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Zero Downtime Deployments", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Registry-based Rollbacks", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Resource Limits", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Volume Management", hobby: true, startup: true, enterprise: true },
	{ category: "Infrastructure and Scaling", feature: "Volume Backups", hobby: "1 backup per volume", startup: "Unlimited Backups", enterprise: "Unlimited Backups" },
	// Monitoring and Logging
	{ category: "Monitoring and Logging", feature: "Real-time Monitoring", hobby: true, startup: true, enterprise: true },
	{ category: "Monitoring and Logging", feature: "Application Logs", hobby: true, startup: true, enterprise: true },
	{ category: "Monitoring and Logging", feature: "Deployment Logs", hobby: true, startup: true, enterprise: true },
	{ category: "Monitoring and Logging", feature: "Deployment History", hobby: true, startup: true, enterprise: true },
	{ category: "Monitoring and Logging", feature: "Queue Management", hobby: true, startup: true, enterprise: true },
	// Automation and Scheduling
	{ category: "Automation and Scheduling", feature: "Scheduled Jobs", hobby: "1 job per server or container", startup: "Unlimited Jobs", enterprise: "Unlimited Jobs" },
	{ category: "Automation and Scheduling", feature: "Docker Cleanup Jobs", hobby: true, startup: true, enterprise: true },
	{ category: "Automation and Scheduling", feature: "Custom Scripts", hobby: true, startup: true, enterprise: true },
	{ category: "Automation and Scheduling", feature: "CI/CD Integration", hobby: true, startup: true, enterprise: true },
	{ category: "Automation and Scheduling", feature: "Run Commands", hobby: true, startup: true, enterprise: true },
	// Notifications and Alerts
	{ category: "Notifications and Alerts", feature: "Slack Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Discord Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Telegram Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Email Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Webhook Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Lark Notifications", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Gotify Integration", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Ntfy Integration", hobby: true, startup: true, enterprise: true },
	{ category: "Notifications and Alerts", feature: "Event Triggers", hobby: true, startup: true, enterprise: true },
	// Security
	{ category: "Security", feature: "Two-Factor Authentication", hobby: true, startup: true, enterprise: true },
	{ category: "Security", feature: "API Key Authentication", hobby: true, startup: true, enterprise: true },
	{ category: "Security", feature: "SSH Key Management", hobby: true, startup: true, enterprise: true },
	{ category: "Security", feature: "Certificate Management", hobby: true, startup: true, enterprise: true },
	{ category: "Security", feature: "Security Audits", hobby: true, startup: true, enterprise: true },
	{ category: "Security", feature: "UFW Firewall Guidance", hobby: true, startup: true, enterprise: true },
	// User and Organization Management
	{ category: "User and Organization Management", feature: "User Management", hobby: "1 user", startup: "Unlimited", enterprise: "Unlimited" },
	{ category: "User and Organization Management", feature: "Organizations", hobby: "1 Organizations", startup: "3 Organizations", enterprise: "10+ Organizations" },
	{ category: "User and Organization Management", feature: "Projects", hobby: true, startup: true, enterprise: true },
	{ category: "User and Organization Management", feature: "Environment", hobby: "2 Environments", startup: "Unlimited", enterprise: "Unlimited" },
	{ category: "User and Organization Management", feature: "Role-based Permissions", hobby: "NA", startup: "Admin, Developer", enterprise: "Admin, Developer" },
	{ category: "User and Organization Management", feature: "Social Login", hobby: "Google, Github, Gitlab", startup: "Google, Github, Gitlab", enterprise: "SSO (Okta, Azure, and more)" },
	// Developer Tools
	{ category: "Developer Tools", feature: "REST API", hobby: true, startup: true, enterprise: true },
	{ category: "Developer Tools", feature: "CLI Tool", hobby: true, startup: true, enterprise: true },
	{ category: "Developer Tools", feature: "Environment Variables", hobby: true, startup: true, enterprise: true },
	{ category: "Developer Tools", feature: "Container Terminal", hobby: true, startup: true, enterprise: true },
	{ category: "Developer Tools", feature: "Keyboard Shortcuts", hobby: true, startup: true, enterprise: true },
	{ category: "Developer Tools", feature: "Swagger Documentation", hobby: true, startup: true, enterprise: true },
	// Advanced Configuration
	{ category: "Advanced Configuration", feature: "Swarm Settings", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Health Checks", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Network Configuration", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Container Labels", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Traefik File Editor", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Port Configuration", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Security Headers", hobby: true, startup: true, enterprise: true },
	{ category: "Advanced Configuration", feature: "Redirects", hobby: true, startup: true, enterprise: true },
	// Support and Services
	{ category: "Support and Services", feature: "Community Support", hobby: true, startup: true, enterprise: true },
	{ category: "Support and Services", feature: "Email and Chat Support", hobby: false, startup: true, enterprise: true },
	{ category: "Support and Services", feature: "Phone & Video Support", hobby: false, startup: false, enterprise: true },
	{ category: "Support and Services", feature: "SLA", hobby: "Online T&C's", startup: "Online T&C's", enterprise: true },
	{ category: "Support and Services", feature: "MSA", hobby: "Online T&C's", startup: "Online T&C's", enterprise: true },
];
