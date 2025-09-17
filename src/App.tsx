import { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code, Download, 
  ChevronRight, Star, Users, Calendar,
  Zap, Database, Server,
  ArrowUp, Menu, X,
  MapPin, Phone, GraduationCap, Briefcase, BookOpen,
  Target, Lightbulb, Rocket, Monitor, Cpu
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // New handler for Download CV button
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Gagoope_ClaranceMerafhe_CV.pdf';
    link.setAttribute('download', 'Gagoope_ClaranceMerafhe_CV.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { label: 'Years Experience', value: '4+', icon: Calendar },
    { label: 'Projects Built', value: '30+', icon: Code },
    { label: 'Technologies', value: '20+', icon: Zap },
    { label: 'Happy Clients', value: '15+', icon: Users }
  ];

  const experiences = [
    {
      company: 'Freelance Developer',
      position: 'Full-Stack Developer',
      period: '2022 - Present',
      description: 'Building custom web applications and digital solutions for clients across various industries. Specializing in modern JavaScript frameworks, responsive design, and database integration.',
      technologies: ['React', 'Node.js', 'JavaScript', 'Python', 'MongoDB', 'PostgreSQL', 'Express.js'],
      achievements: [
        'Delivered successful projects on time and within budget',
        'Maintained 98% client satisfaction rate',
        'Specialized in e-commerce and business automation solutions',
        'Built scalable applications serving 1000+ users'
      ]
    },
    {
      company: 'Botho University',
      position: 'Computer Engineering Student & Developer',
      period: '2018 - 2022',
      description: 'Completed Bachelor Degree Honours In Computer Engineering while developing practical programming skills through academic projects and personal initiatives.',
      technologies: ['Java', 'Python', 'C++', 'HTML', 'CSS', 'JavaScript', 'SQL'],
      achievements: [
        'Graduated with honors in Computer Engineering',
        'Completed final year project on web application development',
        'Completed SAP Add-on developer Internship at RPC Data Limited Botswana',
        'Built foundation in algorithms, data structures, and software engineering'
      ]
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with user authentication, payment integration, inventory management, and admin dashboard. Built for a local retail business.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Express.js'],
      featured: true,
      stats: { users: '500+', orders: '200+', uptime: '99.9%' }
    },
    {
      title: 'Business Management System',
      description: 'Comprehensive business management solution with inventory tracking, customer management, reporting, and analytics for small to medium enterprises.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Chart.js'],
      featured: true,
      stats: { businesses: '10+', transactions: '5k+', efficiency: '+40%' }
    },
    {
      title: 'Real Estate Portal',
      description: 'Property listing and management platform with advanced search, virtual tours, agent profiles, and lead management system for real estate professionals.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Socket.io'],
      featured: true,
      stats: { properties: '300+', agents: '25+', inquiries: '1k+' }
    },
    {
      title: 'Restaurant Management App',
      description: 'Complete restaurant management solution with menu management, order processing, table reservations, and staff coordination.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Express.js'],
      featured: false
    },
    {
      title: 'Educational Learning Platform',
      description: 'Online learning management system with course creation, student progress tracking, assignments, and interactive quizzes.',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
      featured: false
    },
    {
      title: 'Healthcare Appointment System',
      description: 'Medical appointment booking and management system with patient records, doctor schedules, and automated reminders.',
      image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=600',
      github: 'https://github.com',
      demo: 'https://example.com',
      technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Twilio API'],
      featured: false
    }
  ];

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Monitor,
      skills: [
        { name: 'React/Next.js', level: 90, color: 'bg-blue-500' },
        { name: 'JavaScript/TypeScript', level: 88, color: 'bg-yellow-500' },
        { name: 'HTML5/CSS3', level: 95, color: 'bg-orange-500' },
        { name: 'Tailwind CSS', level: 85, color: 'bg-cyan-500' },
        { name: 'Responsive Design', level: 92, color: 'bg-green-500' }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js/Express', level: 85, color: 'bg-green-600' },
        { name: 'Python/Django', level: 82, color: 'bg-blue-600' },
       // { name: 'RESTful APIs', level: 88, color: 'bg-purple-500' },
        { name: 'Authentication & Security', level: 80, color: 'bg-red-500' },
       // { name: 'Server Management', level: 75, color: 'bg-gray-600' }
      ]
    },
    {
      title: 'Database & Tools',
      icon: Database,
      skills: [
       // { name: 'MongoDB', level: 85, color: 'bg-green-700' },
        { name: 'PostgreSQL/MySQL', level: 80, color: 'bg-blue-700' },
        { name: 'Git/GitHub', level: 90, color: 'bg-gray-800' },
        { name: 'Docker', level: 70, color: 'bg-blue-800' },
        { name: 'Cloud Services', level: 65, color: 'bg-orange-600' }
      ]
    },
    {
      title: 'Programming Languages',
      icon: Cpu,
      skills: [
        { name: 'JavaScript', level: 90, color: 'bg-yellow-600' },
        { name: 'Python', level: 85, color: 'bg-blue-600' },
        { name: 'Java', level: 75, color: 'bg-red-600' },
        { name: 'C++', level: 70, color: 'bg-purple-600' },
        { name: 'SQL', level: 80, color: 'bg-indigo-600' }
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering Honours in Computer Engineering',
      institution: 'Botho University',
      period: '2018 - 2022',
      description: 'Comprehensive study of computer engineering fundamentals including algorithms, data structures, software engineering, system design and Embedded Systems.',
      achievements: [
        'Graduated with Honors',
        'Dean\'s List for Academic Excellence',
        'Final Year Project: Advanced Web Application Development',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl flex items-center space-x-2">
              <Rocket size={24} className="text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Clarance Merafhe
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-200 hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 capitalize text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Available for new opportunities
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Clarance Merafhe
              </span>
            </h1>
            
            <div className="text-xl md:text-3xl text-gray-300 mb-4">
              Full-Stack Developer & Software Engineer
            </div>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Computer Engineering graduate passionate about creating innovative web applications and digital solutions. 
              Specializing in modern JavaScript frameworks, Python development, and scalable system architecture.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-400">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-blue-400" />
                Gaborone, Botswana
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-green-400" />
                +267 77 447 823
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-purple-400" />
                meragcm@gmail.com
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>View My Work</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button onClick={downloadCV} className="group bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 flex items-center space-x-2">
                <Download size={20} />
                <span>Download CV</span>
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Github size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:meragcm@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate developer with a strong foundation in computer science and practical experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Rocket className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">My Journey</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a dedicated full-stack developer with a Bachelor's degree Honours in Computer Engineering from Botho 
                University. My passion for technology drives me to create innovative solutions 
                that solve real-world problems and improve people's lives.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With expertise in modern web technologies like React, Node.js, and Python, I enjoy 
                  building applications that are both functional and user-friendly. I'm always eager to 
                  learn new technologies and take on challenging projects that push my boundaries.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
                  <GraduationCap className="text-blue-400 mb-3" size={32} />
                  <div className="text-2xl font-bold text-white mb-1">BSc</div>
                  <div className="text-sm text-gray-300">Computer Engineering</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl p-6 border border-green-500/30">
                  <Briefcase className="text-green-400 mb-3" size={32} />
                  <div className="text-2xl font-bold text-white mb-1">4+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Education Section */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <BookOpen className="text-blue-400 mr-3" size={24} />
                  Education
                </h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-blue-400 mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm mb-3">{edu.period}</p>
                    <p className="text-gray-300 text-sm mb-3">{edu.description}</p>
                    <div className="space-y-1">
                      {edu.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="text-gray-300 text-sm flex items-center">
                          <Star className="text-yellow-400 mr-2" size={12} />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Target className="text-green-400 mr-3" size={24} />
                  What I Do
                </h3>
                <div className="text-gray-300 space-y-2">
                  <p>🚀 Full-stack web application development</p>
                  <p>💼 Business automation and management systems</p>
                  <p>🎨 Responsive UI/UX design and implementation</p>
                  <p>🔧 API development and third-party integrations</p>
                  <p>📊 Database design and optimization</p>
                  <p>☁️ Cloud deployment and DevOps practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              My professional journey and key achievements in software development
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{exp.position}</h3>
                      <div className="text-blue-400 text-lg font-medium">{exp.company}</div>
                    </div>
                    <div className="text-gray-400 mt-2 lg:mt-0">{exp.period}</div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-300 text-sm flex items-start">
                            <Zap className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Showcasing my best work and technical capabilities across various domains
            </p>
          </div>
          
          {/* Featured Projects */}
          <div className="space-y-12 mb-16">
            {projects.filter(p => p.featured).map((project, index) => (
              <div key={index} className={`group grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`relative overflow-hidden rounded-2xl ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-4 text-white text-sm">
                      {project.stats && Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="capitalize">{key}: </span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg border border-purple-500/30 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gray-800/50 text-white px-6 py-3 rounded-xl hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  I'm always excited to work on innovative projects and collaborate with 
                  talented teams. Whether you have a specific project in mind or just want 
                  to explore possibilities, I'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-gray-400">meragcm@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-400">Gaborone, Botswana</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <Lightbulb className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">Specialization</div>
                      <div className="text-gray-400">Full-Stack Development</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30">
                <h4 className="text-white font-semibold mb-4">Current Status</h4>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-gray-300">Available for new projects</span>
                </div>
                <div className="text-sm text-gray-400">
                  Response time: Within 24 hours
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Project Discussion"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/50 border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Clarance Merafhe
            </div>
            <p className="text-gray-400 mb-6">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:meragcm@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 Clarance Merafhe. Crafted with passion and dedication.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;
