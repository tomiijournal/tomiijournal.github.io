
const $previewIframe = document.getElementById('iframe');
const filenameinput = document.getElementById("filenameinput")

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
    $previewIframe.contentDocument.body.innerHTML = marked.parse(markdownText);
    console.log('Markdown rendered');
  } else {
    const notfoundMarkdown = await fetchText("src/nofilefound.md");
    $previewIframe.contentDocument.body.innerHTML = marked.parse(notfoundMarkdown);
  }
}

async function handleIframeLoad() {
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
}

const pathSegments = window.location.pathname.split('/');
const nonEmptySegments = pathSegments.filter(segment => segment !== '');
const filenameSegment = nonEmptySegments[nonEmptySegments.length - 1];

console.log(filenameSegment)

if (filenameSegment!=="onlyrender.html") {
  console.log("Renderinng...")
  filenameinput.addEventListener("keyup", ({key}) => {
      if (key === "Enter") {
          console.log(filenameinput.value)
          $previewIframe.src = location.origin + location.pathname+"?filename="+filenameinput.value;
      }
  })
}

$previewIframe.addEventListener('load', handleIframeLoad);