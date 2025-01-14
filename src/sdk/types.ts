// Project Configuration Types
export interface ProjectConfig {
  type: 'website' | 'github' | 'social';
  requirements: WebsiteRequirements | GitHubRequirements | SocialRequirements;
  agents: AgentConfig;
  output?: OutputConfig;
}

export interface WebsiteRequirements {
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
}

export interface GitHubRequirements {
  description: string;
  language: string;
  features: string[];
  testing?: boolean;
  documentation?: boolean;
}

export interface SocialRequirements {
  description: string;
  platforms: ('twitter' | 'linkedin' | 'instagram')[];
  duration: number;
  postsPerDay?: number;
  tone?: 'professional' | 'casual' | 'technical';
}

export interface AgentConfig {
  coders?: number | CoderAgentConfig[];
  artists?: number | ArtistAgentConfig[];
  social?: number | SocialAgentConfig[];
}

export interface CoderAgentConfig {
  role: 'frontend' | 'backend' | 'fullstack';
  expertise: string[];
  priority: 'performance' | 'security' | 'maintainability';
}

export interface ArtistAgentConfig {
  style: 'modern' | 'minimal' | 'corporate';
  focus: 'ui-components' | 'illustrations' | 'branding';
}

export interface SocialAgentConfig {
  platforms: ('twitter' | 'linkedin' | 'instagram')[];
  tone: 'professional' | 'casual' | 'technical';
}

export interface OutputConfig {
  github?: {
    organization: string;
    repository: string;
    private?: boolean;
    branch?: string;
  };
  deployment?: {
    platform: 'vercel' | 'netlify' | 'aws';
    configuration: Record<string, any>;
  };
}

// Project Status Types
export interface ProjectStatus {
  completed: boolean;
  error?: string;
  progress: number;
  activeTasks: TaskStatus[];
  output?: ProjectOutput;
}

export interface TaskStatus {
  agentId: string;
  task: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export interface ProjectOutput {
  githubUrl?: string;
  deploymentUrl?: string;
  socialPosts?: SocialPost[];
  assets?: Asset[];
}

export interface SocialPost {
  platform: string;
  content: string;
  scheduledTime: string;
  media?: Asset[];
}

export interface Asset {
  type: 'image' | 'video' | 'document';
  url: string;
  metadata: Record<string, any>;
}

// Agent Update Types
export interface AgentUpdate {
  agentId: string;
  status: 'active' | 'idle' | 'error';
  currentTask?: string;
  codeChanges?: CodeChange[];
  progress: number;
}

export interface CodeChange {
  file: string;
  type: 'add' | 'modify' | 'delete';
  diff?: string;
  commit?: string;
}

// Analytics Types
export interface AnalyticsData {
  agentMetrics: AgentMetrics[];
  resourceUsage: ResourceUsage;
  timeBreakdown: TimeBreakdown;
}

export interface AgentMetrics {
  agentId: string;
  tasksCompleted: number;
  averageTaskTime: number;
  successRate: number;
}

export interface ResourceUsage {
  computeTime: number;
  apiCalls: number;
  storageUsed: number;
}

export interface TimeBreakdown {
  planning: number;
  development: number;
  testing: number;
  deployment: number;
}

// Report Types
export interface ReportConfig {
  format: 'pdf' | 'html' | 'json';
  sections: ReportSection[];
}

export type ReportSection = 
  | 'summary'
  | 'agent-activities'
  | 'code-changes'
  | 'deployment';

// Feedback Types
export interface AgentFeedback {
  type: 'revision' | 'suggestion' | 'approval';
  description: string;
  priority: 'low' | 'medium' | 'high';
}

// Suggestion Types
export interface AgentSuggestionConfig {
  context: string;
  constraints: string[];
}
