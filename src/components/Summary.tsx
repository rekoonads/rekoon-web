import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CalendarIcon, ClipboardPenIcon, PresentationIcon } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Extend the Window interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  amount: number;
  currency: string;
  id: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function SummaryComponent() {
  const [amount, setAmount] = useState<number>(1);

  // handlePayment Function
  const handlePayment = async () => {
    try {
      const res = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data: PaymentData) => {
    const options = {
      key: 'rzp_test_SZrvteybFNdghB', // Use your Razorpay Test Key
      amount: data.amount,
      currency: data.currency,
      name: 'Rekoon Ads',
      description: 'Test Mode',
      order_id: data.id,
      handler: async (response: RazorpayResponse) => {
        console.log('response', response);
        try {
          const res = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
            console.log('Payment ID:', response.razorpay_payment_id);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      theme: {
        color: '#5f63b8',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Card className="w-full max-w-lg p-4 rounded-lg border border-stroke bg-white shadow-2xl dark:border-strokedark dark:bg-boxdark">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-blue-700">
          <PresentationIcon className="inline-block w-5 h-5 mr-2" />
          Campaign summary
        </CardTitle>
        <CardDescription>
          Review carefully your campaign details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">darksihsolu</p>
            <Link to={'/campaign'}>
              <Button variant="ghost" className="p-0 text-sm text-blue-700">
                <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>
          </div>
          <div className="text-right">
            <p className="font-semibold">$100 daily budget</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <p>
            Between <span className="font-semibold">06/23/24</span> and the end
            date of your choice
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Strategy #1</p>
          <div className="flex items-center justify-between">
            <p>3 Apps & Channels - TV - Entire US</p>
            <Link to={'/strategy'}>
              <Button variant="ghost" className="p-0 text-sm text-blue-700">
                <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p>Deliverability forecast</p>
            <Badge variant="secondary" className="text-green-700">
              Excellent
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <p className="text-muted-foreground">Total campaign budget</p>
        <p className="text-lg font-semibold">$100/day</p>
      </CardFooter>
      <div className="justify-end">
        <Button className="text-white" onClick={handlePayment}>
          Pay Now
        </Button>
      </div>
    </Card>
  );
}
