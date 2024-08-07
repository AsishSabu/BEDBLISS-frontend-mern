import { useState, useCallback, useEffect } from "react"
import Modal from "react-modal"
import { Accept, useDropzone } from "react-dropzone"
import { FaTrashAlt } from "react-icons/fa"
import uploadImagesToCloudinary from "../../api/imageUpload"
import PulseLoader from "react-spinners/PulseLoader"
type PhotoUploadModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpload: (imageUrls: string[]) => void
  file: string
}
type PreviewFile = File & {
  preview: string
}

const PhotoUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  file,
}: PhotoUploadModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<PreviewFile[]>([])
  const [loading, setLoading] = useState(false)
  const maxFiles = parseInt(file)

  useEffect(() => {
    setSelectedFiles([])
  }, [isOpen])
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
    ) => {
      console.log(selectedFiles)

      if (selectedFiles.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} images.`)
        return
      }
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles])
    },
    [selectedFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] } as Accept,
    maxSize: 10485760,
    multiple: maxFiles !== 1,
  })

  const handleRemoveFile = (file: any) => {
    setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file))
  }

  const handleUpload = async () => {
    if (selectedFiles) {
      setLoading(true)
      const imageUrls = await uploadImagesToCloudinary(selectedFiles)
      onUpload(imageUrls)
      setLoading(false)
      onClose()
    }
  }

  const renderPreviews = () => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {selectedFiles.map((file, index) => (
        <div key={index} className="relative">
          <img
            src={file.preview}
            alt="Preview"
            className="h-40 w-full object-cover rounded-md"
          />
          <button
            title="button"
            className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500"
            onClick={() => handleRemoveFile(file)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "auto",
        },
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-lg font-bold mb-2">Upload Photos</h2>
        <div
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Drag 'n' drop some files here</span>
              </label>
            </div>
          ) : (
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Click to select files</span>
              </label>
            </div>
          )}
          <p className="text-xs text-indigo-600">PNG, JPG, GIF up to 10MB</p>
        </div>
        {renderPreviews()}
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-600 mr-2 p-2 rounded-lg text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          {loading ? (
            <button
              className="flex bg-green-400 mr-2 p-2 rounded-lg text-white "
              onClick={handleUpload}
            >
              Uploading{" "}
              <PulseLoader color="#FFFFFF" className=" px-1 mt-2" size={8} />
            </button>
          ) : (
            <button
              className="flex bg-green-400 mr-2 p-2 rounded-lg text-white "
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PhotoUploadModal
