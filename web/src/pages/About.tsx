import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className='about-container'>
      <Navbar />

      <h1>About Us</h1>
      <p>
        Welcome to our website! We are dedicated to providing the best services
        to our customers. Our team is passionate about what we do and we strive
        to exceed expectations.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to deliver high-quality products and services that
        enhance the lives of our customers. We believe in innovation, integrity,
        and excellence in everything we do.
      </p>
      <h2>Our Team</h2>
      <p>
        Our team consists of experienced professionals who are experts in their
        respective fields. We work collaboratively to bring you the best
        solutions tailored to your needs.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to learn more about our
        services, feel free to reach out to us at
        <a href='mailto:info@example.com'> info@example.com</a>.
      </p>
    </div>
  );
};

export default About;
