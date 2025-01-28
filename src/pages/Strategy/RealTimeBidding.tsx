import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import axios from 'axios';
import io from 'socket.io-client';

interface BidProps {
  strategyId: string;
  initialBid: number;
  onBidChange: (bid: number) => void;
  biddingType: 'automatic' | 'manual';
}

const socket = io('http://localhost:3001'); // Replace with your actual server URL

const RealTimeBidding: React.FC<BidProps> = ({
  strategyId,
  initialBid,
  onBidChange,
  biddingType,
}) => {
  const [currentBid, setCurrentBid] = useState(initialBid);
  const [manualBid, setManualBid] = useState(initialBid.toString());

  useEffect(() => {
    socket.emit('joinStrategy', strategyId);

    socket.on('currentBid', ({ bid }) => {
      setCurrentBid(bid);
      onBidChange(bid);
    });

    socket.on('bidUpdated', ({ bid }) => {
      setCurrentBid(bid);
      onBidChange(bid);
    });

    return () => {
      socket.off('currentBid');
      socket.off('bidUpdated');
    };
  }, [strategyId, onBidChange]);

  const handleManualBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualBid(e.target.value);
  };

  const submitManualBid = async () => {
    const newBid = parseFloat(manualBid);
    if (!isNaN(newBid) && newBid > 0) {
      try {
        // Update the bid in the database
        await axios.put(`/api/strategy/${strategyId}/bid`, {
          currentBid: newBid,
          biddingType: 'manual',
        });

        // Emit the updated bid to the socket server
        socket.emit('updateBid', {
          strategyId,
          bid: newBid,
          isAutomatic: false,
        });

        // Update the local state
        setCurrentBid(newBid);
        onBidChange(newBid);
      } catch (error) {
        console.error('Error updating bid:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Real-Time Bidding</h2>
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Bidding Type: {biddingType === 'automatic' ? 'Automatic' : 'Manual'}
          </p>

          {biddingType === 'manual' && (
            <div className="space-y-2">
              <Label htmlFor="manualBid">Set Manual Bid:</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="manualBid"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={manualBid}
                  onChange={handleManualBidChange}
                />
                <Button onClick={submitManualBid}>Update Bid</Button>
              </div>
            </div>
          )}

          {biddingType === 'automatic' && (
            <div className="text-sm text-muted-foreground">
              <p>Automatic bidding is active.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeBidding;
