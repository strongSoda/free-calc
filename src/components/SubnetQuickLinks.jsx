// src/components/SubnetQuickLinks.jsx
import { ipv4Networks } from '../data/networks';
import { ipv6Networks } from '../data/ipv6-networks';

const SubnetQuickLinks = () => {
  // Select specific networks from our data files
  const ipv4Links = [
    {
      href: "/calculators/subnet/ipv4/192-168-1-0/24",
      network: "192.168.1.0/24",
      description: ipv4Networks.find(n => n.network === "192.168.1.0").description
    },
    {
      href: "/calculators/subnet/ipv4/10-0-0-0/8",
      network: "10.0.0.0/8",
      description: ipv4Networks.find(n => n.network === "10.0.0.0").description
    },
    {
      href: "/calculators/subnet/ipv4/172-16-0-0/16",
      network: "172.16.0.0/16",
      description: ipv4Networks.find(n => n.network === "172.16.0.0").description
    }
  ];

  const ipv6Links = [
    {
      href: "/calculators/subnet/ipv6/2002--/64",
      network: "2002::",
      description: ipv6Networks.find(n => n.network === "2002::").description
    },
    {
    "href": "/calculators/subnet/ipv6/2001-db8--/64",
    "network": "2001:db8::",
    "description": "Documentation prefix"
  },
    {
    "href": "/calculators/subnet/ipv6/2001--/64",
    "network": "2001::",
    "description": "Teredo tunneling"
  }
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      <h2 className="text-2xl font-display font-bold mb-6">
        Popular Calculations
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* IPv4 Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            Common IPv4 Subnets
          </h3>
          <div className="space-y-3">
            {ipv4Links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-mono font-medium">{link.network}</div>
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {link.description}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* IPv6 Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            Common IPv6 Networks
          </h3>
          <div className="space-y-3">
            {ipv6Links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-mono font-medium">{link.network}</div>
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {link.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubnetQuickLinks;