import { EventEmitter } from 'events';
import { 
  ProjectConfig, 
  ProjectStatus, 
  AgentUpdate, 
  AnalyticsData,
  ReportConfig,
  AgentFeedback,
  AgentSuggestionConfig
} from './types';

export class OmniBrain {
  private apiKey: string;
  private wallet: string;
  private signMessage?: (message: string) => Promise<Uint8Array>;
  private baseUrl = 'https://api.omnibrain.fun/v1';

  constructor(config: {
    apiKey: string;
    wallet: string;
    signMessage?: (message: string) => Promise<Uint8Array>;
  }) {
    this.apiKey = config.apiKey;
    this.wallet = config.wallet;
    this.signMessage = config.signMessage;
  }

  protected async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Wallet-Address': this.wallet
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  async createProject(config: ProjectConfig) {
    const response = await this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(config)
    });

    return new Project(response.projectId, this);
  }

  async listProjects() {
    return this.request('/projects');
  }
}

export class Project extends EventEmitter {
  private id: string;
  private brain: OmniBrain;

  constructor(id: string, brain: OmniBrain) {
    super();
    this.id = id;
    this.brain = brain;
  }

  async getStatus(): Promise<ProjectStatus> {
    const response = await (this.brain as any).request(`/projects/${this.id}/status`);
    return response as ProjectStatus;
  }

  onAgentUpdate(agentId: string, callback: (update: AgentUpdate) => void) {
    this.on(`agent:${agentId}`, callback);
    return () => this.off(`agent:${agentId}`, callback);
  }

  async sendFeedback(agentId: string, feedback: AgentFeedback) {
    return (this.brain as any).request(`/projects/${this.id}/agents/${agentId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback)
    });
  }

  async getAgentSuggestions(agentId: string, config: AgentSuggestionConfig) {
    return (this.brain as any).request(`/projects/${this.id}/agents/${agentId}/suggestions`, {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  async getAnalytics(): Promise<AnalyticsData> {
    return (this.brain as any).request(`/projects/${this.id}/analytics`);
  }

  async exportReport(config: ReportConfig) {
    return (this.brain as any).request(`/projects/${this.id}/report`, {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  async waitForCompletion() {
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        try {
          const status = await this.getStatus();
          if (status.completed) {
            resolve(status.output);
          } else if (status.error) {
            reject(new Error(status.error));
          } else {
            setTimeout(checkStatus, 5000);
          }
        } catch (error) {
          reject(error);
        }
      };
      checkStatus();
    });
  }
}

export default OmniBrain;
