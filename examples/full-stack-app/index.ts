import { OmniBrain } from '../../src/sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

async function createFullStackApp() {
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

    // Create a full-stack application project
    const project = await brain.createProject({
      type: 'github',
      requirements: {
        description: 'Create a full-stack e-commerce application',
        language: 'typescript',
        features: [
          'User authentication and authorization',
          'Product catalog with search and filters',
          'Shopping cart and checkout',
          'Order management',
          'Admin dashboard',
          'Payment integration',
          'Real-time inventory updates'
        ],
        testing: true,
        documentation: true
      },
      agents: {
        coders: [
          {
            role: 'frontend',
            expertise: ['react', 'typescript', 'redux'],
            priority: 'performance'
          },
          {
            role: 'backend',
            expertise: ['node', 'postgresql', 'graphql'],
            priority: 'security'
          },
          {
            role: 'fullstack',
            expertise: ['devops', 'testing', 'documentation'],
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
        ]
      },
      output: {
        github: {
          organization: 'your-org',
          repository: 'ecommerce-platform',
          private: true,
          branch: 'development'
        },
        deployment: {
          platform: 'aws',
          configuration: {
            frontend: {
              service: 'amplify',
              framework: 'next'
            },
            backend: {
              service: 'elastic-beanstalk',
              environment: 'nodejs'
            },
            database: {
              service: 'rds',
              engine: 'postgresql'
            }
          }
        }
      }
    });

    // Monitor development progress
    project.onAgentUpdate('coder-0', (update) => {
      console.log('Frontend Progress:', update.status);
      console.log('Current Task:', update.currentTask);
      if (update.codeChanges) {
        console.log('Code Changes:', update.codeChanges);
      }
    });

    project.onAgentUpdate('coder-1', (update) => {
      console.log('Backend Progress:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    project.onAgentUpdate('coder-2', (update) => {
      console.log('DevOps Progress:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    // Get architecture suggestions
    const suggestions = await project.getAgentSuggestions('coder-1', {
      context: 'database-schema',
      constraints: ['performance', 'scalability']
    });
    console.log('Architecture Suggestions:', suggestions);

    // Wait for completion
    const result = await project.waitForCompletion();
    console.log('Project Completed!');
    console.log('GitHub Repository:', result.githubUrl);
    console.log('Deployment URL:', result.deploymentUrl);

    // Export documentation
    await project.exportReport({
      format: 'pdf',
      sections: ['summary', 'architecture', 'api-docs', 'deployment']
    });

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

// Run the example
createFullStackApp().catch(console.error);
