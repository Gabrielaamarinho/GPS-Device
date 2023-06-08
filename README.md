# GPS Device Frontend

This is a frontend project built with React for a GPS device. It utilizes the Mapbox library to display a map where users can interact with the device's functionality. Users can input latitude and longitude coordinates, toggle the device on and off, and track the location updates provided by Firebase.

## Features

- **Map Display**: The project integrates the Mapbox library to provide a visually appealing map interface. Users can view the location markers and track the device's movements in real-time.

- **Location Input**: Users can input latitude and longitude coordinates through the user interface. The application validates the input and updates the device's location accordingly on the map.

- **Device Control**: The frontend allows users to toggle the GPS device on and off. This functionality helps conserve resources and allows users to control the tracking feature.

- **Real-time Updates**: The application leverages Firebase's real-time database capabilities to provide continuous updates on the device's location. Users can see the latest coordinates and movements reflected in the frontend interface.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Mapbox: An open-source mapping platform for custom map creation.
- Firebase: A cloud-based platform for building web and mobile applications with real-time data synchronization.

## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine.

```git clone https://github.com/Gabrielaamarinho/GPS-Device.git```

2. Navigate to the project directory.

```cd GPS-Device```

3. Install the dependencies using npm or yarn.

```npm install```
or
```yarn install```

4. Set up the required environment variables. You will need to provide your Mapbox API key and Firebase configuration details. Refer to the `.env.example` file for the required variables.

5. Start the development server.

```npm start```
or
```yarn start```


6. Access the application by opening the provided URL in your web browser.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Please follow the project's code of conduct.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Mapbox Documentation](https://docs.mapbox.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- The open-source community for providing valuable libraries and tools.
