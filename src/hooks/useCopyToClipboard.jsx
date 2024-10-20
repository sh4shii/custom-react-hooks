import { useState, useCallback, useRef, useEffect } from "react";

const useCopyToClipboard = (resetTimeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef(null);
  const timeoutIdRef = useRef(null);

  // Function to copy text to the clipboard
  const copyToClipboard = useCallback(
    async (text) => {
      if (!text) {
        console.warn("No text provided for copying.");
        return false;
      }

      // Clear the existing timeout if any
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      try {
        // Use the modern clipboard API if available
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
        } else {
          // Fallback for older browsers
          if (!textareaRef.current) {
            textareaRef.current = document.createElement("textarea");
            document.body.appendChild(textareaRef.current);
          }
          textareaRef.current.value = text;
          textareaRef.current.select();
          const successful = document.execCommand("copy");
          setIsCopied(successful);
        }

        // Reset copied state after a delay
        timeoutIdRef.current = setTimeout(
          () => setIsCopied(false),
          resetTimeout
        );
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        console.error("Failed to copy text:", errorMessage, {
          originalText: text,
        });
        setIsCopied(false);
        return false;
      }
    },
    [resetTimeout]
  );

  // Clean up the textarea element and timeout on unmount
  useEffect(() => {
    return () => {
      if (textareaRef.current) {
        document.body.removeChild(textareaRef.current);
      }
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  // Return the copied state and the copy function
  return [isCopied, copyToClipboard];
};

export default useCopyToClipboard;
