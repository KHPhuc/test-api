export const DetectContentType = (contentType: any) => {
  switch (contentType) {
    case "FORM":
      return "Content-Type: application/x-www-form-urlencoded";
    case "JSON":
      return "Content-Type: application/json";
    case "HTML":
      return "Content-Type: text/html";
    case "XML":
      return "Content-Type: application/xml";
    case "TEXT":
      return "Content-Type: text/plain";
    default:
      return "";
  }
};
