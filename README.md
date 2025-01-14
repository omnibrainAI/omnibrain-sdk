# OmniBrain SDK

OmniBrain is an advanced AI agent collaboration system that enables developers to leverage multiple specialized AI agents for complex project development. This repository provides the core SDK and examples for integrating OmniBrain's AI agents into your own applications.

## 🚀 Quick Start

```bash
# Install the SDK
npm install omnibrain-sdk

# Initialize with your API key
import { OmniBrain } from 'omnibrain-sdk';

const brain = new OmniBrain({
  apiKey: 'your-api-key',
  wallet: 'your-solana-wallet-address'
});

// Start a new project
const project = await brain.createProject({
  type: 'website',
  requirements: {
    description: 'Create a modern e-commerce site with React and Node.js',
    features: [
      'Product catalog',
      'Shopping cart',
      'User authentication'
    ]
  },
  agents: {
    coders: 3,  // Number of coding agents
    artists: 1, // Number of design agents
    social: 1   // Number of social media agents
  }
});

// Monitor progress
project.onAgentUpdate('coder-1', (update) => {
  console.log('Status:', update.status);
  console.log('Current task:', update.currentTask);
  console.log('Code changes:', update.codeChanges);
});

// Get final output
const result = await project.waitForCompletion();
console.log('GitHub Repository:', result.githubUrl);
console.log('Deployment URL:', result.deploymentUrl);
```

## 🛠️ Features

- **Multi-Agent Collaboration**: Coordinate between Coding, Artist, and Social Media AI agents
- **Automated Project Development**: From repository creation to social media management
- **Secure Authentication**: Built-in Solana wallet integration for secure access
- **Flexible Output Formats**: Receive deliverables as GitHub repos, websites, or content

## 📚 Documentation

For detailed documentation, visit [docs.omnibrain.fun](https://docs.omnibrain.fun).

### Agent Types

1. **Coding Agents**
   - Repository setup and structure
   - Code generation and optimization
   - Testing and debugging
   - Documentation generation

2. **Artist Agents**
   - UI/UX design
   - Asset creation
   - Style optimization
   - Visual consistency

3. **Social Media Agents**
   - Content strategy
   - Post generation
   - Engagement monitoring
   - Analytics tracking

### Project Types

```typescript
// Website Development
interface WebsiteProject {
  type: 'website';
  requirements: {
    description: string;
    features: string[];
    design?: {
      theme?: 'modern' | 'minimal' | 'corporate';
      colorScheme?: string[];
      responsive?: boolean;
    };
    tech?: {
      frontend?: string[];
      backend?: string[];
      database?: string;
    };
  };
}

// GitHub Repository
interface GitHubProject {
  type: 'github';
  requirements: {
    description: string;
    language: string;
    features: string[];
    testing?: boolean;
    documentation?: boolean;
  };
}

// Social Media Campaign
interface SocialProject {
  type: 'social';
  requirements: {
    description: string;
    platforms: ('twitter' | 'linkedin' | 'instagram')[];
    duration: number;
    postsPerDay?: number;
    tone?: 'professional' | 'casual' | 'technical';
  };
}
```

## 🔒 Security

The SDK uses Solana wallet authentication to ensure secure access to the AI agents:

```typescript
import { OmniBrain } from 'omnibrain-sdk';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

// Initialize wallet adapter
const wallet = new PhantomWalletAdapter();
await wallet.connect();

// Initialize OmniBrain with wallet
const brain = new OmniBrain({
  apiKey: process.env.OMNIBRAIN_API_KEY,
  wallet: wallet.publicKey.toString(),
  signMessage: async (message) => {
    return await wallet.signMessage(
      new TextEncoder().encode(message)
    );
  }
});
```

## 📊 Monitoring and Analytics

```typescript
// Get project analytics
const analytics = await project.getAnalytics();
console.log('Agent performance:', analytics.agentMetrics);
console.log('Resource usage:', analytics.resourceUsage);
console.log('Time breakdown:', analytics.timeBreakdown);

// Export detailed report
await project.exportReport({
  format: 'pdf',
  sections: ['summary', 'agent-activities', 'code-changes', 'deployment']
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Examples

Check out our [examples](examples/) directory for complete implementation samples:

- [Basic Website Creation](examples/basic-website/)
- [Full-Stack Application](examples/full-stack-app/)
- [Social Media Campaign](examples/social-campaign/)
- [Custom Agent Configuration](examples/custom-agents/)

## 🤔 Support

- [Documentation](https://docs.omnibrain.fun)
- [GitHub Issues](https://github.com/omnibrainai/omnibrain-sdk/issues)
- [Discord Community](https://discord.gg/omnibrain)
