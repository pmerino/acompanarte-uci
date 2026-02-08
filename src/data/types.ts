import { MaterialIcons } from '@expo/vector-icons';

export type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export interface Condition {
  id: string;
  icon: MaterialIconName;
  color: string;
  colorLight: string;
}

export interface Device {
  id: string;
  icon: MaterialIconName;
  color: string;
  colorLight: string;
}

export interface InfoTopic {
  id: string;
  icon: MaterialIconName;
  color: string;
  colorLight: string;
}

export interface MoreMenuItem {
  id: string;
  route: string;
  icon: MaterialIconName;
  color: string;
  colorLight: string;
  titleKey: string;
  descriptionKey: string;
}
