    import React from 'react'

    const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-error fixed bottom-0   text-base-content p-8">
    <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
    </aside>
    </footer>
        </div>
    )
    }

    export default Footer