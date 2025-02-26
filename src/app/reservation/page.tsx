import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  ChefHat, 
  MapPin, 
  Phone, 
  Mail, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Twitter,
  MessageSquare,
  Check
} from 'lucide-react';
import { format } from 'date-fns';

const ReservationPage = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2 }
    }
  };
  
  const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <ChefHat className="h-6 w-6 mr-2" />
                <span className="text-xl font-serif font-bold">La Belle Cuisine</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-transparent text-foreground/70 hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-primary text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Reservations
                </a>
                <a href="#" className="border-transparent text-foreground/70 hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Menu
                </a>
                <a href="#" className="border-transparent text-foreground/70 hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <Button onClick={toggleTheme} variant="ghost" size="icon">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
            <div className="flex items-center sm:hidden space-x-2">
              <Button onClick={toggleTheme} variant="ghost" size="icon">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden border-t"
          >
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="bg-primary/10 border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Reservations
              </a>
              <a href="#" className="border-transparent text-foreground/70 hover:bg-accent hover:border-primary/20 hover:text-foreground block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-foreground/70 hover:bg-accent hover:border-primary/20 hover:text-foreground block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Menu
              </a>
              <a href="#" className="border-transparent text-foreground/70 hover:bg-accent hover:border-primary/20 hover:text-foreground block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Contact
              </a>
            </div>
            <div className="pt-4 pb-3 border-t">
              <div className="flex items-center px-4">
                <Button className="w-full flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.div 
        className="relative h-96 flex items-center justify-center text-center"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative text-white px-4 z-10">
          <h1 className="text-4xl font-bold mb-2 font-serif">Reserve Your Table</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the pinnacle of culinary artistry in our warm, inviting atmosphere. 
            Every meal is a celebration of flavors and tradition.
          </p>
          <Button size="lg" asChild>
            <a href="#reservation-form">
              Book Now
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12" id="reservation-form">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Make a Reservation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                  
                  {/* Party Size */}
                  <div className="space-y-2">
                    <Label htmlFor="party-size">Party Size</Label>
                    <Select value={partySize} onValueChange={setPartySize} required>
                      <SelectTrigger id="party-size">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5 people</SelectItem>
                        <SelectItem value="6">6 people</SelectItem>
                        <SelectItem value="7">7 people</SelectItem>
                        <SelectItem value="8">8 people</SelectItem>
                        <SelectItem value="large">More than 8 (We'll contact you)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                        >
                          {date ? format(date, "PPP") : "Select a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select value={time} onValueChange={setTime} required>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="17:30">5:30 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="18:30">6:30 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="19:30">7:30 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="20:30">8:30 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="21:30">9:30 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="special-requests">
                    Special Requests <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea 
                    id="special-requests" 
                    placeholder="Let us know if you have any special requests or dietary restrictions..."
                    rows={3}
                  />
                </div>
                
                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the reservation policy and understand that no-shows may be charged a fee.
                    </label>
                    <p className="text-sm text-muted-foreground">
                      You can review our <a href="#" className="text-primary underline hover:text-primary/90">full policy here</a>.
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Reserve Table
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUpVariants}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 font-serif">A Culinary Journey Since 1995</h2>
            <p className="text-muted-foreground mb-6">
              La Belle Cuisine has been a cornerstone of fine dining in the heart of the city for over two decades. Our commitment to exceptional ingredients, masterful preparation, and attentive service has made us a beloved destination for special occasions and everyday celebrations alike.
            </p>
            <p className="text-muted-foreground mb-6">
              Our executive chef, Maria Rossi, brings her passion for Mediterranean flavors and modern techniques to create a menu that honors tradition while embracing innovation. Each dish tells a story of heritage, craftsmanship, and the pure joy of gathering around a table.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                Our Story
              </Button>
              <Button variant="outline" size="sm">
                Meet the Chef
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
            <img 
              src="/api/placeholder/800/600" 
              alt="Restaurant ambiance" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="bg-muted py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="max-w-6xl mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12 font-serif">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Thompson",
                quote: "The tasting menu was absolutely divine. Each course was thoughtfully prepared and the wine pairings were perfect. This is our go-to spot for anniversaries.",
                title: "Food Blogger"
              },
              {
                name: "James Wilson",
                quote: "I've hosted multiple business dinners here, and the service is consistently impeccable. The private dining room offers the perfect setting for important conversations.",
                title: "CEO, Tech Innovations"
              },
              {
                name: "Elena Rodriguez",
                quote: "From the moment we walked in, we felt welcomed. The staff remembered our preferences from our last visit, and the seasonal menu never disappoints.",
                title: "Loyal Customer"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <blockquote className="text-foreground italic mb-4 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-card text-card-foreground">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                <ChefHat className="h-5 w-5 mr-2" />
                La Belle Cuisine
              </h3>
              <p className="text-muted-foreground mb-4">
                Exceptional dining experiences since 1995. We pride ourselves on our exquisite menu, 
                cozy atmosphere, and impeccable service that turns meals into memories.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Hours */}
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Hours
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Monday - Thursday: 5PM - 10PM</li>
                <li>Friday - Saturday: 5PM - 11PM</li>
                <li>Sunday: 5PM - 9PM</li>
                <li className="text-primary">Happy Hour: 5PM - 6:30PM daily</li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 shrink-0" />
                  <span>123 Gourmet Avenue, Foodie District, FC 12345</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 shrink-0" />
                  <span>reservations@labellecuisine.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-muted text-center text-muted-foreground text-sm">
            <p>&copy; 2025 La Belle Cuisine. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Check className="h-6 w-6 text-primary" />
              </div>
              Reservation Confirmed!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Thank you for your reservation. We've sent a confirmation email with all the details.
              We look forward to serving you!
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              {date && (
                <p className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="font-medium">{format(date, "PPPP")}</span>
                </p>
              )}
              {time && (
                <p className="flex items-center gap-2 text-sm mt-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {time.split(':')[0]}:{time.split(':')[1]} {parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                  </span>
                </p>
              )}
              {partySize && (
                <p className="flex items-center gap-2 text-sm mt-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">
                    {partySize === 'large' ? 'More than 8 people' : 
                     `${partySize} ${parseInt(partySize) === 1 ? 'person' : 'people'}`}
                  </span>
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowConfirmation(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationPage;