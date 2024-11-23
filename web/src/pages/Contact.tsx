import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("access_key", "8e608923-e7e2-495a-97c8-093d6fd17840");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setIsMessageSent(true);
      e.currentTarget.reset();
    } else {
      console.log("Error", data);
      setIsMessageSent(false);
    }
  };
  const contactMethods = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Chat with us",
      description: "We're here to help.",
      action: "a.elghazi@aui.ma",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round the clock assistance",
      action: "+212 698 20 45 60",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit us",
      description: "Ifrane, Morocco",
      action: "Get directions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mt-7 text-gray-800 sm:text-5xl">
            Get in Touch{" "}
            <Sparkles className="inline-block w-8 h-8 text-blue-500" />
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex p-3 rounded-lg bg-blue-50 text-blue-500 ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all duration-300">
                  {method.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {method.title}
                </h3>
                <p className="mt-2 text-gray-600">{method.description}</p>
                <p className="mt-4 text-blue-500 font-medium cursor-pointer hover:text-blue-600">
                  {method.action}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-8 bg-white rounded-2xl shadow-lg"
          >
            {/* HERE WE HAVE THE FORM */}
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
              {/* THIS IS THE NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-3"
                  placeholder="John Doe"
                  required
                />
              </div>
              {/* THIS IS THE EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-3"
                  placeholder="john@example.com"
                  required
                />
              </div>
              {/* THIS IS THE MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-3"
                  placeholder="Your message here..."
                  required
                />
              </div>
              {/* THIS IS THE BUTTON */}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
                <Send className="ml-2 w-5 h-5" />
              </motion.button>{" "}
              <AnimatePresence>
                {isMessageSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center mt-6 w-96 flex justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Connect with Us
          </h2>
          <div className="flex justify-center space-x-6 mt-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com/AchrafELGhazi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://www.linkedin.com/in/achraf-el-ghazi-16b8bb2a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="mailto:a.elghazi@aui.ma"
              className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} IG.Blog Manager. All rights reserved.
          </p>
          <p className="mt-2">
            Crafted with <span className="text-red-500">♥</span> by Achraf EL
            GHAZI in Casablanca, Morocco
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Contact;
