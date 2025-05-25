function submitURL() {
  const url = document.getElementById("urlInput").value;
  const hrs = parseInt(document.getElementById("hours").value) || 0;
  const mins = parseInt(document.getElementById("minutes").value) || 0;
  const secs = parseInt(document.getElementById("seconds").value) || 0;

  const message = document.getElementById("message");
  const shortUrlContainer = document.getElementById("shortened-url-container");
  const shortUrlDisplay = document.getElementById("shortened-url");
  const copyButton = document.getElementById("copy-button");

  // Validate the URL format
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(\/[^\s]*)?$/;
  if (!url || !urlPattern.test(url)) {
    message.textContent = "Please enter a valid URL.";
    shortUrlContainer.style.display = "none";
    return;
  }

  // Validate that at least one timer value is set
  if (hrs === 0 && mins === 0 && secs === 0) {
    message.textContent = "Please enter a valid expiration time.";
    shortUrlContainer.style.display = "none";
    return;
  }

  // Clear any previous messages or short URL displays
  message.textContent = "";
  shortUrlContainer.style.display = "none";

  const formData = new FormData();
  formData.append("url", url);
  formData.append("hrs", hrs);
  formData.append("mins", mins);
  formData.append("secs", secs);

  fetch("/shorten/", {
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.short_url) {
        shortUrlDisplay.textContent = data.short_url;
        shortUrlContainer.style.display = "block";

        copyButton.onclick = () => {
          navigator.clipboard.writeText(data.short_url).then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => (copyButton.textContent = "Copy URL"), 1500);
          });
        };
      } else {
        message.textContent = data.error || "Something went wrong.";
      }
    })
    .catch((error) => {
      message.textContent = "Network error: " + error.message;
      shortUrlContainer.style.display = "none";
    });
}

function getCookie(name) {
  let cookieValue = null;
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      cookieValue = decodeURIComponent(cookie.split("=")[1]);
      break;
    }
  }
  return cookieValue;
}


    


  
    
    
  
  
  
  