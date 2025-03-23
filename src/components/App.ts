import { createElement, createLink } from "../utils/dom";
import { Footer } from "./Footer";
import { SearchForm } from "./SearchForm";

// Import helper function from redirect.ts
import { getParametersFromUrl } from "../utils/urlUtils";

export class App {
  private container: HTMLDivElement;
  private searchForm: SearchForm;
  
  constructor() {
    // Create main container with Tailwind classes - using a more modern gradient
    this.container = createElement('div', {
      className: 'flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[radial-gradient(ellipse_at_top,#3a0066,#000)] brightness-115'
    });
    
    // Create content container with Tailwind classes - improved glass morphism effect
    const contentContainer = createElement('div', {
      className: 'w-full max-w-6xl text-center p-6 md:p-10 bg-black/15 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/10 opacity-0'
    });
    
    // Add all CSS animations in a single style element
    this.addAnimationsToDocument();
    
    // Create logo container - larger size for the logo
    const logoContainer = createElement('div', {
      className: 'w-32 h-32 mx-auto mb-6 flex items-center justify-center relative transition-transform duration-300'
    });
    
    // Create a container for the header with a subtle background
    const headerContainer = createElement('div', {
      className: 'mb-8 py-3 px-4 sm:px-10 md:px-20 inline-block w-auto'
    });
    
    // Create header with Tailwind classes
    const header = createElement('h1', {
      className: 'text-5xl sm:text-6xl md:text-8xl font-bold py-2 tracking-wider flex items-center justify-center pr-4'
    });
    
    // Create the "ReBang" text with a subtle purple glow
    const rebangText = createElement('span', {
      className: 'text-5xl sm:text-6xl md:text-8xl bg-gradient-to-r from-[#8a2be2] via-[#9932cc] to-[#ba55d3] bg-clip-text text-transparent heebo-heading rebang-glow pr-2 pb-4 inline-block'
    }, ['Search']);
    
    header.appendChild(rebangText);
    
    // Add header to its container
    headerContainer.appendChild(header);
    
    // Create search form early so we can position elements properly
    // Always use the recursive styling for the search form
    this.searchForm = new SearchForm();
    
    // Add the recursive styling to the search input
    this.addRecursiveInputStyling();
    
    // Check if this is a recursive mode request
    const urlParams = getParametersFromUrl(window.location.href);
    const isRecursive = urlParams.get("recursive") === "true";
    
    // Assemble the UI components
    if (isRecursive) {
      // Add recursive joke if in recursive mode
      const jokeContainer = this.createRecursiveJokeContainer();
      contentContainer.append(headerContainer, jokeContainer, this.searchForm.getElement());
    } else {
      // Standard layout
      contentContainer.append(headerContainer, this.searchForm.getElement());
    }
    
    // Create footer
    const footer = new Footer();
    
    // Add content container and footer to the main container
    this.container.append(contentContainer, footer.getElement());
    
    // Trigger the fade-in animation after a small delay to ensure DOM is ready
    setTimeout(() => {
      contentContainer.classList.add('fade-in');
    }, 50);
  }
  
  /**
   * Adds the recursive styling to the search input
   */
  private addRecursiveInputStyling(): void {
    // Create and add a CSS rule for the recursive input styling
    if (!document.getElementById('recursive-style')) {
      const style = document.createElement('style');
      style.id = 'recursive-style';
      style.textContent = `
        .recursive-input {
          border-color: rgba(138, 43, 226, 0.3) !important;
          transition: all 0.3s ease;
        }
        
        .recursive-input:focus {
          border-color: rgba(138, 43, 226, 0.5) !important;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Apply the recursive styling after the render is complete
    setTimeout(() => {
      // Add the recursive styling to all search inputs
      const searchInputs = document.querySelectorAll('input[type="text"]');
      searchInputs.forEach(input => {
        input.classList.add('recursive-input');
      });
    }, 300);
  }
  
  /**
   * Creates and returns a container with a recursive joke
   */
  private createRecursiveJokeContainer(): HTMLElement {
    const recursiveJokes = [
      "Why do programmers prefer recursive functions? Because they can solve their own problems without asking for help!",
      "I was going to tell you a recursive joke... but I'd have to tell you a recursive joke first.",
      "How do you understand recursion? First, understand recursion.",
      "What's a recursive programmer's favorite movie? 'Inception', within 'Inception', within 'Inception'...",
      "Recursive function walks into a bar. Recursive function walks into a bar. Recursive function walks into a bar...",
      "To understand recursion: See 'recursion'.",
      "Hey look! A recursive function! Hey look! A recursive function! Hey look! A recursive function!",
      "Why did the recursive function go to therapy? It had too many self-references!",
      "Recursive functions are like Russian dolls - it's the same thing just getting smaller and smaller until you find a tiny solid one."
    ];
    
    // Get a random joke
    const randomIndex = Math.floor(Math.random() * recursiveJokes.length);
    const recursiveJoke = recursiveJokes[randomIndex];
    
    // Create a simplified joke container
    const jokeContainer = createElement('div', {
      className: 'w-full flex justify-center mb-6'
    });
    
    // Create a minimalist typing container for the joke
    const jokeText = createElement('div', {
      className: 'text-lg text-[#a788ff] font-mono animate-typewriter w-full opacity-70'
    }, [recursiveJoke]);
    
    jokeContainer.appendChild(jokeText);
    return jokeContainer;
  }
  
  /**
   * Adds all animations to the document in a single style element
   */
  private addAnimationsToDocument(): void {
    const style = document.createElement('style');
    style.textContent = `
      /* Fade-in animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
      
      /* Hue-shift animation */
      @keyframes hue-shift {
        0% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(-90deg); }
        100% { filter: hue-rotate(0deg); }
      }
      
      .animate-hue-shift {
        animation: hue-shift 3s infinite ease-in-out;
        mix-blend-mode: normal;
        pointer-events: none;
      }
      
      /* Logo hover effect */
      .logo-hover {
        transform: rotate(5deg) scale(1.1);
      }
      
      /* Brightness filter */
      .brightness-115 {
        filter: brightness(1.15);
      }
      
      /* Typography classes */
      .heebo-heading {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        letter-spacing: -0.02em;
      }
      
      .josefin-sans-exclamation {
        font-family: "Josefin Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 900;
        font-style: normal;
        transform: scaleX(1.4);
        display: inline-block;
        letter-spacing: -0.05em;
      }
      
      /* Text shadow animation */
      @keyframes pulse-shadow {
        0% { text-shadow: 0 0 4px rgba(0, 0, 0, 0.7); }
        50% { text-shadow: 0 0 8px rgba(0, 0, 0, 0.9); }
        100% { text-shadow: 0 0 4px rgba(0, 0, 0, 0.7); }
      }
      
      .animate-pulse-shadow {
        animation: pulse-shadow 4s infinite ease-in-out;
      }
      
      .rebang-glow {
        text-shadow: 0 0 10px rgba(186, 85, 211, 0.4);
      }
      
      /* Typewriter animation */
      .animate-typewriter {
        overflow: hidden;
        white-space: nowrap;
        margin: 0 auto;
        border-right: 3px solid #a788ff;
        width: 0;
        animation: typing 3.5s steps(40, end) forwards, blink 1s step-end infinite;
      }
      
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: #a788ff; }
      }
    `;
    document.head.appendChild(style);
  }
  
  public render(rootElement: HTMLElement): void {
    // Clear the root element
    rootElement.innerHTML = '';
    
    // Append the app container
    rootElement.appendChild(this.container);
    
    // Focus the search input after a short delay to allow animation to complete
    setTimeout(() => {
      this.searchForm.focus();
    }, 300);
  }
} 