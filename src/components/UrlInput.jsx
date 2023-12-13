import React, { useState } from "react";
import { summarizeText } from "../services/articleSummarizer"; 

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

      const maxLength = 130;
      const minLength = 30;

      summarizeText(url, maxLength, minLength).then(result => {
            const summaryText = result[0].summary_text;
            setSummary(summaryText || "Summary not available.");
            setIsLoading(false);
         })
         .catch(error => {
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
         <h1>NewsFlashSummarizer</h1>
         <p>Paste in the article URL or Text below</p>
         <form onSubmit={handleSubmit}>
            <input 
               type="text" 
               placeholder="Enter URL or Text here" 
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