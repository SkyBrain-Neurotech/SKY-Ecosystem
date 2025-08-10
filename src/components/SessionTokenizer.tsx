import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Coins, Download, Eye, Zap } from 'lucide-react';
import { mockDataService, EEGSession } from '../utils/mockDataService';

interface SessionTokenizerProps {
  sessions: EEGSession[];
  onSessionUpdate: () => void;
}

const SessionTokenizer: React.FC<SessionTokenizerProps> = ({ sessions, onSessionUpdate }) => {
  const [tokenizing, setTokenizing] = useState<string | null>(null);
  const [listing, setListing] = useState<string | null>(null);

  const handleTokenize = async (sessionId: string) => {
    setTokenizing(sessionId);
    try {
      const result = await mockDataService.tokenizeSession(sessionId);
      console.log('Tokenization successful:', result);
      onSessionUpdate();
    } catch (error) {
      console.error('Tokenization failed:', error);
    } finally {
      setTokenizing(null);
    }
  };

  const handleListOnMarketplace = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || !session.price) return;

    setListing(sessionId);
    try {
      const result = await mockDataService.listOnMarketplace(sessionId, session.price);
      console.log('Listed on marketplace:', result);
      onSessionUpdate();
    } catch (error) {
      console.error('Listing failed:', error);
    } finally {
      setListing(null);
    }
  };

  const getMentalStateColor = (state: string) => {
    const colors = {
      meditation: 'bg-purple-500',
      focused: 'bg-blue-500',
      relaxed: 'bg-green-500',
      stressed: 'bg-red-500',
      creative: 'bg-orange-500'
    };
    return colors[state as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <Card className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Session Tokenizer - Convert EEG to NFTs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No sessions recorded yet. Start recording to create tokenizable EEG data.
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-800/50 p-4 rounded-lg border border-slate-600/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">
                      {session.participantName} - {session.duration}s Session
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getMentalStateColor(session.mentalState)} text-white`}>
                        {session.mentalState}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(session.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {session.isTokenized && (
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          NFT: {session.tokenId}
                        </Badge>
                        <div className="text-sm text-cyan-300">
                          {session.price} SKY
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center p-2 bg-slate-700/50 rounded">
                    <div className="text-purple-300">Delta</div>
                    <div className="font-mono">{session.wavePatterns.delta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded">
                    <div className="text-blue-300">Theta</div>
                    <div className="font-mono">{session.wavePatterns.theta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded">
                    <div className="text-green-300">Alpha</div>
                    <div className="font-mono">{session.wavePatterns.alpha.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded">
                    <div className="text-yellow-300">Beta</div>
                    <div className="font-mono">{session.wavePatterns.beta.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded">
                    <div className="text-red-300">Gamma</div>
                    <div className="font-mono">{session.wavePatterns.gamma.toFixed(1)}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!session.isTokenized ? (
                    <Button
                      onClick={() => handleTokenize(session.id)}
                      disabled={tokenizing === session.id}
                      className="bg-purple-600 hover:bg-purple-500 text-white"
                      size="sm"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {tokenizing === session.id ? 'Minting NFT...' : 'Tokenize Session'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleListOnMarketplace(session.id)}
                      disabled={listing === session.id}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {listing === session.id ? 'Listing...' : 'List on Marketplace'}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-slate-500 text-slate-300">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionTokenizer;