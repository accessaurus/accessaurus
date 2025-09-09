export async function getWebsite(id: string) {
  return (await getWebsites()).find((page) => page.id.toString() === id)!
}

export async function getRecentWebsites() {
  return (await getWebsites()).slice(0, 10)
}

export async function getWebsites() {
  return [
    {
      id: 3000,
      url: '/site/3000',
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
      url: '/site/3001',
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
      url: '/site/3002',
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
      url: '/site/3003',
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
      url: '/site/3004',
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
      url: '/site/3005',
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
      url: '/site/3006',
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
      url: '/site/3007',
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
      url: '/site/3008',
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
      url: '/site/3009',
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

// Placeholder functions for pages that still need them
// These will be replaced when those pages are updated for Accessaurus
export async function getEvent(id: string) {
  return {
    id,
    name: 'Sample Event',
    url: `/events/${id}`,
    date: 'Jan 1, 2024',
    time: '10:00 AM',
    location: 'Online',
    totalRevenue: '$0',
    totalRevenueChange: '+0%',
    ticketsAvailable: 0,
    ticketsSold: 0,
    ticketsSoldChange: '+0%',
    pageViews: '0',
    pageViewsChange: '+0%',
    status: 'Draft',
    imgUrl: '/placeholder.jpg',
    thumbUrl: '/placeholder-thumb.jpg',
  }
}

export async function getEvents() {
  // Return empty array with proper type
  return [] as Array<{
    id: string | number
    name: string
    url: string
    date: string
    time: string
    location: string
    totalRevenue: string
    totalRevenueChange: string
    ticketsAvailable: number
    ticketsSold: number
    ticketsSoldChange: string
    pageViews: string
    pageViewsChange: string
    status: string
    imgUrl: string
    thumbUrl: string
  }>
}

export async function getEventOrders(id: string) {
  // Return empty array with proper type
  return [] as Array<{
    id: string
    url: string
    date: string
    amount: {
      usd: string
      cad: string
      fee: string
      net: string
    }
    customer: {
      name: string
      email: string
      address: string
      country: string
      countryFlagUrl: string
    }
  }>
}

export async function getOrder(id: string) {
  return {
    id,
    url: `/orders/${id}`,
    date: 'Jan 1, 2024',
    amount: {
      usd: '$0.00',
      cad: '$0.00',
      fee: '$0.00',
      net: '$0.00',
    },
    payment: {
      transactionId: 'N/A',
      card: {
        number: '0000',
        type: 'N/A',
        expiry: 'N/A',
      },
    },
    customer: {
      name: 'N/A',
      email: 'N/A',
      address: 'N/A',
      country: 'N/A',
      countryFlagUrl: '/flags/us.svg',
    },
    event: await getEvent('0'),
  }
}

export async function getOrders() {
  // Return empty array with proper type
  return [] as Array<{
    id: string | number
    url: string
    date: string
    amount: {
      usd: string
      cad: string
      fee: string
      net: string
    }
    payment: {
      transactionId: string
      card: {
        number: string
        type: string
        expiry: string
      }
    }
    customer: {
      name: string
      email: string
      address: string
      country: string
      countryFlagUrl: string
    }
    event: Awaited<ReturnType<typeof getEvent>>
  }>
}

export function getCountries() {
  return [
    {
      name: 'United States',
      code: 'US',
      flagUrl: '/flags/us.svg',
      regions: ['California', 'New York', 'Texas', 'Florida'],
    },
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: '/flags/ca.svg',
      regions: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      flagUrl: '/flags/gb.svg',
      regions: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    },
  ]
}
