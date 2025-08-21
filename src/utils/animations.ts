import { Variants } from 'framer-motion';

// Correct variants that fix the type error
export const heroSlideVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.2, 
      ease: "easeInOut" // Correct: string literal, not string[]
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 1.2, 
      ease: "easeInOut" 
    } 
  }
};

export const heroContentVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: 0.2,
      ease: "easeOut" // Correct: string literal
    } 
  }
};

export const heroButtonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] // Correct: bezier curve array
    } 
  }
};

// Navigation variants
export const navVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      delay: 0.5,
      ease: "easeOut" 
    } 
  }
};

// Card variants for featured trips
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

// Stagger container variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

// Fade in variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

// Slide up variants
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut" 
    } 
  }
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut" 
    } 
  }
};

// Progress bar variants
export const progressVariants: Variants = {
  hidden: { width: 0 },
  visible: { 
    width: '100%',
    transition: { 
      duration: 6, 
      ease: "linear" 
    } 
  }
};
