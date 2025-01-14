import { OmniBrain } from '../../src/sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ProjectOutput } from '../../src/sdk/types';

async function createSocialCampaign() {
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

    // Create a social media campaign project
    const project = await brain.createProject({
      type: 'social',
      requirements: {
        description: 'Launch campaign for new AI product',
        platforms: ['twitter', 'linkedin'],
        duration: 30, // days
        postsPerDay: 3,
        tone: 'professional'
      },
      agents: {
        social: [
          {
            platforms: ['twitter'],
            tone: 'technical'
          },
          {
            platforms: ['linkedin'],
            tone: 'professional'
          }
        ],
        artists: [
          {
            style: 'modern',
            focus: 'illustrations'
          }
        ]
      }
    });

    // Monitor campaign progress
    project.onAgentUpdate('social-0', (update) => {
      console.log('Twitter Agent Status:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    project.onAgentUpdate('social-1', (update) => {
      console.log('LinkedIn Agent Status:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    project.onAgentUpdate('artist-0', (update) => {
      console.log('Graphics Designer Status:', update.status);
      console.log('Current Task:', update.currentTask);
    });

    // Get content suggestions
    const suggestions = await project.getAgentSuggestions('social-0', {
      context: 'product-launch',
      constraints: ['technical-audience', 'engagement-focused']
    });
    console.log('Content Suggestions:', suggestions);

    // Wait for completion
    const result = await project.waitForCompletion() as ProjectOutput;
    console.log('Campaign Completed!');
    if (result.socialPosts) {
      console.log('Total Posts Created:', result.socialPosts.length);
      console.log('Sample Posts:', result.socialPosts.slice(0, 3));
    }
    if (result.assets) {
      console.log('Total Assets Created:', result.assets.length);
      console.log('Asset Types:', result.assets.map(asset => asset.type));
    }

    // Export campaign report
    await project.exportReport({
      format: 'pdf',
      sections: ['summary', 'agent-activities', 'deployment']
    });

    // Get campaign analytics
    const analytics = await project.getAnalytics();
    console.log('Campaign Analytics:', {
      totalTime: analytics.timeBreakdown.planning + analytics.timeBreakdown.development,
      resourcesUsed: analytics.resourceUsage,
      agentPerformance: analytics.agentMetrics
    });

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
}

// Run the example
createSocialCampaign().catch(console.error);
