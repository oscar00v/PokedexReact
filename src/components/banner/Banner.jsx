import React from 'react'
import styles from './Banner.module.css';

function Banner() {
  return (
    <div>
      <header className={styles.banner}>
      <img 
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
            alt="GitHub Logo" 
            width="40" 
            height="40"
          />
        <a
            
            href="https://github.com/oscar00v" 
            className={styles.githubLink}
        >
        Oscar00v
        </a>
      </header>
    </div>
  )
}

export default Banner
