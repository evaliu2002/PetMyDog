import { render, screen } from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from "react-router-dom";
import React from 'react';
import '@testing-library/jest-dom'
import {Circle, initialize, Map, Marker, mockInstances} from "@googlemaps/jest-mocks";

/**
 * Testing Pet My Dog Login Heading Display
 */
test('heading-display', () => {
  render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Pet My Dog/i);
  expect(linkElement).toBeInTheDocument();
});

/**
 * Testing Google Maps Display
 */
beforeAll(() => {
    initialize();
});

test('mocking-google-maps', () => {
    const map = new google.maps.Map(null);
    const markerOne = new google.maps.Marker();
    const markerTwo = new google.maps.Marker();
    const circle = new google.maps.Circle();

    map.setHeading(8);
    markerOne.setMap(map);
    markerTwo.setLabel("My marker");
    circle.setMap(map);

    const mapMocks = mockInstances.get(Map);
    const markerMocks = mockInstances.get(Marker);
    const circleMocks = mockInstances.get(Circle);

    expect(mapMocks).toHaveLength(1);
    expect(markerMocks).toHaveLength(2);
    expect(mapMocks[0].setHeading).toHaveBeenCalledWith(8);
    expect(markerMocks[0].setMap).toHaveBeenCalledTimes(1);
    expect(markerMocks[1].setLabel).toHaveBeenCalledWith("My marker");
    expect(circleMocks[0].setMap).toHaveBeenCalledTimes(1);
});

// Clear all mocks
beforeEach(() => {
    mockInstances.clearAll();
});

// Clear specific mocks
beforeEach(() => {
    mockInstances.clear(Map, Marker);
});

/**
 * Testing Status Change of Meeting Requests after requests are
 * accepted or declined.
 */
test('request-status-change', () => {

});