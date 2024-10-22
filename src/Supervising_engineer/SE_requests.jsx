import React, { useState } from "react";
import './CSS/requestSE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:4000/api/email";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    try {
      const res = await fetch(`${baseUrl}/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const responseData = await res.json();
      alert(responseData.message);

      // Clear the form after successful email send
      setEmail("");
      setSubject("");
      setMessage("");
      
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Check the console for more details.");
    }
  };

  return (
    <div className="my-form1">
      <h1><FontAwesomeIcon icon={faEnvelope} /> Send Email</h1>
      <p>This form facilitates communication with Heads of Department regarding the allocation of further trainings for engineers at the power plant. Please ensure that all necessary details, including information about the training and the issuing firm, are included in the message to ensure efficient processing and coordination.</p>
      <div className="my-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            value={email} // Bind input value to state
            placeholder="Receiver's Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            value={subject} // Bind input value to state
            placeholder="Enter the subject here..."
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            value={message} // Bind input value to state
            placeholder="Enter your message here..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button onClick={() => sendEmail()} className="send-button">
          <FontAwesomeIcon icon={faPaperPlane} /> Send Email
        </button>
      </div>
    </div>
  );
}
