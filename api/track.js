async function performTracking() {
  const inputValue = trackingInput.value.trim().toUpperCase();

  if (!inputValue) {
    alert('Please enter a BL Number or Container Number');
    return;
  }

  // Show loading state
  trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
  trackBtn.disabled = true;

  try {
    // Hamare naye Vercel Backend ko call kar raha hai
    const response = await fetch(`/api/track?trackingNumber=${inputValue}`);
    const result = await response.json();

    if (result.meta && result.meta.code === 200 && result.data) {
      const tracking = result.data;
      
      // Live Data ko screen par lagana
      const liveData = {
        blNumber: tracking.tracking_number,
        containerNumber: tracking.tracking_number, // TrackingMore dono ko tracking_number kehta hai
        vesselName: tracking.vessel_name || 'Vessel Status Updating',
        eta: tracking.scheduled_delivery_date || 'N/A',
        portLoading: tracking.origin_country_code || 'N/A',
        portDischarge: tracking.destination_country_code || 'N/A',
        // Timeline status ke liye hum uske origins/checkpoints dekh sakte hain
        status: tracking.delivery_status || 'In Transit'
      };

      displayTrackingResults(liveData);
      
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
    // Reset button state
    trackBtn.innerHTML = 'Track &rarr;';
    trackBtn.disabled = false;
  }
}

// Purane dummy functions delete ho gaye hain! Live data display function ko use karega.
function displayTrackingResults(data) {
  // Yeh function aapke HTML elements mein text render karega
  document.querySelector('[data-bl-number]').innerText = data.blNumber;
  document.querySelector('[data-container-number]').innerText = data.containerNumber;
  document.querySelector('[data-vessel-name]').innerText = data.vesselName;
  document.querySelector('[data-eta]').innerText = data.eta;
  document.querySelector('[data-port-loading]').innerText = data.portLoading;
  document.querySelector('[data-port-discharge]').innerText = data.portDischarge;
}
