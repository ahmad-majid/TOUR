import React, { useState } from "react";
import "./Newsletter.css";
import { Container, Col, Row } from "reactstrap";
import maletourist from "../assets/images/male-tourist.png";
import { BASE_URL } from "../Utils/config";
const Newsletter = () => {
  const [email, setEmail] = useState(""); // State to store email input
  const [message, setMessage] = useState(""); // State to store subscription message

  // Function to handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");

        setTimeout(() => {
          setMessage("");
        }, 10000); // 10 seconds
      } else {
        setMessage("Email already subscribed");
        setTimeout(() => {
          setMessage("");
        }, 10000); // 10 seconds
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe now to get useful travelling information.</h2>

              <form onSubmit={handleSubmit}>
                <div className="newsletter_input">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn newsletter_btn">
                    Subscribe
                  </button>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </form>

              {message && <p>{message}</p>}
            </div>
          </Col>
          <Col lg="6">
            <div className="newletter_img">
              <img src={maletourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
