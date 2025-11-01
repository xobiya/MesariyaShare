import { Package, Calendar, DollarSign, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

const upcomingRentals = [
  {
    id: '1',
    toolName: 'DeWalt Cordless Drill',
    renter: 'Alex Turner',
    startDate: 'Oct 30, 2024',
    endDate: 'Nov 1, 2024',
    status: 'confirmed',
    amount: 45,
  },
  {
    id: '2',
    toolName: 'Circular Saw',
    renter: 'Maria Garcia',
    startDate: 'Nov 2, 2024',
    endDate: 'Nov 3, 2024',
    status: 'pending',
    amount: 24,
  },
];

const myBookings = [
  {
    id: '1',
    toolName: 'Table Saw 10"',
    owner: 'John Smith',
    startDate: 'Nov 5, 2024',
    endDate: 'Nov 7, 2024',
    status: 'confirmed',
    amount: 105,
  },
];

const recentMessages = [
  {
    id: '1',
    from: 'Alex Turner',
    preview: 'Thanks! I\'ll pick up the drill tomorrow morning.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    from: 'Maria Garcia',
    preview: 'Is the saw still available for this weekend?',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '3',
    from: 'John Smith',
    preview: 'Looking forward to the pickup!',
    time: '1 day ago',
    unread: false,
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const totalEarnings = 847;
  const thisMonthEarnings = 245;
  const activeListings = 12;
  const totalRentals = 47;
  const unreadMessages = 2;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-blue-100">Welcome back! Here's what's happening with your tools.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 -mt-12">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl text-blue-600 mb-1">${thisMonthEarnings}</div>
              <div className="text-sm text-gray-600">This Month</div>
              <div className="text-xs text-gray-500 mt-1">Total: ${totalEarnings}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-2xl text-green-600 mb-1">{activeListings}</div>
              <div className="text-sm text-gray-600">Active Listings</div>
              <div className="text-xs text-gray-500 mt-1">{totalRentals} total rentals</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl text-orange-600 mb-1">{upcomingRentals.length}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
              <div className="text-xs text-gray-500 mt-1">Next: Oct 30</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                {unreadMessages > 0 && (
                  <Badge className="bg-red-500 h-5 px-2">{unreadMessages}</Badge>
                )}
              </div>
              <div className="text-2xl text-purple-600 mb-1">{recentMessages.length}</div>
              <div className="text-sm text-gray-600">Messages</div>
              <div className="text-xs text-gray-500 mt-1">{unreadMessages} unread</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 h-auto py-6"
            onClick={() => onNavigate('add-tool')}
          >
            <Package className="mr-2 w-5 h-5" />
            List a New Tool
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6"
            onClick={() => onNavigate('browse')}
          >
            Browse Tools
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6"
            onClick={() => onNavigate('messages')}
          >
            View Messages
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="rentals">As Owner</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Rentals of My Tools */}
          <TabsContent value="rentals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingRentals.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingRentals.map((rental) => (
                      <div key={rental.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {rental.renter.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <div className="font-medium">{rental.toolName}</div>
                              <div className="text-sm text-gray-600">Rented by {rental.renter}</div>
                            </div>
                            {rental.status === 'confirmed' ? (
                              <Badge className="bg-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Confirmed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-orange-600 text-orange-600">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {rental.startDate} - {rental.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${rental.amount}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="ghost">Message Renter</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No upcoming rentals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Bookings */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {myBookings.length > 0 ? (
                  <div className="space-y-4">
                    {myBookings.map((booking) => (
                      <div key={booking.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {booking.owner.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <div className="font-medium">{booking.toolName}</div>
                              <div className="text-sm text-gray-600">Owner: {booking.owner}</div>
                            </div>
                            <Badge className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirmed
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {booking.startDate} - {booking.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${booking.amount}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="ghost">Contact Owner</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No active bookings</p>
                    <Button className="mt-4" onClick={() => onNavigate('browse')}>
                      Browse Tools
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentMessages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => onNavigate('messages', { messageId: message.id })}
                      className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {message.from.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="font-medium">{message.from}</div>
                          <div className="text-xs text-gray-500">{message.time}</div>
                        </div>
                        <div className={`text-sm truncate ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.preview}
                        </div>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                      )}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => onNavigate('messages')}
                >
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Performance Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Response Rate</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">On-time Pickup</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Tool Availability</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
