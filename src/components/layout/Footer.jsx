import React from 'react'
import { APP_NAME } from '../../config/constants'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-primary text-primary-content p-8">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by {APP_NAME}</p>
      </aside>
    </footer>
  )
}

export default Footer
