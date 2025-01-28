export interface MetricsData {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export interface PerformanceMetrics {
  ctr: number;
  cpc: number;
  cpm: number;
  conversionRate: number;
  cpa: number;
  roas: number;
}

export const calculateMetrics = (data: MetricsData): PerformanceMetrics => {
  const impressionsInThousands = data.impressions / 1000;

  return {
    // Click-through rate (CTR) = (Clicks / Impressions) × 100
    ctr: data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0,

    // Cost per click (CPC) = Total Cost / Number of Clicks
    cpc: data.clicks > 0 ? data.spend / data.clicks : 0,

    // Cost per thousand impressions (CPM) = (Total Cost / Number of Impressions) × 1000
    cpm: data.impressions > 0 ? data.spend / impressionsInThousands : 0,

    // Conversion rate = (Number of Conversions / Number of Clicks) × 100
    conversionRate:
      data.clicks > 0 ? (data.conversions / data.clicks) * 100 : 0,

    // Cost per acquisition (CPA) = Total Cost / Number of Conversions
    cpa: data.conversions > 0 ? data.spend / data.conversions : 0,

    // Return on ad spend (ROAS) = Revenue / Cost
    // Assuming average revenue per conversion of $100 for this example
    roas: data.spend > 0 ? (data.conversions * 100) / data.spend : 0,
  };
};

export const calculateOptimalBid = (
  metrics: PerformanceMetrics,
  currentBid: number,
  targetMetrics: Partial<PerformanceMetrics>,
): number => {
  let bidMultiplier = 1;

  // Adjust bid based on CTR performance
  if (targetMetrics.ctr && metrics.ctr < targetMetrics.ctr) {
    bidMultiplier *= 0.95; // Decrease bid by 5% if CTR is below target
  } else if (targetMetrics.ctr && metrics.ctr > targetMetrics.ctr) {
    bidMultiplier *= 1.05; // Increase bid by 5% if CTR is above target
  }

  // Adjust bid based on conversion rate
  if (
    targetMetrics.conversionRate &&
    metrics.conversionRate < targetMetrics.conversionRate
  ) {
    bidMultiplier *= 0.95;
  } else if (
    targetMetrics.conversionRate &&
    metrics.conversionRate > targetMetrics.conversionRate
  ) {
    bidMultiplier *= 1.05;
  }

  // Adjust bid based on ROAS
  if (targetMetrics.roas && metrics.roas < targetMetrics.roas) {
    bidMultiplier *= 0.9; // Decrease bid more aggressively if ROAS is below target
  } else if (targetMetrics.roas && metrics.roas > targetMetrics.roas) {
    bidMultiplier *= 1.1; // Increase bid more aggressively if ROAS is above target
  }

  return Math.max(currentBid * bidMultiplier, 0.01);
};
