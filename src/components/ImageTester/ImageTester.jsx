import { useState } from 'react'
import styles from './ImageTester.module.css'

const ImageTester = () => {
  const [testUrl, setTestUrl] = useState('')
  const [imageStatus, setImageStatus] = useState('')
  const [showImage, setShowImage] = useState(false)

  const testImage = () => {
    if (!testUrl) {
      setImageStatus('Please enter a URL')
      return
    }

    setImageStatus('Testing...')
    setShowImage(true)
  }

  const handleImageLoad = () => {
    setImageStatus('✅ Image loaded successfully!')
  }

  const handleImageError = () => {
    setImageStatus('❌ Failed to load image. Check console for details.')
    console.error('Image failed to load:', testUrl)
  }

  return (
    <div className={styles.container}>
      <h3>Image URL Tester</h3>
      <input 
        type="text"
        value={testUrl}
        onChange={(e) => setTestUrl(e.target.value)}
        placeholder="Paste image URL here to test"
        className={styles.input}
      />
      <button onClick={testImage} className={styles.button}>
        Test Image
      </button>
      
      {imageStatus && (
        <p className={styles.status}>{imageStatus}</p>
      )}
      
      {showImage && testUrl && (
        <div className={styles.imageContainer}>
          <img 
            src={testUrl}
            alt="Test"
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={styles.testImage}
          />
        </div>
      )}
    </div>
  )
}

export default ImageTester
