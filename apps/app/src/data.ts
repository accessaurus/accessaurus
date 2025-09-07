export async function getPageOptimization(id: string) {
  return (await getPageOptimizations()).find((page) => page.id.toString() === id)!
}

export async function getRecentOptimizations() {
  return (await getPageOptimizations()).slice(0, 10)
}

export async function getPageOptimizations() {
  return [
    {
      id: 3000,
      url: '/optimizations/3000',
      date: 'Dec 9, 2024',
      pageUrl: 'https://example.com/blog/accessibility-guide',
      pageTitle: 'Complete Guide to Web Accessibility',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'Article',
        metaTagsUpdated: 8,
        accessibilityFeatures: 5,
      },
      customer: {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        company: 'TechCorp Inc',
        plan: 'Pro',
      },
    },
    {
      id: 3001,
      url: '/optimizations/3001',
      date: 'Dec 8, 2024',
      pageUrl: 'https://store.example.com/product/widget',
      pageTitle: 'Premium Widget - Buy Online',
      status: 'optimized',
      metrics: {
        wcagScore: '98%',
        schemaGenerated: 'Product',
        metaTagsUpdated: 12,
        accessibilityFeatures: 6,
      },
      customer: {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        company: 'E-Store Solutions',
        plan: 'Enterprise',
      },
    },
    {
      id: 3002,
      url: '/optimizations/3002',
      date: 'Dec 8, 2024',
      pageUrl: 'https://events.example.com/conference-2024',
      pageTitle: 'Tech Conference 2024',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'Event',
        metaTagsUpdated: 10,
        accessibilityFeatures: 7,
      },
      customer: {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        company: 'EventHub',
        plan: 'Pro',
      },
    },
    {
      id: 3003,
      url: '/optimizations/3003',
      date: 'Dec 7, 2024',
      pageUrl: 'https://help.example.com/faq',
      pageTitle: 'Frequently Asked Questions',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'FAQPage',
        metaTagsUpdated: 6,
        accessibilityFeatures: 4,
      },
      customer: {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        company: 'Support Central',
        plan: 'Starter',
      },
    },
    {
      id: 3004,
      url: '/optimizations/3004',
      date: 'Dec 7, 2024',
      pageUrl: 'https://docs.example.com/tutorial',
      pageTitle: 'Getting Started Tutorial',
      status: 'partial',
      metrics: {
        wcagScore: '85%',
        schemaGenerated: 'HowTo',
        metaTagsUpdated: 7,
        accessibilityFeatures: 3,
      },
      customer: {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        company: 'DocuMate',
        plan: 'Pro',
      },
    },
    {
      id: 3005,
      url: '/optimizations/3005',
      date: 'Dec 6, 2024',
      pageUrl: 'https://news.example.com/latest-updates',
      pageTitle: 'Latest Industry Updates',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'NewsArticle',
        metaTagsUpdated: 9,
        accessibilityFeatures: 5,
      },
      customer: {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        company: 'NewsWire',
        plan: 'Enterprise',
      },
    },
    {
      id: 3006,
      url: '/optimizations/3006',
      date: 'Dec 6, 2024',
      pageUrl: 'https://shop.example.com/category/electronics',
      pageTitle: 'Electronics - Shop Online',
      status: 'optimized',
      metrics: {
        wcagScore: '95%',
        schemaGenerated: 'ItemList',
        metaTagsUpdated: 8,
        accessibilityFeatures: 5,
      },
      customer: {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        company: 'MegaShop',
        plan: 'Pro',
      },
    },
    {
      id: 3007,
      url: '/optimizations/3007',
      date: 'Dec 5, 2024',
      pageUrl: 'https://blog.example.com/web-accessibility',
      pageTitle: 'Why Web Accessibility Matters',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'BlogPosting',
        metaTagsUpdated: 7,
        accessibilityFeatures: 6,
      },
      customer: {
        name: 'Leonard Krasner',
        email: 'leonard.krasner@example.com',
        company: 'BlogSpace',
        plan: 'Starter',
      },
    },
    {
      id: 3008,
      url: '/optimizations/3008',
      date: 'Dec 5, 2024',
      pageUrl: 'https://recipes.example.com/chocolate-cake',
      pageTitle: 'Best Chocolate Cake Recipe',
      status: 'failed',
      metrics: {
        wcagScore: '0%',
        schemaGenerated: null,
        metaTagsUpdated: 0,
        accessibilityFeatures: 0,
      },
      customer: {
        name: 'Floyd Miles',
        email: 'floyd.miles@example.com',
        company: 'RecipeHub',
        plan: 'Pro',
      },
    },
    {
      id: 3009,
      url: '/optimizations/3009',
      date: 'Dec 4, 2024',
      pageUrl: 'https://courses.example.com/web-development',
      pageTitle: 'Web Development Masterclass',
      status: 'optimized',
      metrics: {
        wcagScore: '100%',
        schemaGenerated: 'Course',
        metaTagsUpdated: 11,
        accessibilityFeatures: 8,
      },
      customer: {
        name: 'Emily Selman',
        email: 'emily.selman@example.com',
        company: 'LearnOnline',
        plan: 'Enterprise',
      },
    },
  ]
}

export async function getCustomers() {
  return [
    {
      id: 1,
      name: 'TechCorp Inc',
      email: 'admin@techcorp.com',
      plan: 'Pro',
      pagesOptimized: 245,
      monthlyUsage: '12,450',
      wcagCompliance: '98.5%',
      status: 'active',
    },
    {
      id: 2,
      name: 'E-Store Solutions',
      email: 'contact@estore.com',
      plan: 'Enterprise',
      pagesOptimized: 1842,
      monthlyUsage: '84,320',
      wcagCompliance: '99.2%',
      status: 'active',
    },
    {
      id: 3,
      name: 'EventHub',
      email: 'events@eventhub.com',
      plan: 'Pro',
      pagesOptimized: 89,
      monthlyUsage: '4,230',
      wcagCompliance: '100%',
      status: 'active',
    },
    {
      id: 4,
      name: 'Support Central',
      email: 'help@supportcentral.com',
      plan: 'Starter',
      pagesOptimized: 34,
      monthlyUsage: '1,200',
      wcagCompliance: '95%',
      status: 'active',
    },
  ]
}

export function getAccessibilityFeatures() {
  return [
    'readingOrder',
    'structuralNavigation',
    'alternativeText',
    'ARIA',
    'keyboardControl',
    'signLanguage',
    'voiceControl',
    'subtitles',
    'audioDescription',
    'highContrast',
    'displayControl',
    'timingControl',
  ]
}

export function getSchemaTypes() {
  return [
    'Article',
    'BlogPosting',
    'NewsArticle',
    'Product',
    'Event',
    'FAQPage',
    'HowTo',
    'Recipe',
    'Course',
    'ItemList',
    'Organization',
    'Person',
    'LocalBusiness',
    'Review',
    'VideoObject',
  ]
}