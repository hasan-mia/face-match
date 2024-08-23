const ErrorHandler = require('../utils/errorhander.js')
const catchAsyncError = require('../middleware/catchAsyncError.js');
const { compareMultipleFaces } = require('../utils/compareMultipleFaces.js');

const bufferToBase64 = (buffer) => buffer.toString('base64');

// Check Face Match
exports.CheckFaceMatch = catchAsyncError(async (req, res, next) => {
  const { image1, image2, image3 } = req.files;

  try {
    if (!image1 || !image2 || !image3) {
      return next(new ErrorHandler('Image should not empty', 404));
    }

    // Convert images to base64
    const image1Base64 = bufferToBase64(image1.data);
    const image2Base64 = bufferToBase64(image2.data);
    const image3Base64 = bufferToBase64(image3.data);

    // Convert base64 to buffer for AWS Rekognition
    const image1Buffer = Buffer.from(image1Base64, 'base64');
    const image2Buffer = Buffer.from(image2Base64, 'base64');
    const image3Buffer = Buffer.from(image3Base64, 'base64');

    const { averageMatch } = await compareMultipleFaces(image1Buffer, image2Buffer, image3Buffer);

    const floatResult = parseFloat(averageMatch).toFixed(2)

    
    res.status(200).json({success: true, data: floatResult})

  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})



