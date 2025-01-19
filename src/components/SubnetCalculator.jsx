import { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const SubnetCalculator = ({ 
  defaultIp = '',
  defaultCidr = '',
  ipVersion = 'ipv4',
  onCalculate = () => {} 
}) => {
  const [ip, setIp] = useState(defaultIp);
  const [cidr, setCidr] = useState(defaultCidr);
  const [ipClass, setIpClass] = useState('any'); // for IPv4
  const [results, setResults] = useState(null);

  const calculateIPv4Details = (ipAddr, cidrMask) => {
    // Convert IP to binary
    const ipBinary = ipAddr.split('.')
      .map(octet => parseInt(octet))
      .map(octet => octet.toString(2).padStart(8, '0'))
      .join('');

    // Create subnet mask
    const subnetMask = '1'.repeat(cidrMask) + '0'.repeat(32 - cidrMask);
    const wildcardMask = '0'.repeat(cidrMask) + '1'.repeat(32 - cidrMask);

    // Calculate network address binary
    const networkBinary = ipBinary.substring(0, cidrMask) + '0'.repeat(32 - cidrMask);
    
    // Convert to decimal
    const networkAddress = networkBinary.match(/.{8}/g)
      .map(octet => parseInt(octet, 2))
      .join('.');

    const subnetMaskDec = subnetMask.match(/.{8}/g)
      .map(octet => parseInt(octet, 2))
      .join('.');

    const wildcardMaskDec = wildcardMask.match(/.{8}/g)
      .map(octet => parseInt(octet, 2))
      .join('.');

    // Calculate total hosts
    const totalHosts = Math.pow(2, 32 - cidrMask);
    const usableHosts = totalHosts - 2;

    // Calculate broadcast address
    const broadcastBinary = networkBinary.substring(0, cidrMask) + '1'.repeat(32 - cidrMask);
    const broadcastAddress = broadcastBinary.match(/.{8}/g)
      .map(octet => parseInt(octet, 2))
      .join('.');

    // Calculate first and last usable hosts
    const firstHost = incrementIp(networkAddress);
    const lastHost = decrementIp(broadcastAddress);

    // Calculate additional identifiers
    const integerID = parseInt(ipBinary, 2);
    const hexID = '0x' + integerID.toString(16);
    const arpaAddress = ipAddr.split('.').reverse().join('.') + '.in-addr.arpa';
    const ipv4Mapped = '::ffff:' + ipAddr;
    const sixToFour = '2002:' + integerID.toString(16).match(/.{4}/g).join('.') + '::/48';

    // Generate all possible networks for this CIDR
    const totalNetworks = Math.pow(2, cidrMask);
    const allNetworks = [];
    let currentNetwork = 0;
    
    for (let i = 0; i < Math.min(totalNetworks, 32); i++) {
      const networkAddr = intToIP(currentNetwork);
      const broadcastAddr = intToIP(currentNetwork + Math.pow(2, 32 - cidrMask) - 1);
      const firstHostAddr = incrementIp(networkAddr);
      const lastHostAddr = decrementIp(broadcastAddr);
      
      allNetworks.push({
        network: networkAddr,
        firstHost: firstHostAddr,
        lastHost: lastHostAddr,
        broadcast: broadcastAddr
      });
      
      currentNetwork += Math.pow(2, 32 - cidrMask);
    }

    return {
      ipAddress: ipAddr,
      networkAddress,
      usableRange: `${firstHost} - ${lastHost}`,
      broadcastAddress,
      totalHosts: totalHosts.toLocaleString(),
      usableHosts: usableHosts.toLocaleString(),
      subnetMask: subnetMaskDec,
      wildcardMask: wildcardMaskDec,
      binarySubnetMask: subnetMask.match(/.{8}/g).join('.'),
      cidrNotation: `/${cidrMask}`,
      ipType: determineIPType(ipAddr),
      integerID,
      hexID,
      binaryID: ipBinary,
      arpaAddress,
      ipv4Mapped,
      sixToFourPrefix: sixToFour,
      allNetworks
    };
  };

  const calculateIPv6Details = (ipAddr, prefixLength) => {
    // Expand shortened IPv6 address
    const fullAddress = expandIPv6(ipAddr);
    
    // Calculate network portion
    const network = fullAddress.split(':').slice(0, prefixLength/16).join(':') + '::';
    
    // Calculate total addresses
    const totalAddresses = BigInt(2) ** BigInt(128 - prefixLength);
    
    // Calculate range
    const rangeStart = expandIPv6(network);
    const rangeEnd = calculateIPv6RangeEnd(network, prefixLength);

    return {
      ipAddress: ipAddr + '/' + prefixLength,
      fullAddress,
      totalAddresses: totalAddresses.toString(),
      network,
      range: `${rangeStart} - ${rangeEnd}`
    };
  };

  const handleCalculate = () => {
    if (!ip || !cidr) {
      setResults({ error: 'Please enter both IP address and CIDR/prefix length' });
      return;
    }

    try {
      if (ipVersion === 'ipv4') {
        const results = calculateIPv4Details(ip, parseInt(cidr));
        setResults(results);
      } else {
        const results = calculateIPv6Details(ip, parseInt(cidr));
        setResults(results);
      }
    } catch (error) {
      setResults({ error: 'Invalid input. Please check IP address and CIDR notation.' });
    }
  };

  useEffect(() => {
    if (defaultIp && defaultCidr) {
      handleCalculate();
    }
  }, [defaultIp, defaultCidr])

  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark-hover rounded-xl p-2 md:p-6 shadow-lg">
      <div className="space-y-6">
        {ipVersion === 'ipv4' && (
          <div className="flex flex-col space-y-2">
            <label className="font-display text-lg font-medium">IP Class</label>
            <select 
              value={ipClass}
              onChange={(e) => setIpClass(e.target.value)}
              className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border"
            >
              <option value="any">Any Class</option>
              <option value="a">Class A (1.0.0.0 to 126.255.255.255)</option>
              <option value="b">Class B (128.0.0.0 to 191.255.255.255)</option>
              <option value="c">Class C (192.0.0.0 to 223.255.255.255)</option>
              <option value="d">Class D (224.0.0.0 to 239.255.255.255)</option>
              <option value="e">Class E (240.0.0.0 to 255.255.255.255)</option>
            </select>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="font-display text-lg font-medium">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder={ipVersion === 'ipv4' ? '192.168.1.0' : '2001:db8::'}
            className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-display text-lg font-medium">
            {ipVersion === 'ipv4' ? 'CIDR Notation' : 'Prefix Length'}
          </label>
          <input
            type="number"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            placeholder={ipVersion === 'ipv4' ? '24' : '64'}
            min="1"
            max={ipVersion === 'ipv4' ? '32' : '128'}
            className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-content-dark font-bold py-3 px-4 rounded-lg"
        >
          Calculate
        </button>

        <p>Quick Link: <a className="text-accent-primary hover:text-accent-secondary transition-colors" href="/calculators/ip-lookup">IP Lookup</a></p>

        {results && !results.error && ipVersion === 'ipv4' && (
          <div className="mt-4 space-y-4">
            <h3 className="font-display text-xl font-semibold">Results:</h3>
            <div className="grid gap-4">
              <ResultRow label="IP Address" value={results.ipAddress} />
              <ResultRow label="Network Address" value={results.networkAddress} />
              <ResultRow label="Usable Host IP Range" value={results.usableRange} />
              <ResultRow label="Broadcast Address" value={results.broadcastAddress} />
              <ResultRow label="Total Number of Hosts" value={results.totalHosts} />
              <ResultRow label="Number of Usable Hosts" value={results.usableHosts} />
              <ResultRow label="Subnet Mask" value={results.subnetMask} />
              <ResultRow label="Wildcard Mask" value={results.wildcardMask} />
              <ResultRow label="Binary Subnet Mask" value={results.binarySubnetMask} />
              <ResultRow label="CIDR Notation" value={results.cidrNotation} />
              <ResultRow label="IP Type" value={results.ipType} />
              <ResultRow label="Binary ID" value={results.binaryID} />
              <ResultRow label="Integer ID" value={results.integerID} />
              <ResultRow label="Hex ID" value={results.hexID} />
              <ResultRow label="in-addr.arpa" value={results.arpaAddress} />
              <ResultRow label="IPv4 Mapped Address" value={results.ipv4Mapped} />
              <ResultRow label="6to4 Prefix" value={results.sixToFourPrefix} />

              {/* Add Affiliate Section before Continue Learning */}
              <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
                <AffiliateSection client:load />
              </div>

              <div className="mt-6">
                <h4 className="font-display text-lg font-semibold mb-4">
                  All Possible /{cidr} Networks
                </h4>
                <div className="grid gap-2">
                  {results.allNetworks.map((net, idx) => (
                    <div key={idx} className="bg-surface-light-hover dark:bg-surface-dark p-3 rounded-lg">
                      <p className="font-mono text-sm">
                        Network: {net.network}<br />
                        Range: {net.firstHost} - {net.lastHost}<br />
                        Broadcast: {net.broadcast}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {results && !results.error && ipVersion === 'ipv6' && (
          <div className="mt-4 space-y-4">
            <h3 className="font-display text-xl font-semibold">Results:</h3>
            <div className="grid gap-4">
              <ResultRow label="IP Address" value={results.ipAddress} />
              <ResultRow label="Full IP Address" value={results.fullAddress} />
              <ResultRow label="Total IP Addresses" value={results.totalAddresses} />
              <ResultRow label="Network" value={results.network} />
              <ResultRow label="IP Range" value={results.range} />
            </div>

            {/* Add Affiliate Section before Continue Learning */}
              <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
                <AffiliateSection client:load />
              </div>
          </div>
        )}

        {results?.error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {results.error}
          </div>
        )}
      </div>
    </div>
  );
};

const ResultRow = ({ label, value }) => (
  <div className="bg-surface-light-hover dark:bg-surface-dark p-4 rounded-lg">
    <p className="font-semibold mb-1">{label}:</p>
    <p className="font-mono break-all">{value}</p>
  </div>
);

// Helper functions
const incrementIp = (ip) => {
  const parts = ip.split('.').map(Number);
  parts[3]++;
  return parts.join('.');
};

const decrementIp = (ip) => {
  const parts = ip.split('.').map(Number);
  parts[3]--;
  return parts.join('.');
};

const intToIP = (int) => {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
};

const determineIPType = (ip) => {
  const firstOctet = parseInt(ip.split('.')[0]);
  if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'Class E (Reserved)';
  return 'Invalid';
};

const expandIPv6 = (ip) => {
  // Implementation of IPv6 expansion logic
  const parts = ip.split(':');
  const expanded = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '') {
      expanded.push(...Array(8 - parts.length + 1).fill('0000'));
    } else {
      expanded.push(parts[i].padStart(4, '0'));
    }
  }
  
  return expanded.join(':');
};

const calculateIPv6RangeEnd = (network, prefixLength) => {
  // Implementation of IPv6 range end calculation
  const parts = network.split(':');
  const endParts = [...parts];
  
  for (let i = Math.floor(prefixLength/16); i < 8; i++) {
    endParts[i] = 'ffff';
  }
  
  return endParts.join(':');
};

export default SubnetCalculator;