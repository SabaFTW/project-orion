/**
 * 🜂 T9 ORION SAFE COMPONENTS 🜂
 * Sacred armor against XSS demons and injection attacks
 * 
 * Based on Ara's 2025 security techniques:
 * - React's default text escaping (sacred protection)
 * - DOMPurify for HTML sanitization (meč proti Egregorju)
 * - URL validation against javascript:/data: protocols
 * - CSP-compliant patterns
 * 
 * Usage:
 *   import { escapeHtml, SafeLink, SafeHtml } from './SafeComponents';
 * 
 * 🔥 SIDRO STOJI. OGENJ GORI. SHIELD RISES. 🔥
 */

import React from 'react';
import DOMPurify from 'dompurify';

/**
 * HTML Escape Function
 * Converts dangerous characters to HTML entities
 * 
 * Protects against:
 * - XSS injection in template literals
 * - innerHTML manipulation attacks
 * - Attribute-based XSS
 * 
 * @param {string|null|undefined} unsafe - Potentially dangerous string
 * @returns {string} - Escaped safe string
 */
export const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) {
    return '';
  }
  
  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;'  // Extra protection against closing tags
  };
  
  return String(unsafe).replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
};

/**
 * Safe Link Component
 * Validates href attributes to prevent javascript: and data: protocol attacks
 * 
 * Protects against:
 * - javascript: protocol XSS
 * - data: protocol injection
 * - Malicious URL schemes
 * 
 * @param {object} props - Component props
 * @param {string} props.href - URL to validate
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.className - Optional CSS classes
 * @param {object} props.rest - Other link attributes
 */
export const SafeLink = ({ href, children, className = '', ...rest }) => {
  // Validate href against dangerous protocols
  const isDangerous = (url) => {
    if (!url || typeof url !== 'string') return true;
    
    const lowerUrl = url.trim().toLowerCase();
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    
    return dangerousProtocols.some(protocol => lowerUrl.startsWith(protocol));
  };
  
  // If URL is dangerous, render as disabled span
  if (isDangerous(href)) {
    return (
      <span 
        className={`safe-link-disabled ${className}`}
        style={{ 
          color: '#999', 
          textDecoration: 'line-through',
          cursor: 'not-allowed'
        }}
        title="Invalid or dangerous URL blocked for your safety"
        {...rest}
      >
        {children} ⚠️
      </span>
    );
  }
  
  // Safe URL - render normal link
  return (
    <a 
      href={href} 
      className={className}
      rel="noopener noreferrer"  // Prevent window.opener attacks
      {...rest}
    >
      {children}
    </a>
  );
};

/**
 * Safe HTML Component
 * Uses DOMPurify to sanitize HTML before rendering
 * 
 * Protects against:
 * - XSS in user-generated HTML content
 * - Script injection in rich text
 * - Event handler injection
 * - Style-based attacks
 * 
 * @param {object} props - Component props
 * @param {string} props.html - HTML string to sanitize and render
 * @param {string} props.className - Optional CSS classes
 * @param {object} props.config - Optional DOMPurify configuration
 */
export const SafeHtml = ({ 
  html, 
  className = '', 
  config = {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    SAFE_FOR_TEMPLATES: true
  }
}) => {
  // Sanitize HTML with DOMPurify
  const sanitized = DOMPurify.sanitize(html || '', config);
  
  return (
    <div 
      className={`safe-html ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

/**
 * Safe Text Component
 * Renders text with automatic HTML escaping
 * Use this for user-generated content in Community Annotations
 * 
 * @param {object} props - Component props
 * @param {string} props.text - Text to safely render
 * @param {string} props.className - Optional CSS classes
 * @param {string} props.as - HTML element to render as (default: 'span')
 */
export const SafeText = ({ text, className = '', as: Component = 'span' }) => {
  const escaped = escapeHtml(text);
  
  return (
    <Component 
      className={className}
      dangerouslySetInnerHTML={{ __html: escaped }}
    />
  );
};

/**
 * Safe User Content Component
 * Specialized component for Community Annotations
 * Handles user-submitted content with maximum security
 * 
 * Features:
 * - HTML escaping for text
 * - DOMPurify for allowed markup (if enabled)
 * - Link validation
 * - XSS prevention
 * 
 * @param {object} props - Component props
 * @param {string} props.content - User content (text or HTML)
 * @param {boolean} props.allowHtml - Whether to allow (sanitized) HTML
 * @param {string} props.author - Content author name
 * @param {number} props.votes - Vote count
 * @param {boolean} props.verified - Verification badge
 */
export const SafeUserContent = ({ 
  content, 
  allowHtml = false, 
  author, 
  votes = 0,
  verified = false 
}) => {
  return (
    <div className="safe-user-content">
      <div className="content-header">
        <span className="author">{escapeHtml(author)}</span>
        {verified && <span className="verified-badge" title="Verified">✓</span>}
        <span className="votes">{votes} votes</span>
      </div>
      
      <div className="content-body">
        {allowHtml ? (
          <SafeHtml html={content} />
        ) : (
          <SafeText text={content} as="p" />
        )}
      </div>
    </div>
  );
};

/**
 * CSP Helmet Component
 * Configures Content Security Policy headers for the app
 * 
 * Add this to your root component or _app.js/_app.tsx
 */
export const SecurityHelmet = () => {
  return (
    <>
      <meta httpEquiv="Content-Security-Policy" content={`
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com;
        style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com;
        img-src 'self' data: https:;
        connect-src 'self' https://sabaftw.github.io;
        font-src 'self' data:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
      `.replace(/\s+/g, ' ').trim()} />
      
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </>
  );
};

/**
 * Validation Utilities
 * Helper functions for input validation
 */
export const validators = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  /**
   * Validate URL format
   */
  isValidUrl: (url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
  
  /**
   * Sanitize filename for safe storage
   */
  sanitizeFilename: (filename) => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')  // Replace special chars with underscore
      .replace(/\.{2,}/g, '.')           // Prevent directory traversal
      .substring(0, 255);                // Limit length
  },
  
  /**
   * Check if string contains SQL injection patterns
   */
  hasSQLInjection: (input) => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
      /(--|#|\/\*|\*\/)/,
      /(\bOR\b.*=.*)/i,
      /(\bAND\b.*=.*)/i
    ];
    return sqlPatterns.some(pattern => pattern.test(input));
  }
};

/**
 * 🜂 EXPORT ALL SACRED COMPONENTS 🜂
 */
export default {
  escapeHtml,
  SafeLink,
  SafeHtml,
  SafeText,
  SafeUserContent,
  SecurityHelmet,
  validators
};

/**
 * 🔥 USAGE EXAMPLES 🔥
 * 
 * // In Community Annotations component:
 * import { SafeUserContent, escapeHtml } from './SafeComponents';
 * 
 * const CommunityAnnotations = ({ annotations }) => {
 *   return (
 *     <div>
 *       {annotations.map(ann => (
 *         <SafeUserContent
 *           key={ann.id}
 *           content={ann.text}
 *           author={ann.author}
 *           votes={ann.votes}
 *           verified={ann.verified}
 *           allowHtml={false}  // Force text-only for maximum security
 *         />
 *       ))}
 *     </div>
 *   );
 * };
 * 
 * // In Omrežja Moći (Power Networks):
 * import { SafeLink, escapeHtml } from './SafeComponents';
 * 
 * const PowerNetwork = ({ company }) => {
 *   return (
 *     <div>
 *       <h3>{escapeHtml(company.name)}</h3>
 *       <SafeLink href={company.website}>
 *         Visit {escapeHtml(company.name)}
 *       </SafeLink>
 *     </div>
 *   );
 * };
 * 
 * // In root _app.js:
 * import { SecurityHelmet } from './SafeComponents';
 * 
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Head>
 *         <SecurityHelmet />
 *       </Head>
 *       <Component {...pageProps} />
 *     </>
 *   );
 * }
 */
