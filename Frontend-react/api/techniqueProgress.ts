import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'techniquesProgress';

export type TechniqueProgress = {
  status: 'started' | 'finished';
  started_at: string;
  finished_at?: string | null;
};

// Get all progress
export const getAllProgress = async (): Promise<Record<string, TechniqueProgress>> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

// Start a technique
export const startTechnique = async (techniqueId: number) => {
  const progress = await getAllProgress();
  progress[techniqueId] = {
    status: 'started',
    started_at: new Date().toISOString(),
    finished_at: null,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

// Finish a technique
export const finishTechnique = async (techniqueId: number) => {
  const progress = await getAllProgress();
  if (progress[techniqueId]) {
    progress[techniqueId].status = 'finished';
    progress[techniqueId].finished_at = new Date().toISOString();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

// Get progress of a single technique
export const getTechniqueProgress = async (techniqueId: number): Promise<TechniqueProgress | null> => {
  const progress = await getAllProgress();
  return progress[techniqueId] || null;
};
