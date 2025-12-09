"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


// Define the styles with a toned-down purple and light gradient theme
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // Subtle, light purple/lilac gradient for the background
    background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', // Very Light Purple to Pale Lavender
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#FFFFFF',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', // Lighter shadow
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center' as const,
  },
  header: {
    color: '#6A1B9A', // Medium Purple for contrast
    marginBottom: '30px',
    fontSize: '2.2rem',
    fontWeight: '700' as const,
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left' as const,
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4A148C', // Dark Purple for readability
    fontWeight: '600' as const,
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #E0B4F9', // Light Purple Border
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
    transition: 'border 0.3s, box-shadow 0.3s',
  },
  button: {
    width: '100%',
    padding: '15px',
    background: '#9C27B0', // Vibrant Purple for the action button
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '20px',
    fontWeight: 'bold' as const,
    letterSpacing: '0.5px',
    transition: 'background 0.3s, transform 0.1s',
  },
  buttonHover: {
    background: '#7B1FA2', // Slightly darker purple on hover
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 10px rgba(156, 39, 176, 0.4)',
  },
  footerText: {
    marginTop: '25px',
    color: '#9C27B0',
    fontSize: '0.9rem',
  },
  link: {
    color: '#4A148C',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
    marginLeft: '5px',
    transition: 'color 0.2s',
  },
  linkHover: {
      color: '#C084FC', // Lighter purple on hover for the link
  }
};


const Signup: React.FC = () => {
     const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
   
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await axios.post("/api/auth/createuser",{email,password});
    //@ts-ignore
    if(response.data.success){
       router.push("/api/auth/signin");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Join Us Today</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min 8 characters"
            />
          </div>

          {/* Confirm Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input
              style={styles.input}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>

          {/* Submit Button with Hover Effect */}
          <button
            type="submit"
           
            style={{ ...styles.button, ...(isButtonHovered ? styles.buttonHover : {}) }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Create Your Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already registered?
          <a
            href="/api/auth/signin"
            style={{ ...styles.link, ...(isLinkHovered ? styles.linkHover : {}) }}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;