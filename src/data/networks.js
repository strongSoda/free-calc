// src/data/networks.js
export const ipv4Networks = [
  // Class A Private Networks
  { network: "10.0.0.0", maxCidr: 32, description: "Private network (RFC 1918)" },
  { network: "10.10.0.0", maxCidr: 32, description: "Common Class A subnet" },
  { network: "10.20.0.0", maxCidr: 32, description: "Enterprise network" },
  { network: "10.50.0.0", maxCidr: 32, description: "Large organization subnet" },
  { network: "10.100.0.0", maxCidr: 32, description: "Corporate network" },
  
  // Class B Private Networks
  { network: "172.16.0.0", maxCidr: 32, description: "Private network (RFC 1918)" },
  { network: "172.17.0.0", maxCidr: 32, description: "Docker default network" },
  { network: "172.18.0.0", maxCidr: 32, description: "Common Class B subnet" },
  { network: "172.20.0.0", maxCidr: 32, description: "Enterprise subnet" },
  { network: "172.25.0.0", maxCidr: 32, description: "Medium organization" },
  
  // Class C Private Networks
  { network: "192.168.0.0", maxCidr: 32, description: "Private network (RFC 1918)" },
  { network: "192.168.1.0", maxCidr: 32, description: "Home network default" },
  { network: "192.168.2.0", maxCidr: 32, description: "Small office network" },
  { network: "192.168.10.0", maxCidr: 32, description: "Common LAN subnet" },
  { network: "192.168.100.0", maxCidr: 32, description: "Lab network" },

  // Link-Local Networks
  { network: "169.254.0.0", maxCidr: 32, description: "Link-local (APIPA)" },
  { network: "169.254.1.0", maxCidr: 32, description: "Auto-configuration" },
  { network: "169.254.10.0", maxCidr: 32, description: "Zeroconf network" },

  // Loopback Networks
  { network: "127.0.0.0", maxCidr: 32, description: "Loopback network" },
  { network: "127.0.0.1", maxCidr: 32, description: "Localhost" },
  { network: "127.1.0.0", maxCidr: 32, description: "Extended loopback" },

  // Common Public Networks
  { network: "8.8.8.8", maxCidr: 32, description: "Google DNS" },
  { network: "1.1.1.1", maxCidr: 32, description: "Cloudflare DNS" },
  { network: "208.67.222.222", maxCidr: 32, description: "OpenDNS" },

  // Additional Private Subnets
  { network: "10.0.1.0", maxCidr: 32, description: "Development network" },
  { network: "10.0.2.0", maxCidr: 32, description: "Testing network" },
  { network: "10.0.3.0", maxCidr: 32, description: "QA network" },
  { network: "10.0.4.0", maxCidr: 32, description: "Production network" },
  { network: "10.1.0.0", maxCidr: 32, description: "Branch office 1" },
  { network: "10.2.0.0", maxCidr: 32, description: "Branch office 2" },
  
  // Additional Class B Subnets
  { network: "172.16.1.0", maxCidr: 32, description: "Department 1" },
  { network: "172.16.2.0", maxCidr: 32, description: "Department 2" },
  { network: "172.16.3.0", maxCidr: 32, description: "Department 3" },
  { network: "172.16.10.0", maxCidr: 32, description: "Guest network" },
  { network: "172.16.20.0", maxCidr: 32, description: "IoT network" },
  
  // Additional Class C Subnets
  { network: "192.168.3.0", maxCidr: 32, description: "WiFi network" },
  { network: "192.168.4.0", maxCidr: 32, description: "VoIP network" },
  { network: "192.168.5.0", maxCidr: 32, description: "Security cameras" },
  { network: "192.168.6.0", maxCidr: 32, description: "Guest WiFi" },
  { network: "192.168.7.0", maxCidr: 32, description: "Management network" }
];

export const ipv6Networks = [
  // Global Unicast
  { network: "2001:db8::", maxCidr: 128, description: "Documentation prefix" },
  { network: "2001::", maxCidr: 128, description: "Teredo tunneling" },
  { network: "2002::", maxCidr: 128, description: "6to4 tunneling" },
  
  // Unique Local
  { network: "fc00::", maxCidr: 128, description: "Unique local address" },
  { network: "fd00::", maxCidr: 128, description: "Private network" },
  
  // Link Local
  { network: "fe80::", maxCidr: 128, description: "Link-local address" },
  
  // Additional Global Unicast examples
  { network: "2001:db8:1::", maxCidr: 128, description: "Example subnet 1" },
  { network: "2001:db8:2::", maxCidr: 128, description: "Example subnet 2" },
  { network: "2001:db8:3::", maxCidr: 128, description: "Example subnet 3" },
  { network: "2001:db8:4::", maxCidr: 128, description: "Example subnet 4" }
];

// Function to get related networks based on current network
export const getRelatedNetworks = (currentNetwork) => {
  // For IPv4
  if (currentNetwork.includes('.')) {
    const firstOctet = parseInt(currentNetwork.split('.')[0]);
    return ipv4Networks
      .filter(net => {
        const netFirstOctet = parseInt(net.network.split('.')[0]);
        // Return networks in the same class
        return (netFirstOctet >= Math.floor(firstOctet/32)*32) && 
               (netFirstOctet < (Math.floor(firstOctet/32)+1)*32) &&
               net.network !== currentNetwork;
      })
      .slice(0, 3);
  }
  
  // For IPv6
  return ipv6Networks
    .filter(net => net.network !== currentNetwork)
    .slice(0, 3);
};