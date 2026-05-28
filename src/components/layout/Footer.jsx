import React from 'react'
import { APP_NAME } from '../../config/constants'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 font-medium">
      <aside>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{APP_NAME}</span>
        </div>
        <p className="mt-2 opacity-80">Copyright © {new Date().getFullYear()} - All rights reserved.</p>
      </aside>
    </footer>
  )
}

export default Footer
