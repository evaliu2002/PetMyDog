import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import React from 'react';
import {Circle, initialize, Map, Marker, mockInstances} from "@googlemaps/jest-mocks";
import { useAuth0 } from "@auth0/auth0-react";
import FindDogs from "./components/FindDogs";
import {shallow} from 'enzyme';


// Clear all mocks
beforeEach(() => {
    mockInstances.clearAll();
});

// Clear specific mocks
beforeEach(() => {
    mockInstances.clear(Map, Marker);
});


afterAll(() => {
    global.fetch = unmockedFetch
})

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
 * Testing Google Oauth Login (Test not yet implemented)
 */
// test('google-oauth-login', () => {
//
// });
// const user = {
//     email: "johndoe@me.com",
//     email_verified: true,
//     sub: "google-oauth2|12345678901234",
// };
//
// jest.mock("@auth0/auth0-react");
//
// const mockedUseAuth0 = mocked(useAuth0, true);
//
// describe("Logged in", () => {
//     beforeEach(() => {
//         mockedUseAuth0.mockReturnValue({
//             isAuthenticated: true,
//             user,
//             logout: jest.fn(),
//             loginWithRedirect: jest.fn(),
//             getAccessTokenWithPopup: jest.fn(),
//             getAccessTokenSilently: jest.fn(),
//             getIdTokenClaims: jest.fn(),
//             loginWithPopup: jest.fn(),
//             isLoading: false,
//         });
//     });
// });

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

/**
 * Testing Status Change of Meeting Requests after requests are
 * accepted or declined.
 */
test('request-status-change', () => {

});

const unmockedFetch = global.fetch

test('nearby-dogs', () => {
    const dog1 = {"did":"9","name":"dog1","age":"7","gender":"male","breed":"test4","pic_link":"test"}
    const dog2 = {"did":"9","name":"dog2","age":"7","gender":"male","breed":"test4","pic_link":"test"}
    const dog3 = {"did":"9","name":"dog3","age":"7","gender":"male","breed":"test4","pic_link":"test"}
    const user1 = {"uid":"0","username":"k","email":"f","pic_link":"s","last_ping":"1","dogs":[dog1,dog2]}
    const user2 = {"uid":"1","username":"l","email":"f","pic_link":"s","last_ping":"1","dogs":[dog3]}
    const user3 = {"uid":"2","username":"l","email":"f","pic_link":"s","last_ping":"1","dogs":[]}
    const mockFetch = jest.fn()
        .mockReturnValueOnce({
            json: () => Promise.resolve([0, 1, 2]),
        })
        .mockReturnValueOnce({
            json: () => Promise.resolve(user1)
        })
        .mockReturnValueOnce({
            json: () => Promise.resolve(user2)
        })
        .mockReturnValueOnce({
            json: () => Promise.resolve(user3)
        })
    global.fetch = mockFetch

    const wrapper = shallow(
        <FindDogs />,
    );
    wrapper.instance().updateNearbyUsers();

})


