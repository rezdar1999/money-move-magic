import { useState } from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function Send() {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    destination: '',
    amount: '',
    commissionPaid: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: Number(formData.amount)
    });
    setFormData({
      senderName: '',
      senderPhone: '',
      receiverName: '',
      receiverPhone: '',
      destination: '',
      amount: '',
      commissionPaid: false
    });
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">إرسال حوالة جديدة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>اسم المرسل</Label>
            <Input
              required
              value={formData.senderName}
              onChange={(e) => setFormData({...formData, senderName: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label>رقم هاتف المرسل</Label>
            <Input
              required
              type="tel"
              value={formData.senderPhone}
              onChange={(e) => setFormData({...formData, senderPhone: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label>اسم المستلم</Label>
            <Input
              required
              value={formData.receiverName}
              onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label>رقم هاتف المستلم</Label>
            <Input
              required
              type="tel"
              value={formData.receiverPhone}
              onChange={(e) => setFormData({...formData, receiverPhone: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label>الوجهة</Label>
            <Input
              required
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label>المبلغ</Label>
            <Input
              required
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="text-right"
            />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Label>تم استلام العمولة</Label>
            <Switch
              checked={formData.commissionPaid}
              onCheckedChange={(checked) => setFormData({...formData, commissionPaid: checked})}
            />
          </div>
          <Button type="submit" className="w-full">إرسال الحوالة</Button>
        </form>
      </CardContent>
    </Card>
  );
}