// Mock data service for neurodata ecosystem
export interface EEGSession {
  id: string;
  participantName: string;
  duration: number;
  timestamp: number;
  wavePatterns: {
    delta: number;
    theta: number;
    alpha: number;
    beta: number;
    gamma: number;
  };
  mentalState: string;
  deviceId: string;
  isTokenized: boolean;
  tokenId?: string;
  price?: number;
  owner: string;
}

export interface ResearchRequest {
  id: string;
  title: string;
  researcher: string;
  criteria: {
    mentalState: string;
    minDuration: number;
    deviceType: string;
  };
  compensation: number;
  currency: string;
  status: 'active' | 'fulfilled' | 'expired';
  submissions: number;
  maxSubmissions: number;
}

export interface MarketplaceItem {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  seller: string;
  metadata: EEGSession;
  verified: boolean;
}

class MockDataService {
  private sessions: EEGSession[] = [];
  private requests: ResearchRequest[] = [
    {
      id: 'req-001',
      title: 'Meditation States Research',
      researcher: 'Dr. Neural Labs',
      criteria: {
        mentalState: 'meditation',
        minDuration: 300,
        deviceType: 'BrainBit'
      },
      compensation: 50,
      currency: 'SKY',
      status: 'active',
      submissions: 12,
      maxSubmissions: 100
    },
    {
      id: 'req-002',
      title: 'Gaming Focus Patterns',
      researcher: 'GameBrain Research',
      criteria: {
        mentalState: 'focused',
        minDuration: 600,
        deviceType: 'Any'
      },
      compensation: 75,
      currency: 'SKY',
      status: 'active',
      submissions: 8,
      maxSubmissions: 50
    }
  ];
  private marketplaceItems: MarketplaceItem[] = [];

  // EEG Session Management
  async createSession(participantName: string, duration: number): Promise<EEGSession> {
    const session: EEGSession = {
      id: `session-${Date.now()}`,
      participantName,
      duration,
      timestamp: Date.now(),
      wavePatterns: {
        delta: Math.random() * 50 + 10,
        theta: Math.random() * 40 + 15,
        alpha: Math.random() * 60 + 20,
        beta: Math.random() * 45 + 25,
        gamma: Math.random() * 30 + 10
      },
      mentalState: this.generateMentalState(),
      deviceId: 'brainbit-001',
      isTokenized: false,
      owner: participantName
    };

    this.sessions.push(session);
    console.log('Created EEG session:', session);
    return session;
  }

  // NFT Tokenization (Mock)
  async tokenizeSession(sessionId: string): Promise<{ tokenId: string; transactionHash: string }> {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const tokenId = `SKY-NFT-${Date.now()}`;
    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`;

    session.isTokenized = true;
    session.tokenId = tokenId;
    session.price = this.calculateDynamicPrice(session);

    console.log('Tokenized session:', { tokenId, transactionHash, session });
    return { tokenId, transactionHash };
  }

  // Dynamic Pricing
  private calculateDynamicPrice(session: EEGSession): number {
    const basePrice = 10;
    const rarityMultiplier = this.calculateRarity(session.wavePatterns);
    const demandMultiplier = this.getResearchDemand(session.mentalState);
    return Math.round(basePrice * rarityMultiplier * demandMultiplier);
  }

  private calculateRarity(wavePatterns: EEGSession['wavePatterns']): number {
    const alphaTheta = wavePatterns.alpha / wavePatterns.theta;
    if (alphaTheta > 2) return 1.5; // Rare pattern
    if (alphaTheta < 0.5) return 1.3; // Uncommon pattern
    return 1.0; // Common pattern
  }

  private getResearchDemand(mentalState: string): number {
    const demand = {
      meditation: 1.4,
      focused: 1.2,
      relaxed: 1.1,
      stressed: 1.3,
      creative: 1.5
    };
    return demand[mentalState as keyof typeof demand] || 1.0;
  }

  private generateMentalState(): string {
    const states = ['meditation', 'focused', 'relaxed', 'stressed', 'creative'];
    return states[Math.floor(Math.random() * states.length)];
  }

  // Data Retrieval
  async getSessions(): Promise<EEGSession[]> {
    return [...this.sessions];
  }

  async getResearchRequests(): Promise<ResearchRequest[]> {
    return [...this.requests];
  }

  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return [...this.marketplaceItems];
  }

  // Marketplace Operations
  async listOnMarketplace(sessionId: string, price: number): Promise<MarketplaceItem> {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session || !session.isTokenized) {
      throw new Error('Session not found or not tokenized');
    }

    const item: MarketplaceItem = {
      id: `market-${Date.now()}`,
      sessionId,
      title: `EEG Data - ${session.mentalState}`,
      description: `${session.duration}s recording showing ${session.mentalState} patterns`,
      price,
      currency: 'SKY',
      seller: session.owner,
      metadata: session,
      verified: true
    };

    this.marketplaceItems.push(item);
    return item;
  }

  async purchaseData(itemId: string, buyer: string): Promise<{ success: boolean; transactionHash: string }> {
    const item = this.marketplaceItems.find(i => i.id === itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    
    // Remove from marketplace (transferred to buyer)
    this.marketplaceItems = this.marketplaceItems.filter(i => i.id !== itemId);
    
    console.log('Data purchased:', { item, buyer, transactionHash });
    return { success: true, transactionHash };
  }

  // Research Integration
  async submitToResearch(sessionId: string, requestId: string): Promise<{ reward: number; transactionHash: string }> {
    const session = this.sessions.find(s => s.id === sessionId);
    const request = this.requests.find(r => r.id === requestId);
    
    if (!session || !request) {
      throw new Error('Session or request not found');
    }

    if (!this.meetsRequirements(session, request.criteria)) {
      throw new Error('Session does not meet research criteria');
    }

    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    request.submissions += 1;

    console.log('Submitted to research:', { session, request, reward: request.compensation });
    return { reward: request.compensation, transactionHash };
  }

  private meetsRequirements(session: EEGSession, criteria: ResearchRequest['criteria']): boolean {
    return session.duration >= criteria.minDuration &&
           (criteria.mentalState === 'any' || session.mentalState === criteria.mentalState) &&
           (criteria.deviceType === 'Any' || session.deviceId.includes(criteria.deviceType.toLowerCase()));
  }
}

export const mockDataService = new MockDataService();