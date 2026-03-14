import { useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { useAuth, useUser } from '@clerk/clerk-react'

const ComplaintSubmit = () => {
  const { userId } = useAuth()
  const { user } = useUser()
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const issueTypeRef = useRef(null)
  const imageRef = useRef(null)
  const anonymousRef = useRef(null)
  const sampleImageRef = useRef(null)
  const sampleIndexRef = useRef(0)

  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [compressionStatus, setCompressionStatus] = useState('')

  const uploadMode = import.meta.env.VITE_IMAGE_UPLOAD_MODE || 'real'
  const forceSampleImage = uploadMode === 'sample'

  const sampleImages = [
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    'https://res.cloudinary.com/demo/image/upload/balloons.jpg',
    'https://res.cloudinary.com/demo/image/upload/park.jpg',
  ]

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.')
      return
    }

    setLocationStatus('Fetching location...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLocation(nextLocation)
        setLocationStatus('Location captured successfully.')
      },
      () => {
        setLocationStatus('Unable to retrieve your location.')
      },
    )
  }

  const handleComplaintSubmit = async (event) => {
    event.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')
    setUploadProgress(0)
    setCompressionStatus('')
    setIsUploading(false)

    const payload = {
      title: titleRef.current?.value?.trim() || '',
      description: descriptionRef.current?.value?.trim() || '',
      location: location ? [location.lng, location.lat] : null,
      aiIssueType: issueTypeRef.current?.value || '',
      reporterId: userId || null,
      isAnonymous: anonymousRef.current?.checked || false,
      reportedByDisplay: user?.fullName || null,
      imageFile: imageRef.current?.files?.[0] || null,
      useSampleImage: forceSampleImage || sampleImageRef.current?.checked || false,
    }

    if (!payload.title || !payload.description) {
      setErrorMessage('Please enter a title and description before submitting.')
      return
    }

    if (!payload.aiIssueType) {
      setErrorMessage('Please select an issue type before submitting.')
      return
    }

    if (!payload.location) {
      setErrorMessage('Please capture your location before submitting.')
      return
    }

    if (!payload.reporterId) {
      setErrorMessage('Please sign in before submitting a complaint.')
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('title', payload.title)
      formData.append('description', payload.description)
      formData.append('location', JSON.stringify(payload.location))
      formData.append('aiIssueType', payload.aiIssueType)
      formData.append('reporterId', payload.reporterId)
      formData.append('isAnonymous', String(payload.isAnonymous))
      if (payload.reportedByDisplay) {
        formData.append('reportedByDisplay', payload.reportedByDisplay)
      }
      if (payload.useSampleImage) {
        const index = sampleIndexRef.current % sampleImages.length
        const selectedUrl = sampleImages[index]
        sampleIndexRef.current += 1
        formData.append('imageUrls', JSON.stringify([selectedUrl]))
      } else if (payload.imageFile) {
        setCompressionStatus('Compressing image...')
        const options = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: true }
        const compressedFile = await imageCompression(payload.imageFile, options)
        setCompressionStatus('')
        formData.append('image', compressedFile)
      }
      const response = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:7777/api/complaints/create')
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100)
            setUploadProgress(percent)
          }
        }
        xhr.onload = () => resolve(xhr)
        xhr.onerror = () => reject(new Error('Upload failed'))
        xhr.send(formData)
      })

      if (response.status < 200 || response.status >= 300) {
        let errorText = 'Unable to submit complaint. Please try again.'
        try {
          const errorBody = JSON.parse(response.responseText)
          if (errorBody?.message) {
            errorText = errorBody.message
          }
        } catch (error) {
          // Ignore JSON parse errors and show default message
        }
        setErrorMessage(errorText)
        return
      }

      if (titleRef.current) titleRef.current.value = ''
      if (descriptionRef.current) descriptionRef.current.value = ''
      if (issueTypeRef.current) issueTypeRef.current.value = ''
      if (imageRef.current) imageRef.current.value = ''
      if (anonymousRef.current) anonymousRef.current.checked = false
      if (sampleImageRef.current) sampleImageRef.current.checked = false

      setLocation(null)
      setLocationStatus('')
      setSuccessMessage('Complaint submitted successfully.')
      setUploadProgress(100)
      setTimeout(() => setUploadProgress(0), 800)
    } catch (error) {
      setErrorMessage('Something went wrong while submitting. Please try again.')
    } finally {
      setIsUploading(false)
      setCompressionStatus('')
    }
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            Citizen Report
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Submit a Complaint</h1>
          <p className="mt-2 text-sm text-white/70">
            Share the issue details and help the city resolve it faster.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleComplaintSubmit}>
          {errorMessage ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          ) : null}
          {successMessage ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {successMessage}
            </div>
          ) : null}
          {uploadProgress > 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{compressionStatus || 'Uploading'}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : null}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="complaint-title">
              Title
            </label>
            <input
              id="complaint-title"
              ref={titleRef}
              type="text"
              placeholder="Short headline for the issue"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="complaint-description">
              Description
            </label>
            <textarea
              id="complaint-description"
              ref={descriptionRef}
              rows="5"
              placeholder="Describe the issue and any nearby landmarks"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="issue-type">
              Issue Type
            </label>
            <select
              id="issue-type"
              ref={issueTypeRef}
              defaultValue=""
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            >
              <option value="" disabled>
                Select an issue type
              </option>
              <option value="Pothole">Pothole</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Streetlight Failure">Streetlight Failure</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="issue-image">
              Upload Image (optional)
            </label>
            <input
              id="issue-image"
              ref={imageRef}
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-emerald-400"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-white/70">
            <input
              ref={anonymousRef}
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/10 text-emerald-400 focus:ring-emerald-400/40"
            />
            Show my name as Anonymous in the feed
          </label>
          <label className="flex items-center gap-3 text-sm text-white/70">
            <input
              ref={sampleImageRef}
              type="checkbox"
              defaultChecked={forceSampleImage}
              disabled={forceSampleImage}
              className="h-4 w-4 rounded border-white/20 bg-white/10 text-emerald-400 focus:ring-emerald-400/40"
            />
            {forceSampleImage ? 'Sample image mode enabled (dev)' : 'Use sample image (testing only)'}
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white/80">Location</p>
                <p className="text-xs text-white/60">
                  {location
                    ? `Location captured: Lat ${location.lat.toFixed(5)}, Lng ${location.lng.toFixed(5)}`
                    : 'No location captured yet.'}
                </p>
                {locationStatus ? (
                  <p className="mt-2 text-xs text-emerald-200">{locationStatus}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                className="rounded-full border border-emerald-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:border-emerald-300 hover:text-white"
              >
                Get My Location
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
              isUploading ? 'bg-emerald-500/60' : 'bg-emerald-500 hover:bg-emerald-400'
            }`}
          >
            {isUploading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ComplaintSubmit
