// Complete script.js code
async function performTracking() {
  const inputValue = trackingInput.value.trim().toUpperCase();

  if (!inputValue) {
    alert('Please enter a BL Number or Container Number');
    return;
  }

  // Show loading spinner on the button
  trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
  trackBtn.disabled = true;

  try {
    // Calling the Vercel serverless backend function
    const response = await fetch(`/api/track?trackingNumber=${inputValue}`);
    const result = await response.json();

    if (result.meta && result.meta.code === 200 && result.data) {
      const tracking = result.data;
      
      // Formatting the real-time API data
      const liveData = {
        blNumber: tracking.tracking_number,
        containerNumber: tracking.tracking_number,
        vesselName: tracking.vessel_name || 'Vessel Status Updating',
        eta: tracking.scheduled_delivery_date || 'N/A',
        portLoading: tracking.origin_country_code || 'N/A',
        portDischarge: tracking.destination_country_code || 'N/A',
        status: tracking.delivery_status || 'In Transit'
      };

      // Send data to display function
      displayTrackingResults(liveData);
      
      // UI Transitions
      trackingResults.classList.remove('hidden');
      heroSection.style.display = 'none';
      document.body.style.overflow = 'auto';
      trackingResults.scrollIntoView({ behavior: 'smooth' });

    } else {
      alert('No live data found for this number. Please check your container/BL number.');
    }

  } catch (error) {
    console.error("Tracking Error:", error);
    alert('Error connecting to the live server.');
  } finally {
    // Reset button state to original
    trackBtn.innerHTML = 'Track &rarr;';
    trackBtn.disabled = false;
  }
}

// Function to update HTML text with live values securely
function displayTrackingResults(data) {
  // 1. Trying to update using IDs (If your HTML uses id="blNumber" etc.)
  if(document.getElementById('blNumber')) document.getElementById('blNumber').innerText = data.blNumber;
  if(document.getElementById('containerNumber')) document.getElementById('containerNumber').innerText = data.containerNumber;
  if(document.getElementById('vesselName')) document.getElementById('vesselName').innerText = data.vesselName;
  if(document.getElementById('eta')) document.getElementById('eta').innerText = data.eta;
  if(document.getElementById('portLoading')) document.getElementById('portLoading').innerText = data.portLoading;
  if(document.getElementById('portDischarge')) document.getElementById('portDischarge').innerText = data.portDischarge;

  // 2. Trying to update using Data Attributes (If your HTML uses data-vessel-name etc.)
  if(document.querySelector('[data-bl-number]')) document.querySelector('[data-bl-number]').innerText = data.blNumber;
  if(document.querySelector('[data-container-number]')) document.querySelector('[data-container-number]').innerText = data.containerNumber;
  if(document.querySelector('[data-vessel-name]')) document.querySelector('[data-vessel-name]').innerText = data.vesselName;
  if(document.querySelector('[data-eta]')) document.querySelector('[data-eta]').innerText = data.eta;
  if(document.querySelector('[data-port-loading]')) document.querySelector('[data-port-loading]').innerText = data.portLoading;
  if(document.querySelector('[data-port-discharge]')) document.querySelector('[data-port-discharge]').innerText = data.portDischarge;
}
