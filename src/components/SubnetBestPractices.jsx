// src/components/SubnetBestPractices.jsx
const SubnetBestPractices = ({ cidrValue }) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      <h2 className="text-2xl font-display font-bold mb-4">
        Best Practices for /{cidrValue} Networks
      </h2>
      <div className="space-y-4">
        {cidrValue <= 32 && (
          <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <h3 className="font-semibold mb-2">Large-Scale Allocation</h3>
            <p>Typically used by ISPs and large organizations. Consider implementing hierarchical addressing for easier management.</p>
          </div>
        )}
        
        {cidrValue > 32 && cidrValue <= 48 && (
          <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <h3 className="font-semibold mb-2">Site Allocation</h3>
            <p>Recommended for enterprise networks. Plan your subnet allocation to allow for future growth.</p>
          </div>
        )}
        
        {cidrValue === 64 && (
          <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <h3 className="font-semibold mb-2">Standard Subnet</h3>
            <p>Ideal for end-user networks. Enables stateless address autoconfiguration (SLAAC).</p>
          </div>
        )}
        
        {cidrValue > 64 && (
          <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <h3 className="font-semibold mb-2">Specialized Use</h3>
            <p>Consider carefully before using prefixes longer than /64 as they may break some IPv6 features.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubnetBestPractices;