import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 py-6 backdrop-blur-sm border-t border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/tansique-17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transform hover:scale-125 transition-all duration-300"
            >
              <Github className="h-8 w-8" />
            </a>
            <a
              href="https://linkedin.com/in/tansique-dasari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transform hover:scale-125 transition-all duration-300"
            >
              <Linkedin className="h-8 w-8" />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Created by</span>
              <a
                href="https://tansiqued.super.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 font-semibold hover:text-yellow-300 hover:scale-125 transition-all duration-300"
              >
                   Tansique Dasari
              </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
