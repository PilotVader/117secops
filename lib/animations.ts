export const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const slideIn = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

export const scaleIn = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

export const purpleGlow = {
  initial: {
    boxShadow: "0 0 0 rgba(99, 32, 192, 0)",
  },
  animate: {
    boxShadow: "0 0 20px rgba(99, 32, 192, 0.3)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}

export const purpleTextGlow = {
  initial: {
    textShadow: "0 0 0 rgba(99, 32, 192, 0)",
  },
  animate: {
    textShadow: "0 0 10px rgba(99, 32, 192, 0.5)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}
