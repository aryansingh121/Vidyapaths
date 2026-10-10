import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * 
 * Reusable scroll restoration solution for React Router:
 * 1. If navigating without a hash: instantly resets scroll to top of page (0, 0).
 * 2. If navigating with a hash from a different page: instantly places user at target section
 *    with 90px sticky navbar offset (avoiding multi-second smooth animation across 15,000px).
 * 3. If clicking a hash on the same page: smoothly scrolls to target with navbar offset.
 * 4. Respects browser back/forward navigation.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const isNewPage = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;

    if (hash) {
      const targetId = decodeURIComponent(hash.replace('#', ''));

      const scrollToHash = (behavior = isNewPage ? 'instant' : 'smooth') => {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 90; // Fixed navbar height (75px) + 15px margin
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior
          });
          return true;
        }
        return false;
      };

      // Attempt immediately
      if (!scrollToHash()) {
        const timer = setTimeout(() => scrollToHash('instant'), 80);
        return () => clearTimeout(timer);
      }
    } else {
      // Standard page transition: instantly reset scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
}
