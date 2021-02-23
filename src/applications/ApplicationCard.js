import { Link } from "react-router-dom"

function ApplicationCard({ app }) {
    return(
        <div>
            <p><Link to={`/writers/${app.writerId}`}>{app.firstName} {app.lastName}</Link></p>
            <p><Link to={`/portfolios/${app.portfolioId}`}>{app.portfolioTitle}</Link></p>
            <p>Created At: {app.createdAt}</p>
            <p>Current Status: {app.status}</p>
            <p><Link to={`/platforms/${app.platformId}/applications/${app.id}`}>Change Status</Link></p>
        </div>
    )
};

export default ApplicationCard;