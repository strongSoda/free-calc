// src/data/ipv6-networks.js
export const ipv6Networks = [
  // Documentation & Examples
  { network: "2001:db8::", maxCidr: 128, description: "Documentation prefix", category: "Documentation" },
  { network: "2001:db8:1::", maxCidr: 128, description: "Documentation example 1", category: "Documentation" },
  { network: "2001:db8:2::", maxCidr: 128, description: "Documentation example 2", category: "Documentation" },
  { network: "2001:db8:3::", maxCidr: 128, description: "Documentation example 3", category: "Documentation" },
  { network: "2001:db8:4::", maxCidr: 128, description: "Documentation example 4", category: "Documentation" },
  
  // Global Unicast (2000::/3)
  { network: "2001::", maxCidr: 128, description: "Teredo tunneling", category: "Global Unicast" },
  { network: "2002::", maxCidr: 128, description: "6to4 tunneling", category: "Global Unicast" },
  { network: "2003::", maxCidr: 128, description: "Global unicast example 1", category: "Global Unicast" },
  { network: "2004::", maxCidr: 128, description: "Global unicast example 2", category: "Global Unicast" },
  { network: "2005::", maxCidr: 128, description: "Global unicast example 3", category: "Global Unicast" },
  { network: "2600::", maxCidr: 128, description: "US provider space", category: "Global Unicast" },
  { network: "2601::", maxCidr: 128, description: "ISP allocation 1", category: "Global Unicast" },
  { network: "2602::", maxCidr: 128, description: "ISP allocation 2", category: "Global Unicast" },
  { network: "2603::", maxCidr: 128, description: "ISP allocation 3", category: "Global Unicast" },
  { network: "2604::", maxCidr: 128, description: "ISP allocation 4", category: "Global Unicast" },
  
  // Unique Local Addresses (fc00::/7)
  { network: "fc00::", maxCidr: 128, description: "Unique local prefix", category: "Unique Local" },
  { network: "fc01::", maxCidr: 128, description: "ULA example 1", category: "Unique Local" },
  { network: "fc02::", maxCidr: 128, description: "ULA example 2", category: "Unique Local" },
  { network: "fc03::", maxCidr: 128, description: "ULA example 3", category: "Unique Local" },
  { network: "fc04::", maxCidr: 128, description: "ULA example 4", category: "Unique Local" },
  { network: "fd00::", maxCidr: 128, description: "Private network", category: "Unique Local" },
  { network: "fd01::", maxCidr: 128, description: "Private network 1", category: "Unique Local" },
  { network: "fd02::", maxCidr: 128, description: "Private network 2", category: "Unique Local" },
  { network: "fd03::", maxCidr: 128, description: "Private network 3", category: "Unique Local" },
  { network: "fd04::", maxCidr: 128, description: "Private network 4", category: "Unique Local" },
  
  // Link Local (fe80::/10)
  { network: "fe80::", maxCidr: 128, description: "Link-local prefix", category: "Link Local" },
  { network: "fe80:1::", maxCidr: 128, description: "Link-local example 1", category: "Link Local" },
  { network: "fe80:2::", maxCidr: 128, description: "Link-local example 2", category: "Link Local" },
  { network: "fe80:3::", maxCidr: 128, description: "Link-local example 3", category: "Link Local" },
  { network: "fe80:4::", maxCidr: 128, description: "Link-local example 4", category: "Link Local" },
  
  // Organization Examples
  { network: "2001:0::", maxCidr: 128, description: "Enterprise example 1", category: "Organization" },
  { network: "2001:1::", maxCidr: 128, description: "Enterprise example 2", category: "Organization" },
  { network: "2001:2::", maxCidr: 128, description: "Enterprise example 3", category: "Organization" },
  { network: "2001:3::", maxCidr: 128, description: "Enterprise example 4", category: "Organization" },
  { network: "2001:4::", maxCidr: 128, description: "Enterprise example 5", category: "Organization" },
  
  // Department Examples
  { network: "2001:db8:1:1::", maxCidr: 128, description: "Department 1", category: "Department" },
  { network: "2001:db8:1:2::", maxCidr: 128, description: "Department 2", category: "Department" },
  { network: "2001:db8:1:3::", maxCidr: 128, description: "Department 3", category: "Department" },
  { network: "2001:db8:1:4::", maxCidr: 128, description: "Department 4", category: "Department" },
  { network: "2001:db8:1:5::", maxCidr: 128, description: "Department 5", category: "Department" },
  
  // Service-specific Examples
  { network: "2001:db8:2:1::", maxCidr: 128, description: "Web servers", category: "Services" },
  { network: "2001:db8:2:2::", maxCidr: 128, description: "Mail servers", category: "Services" },
  { network: "2001:db8:2:3::", maxCidr: 128, description: "DNS servers", category: "Services" },
  { network: "2001:db8:2:4::", maxCidr: 128, description: "Database servers", category: "Services" },
  { network: "2001:db8:2:5::", maxCidr: 128, description: "Application servers", category: "Services" },
  
  // Branch Office Examples
  { network: "2001:db8:3:1::", maxCidr: 128, description: "Branch Office 1", category: "Branch" },
  { network: "2001:db8:3:2::", maxCidr: 128, description: "Branch Office 2", category: "Branch" },
  { network: "2001:db8:3:3::", maxCidr: 128, description: "Branch Office 3", category: "Branch" },
  { network: "2001:db8:3:4::", maxCidr: 128, description: "Branch Office 4", category: "Branch" },
  { network: "2001:db8:3:5::", maxCidr: 128, description: "Branch Office 5", category: "Branch" },
  
  // Special Purpose Networks
  { network: "2001:db8:4:1::", maxCidr: 128, description: "Guest network", category: "Special" },
  { network: "2001:db8:4:2::", maxCidr: 128, description: "IoT devices", category: "Special" },
  { network: "2001:db8:4:3::", maxCidr: 128, description: "Management network", category: "Special" },
  { network: "2001:db8:4:4::", maxCidr: 128, description: "VoIP network", category: "Special" },
  { network: "2001:db8:4:5::", maxCidr: 128, description: "Security cameras", category: "Special" },
  
  // Data Center Examples
  { network: "2001:db8:5:1::", maxCidr: 128, description: "Data Center 1", category: "Data Center" },
  { network: "2001:db8:5:2::", maxCidr: 128, description: "Data Center 2", category: "Data Center" },
  { network: "2001:db8:5:3::", maxCidr: 128, description: "Data Center 3", category: "Data Center" },
  { network: "2001:db8:5:4::", maxCidr: 128, description: "Data Center 4", category: "Data Center" },
  { network: "2001:db8:5:5::", maxCidr: 128, description: "Data Center 5", category: "Data Center" }
];

// Function to get related networks
export const getRelatedIPv6Networks = (currentNetwork) => {
  // Find current network's category
  const network = ipv6Networks.find(n => n.network === currentNetwork);
  if (!network) return [];
  
  // Get other networks in same category
  return ipv6Networks
    .filter(n => n.category === network.category && n.network !== currentNetwork)
    .slice(0, 3);
};

// Function to get networks by category
export const getNetworksByCategory = (category) => {
  return ipv6Networks.filter(n => n.category === category);
};

// Common prefix lengths for different use cases
export const commonPrefixLengths = [
  { length: 32, description: "ISP allocation" },
  { length: 48, description: "Site allocation" },
  { length: 56, description: "Small site allocation" },
  { length: 64, description: "Standard subnet" },
  { length: 80, description: "Large end user" },
  { length: 96, description: "Small end user" },
  { length: 112, description: "Micro end user" },
  { length: 128, description: "Single address" }
];