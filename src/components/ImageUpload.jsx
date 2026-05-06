import { useRef } from 'react'
import styles from './ImageUpload.module.css'

/**
 * ImageUpload
 * Props:
 *   value      — current image (data URL or http URL string)
 *   onChange   — (newValue: string) => void
 *   label      — field label (default "Image")
 *   shape      — 'circle' | 'rect' (default 'rect')
 *   accept     — MIME types (default 'image/jpeg,image/png,image/webp,image/gif')
 *   maxKB      — max file size in KB (default 500 = 500 KB)
 */
export default function ImageUpload({
  value = '',
  onChange,
  label = 'Image',
  shape = 'rect',
  accept = 'image/jpeg,image/png,image/webp,image/gif',
  maxKB = 500,
}) {
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    if (file.size > maxKB * 1024) {
      alert(`Image is too large (max ${maxKB} KB). Please compress it first.`)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target.result)
    reader.readAsDataURL(file)
  }

  const onInputChange = (e) => handleFile(e.target.files[0])

  const onDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove(styles.dragOver)
    handleFile(e.dataTransfer.files[0])
  }

  const onDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add(styles.dragOver) }
  const onDragLeave = (e) => e.currentTarget.classList.remove(styles.dragOver)

  const isDataUrl = value && value.startsWith('data:')
  const isHttpUrl = value && (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/'))

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>{label}</label>

      <div className={styles.row}>
        {/* Drop zone / preview */}
        <div
          className={`${styles.dropzone} ${shape === 'circle' ? styles.circle : styles.rect}`}
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          {value ? (
            <img
              src={value}
              alt="preview"
              className={`${styles.preview} ${shape === 'circle' ? styles.circle : styles.rect}`}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.uploadIcon}>📁</span>
              <span className={styles.uploadHint}>Click or drop<br/>JPG / PNG</span>
            </div>
          )}
          <div className={styles.overlay}>
            <span>Change</span>
          </div>
        </div>

        {/* Right side: url input + actions */}
        <div className={styles.aside}>
          <div className={styles.urlRow}>
            <input
              type="text"
              className={styles.urlInput}
              placeholder="Or paste an image URL…"
              value={isDataUrl ? '' : (value || '')}
              onChange={e => onChange(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => inputRef.current?.click()}
            >
              📂 Upload file
            </button>
            {value && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => onChange('')}
              >
                × Remove
              </button>
            )}
          </div>
          {isDataUrl && (
            <span className={styles.badge}>✅ Uploaded ({Math.round(value.length * 0.75 / 1024)} KB)</span>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={onInputChange}
      />
    </div>
  )
}
