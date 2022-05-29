import acceptRequest from "../../components/DogRequests";

const meetupReqs = [{"mid":"5f1587e7-4eb2-42d3-bf46-df9d0308bcd0","sender":"114777625620322820902","receiver":"104891333151558538036","status":"Pending","senderProfile":{"uid":"114777625620322820902","username":"Eva","email":"liuxiner2002@gmail.com","pic_link":"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c","last_ping":"1000-01-01T00:00"},"receiverProfile":{"uid":"104891333151558538036","username":"Wenxuan","email":"lwx2000@uw.edu","pic_link":"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c","last_ping":"1000-01-01T00:00"}},{"mid":"5f9f8359-8e4a-49e5-8fb5-d2dc66edada5","sender":"114777625620322820902","receiver":"104891333151558538036","status":"Accepted","senderProfile":{"uid":"114777625620322820902","username":"Eva","email":"liuxiner2002@gmail.com","pic_link":"https://lh3.googleusercontent.com/a/AATXAJy3Od8WvYTytjjsyB_KW-zBpLnGCMWyaXONttAK\u003ds96-c","last_ping":"1000-01-01T00:00"},"receiverProfile":{"uid":"104891333151558538036","username":"Wenxuan","email":"lwx2000@uw.edu","pic_link":"https://lh3.googleusercontent.com/a/AATXAJxGbGsZ7efsc7Q8Li62gFQEADQK4EYHGV9GnN6D\u003ds96-c","last_ping":"1000-01-01T00:00"}}];
const mid = meetupReqs[0].mid;

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mid),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

it("changes meetup request status", async () => {
    const status = await acceptRequest(mid);

    expect(status).toEqual("accepted");
    expect(fetch).toHaveBeenCalledTimes(1);
});