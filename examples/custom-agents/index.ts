import { OmniBrain } from '../../src/sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ProjectOutput } from '../../src/sdk/types';

async function createCustomAgentProject() {
  try {
    // Initialize wallet
    const wallet = new PhantomWalletAdapter();
    await wallet.connect();

    if (!wallet.publicKey) {
      throw new Error('Wallet connection failed');
    }

    // Initialize OmniBrain
    const brain = new OmniBrain({
      apiKey: process.env.OMNIBRAIN_API_KEY || 'your-api-key',
      wallet: wallet.publicKey.toString(),
      signMessage: async (message) => {
        return await wallet.signMessage(
          new TextEncoder().encode(message)
        );
      }
    });

    // Create a project with custom agent configuration
    const project = await brain.createProject({
      type: 'github',
      requirements: {
        description: 'Create a cross-platform mobile app with AI features',
        language: 'typescript',
        features: [
          'React Native implementation',
          'AI-powered image recognition',
          'Real-time chat with AI',
          'Voice commands',
          'Offline capabilities',
          'Cross-platform UI components'
        ],
        testing: true,
        documentation: true
      },
      agents: {
        coders: [
          {
            role: 'frontend',
            expertise: ['react-native', 'typescript', 'mobile-ui'],
            priority: 'performance'
          },
          {
            role: 'backend',
            expertise: ['node', 'tensorflow', 'websockets'],
            priority: 'security'
          },
          {
            role: 'fullstack',
            expertise: ['mobile', 'ai-integration', 'offline-first'],
            priority: 'maintainability'
          }
        ],
        artists: [
          {
            style: 'modern',
            focus: 'ui-components'
          },
          {
            style: 'minimal',
            focus: 'illustrations'
          }
        ],
        social: [
          {
            platforms: ['twitter'],
            tone: 'technical'
          }
        ]
      },
      output: {
        github: {
          organization: 'your-org',
          repository: 'ai-mobile-app',
          private: true,
          branch: 'main'
        },
        deployment: {
          platform: 'aws',
          configuration: {
            mobile: {
              service: 'amplify',
              framework: 'react-native'
            },
            ai: {
              service: 'sagemaker',
              models: ['image-recognition', 'nlp']
            },
            backend: {
              service: 'elastic-beanstalk',
              environment: 'nodejs'
            }
          }
        }
      }
    });

    // Set up custom monitoring for each agent type
    const monitorAgents = () => {
      // Monitor coders
      project.onAgentUpdate('coder-0', (update) => {
        console.log('Mobile UI Progress:', update.status);
        console.log('Current Task:', update.currentTask);
        if (update.codeChanges) {
          console.log('UI Changes:', update.codeChanges);
        }
      });

      project.onAgentUpdate('coder-1', (update) => {
        console.log('AI Integration Progress:', update.status);
        console.log('Current Task:', update.currentTask);
        if (update.codeChanges) {
          console.log('AI Module Changes:', update.codeChanges);
        }
      });

      // Monitor artists
      project.onAgentUpdate('artist-0', (update) => {
        console.log('UI Design Progress:', update.status);
        console.log('Current Task:', update.currentTask);
      });

      // Monitor social media
      project.onAgentUpdate('social-0', (update) => {
        console.log('Development Updates:', update.status);
        console.log('Current Post:', update.currentTask);
      });
    };

    monitorAgents();

    // Get AI integration suggestions
    const suggestions = await project.getAgentSuggestions('coder-1', {
      context: 'ai-architecture',
      constraints: ['mobile-performance', 'offline-capability']
    });
    console.log('AI Integration Suggestions:', suggestions);

    // Wait for completion
    const result = await project.waitForCompletion() as ProjectOutput;
    console.log('Project Completed!');
    console.log('GitHub Repository:', result.githubUrl);
    console.log('Deployment Details:', result.deploymentUrl);

    // Export comprehensive report
    await project.exportReport({
      format: 'pdf',
      sections: ['summary', 'agent-activities', 'code-changes', 'deployment']
    });

    // Get detailed analytics
    const analytics = await project.getAnalytics();
    console.log('Project Analytics:', {
      development: {
        time: analytics.timeBreakdown.development,
        efficiency: analytics.agentMetrics.map(m => ({
          agent: m.agentId,
          success: m.successRate
        }))
      },
      resources: analytics.resourceUsage,
      timeline: {
        planning: analytics.timeBreakdown.planning,
        development: analytics.timeBreakdown.development,
        testing: analytics.timeBreakdown.testing,
        deployment: analytics.timeBreakdown.deployment
      }
    });

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

// Run the example
createCustomAgentProject().catch(console.error);
