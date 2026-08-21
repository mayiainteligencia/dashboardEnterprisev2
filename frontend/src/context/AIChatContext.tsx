import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LLMMessage, LLMConfig } from '../services/aiChatService';
import { getStoredLLMConfig, saveLLMConfig, sendLLMMessage } from '../services/aiChatService';

interface AIChatContextType {
  messages: LLMMessage[];
  loading: boolean;
  activeSection: string;
  activeSectionTitle: string;
  setActiveSectionContext: (id: string, title: string) => void;
  sendMessage: (prompt: string, customContext?: string) => Promise<void>;
  clearHistory: () => void;
  config: LLMConfig;
  updateConfig: (newConfig: Partial<LLMConfig>) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

const INITIAL_MESSAGES: LLMMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: '¡Hola! Soy **MAYIA**, la Inteligencia Artificial Comercial y Operativa de **FSPM** (Fire Safety & Protection Management). Estoy conectada en tiempo real con tu catálogo de sistemas contra incendio (FireAde, CAFS, SPCI), licitaciones públicas/privadas (PEMEX, CFE, ASA), cotizaciones y Google Workspace. ¿En qué oportunidad o procedimiento te puedo asistir hoy?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<LLMMessage[]>(() => {
    try {
      const saved = localStorage.getItem('MAYIA_CHAT_HISTORY_FSPM');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading saved chat history:', e);
    }
    return INITIAL_MESSAGES;
  });

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSectionTitle, setActiveSectionTitle] = useState('Dashboard FSPM');
  const [config, setConfigState] = useState<LLMConfig>(getStoredLLMConfig());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('MAYIA_CHAT_HISTORY_FSPM', JSON.stringify(messages));
    } catch (e) {
      console.warn('Error saving chat history:', e);
    }
  }, [messages]);

  const setActiveSectionContext = (id: string, title: string) => {
    setActiveSection(id);
    setActiveSectionTitle(title);
  };

  const updateConfig = (newConfig: Partial<LLMConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfigState(updated);
    saveLLMConfig(updated);
  };

  const sendMessage = async (prompt: string, customContext?: string) => {
    if (!prompt.trim() || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: LLMMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt.trim(),
      timestamp: userTime,
      moduleContext: customContext || activeSectionTitle,
    };

    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: LLMMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moduleContext: customContext || activeSectionTitle,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setLoading(true);

    try {
      const contextName = customContext || `${activeSectionTitle} (sección: ${activeSection})`;
      await sendLLMMessage(
        messages,
        prompt.trim(),
        contextName,
        (partialText) => {
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: partialText } : m));
        }
      );
    } catch (err: any) {
      setMessages(prev => prev.map(m => m.id === assistantId ? {
        ...m,
        content: `⚠️ No fue posible procesar la consulta con el LLM: ${err.message || 'Error de conexión'}.`
      } : m));
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <AIChatContext.Provider
      value={{
        messages,
        loading,
        activeSection,
        activeSectionTitle,
        setActiveSectionContext,
        sendMessage,
        clearHistory,
        config,
        updateConfig,
        isChatOpen,
        setIsChatOpen,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}
