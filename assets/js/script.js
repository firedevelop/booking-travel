class Connection {
  constructor(type, details) {
    this.type = type;
    this.details = details;
  }

  displayDetails() {
    // Display connection details based on type
    switch (this.type) {
      case 'Train':
        return `Train ${this.details.flightNumber}, Seat ${this.details.seatNumber}`;
      case 'Plane':
        return `Flight ${this.details.flightNumber}, Seat ${this.details.seatNumber}`;
      case 'Car':
        return `Car ${this.details.registration}`;
      case 'Boat':
        return `Ship ${this.details.shipNumber}`;
    }
  }
}

class City {
  constructor(name) {
    this.name = name;
    this.connections = [];
  }

  addConnection(connection) {
    this.connections.push(connection);
  }
}

class RouteFinder {
  constructor(cities, connections) {
    this.cities = cities;
    this.connections = connections;
  }

  findRoute(origin, destination) {
    const visitedCities = new Set();
    const queue = [[origin]];
  
    while (queue.length > 0) {
      const path = queue.shift();
      const currentCity = path[path.length - 1];
  
      if (currentCity === destination) {
        return path;
      }
  
      if (!visitedCities.has(currentCity)) {
        visitedCities.add(currentCity);
  
        for (const connection of this.connections[currentCity]) {
          if (connection) {
            const nextCity = connection.details.destination;
            if (!visitedCities.has(nextCity)) {
              queue.push([...path, nextCity]);
            }
          }
        }
      }
    }
  
    return null;
  }
}

// Example data
const cities = ['Madrid', 'Barcelona', 'Roma', 'Valencia', 'Malta', 'Paris'];
const connections = {
  Madrid: [
    new Connection('Car', { registration: 'T123', origin: 'Madrid', destination: 'Barcelona' }),
    new Connection('Plane', { flightNumber: 'P789', seatNumber: 'B2', origin: 'Madrid', destination: 'Valencia' })
  ],
  Barcelona: [
    new Connection('Train', { flightNumber: 'T123', seatNumber: 'A1', origin: 'Barcelona', destination: 'Madrid' }),
    new Connection('Plane', { flightNumber: 'P789', seatNumber: 'B2', origin: 'Barcelona', destination: 'Roma' }),
    new Connection('Car', { registration: 'T123', origin: 'Barcelona', destination: 'Paris' }),
    new Connection('Train', { flightNumber: 'T123', seatNumber: 'A1', origin: 'Barcelona', destination: 'Valencia' })

  ],
  Roma: [
    new Connection('Plane', { flightNumber: 'P789', seatNumber: 'B2', origin: 'Roma', destination: 'Malta' })
  ],
  Valencia: [
    new Connection('Boat', { shipNumber: 'S555', origin: 'Valencia', destination: 'Malta' }),
    new Connection('Plane', { flightNumber: 'P789', seatNumber: 'B2', origin: 'Valencia', destination: 'Madrid' }),
    new Connection('Boat', { shipNumber: 'S555', origin: 'Valencia', destination: 'Barcelona' })
  ],
  Malta: [
    new Connection('Boat', { shipNumber: 'S555', origin: 'Malta', destination: 'Roma' })
  ],
  Paris: [
    new Connection('', { shipNumber: '', origin: '', destination: '' })
  ]
};

const routeFinder = new RouteFinder(cities, connections);

document.addEventListener('DOMContentLoaded', function () {
  const originSelect = document.getElementById('origin');
  const destinationSelect = document.getElementById('destination');
  const findRouteButton = document.getElementById('findRouteButton');
  const routeDisplay = document.getElementById('routeDisplay');

  findRouteButton.addEventListener('click', function () {
    const originCity = originSelect.value;
    const destinationCity = destinationSelect.value;

    const route = routeFinder.findRoute(originCity, destinationCity);

    routeDisplay.innerHTML = ''; // Clear previous route display

    if (route) {
      for (let i = 0; i < route.length - 1; i++) {
        const currentCity = route[i];
        const nextCity = route[i + 1];
        const connection = connections[currentCity].find(conn => conn.details.destination === nextCity);
        const connectionDetails = connection.displayDetails();
        routeDisplay.innerHTML += `<p>${currentCity} to ${nextCity}: ${connectionDetails}</p>`;
      }
    } else {
      routeDisplay.innerHTML = 'There is no valid route between the cities.';
    }
  });
});
