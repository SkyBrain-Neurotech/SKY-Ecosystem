import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import SessionTokenizer from '../components/SessionTokenizer';
import NeuroDataEcosystem from '../components/NeuroDataEcosystem';
import { mockDataService, EEGSession } from '../utils/mockDataService';
import { 
  Brain, 
  Coins, 
  Shield, 
  Zap,
  Moon,
  Sun,
  Palette,
  ArrowLeft,
  Activity,
  Users
} from 'lucide-react';

const NeuroBank: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'scifi'>('dark');
  const [sessions, setSessions] = useState<EEGSession[]>([]);
  const [showTokenizer, setShowTokenizer] = useState(false);
  const [showEcosystem, setShowEcosystem] = useState(false);

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'scifi' ? 'scifi' : theme === 'dark' ? 'dark' : '';
    loadSessions();
  }, [theme]);

  const loadSessions = async () => {
    const sessionData = await mockDataService.getSessions();
    setSessions(sessionData);
  };


  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'scifi')[] = ['light', 'dark', 'scifi'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch(theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'scifi': return <Palette className="h-4 w-4" />;
    }
  };

  // Show full ecosystem if user wants to access all web3 features
  if (showEcosystem) {
    return (
      <div className="min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowEcosystem(false)}
                className="border-primary/30 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to NeuroBank
              </Button>
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SkyBrain Ecosystem</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleTheme}
              className="border-primary/30 hover:bg-primary/10"
            >
              {getThemeIcon()}
              <span className="ml-2 capitalize">{theme}</span>
            </Button>
          </div>
          <NeuroDataEcosystem 
            sessions={sessions}
            onSessionUpdate={loadSessions}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-500 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(0,255,255,0.2),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary/60 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-accent/50 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-sm opacity-75 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <Brain className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SkyBrain Neural Suite
                </div>
                <div className="text-sm text-muted-foreground">The Future of Brain Health</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleTheme}
                className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                {getThemeIcon()}
                <span className="ml-2 capitalize">{theme}</span>
              </Button>
              <Button 
                onClick={() => setShowEcosystem(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-6"
              >
                <Zap className="h-4 w-4 mr-2" />
                Explore Vision
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 px-6 py-2 text-lg hover:scale-105 transition-transform duration-300">
                  🚀 Vision 2030: Neural Revolution
                </Badge>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
                  Imagine
                </span>
                <br />
                <span className="text-foreground">A World Where</span>
                <br />
                <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                  Every Brain
                </span>
                <br />
                <span className="text-foreground">Reaches Its Peak</span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto">
                What if we could <span className="text-primary font-semibold">unlock human potential</span> across every field? 
                From racing drivers achieving perfect focus to researchers discovering breakthrough treatments—
                <span className="text-secondary font-semibold"> SkyBrain will make it possible.</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Button 
                onClick={() => setShowEcosystem(true)}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 px-12 py-6 text-xl font-semibold rounded-2xl"
              >
                <Zap className="h-6 w-6 mr-3" />
                Experience The Vision
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 px-12 py-6 text-xl font-semibold rounded-2xl"
              >
                <Activity className="h-6 w-6 mr-3" />
                See The Future
              </Button>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">10B+</div>
                  <div className="text-muted-foreground font-medium">Brains We'll Impact</div>
                  <div className="text-xs text-muted-foreground/70 mt-1">By 2035</div>
                </div>
              </div>
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-secondary/50 hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">100+</div>
                  <div className="text-muted-foreground font-medium">Industries Transformed</div>
                  <div className="text-xs text-muted-foreground/70 mt-1">Limitless Potential</div>
                </div>
              </div>
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-accent/50 hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">∞</div>
                  <div className="text-muted-foreground font-medium">Human Possibilities</div>
                  <div className="text-xs text-muted-foreground/70 mt-1">Unlimited Future</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Vision Showcase */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full">
                <Brain className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="text-foreground">The </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Neural Revolution
              </span>
              <br />
              <span className="text-foreground">We're Building</span>
            </h2>
            
            <p className="text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              Imagine a future where <span className="text-primary font-semibold">brain-computer interfaces</span> are as common as smartphones. 
              Where <span className="text-secondary font-semibold">every human thought</span> can be optimized, every mental barrier overcome, 
              and <span className="text-accent font-semibold">human potential</span> truly unleashed across all walks of life.
            </p>
          </div>

          {/* Future Possibilities Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                      <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Racing Excellence</h3>
                      <p className="text-muted-foreground">Formula 1 • NASCAR • MotoGP</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Imagine Formula 1 drivers with <span className="text-primary font-semibold">perfect cognitive control</span>—
                    never losing focus during a 300km/h turn, achieving millisecond-perfect reaction times, 
                    and maintaining peak performance for entire race weekends.
                  </p>
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <div className="text-sm text-primary font-semibold mb-1">Vision Impact</div>
                    <div className="text-sm text-muted-foreground">
                      Real-time cognitive enhancement • Predictive fatigue detection • Optimal zone maintenance
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-secondary/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-xl">
                      <Shield className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Mental Health Revolution</h3>
                      <p className="text-muted-foreground">Clinical • Therapeutic • Preventive</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Picture a world where <span className="text-secondary font-semibold">depression is detected weeks before symptoms appear</span>, 
                    where personalized brain training prevents anxiety, and where every person has 
                    <span className="text-accent font-semibold"> their own neural wellness coach</span>.
                  </p>
                  <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <div className="text-sm text-secondary font-semibold mb-1">Vision Impact</div>
                    <div className="text-sm text-muted-foreground">
                      Early intervention systems • Personalized therapy • Preventive mental healthcare
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-accent/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-accent to-primary rounded-xl">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Workplace Evolution</h3>
                      <p className="text-muted-foreground">Corporate • Remote • Productivity</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Envision offices where <span className="text-accent font-semibold">burnout becomes impossible</span>, 
                    where meeting effectiveness is maximized through real-time cognitive insights, 
                    and where <span className="text-primary font-semibold">every employee reaches their peak potential</span>.
                  </p>
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <div className="text-sm text-accent font-semibold mb-1">Vision Impact</div>
                    <div className="text-sm text-muted-foreground">
                      Stress prevention • Optimal focus states • Enhanced team collaboration
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                      <Brain className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Learning Transformation</h3>
                      <p className="text-muted-foreground">Education • Training • Development</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Imagine students who <span className="text-primary font-semibold">learn 10x faster</span> through optimized 
                    brain states, where every lesson is perfectly timed to cognitive readiness, 
                    and where <span className="text-secondary font-semibold">human potential is truly unlimited</span>.
                  </p>
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <div className="text-sm text-primary font-semibold mb-1">Vision Impact</div>
                    <div className="text-sm text-muted-foreground">
                      Accelerated learning • Optimal memory formation • Personalized education
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-border/50 group-hover:border-primary/50 transition-all duration-500">
                <h3 className="text-4xl font-bold text-foreground mb-6">
                  Ready to Shape the Future?
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  This isn't science fiction—it's the inevitable future we're building. 
                  Join us as we unlock human potential and revolutionize what it means to be human.
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Button 
                    onClick={() => setShowEcosystem(true)}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 px-12 py-6 text-xl font-semibold rounded-2xl"
                  >
                    <Brain className="h-6 w-6 mr-3" />
                    Explore The Platform
                  </Button>
                  <Button 
                    onClick={() => setShowTokenizer(!showTokenizer)}
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 px-12 py-6 text-xl font-semibold rounded-2xl"
                  >
                    <Coins className="h-6 w-6 mr-3" />
                    Try Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground mb-4">
              The Future Starts Here
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join us in building the neural revolution that will transform human potential forever.
            </p>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 SkyBrain Technologies Private Limited • Bengaluru, India
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              "Your brain, your data, your future"
            </p>
          </div>

        </div>
      </footer>



      {/* Session Tokenizer */}
      {showTokenizer && (
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-6">
            <SessionTokenizer 
              sessions={sessions} 
              onSessionUpdate={loadSessions}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default NeuroBank;