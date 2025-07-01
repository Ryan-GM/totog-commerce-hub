
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, useWalletTransactions } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';

const Wallet = () => {
  const navigate = useNavigate();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions, isLoading: transactionsLoading } = useWalletTransactions();
  
  const [topUpAmount, setTopUpAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const handleTopUp = () => {
    if (!topUpAmount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with payment providers
    toast({
      title: "Top-up initiated",
      description: `Your wallet top-up of $${topUpAmount} via ${paymentMethod} has been initiated.`,
    });
    
    setIsTopUpOpen(false);
    setTopUpAmount('');
    setPaymentMethod('');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'purchase':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default' as const, label: 'Completed' },
      pending: { variant: 'secondary' as const, label: 'Pending' },
      failed: { variant: 'destructive' as const, label: 'Failed' },
      cancelled: { variant: 'outline' as const, label: 'Cancelled' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  if (walletLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">Loading wallet...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your balance and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Balance */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WalletIcon className="h-5 w-5 mr-2" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${wallet?.balance?.toFixed(2) || '0.00'}
                </div>
                <p className="text-gray-600 mb-6">{wallet?.currency || 'USD'}</p>
                
                <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Top Up Wallet
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Top Up Your Wallet</DialogTitle>
                      <DialogDescription>
                        Add funds to your wallet using various payment methods
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mpesa">M-PESA</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleTopUp} className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Top Up ${topUpAmount || '0'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="text-center py-8">Loading transactions...</div>
              ) : transactions && transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium capitalize">{transaction.type}</p>
                          <p className="text-sm text-gray-600">
                            {transaction.description || 'No description'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'deposit' || transaction.type === 'refund' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                          ${transaction.amount.toFixed(2)}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions yet. Start by topping up your wallet!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wallet;
