import { useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import imageCompression from 'browser-image-compression'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import 'leaflet/dist/leaflet.css'

const DEFAULT_CAMPUS_CENTER = [18.5204, 73.8567]

const TicketSubmit = () => {
  const { userId } = useAuth()
  const { user } = useUser()
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const issueTypeRef = useRef(null)
  const imageRef = useRef(null)
  const anonymousRef = useRef(null)
  const sampleImageRef = useRef(null)
  const sampleIndexRef = useRef(0)

  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })
  const [locationStatus, setLocationStatus] = useState('')
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

  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        setCoordinates({
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        })
        setLocationStatus('Location selected on map.')
      },
    })

    return null
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.')
      return
    }

    setLocationStatus('Fetching location...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationStatus('Location captured successfully.')
        toast.success('Location captured successfully.')
      },
      () => {
        setLocationStatus('Unable to retrieve your location.')
        toast.error('Unable to retrieve your location.')
      },
    )
  }

  const handleTicketSubmit = async (event) => {
    event.preventDefault()

    setUploadProgress(0)
    setCompressionStatus('')
    setIsUploading(false)

    const latValue = coordinates.lat
    const lngValue = coordinates.lng
    const hasCoordinates =
      latValue !== '' &&
      lngValue !== '' &&
      Number.isFinite(Number(latValue)) &&
      Number.isFinite(Number(lngValue))

    const payload = {
      title: titleRef.current?.value?.trim() || '',
      description: descriptionRef.current?.value?.trim() || '',
      location: hasCoordinates ? [Number(lngValue), Number(latValue)] : null,
      aiIssueType: issueTypeRef.current?.value || '',
      reporterId: userId || null,
      isAnonymous: anonymousRef.current?.checked || false,
      reportedByDisplay: user?.fullName || null,
      imageFile: imageRef.current?.files?.[0] || null,
      useSampleImage: forceSampleImage || sampleImageRef.current?.checked || false,
    }

    if (!payload.title || !payload.description) {
      toast.error('Please enter a title and description before submitting.')
      return
    }

    if (!payload.aiIssueType) {
      toast.error('Please select an issue type before submitting.')
      return
    }

    if (!payload.location) {
      toast.error('Please capture your location before submitting.')
      return
    }

    if (!payload.reporterId) {
      toast.error('Please sign in before submitting a maintenance ticket.')
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
        xhr.open('POST', 'http://localhost:7777/api/tickets/create')
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
        let errorText = 'Unable to submit ticket. Please try again.'
        try {
          const errorBody = JSON.parse(response.responseText)
          if (errorBody?.message) {
            errorText = errorBody.message
          }
        } catch (error) {
          // Ignore JSON parse errors and show default message
        }
        toast.error(errorText)
        return
      }

      if (titleRef.current) titleRef.current.value = ''
      if (descriptionRef.current) descriptionRef.current.value = ''
      if (issueTypeRef.current) issueTypeRef.current.value = ''
      if (imageRef.current) imageRef.current.value = ''
      if (anonymousRef.current) anonymousRef.current.checked = false
      if (sampleImageRef.current) sampleImageRef.current.checked = false

      setCoordinates({ lat: '', lng: '' })
      setLocationStatus('')
      toast.success('Maintenance ticket submitted successfully!')
      setUploadProgress(100)
      setTimeout(() => setUploadProgress(0), 800)
    } catch (error) {
      toast.error('Something went wrong while submitting. Please try again.')
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
            Student/Faculty Report
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Submit a Maintenance Ticket</h1>
          <p className="mt-2 text-sm text-white/70">
            Report campus facility issues so the maintenance team can resolve them quickly.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleTicketSubmit}>
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
            <label className="text-sm font-medium text-white/80" htmlFor="ticket-title">
              Title
            </label>
            <input
              id="ticket-title"
              ref={titleRef}
              type="text"
              placeholder="Short summary of the issue"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="ticket-description">
              Description
            </label>
            <textarea
              id="ticket-description"
              ref={descriptionRef}
              rows="5"
              placeholder="Describe the issue, location landmarks, and urgency"
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
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 [&>option]:bg-slate-900"
            >
              <option value="" disabled>
                Select an issue type
              </option>
              <option value="IT/Network">IT/Network</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Furniture/Structural">Furniture/Structural</option>
              <option value="AC/HVAC">AC/HVAC</option>
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
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-white/80">Campus Location</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={coordinates.lat}
                      onChange={(event) =>
                        setCoordinates((prev) => ({ ...prev, lat: event.target.value }))
                      }
                      placeholder="18.5204"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={coordinates.lng}
                      onChange={(event) =>
                        setCoordinates((prev) => ({ ...prev, lng: event.target.value }))
                      }
                      placeholder="73.8567"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </div>
                {locationStatus ? (
                  <p className="text-xs text-emerald-200">{locationStatus}</p>
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
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <MapContainer
                center={
                  coordinates.lat !== '' && coordinates.lng !== ''
                    ? [Number(coordinates.lat), Number(coordinates.lng)]
                    : DEFAULT_CAMPUS_CENTER
                }
                zoom={16}
                className="h-64 w-full"
                scrollWheelZoom={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {coordinates.lat !== '' && coordinates.lng !== '' ? (
                  <Marker position={[Number(coordinates.lat), Number(coordinates.lng)]} />
                ) : null}
              </MapContainer>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
              isUploading ? 'bg-emerald-500/60' : 'bg-emerald-500 hover:bg-emerald-400'
            }`}
          >
            {isUploading ? 'Submitting...' : 'Submit Maintenance Ticket'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default TicketSubmit
