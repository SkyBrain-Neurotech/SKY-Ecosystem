export interface SKYWallet {
  address: string;
  balance: number;
  stakingRewards: number;
  dataSubmissions: number;
  researchContributions: number;
  lifetimeEarnings: number;
  dataQualityScore: number;
  researchImpactScore: number;
  totalSessionsContributed: number;
  acceptedSubmissions: number;
}

export interface DataNFT {
  id: string;
  tokenId: string;
  title: string;
  description: string;
  category: 'meditation' | 'focus' | 'sleep' | 'gaming' | 'learning' | 'stress';
  duration: number;
  channels: string[];
  quality: 'premium' | 'standard' | 'basic';
  price: number;
  royaltyPercentage: number;
  owner: string;
  minted: boolean;
  listed: boolean;
  sales: number;
  metadata: {
    samplingRate: number;
    bandPowers: {
      delta: number;
      theta: number;
      alpha: number;
      beta: number;
      gamma: number;
    };
    mentalStates: string[];
    verificationScore: number;
    ethicalCompliance: boolean;
    signalQuality: number;
    artifactLevel: number;
    noiseLevel: number;
  };
  createdAt: number;
}

export interface ResearchProject {
  id: string;
  title: string;
  institution: string;
  researcher: string;
  description: string;
  category: 'neuroscience' | 'psychology' | 'ai-training' | 'medical' | 'wellness';
  budget: number;
  deadline: number;
  requirements: {
    minDuration: number;
    categories: string[];
    minQuality: string;
    sampleSize: number;
    demographics?: string[];
  };
  rewards: {
    perSubmission: number;
    bonusThreshold: number;
    bonusAmount: number;
  };
  status: 'active' | 'funded' | 'completed';
  submissions: number;
  verified: boolean;
}

export interface SKYStakePool {
  id: string;
  name: string;
  apy: number;
  lockPeriod: number; // days
  minStake: number;
  totalStaked: number;
  rewards: string;
  category: 'research' | 'validation' | 'governance';
}

class SKYEcosystemService {
  private wallet: SKYWallet = {
    address: '0x' + Math.random().toString(16).substr(2, 40),
    balance: 2500,
    stakingRewards: 150,
    dataSubmissions: 8,
    researchContributions: 3,
    lifetimeEarnings: 3420,
    dataQualityScore: 94.2,
    researchImpactScore: 8.7,
    totalSessionsContributed: 23,
    acceptedSubmissions: 21
  };

  private dataNFTs: DataNFT[] = [];
  private researchProjects: ResearchProject[] = [];
  private stakePools: SKYStakePool[] = [];
  private nftCounter: number = 0;

  constructor() {
    this.initializeEcosystem();
  }

  private initializeEcosystem() {
    // Initialize with more diverse research projects
    this.researchProjects = [
      {
        id: 'rp-001',
        title: 'Meditation State Recognition AI',
        institution: 'Stanford Neuroscience Lab',
        researcher: 'Dr. Sarah Chen',
        description: 'Training AI models to recognize different meditation states from EEG patterns for therapeutic applications.',
        category: 'neuroscience',
        budget: 50000,
        deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 300,
          categories: ['meditation'],
          minQuality: 'standard',
          sampleSize: 100,
          demographics: ['18-65']
        },
        rewards: {
          perSubmission: 75,
          bonusThreshold: 10,
          bonusAmount: 200
        },
        status: 'active',
        submissions: 34,
        verified: true
      },
      {
        id: 'rp-002',
        title: 'Gaming Flow State Analysis',
        institution: 'MIT Brain & Cognitive Sciences',
        researcher: 'Prof. Alex Rodriguez',
        description: 'Understanding neural patterns during optimal gaming performance for cognitive enhancement research.',
        category: 'psychology',
        budget: 35000,
        deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 600,
          categories: ['gaming', 'focus'],
          minQuality: 'premium',
          sampleSize: 50
        },
        rewards: {
          perSubmission: 125,
          bonusThreshold: 5,
          bonusAmount: 300
        },
        status: 'active',
        submissions: 12,
        verified: true
      },
      {
        id: 'rp-003',
        title: 'Sleep Transition Patterns',
        institution: 'Johns Hopkins Sleep Center',
        researcher: 'Dr. Maria Santos',
        description: 'Mapping EEG signatures during sleep onset for insomnia treatment development.',
        category: 'medical',
        budget: 75000,
        deadline: Date.now() + 60 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 1800,
          categories: ['sleep'],
          minQuality: 'premium',
          sampleSize: 200
        },
        rewards: {
          perSubmission: 200,
          bonusThreshold: 15,
          bonusAmount: 500
        },
        status: 'active',
        submissions: 67,
        verified: true
      },
      {
        id: 'rp-004',
        title: 'Stress Response in Learning Environments',
        institution: 'Harvard Medical School',
        researcher: 'Dr. Jennifer Park',
        description: 'Investigating how stress affects neural patterns during learning to improve educational outcomes.',
        category: 'wellness',
        budget: 40000,
        deadline: Date.now() + 35 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 450,
          categories: ['stress', 'learning'],
          minQuality: 'standard',
          sampleSize: 80
        },
        rewards: {
          perSubmission: 90,
          bonusThreshold: 8,
          bonusAmount: 250
        },
        status: 'active',
        submissions: 23,
        verified: true
      },
      {
        id: 'rp-005',
        title: 'Cognitive Load During Focus Tasks',
        institution: 'UC Berkeley Neuroscience Institute',
        researcher: 'Prof. Michael Chang',
        description: 'Measuring cognitive load through EEG patterns to optimize human-computer interfaces.',
        category: 'ai-training',
        budget: 60000,
        deadline: Date.now() + 50 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 900,
          categories: ['focus', 'learning'],
          minQuality: 'premium',
          sampleSize: 120
        },
        rewards: {
          perSubmission: 150,
          bonusThreshold: 12,
          bonusAmount: 400
        },
        status: 'active',
        submissions: 45,
        verified: true
      },
      {
        id: 'rp-006',
        title: 'Mindfulness and Attention Training',
        institution: 'Yale Center for Emotional Intelligence',
        researcher: 'Dr. Lisa Thompson',
        description: 'Studying the neurological effects of mindfulness training on attention and emotional regulation.',
        category: 'psychology',
        budget: 45000,
        deadline: Date.now() + 40 * 24 * 60 * 60 * 1000,
        requirements: {
          minDuration: 600,
          categories: ['meditation', 'focus'],
          minQuality: 'standard',
          sampleSize: 90
        },
        rewards: {
          perSubmission: 110,
          bonusThreshold: 10,
          bonusAmount: 300
        },
        status: 'active',
        submissions: 28,
        verified: true
      }
    ];

    // Initialize staking pools
    this.stakePools = [
      {
        id: 'pool-research',
        name: 'Research Funding Pool',
        apy: 12.5,
        lockPeriod: 90,
        minStake: 1000,
        totalStaked: 2500000,
        rewards: 'Fund new research projects + governance rights',
        category: 'research'
      },
      {
        id: 'pool-validation',
        name: 'Data Validation Pool',
        apy: 8.7,
        lockPeriod: 30,
        minStake: 500,
        totalStaked: 1200000,
        rewards: 'Earn from validating data quality',
        category: 'validation'
      },
      {
        id: 'pool-governance',
        name: 'Governance Pool',
        apy: 15.2,
        lockPeriod: 180,
        minStake: 2000,
        totalStaked: 800000,
        rewards: 'Vote on ecosystem decisions + premium rewards',
        category: 'governance'
      }
    ];
  }

  private generateUniqueId(): string {
    this.nftCounter++;
    return `nft-${Date.now()}-${this.nftCounter}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async mintDataNFT(_eegData: any, metadata: any): Promise<DataNFT> {
    const signalQuality = this.calculateSignalQuality();
    const artifactLevel = Math.random() * 15 + 5; // 5-20%
    const noiseLevel = Math.random() * 10 + 2; // 2-12%
    
    const nft: DataNFT = {
      id: this.generateUniqueId(),
      tokenId: `SKY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      title: metadata.title || `EEG Session ${new Date().toLocaleDateString()}`,
      description: metadata.description || 'High-quality EEG recording session',
      category: metadata.category || 'focus',
      duration: metadata.duration || 300,
      channels: ['O1', 'O2', 'T3', 'T4'],
      quality: this.calculateQuality(signalQuality),
      price: this.calculatePrice(metadata),
      royaltyPercentage: 10,
      owner: this.wallet.address,
      minted: true,
      listed: false,
      sales: 0,
      metadata: {
        samplingRate: 250,
        bandPowers: metadata.bandPowers || {
          delta: Math.random() * 20 + 5,
          theta: Math.random() * 15 + 10,
          alpha: Math.random() * 25 + 15,
          beta: Math.random() * 30 + 20,
          gamma: Math.random() * 10 + 5
        },
        mentalStates: [metadata.category],
        verificationScore: Math.random() * 30 + 70,
        ethicalCompliance: true,
        signalQuality,
        artifactLevel,
        noiseLevel
      },
      createdAt: Date.now()
    };

    this.dataNFTs.push(nft);
    this.wallet.balance += 25;
    this.wallet.totalSessionsContributed += 1;
    
    // Update quality score based on new submission
    this.updateDataQualityScore(signalQuality);
    
    return nft;
  }

  private calculateSignalQuality(): number {
    return Math.random() * 30 + 70; // 70-100%
  }

  private updateDataQualityScore(newSignalQuality: number) {
    // Weighted average with existing score
    const weight = 0.1;
    this.wallet.dataQualityScore = (this.wallet.dataQualityScore * (1 - weight)) + (newSignalQuality * weight);
  }

  private calculateQuality(signalQuality: number): 'premium' | 'standard' | 'basic' {
    if (signalQuality > 85) return 'premium';
    if (signalQuality > 70) return 'standard';
    return 'basic';
  }

  private calculatePrice(metadata: any): number {
    const basePrice = 50;
    const durationMultiplier = Math.max(1, metadata.duration / 300);
    const categoryMultipliers: Record<string, number> = {
      'meditation': 1.2,
      'focus': 1.0,
      'sleep': 1.5,
      'gaming': 1.1,
      'learning': 1.3,
      'stress': 1.4
    };
    const categoryMultiplier = categoryMultipliers[metadata.category] || 1.0;
    
    return Math.round(basePrice * durationMultiplier * categoryMultiplier);
  }

  async listOnMarketplace(nftId: string, price?: number): Promise<boolean> {
    const nft = this.dataNFTs.find(n => n.id === nftId);
    if (!nft) return false;

    nft.listed = true;
    if (price) nft.price = price;
    return true;
  }

  async submitToResearch(nftId: string, projectId: string): Promise<{ success: boolean; reward: number }> {
    const nft = this.dataNFTs.find(n => n.id === nftId);
    const project = this.researchProjects.find(p => p.id === projectId);
    
    if (!nft || !project) return { success: false, reward: 0 };

    const meetsRequirements = 
      nft.duration >= project.requirements.minDuration &&
      project.requirements.categories.includes(nft.category) &&
      this.qualityMeetsRequirement(nft.quality, project.requirements.minQuality);

    if (!meetsRequirements) return { success: false, reward: 0 };

    let reward = project.rewards.perSubmission;
    
    if (this.wallet.dataSubmissions >= project.rewards.bonusThreshold) {
      reward += project.rewards.bonusAmount;
    }

    this.wallet.balance += reward;
    this.wallet.lifetimeEarnings += reward;
    this.wallet.dataSubmissions += 1;
    this.wallet.researchContributions += 1;
    this.wallet.acceptedSubmissions += 1;
    project.submissions += 1;

    // Update research impact score
    this.updateResearchImpactScore(reward, project.rewards.perSubmission);

    return { success: true, reward };
  }

  private updateResearchImpactScore(reward: number, baseReward: number) {
    const impactMultiplier = reward / baseReward;
    const weight = 0.05;
    this.wallet.researchImpactScore = Math.min(10, (this.wallet.researchImpactScore * (1 - weight)) + (impactMultiplier * 2 * weight));
  }

  private qualityMeetsRequirement(dataQuality: string, requiredQuality: string): boolean {
    const qualityLevels = { 'basic': 1, 'standard': 2, 'premium': 3 };
    return qualityLevels[dataQuality as keyof typeof qualityLevels] >= qualityLevels[requiredQuality as keyof typeof qualityLevels];
  }

  async stakeTokens(poolId: string, amount: number): Promise<boolean> {
    const pool = this.stakePools.find(p => p.id === poolId);
    if (!pool || amount < pool.minStake || amount > this.wallet.balance) {
      return false;
    }

    this.wallet.balance -= amount;
    // In real implementation, would track staking positions
    return true;
  }

  getWallet(): SKYWallet {
    return { ...this.wallet };
  }

  getDataNFTs(): DataNFT[] {
    return [...this.dataNFTs];
  }

  getResearchProjects(): ResearchProject[] {
    return [...this.researchProjects];
  }

  getStakePools(): SKYStakePool[] {
    return [...this.stakePools];
  }

  getMarketplaceItems(): DataNFT[] {
    return this.dataNFTs.filter(nft => nft.listed);
  }

  async purchaseData(nftId: string): Promise<boolean> {
    const nft = this.dataNFTs.find(n => n.id === nftId && n.listed);
    if (!nft || nft.price > this.wallet.balance) return false;

    this.wallet.balance -= nft.price;
    nft.sales += 1;
    return true;
  }
}

export const skyEcosystem = new SKYEcosystemService();