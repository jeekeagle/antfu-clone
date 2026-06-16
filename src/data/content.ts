/**
 * 照片、赞助者、播客、Demos 数据（中文）
 */

export interface Photo {
  id: string
  title: string
  date: string
  // 留空：本地站不放真实图，使用占位色块
  color?: string
  tags?: string[]
}

export const photos: Photo[] = [
  { id: 'p1', title: '日落山峦', date: '2025-11-12', color: '#f59e0b' },
  { id: 'p2', title: '老巷子', date: '2025-09-30', color: '#64748b' },
  { id: 'p3', title: '咖啡特写', date: '2025-08-18', color: '#92400e' },
  { id: 'p4', title: '城市灯火', date: '2025-07-22', color: '#1e3a8a' },
  { id: 'p5', title: '林间小路', date: '2025-06-10', color: '#15803d' },
  { id: 'p6', title: '雪后屋顶', date: '2025-02-04', color: '#cbd5e1' },
  { id: 'p7', title: '雾中湖畔', date: '2024-12-15', color: '#0e7490' },
  { id: 'p8', title: '春日繁花', date: '2024-04-08', color: '#db2777' },
]

export interface Sponsor {
  name: string
  amount: string
  href?: string
  tier?: 'gold' | 'silver' | 'bronze' | 'past'
}

export const sponsors: Sponsor[] = [
  { name: '赞助人 A', amount: '¥300 / 月', tier: 'gold', href: '#' },
  { name: '赞助人 B', amount: '¥100 / 月', tier: 'silver', href: '#' },
  { name: '赞助人 C', amount: '¥50 / 月', tier: 'silver', href: '#' },
  { name: '赞助人 D', amount: '¥30 / 月', tier: 'bronze', href: '#' },
  { name: '赞助人 E', amount: '¥30 / 月', tier: 'bronze', href: '#' },
  { name: '赞助人 F', amount: '一次性 ¥500', tier: 'past', href: '#' },
  { name: '赞助人 G', amount: '一次性 ¥300', tier: 'past', href: '#' },
  { name: '赞助人 H', amount: '一次性 ¥100', tier: 'past', href: '#' },
  { name: '赞助人 I', amount: '一次性 ¥100', tier: 'past', href: '#' },
  { name: '赞助人 J', amount: '一次性 ¥50', tier: 'past', href: '#' },
]

export interface Podcast {
  name: string
  desc: string
  href: string
  icon: string
}

export const podcasts: Podcast[] = [
  {
    name: '我的播客',
    desc: '和有意思的技术人聊天。',
    href: 'https://example.com',
    icon: 'i-ri-mic-line',
  },
  {
    name: '联合主持的节目',
    desc: '一档聊设计的副业播客。',
    href: 'https://example.com',
    icon: 'i-ri-headphone-line',
  },
]

export interface Demo {
  name: string
  desc: string
  href: string
  tags: string[]
}

export const demos: Demo[] = [
  { name: '生成式网格', desc: '程序化生成的网格图案。', href: '#', tags: ['艺术', 'canvas'] },
  { name: '声音可视化', desc: '实时音频波形。', href: '#', tags: ['音频', 'webgl'] },
  { name: '粒子场', desc: '可交互的粒子模拟。', href: '#', tags: ['物理'] },
  { name: '混色器', desc: '丝滑的颜色插值工具。', href: '#', tags: ['颜色'] },
  { name: '字体小游戏', desc: '一个小小的字体排版游乐场。', href: '#', tags: ['字体'] },
  { name: '磁性光标', desc: '磁性吸附光标实验。', href: '#', tags: ['交互'] },
]
