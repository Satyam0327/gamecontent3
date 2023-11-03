import React, { useState } from 'react';
import './web.css';

function LiveWebEditor() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [j, setJ] = useState(0);
  const [iframeContent, setIframeContent] = useState('');

  const update = () => {
    const text = htmlCode + '<style>' + cssCode + '</style>' + '<script>' + jsCode + '</script>';
    setIframeContent(text);
  };

  const handleCodeChange = (codeType, event) => {
    if (j !== 1) {
      const pos = event.target.selectionStart;
      const val = [...event.target.value];
      const char = val.slice(pos - 1, pos)[0];
      const closeChar = closeChars.get(char);
      if (closeChar) {
        val.splice(pos, 0, closeChar);
        event.target.value = val.join('');
        event.target.selectionEnd = pos;
      }
    }
    setJ(0);
    update();
  };

  const saveFile = () => {
    const fileName = prompt('What is the name of the file?', '');
    if (fileName != null && (htmlCode !== '' || cssCode !== '' || jsCode !== '')) {
      const text =
        htmlCode + '<style>' + cssCode + '</style>' + '<script>' + jsCode + '</script>';
      download(text, fileName + '.html', 'text/plain');
    } else {
      alert('Please fill all the fields');
    }
  };

  const download = (data, filename, type) => {
    const userFile = new Blob([data], { type: type });
    const a = document.createElement('a');
    const url = URL.createObjectURL(userFile);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  const closeChars = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    ['<', '>'],
    ['"', '"'],
    ["'", "'"],
  ]);

  return (
    <div className="split-container">
      <div className="code-editor">
        <div className="container">
          <button id="btn" onClick={saveFile}>
            Save File
          </button>
          <textarea
            id="htmlCode"
            placeholder="Type HTML code here"
            spellCheck="false"
            value={htmlCode}
            onChange={(e) => {
              handleCodeChange('html', e);
              setHtmlCode(e.target.value);
            }}
          ></textarea>
          <textarea
            id="cssCode"
            placeholder="Type CSS code here"
            spellCheck="false"
            value={cssCode}
            onChange={(e) => {
              handleCodeChange('css', e);
              setCssCode(e.target.value);
            }}
          ></textarea>
          <textarea
            id="javascriptCode"
            placeholder="Type JavaScript code here"
            spellCheck="false"
            value={jsCode}
            onChange={(e) => {
              handleCodeChange('js', e);
              setJsCode(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="iframe-container">
        <iframe id="viewer" srcDoc={iframeContent}></iframe>
      </div>
    </div>
  );
}

export default LiveWebEditor;
