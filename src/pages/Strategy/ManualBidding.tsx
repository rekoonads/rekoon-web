import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

interface ManualBiddingProps {
  onBidSubmit: (bid: number) => void;
}

const ManualBidding: React.FC<ManualBiddingProps> = ({ onBidSubmit }) => {
  const [bid, setBid] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bidValue = parseFloat(bid);
    if (!isNaN(bidValue)) {
      onBidSubmit(bidValue);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bid">Bid Amount (₹)</Label>
            <Input
              id="bid"
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              placeholder="Enter bid amount"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Button type="submit">Place Manual Bid</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManualBidding;
