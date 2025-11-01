import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

interface AddToolPageProps {
  onBack: () => void;
  onSubmit: (toolData: any) => void;
}

export function AddToolPage({ onBack, onSubmit }: AddToolPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    priceUnit: 'day',
    condition: 'Good',
    depositRequired: '',
    minRentalPeriod: '1 day',
    maxRentalPeriod: '7 days',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">List a Tool</h1>
            <p className="text-gray-600">
              Share your tools with your neighbors and earn some extra income.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Basic Information</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Tool Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., DeWalt Cordless Drill"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleChange('category', value)}
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Power Tools">Power Tools</SelectItem>
                          <SelectItem value="Hand Tools">Hand Tools</SelectItem>
                          <SelectItem value="Garden Tools">Garden Tools</SelectItem>
                          <SelectItem value="Automotive">Automotive</SelectItem>
                          <SelectItem value="Ladders & Scaffolding">Ladders & Scaffolding</SelectItem>
                          <SelectItem value="Cleaning Equipment">Cleaning Equipment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the tool, its features, and any special instructions..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Downtown Seattle, WA"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Photos</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Pricing & Rental Terms</h2>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Rental Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="priceUnit">Per *</Label>
                        <Select
                          value={formData.priceUnit}
                          onValueChange={(value) => handleChange('priceUnit', value)}
                        >
                          <SelectTrigger id="priceUnit">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deposit">Refundable Deposit *</Label>
                      <Input
                        id="deposit"
                        type="number"
                        placeholder="0.00"
                        value={formData.depositRequired}
                        onChange={(e) => handleChange('depositRequired', e.target.value)}
                        required
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Amount held as security, returned after the tool is returned in good condition
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleChange('condition', value)}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minPeriod">Minimum Rental Period *</Label>
                        <Select
                          value={formData.minRentalPeriod}
                          onValueChange={(value) => handleChange('minRentalPeriod', value)}
                        >
                          <SelectTrigger id="minPeriod">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4 hours">4 hours</SelectItem>
                            <SelectItem value="1 day">1 day</SelectItem>
                            <SelectItem value="2 days">2 days</SelectItem>
                            <SelectItem value="3 days">3 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="maxPeriod">Maximum Rental Period *</Label>
                        <Select
                          value={formData.maxRentalPeriod}
                          onValueChange={(value) => handleChange('maxRentalPeriod', value)}
                        >
                          <SelectTrigger id="maxPeriod">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3 days">3 days</SelectItem>
                            <SelectItem value="7 days">7 days</SelectItem>
                            <SelectItem value="14 days">14 days</SelectItem>
                            <SelectItem value="30 days">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Publish Tool
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
