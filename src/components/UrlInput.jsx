import React, { useState } from "react";
import { summarizeArticle } from "../services/articleSummarizer"; 

function UrlInput() {

   const [url, setUrl] = useState("");
   const [summary, setSummary] = useState("");
   const [copy, setCopyStatus] = useState("Copy to Clipboard");
   const [isLoading, setIsLoading] = useState(false);

   const handleInputChange = (event) => {
      setUrl(event.target.value);
   };

   // When User clicks submit
   const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);

      summarizeArticle(url).then(res => {
            const summaryText = res.summary || "Summary not available.";
            // console.log(result);
            setSummary(summaryText);
            setIsLoading(false);
         })
         .catch(error => {
            console.error("Error:", error);
            setSummary("Failed to load the summary.");
            setIsLoading(false);
         });

         setUrl("");
   };

   // Copies to clipboard
   const copyToClipboard = () => {
      // Create a new textarea element and give it the summary as a value
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      // Make sure it's not visible
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      // Select the text
      textarea.select();
      // Copy the text
      document.execCommand('copy');
      // Remove the textarea
      document.body.removeChild(textarea);

      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy to Clipboard"), 3000);
   };

   return (
      <div className="container">
         <h1>Article Summarizer</h1>
         <p>Paste in the article URL below</p>
         <form onSubmit={handleSubmit}>
            <input 
               type="text" 
               placeholder="Enter URL here" 
               value={url} 
               onChange={handleInputChange} 
            />
            <button type="submit">Submit</button>
         </form>
         {isLoading ? <p>Loading...</p> : summary && (
                  <div className="summaryBox">
                     <button onClick={copyToClipboard}>
                        {copy}
                     </button>
                     <h2>Summary</h2>
                     <p>{summary}</p>
                  </div>
               )
         }
      </div>
   );
}

export default UrlInput;