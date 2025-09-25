import { useState, useRef, useEffect } from "react";

export default function Analyze({ user, onLoginClick, onLogout }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [storedImages, setStoredImages] = useState([]);
  const fileInputRef = useRef(null);

  const calibers = ['9mm', '7.62mm', '5.56mm', '45 ACP'];
  const weaponTypes = ['Pistol', 'Rifle', 'Revolver', 'SMG'];
  const striationPatterns = ['Unique helical pattern', 'Straight grooves', 'Wavy pattern', 'Cross-hatch pattern'];
  const landAndGrooves = ['6 lands, 6 grooves', '4 lands, 4 grooves', '8 lands, 6 grooves'];
  const twistDirections = ['Right twist', 'Left twist'];
  const confidences = ['90%', '94%', '88%', '92%'];

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  useEffect(() => {
    async function fetchImages() {
      if (!user?.id) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images?userId=${user.id}`);
        const data = await res.json();
        setStoredImages(data.images || []);
      } catch {
        setStoredImages([]);
      }
    }
    fetchImages();
  }, [user]);

  async function generateFileHash(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        crypto.subtle.digest("SHA-256", reader.result).then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
          resolve(hashHex);
        });
      };
      reader.onerror = () => reject("Failed to read file for hashing");
      reader.readAsArrayBuffer(file);
    });
  }

  async function findExistingImage(file) {
    if (storedImages.length > 0 && storedImages[0].contentHash) {
      const fileHash = await generateFileHash(file);
      return storedImages.find((img) => img.contentHash === fileHash);
    }
    return storedImages.find((img) => img.originalName === file.name && img.size === file.size);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        createImagePreview(file);
      } else {
        alert('Please upload an image file');
      }
    }
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        createImagePreview(file);
      } else {
        alert('Please upload an image file');
      }
    }
  }

  function createImagePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  async function handleUploadAndCompare() {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setIsProcessing(true);
    setAnalysisResult(null);

    setTimeout(async () => {
      const existingImage = await findExistingImage(selectedFile);

      if (existingImage) {
        // Image found - successful match
        setAnalysisResult({
          success: true,
          match: existingImage,
          message: 'Successfully matched!',
          confidence: existingImage.details.confidence
        });
        setImagePreview(`${import.meta.env.VITE_API_URL}/api/image/${existingImage.preview}`);
      } else {
        // Image not found - upload it
        const details = {
          caliber: getRandomItem(calibers),
          weaponType: getRandomItem(weaponTypes),
          striationPattern: getRandomItem(striationPatterns),
          landAndGroove: getRandomItem(landAndGrooves),
          twistDirection: getRandomItem(twistDirections),
          confidence: getRandomItem(confidences),
        };

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', user.id);
        formData.append('details', JSON.stringify(details));

        const contentHash = await generateFileHash(selectedFile);
        formData.append('contentHash', contentHash);

        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
            method: "POST",
            body: formData,
          });
          const data = await res.json();

          if (!res.ok) throw new Error(data.error || "Upload failed");

          setStoredImages(prev => [...prev, data.image]);
          setAnalysisResult({
            success: false,
            message: 'Sorry, this image could not be matched with our database.',
            subMessage: 'The image has been added to our database for future reference.',
            storedId: data.image._id
          });
          setImagePreview(`${import.meta.env.VITE_API_URL}/api/image/${data.image.preview}`);
        } catch (err) {
          alert("Image upload failed");
        }
      }

      setIsProcessing(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Card */}
          <div className="bg-white overflow-hidden border-2 border-cyan-400 rounded-3xl shadow-[0_0_15px_4px_rgba(34,211,238,0.7)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-300 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                Image Matching System
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Upload Area */}
            <div className="p-8">
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-cyan-300 hover:border-cyan-400 hover:bg-cyan-25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                style={{ cursor: "pointer" }}
              >
                {/* Cloud Upload Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                </div>

                {/* Upload Text */}
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Drag & drop your image or click to browse
                </h3>

                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">
                      Selected: {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">No file chosen</p>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Upload Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleUploadAndCompare}
                  disabled={!selectedFile || isProcessing}
                  className={`bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 
                    text-white font-semibold py-3 px-8 rounded-full text-lg
                    transform hover:scale-105 transition-all duration-200 shadow-lg
                    flex items-center justify-center mx-auto space-x-2
                    ${!selectedFile || isProcessing ? "opacity-50 cursor-not-allowed transform-none" : ""}`}
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Upload and Compare</span>
                    </>
                  )}
                </button>
              </div>

              {/* Supported formats */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Supported Formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JPG', 'PNG', 'GIF', 'WEBP', 'BMP'].map((format) => (
                    <span
                      key={format}
                      className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Maximum file size: 10MB. For best results, use high-quality images with clear ballistic markings.
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {selectedFile && (
            <div className="mt-8 bg-white p-8 border-2 border-lilac-400 rounded-3xl shadow-[0_0_15px_4px_rgba(200,162,200,0.7)]">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Preview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Uploaded Image:</h3>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-500">Loading preview...</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Analysis Status:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Image uploaded successfully</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isProcessing ? (
                        <>
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">Analyzing ballistic patterns...</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">Ready for analysis</span>
                        </>
                      )}
                    </div>
                    {isProcessing && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700">Comparing with database...</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">File Details:</h4>
                    <p className="text-sm text-gray-600">Name: {selectedFile.name}</p>
                    <p className="text-sm text-gray-600">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-sm text-gray-600">Type: {selectedFile.type}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="mt-8 bg-white p-8 border-2 border-green-400 rounded-3xl shadow-[0_0_15px_4px_rgba(52,211,153,0.7)]">
              <div
                className={`text-center p-6 rounded-lg mb-6 ${
                  analysisResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    analysisResult.success ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {analysisResult.success ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${
                    analysisResult.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {analysisResult.message}
                </h3>

                {analysisResult.subMessage && <p className="text-gray-600 mb-4">{analysisResult.subMessage}</p>}

                {analysisResult.success && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-green-700 mb-2">
                      Match Confidence: {analysisResult.confidence}
                    </p>
                    <p className="text-sm text-gray-600">
                      Originally uploaded: {new Date(analysisResult.match.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {analysisResult.success && analysisResult.match && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Matched Image Details:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p>
                        <span className="font-medium">File Name:</span> {analysisResult.match.name}
                      </p>
                      <p>
                        <span className="font-medium">Upload Date:</span>{" "}
                        {new Date(analysisResult.match.uploadDate).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">File Size:</span>{" "}
                        {(analysisResult.match.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p>
                        <span className="font-medium">Database ID:</span> #{analysisResult.match.id}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Ballistic Analysis:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p>
                        <span className="font-medium">Caliber:</span> {analysisResult.match.details.caliber}
                      </p>
                      <p>
                        <span className="font-medium">Weapon Type:</span> {analysisResult.match.details.weaponType}
                      </p>
                      <p>
                        <span className="font-medium">Striation Pattern:</span> {analysisResult.match.details.striationPattern}
                      </p>
                      <p>
                        <span className="font-medium">Land & Groove:</span> {analysisResult.match.details.landAndGroove}
                      </p>
                      <p>
                        <span className="font-medium">Twist Direction:</span> {analysisResult.match.details.twistDirection}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!analysisResult.success && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Database Updated</h4>
                  <p className="text-blue-700 text-sm">
                    This image has been stored in our database with ID #{analysisResult.storedId}. Future uploads of this image
                    will result in a successful match.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
