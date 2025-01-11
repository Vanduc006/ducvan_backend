async function GetData() {
    fetch('https://phatnguoixe.com/1026/?BienSo=63B02028&LoaiXe=1&reload=1')
  .then(response => {
    if (response.ok) {
      // Check the content-type to decide how to parse
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json(); // Parse as JSON
      } else {
        return response.text(); // Parse as plain text or HTML
      }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then(data => {
    console.log('Response Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
    
}
GetData()