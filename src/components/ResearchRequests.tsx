import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, Clock, Coins, Users } from 'lucide-react';
import { mockDataService, ResearchRequest, EEGSession } from '../utils/mockDataService';

interface ResearchRequestsProps {
  sessions: EEGSession[];
  onSessionUpdate: () => void;
}

const ResearchRequests: React.FC<ResearchRequestsProps> = ({ sessions, onSessionUpdate }) => {
  const [requests, setRequests] = useState<ResearchRequest[]>([]);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await mockDataService.getResearchRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load research requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSession = async (requestId: string, sessionId: string) => {
    setSubmitting(requestId);
    try {
      const result = await mockDataService.submitToResearch(sessionId, requestId);
      console.log('Submission successful:', result);
      await loadRequests(); // Refresh requests
      onSessionUpdate();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(null);
    }
  };

  const getEligibleSessions = (request: ResearchRequest) => {
    return sessions.filter(session => 
      session.duration >= request.criteria.minDuration &&
      (request.criteria.mentalState === 'any' || session.mentalState === request.criteria.mentalState)
    );
  };

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading research requests...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Active Research Requests - Earn SKY for Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => {
            const eligibleSessions = getEligibleSessions(request);
            const progressPercentage = (request.submissions / request.maxSubmissions) * 100;

            return (
              <div
                key={request.id}
                className="bg-muted/30 p-4 rounded-lg border border-border/30 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{request.title}</h3>
                    <p className="text-muted-foreground text-sm">by {request.researcher}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-500">
                        <Coins className="h-4 w-4" />
                        {request.compensation} {request.currency}
                      </div>
                      <div className="flex items-center gap-1 text-blue-500">
                        <Clock className="h-4 w-4" />
                        {Math.floor(request.criteria.minDuration / 60)}min+
                      </div>
                      <div className="flex items-center gap-1 text-purple-500">
                        <Users className="h-4 w-4" />
                        {request.submissions}/{request.maxSubmissions}
                      </div>
                    </div>
                  </div>

                  <Badge 
                    variant={request.status === 'active' ? 'default' : 'secondary'}
                    className={request.status === 'active' ? 'bg-green-600' : ''}
                  >
                    {request.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Requirements: {request.criteria.mentalState} state, {request.criteria.deviceType} device
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {request.maxSubmissions - request.submissions} submissions remaining
                  </div>
                </div>

                {eligibleSessions.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm text-primary">
                      You have {eligibleSessions.length} eligible session(s):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {eligibleSessions.slice(0, 3).map((session) => (
                        <Button
                          key={session.id}
                          onClick={() => handleSubmitSession(request.id, session.id)}
                          disabled={submitting === request.id || request.status !== 'active'}
                          className="bg-green-600 hover:bg-green-500 text-white text-xs"
                          size="sm"
                        >
                          {submitting === request.id ? 'Submitting...' : 
                           `Submit ${session.mentalState} (${session.duration}s)`}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No eligible sessions. Record EEG data matching the criteria to participate.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchRequests;