# Atia Naim Portfolio Website

## Overview

This is a personal portfolio website for Atia Naim, an aspiring AI & Data Science Engineer specializing in Generative AI, LLMs, and Side-Channel Analysis. The website is built as a Flask web application that showcases education, experience, projects, skills, achievements, and publications. It features a contact form with email functionality to allow visitors to send messages directly to the portfolio owner.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templating system with Flask
- **Base Template Structure**: Uses template inheritance with `base.html` as the main layout template
- **Single Page Application**: The main content is served through `index.html` which extends the base template
- **Responsive Design**: Built with Bootstrap 5.3.0 for mobile-first responsive layouts
- **Static Assets**: Organized into separate CSS and JavaScript files for maintainability
- **UI Framework**: Bootstrap CSS framework with custom CSS overrides for personalized styling
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **Fonts**: Google Fonts (Inter and JetBrains Mono) for professional typography

### Backend Architecture
- **Web Framework**: Flask (Python) with modular structure
- **Application Factory Pattern**: Central app configuration in `app.py` with route imports
- **Form Handling**: Flask-WTF for secure form processing and validation
- **Email Service**: Flask-Mail integration for contact form submissions
- **Environment Configuration**: Environment variables for sensitive configurations
- **Session Management**: Flask sessions with configurable secret keys
- **Proxy Support**: ProxyFix middleware for deployment behind reverse proxies

### Form Validation System
- **Client-Side Validation**: WTForms with custom validators for name, email, subject, and message fields
- **Server-Side Processing**: Comprehensive form validation with error handling and user feedback
- **Security**: CSRF protection through Flask-WTF
- **User Experience**: Flash message system for success and error notifications

### Email Integration
- **SMTP Configuration**: Configurable email server settings (defaults to Gmail)
- **Message Formatting**: Structured email templates for contact form submissions
- **Error Handling**: Comprehensive error handling with fallback messaging
- **Reply-To Support**: Automatic reply-to configuration for direct responses

## External Dependencies

### Frontend Dependencies
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Font Awesome 6.4.0**: Icon library for visual elements
- **Google Fonts**: Web fonts (Inter and JetBrains Mono) for typography

### Backend Dependencies
- **Flask**: Core web framework for Python
- **Flask-WTF**: Form handling and CSRF protection
- **Flask-Mail**: Email functionality for contact form
- **WTForms**: Form validation and rendering
- **Werkzeug**: WSGI utilities and middleware support

### Email Service Integration
- **SMTP Server**: Configurable email service (Gmail by default)
- **Environment Variables**: Required for email credentials and configuration
  - `MAIL_SERVER`: SMTP server address
  - `MAIL_PORT`: SMTP server port
  - `MAIL_USERNAME`: Email account username
  - `MAIL_PASSWORD`: Email account password
  - `MAIL_DEFAULT_SENDER`: Default sender email address

### Development and Deployment
- **Session Security**: `SESSION_SECRET` environment variable for secure sessions
- **Debug Mode**: Development-friendly error handling and hot reloading
- **Host Configuration**: Configured for deployment on 0.0.0.0:5000
- **Logging**: Python logging for debugging email functionality