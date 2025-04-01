import React, { useState } from 'react';
import { Search, AlertCircle, X, CheckCircle } from 'lucide-react';

const DORK_QUERIES = {
    "Directory Listing": "site:{target} intitle:index.of",
    "Sensitive Files": "site:{target} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini",
    "SQL Errors": "site:{target} intext:\"sql syntax near\" | intext:\"syntax error has occurred\" | intext:\"incorrect syntax near\"",
    "WordPress": "site:{target} inurl:wp-content | inurl:wp-includes",
    "Log Files": "site:{target} ext:log",
    "Backup Files": "site:{target} ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup",
    "Login Pages": "site:{target} inurl:login | inurl:signin | intitle:Login | intitle:Signin | inurl:auth",
    "Find Subdomains": "site:*.{target} -www",
    "Find Exposed Email Addresses": "site:{target} intext:'@{target}'",
    "Detect Open FTP Servers": "site:{target} inurl:ftp://",
    "Database Files": "site:{target} ext:sql | ext:dbf | ext:mdb",
    "Apache Config Files": "site:{target} filetype:config \"apache\"",
    "Robots.txt File": "https://{target}/robots.txt",
    "Publicly Exposed Documents": "site:{target} ext:doc | ext:docx | ext:pdf | ext:rtf | ext:ppt | ext:pptx | ext:csv",
    "phpinfo()": "site:{target} ext:php | intext:phpinfo",
    "Finding Backdoors": "site:{target} inurl:shell | inurl:backdoor | inurl:wso | inurl:cmd",
    "Open Redirects": "site:{target} inurl:redirect | inurl:url | inurl:next",
    "Find Open Directories": "site:{target} intitle:'Index of' inurl:/",
    "Search for PHP Config Files": "site:{target} ext:php inurl:config",
    "Detect Exposed JSON Data": "site:{target} ext:json",
    "Detect Open XML Sitemaps": "site:{target} filetype:xml inurl:sitemap",
    "Search for SQL Database Dumps": "site:{target} ext:sql intext:'INSERT INTO'",
    "Find Open Printer Interfaces": "site:{target} inurl:hp/device/this.LCDispatcher",
    "Find Unprotected Admin Panels": "site:{target} inurl:/admin/",
    "Detect Exposed Firewalls and Routers": "site:{target} inurl:/main.cgi | inurl:/status.cgi",
    "Exposed API Keys": "site:{target} intext:'API_KEY='",
    "Exposed Environment Files": "site:{target} ext:env intext:'DB_PASSWORD='",
    "Jenkins Console": "site:{target} inurl:/script | inurl:/manage",
    "Docker Registries": "site:{target} inurl:/v2/_catalog",
    "Exposed Config Files": "site:{target} ext:json | ext:yaml | ext:yml | ext:conf",
    "Exposed DB Admin Panels": "site:{target} inurl:phpmyadmin",
    "Open Kibana Instances": "site:{target} inurl:/app/kibana",
    "Exposed Grafana Dashboards": "site:{target} inurl:/d/",
    "WordPress Debug Logs": "site:{target} inurl:debug.log",
    "OpenVPN Config Files": "site:{target} ext:ovpn",
    "AWS Credentials": "site:{target} intext:'AWS_ACCESS_KEY_ID='",
    "Firebase Databases": "site:{target} inurl:'firebaseio.com'",
    "Leaked Private Keys": "site:{target} ext:key | ext:ppk | ext:pem intext:'BEGIN RSA PRIVATE KEY'",
    "JIRA Exposed Issues": "site:{target} inurl:/browse/",
    "Exposed .git Directory": "site:{target} inurl:.git",
    "Exposed .svn Directories": "site:{target} inurl:.svn",
    "Find Jira Users": "site:{target} inurl:jira intext:'Reporter:'",
    "MongoDB Instances": "site:{target} inurl:mongodb://",
    "ElasticSearch Open Instances": "site:{target} inurl:/_search",
    "Find Admin Portals": "site:{target} inurl:admin | inurl:dashboard",
    "Exposed API Logs": "site:{target} inurl:/logs intext:'API'",
    "Find Sensitive Excel Files": "site:{target} ext:xls | ext:xlsx",
    "Exposed Code Repositories": "site:{target} inurl:repo",
    "Find Security Policies": "site:{target} inurl:/security-policy",
    "Search for Unpatched Software": "site:{target} inurl:/changelog",
    "Exposed VPN Config": "site:{target} ext:conf intext:'vpn'",
    "Search for Payment Pages": "site:{target} inurl:checkout",
    "Find Captcha Services": "site:{target} inurl:captcha",
    "Detect Open GraphQL": "site:{target} inurl:/graphql",
    "Find Swagger API Docs": "site:{target} inurl:/swagger",
    "Find Customer Support Tickets": "site:{target} inurl:/helpdesk",
    "Find Publicly Indexed Repositories": "site:{target} inurl:/repos",
    "Check for Forgotten Test Pages": "site:{target} inurl:/test",
    "Detect Leaked Source Code": "site:{target} inurl:/src",
    "Find Exposed JWTs": "site:{target} intext:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'",
    "Detect Misconfigured CORS": "site:{target} intext:'Access-Control-Allow-Origin'",
    "Check for CSP Violations": "site:{target} inurl:csp-report",
    "Find Public Directories": "site:{target} intitle:'Index of' inurl:/images/",
    "Find Public Backup Archives": "site:{target} ext:zip | ext:tar | ext:gz",
    "Unsecured API Endpoints": "site:{target} inurl:/api/",
    "Find Public Jenkins Jobs": "site:{target} inurl:/job/",
    "Detect Exposed Nginx Configs": "site:{target} intext:'server {'",
    "Leaked Browser Storage": "site:{target} intext:'localStorage' | intext:'sessionStorage'",
    "Find Public Message Queues": "site:{target} inurl:/queue/",
    "Find Open Video Streams": "site:{target} inurl:live.m3u8",
    "Find Webcams": "inurl:/view.shtml",
    "Find Open IoT Devices": "site:{target} inurl:/device_status",
    "Detect Debug Interfaces": "site:{target} inurl:/debug/",
    "Find CVEs in Headers": "site:{target} intext:'Server: Apache/2.4.49'",
    "Exposed Payment Logs": "site:{target} inurl:/logs/ intext:'transaction'",
    "Find User Activity Logs": "site:{target} inurl:/logs intext:'user login'",
    "Detect Legacy Web Tech": "site:{target} intext:'Powered by PHP 5'",
    "Find Sitemap Leaks": "site:{target} filetype:xml inurl:sitemap",
    "Public Google Drive Links": "site:drive.google.com {target}",
    "Find Cloud Buckets": "site:amazonaws.com | site:storage.googleapis.com | site:blob.core.windows.net",
    "Find Pastebin Dumps": "site:pastebin.com {target}",
    "Search in GitHub Gists": "site:gist.github.com {target}",
    "Search Leaked Credentials": "site:haveibeenpwned.com {target}",
    "Find Exposed Trello Boards": "site:trello.com {target}",
    "Search in Google Docs": "site:docs.google.com {target}",
    "Find Public Google Forms": "site:docs.google.com/forms {target}",
    "Detect Public Google Spreadsheets": "site:docs.google.com/spreadsheets {target}",
    "Detect Open Notion Pages": "site:notion.so {target}",
    "Search Public Slack Channels": "site:slack.com {target}",
    "Find Public Discord Links": "site:discord.gg {target}",
    "Exposed Environment Variables": "site:{target} intext:'DB_HOST=' | intext:'DB_USER=' | intext:'DB_PASS='",
    "Detect Open Jenkins Panels": "site:{target} inurl:/view/ inurl:/configure",
    "Find Redis Instances": "site:{target} inurl:/redis/",
    "Detect Misconfigured AWS S3 Buckets": "site:s3.amazonaws.com {target}",
    "Detect Public MinIO Buckets": "site:{target} inurl:/minio/",
    "Find Exposed Firebase Config": "site:{target} intext:'firebaseio.com' intext:'authDomain'",
    "Public Google Cloud Storage Buckets": "site:storage.googleapis.com {target}",
    "Detect Open Kubernetes Dashboards": "site:{target} inurl:/api/v1/namespaces/kube-system/",
    "Find Exposed VNC Servers": "site:{target} inurl:5900",
    "Publicly Indexed Jenkins Pipelines": "site:{target} inurl:/pipeline/",
    "Search for Public Jira Boards": "site:jira.{target} inurl:/projects/",
    "Detect PHPMyAdmin Pages": "site:{target} inurl:/phpmyadmin/",
    "Find Open WebSockets": "site:{target} inurl:wss://",
    "Find Public Mattermost Instances": "site:{target} inurl:/signup_user_complete/",
    "Detect Open CouchDB Instances": "site:{target} inurl:/_all_dbs",
    "Find Public Docker Registries": "site:{target} inurl:/v2/_catalog",
    "Search for Publicly Indexed Zoom Meeting Links": "site:zoom.us {target}",
    "Find Public Discord Bots": "site:{target} inurl:/bot/",
    "Find Open API Endpoints": "site:{target} inurl:/api-docs",
    "Find Security Audit Logs": "site:{target} inurl:/logs intext:'audit'",
    "Find Exposed Jenkins Credentials": "site:{target} inurl:/credentials/",
    "Find Open GitLab Repositories": "site:{target} inurl:/-/blob/",
    "Detect Publicly Shared Nextcloud Files": "site:{target} inurl:/s/",
    "Search for Publicly Indexed Asana Projects": "site:app.asana.com {target}",
    "Find Open Etherpad Instances": "site:{target} inurl:/p/",
    "Detect Open RabbitMQ Management Consoles": "site:{target} inurl:/rabbitmq/",
    "Detect Open MQTT Brokers": "site:{target} inurl:/mqtt/",
    "Search for Leaked Jenkins Build Logs": "site:{target} inurl:/job/ intext:'Started by user'",
    "Find Exposed Service Status Pages": "site:{target} inurl:/status/",
    "Find Open Nagios Instances": "site:{target} inurl:/nagios/",
    "Find Publicly Indexed Confluence Pages": "site:{target} inurl:/display/",
    "Find Publicly Indexed Microsoft Teams Links": "site:teams.microsoft.com {target}",
    "Find Open Jenkins Nodes": "site:{target} inurl:/computer/",
    "Find Open Jira Issue Search Pages": "site:{target} inurl:/issues/",
    "Detect Publicly Accessible Kibana Dashboards": "site:{target} inurl:/app/kibana",
    "Find Publicly Indexed Grafana Dashboards": "site:{target} inurl:/grafana/d/",
    "Detect Open Proxmox Management Interfaces": "site:{target} inurl:/pve/",
    "Detect Publicly Indexed Jenkins Pipeline Logs": "site:{target} inurl:/console/",
    "Find Exposed Server Status Pages": "site:{target} inurl:/server-status/",
    "Detect Publicly Accessible Grafana API": "site:{target} inurl:/api/ intext:'grafana'",
    "Find Open Metabase Dashboards": "site:{target} inurl:/metabase/",
    "Search for Publicly Indexed WebEx Meetings": "site:webex.com {target}",
    "Detect Open pfSense Web Interfaces": "site:{target} inurl:/status.php",
    "Find Open SonicWall Interfaces": "site:{target} inurl:/auth.html",
    "Search for Publicly Indexed ServiceNow Instances": "site:service-now.com {target}",
    "Detect Open Splunk Instances": "site:{target} inurl:/en-US/app/search/",
    "Find Publicly Indexed Salesforce Instances": "site:salesforce.com {target}",
    "Detect Open Atlassian Bitbucket Repositories": "site:{target} inurl:/bitbucket/",
    "Find Publicly Indexed Slack Workspaces": "site:{target}.slack.com",
    "Find Publicly Indexed Webflow Projects": "site:webflow.io {target}",
    "Detect Open HashiCorp Vault Instances": "site:{target} inurl:/v1/sys/",
    "Find Publicly Indexed Jira Tickets": "site:{target} inurl:/browse/",
    "Detect Open Apache Solr Instances": "site:{target} inurl:/solr/admin/",
    "Detect Open Kubernetes API Servers": "site:{target} inurl:/api/v1/",
    "Find Open Home Assistant Dashboards": "site:{target} inurl:/lovelace/",
    "Find Exposed Zabbix Monitoring Panels": "site:{target} inurl:/zabbix/",
    "Search for Publicly Indexed Evernote Notebooks": "site:evernote.com {target}",
    "Find Public Notion Pages": "site:notion.so {target}",
    "Detect Public Jira Boards": "site:{target} inurl:/secure/RapidBoard.jspa",
    "Detect Open Cloudflare Workers": "site:workers.dev {target}",
    "Detect Open Netdata Monitoring Dashboards": "site:{target} inurl:/netdata/",
    "Detect Exposed GitHub Actions Logs": "site:github.com {target} inurl:/runs/",
    "Find Open ISPConfig Admin Panels": "site:{target} inurl:/ispconfig/",
    "Find Exposed Dokuwiki Pages": "site:{target} inurl:/doku.php",
    "Detect Publicly Indexed Bitwarden Vaults": "site:{target} inurl:/vault",
    "Find Exposed Freshdesk Support Portals": "site:freshdesk.com {target}",
    "Find Open Azure DevOps Pipelines": "site:dev.azure.com {target}",
    "Detect Open Rundeck Instances": "site:{target} inurl:/rundeck/",
    "Find Open VMware ESXi Web Interfaces": "site:{target} inurl:/ui/",
    "Find Open OpenCart Admin Panels": "site:{target} inurl:/admin/",
    "Find Open PrestaShop Admin Panels": "site:{target} inurl:/admin",
    "Find Exposed Azure Blob Storage Buckets": "site:blob.core.windows.net {target}",
    "Find Open OpenProject Instances": "site:{target} inurl:/openproject/",
    "Find Public ClickUp Workspaces": "site:clickup.com {target}",
    "Detect Open Couchbase Admin Interfaces": "site:{target} inurl:/couchbase/",
    "Find Open OpenShift Admin Consoles": "site:{target} inurl:/console/",
    "Find Exposed Directus Instances": "site:{target} inurl:/directus/",
    "Detect Open Keycloak Admin Consoles": "site:{target} inurl:/auth/admin/",
    "Find Open Webmin Panels": "site:{target} inurl:/webmin/",
    "Detect Open Apache Guacamole Panels": "site:{target} inurl:/guacamole/",
    "Find Exposed phpBB Forums": "site:{target} inurl:/phpbb/",
    "Detect Open OpenVAS Security Scanners": "site:{target} inurl:/omp/",
    "Find Publicly Indexed Adobe Workfront Projects": "site:workfront.com {target}"
};

const Home = () => {
  const [domain, setDomain] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSearch = (query: string) => {
    if (!domain) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const searchQuery = query.replace(/{target}/g, domain);
    
    if (searchQuery.startsWith('http://') || searchQuery.startsWith('https://')) {
      window.open(searchQuery, '_blank');
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showError && (
        <div className="fixed top-5 right-5 bg-white border-l-4 border-red-500 text-black p-4 rounded shadow-lg flex items-center justify-between z-50 toast-enter min-w-[300px]">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <span>Please enter a domain first</span>
          </div>
          <button 
            onClick={() => setShowError(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-l-4 border-green-500 text-black p-4 rounded shadow-lg flex items-center justify-between z-50 toast-enter min-w-[300px]">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            <span>Search opened in new tab!</span>
          </div>
          <button 
            onClick={() => setShowSuccess(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Google Dorks Generator
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="w-full bg-gray-800 border-2 border-green-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-2">
          {Object.entries(DORK_QUERIES).map(([name, query], index) => (
            <button
              key={index}
              onClick={() => handleSearch(query)}
              className="h-20 relative overflow-hidden bg-gray-800 rounded-lg p-3 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] group"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <h3 className="text-green-400 font-medium text-sm group-hover:text-white transition-colors duration-300 line-clamp-2">
                  {name}
                </h3>
                <Search className="w-4 h-4 text-green-500 group-hover:text-white transition-colors duration-300 self-end" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;