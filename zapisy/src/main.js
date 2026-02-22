
const $previewIframe = document.getElementById('iframe');
const filenameinput = document.getElementById("filenameinput")

let isFirstLoad = true;

$previewIframe.src = location.origin + location.pathname+"src/markdowntemplate.html";

function ResizeIframe()
{
  try {
    const iframeDoc = $previewIframe.contentDocument || $previewIframe.contentWindow.document;
    console.log(iframeDoc)
    const contentHeight = iframeDoc.body.scrollHeight;

    $previewIframe.style.height = `${contentHeight + 20}px`; 
  } catch (error) {
    console.error('Failed to resize iframe:', error);
  }
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    return text;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function loadMarkdown(filename) {
  const markdownText = await fetchText("src/"+filename+".md");
  if (markdownText) {
    $previewIframe.contentDocument.body.innerHTML = await marked.parse(markdownText);
    console.log('Markdown rendered');
  } else {
    const notfoundMarkdown = await fetchText("src/nofilefound.md");
    $previewIframe.contentDocument.body.innerHTML = await marked.parse(notfoundMarkdown);
  }

  ResizeIframe();
}

async function handleIframeLoad() {
  if (!isFirstLoad) {
    console.log("Not first loader, returning....");
    return;
  }
  isFirstLoad=false;

  const filename = GetURLParameter("filename");

  if (filename) {
    await loadMarkdown(filename)
  } else {
    const pathSegments = window.location.pathname.split('/');
    const nonEmptySegments = pathSegments.filter(segment => segment !== '');
    const filenameSegment = nonEmptySegments[nonEmptySegments.length - 1];

    if (filenameSegment!=="onlyrender.html") {
      console.log(filenameSegment + " Rendering intro")
      await loadMarkdown("intro")
    }
  }
  ResizeIframe()           
}

const pathSegments = window.location.pathname.split('/');
const nonEmptySegments = pathSegments.filter(segment => segment !== '');
const filenameSegment = nonEmptySegments[nonEmptySegments.length - 1];

if (filenameSegment!=="onlyrender.html") {
  filenameinput.addEventListener("keyup", ({key}) => {
      if (key === "Enter") {
        console.log(filenameinput.value)
        window.location.href = location.origin + location.pathname+"?filename="+filenameinput.value;
      }
  })
}

$previewIframe.addEventListener('load', handleIframeLoad);