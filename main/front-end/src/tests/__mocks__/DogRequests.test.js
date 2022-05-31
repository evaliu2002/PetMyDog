import DogRequests from "../../components/DogRequests";
import React from 'react';
import '@testing-library/jest-dom'

const meetupReqs = [{mid:"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0",sender:"114777625620322820902",receiver:"104891333151558538036",status:"Pending",senderProfile:{uid:"114777625620322820902",username:"Eva",email:"liuxiner2002@gmail.com",pic_link:"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c",last_ping:"1000-01-01T00:00"},receiverProfile:{uid:"104891333151558538036",username:"Wenxuan",email:"lwx2000@uw.edu",pic_link:"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c",last_ping:"1000-01-01T00:00"}}];
const mid = meetupReqs[0].mid;

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve(JSON.stringify(mid)),
//     })
// );

beforeEach(() => {
    fetch.resetMocks();
});

require('jest-fetch-mock').enableMocks()

it("Return requests", async () => {
    fetch.mockResponseOnce(JSON.stringify({
        result: meetupReqs,
    }));
    const status = await DogRequests.requestMeetup();
    expect(status).toEqual(meetupReqs);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('Changes meetup request status', () => {
    fetch.mockResponseOnce(JSON.stringify([{mid:"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0",sender:"114777625620322820902",receiver:"104891333151558538036",status:"Pending",senderProfile:{uid:"114777625620322820902",username:"Eva",email:"liuxiner2002@gmail.com",pic_link:"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c",last_ping:"1000-01-01T00:00"},receiverProfile:{uid:"104891333151558538036",username:"Wenxuan",email:"lwx2000@uw.edu",pic_link:"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c",last_ping:"1000-01-01T00:00"}}]));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return DogRequests.acceptRequest(mid)
        .then(onResponse)
        .catch(onError)
        .finally(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0][0]).toEqual({mid:"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0",sender:"114777625620322820902",receiver:"104891333151558538036",status:"Pending",senderProfile:{uid:"114777625620322820902",username:"Eva",email:"liuxiner2002@gmail.com",pic_link:"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c",last_ping:"1000-01-01T00:00"},receiverProfile:{uid:"104891333151558538036",username:"Wenxuan",email:"lwx2000@uw.edu",pic_link:"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c",last_ping:"1000-01-01T00:00"}});
        });
});