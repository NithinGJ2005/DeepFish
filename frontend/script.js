function submitFish() {
  const fileInput = document.getElementById('fishImage');
  const resultText = document.getElementById('result');

  if (!fileInput.files.length) {
    resultText.textContent = "⚠️ Please select an image first.";
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('fishImage', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
  resultText.innerHTML = `
    ✅ ${data.message}: ${data.filename} <br>
    <img src="/uploads/${data.filename}" alt="Uploaded Image" style="max-width:300px; margin-top:10px;">
  `;
})

  .catch(error => {
    resultText.textContent = '❌ Upload failed.';
    console.error('Error:', error);
  });
}
