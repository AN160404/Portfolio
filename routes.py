from flask import render_template, request, flash, redirect, url_for
from flask_mail import Message
from app import app, mail
from forms import ContactForm
import logging

logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def index():
    form = ContactForm()
    return render_template('index.html', form=form)

@app.route('/contact', methods=['POST'])
def contact():
    form = ContactForm()
    
    if form.validate_on_submit():
        try:
            # Create email message
            msg = Message(
                subject=f"Portfolio Contact: {form.subject.data}",
                recipients=['atianaim87@gmail.com'],
                body=f"""
New message from portfolio website:

Name: {form.name.data}
Email: {form.email.data}
Subject: {form.subject.data}

Message:
{form.message.data}
                """,
                reply_to=form.email.data
            )
            
            # Send email
            mail.send(msg)
            flash('Thank you for your message! I\'ll get back to you soon.', 'success')
            
        except Exception as e:
            logging.error(f"Failed to send email: {str(e)}")
            flash('There was an error sending your message. Please try again or contact me directly.', 'error')
    
    else:
        # Form validation failed
        for field, errors in form.errors.items():
            for error in errors:
                flash(f'{field.title()}: {error}', 'error')
    
    return redirect(url_for('index') + '#contact')
