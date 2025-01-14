import { OmniBrain } from '../../src/sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

async function createBasicWebsite() {
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

    // Create a new website project
    const project = await brain.createProject({
      type: 'website',
      requirements: {
        description: 'Create a modern landing page for a SaaS product',
        features: [
          'Responsive hero section',
          'Feature showcase',
          'Pricing plans',
          'Contact form',
          'Newsletter signup'
        ],
        design: {
          theme: 'modern',
          colorScheme: ['#1a1a1a', '#ffffff', '#3498db'],
          responsive: true
        },
        tech: {
          frontend: ['react', 'typescript', 'tailwind'],
          backend: ['node', 'express'],
          database: 'postgresql'
        }
      },
      agents: {
        coders: [
          {
            role: 'frontend',
            expertise: ['react', 'typescript', 'tailwind'],
            priority: 'performance'
          },
          {
            role: 'backend',
            expertise: ['node', 'express', 'postgresql'],
            priority: 'security'
          }
        ],
        artists: [
          {
            style: 'modern',
            focus: 'ui-components'
          }
        ]
      },
      output: {
        github: {
          organization: 'your-org',
          repository: 'saas-landing',
          private: false
        },
        deployment: {
          platform: 'vercel',
          configuration: {
            framework: 'next',
            environmentVariables: {
              DATABASE_URL: '${process.env.DATABASE_URL}'
            }
          }
        }
      }
    });

    // Monitor individual agents
    project.onAgentUpdate('coder-0', (update) => {
      console.log('Frontend Developer Status:', update.status);
      console.log('Current Task:', update.currentTask);
      if (update.codeChanges) {
        console.log('Code Changes:', update.codeChanges);
      }
    });

    project.onAgentUpdate('artist-0', (update) => {
      console.log('UI Designer Status:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    // Get design suggestions
    const suggestions = await project.getAgentSuggestions('artist-0', {
      context: 'hero-section',
      constraints: ['brand-guidelines', 'modern-minimal']
    });
    console.log('Design Suggestions:', suggestions);

    // Wait for project completion
    const result = await project.waitForCompletion();
    console.log('Project Completed!');
    console.log('GitHub Repository:', result.githubUrl);
    console.log('Deployment URL:', result.deploymentUrl);

    // Get project analytics
    const analytics = await project.getAnalytics();
    console.log('Project Analytics:', {
      totalTime: analytics.timeBreakdown.development + analytics.timeBreakdown.planning,
      resourcesUsed: analytics.resourceUsage,
      agentPerformance: analytics.agentMetrics
    });

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

// Run the example
createBasicWebsite().catch(console.error);
