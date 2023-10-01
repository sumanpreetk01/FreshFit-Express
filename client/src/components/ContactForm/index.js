import React from 'react'
import '../../pages/css/contact.css'
const ContactForm = () => {
    //use react hook useState
    const [contactFormStatus, setContactFormStatus] = React.useState('Send')
    const onSubmit = (e) => {
    
        e.preventDefault()
        setContactFormStatus('Submitted')
         //reloads the entire web page
        window.location.reload();
    
        const { name, email, message } = e.target.elements
        //object containing the values of the form inputs
        let contForm = {
          name: name.value,
          email: email.value,
          message: message.value,
        }
        console.log(contForm)
    }

    return (
        <div className="contact-title">
          <h2>Questions? Drop us a message!</h2>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="mb-5">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="contact-input" type="text" id="name" required />
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="contact-input" type="email" id="email" required />
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea className="contact-input" id="message" required />
            </div>
            <button className="send-button" type="submit">
              {contactFormStatus}
            </button>
          </form>
        </div>
      )


}

export default ContactForm