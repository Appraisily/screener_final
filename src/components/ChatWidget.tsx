import { useEffect } from 'react';

export function ChatWidget() {
  useEffect(() => {
    // Only load the widget if it hasn't been loaded already
    if (!document.getElementById('appraisily-chat-widget-loader')) {
      // Create container div
      const container = document.createElement('div');
      container.id = 'appraisily-chat-widget-container';
      document.body.appendChild(container);

      // Create and append script
      const script = document.createElement('script');
      script.id = 'appraisily-chat-widget-loader';
      script.async = true;
      script.src = 'https://frolicking-macaron-54f908.netlify.app/widget-loader.js';
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const script = document.getElementById('appraisily-chat-widget-loader');
      const container = document.getElementById('appraisily-chat-widget-container');
      
      if (script) {
        script.remove();
      }
      if (container) {
        container.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
}