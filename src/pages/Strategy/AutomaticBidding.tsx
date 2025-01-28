import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

interface AutomaticBiddingProps {
  onBidSubmit: (bid: number) => void;
}

const AutomaticBidding: React.FC<AutomaticBiddingProps> = ({ onBidSubmit }) => {
  const [maxBid, setMaxBid] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bidValue = parseFloat(maxBid);
    if (!isNaN(bidValue)) {
      onBidSubmit(bidValue);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="maxBid">Maximum Bid (₹)</Label>
            <Input
              id="maxBid"
              type="number"
              value={maxBid}
              onChange={(e) => setMaxBid(e.target.value)}
              placeholder="Enter maximum bid"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Button type="submit">Set Automatic Bid</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AutomaticBidding;
