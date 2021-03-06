import { useEffect, useState, useContext } from 'react';
import PrintApi from "../api/api";
import UserContext from "../auth/UserContext";
import { Link, Redirect, useParams } from 'react-router-dom';

function OngoingPlatformGigs() {
    const { currentUser } = useContext(UserContext);
    const [gigs, setGigs] = useState();
    const { platformId } = useParams();
    
    useEffect(() => {
        async function getOngoingGigs() {
            const res = await PrintApi.getOngoingPlatformGigs(platformId);
            setGigs(res);
        };
        getOngoingGigs();
    }, []);

    if(currentUser.platformId !== +platformId) return <Redirect to={"/login"}/>

    return(
        <div>
            {gigs ? 
            <div className="container">
                <div className="row">
                    <div className="col"><h1>Ongoing Gigs</h1></div>
                </div>
                <div className="row">
                    {gigs.map(g => 
                    <div key={g.id} className="card">
                        <h3 className="card-title">{g.title}</h3>
                        <h4 className="card-title">Fulfilled By: <Link to={`/writers/${g.writerId}`}>{g.firstName} {g.lastName}</Link></h4>
                        <h5 className="card-title text-danger">Deadline: {g.deadline.slice(0, 10)}</h5>
                        <div className="card-body"><p>{g.description}</p></div>
                    </div>
                    )}
                </div>

            </div> 
            
            : ""}
        </div>
    )
}

export default OngoingPlatformGigs;