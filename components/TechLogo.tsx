'use client';

import { memo } from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiVuedotjs, 
  SiJavascript,
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb,
  SiGit, 
  SiDocker, 
  SiAmazonwebservices, 
  SiVercel, 
  SiFigma,
  SiLinux,
  SiGraphql,
  SiAutodesk,
  SiAnsys,
  SiArduino,
  SiRaspberrypi,
  SiLeetcode
} from 'react-icons/si';
import { 
  Code, 
  Database, 
  Server, 
  Lightbulb, 
  Target, 
  Wrench,
  Settings,
  Cpu,
  Zap,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Technology logo mapping
const techLogos: Record<string, React.ComponentType<any>> = {
  // Frontend
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Vue.js': SiVuedotjs,
  'JavaScript': SiJavascript,
  
  // Backend
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'GraphQL': SiGraphql,
  
  // Tools & Platforms
  'Git': SiGit,
  'Docker': SiDocker,
  'AWS': SiAmazonwebservices,
  'Vercel': SiVercel,
  'Figma': SiFigma,
  'Linux': SiLinux,
  'LeetCode': SiLeetcode,
  
  // Mechanical Engineering Tools
  'SolidWorks': SiAutodesk,
  'AutoCAD': SiAutodesk,
  'Fusion 360': SiAutodesk,
  'ANSYS': SiAnsys,
  'Arduino': SiArduino,
  'Raspberry Pi': SiRaspberrypi,
  
  // Fallback icons for concepts and other technologies
  'REST APIs': Server,
  'System Design': Settings,
  'Testing': Target,
  'Agile': Lightbulb,
  'DevOps': Settings,
  'UI/UX': Lightbulb,
  'CNC Programming': Cpu,
  '3D Printing': Settings,
  'Quality Control': Target,
  'Lean Manufacturing': BarChart3,
  'FEA': BarChart3,
  'CFD': Zap,
  'Thermal Analysis': Zap,
  'Creo': Wrench,
  'Six Sigma': Target,
  'Cost Estimation': BarChart3,
  'Supply Chain': Settings,
  'Project Management': Target,
  'Thermodynamics': Zap,
  'Energy Systems': Zap,
  'Heat Transfer': Zap,
  'Flow Analysis': Zap,
  'Heat Exchangers': Wrench,
  'LMTD Analysis': BarChart3,
  'Automotive HVAC': Settings,
  'Thermal Design': Zap,
  'Energy Recovery': Zap,
  'Manufacturing': Settings,
  'Process Optimization': Target,
  'Sustainability': Lightbulb,
  'Materials Science': Wrench,
  'Composite Design': Wrench,
  'Testing & Validation': Target,
  'Quality Assurance': Target,
  'Metrology': Target,
  'Automation': Settings,
  'Statistical Analysis': BarChart3,
  'LabVIEW': Code,
  'Robotics': Cpu,
  'Computer Vision': Target,
  'PLC Programming': Code,
  'SCADA': Settings,
  'IoT': Cpu,
  'Control Systems': Settings,
  'Energy Modeling': BarChart3,
  'Prototyping': Wrench,
  'Life Cycle Analysis': BarChart3,
  'Environmental Engineering': Lightbulb,
  'High-Performance Computing': Cpu,
  'Turbomachinery': Wrench,
  'MATLAB': BarChart3
};

// Color mapping for specific technologies
const techColors: Record<string, string> = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'Tailwind CSS': '#06B6D4',
  'Vue.js': '#4FC08D',
  'JavaScript': '#F7DF1E',
  'Node.js': '#339933',
  'Python': '#3776AB',
  'PostgreSQL': '#336791',
  'MongoDB': '#47A248',
  'GraphQL': '#E10098',
  'Git': '#F05032',
  'Docker': '#2496ED',
  'AWS': '#FF9900',
  'Vercel': '#000000',
  'Figma': '#F24E1E',
  'Linux': '#FCC624',
  'LeetCode': '#FFA116',
  'SolidWorks': '#FF0000',
  'AutoCAD': '#E51937',
  'Fusion 360': '#FF6600',
  'ANSYS': '#FFB71B',
  'MATLAB': '#0076A8',
  'Arduino': '#00979D',
  'Raspberry Pi': '#A22846'
};

interface TechLogoProps {
  technology: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const TechLogo = memo<TechLogoProps>(({ 
  technology, 
  size = 'md', 
  showLabel = false, 
  className 
}) => {
  const LogoComponent = techLogos[technology] || Code;
  const color = techColors[technology];
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const containerSizeClasses = {
    sm: showLabel ? 'flex items-center space-x-1' : '',
    md: showLabel ? 'flex items-center space-x-2' : '',
    lg: showLabel ? 'flex items-center space-x-3' : ''
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn(containerSizeClasses[size], className)}>
      <LogoComponent 
        className={cn(
          sizeClasses[size],
          'transition-all duration-200 hover:scale-110'
        )}
        style={{ color: color || 'currentColor' }}
        aria-label={`${technology} logo`}
      />
      {showLabel && (
        <span className={cn(
          textSizeClasses[size],
          'font-medium text-gray-700 dark:text-gray-300'
        )}>
          {technology}
        </span>
      )}
    </div>
  );
});

TechLogo.displayName = 'TechLogo';

export default TechLogo;