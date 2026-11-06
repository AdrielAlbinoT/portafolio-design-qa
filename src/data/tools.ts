import type { ImageMetadata } from 'astro';
import { siClaude, siRive, siMiro } from 'simple-icons';
import figma from '../assets/tools/figma.png';
import illustrator from '../assets/tools/illustrator.png';
import photoshop from '../assets/tools/photoshop.png';
import chatgpt from '../assets/tools/chatgpt.png';
import linear from '../assets/tools/linear.png';
import capcut from '../assets/tools/capcut.png';
import notion from '../assets/tools/notion.png';

export interface Tool {
  id: string;
  name: string;
  /** Color del cuadro detrás del ícono */
  bg: string;
  /** Ícono en imagen (se sirve en WebP) */
  img?: ImageMetadata;
  /** Glifo SVG (path en viewBox 24x24) sobre el cuadro de color */
  path?: string;
  fill?: string;
}

// Orden de la lista de herramientas en "Acerca de mí".
export const tools: Tool[] = [
  { id: 'figma', name: 'Figma', bg: '#1E1E1E', img: figma },
  { id: 'photoshop', name: 'Photoshop', bg: '#001E36', img: photoshop },
  { id: 'illustrator', name: 'Illustrator', bg: '#330000', img: illustrator },
  { id: 'linear', name: 'Linear', bg: '#17181B', img: linear },
  { id: 'claude', name: 'Claude', bg: '#D97757', path: siClaude.path, fill: '#FFF4EC' },
  { id: 'chatgpt', name: 'ChatGPT', bg: '#74AA9C', img: chatgpt },
  { id: 'rive', name: 'Rive', bg: '#1D1D1D', path: siRive.path, fill: '#FFFFFF' },
  { id: 'capcut', name: 'CapCut', bg: '#0B0B0B', img: capcut },
  { id: 'notion', name: 'Notion', bg: '#FFFFFF', img: notion },
  { id: 'miro', name: 'Miro', bg: '#FFD02F', path: siMiro.path, fill: '#050038' },
];
