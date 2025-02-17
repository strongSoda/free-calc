import React from 'react';
import { ExternalLink } from 'lucide-react';

const sponsorData = [
  {
    name: "AIVideo.to",
    description: "Turn any topic in to short Videos with AI in 1 minute.",
    logo: "https://aivideo.to/logo.png",
    website: "https://aivideo.to",
    tier: "gold",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    name: "Spiff.store",
    description: "Discover and explore the best AI tools and resources.",
    logo: "https://spiff.store/favicon_io/android-chrome-192x192.png",
    website: "https://spiff.store",
    tier: "gold",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    name: "WorldClass.domains",
    description: "Create your profile page to showcase all your projects.",
    logo: "https://worldclass.domains/logo.png",
    website: "https://worldclass.domains",
    tier: "gold",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    name: "AnimePFP",
    description: "Discover anime profile pictures for your social media accounts. ",
    logo: "https://drawfolio.s3.amazonaws.com/public/system/pictures/images/000/198/760/medium_thumb/gojo.png",
    website: "https://anime-pfp.com/",
    tier: "silver",
    color: "from-blue-500/20 to-purple-500/20"
  },
  // {
  //   name: "DevOps Master",
  //   description: "CI/CD pipeline and development workflow tools",
  //   logo: "https://www.iconninja.com/files/840/527/794/web-icon.png",
  //   website: "https://example.com/devops",
  //   tier: "silver",
  //   color: "from-yellow-500/20 to-orange-500/20"
  // },
  // {
  //   name: "AI Runtime",
  //   description: "Machine learning infrastructure and deployment",
  //   logo: "https://www.figma.com/community/icon?resource_id=736000994034548392&resource_type=plugin",
  //   website: "https://example.com/airuntime",
  //   tier: "silver",
  //   color: "from-blue-500/20 to-purple-500/20"
  // }
];

const SponsorCard = ({ sponsor }) => (
  <a
    href={sponsor.website}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative overflow-hidden"
  >
    <div className={`h-full p-6 bg-gradient-to-br ${sponsor.color} backdrop-blur-sm rounded-2xl border border-white/10 dark:border-gray-800/50 transition-all duration-300`}>
      {/* Glowing orb effect in background */}
      <div />
      
      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-accent-primary transition-colors">
              {sponsor.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-accent-primary transition-colors" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {sponsor.description}
          </p>
        </div>
      </div>
    </div>
  </a>
);

const SponsorsSection = () => {
  const goldSponsors = sponsorData.filter(s => s.tier === "gold");
  const silverSponsors = sponsorData.filter(s => s.tier === "silver");

  return (
    <div className="relative space-y-12 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent" />
      
      {/* Gold Tier */}
      <div className="relative space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
            Sponsors
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsorData.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>
      </div>

      {/* Silver Tier */}
      {/* <div className="relative space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Silver Sponsors
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {silverSponsors.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>
      </div> */}

      {/* Call to Action */}
      {/* <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-10 blur-xl" />
        <div className="relative text-center p-8 rounded-2xl overflow-hidden border border-white/10 dark:border-gray-800/50 backdrop-blur-sm">
          <h3 className="font-display text-2xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            Become a Sponsor
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our community of sponsors and showcase your brand to thousands of visitors monthly. Premium spots available for $500/month.
          </p>
          <a
            href="mailto:ikhan77727@gmail.com"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Contact for Sponsorship
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default SponsorsSection;