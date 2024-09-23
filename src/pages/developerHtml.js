import { useEffect, useState } from "react";

const DeveloperHtml = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/developer.html")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default DeveloperHtml;
