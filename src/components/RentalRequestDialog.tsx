import { Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface RentalRequestDialogProps {
  open: boolean;
  onClose: () => void;
  toolName: string;
  price: number;
  priceUnit: string;
  depositRequired: number;
  onSubmit: (requestData: any) => void;
}

export function RentalRequestDialog({
  open,
  onClose,
  toolName,
  price,
  priceUnit,
  depositRequired,
  onSubmit,
}: RentalRequestDialogProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate rental duration and total cost
  const calculateCost = () => {
    if (!formData.startDate || !formData.endDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return null;
    
    let rentalCost = 0;
    if (priceUnit === 'day') {
      rentalCost = price * days;
    } else if (priceUnit === 'week') {
      rentalCost = price * Math.ceil(days / 7);
    } else if (priceUnit === 'hour') {
      rentalCost = price * days * 24; // Simplified
    }
    
    return {
      days,
      rentalCost,
      totalCost: rentalCost + depositRequired,
    };
  };

  const cost = calculateCost();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
          <DialogDescription>
            Send a rental request for {toolName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  required
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message to Owner (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell the owner about your project and when you'd like to pick up the tool..."
                rows={3}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </div>

            {cost && (
              <>
                <Separator />
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rental ({cost.days} {cost.days === 1 ? 'day' : 'days'})</span>
                    <span>${cost.rentalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Refundable Deposit</span>
                    <span>${depositRequired.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-blue-700">${cost.totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    The deposit will be refunded when you return the tool in good condition.
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
