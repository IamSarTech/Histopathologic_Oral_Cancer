import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Linkedin, Github } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Creators = () => {
  const creators = [
    {
      name: "Sarthak Sisodia",
      initials: "SS",
      role: "Developer & Researcher",
      department: "B.Tech Student",
      university: "SRM Institute of Science and Technology",
      description: "Passionate about leveraging AI and machine learning to solve real-world healthcare challenges. Focused on developing innovative solutions for early disease detection.",
      image: "/profile/sark.png",
      email: "mailto:sarthaksisodia2004@gmail.com",
      linkedin: "https://www.linkedin.com/in/sarthak-sisodia-13b5ab272/",
      github: "https://github.com/IamSarTech",
    },
    {
      name: "Aditya Sinha",
      initials: "AS",
      role: "Developer & Researcher",
      department: "B.Tech Student",
      university: "SRM Institute of Science and Technology",
      description: "Dedicated to creating impactful technology solutions in the healthcare domain. Specializes in building user-friendly applications with cutting-edge AI capabilities.",
      image: "/profile/sinha.jpeg",
      email: "mailto:adityasinha06841@gmail.com",
      linkedin: "https://www.linkedin.com/in/aditya-sinha-9253672a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/adityanation",
    }
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold text-green-700">Oral Cancer Detection</h2>
          <nav className="flex gap-6">
            <Link to="/" className="text-green-700 hover:text-green-500 transition-colors">Home</Link>
            <Link to="/about" className="text-green-700 hover:text-green-500 transition-colors">About</Link>
            <Link to="/creators" className="text-green-700 hover:text-green-500 transition-colors font-medium">Creators</Link>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <GraduationCap size={60} className="text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Meet The Creators
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate minds behind the Oral Cancer Detection System, working to make early cancer detection accessible to everyone.
            </p>
          </div>
          {/* Creators Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {creators.map((creator, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <Avatar className="w-30 h-40 border-4 border-green-200">
                    <AvatarImage src={creator.image} alt={creator.name} />
                    <AvatarFallback className="bg-green-100 text-green-700 text-3xl font-bold">
                      {creator.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {/* Info */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{creator.name}</h3>
                <p className="text-green-600 font-semibold mb-1">{creator.role}</p>
                <p className="text-gray-500 text-sm mb-4">{creator.department}</p>
                
                {/* University Badge */}
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <GraduationCap size={16} />
                  {creator.university}
                </div>
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {creator.description}
                </p>
                {/* Social Links Placeholder */}
                <div className="flex justify-center gap-4">
                   <a
                        href={creator.email}
                        className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors"
                        aria-label="Email">
                            <Mail size={20} className="text-gray-600" />
                    </a>
                    <a
                        href={creator.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors"
                        aria-label="LinkedIn"
                    >
                             <Linkedin size={20} className="text-gray-600" />
                    </a>
                    <a
                        href={creator.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={20} className="text-gray-600" />
                    </a>
                </div>
              </div>
            ))}
          </div>
          {/* Project Info */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">About This Project</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
              This Oral Cancer Detection System was developed as part of our academic project at SRM Institute of Science and Technology. 
              Our goal is to leverage artificial intelligence to assist in early detection of oral squamous cell carcinoma (OSCC), 
              potentially saving lives through timely diagnosis and treatment.
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Oral Cancer Detection</h3>
          <p className="opacity-80 mb-4">AI-assisted histopathologic screening for early detection of OSCC</p>
          <p className="text-sm opacity-60">© 2025 Oral Cancer Detection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

};

export default Creators;
