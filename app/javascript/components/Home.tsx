import React, { useEffect, useState } from "react";

type Sponsee = {
    "first_name": string,
    "last_name": string,
}

const Home = () => {
    const [sponsees, setSponsees] = useState<Array<Sponsee>>([]);
    const [sponsorId, setSponsorId] = useState<number | string>('');
    const [handlerId, setHandlerId] = useState<number | string>('');
    const [selectType, setSelectType] = useState<string>('sponsors');

    async function getSponsorships(event) {
        event.preventDefault();
        const result = await fetch(`/api/sponsorships/sponsor/${sponsorId}`);
        const json = await result.json();
        console.log(json);
        setSponsees(json.sponsees);
        setSelectType('sponsor');
    }

    async function getHandlerRelations(event) {
        event.preventDefault();
        const result = await fetch(`/api/handler_relations/handler/${handlerId}`);
        const json = await result.json();
        console.log(json);
        setSponsees(json.sponsees);
        setSelectType('handler');
    }

    return (
        <div>
            <h2>This will be the main dashboard</h2>
            <form onSubmit={getSponsorships}>
                <label htmlFor="user_id">Enter Sponsor Id</label>
                <br />
                <input
                    type="text"
                    placeholder="1"
                    value={sponsorId}
                    onChange={(event) => setSponsorId(event.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
            <br />
            <form onSubmit={getHandlerRelations}>
                <label htmlFor="user_id">Enter Handler Id</label>
                <br />
                <input
                    type="text"
                    placeholder="1"
                    value={handlerId}
                    onChange={(event) => setHandlerId(event.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>

            <h3>{selectType}'s Sponsees</h3>
            <div>
                {
                    sponsees.map((sponsee: Sponsee, index: number) => <div key={index}>{sponsee.first_name} {sponsee.last_name}</div>)
                }
            </div>
        </div>
    );
};

export default Home;
