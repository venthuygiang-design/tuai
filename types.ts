export type TabId = 'spy' | 'script' | 'studio' | 'seo' | 'market';

export interface AppState {
    activeTab: TabId;
    apiKey: string;
    isSettingsOpen: boolean;
}

export interface ScriptData {
    topic: string;
    duration: number;
    language: string;
    style: string;
}

export interface GeneratedContent {
    text?: string;
    image?: string;
    error?: string;
    isLoading: boolean;
}

export interface SeoChecklist {
    id: string;
    label: string;
    checked: boolean;
}
