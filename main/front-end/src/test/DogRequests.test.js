import DogRequests from "../components/DogRequests";
import React from 'react';
import '@testing-library/jest-dom'
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import App from "../App";

const meetupReqs = [{mid:"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0",sender:"114777625620322820902",receiver:"104891333151558538036",status:"Pending",senderProfile:{uid:"114777625620322820902",username:"Eva",email:"liuxiner2002@gmail.com",pic_link:"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c",last_ping:"1000-01-01T00:00"},receiverProfile:{uid:"104891333151558538036",username:"Wenxuan",email:"lwx2000@uw.edu",pic_link:"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c",last_ping:"1000-01-01T00:00"}}];
const midMeet = meetupReqs[0].mid;

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve(JSON.stringify(mid)),
//     })
// );

/**
 * Reset Mocks
 */
beforeEach(() => {
    fetch.resetMocks();
});

/**
 * Enable Mocks
 */
require('jest-fetch-mock').enableMocks()

/**
 * Test getting the requests from the database
 */
it("Return requests", async () => {
    fetch.mockResponseOnce(JSON.stringify({
        result: meetupReqs,
    }));
    const status = await DogRequests.requestMeetup();
    expect(status).toEqual(meetupReqs);
    expect(fetch).toHaveBeenCalledTimes(1);
});

/**
 * Test changing the meetup request status to accepted
 */
test('Changes meetup request status', () => {
    fetch.mockResponseOnce(JSON.stringify(meetupReqs));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return DogRequests.acceptRequest(midMeet)
        .then(onResponse)
        .catch(onError)
        .finally(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0][0]).toEqual({mid:"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0",sender:"114777625620322820902",receiver:"104891333151558538036",status:"Accepted",senderProfile:{uid:"114777625620322820902",username:"Eva",email:"liuxiner2002@gmail.com",pic_link:"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c",last_ping:"1000-01-01T00:00"},receiverProfile:{uid:"104891333151558538036",username:"Wenxuan",email:"lwx2000@uw.edu",pic_link:"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c",last_ping:"1000-01-01T00:00"}});
        });
});