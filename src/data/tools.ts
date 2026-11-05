import type { ImageMetadata } from 'astro';
import { siClaude, siRive, siMiro } from 'simple-icons';
import figma from '../assets/tools/figma.png';
import illustrator from '../assets/tools/illustrator.png';
import photoshop from '../assets/tools/photoshop.png';
import chatgpt from '../assets/tools/chatgpt.png';
import linear from '../assets/tools/linear.png';

export interface Tool {
  id: string;
  name: string;
  /** Color del cuadro detrás del ícono */
  bg: string;
  /** Ícono oficial en imagen (se sirve en WebP) */
  img?: ImageMetadata;
  /** Glifo SVG (path en viewBox 24x24) sobre el cuadro de color */
  path?: string;
  fill?: string;
}

// [PENDIENTE: imagen oficial de CapCut en portafolio-imagenes/logos-tools; el glifo es una aproximación]
const capcut = 'M3.5 7.2 11 3.5v4.2L8 9.2v5.6l3 1.5v4.2l-7.500-3.700zM13 3.500l7.500 3.700v9.600L13 20.500v-4.200l4-2V9.700l-4-2z';

export const tools: Tool[] = [
  { id: 'figma', name: 'Figma', bg: '#1E1E1E', img: figma },
  { id: 'claude', name: 'Claude', bg: '#D97757', path: siClaude.path, fill: '#FFF4EC' },
  { id: 'photoshop', name: 'Photoshop', bg: '#001E36', img: photoshop },
  { id: 'linear', name: 'Linear', bg: '#17181B', img: linear },
  { id: 'chatgpt', name: 'ChatGPT', bg: '#74AA9C', img: chatgpt },
  { id: 'illustrator', name: 'Illustrator', bg: '#330000', img: illustrator },
  { id: 'rive', name: 'Rive', bg: '#1D1D1D', path: siRive.path, fill: '#FFFFFF' },
  { id: 'miro', name: 'Miro', bg: '#FFD02F', path: siMiro.path, fill: '#050038' },
  { id: 'capcut', name: 'CapCut', bg: '#0B0B0B', path: capcut, fill: '#FFFFFF' },
];
