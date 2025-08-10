import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Coins, 
  Zap, 
  TrendingUp, 
  Users, 
  Database, 
  Shield, 
  Award, 
  Brain,
  ShoppingCart,
  Wallet,
  Target,
  Lock,
  Upload,
  Activity,
  Eye,
  Info,
  Plus,
  BarChart3,
  Signal
} from 'lucide-react';
import { skyEcosystem, DataNFT, ResearchProject, SKYWallet, SKYStakePool } from '../utils/skyEcosystem';
import SessionTokenizer from './SessionTokenizer';
import ResearchRequests from './ResearchRequests';
import { mockDataService, EEGSession } from '../utils/mockDataService';

interface NeuroDataEcosystemProps {
  sessions: EEGSession[];
  onSessionUpdate: () => void;
}

const NeuroDataEcosystem: React.FC<NeuroDataEcosystemProps> = ({ sessions, onSessionUpdate }) => {
  const [wallet, setWallet] = useState<SKYWallet | null>(null);
  const [dataNFTs, setDataNFTs] = useState<DataNFT[]>([]);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [stakePools, setStakePools] = useState<SKYStakePool[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<DataNFT[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<DataNFT | null>(null);

  useEffect(() => {
    loadEcosystemData();
  }, []);

  const loadEcosystemData = async () => {
    setWallet(skyEcosystem.getWallet());
    setDataNFTs(skyEcosystem.getDataNFTs());
    setResearchProjects(skyEcosystem.getResearchProjects());
    setStakePools(skyEcosystem.getStakePools());
    setMarketplaceItems(skyEcosystem.getMarketplaceItems());
  };

  const handleCreateDemoSession = async () => {
    await mockDataService.createSession('Demo User', 300 + Math.random() * 600);
    onSessionUpdate();
  };

  const handleMintNFT = async () => {
    setLoading(true);
    try {
      const metadata = {
        title: `Demo EEG Session ${new Date().toLocaleDateString()}`,
        description: 'Demo EEG data from SkyBrain NeuroBank',
        category: 'focus',
        duration: 300 + Math.random() * 600,
        bandPowers: {
          delta: Math.random() * 20 + 5,
          theta: Math.random() * 15 + 10,
          alpha: Math.random() * 25 + 15,
          beta: Math.random() * 30 + 20,
          gamma: Math.random() * 10 + 5
        }
      };

      const nft = await skyEcosystem.mintDataNFT([], metadata);
      await loadEcosystemData();
      
      console.log('NFT minted successfully:', nft);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToResearch = async (nftId: string, projectId: string) => {
    const result = await skyEcosystem.submitToResearch(nftId, projectId);
    if (result.success) {
      await loadEcosystemData();
      console.log('Research submission successful');
    }
    return result;
  };

  const handleListOnMarketplace = async (nftId: string) => {
    const success = await skyEcosystem.listOnMarketplace(nftId);
    if (success) {
      await loadEcosystemData();
      console.log('Listed on marketplace successfully');
    }
  };

  const handleStake = async (poolId: string, amount: number) => {
    const success = await skyEcosystem.stakeTokens(poolId, amount);
    if (success) {
      await loadEcosystemData();
      console.log('Staking successful');
    }
    return success;
  };

  const handleViewNFT = (nft: DataNFT) => {
    setSelectedNFT(nft);
  };


  const getCategoryIcon = (category: string) => {
    const icons = {
      'neuroscience': Brain,
      'psychology': Users,
      'ai-training': Database,
      'medical': Shield,
      'wellness': Activity
    };
    return icons[category as keyof typeof icons] || Brain;
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'premium': return 'text-cyan-300 bg-cyan-900/30 border-cyan-500/50';
      case 'standard': return 'text-blue-300 bg-blue-900/30 border-blue-500/50';
      case 'basic': return 'text-foreground bg-muted/30 border-border/50';
      default: return 'text-foreground bg-muted/30 border-border/50';
    }
  };

  if (!wallet) {
    return <div className="p-6 text-center">Loading SKY Ecosystem...</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg">
            <Coins className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              SKY Ecosystem
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Decentralized Neurodata Economy</p>
          </div>
        </div>
        <p className="text-foreground text-base max-w-3xl mx-auto leading-relaxed">
          Transform your brainwaves into valuable digital assets. Contribute to cutting-edge neuroscience research while earning SKY coins in our ethical, decentralized ecosystem.
        </p>
      </div>

      {/* Enhanced Wallet Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-cyan-400/40 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg w-fit mx-auto mb-2">
              <Wallet className="h-6 w-6 text-cyan-400 mx-auto" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {wallet.balance.toLocaleString()}
            </div>
            <div className="text-xs text-cyan-300 font-medium">SKY Balance</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-emerald-400/40 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-emerald-400 mx-auto" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {wallet.lifetimeEarnings.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-300 font-medium">Lifetime Earnings</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-blue-400/40 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg w-fit mx-auto mb-2">
              <Database className="h-6 w-6 text-blue-400 mx-auto" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {dataNFTs.length}
            </div>
            <div className="text-xs text-blue-300 font-medium">Data Assets</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-purple-400/40 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg w-fit mx-auto mb-2">
              <Brain className="h-6 w-6 text-purple-400 mx-auto" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {wallet.acceptedSubmissions}/{wallet.totalSessionsContributed}
            </div>
            <div className="text-xs text-purple-300 font-medium">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card rounded-xl p-1">
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
          >
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">Dash</span>
          </TabsTrigger>
          <TabsTrigger 
            value="mint" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Mint Data</span>
            <span className="sm:hidden">Mint</span>
          </TabsTrigger>
          <TabsTrigger 
            value="research" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
          >
            <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Research</span>
            <span className="sm:hidden">Study</span>
          </TabsTrigger>
          <TabsTrigger 
            value="marketplace" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Marketplace</span>
            <span className="sm:hidden">Market</span>
          </TabsTrigger>
          <TabsTrigger 
            value="staking" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
          >
            <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Staking</span>
            <span className="sm:hidden">Stake</span>
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Signal className="h-5 w-5" />
                  Data Quality Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {wallet.dataQualityScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Based on {wallet.totalSessionsContributed} sessions</div>
                </div>
                <Progress value={wallet.dataQualityScore} className="h-3" />
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-card/50 rounded">
                    <div className="text-green-500 font-medium">Accepted</div>
                    <div>{wallet.acceptedSubmissions}</div>
                  </div>
                  <div className="text-center p-2 bg-card/50 rounded">
                    <div className="text-foreground font-medium">Total</div>
                    <div>{wallet.totalSessionsContributed}</div>
                  </div>
                  <div className="text-center p-2 bg-card/50 rounded">
                    <div className="text-foreground font-medium">Success</div>
                    <div>{((wallet.acceptedSubmissions/wallet.totalSessionsContributed)*100).toFixed(1)}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Target className="h-5 w-5" />
                  Research Impact Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {wallet.researchImpactScore.toFixed(1)}/10
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Research contribution quality</div>
                </div>
                <Progress value={wallet.researchImpactScore * 10} className="h-3" />
                <div className="text-xs text-center">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Projects: {wallet.researchContributions}</span>
                    <span>Submissions: {wallet.dataSubmissions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Award className="h-5 w-5" />
                  Staking Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {wallet.stakingRewards.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">SKY earned from staking</div>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  Auto-compounding rewards from staking pools
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={handleCreateDemoSession} className="bg-primary hover:bg-primary/90">
                  <Brain className="h-4 w-4 mr-2" />
                  Create Demo Session
                </Button>
                <Button onClick={handleMintNFT} disabled={loading} className="bg-green-600 hover:bg-green-500">
                  <Coins className="h-4 w-4 mr-2" />
                  {loading ? 'Minting...' : 'Mint Current Data'}
                </Button>
                <Button onClick={() => setActiveTab('research')} variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Browse Research
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mint Data Tab */}
        <TabsContent value="mint" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Mint Neural Data NFTs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Transform your EEG recordings into valuable NFTs. Each session is analyzed for quality and rarity, determining its market value.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Data Minting</h3>
                    <p className="text-muted-foreground text-sm">
                      Mint an NFT from your current EEG session data. Quality and duration affect the final value.
                    </p>
                    <Button 
                      onClick={handleMintNFT} 
                      disabled={loading} 
                      className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                      size="lg"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      {loading ? 'Minting NFT...' : 'Mint Live Data NFT'}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Session Tokenizer</h3>
                    <p className="text-muted-foreground text-sm">
                      Convert recorded EEG sessions into tradeable NFTs with full metadata and provenance.
                    </p>
                    <SessionTokenizer sessions={sessions} onSessionUpdate={onSessionUpdate} />
                  </div>
                </div>

                {/* My NFTs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">My Data NFTs ({dataNFTs.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataNFTs.map((nft) => (
                      <Card key={nft.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className={`${getQualityColor(nft.quality)} border text-xs`}>
                              {nft.quality}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {nft.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-base">{nft.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-sm text-muted-foreground">
                            {nft.description}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Duration: {nft.duration}s</span>
                            <span className="font-bold text-primary">{nft.price} SKY</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleViewNFT(nft)}
                              variant="outline"
                              className="flex-1"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {!nft.listed && (
                              <Button 
                                size="sm" 
                                onClick={() => handleListOnMarketplace(nft.id)}
                                className="flex-1 bg-green-600 hover:bg-green-500"
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                List
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Research Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResearchRequests sessions={sessions} onSessionUpdate={onSessionUpdate} />
            </CardContent>
          </Card>

          {/* Active Research Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Active Research Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchProjects.map((project) => {
                const IconComponent = getCategoryIcon(project.category);
                const eligibleNFTs = dataNFTs.filter(nft => 
                  nft.duration >= project.requirements.minDuration &&
                  project.requirements.categories.includes(nft.category)
                );

                return (
                  <Card key={project.id} className="bg-card border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`bg-${project.category === 'neuroscience' ? 'purple' : 'blue'}-600`}>
                          {project.category}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{project.rewards.perSubmission} SKY</div>
                          <div className="text-xs text-muted-foreground">per submission</div>
                        </div>
                      </div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{project.institution}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{project.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress: {project.submissions}/{project.requirements.sampleSize}</span>
                        <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                      <Progress 
                        value={(project.submissions / project.requirements.sampleSize) * 100} 
                        className="h-2" 
                      />
                      {eligibleNFTs.length > 0 ? (
                        <div className="space-y-2">
                          <div className="text-sm text-primary">
                            You have {eligibleNFTs.length} eligible NFT(s)
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {eligibleNFTs.slice(0, 2).map((nft) => (
                              <Button
                                key={nft.id}
                                size="sm"
                                onClick={() => handleSubmitToResearch(nft.id, project.id)}
                                className="bg-green-600 hover:bg-green-500 text-xs"
                              >
                                Submit {nft.category} NFT
                              </Button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          No eligible NFTs. Need {project.requirements.categories.join(' or ')} data.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Data Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Browse and purchase high-quality neural data from the community. All data is verified and ethically sourced.
                  </AlertDescription>
                </Alert>

                {marketplaceItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No items currently listed on the marketplace.</p>
                    <p className="text-sm mt-2">Be the first to list your data NFTs!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketplaceItems.map((item) => (
                      <Card key={item.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className={`${getQualityColor(item.quality)} border text-xs`}>
                              {item.quality}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Duration: {item.duration}s</span>
                            <span>Quality: {item.metadata.signalQuality.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-primary">{item.price} SKY</div>
                            <Button 
                              size="sm"
                              disabled={wallet.balance < item.price}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Buy
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value="staking" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                SKY Staking Pools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Stake your SKY tokens to earn rewards and support the ecosystem. Each pool has different benefits and requirements.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stakePools.map((pool) => (
                    <Card key={pool.id} className="bg-card border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`bg-${pool.category === 'research' ? 'purple' : pool.category === 'validation' ? 'blue' : 'orange'}-600`}>
                            {pool.category}
                          </Badge>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-500">{pool.apy}%</div>
                            <div className="text-xs text-muted-foreground">APY</div>
                          </div>
                        </div>
                        <CardTitle className="text-base">{pool.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Min Stake:</span>
                            <span>{pool.minStake.toLocaleString()} SKY</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lock Period:</span>
                            <span>{pool.lockPeriod} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Staked:</span>
                            <span>{(pool.totalStaked / 1000000).toFixed(1)}M SKY</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {pool.rewards}
                        </div>

                        <Button 
                          className="w-full"
                          disabled={wallet.balance < pool.minStake}
                          onClick={() => handleStake(pool.id, pool.minStake)}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Stake {pool.minStake.toLocaleString()} SKY
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Your Staking Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No active staking positions.</p>
                      <p className="text-sm mt-2">Start staking to earn passive rewards!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-card border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedNFT.title}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setSelectedNFT(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Token ID</div>
                  <div className="font-mono text-sm">{selectedNFT.tokenId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div>{selectedNFT.category}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Quality</div>
                  <Badge className={getQualityColor(selectedNFT.quality)}>{selectedNFT.quality}</Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-bold">{selectedNFT.price} SKY</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Band Powers</div>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-purple-500">Delta</div>
                    <div>{selectedNFT.metadata.bandPowers.delta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-blue-500">Theta</div>
                    <div>{selectedNFT.metadata.bandPowers.theta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-green-500">Alpha</div>
                    <div>{selectedNFT.metadata.bandPowers.alpha.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-yellow-500">Beta</div>
                    <div>{selectedNFT.metadata.bandPowers.beta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-red-500">Gamma</div>
                    <div>{selectedNFT.metadata.bandPowers.gamma.toFixed(1)}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Signal Quality</div>
                  <div>{selectedNFT.metadata.signalQuality.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Verification Score</div>
                  <div>{selectedNFT.metadata.verificationScore.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Sales</div>
                  <div>{selectedNFT.sales}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div>{new Date(selectedNFT.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NeuroDataEcosystem;