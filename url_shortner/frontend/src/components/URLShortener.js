import React, { useState } from 'react';
import styles from '../Styles/style.module.css'; // adjust the path if needed

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [hrs, setHrs] = useState('');
  const [mins, setMins] = useState('');
  const [secs, setSecs] = useState('');
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const submitURL = () => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(\/[^\s]*)?$/;
    if (!url || !urlPattern.test(url)) {
      setMessage('Please enter a valid URL.');
      setShortUrl('');
      return;
    }

    if (!(+hrs || +mins || +secs)) {
      setMessage('Please enter a valid expiration time.');
      setShortUrl('');
      return;
    }

   fetch(`${window.location.origin}/shorten/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url,
        hrs: +hrs || 0,
        mins: +mins || 0,
        secs: +secs || 0,
      }),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err));
        return res.json();
      })
      .then(data => {
        if (data.short_url) {
          setShortUrl(data.short_url);
          setMessage('');
        } else {
          setMessage(data.error || 'Something went wrong.');
        }
      })
      .catch(err => {
        setMessage('Network error: ' + (err.error || err.message || JSON.stringify(err)));
        setShortUrl('');
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.urlShortenerPage}>
      <div className={styles.bubbleContainer}>
        <div className={styles.bubble} style={{ width: '40px', height: '40px', left: '10%', background: '#FF6B6B', animationDuration: '10s' }} />
        <div className={styles.bubble} style={{ width: '30px', height: '30px', left: '25%', background: '#FFD93D', animationDuration: '8s' }} />
        <div className={styles.bubble} style={{ width: '50px', height: '50px', left: '40%', background: '#6BCB77', animationDuration: '12s' }} />
        <div className={styles.bubble} style={{ width: '35px', height: '35px', left: '60%', background: '#4D96FF', animationDuration: '9s' }} />
        <div className={styles.bubble} style={{ width: '45px', height: '45px', left: '80%', background: '#FF6B6B', animationDuration: '11s' }} />
      </div>

      <div className={styles.container}>
        <h1>URL Shortener</h1>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          className={styles.input}
        />
        <div className={styles.timerInputs}>
          <input
            type="number"
            value={hrs}
            onChange={e => setHrs(e.target.value)}
            placeholder="HH"
            min="0"
            max="23"
            className={styles.input}
          />
          <span>:</span>
          <input
            type="number"
            value={mins}
            onChange={e => setMins(e.target.value)}
            placeholder="MM"
            min="0"
            max="59"
            className={styles.input}
          />
          <span>:</span>
          <input
            type="number"
            value={secs}
            onChange={e => setSecs(e.target.value)}
            placeholder="SS"
            min="0"
            max="59"
            className={styles.input}
          />
        </div>

        <button onClick={submitURL} className={styles.button}>Submit</button>

        <div className={styles.message}>{message}</div>

        {shortUrl && (
  <div className={styles.shortenedUrlContainer}>
    <p>
      Your Shortened URL: <span className={styles.shortenedUrl}>{shortUrl}</span>
    </p>
    <button onClick={handleCopy} className={styles.copyButton}>
      {copied ? 'Copied!' : 'Copy URL'}
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default URLShortener;
