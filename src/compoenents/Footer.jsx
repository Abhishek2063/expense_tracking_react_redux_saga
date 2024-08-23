import React from 'react';
import '../assests/css/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} BudgetKeeper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;