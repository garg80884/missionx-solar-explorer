async function loadPlanetList() {
  const select = document.getElementById('planetSelect');
  const info = document.getElementById('planetInfo');
  info.innerHTML = "<p>Loading planet data...</p>";

  try {
    const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    const data = await res.json();
    const planets = data.bodies.filter(b => b.isPlanet);

    // Populate dropdown
    planets.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = p.englishName;
      select.appendChild(option);
    });

    loadPlanet(); // Load first planet info
  } catch (error) {
    info.innerHTML = "<p style='color: red;'>⚠️ Failed to load planet data. Check your internet connection or API availability.</p>";
  }
}

async function loadPlanet() {
  const planetId = document.getElementById('planetSelect').value;
  const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/' + planetId);
  const data = await res.json();
  document.getElementById('planetInfo').innerHTML = `
    <h2>${data.englishName}</h2>
    <p><strong>Gravity:</strong> ${data.gravity} m/s²</p>
    <p><strong>Radius:</strong> ${data.meanRadius} km</p>
    <p><strong>Mass:</strong> ${data.mass.massValue} × 10^${data.mass.massExponent} kg</p>
    <p><strong>Density:</strong> ${data.density} g/cm³</p>
    <p><strong>Discovered By:</strong> ${data.discoveredBy || 'N/A'}</p>
    <p><strong>Discovery Date:</strong> ${data.discoveryDate || 'N/A'}</p>
  `;
}

window.onload = loadPlanetList;
