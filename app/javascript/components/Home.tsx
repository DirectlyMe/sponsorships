import React, { useEffect, useState } from "react";

type Sponsee = {
    "first_name": string,
    "last_name": string,
}

const Home = () => {
    const [sponsees, setSponsees] = useState<Array<Sponsee>>([]);
    const [sponsorId, setSponsorId] = useState<number | string>('');

    async function getSponsorships(event) {
        event.preventDefault();
        const result = await fetch(`/api/sponsorships/sponsor/${sponsorId}`);
        const json = await result.json();
        console.log(json);
        setSponsees(json.sponsees);
    }

    return (
        <div>
            <form onSubmit={getSponsorships}>
                <label htmlFor="user_id">Enter Sponsor Id</label>
                <br />
                <input
                    type="text"
                    placeholder="1"
                    value={sponsorId}
                    onChange={(event) => setSponsorId(parseInt(event.target.value))}
                />
                <input type="submit" value="Submit" />
            </form>
            <h2>sponsees</h2>
            <div>
                {
                    sponsees.map((sponsee: Sponsee, index: number) => <div key={index}>{sponsee.first_name} {sponsee.last_name}</div>)
                }
            </div>
        </div>
    );
};

export default Home;
