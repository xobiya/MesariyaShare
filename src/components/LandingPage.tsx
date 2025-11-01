import { Shield, DollarSign, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: DollarSign,
    title: 'Save Money',
    description: 'Rent tools for a fraction of the purchase cost. Why buy when you can borrow?',
  },
  {
    icon: Users,
    title: 'Build Community',
    description: 'Connect with neighbors and strengthen local bonds through sharing.',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'All users are verified. Secure payments and damage protection included.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Capitol Hill',
    rating: 5,
    text: 'I saved over $500 by renting tools instead of buying. The community is amazing!',
  },
  {
    name: 'Mike R.',
    location: 'Ballard',
    rating: 5,
    text: 'I\'ve earned $300 this month just by sharing my tools. Easy and trustworthy.',
  },
  {
    name: 'Lisa K.',
    location: 'Fremont',
    rating: 5,
    text: 'Perfect for DIY projects. Great tools, friendly owners, and fair prices.',
  },
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0yNCA0MGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        
        {/* Simple Header */}
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M14 7h6m-6 4h6m-6 4h6M4 5v14a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1z" />
              </svg>
            </div>
            <span className="text-2xl">mesariyashare</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
              Tools for Every Project,<br />
              Neighbors You Can Trust
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of neighbors sharing tools, saving money, and building a more sustainable community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-lg h-14 px-8"
                onClick={onGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className=" border-2 border-white text-blue-600 hover:bg-white/10 text-lg h-14 px-8"
                onClick={onGetStarted}
              >
                Browse Tools
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Verified Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-2">1,250+</div>
              <div className="text-gray-600">Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-2">850+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-2">3,400+</div>
              <div className="text-gray-600">Rentals Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-2">$180K+</div>
              <div className="text-gray-600">Community Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Why mesariyashare?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The smart way to access tools without the high costs and storage hassles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Start sharing tools in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                1
              </div>
              <h3 className="text-xl mb-3">Find a Tool</h3>
              <p className="text-gray-600">
                Browse tools in your neighborhood or search for exactly what you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                2
              </div>
              <h3 className="text-xl mb-3">Book & Pick Up</h3>
              <p className="text-gray-600">
                Request the tool, arrange pickup, and pay securely through the app.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                3
              </div>
              <h3 className="text-xl mb-3">Use & Return</h3>
              <p className="text-gray-600">
                Complete your project and return the tool. Rate your experience!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg h-14 px-8"
              onClick={onGetStarted}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">
              Hear from real members of the mesariyashare community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Join mesariyashare?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Start sharing tools with your neighbors today. It's free to join!
          </p>
          <Button
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 shadow-xl text-lg h-14 px-8"
            onClick={onGetStarted}
          >
            Create Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M14 7h6m-6 4h6m-6 4h6M4 5v14a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1z" />
                  </svg>
                </div>
                <span className="text-lg">mesariyashare</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building sustainable communities through tool sharing.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Browse Tools</a></li>
                <li><a href="#" className="hover:text-white">List a Tool</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 mesariyashare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
