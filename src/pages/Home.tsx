
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Clock, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-library-background flex flex-col">
      {/* Hero Section */}
      <header className="bg-library-primary py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M18 36L0 27V9L18 0L36 9V27L18 36Z" fill="#FFFFFF" />
                <path d="M18 18L0 9L18 0L36 9L18 18Z" fill="#F1F0FB" />
                <path d="M18 36V18L36 9V27L18 36Z" fill="#D6BCFA" />
                <path d="M18 36V18L0 9V27L18 36Z" fill="#E5DEFF" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">librarian.io</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              className="bg-white text-library-primary hover:bg-white/90"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="bg-library-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Modern Library Management System
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80">
                Streamline your library operations with our intuitive, powerful, and responsive management platform. 
                Track books, manage members, and get valuable insights all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-library-primary hover:bg-white/90"
                  size="lg"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Login to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Powerful Features for Modern Libraries
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-library-background p-6 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-library-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="text-library-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Book Management</h3>
                <p className="text-library-muted">
                  Easily catalog, track, and manage your entire book inventory with advanced search capabilities.
                </p>
              </div>
              
              <div className="bg-library-background p-6 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-library-primary/10 flex items-center justify-center mb-4">
                  <Users className="text-library-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Member Directory</h3>
                <p className="text-library-muted">
                  Maintain detailed profiles for all your library members with borrowing history and preferences.
                </p>
              </div>
              
              <div className="bg-library-background p-6 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-library-primary/10 flex items-center justify-center mb-4">
                  <Clock className="text-library-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Due Date Tracking</h3>
                <p className="text-library-muted">
                  Never miss a return date with automated reminders and overdue notifications system.
                </p>
              </div>

              <div className="bg-library-background p-6 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-library-primary/10 flex items-center justify-center mb-4">
                  <Book className="text-library-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
                <p className="text-library-muted">
                  Gain insights into library usage patterns with comprehensive analytics and reporting tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-library-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to transform your library management?
            </h2>
            <p className="text-library-muted max-w-2xl mx-auto mb-8">
              Join thousands of libraries worldwide that have streamlined their operations with librarian.io. 
              Get started today with our easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-library-primary text-white hover:bg-library-secondary"
                size="lg"
                onClick={() => navigate("/signup")}
              >
                Create an Account
              </Button>
              <Button 
                variant="outline" 
                className="border-library-primary text-library-primary hover:bg-library-primary/5"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Login to Account
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M18 36L0 27V9L18 0L36 9V27L18 36Z" fill="#4246F3" />
                  <path d="M18 18L0 9L18 0L36 9L18 18Z" fill="#6568F8" />
                  <path d="M18 36V18L36 9V27L18 36Z" fill="#3639BE" />
                  <path d="M18 36V18L0 9V27L18 36Z" fill="#4246F3" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-library-text">librarian.io</h1>
            </div>
            
            <div className="text-sm text-library-muted">
              © 2025 librarian.io. All rights reserved.
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center text-sm text-library-muted">
            Made with ❤️ for libraries everywhere
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
