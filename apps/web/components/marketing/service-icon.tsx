import type { ComponentType } from 'react'
import {
  Building2,
  Cloud,
  Globe,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  Layers,
  LifeBuoy,
  MessageSquare,
  PackageCheck,
  Palette,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Users,
  Wallet,
} from 'lucide-react'

import { AndroidMark, AppleMark } from './brand-icons'

/**
 * One icon registry for the whole site.
 *
 * Content files name an icon by string, so editing copy never means touching
 * a component import — and the header, the cards and the filter chips all
 * resolve the same name to the same glyph.
 */
/* Not LucideIcon: the platform entries are the real brand marks, which take
   a size but no stroke width. The registry only ever needs `size`. */
const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  apple: AppleMark,
  android: AndroidMark,
  smartphone: Smartphone,
  layers: Layers,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  palette: Palette,
  lifebuoy: LifeBuoy,
  wallet: Wallet,
  truck: Truck,
  'shopping-bag': ShoppingBag,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  'message-square': MessageSquare,
  'package-check': PackageCheck,
  users: Users,
  'shield-check': ShieldCheck,
  grid: LayoutGrid,
}

export function ServiceIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Component = ICONS[name] ?? Layers
  return <Component size={size} />
}
