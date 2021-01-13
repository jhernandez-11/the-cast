const FiftyOneDegreesDeviceDetection = require("fiftyone.devicedetection");
const axios = require("axios");
// Construct the device detection pipeline using the
// DeviceDetectionPipelineBuilder, passing in your resourceKey.
// The build method completes the pipeline
const pipeline = new FiftyOneDegreesDeviceDetection.DeviceDetectionPipelineBuilder(
  {
    resourceKey: "AQQNX4o8_iZntNu32Eg",
  }
).build();
// To monitor the pipeline we can put in listeners for various log events.
// Valid types are info, debug, warn, error
pipeline.on("error", console.error);
// Here we make a function that gets a userAgent as evidence and uses the
// Device Detection Engine to detect if it is a mobile or not
const checkUserAgent = async function (userAgent) {
  // Create a FlowData element
  // This is used to add evidence and process it through the
  // FlowElements in the Pipeline.
  const flowData = pipeline.createFlowData();
  // Add the User-Agent as evidence
  flowData.evidence.add("header.user-agent", userAgent);
  // Run process on the flowData (this returns a promise)
  await flowData.process();
  // Check the propertes.
  console.log("For user-agent: " + userAgent);

  console.log("PlatformVendor: ");
  checkProperty(flowData.device.platformvendor);
  console.log("PlatformVersion: ");
  checkProperty(flowData.device.platformversion);
  console.log("PlatformName: ");
  checkProperty(flowData.device.platformname);

  axios
    .post("https://the-cast-940b0-default-rtdb.firebaseio.com/device.json", {
      platformvendor: checkProperty(flowData.device.platformvendor),
      platformversion: checkProperty(flowData.device.platformversion),
      platformname: checkProperty(flowData.device.platformname),
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
// Each property returns an AspectPropertyValue wrapper
// letting you check if a value is set and if not why not.
// Check if the result has a meaningful value and output it
const checkProperty = function (property) {
  if (property.hasValue) {
    console.log(property.value);
  } else {
    // Output why the value isn't meaningful
    console.log(property.noValueMessage);
  }
  console.log(" ");
};
const desktopUA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36";
const iPhoneUA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 11_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C114";
checkUserAgent(desktopUA);
checkUserAgent(iPhoneUA);
