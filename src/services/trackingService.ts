import { MetricsData } from '../lib/metrics';

interface TrackingEvent {
  type: 'impression' | 'click' | 'conversion';
  strategyId: string;
  timestamp: number;
  data: {
    cost?: number;
    revenue?: number;
    [key: string]: any;
  };
}

class TrackingService {
  private static events: Map<string, TrackingEvent[]> = new Map();

  static trackEvent(event: TrackingEvent): void {
    const events = this.events.get(event.strategyId) || [];
    events.push(event);
    this.events.set(event.strategyId, events);
  }

  static getMetrics(
    strategyId: string,
    timeWindow: number = 3600000,
  ): MetricsData {
    const events = this.events.get(strategyId) || [];
    const now = Date.now();
    const relevantEvents = events.filter(
      (e) => now - e.timestamp <= timeWindow,
    );

    const metrics: MetricsData = {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
    };

    relevantEvents.forEach((event) => {
      switch (event.type) {
        case 'impression':
          metrics.impressions++;
          metrics.spend += event.data.cost || 0;
          break;
        case 'click':
          metrics.clicks++;
          break;
        case 'conversion':
          metrics.conversions++;
          break;
      }
    });

    return metrics;
  }
}

export default TrackingService;
