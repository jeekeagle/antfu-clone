/**
 * 个人简介数据 —— 中文版
 * 复刻 antfu.me 首页的"X of Y"结构
 * 把占位文字替换为你的真实信息即可
 */

export const profile = {
  name: '你的名字',
  handle: 'yourname',
  email: 'hi@yourname.dev',
  domain: 'yourname.dev',
  bio: '你好！我是你的名字，一个痴迷开源的设计工程师。',
  location: '地球上某处',

  // Working at —— 就职于
  work: [
    { name: '你的公司', href: 'https://example.com', avatar: '' },
    { name: '你的项目', href: 'https://example.com', avatar: '' },
  ],

  // Creator of —— 我创造了
  creator: [
    { name: '项目一', href: 'https://example.com', avatar: '' },
    { name: '项目二', href: 'https://example.com', avatar: '' },
    { name: '项目三', href: 'https://example.com', avatar: '' },
    { name: '项目四', href: 'https://example.com', avatar: '' },
  ],

  // Core team of —— 核心团队成员
  coreTeam: [
    { name: '框架 A', href: 'https://example.com', avatar: '' },
    { name: '框架 B', href: 'https://example.com', avatar: '' },
  ],

  // Maintaining —— 维护中
  maintaining: [
    { name: '工具 X', href: 'https://example.com', avatar: '' },
    { name: '工具 Y', href: 'https://example.com', avatar: '' },
  ],

  // 社交
  socials: [
    { name: 'GitHub', href: 'https://github.com', icon: 'i-simple-icons-github' },
    { name: '知乎', href: 'https://zhihu.com', icon: 'i-simple-icons-zhihu' },
    { name: '微博', href: 'https://weibo.com', icon: 'i-simple-icons-sinaweibo' },
    { name: 'X', href: 'https://x.com', icon: 'i-ri-twitter-x-fill' },
    { name: 'B站', href: 'https://bilibili.com', icon: 'i-simple-icons-bilibili' },
  ],

  // 赞助
  sponsors: [
    { name: '赞助开源生态', href: 'https://opencollective.com', icon: 'i-ph-hand-heart-duotone', class: 'btn-rose' },
    { name: '直接赞助我', href: 'https://github.com/sponsors', icon: 'i-ph-heart-duotone', class: 'btn-rose' },
    { name: '在爱发电上支持我', href: 'https://afdian.com', icon: 'i-ph-lightning-duotone', class: 'btn-yellow' },
  ],
}
