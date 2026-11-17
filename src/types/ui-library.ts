export interface UIComponentItem {
  id: string;
  slug: string;
  name: string;
  category: 'Buttons' | 'Cards' | 'Animations' | 'Text' | 'Navbars' | 'Inputs';
  description: string;
  codeSnippet: string;
  previewUrl?: string;
  published: boolean;
  tags: string[];
}
