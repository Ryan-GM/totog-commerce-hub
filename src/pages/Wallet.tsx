
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, useWalletTransactions } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Wallet as WalletIcon, CreditCard, Plus, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currency';

const WalletPage = () => {
  const navigate = useNavigate();
  const { data: wallet } = useWallet();
  const { data: transactions = [] } = useWalletTransactions();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('m-pesa');

  const handleTopUp = () => {
    if (!topUpAmount || topUpAmount < 100) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to top up.",
        variant: "destructive",
      });
      return;
    }

    // Mock top-up logic - in real app, this would call a mutation
    toast({
      title: "Top Up Initiated",
      description: `KES ${topUpAmount} will be added to your wallet via ${paymentMethod}.`,
    });

    setIsTopUpOpen(false);
  };

  const getTransactionIcon = (type: string) => {
    const transactionIcons = {
      deposit: { icon: Plus, color: 'bg-green-500' },
      withdrawal: { icon: Download, color: 'bg-red-500' },
      purchase: { icon: CreditCard, color: 'bg-blue-500' },
      refund: { icon: Plus, color: 'bg-green-500' },
    };
    return transactionIcons[type as keyof typeof transactionIcons] || { icon: CreditCard, color: 'bg-gray-500' };
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const statusVariants = {
      pending: 'secondary' as const,
      completed: 'default' as const,
      failed: 'destructive' as const,
      cancelled: 'destructive' as const,
    };
    return statusVariants[status as keyof typeof statusVariants] || 'secondary';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          <p className="text-gray-600 mt-2">Manage your wallet balance and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Balance Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WalletIcon className="h-5 w-5 mr-2" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {wallet ? formatCurrency(wallet.balance) : formatCurrency(0)}
                </p>
                <p className="text-gray-600 mb-6">Available Balance</p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => setIsTopUpOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Statement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((transaction, index) => {
                    const IconComponent = getTransactionIcon(transaction.type).icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionIcon(transaction.type).color}`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {transaction.description || `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Transaction`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'deposit' || transaction.type === 'refund' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                            {formatCurrency(Math.abs(transaction.amount))}
                          </p>
                          <Badge variant={getStatusVariant(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No transactions yet</p>
                  </div>
                )}
              </div>

              {transactions.length > 5 && (
                <div className="text-center mt-6">
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Up Modal */}
        <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money to Wallet</DialogTitle>
              <DialogDescription>
                Choose an amount to add to your wallet balance
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 2000, 5000, 10000, 20000].map((amount) => (
                  <Button
                    key={amount}
                    variant={topUpAmount === amount ? "default" : "outline"}
                    onClick={() => setTopUpAmount(amount)}
                    className="h-12"
                  >
                    {formatCurrency(amount)}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <Input
                  id="customAmount"
                  type="number"
                  min="100"
                  max="100000"
                  value={topUpAmount || ''}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="m-pesa">M-Pesa</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleTopUp}
                disabled={!topUpAmount || topUpAmount < 100}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add {topUpAmount ? formatCurrency(topUpAmount) : formatCurrency(0)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
};

export default WalletPage;
