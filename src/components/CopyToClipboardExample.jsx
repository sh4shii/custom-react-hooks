import React, { useState } from 'react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { useToast } from '../hooks/useToast';

const CopyToClipboardExample = () => {
  const [textToCopy, setTextToCopy] = useState('Hello world!');
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const { showToast } = useToast();

  const handleCopy = () => {
    const success = copyToClipboard(textToCopy);
    if (success) {
      showToast({
        message: 'Text copied to clipboard!',
        severity: 'success',
      });
    } else {
      showToast({
        message: 'Failed to copy text. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <div>
      <h1>Copy to Clipboard Example</h1>
      <p>{textToCopy}</p>
      <button onClick={handleCopy}>
        {isCopied ? 'Copied!' : 'Copy Text'}
      </button>
    </div>
  );
};

export default CopyToClipboardExample;
